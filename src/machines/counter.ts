import { assign } from "xstate";

const counter = {
  id: "counter",
  initial: "uninitialized",
  context: {
    count: undefined, // xstate does not like this
  },
  states: {
    uninitialized: {
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
