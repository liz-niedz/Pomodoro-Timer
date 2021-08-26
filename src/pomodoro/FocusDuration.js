import React, {useState} from 'react';
import { minutesToDuration, secondsToDuration } from "../utils/duration";


function FocusDuration({focusDuration, setFocusDuration, session, setSession}) {


    return (
        <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
              onClick={() => {
                setSession(null)
                if(focusDuration > 5){
                  setFocusDuration((currentCount) => currentCount - 5)
                }
              }}
              disabled={session}
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
            
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
              onClick={() => {
                setSession(null)
                if(focusDuration < 60){
                  setFocusDuration((currentCount) => currentCount + 5)
                }
              }}
              disabled={session}
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
    )
}

export default FocusDuration;