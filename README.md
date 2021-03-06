# Solana Statecharts

This project is an exploration into finite state machines for solana smart contracts that will eventually get merged into https://github.com/goosoftware/goo

The idea behind it is to make it possible to load a smart contract (program) by its public address and only see the methods (instructions) that can be invoked based upon its current state.

## Cashiers check example

Take the [cashiers check example](https://github.com/project-serum/anchor/tree/master/examples/cashiers-check) from anchor.

1. Initially the cashiers check doesn't exist, so a user needs to `create` it.

1. The user calls `createCheck` with a specified `amount`, `receiver` and optional `memo`. This user can now be considered both the creator and the sender.

1. Now the check exists, either the creator can `cancel` (burn) it, or the receiver can `cash` (burn) it.

1. Once either action occurs, the check has been `burned` and there are no more instructions can be run.

We can create a simple state machine to represent all of this logic.

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

Visually that would look something like this, _note how it's not possible to click on actions at certain times. You can't invoke createCheck after a check has been created for instance._

![state animation](https://user-images.githubusercontent.com/601961/121813987-9ac0f700-cc66-11eb-9833-9b8237fd2377.gif)

## Automatically generate UI

Using this state machine we can automatically generate the appropriate UI that shows the contents of the program's account(s) and any methods/instructions to the user based on the current state of the program.

![ui](https://user-images.githubusercontent.com/601961/121814067-0905b980-cc67-11eb-980e-69417310d557.gif)

This is still extremely crude but you hopefully you get the idea.

Developers could start with a dynamic UI generated at runtime by their idl/fsm, and then 'eject' if they wanted to serialize everything to react components and customise their application.

### Goo

Goo will enable developers to 'wire up' a lot of the accounts initially so that the UI can be much more streamlined and focus only on inputs for things that the user will want to edit, for example

- when a user is creating a check and is logged in with Phantom/Sollet, automatically make that account the sender
- when creating the check only show editable fields for 'important' things like `Receiver address`, `Token`, `Amount` and `Memo`
- if the user is logged in with their wallet and they're the receiver, only show `cashCheck` method. If they're the creator only show the `cancelCheck` method
- display the token and the balance of the check when logged in as either party

## Other examples

### Escrow

Initial deposit creates the escrow account. The matching deposit completes the process and the opposite funds are sent to the respective parties, closing the escrow account.

![Screenshot 2021-06-13 at 5 15 36 PM](https://user-images.githubusercontent.com/601961/121814896-55eb8f00-cc6b-11eb-894a-d3358d011257.png)

### Simple counter

You can only increment the counter after it's been created.

![counter](https://user-images.githubusercontent.com/601961/121814889-52f09e80-cc6b-11eb-9e6e-4ac2e1ae0b70.gif)


## Extra resources

- https://statecharts.dev/how-to-use-statecharts.html
- https://xstate.js.org/docs/
- https://hoverbear.org/blog/rust-state-machine-pattern/
