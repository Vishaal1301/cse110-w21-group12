import { startStopTimer, updateTimerSettings, isCountdown } from '../scripts/clock.js'

test('isCountdown', () => {
    expect(isCountdown).toBe(false);
  });