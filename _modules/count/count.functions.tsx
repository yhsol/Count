import { useEffect, useRef } from "react";
import { defaultTimerValue, RunStatus } from "./count.const";
import { CountDown, RunStatusFns } from "./count.types";

export function useTimer(callback: () => void, delay: number | null) {
  console.log("useTimer");
  const savedCallback = useRef<any>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const countdown = ({ timerFn, timerValue }: CountDown) => {
  timerFn({
    ...timerValue,
    s: timerValue.s - 1,
  });

  if (timerValue.s === 0) {
    timerFn({
      ...timerValue,
      m: timerValue.m > 0 ? timerValue.m - 1 : timerValue.m,
      s: 59,
    });
  }

  if (timerValue.m === 0 && timerValue.h > 0) {
    timerFn({
      ...timerValue,
      h: timerValue.h - 1,
      m: 59,
    });
  }
};

export const timerStatus =
  ({ runStatusFn, timerFn }: RunStatusFns) =>
  (runStatus: RunStatus) =>
  () => {
    switch (runStatus) {
      case RunStatus.Run:
      case RunStatus.Stop:
      case RunStatus.Timeout:
        runStatusFn(runStatus);
        break;
      case RunStatus.Reset:
        runStatusFn(RunStatus.Reset);
        timerFn(defaultTimerValue);
        break;
      default:
        break;
    }
  };
