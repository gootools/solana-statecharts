import Form from "@rjsf/core";
import { useMachine } from "@xstate/react";
import React from "react";
import { Machine } from "xstate";
import idl from "./idls/cashiers_check.json";
import convertIdlToJsonSchema from "./lib/convertIdlToJsonSchema";
import cashiersCheck from "./machines/cashiersCheck";

const schema = convertIdlToJsonSchema(idl as any);

const log = (type: string) => console.log.bind(console, type);

const machine = Machine(cashiersCheck as any);

const App: React.FC = () => {
  const [state, send] = useMachine(machine);

  console.log(state.value, schema);
  return (
    <>
      <h1>{state.value}</h1>

      {machine.states[state.value as any].events.map((event) => (
        <Form
          key={event}
          schema={schema.find((item) => item.title === event) as any}
          onChange={log("changed")}
          onSubmit={(data) => {
            log("submitted")(data);
            send(event);
          }}
          onError={log("errors")}
        />
      ))}
      {Object.keys(state.context).length > 0 && (
        <pre>{JSON.stringify(state.context)}</pre>
      )}
    </>
  );
};

export default App;
