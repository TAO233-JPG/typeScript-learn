"use strict";
/* 函数类型 */
// 方式一
var foo1 = function (name) {
    return name.length;
};
// 方式二，可读性差，不推荐
var foo2 = function (name) {
    return name.length;
};
var foo3 = function (name) {
    return name.length;
};
var a = function (name) {
    return name.length;
};
a.name = "232";
// 可选参数与 rest 参数
// 在函数逻辑中注入可选参数默认值
function foo4(name, age) {
    var inputAge = age || 18; // 或使用 age ?? 18
    return name.length + inputAge;
}
// 直接为可选参数声明默认值
function foo5(name, age) {
    if (age === void 0) { age = 18; }
    var inputAge = age;
    return name.length + inputAge;
}
// 重载
//在某些逻辑较复杂的情况下，函数可能有多组入参类型和返回值类型：
function func(foo, bar) {
    if (bar) {
        return String(foo);
    }
    else {
        return foo * 599;
    }
}
function func3(foo, bar) {
    if (bar) {
        return String(foo);
    }
    else {
        return foo * 599;
    }
}
var res1 = func3(599); // number
var res2 = func3(599, true); // string
var res3 = func3(599, false); // number
// 伪重载，它只有一个具体实现，
// 其重载体现在方法调用的签名上而非具体实现上
/*
  class
 */
var Foo = /** @class */ (function () {
    function Foo(inputProp) {
        this.prop = inputProp;
    }
    Foo.prototype.print = function (addon) {
        console.log("".concat(this.prop, " and ").concat(addon));
    };
    Object.defineProperty(Foo.prototype, "propA", {
        get: function () {
            return "".concat(this.prop, "+A");
        },
        set: function (value) {
            this.prop = "".concat(value, "+A");
        },
        enumerable: false,
        configurable: true
    });
    Foo.staticHandler = function () { };
    return Foo;
}());
// 修饰符
// 在 TypeScript 中我们能够为 Class 成员添加这些修饰符：
// public / private / protected /  访问性修饰符
// readonly 操作性修饰符
// 静态属性
// 不同于实例成员，
// 在类的内部静态成员无法通过 this 来访问，
// 需要通过 Foo.staticHandler
// 静态成员直接被挂载在函数体上，
// 而实例成员挂载在原型上，
