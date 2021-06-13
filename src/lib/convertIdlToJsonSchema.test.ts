import idl from "../idls/cashiers_check.json";
import convertIdlToJsonSchema from "./convertIdlToJsonSchema";

test("all", () => {
  const expected = [
    {
      title: "createCheck",
      type: "object",
      // required: ["amount"],
      properties: {
        amount: { type: "number" },
        memo: { type: "string" },
        nonce: { type: "number" },
      },
    },
    {
      title: "cashCheck",
      type: "object",
      properties: {},
    },
    {
      title: "cancelCheck",
      type: "object",
      properties: {},
    },
  ];

  const actual = convertIdlToJsonSchema(idl as any);

  expect(expected).toEqual(actual);
});
