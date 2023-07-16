"use strict";
/* 函数类型 */
// 方式一
const foo1 = (name) => {
    return name.length;
};
// 方式二，可读性差，不推荐
const foo2 = (name) => {
    return name.length;
};
const foo3 = (name) => {
    return name.length;
};
const a = function (name) {
    return name.length;
};
a.name = "232";

// 可选参数与 rest 参数
