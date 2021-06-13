# Solana Statecharts

This project is an exploration into finite state machines for solana smart contracts that will eventually get merged into https://github.com/goosoftware/goo

The idea behind it is to make it possible to load a smart contract (program) by its public address and only see the methods (instructions) that can be done in its current state.

## Cashiers check example

Take the [cashiers check example](https://github.com/project-serum/anchor/tree/master/examples/cashiers-check) from anchor.

1. Initially the cashiers check doesn't exist.

1. The user calls createCheck with an amount, receiver and optional memo. Now there's a check that the owner can cancel (burn), or the receiver can cash (burn).

1. Once the check is burned there are no more instructions that can happen.

We can create a state machine to represent all of these steps

```typescript
{
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
}
```

Visually that would look something like this

![state animation](https://user-images.githubusercontent.com/601961/121813987-9ac0f700-cc66-11eb-9833-9b8237fd2377.gif)

## Automatically generate UI

Using this state machine we can automatically generate the appropriate UI that shows the contents of the program's account(s) and any methods/instructions to the user based on the current state of the program.

![ui](https://user-images.githubusercontent.com/601961/121814067-0905b980-cc67-11eb-980e-69417310d557.gif)

This is still extremely crude but you hopefully you get the idea.

Developers could start with a dynamic UI generated at runtime by their idl/fsm, and then 'eject' if they wanted to serialize everything to react components and customise their application.

### Goo

Goo will enable developers to 'wire up' a lot of the accounts initially so that the UI can be much more focussed and only show inputs for things that the user will want to edit for example

- when user logs in with Phantom/Sollet automatically make that account the sender
- when creating the check only show editable fields for 'important' things like Receiver address, Token, Amount and Memo
- if the user is logged in with their wallet and they're the receiver, only show cashCheck method. If they're the creator only show the cancelCheck method.

## Extra resources

- https://statecharts.dev/how-to-use-statecharts.html
- https://xstate.js.org/docs/
- https://hoverbear.org/blog/rust-state-machine-pattern/
