Here is the updated documentation:

# Vanilla State Manager

### Overview

Vanilla State Manager is a lightweight, type-safe state management solution for JavaScript applications. It provides a simple and intuitive API for managing state, handling updates, and notifying listeners.

### Installation

To install Vanilla State Manager, run one of the following commands:

```bash
npm install vanilla-state-manager
```

```bash
yarn add vanilla-state-manager
```

```bash
pnpm install vanilla-state-manager
```

### Usage

Here's an example of how to use Vanilla State Manager:

```javascript
import StateManager from "vanilla-state-manager";

// Create a new state manager with an initial state
const initialState = { count: 0 };
const stateManager = new StateManager(initialState);

// Get the current state
const currentState = stateManager.getState();
console.log(currentState); // Output: { count: 0 }

// Update the state using the setState method
stateManager.setState((draft) => {
  draft.count += 1;
});
console.log(stateManager.getState()); // Output: { count: 1 }

// Subscribe to state changes using the subscribe method
const unsubscribe = stateManager.subscribe((state) => {
  console.log(state);
});
stateManager.setState((draft) => {
  draft.count += 1;
}); // Output: { count: 2 }
unsubscribe();
```

### API

#### `StateManager<T>`

- `constructor(initialState: T)`: Creates a new state manager with the given initial state.
- `getState(): T`: Returns the current state.
- `setState(updater: (draft: T) => void): void`: Updates the state using the provided updater function.
- `subscribe(listener: Listener<T>): () => void`: Subscribes to state changes using the provided listener function.

#### `Listener<T>`

- `(state: T) => void`: A function that will be called whenever the state changes.

### Types

- `T`: The type of the state.

### Errors

- `State cannot be null or undefined`: Thrown when the initial state is null or undefined.
- `Updater function cannot be null or undefined`: Thrown when the updater function is null or undefined.
- `Listener function cannot be null or undefined`: Thrown when the listener function is null or undefined.

### Dependencies

- `immer`: Used for state immutability.

### License

Vanilla State Manager is licensed under the MIT License.

### TypeScript

#### Usage

Here's an example of how to use Vanilla State Manager with TypeScript:

```typescript
import StateManager from "vanilla-state-manager";

// Create a new state manager with an initial state
interface State {
  count: number;
}

const initialState: State = { count: 0 };
const stateManager = new StateManager(initialState);

// Get the current state
const currentState: State = stateManager.getState();
console.log(currentState); // Output: { count: 0 }

// Update the state using the setState method
stateManager.setState((draft: State) => {
  draft.count += 1;
});
console.log(stateManager.getState()); // Output: { count: 1 }

// Subscribe to state changes using the subscribe method
const unsubscribe = stateManager.subscribe((state: State) => {
  console.log(state);
});
stateManager.setState((draft: State) => {
  draft.count += 1;
}); // Output: { count: 2 }
unsubscribe();
```

#### Type Definitions

The `StateManager` class is generic, so you can specify the type of the state when creating a new instance. The `getState` and `setState` methods will then return and accept the specified type, respectively.

The `Listener` type is also generic, so you can specify the type of the state when creating a new listener. The listener function will then receive the specified type as an argument.

Note that the `immer` package is already included in the `vanilla-state-manager` package, so you don't need to install it separately.
