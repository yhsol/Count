import React, { useEffect, useState } from "react";
import { defaultTimerValue, RunStatus } from "../_modules/count/count.const";
import {
  timerStatus,
  useTimer,
  countdown,
} from "../_modules/count/count.functions";
import { Timer } from "../_modules/count/count.types";

const Count = () => {
  const [timer, setTimer] = useState<Timer>(defaultTimerValue);
  const [runStatus, setRunStatus] = useState<RunStatus>(RunStatus.Reset);

  function handleSetTimer(timerValue: Timer) {
    setTimer(timerValue);
  }

  function handleRunStatus(runStatus: RunStatus) {
    setRunStatus(runStatus);
  }

  const handleTimerStatus = timerStatus({
    runStatusFn: handleRunStatus,
    timerFn: handleSetTimer,
  });

  function handleChangeTimerInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTimer({ ...timer, [e.target.name]: Number(e.target.value) });
  }

  useTimer(
    () => {
      countdown({
        timerFn: handleSetTimer,
        timerValue: timer,
      });
    },
    runStatus === RunStatus.Run ? 1000 : null
  );

  useEffect(() => {
    if (timer.h === 0 && timer.m === 0 && timer.s === 0) {
      handleTimerStatus(RunStatus.Timeout)();
    }
  }, [timer]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        margin: "auto",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>count</div>
      {[RunStatus.Reset, RunStatus.Timeout].includes(runStatus) ? (
        <div>
          <input
            type="text"
            maxLength={2}
            name="h"
            placeholder="h"
            onChange={handleChangeTimerInput}
            style={{ width: 100, height: 100, textAlign: "right" }}
          />
          <input
            type="text"
            maxLength={2}
            name="m"
            placeholder="m"
            onChange={handleChangeTimerInput}
            style={{ width: 100, height: 100, textAlign: "right" }}
          />
          <input
            type="text"
            maxLength={2}
            name="s"
            placeholder="s"
            onChange={handleChangeTimerInput}
            style={{ width: 100, height: 100, textAlign: "right" }}
          />
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div>{timer.h}</div>
          <div>{timer.m}</div>
          <div>{timer.s}</div>
        </div>
      )}

      <div>
        <button onClick={handleTimerStatus(RunStatus.Run)}>start</button>
        <button onClick={handleTimerStatus(RunStatus.Stop)}>stop</button>
        <button onClick={handleTimerStatus(RunStatus.Reset)}>reset</button>
      </div>
    </div>
  );
};

export default Count;
