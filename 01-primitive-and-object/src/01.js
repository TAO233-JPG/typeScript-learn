"use strict";
// undefined null
const a = "232";
// const b: string = null;
// void
function func1() { }
function func2() {
    return;
}
function func3() {
    return undefined;
}
// 数组
const arr1 = [];
const arr2 = [];
// 元组：一个数组中只存放固定长度的变量， 即有限长的数组
const arr3 = ["lin", "bu", "du"];
// console.log(arr4[599]); // 报错
console.log(arr3[2]); // 正确
const arr4 = ["linbudu"];
// 具名元组
const arr5 = ["linbudu", 599, true];
// 对于数组，此时仍然无法检查出是否存在隐式访问，因为类型层面并不知道它到底有多少个元素。
// 但对于元组，隐式的越界访问也能够被揪出来给一个警告：
const arr6 = ["linbudu", 599, true];
const obj1 = {
    name: "linbudu",
    age: 2,
    male: true,
};
const obj3 = {
    name: "linbudu",
    age: 599,
};
// 无法分配到 "name" ，因为它是只读属性
// obj3.name = "林不渡"; // 报错
// object、Object 以及 { }
// 所有的原始类型与对象类型最终都指向 Object
// // 对于 undefined、null、void 0 ，需要关闭 strictNullChecks
// const tmp1: Object = undefined;
// const tmp2: Object = null;
// const tmp3: Object = void 0;
const tmp4 = "linbudu";
const tmp5 = 599;
const tmp6 = { name: "linbudu" };
const tmp7 = () => { };
const tmp8 = [];
// const tmp9: String = undefined;
// const tmp10: String = null;
// const tmp11: String = void 0;
const tmp12 = "linbudu";
// object 代表所有非原始类型的类型，即数组、对象与函数类型这些
// const tmp17: object = undefined;
// const tmp18: object = null;
// const tmp19: object = void 0;
// const tmp20: object = "linbudu"; // X 不成立，值为原始类型
// const tmp21: object = 599; // X 不成立，值为原始类型
const tmp22 = { name: "linbudu" };
const tmp23 = () => { };
const tmp24 = [];
// {} 内部无属性定义的空对象，实际上无法对这个变量进行任何赋值操作, 读取属性操作
// const tmp25: {} = undefined; // 仅在关闭 strictNullChecks 时成立，下同
// const tmp26: {} = null;
// const tmp27: {} = void 0; // void 0 等价于 undefined
const tmp28 = "linbudu";
const tmp29 = 599;
const tmp30 = { name: "linbudu" };
const tmp31 = () => { };
const tmp32 = [];
// tmp30.age = 18; // X 类型“{}”上不存在属性“age”。
// tmp30.name = "23"; // X 类型“{}”上不存在属性“name”。
// console.log(tmp30.name); // X 类型“{}”上不存在属性“name”。
// unique symbol
const uniqueSymbolFoo = Symbol("linbudu");
// 类型不兼容
// const uniqueSymbolBar: unique symbol = uniqueSymbolFoo;
const uniqueSymbolBaz = uniqueSymbolFoo;
