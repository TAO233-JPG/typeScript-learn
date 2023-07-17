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

/* 
  class
 */
class Foo {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  get propA(): string {
    return `${this.prop}+A`;
  }

  set propA(value: string) {
    this.prop = `${value}+A`;
  }
  static staticHandler() {}
}

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

// 类的继承

// 抽象类
abstract class AbsFoo {
  abstract absProp: string;
  abstract get absGetter(): string;
  abstract absMethod(name: string): string;
}
class Foo2 implements AbsFoo {
  absProp: string = "linbudu";

  get absGetter() {
    return "linbudu";
  }

  absMethod(name: string) {
    return name;
  }
}

// interface
interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(input: string): string;
}

class Foo3 implements FooStruct {
  absProp: string = "linbudu";

  get absGetter() {
    return "linbudu";
  }

  absMethod(name: string) {
    return name;
  }
}
