import { isCountdown, updateTimerSettings, sessionLengths, secondsToString, startStopTimer } from "../scripts/clock.js";
const testClock = document.createElement("div");
const mockP = {
    style: {
        display: "none"
    },
};
global.document.getElementById = jest.fn(() => {
    return mockP;
});
const stor = window.localStorage;
window.HTMLMediaElement.prototype.play = jest.fn();
beforeEach(() => {
    localStorage.clear();
    const newTasks = {"mainTask": {"name": null, 
        "checked": false, 
        "id": null}, 
    "list": []};
    stor.setItem("tasks", JSON.stringify(newTasks));
});
jest.useFakeTimers();

// test("isCountdown", () => {
//     expect(isCountdown).toBe(false);
// });

// test("updateTimerSettings works correctly updates focus, short break, long break", () => {
//     expect(updateTimerSettings(testClock, 5, 3, 4)).toBe(true);
//     expect(sessionLengths[0]).toBe(5);
//     expect(sessionLengths[1]).toBe(3);
//     expect(sessionLengths[9]).toBe(4);
// });

// test("secondsToString converts correctly", () => {
//     expect(secondsToString(1550)).toBe("25:50");
// });

// test("startStopTimer called once works", () => {
//     const callback = jest.fn();
//     startStopTimer(testClock, callback);

//     expect(callback).not.toBeCalled();

//     expect(setInterval).toHaveBeenCalledTimes(1);
//     expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);

//     // jest.runOnlyPendingTimers();

//     expect(callback).not.toBeCalled();
// })

// test("startStopTimer called again during focus", () => {
//     const callback = jest.fn();
//     expect(startStopTimer(testClock, callback)).toBe(true);
//     expect(startStopTimer(testClock, callback)).toBe(false);
//     expect(clearInterval).toHaveBeenCalledTimes(1);
// });

test("startStopTimer called during break", () => {
    const callback = jest.fn();
    expect(startStopTimer(testClock, callback)).toBe(false);
    jest.advanceTimersByTime(1500000);
    expect(startStopTimer(testClock, callback)).toBe(true);
    expect(clearInterval).toHaveBeenCalledTimes(1);
});