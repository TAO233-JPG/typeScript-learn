/* 类型别名 */

type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);

type Handler = (e: Event) => void;
const clickHandler: Handler = (e) => {};
const moveHandler: Handler = (e) => {};
const dragHandler: Handler = (e) => {};

type ObjType = {
  name: string;
  age: number;
};

/* 交叉类型 & */
interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct;

const profile: ProfileStruct = {
  name: "linbudu",
  age: 18,
};

// 对于对象类型的交叉类型，其内部的同名属性类型同样会按照交叉类型进行合并：
type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
};

type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  };
};

type Composed = Struct1 & Struct2;

type PrimitivePropType = Composed["primitiveProp"]; // never
type ObjectPropType = Composed["objectProp"]; // { name: string; age: number; }

/* 索引类型 */

/* 1. 索引签名类型 */

// 快速声明一个键值类型一致的类型结构：
interface AllStringTypes {
  [key: string]: string;
}

/* 2. 索引类型查询 */
// 索引类型查询，也就是 keyof 操作符。严谨地说，
// 它可以将对象中的所有键转换为对应字面量类型，然后再组合成联合类型。

interface Foo {
  linbudu: 1;
  599: 2;
}

type FooKeys1 = keyof Foo; // "linbudu" | 599
// 在 VS Code 中悬浮鼠标只能看到 'keyof Foo'
// 看不到其中的实际值，你可以这么做：
type FooKeys2 = keyof Foo & {}; // "linbudu" | 599

/* 3. 索引类型访问 */
interface Foo {
  propA: number;
  propB: boolean;
}

type PropAType = Foo["propA"]; // number
type PropBType = Foo["propB"]; // boolean

interface Foo3 {
  propA: number;
  propB: boolean;
  propC: string;
}

type PropTypeUnion = Foo3[keyof Foo3]; // string | number | boolean
type F3Key = keyof Foo3 & {};

/*  映射类型 */

// 映射类型的主要作用即是基于键名映射到键值类型。
type Stringify<T> = {
  [K in keyof T]: string;
};

interface Foo4 {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type StringifiedFoo1 = Stringify<Foo4>;

// 等价于
interface StringifiedFoo2 {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
}

// 克隆类型
type Clone<T> = {
  [K in keyof T]: T[K];
};

/* typeOf */
const str = "linbudu";

const obj = { name: "linbudu" };

const nullVar = null;
const undefinedVar = undefined;

const func = (input: string) => {
  return input.length > 10;
};

type Str = typeof str; // "linbudu"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean

const isInputValid = (input: string) => {
  return input.length > 10;
};

// 不允许表达式
// let isValid: typeof isInputValid("linbudu");

/* 类型守卫 */

// 做不到跨函数上下文来进行类型的信息收集（但别的类型语言中可能是支持的）。
function isString(input: unknown): boolean {
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    // input.replace("linbudu", "linbudu599");
  }
  if (typeof input === "number") {
  }
  // ...
}
// TypeScript 引入了 is 关键字来显式地提供类型信息：
function isString2(input: unknown): input is string {
  return typeof input === "string";
}

function foo2(input: string | number) {
  if (isString2(input)) {
    // 正确了
    input.replace("linbudu", "linbudu599");
  }
  if (typeof input === "number") {
  }
  // ...
}

/* 基于 in 与 instanceof 的类型保护 */
interface Foo {
  foo: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  bar: string;
  barOnly: boolean;
  shared: number;
}

function handle(input: Foo | Bar) {
  if ("foo" in input) {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}

function handle2(input: Foo | Bar) {
  if ("shared" in input) {
    // 类型“Foo | Bar”上不存在属性“fooOnly”。类型“Bar”上不存在属性“fooOnly”。
    // input.fooOnly;
  } else {
    // 类型“never”上不存在属性“barOnly”。
    // input.barOnly;
  }
}

/* 类型断言守卫 */
let name1: any = "linbudu";

function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== "number") {
    throw new Error("Not a number!");
  }
}

assertIsNumber(name1);

// number 类型！
name1.toFixed();

interface Struct11 {
  primitiveProp: string;
}

interface Struct11 {
  // 后续属性声明必须属于同一类型。
  // 属性“primitiveProp”的类型必须为“string”，但此处却为类型“number”。
  primitiveProp: string;
  a: number;
}

interface Struct11 {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
  unionProp: string | number;
}

// 接口“Struct2”错误扩展接口“Struct1”。
interface Struct22 extends Struct11 {
  // “primitiveProp”的类型不兼容。不能将类型“number”分配给类型“string”。
  // primitiveProp: number;
  // 属性“objectProp”的类型不兼容。
  // objectProp: {
  //   age: number;
  // };
  // 属性“unionProp”的类型不兼容。
  // 不能将类型“boolean”分配给类型“string | number”。
  // unionProp: boolean;
}

type a = {
  name: string;
} & {
  name: number;
};

// =>
// type a = {name: string & number}
//
