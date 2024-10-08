import { produce } from "immer";
import StateManagerError from "./error";

type Listener<T> = (state: T) => void;

class StateManager<T> {
  private state: T;
  private listeners: Listener<T>[] = [];

  constructor(initialState: T) {
    if (initialState === null || initialState === undefined) {
      throw new StateManagerError("State cannot be null or undefined");
    }
    this.state = initialState;
  }

  public getState() {
    return this.state;
  }

  public setState(updater: (draft: T) => void): void {
    // Use Immer's produce internally to handle state immutability
    if (updater === null || updater === undefined) {
      throw new StateManagerError(
        "Updater function cannot be null or undefined"
      );
    }
    const nextState = produce(this.state, updater);
    if (nextState === this.state) {
      return;
    }

    this.state = nextState;
    this.notifyListeners();
  }

  public subscribe(listener: Listener<T>) {
    if (listener === null || listener === undefined) {
      throw new StateManagerError(
        "Listener function cannot be null or undefined"
      );
    }

    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export default StateManager;
