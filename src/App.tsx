import { useMachine } from "@xstate/react";
import React from "react";
import { createMachine } from "xstate";
import toggle from "./machines/toggle";

const toggleMachine = createMachine(toggle);

const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <button onClick={() => send("TOGGLE")}>
      {state.value === "inactive"
        ? "Click to activate"
        : "Active! Click to deactivate"}
    </button>
  );
};

export default Toggler;
