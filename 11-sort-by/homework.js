"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sort_by_1 = require("sort-by");
var users = [];
users = [
  {
    id: 7,
    name: "Foo",
    age: "34",
    email: { primary: "foo@email.com" },
  },
  {
    id: 3,
    name: "Baz",
    age: "67",
    email: { primary: "baz@email.com" },
  },
  {
    id: 4,
    name: "Bar",
    age: "67",
    email: { primary: "bar@email.com" },
  },
];
users.sort(sort_by_1("name", "age"));
