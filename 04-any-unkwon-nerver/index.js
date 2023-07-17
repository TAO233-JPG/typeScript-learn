"use strict";
/* any */
// any 表示任意类型
let a; // any
function fn(name) { }
// 可以在 any 类型变量上任意地进行操作，包括赋值、访问、方法调用等等，
// 此时可以认为类型推导与检查是被完全禁用的：
// any 的本质是类型系统中的顶级类型
/* unkown */
// unknown 类型和 any 类型有些类似，
// 一个 unknown 类型的变量可以再次赋值为任意其它类型，
// 但只能赋值给 any 与 unknown 类型的变量：
let unknownVar = "linbudu";
unknownVar = false;
unknownVar = "linbudu";
unknownVar = {
    site: "juejin",
};
unknownVar = () => { };
// const val1: string = unknownVar; // Error
// const val2: number = unknownVar; // Error
// const val3: () => {} = unknownVar; // Error
// const val4: {} = unknownVar; // Error
const val5 = unknownVar;
// never 类型被称为 Bottom Type，是整个类型系统层级中最底层的类型。
// 和 null、undefined 一样，它是所有类型的子类型，
// 但只有 never 类型的变量能够赋值给另一个 never 类型变量。
// 但在某些情况下使用 never 确实是符合逻辑的，比如一个只负责抛出错误的函数：
function justThrow() {
    throw new Error();
}
function fn2(strOrNumOrBool) {
    if (typeof strOrNumOrBool === "string") {
        // 一定是字符串！
        strOrNumOrBool.charAt(1);
    }
    else if (typeof strOrNumOrBool === "number") {
        strOrNumOrBool.toFixed();
    }
    else if (typeof strOrNumOrBool === "boolean") {
        strOrNumOrBool === true;
    }
    else {
        const _exhaustiveCheck = strOrNumOrBool;
        throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
    }
}
const arr = [];
/* 类型断言 */
// 类型断言能够显式告知类型检查程序当前这个变量的类型，可以进行类型分析地修正、类型。
// 它其实就是一个将变量的已有类型更改为新指定类型的操作，
// 它的基本语法是 as NewType，你可以将 any / unknown 类型断言到一个具体的类型：
let unknownVar2;
unknownVar2.foo();
// 这是因为你的断言类型和原类型的差异太大，
// 需要先断言到一个通用的类，即 any / unknown。
// 这一通用类型包含了所有可能的类型，因此断言到它和从它断言到另一个类型差异不大。
const str = "linbudu";
str.handler();
// 使用尖括号断言
str.handler();
// b.charAt(1); //❌
b.charAt(1); // 正常
// 使用类型
// const obj: IStruct = {}; // 必须补充所有字段，否则报错
// 使用断言
const obj = {
    bar: {
        baz: {},
    },
};
