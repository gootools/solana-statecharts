import { useMachine } from "@xstate/react";
import React from "react";
import { Machine } from "xstate";
import counter from "./machines/counter";

const counterMachine = Machine(counter);

const App: React.FC = () => {
  const [state, send] = useMachine(counterMachine);
  return (
    <>
      {counterMachine.states[state.value as any].events.map((event) => (
        <button key={event} onClick={() => send(event)}>
          {event}
        </button>
      ))}
      <pre>{JSON.stringify(state.context)}</pre>
    </>
  );
};

export default App;
