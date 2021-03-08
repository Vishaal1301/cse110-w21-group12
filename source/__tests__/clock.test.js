import { isCountdown, updateTimerSettings, sessionLengths, secondsToString, startStopTimer, countdown} from "../scripts/clock.js";

const callback = jest.fn();
const testClock = document.createElement("div");
const mockElem = {
    style: {
        display: "none"
    },
};
global.document.getElementById = jest.fn(() => {
    return mockElem;
});
const stor = window.localStorage;
global.window.HTMLMediaElement.prototype.play = jest.fn();
jest.useFakeTimers();
beforeEach(() => {
    if(isCountdown){
        startStopTimer(testClock, callback)
    }
    localStorage.clear();
    const newTasks = {"mainTask": {"name": null, 
        "checked": false, 
        "id": null}, 
    "list": []};
    stor.setItem("tasks", JSON.stringify(newTasks));
    updateTimerSettings(testClock, 1500, 300, 900);
});

test("isCountdown", () => {
    expect(isCountdown).toBe(false);
});

test("updateTimerSettings works correctly updates focus, short break, long break", () => {
    expect(updateTimerSettings(testClock, 5, 3, 4)).toBe(true);
    expect(sessionLengths[0]).toBe(5);
    expect(sessionLengths[1]).toBe(3);
    expect(sessionLengths[7]).toBe(4);
});

test("secondsToString converts correctly", () => {
    expect(secondsToString(1550)).toBe("25:50");
});

test("startStopTimer called once works", () => {
    startStopTimer(testClock, callback);
    expect(callback).not.toBeCalled();
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    jest.runOnlyPendingTimers();
    expect(callback).not.toBeCalled();
});

test("startStopTimer called again during focus", () => {
    expect(startStopTimer(testClock, callback)).toBe(false);
    expect(startStopTimer(testClock, callback)).toBe(true);
    expect(setInterval).toHaveBeenCalledTimes(2);
    expect(callback).toBeCalled();
});

test("startStopTimer called during break", () => {
    expect(startStopTimer(testClock, callback)).toBe(false);
    jest.advanceTimersByTime(1501000);
    expect(testClock.innerHTML).toBe("04:59");
    expect(callback).toBeCalled();
    expect(startStopTimer(testClock, callback)).toBe(true);
    expect(testClock.innerHTML).toBe("25:00");
    expect(setInterval).toHaveBeenCalledTimes(5);
});

test("Entire Pomodoro cycle", () => {
    expect(startStopTimer(testClock, callback)).toBe(false);
    jest.advanceTimersByTime(7800000)
    expect(setInterval).toHaveBeenCalledTimes(14);
});

test("Main task updates with focused task", () => {
    const newTasks = {"mainTask": {"name": "test", 
        "checked": false, 
        "id": 1}, 
    "list": []};
    stor.setItem("tasks", JSON.stringify(newTasks));
    expect(startStopTimer(testClock, callback)).toBe(false);
});

test("Skipping long break", () => {
    expect(startStopTimer(testClock, callback)).toBe(false);
    jest.advanceTimersByTime(7799999);
    expect(testClock.innerHTML).toBe("00:01");
    expect(startStopTimer(testClock, callback)).toBe(true);
    expect(testClock.innerHTML).toBe("25:00");
})

test("Updating timer while in break", () => {
    expect(startStopTimer(testClock, callback)).toBe(false);
    jest.advanceTimersByTime(1501000);
    updateTimerSettings(testClock, 30, 20, 40);
})