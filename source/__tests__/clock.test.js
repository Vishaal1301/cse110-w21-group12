import { isCountdown, updateTimerSettings, sessionLengths, secondsToString } from "../scripts/clock.js";
const testClock = document.createElement("div");

test("isCountdown", () => {
    expect(isCountdown).toBe(false);
});

test("updateTimerSettings works correctly updates focus, short break, long break", () => {
    expect(updateTimerSettings(testClock, 5, 3, 4)).toBe(true);
    expect(sessionLengths[0]).toBe(5);
    expect(sessionLengths[1]).toBe(3);
    expect(sessionLengths[9]).toBe(4);
});

test("secondsToString converts correctly", () => {
    expect(secondsToString(1550)).toBe("25:50");
});

