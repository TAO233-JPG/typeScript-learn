"use strict";
// 字面量类型（Literal Types)
// 字面量类型要求的是值级别的字面量一致。
const str = "linbudu";
const num = 599;
const bool = true;
const t2 = {
    obj: {
        name: "linbudu",
        age: 18,
    },
    user: {
        vip: false,
        promotion: "232",
    },
};
/*
  枚举
 */
// 如果你没有声明枚举的值，它会默认使用数字枚举，并且从 0 开始，以 1 递增：
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items[Items["Bar"] = 1] = "Bar";
    Items[Items["Baz"] = 2] = "Baz";
})(Items || (Items = {}));
// 如果你只为某一个成员指定了枚举值，那么之前未赋值成员仍然会使用从 0 递增的方式，之后的成员则会开始从枚举值递增
var Items2;
(function (Items2) {
    // 0
    Items2[Items2["Foo"] = 0] = "Foo";
    Items2[Items2["Bar"] = 599] = "Bar";
    // 600
    Items2[Items2["Baz"] = 600] = "Baz";
})(Items2 || (Items2 = {}));
const returnNum = () => 100 + 499;
// 如果你使用了延迟求值，
// 那么没有使用延迟求值的枚举成员必须放在使用常量枚举值声明的成员之后，或者放在第一位：
var Items3;
(function (Items3) {
    Items3[Items3["Foo"] = returnNum()] = "Foo";
    Items3[Items3["Bar"] = 599] = "Bar";
    Items3[Items3["Baz"] = 600] = "Baz";
})(Items3 || (Items3 = {}));
var Items4;
(function (Items4) {
    Items4[Items4["Baz"] = 0] = "Baz";
    Items4[Items4["Foo"] = returnNum()] = "Foo";
    Items4[Items4["Bar"] = 599] = "Bar";
})(Items4 || (Items4 = {}));
// 枚举和对象的重要差异在于，
// 对象是单向映射的，我们只能从键映射到键值。
// 而枚举是双向映射的，即你可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员：
var Items5;
(function (Items5) {
    Items5[Items5["Foo"] = 0] = "Foo";
    Items5[Items5["Bar"] = 1] = "Bar";
    Items5[Items5["Baz"] = 2] = "Baz";
    Items5["str"] = "sssss";
})(Items5 || (Items5 = {}));
const fooValue = Items5.Foo; // 0
const fooKey = Items5[0]; // "Foo"
console.log(fooKey, fooValue);
console.log(Items5.str);
const item6Foo = 0 /* Items6.Foo */;
const item6Bar = 1 /* Items6.Bar */;
const item6Baz = 2 /* Items6.Baz */;
// 在ts中
const a = "232424"; //类型是字面量类型
let b = '233424'; //类型为string
