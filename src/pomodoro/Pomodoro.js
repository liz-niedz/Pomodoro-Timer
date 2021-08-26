import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
//import { minutesToDuration, secondsToDuration } from "../utils/duration";
import FocusDuration from "./FocusDuration";
import BreakDuration from "./BreakDuration";
import Subtitle from "./Subtitle";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.

  const [breakDuration, setBreakDuration] = useState(5);
  const [focusDuration, setFocusDuration] = useState(25);
  const [stopButton, setStopButton] = useState(false)
  const [onBreak, setOnBreak] = useState(false);
  const [aria, setAria] = useState(0);
 

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      const timeLeft = session.timeRemaining
      if(session.label === "Focusing") {
        setAria(100*(focusDuration * 60 - timeLeft)/(focusDuration * 60))
      } else {
        setAria(100*(breakDuration * 60 - timeLeft)/ (breakDuration * 60))
      }
      
      console.log(session.timeRemaining)
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }
   
  const handleStopBtn = () => {
setIsTimerRunning(false)
setSession(null)
setStopButton(false)
setAria(0)
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <FocusDuration 
          focusDuration={focusDuration} 
          setFocusDuration={setFocusDuration}
           session={session}
           setSession={setSession}/>
        </div>
        <div className="col">
          <BreakDuration 
          breakDuration={breakDuration}
           setBreakDuration={setBreakDuration}
            session={session} 
            setSession={setSession}/>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button
            disabled={!isTimerRunning}
            onClick={handleStopBtn}
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <Subtitle
      aria={aria}
       session={session}
       breakDuration={breakDuration}
        focusDuration={focusDuration} 
        onBreak={onBreak} />
      </div>
  );
}

export default Pomodoro;
