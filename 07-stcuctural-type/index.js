"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cat {
    eat() { }
}
class Dog {
    eat() { }
}
function feedCat(cat) { }
// 正常运行
feedCat(new Dog());
/* 结构化类型系统 */
class Cat2 {
    meow() { } // 为class新增独有方法
    eat() { }
}
class Dog2 {
    eat() { }
}
function feedCat2(cat) { }
function feedDog2(cat) { }
// 报错！
// feedCat2(new Dog2())
feedDog2(new Cat2()); // 正常
const CNYCount = 200;
const USDCount = 200;
function addCNY(source, input) {
    return source + input;
}
addCNY(CNYCount, USDCount);
const CNYCount2 = 100;
const USDCount2 = 100;
function addCNY2(source, input) {
    return (source + input);
}
addCNY2(CNYCount2, CNYCount2);
// 报错了！
// addCNY2(CNYCount2, USDCount2);
class CNY3 {
    constructor(value) {
        this.value = value;
    }
}
class USD3 {
    constructor(value) {
        this.value = value;
    }
}
const CNYCount3 = new CNY3(100);
const USDCount3 = new USD3(100);
function addCNY3(source, input) {
    return (source.value + input.value);
}
addCNY3(CNYCount3, CNYCount3);
// 报错了！
// addCNY3(CNYCount3, USDCount3);
