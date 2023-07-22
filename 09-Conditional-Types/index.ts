/* 类型里的逻辑运算 */

// 语法类似于
// ValueA === ValueB ? Result1 : Result2;
// TypeA extends TypeB ? Result1 : Result2;

/* 
  条件类型中使用 extends 判断类型的兼容性，而非判断类型的全等性。
  这是因为在类型层面中，对于能够进行赋值操作的两个变量，
  我们并不需要它们的类型完全相等，
  只需要具有兼容性，而两个完全相同的类型，其 extends 自然也是成立的。
*/

// 条件类型一般用在范形中，可以基于范形参数做进一步的类型操作
type LiteralType<T> = T extends string ? "string" : "other";

type Res1 = LiteralType<"linbudu">; // "string"
type Res2 = LiteralType<599>; // "other"

// 而在函数中，条件类型与泛型的搭配同样很常见。
function universalAdd<T extends number | bigint | string>(x: T, y: T) {
  return x + (y as any);
}
universalAdd(599, 1); // T 填充为 599 | 1
universalAdd("linbudu", "599"); // T 填充为 linbudu | 599

function universalAdd2<T extends number | bigint | string>(
  x: T,
  y: T
): LiteralToPrimitive<T> {
  return x + (y as any);
}

export type LiteralToPrimitive<T> = T extends number
  ? number
  : T extends bigint
  ? bigint
  : T extends string
  ? string
  : never;

universalAdd2("linbudu", "599"); // string
universalAdd2(599, 1); // number
universalAdd2(10n, 10n); // bigint

type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? "the function return string"
  : "the function return no string";

type StringResult1 = FunctionConditionType<() => string>;
type StringResult2 = FunctionConditionType<() => boolean>;

/* 上面讲到的这些条件类型，
  本质上就是在泛型基于调用填充类型信息的基础上，新增了基于类型信息的条件判断。
  看起来很不错，但你可能也发现了一个无法满足的场景：提取传入的类型信息。 
*/

// TypeScript 中支持通过 infer 关键字来在条件类型中提取类型的某一部分信息，

type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R
  ? R
  : never;

// 当传入的类型参数满足 T extends (...args: any[] ) => infer R 这样一个结构（
// 不用管 infer R，当它是 any 就行），
// 返回 infer R 位置的值，即 R。否则，返回 never。

type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]

// 提取首尾两个
type ExtracStartAndEnd<T extends any[]> = T extends [
  infer start,
  ...any[],
  infer end
]
  ? [start, end]
  : T;

// 交换首尾
type SwapStartAndEnd<T extends any[]> = T extends [
  infer start,
  ...infer mid,
  infer end
]
  ? [end, ...mid, start]
  : T;

type ArrayItemType<T> = T extends Array<infer ElementType>
  ? ElementType
  : never;

type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>; // string | number

// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropType2<T, K extends keyof T> = T[K];

type c = PropType2<{ age: 10 }, "age">;
type c2 = PropType<{ age: 10 }, "age">;

type PropTypeResult1 = PropType<{ name: string }, "name">; // string
type PropTypeResult2 = PropType<{ name: string; age: number }, "name" | "age">; // string | number

// 反转键名与键值
// 使用& string 来确保属性名为 string 类型的小技巧。
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V & string, K>
  : never;

type ReverseKeyValueResult1 = ReverseKeyValue<{ key: "value" }>; // { "value": "key" }
type ReverseKeyValueResult2 = ReverseKeyValue<{ name: "wu" }>; // { "value": "key" }

// 当然，在这时应该使用递归来处理任意嵌套深度：
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;

/* 分布式条件类型 */
type Condition<T> = T extends 1 | 2 | 3 ? T : never;

// 1 | 2 | 3
type Res11 = Condition<1 | 2 | 3 | 4 | 5>;

// never
type Res22 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;

// 唯一的差异就是在 Res1 中，进行判断的联合类型被作为泛型参数传入给另一个独立的类型别名，
// 而 Res2 中直接对这两者进行判断。

type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// "N" | "Y"
type Res3 = Naked<number | boolean>;
// "N"
type Res4 = Wrapped<number | boolean>;
// 它们唯一的差异是条件类型中的泛型参数是否被数组包裹了。

/* 
  条件类型分布式起作用的条件。
  首先，你的类型参数需要是一个联合类型 。
  其次，类型参数需要通过泛型参数的方式传入，
  而不能直接进行条件类型判断（如 Res2 中）。
  最后，条件类型中的泛型参数不能被包裹。

  条件类型分布式特性会产生的效果也很明显了，即将这个联合类型拆开来，
  每个分支分别进行一次条件类型判断，再将最后的结果合并起来
*/

type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverRes1 = IsNever<never>; // true
type IsNeverRes2 = IsNever<"linbudu">; // false
type IsNeverRes3 = IsNever<number | boolean | never>; // false


type IsNever2<T> = T extends never ? true : false;

type IsNeverRes11 = IsNever2<never>; // true
type IsNeverRes22 = IsNever2<number | boolean | never>; // false
