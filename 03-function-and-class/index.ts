/* 函数类型 */

// 方式一
const foo1 = (name: string): number => {
  return name.length;
};

// 方式二，可读性差，不推荐
const foo2: (name: string) => number = (name) => {
  return name.length;
};

// 要么直接在函数中进行参数和返回值的类型声明，要么使用类型别名将函数声明抽离出来：
type FuncFoo = (name: string) => number;

const foo3: FuncFoo = (name) => {
  return name.length;
};

// interface 就是用来描述一个类型结构的，而函数类型本质上也是一个结构固定的类型罢了。
interface FuncFooStruct {
  (name: string): number;
  name: string;
}

const a: FuncFooStruct = function (name) {
  return name.length;
};
a.name = "232";

// 可选参数与 rest 参数
// 在函数逻辑中注入可选参数默认值
function foo4(name: string, age?: number): number {
  const inputAge = age || 18; // 或使用 age ?? 18
  return name.length + inputAge;
}

// 直接为可选参数声明默认值
function foo5(name: string, age: number = 18): number {
  const inputAge = age;
  return name.length + inputAge;
}

// 重载
//在某些逻辑较复杂的情况下，函数可能有多组入参类型和返回值类型：

function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

// 基于重载签名，
// 我们就实现了将入参类型和返回值类型的可能情况进行关联，
// 获得了更精确的类型标注能力。
function func3(foo: number, bar: true): string;
function func3(foo: number, bar?: false): number;
function func3(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = func3(599); // number
const res2 = func3(599, true); // string
const res3 = func3(599, false); // number

// 伪重载，它只有一个具体实现，
// 其重载体现在方法调用的签名上而非具体实现上
