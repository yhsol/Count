import { RunStatus } from "./count.const";

export type Timer = {
  h: number;
  m: number;
  s: number;
};

export type CountDown = {
  timerFn: (timerValue: Timer) => void;
  timerValue: Timer;
};

export type RunStatusFns = {
  runStatusFn: (runStatus: RunStatus) => void;
  timerFn: (timerValue: Timer) => void;
  timerForChartFn: (timerValue: Timer) => void;
  timerValue: Timer;
};

export type ChartData = Record<string, string | number>[];
