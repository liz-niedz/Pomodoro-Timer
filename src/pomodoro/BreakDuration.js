import React, {useState} from 'react';
import { minutesToDuration, secondsToDuration } from "../utils/duration";

function BreakDuration({breakDuration, setBreakDuration, session, setSession}) {
return (
    <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {breakDuration.toString().padStart(2,'0')}:00
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                onClick={() => {
                  setSession(null)
                  if(breakDuration > 1) {
                  setBreakDuration((currentCount) => currentCount - 1)
                  }
                }}
                disabled={session}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                onClick={() => {
                  setSession(null)
                  if(breakDuration < 15) {
                  setBreakDuration((currentCount) => currentCount + 1)
                  }
                }}
                disabled={session}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
)

}
export default BreakDuration