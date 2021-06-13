import Form from "@rjsf/core";
import { useMachine } from "@xstate/react";
import React from "react";
import { Machine } from "xstate";
import cashiersCheck from "./machines/cashiersCheck";

const schema = {
  title: "createCheck",
  type: "object",
  required: ["amount"],
  properties: {
    amount: { type: "number" },
    memo: { type: "string" },
    nonce: { type: "number" },
  },
} as any;

const log = (type: string) => console.log.bind(console, type);

const machine = Machine(cashiersCheck as any);

const App: React.FC = () => {
  const [state, send] = useMachine(machine);
  return (
    <>
      <h1>{state.value}</h1>
      <Form
        schema={schema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
      />

      {machine.states[state.value as any].events.map((event) => (
        <button key={event} onClick={() => send(event)}>
          {event}
        </button>
      ))}
      {Object.keys(state.context).length > 0 && (
        <pre>{JSON.stringify(state.context)}</pre>
      )}
    </>
  );
};

export default App;
