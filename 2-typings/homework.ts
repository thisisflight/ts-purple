const makeOrdinal = require("./makeOrdinal");
const isFinite = require("./isFinite");
const isSafeNumber = require("./isSafeNumber");

const enum PowersOfTen {
  TEN = 10,
  ONE_HUNDRED = 100,
  ONE_THOUSAND = 1000,
  ONE_MILLION = 1000_000,
  ONE_BILLION = 1000_000_000,
  ONE_TRILLION = 1000_000_000_000,
  ONE_QUADRILLION = 1000_000_000_000_000,
  MAX = 9007199254740992,
}

const LESS_THAN_TWENTY: string[] = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const TENTHS_LESS_THAN_HUNDRED: string[] = [
  "zero",
  "ten",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function toWords(number: number, asOrdinal: boolean): string {
  if (!isFinite(number)) {
    throw new TypeError(
      "Not a finite number: " + number + " (" + typeof number + ")"
    );
  }
  if (!isSafeNumber(number)) {
    throw new RangeError(
      "Input is not a safe number, it’s either too large or too small."
    );
  }
  const words = generateWords(number);
  return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number: number, words?: string[]): string {
  let remainder: number = 0;
  let word: string = "";
  // We’re done
  if (number === 0) {
    return !words ? "zero" : words.join(" ").replace(/,$/, "");
  }
  // First run
  if (!words) {
    words = [];
  }
  // If negative, prepend “minus”
  if (number < 0) {
    words.push("minus");
    number = Math.abs(number);
  }

  if (number < 20) {
    remainder = 0;
    word = LESS_THAN_TWENTY[number];
  } else if (number < PowersOfTen.ONE_HUNDRED) {
    remainder = number % PowersOfTen.TEN;
    word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / PowersOfTen.TEN)];
    // In case of remainder, we need to handle it here to be able to add the “-”
    if (remainder) {
      word += "-" + LESS_THAN_TWENTY[remainder];
      remainder = 0;
    }
  } else if (number < PowersOfTen.ONE_THOUSAND) {
    remainder = number % PowersOfTen.ONE_HUNDRED;
    word =
      generateWords(Math.floor(number / PowersOfTen.ONE_HUNDRED)) + " hundred";
  } else if (number < PowersOfTen.ONE_MILLION) {
    remainder = number % PowersOfTen.ONE_THOUSAND;
    word =
      generateWords(Math.floor(number / PowersOfTen.ONE_THOUSAND)) +
      " thousand,";
  } else if (number < PowersOfTen.ONE_BILLION) {
    remainder = number % PowersOfTen.ONE_MILLION;
    word =
      generateWords(Math.floor(number / PowersOfTen.ONE_MILLION)) + " million,";
  } else if (number < PowersOfTen.ONE_TRILLION) {
    remainder = number % PowersOfTen.ONE_BILLION;
    word =
      generateWords(Math.floor(number / PowersOfTen.ONE_BILLION)) + " billion,";
  } else if (number < PowersOfTen.ONE_QUADRILLION) {
    remainder = number % PowersOfTen.ONE_TRILLION;
    word =
      generateWords(Math.floor(number / PowersOfTen.ONE_TRILLION)) +
      " trillion,";
  } else if (number <= PowersOfTen.MAX) {
    remainder = number % PowersOfTen.ONE_QUADRILLION;
    word =
      generateWords(Math.floor(number / PowersOfTen.ONE_QUADRILLION)) +
      " quadrillion,";
  }

  words.push(word);
  return generateWords(remainder, words);
}
