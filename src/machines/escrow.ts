const escrow = {
  id: "escrow",
  initial: "uncreated",
  states: {
    uncreated: {
      on: {
        deposit: "created",
      },
    },
    created: {
      on: {
        WITHDRAW: "cancelled",
        DEPOSIT: "swapped",
      },
    },
    cancelled: {},
    swapped: {
      on: {},
    },
  },
};

export default escrow;
