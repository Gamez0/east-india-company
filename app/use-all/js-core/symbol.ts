// ============================================================================
// Week 1: JavaScript Core APIs — 코드 예제 모음
// ============================================================================

// ─── Day 1: 원시값 & 래퍼 객체 ─────────────────────────────────────────────

/**
 * Symbol
 * 한 줄 정의
 * Symbol 은 절대 중복되지 않는 고유한 값을 만들기 위한 원시 타입입니다.
 * ES2015(ES6)에서 Javascript의 7번째 원시 타입으로 추가되었어요.
 *
 * 왜 만들어졌는가
 * JavaScript 객체의 속성 키는 원래 문자열만 가능했습니다. 이건 두가지 문제를 만들었어요.
 *
 * 첫째, 이름 충돌 문제입니다. 라이브러리가 객체에 속성을 추가하고 싶은데, 사용자 코드의 속성과 이름이 겹칠 수 있었습니다.
 * 둘째, JavaScript 언어 자체를 확장할 때 기존 코드를 깨드리지 않으면서 새로운 내부 동작을 정의할 방법이 필요했습니다.
 *
 * Symbol은 이 두 문제를 "절대 겹칠 수 없는 키"로 해결합니다.
 */
const id = Symbol("id");
const user = {
    name: "Kim",
    [id]: 123,
};

console.log(user[id], user.name);

// 일반적인 열거에서 보이지 않음
console.log(Object.keys(user));
console.log(JSON.stringify(user));
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)] - 이걸로만 접근

/**
 * Symbol 키 속성이 열거에서 숨겨지는 점이 중요합니다. 이게 바로 "충돌 없이 객체에 메타데이터를 붙이는" 패턴의 핵심이에요.
 *
 * Symbol의 두 가지 종류
 *
 * 1. 로컬 Symbol - Symbol()
 * 호출할 때마다 완전히 새로운 값이 생성됩니다. 어디에도 등록되지 않으므로 그 변수를 가진 코드만 접근할 수 있어요.
 */

const s1 = Symbol("local");
const s2 = Symbol("local");
s1 === s2; // false

/**
 * 2. 전역 Symbol - Symbol.for()
 * 전역 심볼 레지스트리에 key-value로 등록됩니다. 같은 키로 호출하면 항상 같은 Symbol을 돌려 줍니다. 서로 다른 모듈, 다른 iframe에서도 공유됩니다.
 */

const g1: symbol = Symbol.for("shared");
const g2: symbol = Symbol.for("shared");
g1 === g2; // true

// 역방향 조회
Symbol.keyFor(g1); // "shared"
Symbol.keyFor(Symbol("local")); // undefined - 로컬 Symbol은 레지스트리에 없음

/**
 * 선택 기준: 모듈 간 공유가 필요하면 Symbol.for(), 외부에 노출하고 싶지 않으면 Symbol()을 씁니다.
 *
 * Well-Known Symbols
 * JS 엔진이 내부적으로 사용하는 내장 Symbol들 입니다. 이걸 오버라이드하면 객체의 기본 동작을 커스터마이징 할 수 있어요.
 *
 * Symbol.iterator - for..of 동작 정의
 */
class Range1 {
    constructor(
        private start: number,
        private end: number,
    ) {}

    [Symbol.iterator](): Iterator<number> {
        let current = this.start;
        const end = this.end;
        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { value: undefined, done: true };
            },
        };
    }
}

console.log([...new Range1(1, 5)]);

for (const n of new Range1(3, 6)) {
    console.log(n);
}

/**
 * Symbol.iterator 를 구현하면 그 객체는 이터러블(iterable)이 됩니다. for...of, 스프레드, 구조분해, Array.from() 등 모든 이터레이션 프로토콜에서 동작해요.
 *
 * Symbol.asyncIterator - for await...of 동작 정의
 */

class AsyncCounter {
    constructor(private max: number) {}

    [Symbol.asyncIterator]() {
        let i = 0;
        const max = this.max;
        return {
            async next() {
                await new Promise((r) => setTimeout(r, 500));
                return i < max
                    ? { value: i++, done: false }
                    : { value: undefined, done: true };
            },
        };
    }
}

for await (const n of new AsyncCounter(3)) {
    console.log(n);
}

/**
 * Symbol.toPrimitive - 타입 변환 제어
 * JS가 객체를 원시값으로 변환해야 할 때 호출됩니다.
 */

class Temperature {
    constructor(private celsius: number) {}

    [Symbol.toPrimitive](hint: "number" | "string" | "default") {
        switch (hint) {
            case "number":
                return this.celsius;
            case "string":
                return `${this.celsius}°C`;
            default:
                return this.celsius;
        }
    }
}

const temp = new Temperature(36.5);
console.log(+temp);
console.log(`${temp}`);
console.log(temp + 0);

/**
 * Symbol.hasInstance - Instanceof 재정의
 */

class Percentage {
    static [Symbol.hasInstance](value: unknown) {
        return typeof value === "number" && value >= 0 && value <= 100;
    }
}

console.log((50 as unknown) instanceof Percentage);
console.log((150 as unknown) instanceof Percentage);

/**
 * Symbol.species - 파생 객체 타입 제어
 * 배열 메서드(map, filter 등)가 결과를 만들 때 어떤 생성자를 쓸지 결정합니다.
 */

class TrackedArray<T> extends Array<T> {
    // map, filter 결과가 일반 Array가 되도록
    static get [Symbol.species]() {
        return Array;
    }
}

const tracked = new TrackedArray(1, 2, 3);
const mapped = tracked.map((x) => x * 2);

console.log(mapped instanceof TrackedArray);
console.log(mapped instanceof Array);

/**
 * 기타 Well-Known Symbols
 */

class MyCollection {
    get [Symbol.toStringTag]() {
        return "MyCollection";
    }
}

console.log(Object.prototype.toString.call(new MyCollection()));
// "[object MyCollection]"

// Symbol.isConcatSpreadable - Array.concat에서 펼침 여부
const spreadable = {
    0: "a",
    1: "b",
    length: 2,
    [Symbol.isConcatSpreadable]: true,
};
console.log(["x"].concat(spreadable));

// Symbol.match/replace/search/split - 정규식 프로토콜 커스텀
// Symbol.unscopables - with 문에서 제외할 속성 (레거시)

/**
 * 실전 사용 패턴
 * 1. 외부에 노출되지 않는 비공개 속성
 */
// library.ts
const _internal = Symbol("internal");

export class Store {
    [_internal] = { subscribers: new Set() };

    subscribe(fn: () => void) {
        this[_internal].subscribers.add(fn);
    }
}

// 외부에서 _internal Symbol에 접근할 방법이 없음
// (getOwnPropertySymbols로 찾을 수는 있지만, 명시적 계약이 아님)

/**
 * 2. 열거형(Enum) 대체 - 값의 유일성 보장
 */

const Status = {
    PENDING: Symbol("PENDING"),
    ACTIVE: Symbol("ACTIVE"),
    CLOSED: Symbol("CLOSED"),
} as const;

function handleStatus(status: symbol) {
    if (status === Status.ACTIVE) {
        console.log("Active!");
    }
    // 문자열과 달리 오타나 우연한 일치가 불가능
}

/**
 * 3. 프로토골 정의 - "이 객체가 특정 기능을 지원하는가"
 */

const Serializable = Symbol("Serializable");

interface Serializable {
    [Serializable](): string;
}

class User implements Serializable {
    constructor(private name: string) {}
    [Serializable]() {
        return JSON.stringify({ name: this.name });
    }
}

function serializable(obj: any): string | null {
    if (Serializable in obj) {
        return obj[Serializable]();
    }
    return null;
}

/**
 * 주의사항
 */

// 1. new Symbol() 불가 - 원시 타입이므로
// new Symbol(); // TypeError

// 2. 암시적 문자열 변환 불가
// "value: " + Symbol("x"); // TypeError
// 명시적으로만 가능:
String(Symbol("x")); // "Symbol(x)"
Symbol("x").toString(); // "Symbol(x)"
Symbol("x").description; // "x"

// 3. JSON.stringify에서 무시됨
JSON.stringify({ [Symbol("key")]: "value", name: "Kim" });
// '{"name" : "Kim"}' - Symbol 키 속성은 사라짐

// 4. TS에서 unique symbol
const sym = Symbol("x"); // 타입: typeof sym (unique symbol)
let sym2: symbol = Symbol("y"); // 타입: symbol (일반 심볼 타입)
// unique symbol은 const 선언에서만 가능

/**
 * 요약
 *
 * 특성 - 설명
 * 유일성 - 모든 Symbol은 절대 중복 불가
 * 용도 - 충돌 없는 객체 키, 언어 내부 프로토콜
 * Symbol() - 로컬 고유값 생성
 * Symbol.for() - 전역 레지스트리에서 공유
 * Well-Known - iterator, toPrimitive, hasInstance 등으로 엔진 동작 커스텀
 * 열거 Object.keys()에 안 나옴, getOwnPropertySymbols()로만 접근
 */

export {};
