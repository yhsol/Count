import React, { useEffect, useState } from "react";
import {
  defaultTimerValue,
  RunStatus,
  TimerView,
} from "../_modules/count/count.const";
import {
  timerStatus,
  useTimer,
  countdown,
  makeTotalCount,
} from "../_modules/count/count.functions";
import { Timer } from "../_modules/count/count.types";
import CountBarChart from "../_modules/count/countBarChart";

const Count = () => {
  const [timer, setTimer] = useState<Timer>(defaultTimerValue);
  const [timerForChart, setTimerForChart] = useState<Timer>(defaultTimerValue);
  const [runStatus, setRunStatus] = useState<RunStatus>(RunStatus.Reset);
  const [timerView, setTimerView] = useState<TimerView>(TimerView.Color);

  const total = makeTotalCount(timerForChart);
  const rest = makeTotalCount(timer);
  const spent = total - rest;

  function handleSetTimer(timerValue: Timer) {
    setTimer(timerValue);
  }

  function handleSetTimerForChart(timerValue: Timer) {
    setTimerForChart(timerValue);
  }

  function handleRunStatus(runStatus: RunStatus) {
    setRunStatus(runStatus);
  }

  const handleTimerStatus = timerStatus({
    runStatusFn: handleRunStatus,
    timerFn: handleSetTimer,
    timerForChartFn: handleSetTimerForChart,
    timerValue: timer,
  });

  function handleChangeTimerValue(e: React.ChangeEvent<HTMLInputElement>) {
    setTimer({ ...timer, [e.target.name]: Number(e.target.value) });
  }
  function handleSelectTimerView(e: React.ChangeEvent<HTMLSelectElement>) {
    setTimerView(e.target.value as TimerView);
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
      handleTimerStatus(RunStatus.Timeout);
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
      <div>COUNT</div>
      {[RunStatus.Reset, RunStatus.Timeout].includes(runStatus) && (
        <div>
          <input
            type="text"
            maxLength={2}
            name="h"
            placeholder="h"
            onChange={handleChangeTimerValue}
            style={{ width: 100, height: 100, textAlign: "right" }}
          />
          <input
            type="text"
            maxLength={2}
            name="m"
            placeholder="m"
            onChange={handleChangeTimerValue}
            style={{ width: 100, height: 100, textAlign: "right" }}
          />
          <input
            type="text"
            maxLength={2}
            name="s"
            placeholder="s"
            onChange={handleChangeTimerValue}
            style={{ width: 100, height: 100, textAlign: "right" }}
          />
        </div>
      )}

      {[RunStatus.Run, RunStatus.Stop].includes(runStatus) &&
        (timerView === TimerView.Text ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div>{timer.h}</div>
            <div>{timer.m}</div>
            <div>{timer.s}</div>
          </div>
        ) : (
          <div style={{ width: "200%", height: "100%" }}>
            <CountBarChart
              data={[
                {
                  spent,
                  spentColor: "#ff5100",
                  rest,
                  restColor: "hsl(0, 0%, 100%)",
                },
              ]}
            />
          </div>
        ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <select
          name="countView"
          id="countView"
          onChange={handleSelectTimerView}
        >
          <option value={TimerView.Color}>Color</option>
          <option value={TimerView.Text}>View</option>
        </select>
        <button onClick={() => handleTimerStatus(RunStatus.Run)}>START</button>
        <button onClick={() => handleTimerStatus(RunStatus.Stop)}>STOP</button>
        <button onClick={() => handleTimerStatus(RunStatus.Reset)}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default Count;
