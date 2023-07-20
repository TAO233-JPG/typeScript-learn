class Cat {
  eat() { }
}

class Dog {
  eat() { }
}

function feedCat(cat: Cat) { }

// 正常运行
feedCat(new Dog())

/* 结构化类型系统 */
class Cat2 {
  meow() { } // 为class新增独有方法
  eat() { }
}

class Dog2 {
  eat() { }
}

function feedCat2(cat: Cat2) { }
function feedDog2(cat: Dog2) { }

// 报错！
// feedCat2(new Dog2())

feedDog2(new Cat2()) // 正常

// 这是因为，TypeScript 比较两个类型并非通过类型的名称（即 feedCat 函数只能通过 Cat 类型调用），
// 而是比较这两个类型上实际拥有的属性与方法。
// 也就是说，这里实际上是比较 Cat 类型上的属性是否都存在于 Dog 类型上。

// 结构化类型系统意味着基于完全的类型结构来判断类型兼容性


/* 标称类型系统 */
// 标称类型系统（Nominal Typing System）要求，两个可兼容的类型，其名称必须是完全一致的，
// 比如以下代码：
type USD = number;
type CNY = number;

const CNYCount: CNY = 200;
const USDCount: USD = 200;

function addCNY(source: CNY, input: CNY) {
  return source + input;
}

addCNY(CNYCount, USDCount)

//在 结构化类型系统中，
// USD 与 CNY （分别代表美元单位与人民币单位）被认为是两个完全一致的类型，
// 因此在 addCNY 函数中可以传入 USD 类型的变量。
// 这就很离谱了，人民币与美元这两个单位实际的意义并不一致，怎么能进行相加？

//在标称类型系统中，CNY 与 USD 被认为是两个完全不同的类型，因此能够避免这一情况发生。


/* 在 TypeScript 中模拟标称类型系统 */
export declare class TagProtector<T extends string> {
  protected __tag__: T;
}

export type Nominal<T, U extends string> = T & TagProtector<U>;

export type CNY2 = Nominal<number, 'CNY'>;

export type USD2 = Nominal<number, 'USD'>;

const CNYCount2 = 100 as CNY2;

const USDCount2 = 100 as USD2;

function addCNY2(source: CNY2, input: CNY2) {
  return (source + input) as CNY;
}

addCNY2(CNYCount2, CNYCount2);

// 报错了！
// addCNY2(CNYCount2, USDCount2);


class CNY3 {
  private __tag!: void;
  constructor(public value: number) {}
}
class USD3 {
  private __tag!: void;
  constructor(public value: number) {}
}

const CNYCount3 = new CNY3(100);
const USDCount3 = new USD3(100);

function addCNY3(source: CNY3, input: CNY3) {
  return (source.value + input.value);
}

addCNY3(CNYCount3, CNYCount3);
// 报错了！
// addCNY3(CNYCount3, USDCount3);




