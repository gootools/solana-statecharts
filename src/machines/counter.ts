import { assign } from "xstate";

const counter = {
  id: "counter",
  initial: "uncreated",
  context: {
    count: undefined, // xstate does not like this
  },
  states: {
    uncreated: {
      on: {
        CREATE: {
          target: "created",
          actions: assign({
            count: 0,
          }),
        },
      },
    },
    created: {
      on: {
        INCREMENT: {
          target: "created",
          actions: assign({
            count: (context: any) => context.count + 1,
          }),
        },
      },
    },
  },
};

export default counter;
