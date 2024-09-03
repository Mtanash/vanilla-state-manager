import { describe, expect, it, vi } from "vitest";
import StateManager from "..";

interface TestState {
  foo: string;
}

describe("StateManager", () => {
  it("initializes with the correct state", () => {
    const initialState: TestState = { foo: "bar" };
    const stateManager = new StateManager(initialState);
    expect(stateManager.getState()).toEqual(initialState);
  });

  it("updates state correctly", () => {
    const initialState: TestState = { foo: "bar" };
    const stateManager = new StateManager(initialState);
    const updater = (draft: TestState) => {
      draft.foo = "baz";
    };
    stateManager.setState(updater);
    expect(stateManager.getState()).toEqual({ foo: "baz" });
  });

  it("notifies listeners when state changes", () => {
    const initialState: TestState = { foo: "bar" };
    const stateManager = new StateManager(initialState);
    const listener = vi.fn((state: TestState) => {
      expect(state).toEqual({ foo: "baz" });
    });
    stateManager.subscribe(listener);
    const updater = (draft: TestState) => {
      draft.foo = "baz";
    };
    stateManager.setState(updater);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("unsubscribes listeners correctly", () => {
    const initialState: TestState = { foo: "bar" };
    const stateManager = new StateManager(initialState);
    const listener = vi.fn((state: TestState) => {
      expect(state).toEqual({ foo: "baz" });
    });
    const unsubscribe = stateManager.subscribe(listener);
    unsubscribe();
    const updater = (draft: TestState) => {
      draft.foo = "baz";
    };
    stateManager.setState(updater);
    expect(listener).not.toHaveBeenCalled();
  });

  it("handles multiple listeners correctly", () => {
    const initialState: TestState = { foo: "bar" };
    const stateManager = new StateManager(initialState);
    const listener1 = vi.fn((state: TestState) => {
      expect(state).toEqual({ foo: "baz" });
    });
    const listener2 = vi.fn((state: TestState) => {
      expect(state).toEqual({ foo: "baz" });
    });
    stateManager.subscribe(listener1);
    stateManager.subscribe(listener2);
    const updater = (draft: TestState) => {
      draft.foo = "baz";
    };
    stateManager.setState(updater);
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
  });
});

describe("StateManager edge cases", () => {
  it("throws an error when initialized with a null state", () => {
    expect(() => new StateManager(null)).toThrowError(
      "State cannot be null or undefined"
    );
  });

  it("throws an error when initialized with an undefined state", () => {
    expect(() => new StateManager(undefined)).toThrowError(
      "State cannot be null or undefined"
    );
  });

  // TODO: Fix this test
  it("handles multiple updates with the same state", () => {
    const stateManager = new StateManager({ foo: "bar" });
    const listener = vi.fn();
    stateManager.subscribe(listener);
    stateManager.setState((draft) => {
      draft.foo = "baz";
    });
    stateManager.setState((draft) => {
      draft.foo = "baz";
    });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("handles multiple updates with different states", () => {
    const stateManager = new StateManager({ foo: "bar" });
    const listener = vi.fn();
    stateManager.subscribe(listener);
    stateManager.setState((draft) => {
      draft.foo = "baz";
    });
    stateManager.setState((draft) => {
      draft.foo = "qux";
    });
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
