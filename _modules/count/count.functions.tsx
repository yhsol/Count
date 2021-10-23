import { useEffect, useRef } from "react";
import { defaultTimerValue, RunStatus } from "./count.const";
import { CountDown, RunStatusFns, Timer } from "./count.types";

export function useTimer(callback: () => void, delay: number | null) {
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

export function countdown({ timerFn, timerValue }: CountDown) {
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
}

export const timerStatus =
  ({ runStatusFn, timerFn, timerForChartFn, timerValue }: RunStatusFns) =>
  (runStatus: RunStatus) => {
    if (runStatus === RunStatus.Run) {
      if (timerValue.h === 0 && timerValue.m === 0 && timerValue.s === 0) {
        return;
      }
      timerForChartFn(timerValue);
    }

    if (runStatus === RunStatus.Reset) {
      timerFn(defaultTimerValue);
    }
    runStatusFn(runStatus);
  };

export function makeTotalCount(timer: Timer) {
  return timer.h * 60 * 60 + timer.m * 60 + timer.s;
}
