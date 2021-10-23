export enum RunStatus {
  Run = "Run",
  Stop = "Stop",
  Reset = "Reset",
  Timeout = "Timeout",
}

export enum TimerView {
  Text = "Text",
  Color = "Color,",
}

export const defaultTimerValue = {
  h: 0,
  m: 0,
  s: 0,
};
