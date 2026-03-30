// ============================================================================
// Week 1: JavaScript Core APIs — 코드 예제 모음
// ============================================================================

// ─── Day 1: 원시값 & 래퍼 객체 ─────────────────────────────────────────────

// --- Symbol ---
const sym1 = Symbol("description");
const sym2 = Symbol("description");
console.log(sym1 === sym2); // false — 항상 유니크

const globalSym = Symbol.for("shared");
console.log(Symbol.for("shared") === globalSym); // true — 전역 레지스트리
console.log(Symbol.keyFor(globalSym)); // "shared"

// Symbol.iterator — 커스텀 이터러블
class Range {
  constructor(public start: number, public end: number) {}

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        return current <= end
          ? { value: current++, done: false }
          : { done: true, value: undefined };
      },
    };
  }
}
console.log([...new Range(1, 5)]); // [1, 2, 3, 4, 5]

// Symbol.asyncIterator — 비동기 이터러블
class AsyncRange {
  constructor(public start: number, public end: number) {}

  async *[Symbol.asyncIterator]() {
    for (let i = this.start; i <= this.end; i++) {
      await new Promise((r) => setTimeout(r, 100));
      yield i;
    }
  }
}
// for await (const n of new AsyncRange(1, 3)) console.log(n);

// Symbol.toPrimitive — 타입 변환 커스터마이징
class Money {
  constructor(public amount: number, public currency: string) {}

  [Symbol.toPrimitive](hint: string) {
    switch (hint) {
      case "number":
        return this.amount;
      case "string":
        return `${this.amount} ${this.currency}`;
      default:
        return this.amount;
    }
  }
}
const price = new Money(100, "USD");
console.log(+price); // 100
console.log(`${price}`); // "100 USD"

// Symbol.hasInstance — instanceof 커스터마이징
class EvenNumber {
  static [Symbol.hasInstance](num: unknown) {
    return typeof num === "number" && num % 2 === 0;
  }
}
console.log(4 instanceof EvenNumber); // true
console.log(5 instanceof EvenNumber); // false

// Symbol.species — 파생 객체 타입 제어
class SpecialArray<T> extends Array<T> {
  static get [Symbol.species]() {
    return Array; // map/filter 등이 일반 Array를 반환하도록
  }
}
const sarr = new SpecialArray(1, 2, 3);
const mapped = sarr.map((x) => x * 2);
console.log(mapped instanceof SpecialArray); // false
console.log(mapped instanceof Array); // true

// --- BigInt ---
const big = 123456789012345678901234567890n;
const fromNum = BigInt(42);
console.log(big + fromNum); // BigInt끼리만 연산 가능
console.log(BigInt.asIntN(8, 255n)); // -1 (8비트 signed)
console.log(BigInt.asUintN(8, 255n)); // 255 (8비트 unsigned)

// --- Number 정적 메서드 ---
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(42)); // true
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("NaN")); // false (글로벌 isNaN과 다름!)
console.log(Number.isInteger(5.0)); // true
console.log(Number.isSafeInteger(2 ** 53)); // false
console.log(Number.EPSILON); // 2.220446049250313e-16
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
console.log(Number.parseFloat("3.14abc")); // 3.14
console.log(Number.parseInt("0xFF", 16)); // 255

// ─── Day 2: String & RegExp ────────────────────────────────────────────────

// --- String 메서드 ---
const raw = String.raw`Hello\nWorld`; // 이스케이프 무시
console.log(raw); // "Hello\nWorld" (줄바꿈 X)

console.log("abc".at(-1)); // "c"
console.log("café".normalize("NFD").length); // 5 (e + accent 분리)
console.log("café".normalize("NFC").length); // 4

console.log("aabbcc".replaceAll("a", "x")); // "xxbbcc"

// matchAll — 모든 매치 + 캡처 그룹
const matches = [...'2024-01-15, 2024-02-20'.matchAll(/(\d{4})-(\d{2})-(\d{2})/g)];
matches.forEach(m => console.log(m[0], m[1], m[2], m[3]));

console.log("5".padStart(3, "0")); // "005"
console.log("hi".padEnd(10, ".")); // "hi........"
console.log("  hello  ".trimStart()); // "hello  "
console.log("  hello  ".trimEnd()); // "  hello"
console.log("hello world".startsWith("hello")); // true
console.log("hello world".endsWith("world")); // true
console.log("hello world".includes("lo wo")); // true

// isWellFormed & toWellFormed — lone surrogate 처리
const bad = "ab\uD800cd";
console.log(bad.isWellFormed()); // false
console.log(bad.toWellFormed()); // "ab�cd" (대체 문자로 교체)

// --- RegExp 고급 ---
// d flag (indices) — 매치 위치 정보
const re = /(?<year>\d{4})-(?<month>\d{2})/d;
const m = re.exec("Date: 2024-03");
console.log(m?.indices?.groups); // { year: [6, 10], month: [11, 13] }

// v flag (unicodeSets) — 더 강력한 유니코드 매칭
// const reUnicode = /[\p{Script=Hangul}&&\p{Letter}]/v;

// Named groups
const dateRe = /(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/;
const { groups } = dateRe.exec("2024-12-25")!;
console.log(groups); // { y: "2024", m: "12", d: "25" }

// Lookbehind
console.log("$100 €200".match(/(?<=\$)\d+/)); // ["100"]
console.log("$100 €200".match(/(?<=€)\d+/)); // ["200"]
console.log("$100 €200".match(/(?<!\$)\d+/)); // ["00"] ($ 뒤가 아닌 숫자)

// ─── Day 3: Object 심화 ────────────────────────────────────────────────────

// Object.create — 프로토타입 지정 생성
const proto = { greet() { return `Hello, ${this.name}`; } };
const obj = Object.create(proto, {
  name: { value: "World", writable: true, enumerable: true, configurable: true }
});
console.log(obj.greet()); // "Hello, World"

// Object.assign — 얕은 복사/병합
const merged = Object.assign({}, { a: 1 }, { b: 2 }, { a: 3 });
console.log(merged); // { a: 3, b: 2 }

// Object.is — SameValueZero 대신 SameValue
console.log(Object.is(NaN, NaN)); // true (=== 는 false)
console.log(Object.is(+0, -0)); // false (=== 는 true)

// Object.entries → 변환 → Object.fromEntries
const original = { a: 1, b: 2, c: 3 };
const doubled = Object.fromEntries(
  Object.entries(original).map(([k, v]) => [k, v * 2])
);
console.log(doubled); // { a: 2, b: 4, c: 6 }

// Property Descriptors
const target = {};
Object.defineProperty(target, "secret", {
  value: 42,
  writable: false,
  enumerable: false,
  configurable: false,
});
console.log(target.secret); // 42
console.log(Object.keys(target)); // [] (enumerable: false)
console.log(Object.getOwnPropertyDescriptor(target, "secret"));

// Object.defineProperties — 여러 속성 한번에
Object.defineProperties(target, {
  x: { value: 10, enumerable: true },
  y: { get() { return this.x * 2; }, enumerable: true },
});
console.log(target.x, target.y); // 10, 20

// getOwnPropertyNames vs keys vs getOwnPropertySymbols
const symKey = Symbol("sym");
const mixed = { a: 1, [symKey]: 2 };
Object.defineProperty(mixed, "hidden", { value: 3, enumerable: false });
console.log(Object.keys(mixed)); // ["a"]
console.log(Object.getOwnPropertyNames(mixed)); // ["a", "hidden"]
console.log(Object.getOwnPropertySymbols(mixed)); // [Symbol(sym)]

// freeze / seal / preventExtensions
const frozen = Object.freeze({ nested: { val: 1 } });
// frozen.nested.val = 2; // 얕은 freeze — nested는 변경 가능!
console.log(Object.isFrozen(frozen)); // true

const sealed = Object.seal({ a: 1 });
sealed.a = 2; // OK — 값 변경 가능
// sealed.b = 3; // Error — 속성 추가 불가
// delete sealed.a; // Error — 속성 삭제 불가
console.log(Object.isSealed(sealed)); // true

// Object.hasOwn — Object.prototype.hasOwnProperty 대체
console.log(Object.hasOwn({ a: 1 }, "a")); // true
console.log(Object.hasOwn({ a: 1 }, "toString")); // false

// Object.groupBy (ES2024)
const items = [
  { type: "fruit", name: "apple" },
  { type: "veggie", name: "carrot" },
  { type: "fruit", name: "banana" },
];
const grouped = Object.groupBy(items, (item) => item.type);
console.log(grouped);
// { fruit: [{...apple}, {...banana}], veggie: [{...carrot}] }

// structuredClone — 깊은 복사
const deep = { a: 1, b: { c: 2 }, d: new Date(), e: new Map([[1, 2]]) };
const cloned = structuredClone(deep);
cloned.b.c = 99;
console.log(deep.b.c); // 2 (원본 불변)
console.log(cloned.d instanceof Date); // true
console.log(cloned.e instanceof Map); // true

// ─── Day 4: Array 전체 메서드 ──────────────────────────────────────────────

// --- Mutating Methods ---
const arr = [3, 1, 4, 1, 5];
arr.push(9); // [3,1,4,1,5,9]
arr.pop(); // [3,1,4,1,5] — returns 9
arr.unshift(0); // [0,3,1,4,1,5]
arr.shift(); // [3,1,4,1,5] — returns 0
arr.splice(1, 2, 10, 20); // [3,10,20,1,5] — 인덱스1부터 2개 제거, 10,20 삽입
arr.sort((a, b) => a - b); // [1,3,5,10,20]
arr.reverse(); // [20,10,5,3,1]
arr.fill(0, 2, 4); // [20,10,0,0,1]
arr.copyWithin(0, 3); // [0,1,0,0,1]

// --- Non-mutating (새로운 Change by Copy 메서드 포함) ---
const nums = [3, 1, 4, 1, 5, 9];

// 기존 non-mutating
console.log(nums.map((n) => n * 2)); // [6,2,8,2,10,18]
console.log(nums.filter((n) => n > 3)); // [4,5,9]
console.log(nums.reduce((sum, n) => sum + n, 0)); // 23
console.log(nums.reduceRight((acc, n) => acc + n.toString(), "")); // "951413"
console.log(nums.find((n) => n > 3)); // 4
console.log(nums.findIndex((n) => n > 3)); // 2
console.log(nums.findLast((n) => n > 3)); // 9
console.log(nums.findLastIndex((n) => n > 3)); // 5
console.log(nums.every((n) => n > 0)); // true
console.log(nums.some((n) => n > 8)); // true
console.log(nums.includes(4)); // true
console.log(nums.indexOf(1)); // 1
console.log(nums.lastIndexOf(1)); // 3
console.log(nums.flat()); // 이미 flat이면 동일
console.log([[1, 2], [3, [4]]].flat(Infinity)); // [1,2,3,4]
console.log(nums.flatMap((n) => [n, n * 10])); // [3,30,1,10,4,40,...]
console.log(nums.slice(1, 3)); // [1,4]
console.log(nums.concat([10, 11])); // [...nums, 10, 11]
console.log(nums.join("-")); // "3-1-4-1-5-9"

// ES2023 Change-by-Copy (원본 불변)
console.log(nums.at(-1)); // 9
console.log(nums.with(0, 99)); // [99,1,4,1,5,9] — 원본 불변
console.log(nums.toSorted((a, b) => a - b)); // [1,1,3,4,5,9]
console.log(nums.toReversed()); // [9,5,1,4,1,3]
console.log(nums.toSpliced(1, 2, 99)); // [3,99,1,5,9]

// Array 정적 메서드
console.log(Array.from("hello")); // ["h","e","l","l","o"]
console.log(Array.from({ length: 5 }, (_, i) => i ** 2)); // [0,1,4,9,16]
console.log(Array.of(1, 2, 3)); // [1,2,3]
console.log(Array.isArray([])); // true
// Array.fromAsync — 비동기 이터러블에서 배열 생성
// const asyncArr = await Array.fromAsync(asyncIterable);

// --- TypedArray & ArrayBuffer ---
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
view.setFloat64(0, Math.PI);
view.setInt32(8, 42, true); // little-endian
console.log(view.getFloat64(0)); // 3.141592653589793
console.log(view.getInt32(8, true)); // 42

const u8 = new Uint8Array([255, 0, 128]);
const f64 = new Float64Array([1.1, 2.2, 3.3]);
console.log(u8.buffer); // ArrayBuffer
console.log(f64.map((x) => x * 2)); // Float64Array [2.2, 4.4, 6.6]

// ─── Day 5: Map, Set, Weak*, WeakRef ───────────────────────────────────────

// --- Map ---
const map = new Map<string, number>();
map.set("a", 1).set("b", 2).set("c", 3);
console.log(map.get("a")); // 1
console.log(map.has("b")); // true
console.log(map.size); // 3
map.delete("c");
for (const [k, v] of map.entries()) console.log(k, v);
for (const k of map.keys()) console.log(k);
for (const v of map.values()) console.log(v);
map.forEach((v, k) => console.log(k, v));
map.clear();

// --- Set (ES2025 새 메서드 포함) ---
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);
setA.add(5);
setA.has(3); // true
setA.delete(1);
console.log(setA.size);

// ES2025 Set 메서드 (최신 엔진에서 지원)
console.log(setA.union(setB)); // Set {2,3,4,5,6}
console.log(setA.intersection(setB)); // Set {3,4,5}
console.log(setA.difference(setB)); // Set {2}
console.log(setA.symmetricDifference(setB)); // Set {2,6}
console.log(setA.isSubsetOf(new Set([1, 2, 3, 4, 5]))); // true
console.log(setA.isSupersetOf(new Set([2, 3]))); // true
console.log(setA.isDisjointFrom(new Set([10, 20]))); // true

// --- WeakMap & WeakSet ---
// 키가 GC되면 자동으로 엔트리 제거
let element = { id: "btn-1" };
const metadata = new WeakMap();
metadata.set(element, { clicks: 0, lastClick: null });
console.log(metadata.get(element)); // { clicks: 0, ... }
// element = null; → 메타데이터도 GC 대상

// Private data 패턴
const privateData = new WeakMap();
class Person {
  constructor(name: string, ssn: string) {
    privateData.set(this, { ssn });
    this.name = name;
  }
  name: string;
  getSSN() { return privateData.get(this)?.ssn; }
}

// --- WeakRef & FinalizationRegistry ---
const registry = new FinalizationRegistry((heldValue: string) => {
  console.log(`${heldValue} was garbage collected`);
});

let largeObj: object | null = { data: new Array(1_000_000) };
const weakRef = new WeakRef(largeObj);
registry.register(largeObj, "largeObj");

console.log(weakRef.deref()); // 아직 살아있음
// largeObj = null; // GC가 수거하면 registry 콜백 호출
// 이후 weakRef.deref()는 undefined 반환 가능

// --- WeakRef 실전: 캐시 ---
class WeakCache<K extends object, V> {
  private cache = new Map<K, WeakRef<V & object>>();
  private registry = new FinalizationRegistry<K>((key) => {
    this.cache.delete(key);
  });

  set(key: K, value: V & object) {
    this.cache.set(key, new WeakRef(value));
    this.registry.register(value, key);
  }

  get(key: K): V | undefined {
    return this.cache.get(key)?.deref();
  }
}
