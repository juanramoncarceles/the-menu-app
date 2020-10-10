import { mergeArraysOfObjects, formatPriceFactory } from "../shared/utils";

test("Arrays of objects are merged", () => {
  const array1 = [
    {
      id: "0",
      anotherField: "a"
    },
    {
      id: "1",
      anotherField: "b"
    }
  ];

  const array2 = [
    {
      id: "1",
      anotherField: "c"
    },
    {
      id: "2",
      anotherField: "d"
    }
  ];

  const finalArray = mergeArraysOfObjects(array1, array2);

  expect(finalArray).toHaveLength(3);
  expect(finalArray).toEqual([
    { id: "0", anotherField: "a" },
    { id: "1", anotherField: "b" },
    { id: "2", anotherField: "d" },
  ]);
});

test("Price is formatted", () => {
  const fpf = formatPriceFactory(2, "$");
  const formattedPrice = fpf(4.4444);
  expect(formattedPrice).toBe("4.44$");
});
