class StateManagerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StateManagerError";
  }
}

export default StateManagerError;
