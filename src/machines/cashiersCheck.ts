const cashiersCheck = {
  id: "cashiers-check",
  initial: "uncreated",
  states: {
    uncreated: {
      on: {
        createCheck: "created",
      },
    },
    created: {
      on: {
        cashCheck: "burned",
        cancelCheck: "burned",
      },
    },
    burned: {
      type: "final",
    },
  },
};

export default cashiersCheck;
