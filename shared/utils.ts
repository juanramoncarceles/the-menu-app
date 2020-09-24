import type { BaseObject } from "../types";

/**
 * Merges two arrays of objects by adding to the first one the objects of the second one
 * only if they don't exist by comparing their id field.
 * @returns A new array (shallow copy) with the merged contents.
 */
export function mergeArraysOfObjects<T extends BaseObject>(
  arr1: Array<T>,
  arr2: Array<T>
) {
  // {id: string | number}
  const finalArr = [...arr1];
  arr2.forEach((el) => {
    if (finalArr.findIndex((fEl) => fEl.id === el.id) === -1) finalArr.push(el);
  });
  return finalArr;
}

/**
 * Creates a function that formats the price based on some options.
 */
export function formatPriceFactory(decimals: number, currencySymbol: string) {
  return function (priceNum: number) {
    return `${priceNum.toFixed(decimals)}${currencySymbol}`;
  };
}
