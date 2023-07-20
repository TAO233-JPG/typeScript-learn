// 类型别名如果声明了泛型坑位，那其实就等价于一个接受参数的函数：

// 类型别名中的泛型大多是用来进行工具类型封装
type Stringify<T> = {
  [K in keyof T]: string;
};

type Clone<T> = {
  [K in keyof T]: T[K];
};

// 可选类型
type mPartial<T> = {
  [k in keyof T]?: T[k];
};

// 类型别名与泛型的结合中，
// 除了映射类型、索引类型等类型工具以外，
// 还有一个非常重要的工具：条件类型。

type IsEqual<T> = T extends true ? 1 : 2;

type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<"linbudu">; // 2

/* 范形约束与默认值 */
type Factory<T = boolean> = T | number | string;
const foo: Factory = false; // 默认为boolean

type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? "success"
  : "failure";

type Res1 = ResStatus<10000>; // "success"
type Res2 = ResStatus<20000>; // "failure"

// type Res3 = ResStatus<'10000'>; // 类型“string”不满足约束“number”。

/* 多范形关联 */

// 我们不仅可以同时传入多个泛型参数，还可以让这几个泛型参数之间也存在联系。
// 我们可以先看一个简单的场景，条件类型下的多泛型参数：
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;

//  "passed!"
type Result1 = Conditional<"linbudu", string, "passed!", "rejected!">;

// "rejected!"
type Result2 = Conditional<"linbudu", boolean, "passed!", "rejected!">;

/* 对象中的范形 */

// 响应类型结构的泛型处理：
interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}

interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}

// function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {}

type StatusSucceed = boolean;
// function handleOperation(): Promise<IRes<StatusSucceed>> {}

/* 函数中的范形 */

function handle<T>(input: T): T {
  return input;
}

const author = "linbudu"; // 使用 const 声明，被推导为 "linbudu"

let authorAge = 18; // 使用 let 声明，被推导为 number

handle(author); // 填充为字面量类型 "linbudu"
handle(authorAge); // 填充为基础类型 number

/* class 中的范形 */

class Queue<TElementType> {
  private _list: TElementType[];

  constructor(initial: TElementType[]) {
    this._list = initial;
  }

  // 入队一个队列泛型子类型的元素
  enqueue<TType extends TElementType>(ele: TType): TElementType[] {
    this._list.push(ele);
    return this._list;
  }

  // 入队一个任意类型元素（无需为队列泛型子类型）
  enqueueWithUnknownType<TType>(element: TType): (TElementType | TType)[] {
    return [...this._list, element];
  }

  // 出队
  dequeue(): TElementType[] {
    this._list.shift();
    return this._list;
  }
}

/* 内置方法中的范形 */

// Promise
function p() {
  return new Promise<boolean>((resolve, reject) => {
    resolve(true);
  });
}

// array
const arr: Array<number> = [1, 2, 3];
// 第一种 reduce
arr.reduce((prev, curr, idx, arr) => {
  return prev;
}, 1);

// 第二种 reduce
// 报错：不能将 number 类型的值赋值给 never 类型
// arr.reduce((prev, curr, idx, arr) => {
//   return [...prev, curr];
// }, []);
arr.reduce<number[]>((prev, curr, idx, arr) => {
  return [...prev, curr];
}, []);
