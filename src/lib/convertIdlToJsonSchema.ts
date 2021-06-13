import type { Idl, IdlField, IdlType } from "@project-serum/anchor/dist/idl";

const parseArg = (type: IdlType) => {
  switch (type) {
    case "bool":
      return { type: "boolean" };
    case "u8":
    case "i8":
    case "u16":
    case "i16":
    case "u32":
    case "i32":
    case "u64":
    case "i64":
    case "u128":
    case "i128":
      return { type: "number" };
    case "bytes":
      return { type: "number" };
    case "string":
      return { type: "string" };
    case "publicKey":
      return { type: "string" };
  }

  if ((type as any)?.option === "string") {
    return { type: "string" };
  }

  throw new Error(`I don't know what to do with ${type}`);
};

const parseArgs = (args: IdlField[]) =>
  args.reduce((acc, { name, type }) => {
    acc[name] = parseArg(type as any);
    return acc;
  }, {} as Record<string, any>);

const convertIdlToJsonSchema = (idl: Idl) =>
  idl.instructions.map((instruction) => {
    const { name, args, accounts } = instruction;
    return {
      title: name,
      type: "object",
      properties: {
        ...parseArgs(
          accounts.map((acc) => ({ name: acc.name, type: "string" }))
        ),
        ...parseArgs(args),
      },
    };
  });

export default convertIdlToJsonSchema;
