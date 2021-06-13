const cashiersCheck = {
  id: "cashiers-check",
  initial: "uninitialized",
  states: {
    uninitialized: {
      on: {
        CREATE: "created",
      },
    },
    created: {
      on: {
        CASH: "cashed",
        CANCEL: "cancelled",
      },
    },
    cancelled: {
      type: "final",
    },
    cashed: {
      type: "final",
    },
  },
};

export default cashiersCheck;
