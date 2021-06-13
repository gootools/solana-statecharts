import idl from "../idls/cashiers_check.json";
import convertIdlToJsonSchema from "./convertIdlToJsonSchema";

test("all", () => {
  const expected = [
    {
      title: "createCheck",
      type: "object",
      // required: ["amount"],
      properties: {
        // accounts
        check: { type: "string" },
        vault: { type: "string" },
        checkSigner: { type: "string" },
        from: { type: "string" },
        to: { type: "string" },
        owner: { type: "string" },
        tokenProgram: { type: "string" },
        rent: { type: "string" },
        // args
        amount: { type: "number" },
        memo: { type: "string" },
        nonce: { type: "number" },
      },
    },
    {
      title: "cashCheck",
      type: "object",
      properties: {
        // accounts
        check: { type: "string" },
        checkSigner: { type: "string" },
        owner: { type: "string" },
        to: { type: "string" },
        tokenProgram: { type: "string" },
        vault: { type: "string" },
      },
    },
    {
      title: "cancelCheck",
      type: "object",
      properties: {
        // accounts
        check: { type: "string" },
        checkSigner: { type: "string" },
        from: { type: "string" },
        owner: { type: "string" },
        tokenProgram: { type: "string" },
        vault: { type: "string" },
      },
    },
  ];

  const actual = convertIdlToJsonSchema(idl as any);

  expect(expected).toEqual(actual);
});
