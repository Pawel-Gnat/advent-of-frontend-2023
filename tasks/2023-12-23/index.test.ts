import { generateSchema, validate } from "./index";

test("Validates a JSON object against a dynamically generated schema", () => {
  const schema = generateSchema({
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" },
      wishlist: { type: "array", items: { type: "string" } }
    },
    required: ["name", "age", "wishlist"]
  });

  const validObject = {
    name: "Alice",
    age: 10,
    wishlist: ["Doll", "Book", "Puzzle"]
  };

  expect(validate(schema, validObject)).toBe(true);
});

test("Rejects a JSON object with missing required property", () => {
  const schema = generateSchema({
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" },
      wishlist: { type: "array", items: { type: "string" } }
    },
    required: ["name", "age", "wishlist"]
  });

  const invalidObject = {
    name: "Bob",
    wishlist: ["Train", "Ball"]
  };

  expect(validate(schema, invalidObject)).toBe(false);
});

test("Validates a JSON object with optional and nullable properties", () => {
  const schema = generateSchema({
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number", nullable: true },
      wishlist: { type: "array", items: { type: "string", nullable: true } }
    },
    required: ["name"]
  });

  const validObject = {
    name: "Charlie",
    age: null,
    wishlist: ["Kite", null, "Bike"]
  };

  expect(validate(schema, validObject)).toBe(true);
});
