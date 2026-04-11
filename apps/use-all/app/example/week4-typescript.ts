// ============================================================================
// Week 4: TypeScript 타입 시스템 완전정복 — 코드 예제 모음
// ============================================================================

// ─── Day 1: 내장 Utility Types ─────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "user";
}

// Partial — 모든 속성 optional
type PartialUser = Partial<User>;
const update: PartialUser = { name: "John" }; // OK

// Required — 모든 속성 required
type RequiredUser = Required<User>;
// const u: RequiredUser = { id: 1, name: "J", email: "j@j.com", role: "user" }; // age 필수!

// Readonly — 모든 속성 readonly
type ReadonlyUser = Readonly<User>;
// const ro: ReadonlyUser = { ... }; ro.name = "x"; // Error!

// Pick & Omit
type UserPreview = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;

// Record
type RolePermissions = Record<User["role"], string[]>;
const perms: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read"],
};

// Exclude & Extract
type T1 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T2 = Extract<"a" | "b" | "c", "a" | "d">; // "a"

// NonNullable
type T3 = NonNullable<string | null | undefined>; // string

// ReturnType & Parameters
function createUser(name: string, age: number): User {
  return { id: 1, name, email: "", age, role: "user" };
}
type CreateUserReturn = ReturnType<typeof createUser>; // User
type CreateUserParams = Parameters<typeof createUser>; // [string, number]

// ConstructorParameters & InstanceType
class MyService {
  constructor(public baseUrl: string, public timeout: number) {}
}
type ServiceParams = ConstructorParameters<typeof MyService>; // [string, number]
type ServiceInstance = InstanceType<typeof MyService>; // MyService

// Awaited — Promise unwrap
type T4 = Awaited<Promise<Promise<string>>>; // string
type T5 = Awaited<Promise<number> | string>; // number | string

// ThisParameterType & OmitThisParameter
function greet(this: User, greeting: string) {
  return `${greeting}, ${this.name}`;
}
type T6 = ThisParameterType<typeof greet>; // User
type T7 = OmitThisParameter<typeof greet>; // (greeting: string) => string

// ThisType — 객체 리터럴의 this 타입 지정
type ObjectWithMethods = {
  data: { count: number };
  methods: ThisType<{ count: number; increment(): void }> & {
    increment(): void;
    getCount(): number;
  };
};

// Intrinsic String Manipulation
type T8 = Uppercase<"hello">; // "HELLO"
type T9 = Lowercase<"HELLO">; // "hello"
type T10 = Capitalize<"hello">; // "Hello"
type T11 = Uncapitalize<"Hello">; // "hello"

// NoInfer — 추론 방지
function createState<T>(initial: T, allowed: NoInfer<T>[]) {
  return { value: initial, allowed };
}
// createState("hello", [1, 2]); // Error! (NoInfer가 없으면 T = string | number로 추론됨)

// ─── Day 2: Conditional & Mapped Types ─────────────────────────────────────

// --- Conditional Types ---
type IsString<T> = T extends string ? true : false;
type R1 = IsString<"hello">; // true
type R2 = IsString<42>; // false

// infer — 타입 추출
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type R3 = UnpackPromise<Promise<number>>; // number

type FirstArg<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;
type R4 = FirstArg<(a: string, b: number) => void>; // string

// infer with constraint (TS 4.7+)
type GetString<T> = T extends { value: infer V extends string } ? V : never;
type R5 = GetString<{ value: "hello" }>; // "hello"

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type R6 = ToArray<string | number>; // string[] | number[] (분배됨!)

// 분배 방지
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type R7 = ToArrayNonDist<string | number>; // (string | number)[]

// --- Mapped Types ---
type Optional<T> = { [K in keyof T]+?: T[K] };
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type Concrete<T> = { [K in keyof T]-?: T[K] }; // Required와 동일

// as clause — 키 리매핑
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
type UserGetters = Getters<User>;
// { getId: () => number; getName: () => string; ... }

// 특정 타입 필터링
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};
type StringFields = OnlyStrings<User>; // { name: string; email: string }

// --- Template Literal Types ---
type EventName = `on${Capitalize<"click" | "focus" | "blur">}`;
// "onClick" | "onFocus" | "onBlur"

type CSSProperty = `${string}-${string}`;
type HTTPMethod = `${"GET" | "POST" | "PUT" | "DELETE"}`;

type PathParams<Path extends string> =
  Path extends `${infer _}:${infer Param}/${infer Rest}`
    ? Param | PathParams<Rest>
    : Path extends `${infer _}:${infer Param}`
    ? Param
    : never;

type R8 = PathParams<"/users/:id/posts/:postId">; // "id" | "postId"

// --- 실전: DeepPartial, DeepReadonly ---
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

// PathOf — 객체의 모든 경로 추출
type PathOf<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: K | `${K}.${PathOf<T[K], `${Prefix}${K}.`>}`;
    }[keyof T & string]
  : never;

type Nested = { a: { b: { c: number }; d: string } };
type Paths = PathOf<Nested>; // "a" | "a.b" | "a.b.c" | "a.d"

// ─── Day 3: 고급 타입 기법 ─────────────────────────────────────────────────

// --- Discriminated Unions ---
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      const _exhaustive: never = shape; // 빠진 case 감지
      return _exhaustive;
  }
}

// --- satisfies ---
type ColorMap = Record<string, [number, number, number] | string>;

const colors = {
  red: [255, 0, 0],
  green: "#00FF00",
  blue: [0, 0, 255],
} satisfies ColorMap;

// satisfies 덕분에 타입 추론이 유지됨
colors.red.map((c) => c / 255); // OK — [number, number, number]으로 추론
colors.green.toUpperCase(); // OK — string으로 추론

// --- as const ---
const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  USER: "/user/:id",
} as const;

type Route = (typeof ROUTES)[keyof typeof ROUTES]; // "/" | "/about" | "/user/:id"

// const type parameters (TS 5.0+)
function asConst<const T>(value: T): T {
  return value;
}
const inferred = asConst({ x: 1, y: [2, 3] });
// 타입: { readonly x: 1; readonly y: readonly [2, 3] }

// --- Variadic Tuple Types ---
type Concat<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];
type R9 = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

type First<T extends readonly unknown[]> = T extends [infer F, ...infer _] ? F : never;
type Last<T extends readonly unknown[]> = T extends [...infer _, infer L] ? L : never;
type R10 = First<[1, 2, 3]>; // 1
type R11 = Last<[1, 2, 3]>; // 3

// Labeled Tuple Elements
type UserTuple = [name: string, age: number, ...roles: string[]];

// --- declare & namespace ---
declare global {
  interface Window {
    myApp: { version: string };
  }
}

declare module "express" {
  interface Request {
    userId?: string;
  }
}

// namespace
namespace Validation {
  export interface Validator {
    validate(value: string): boolean;
  }
  export class EmailValidator implements Validator {
    validate(value: string) {
      return /\S+@\S+\.\S+/.test(value);
    }
  }
}

// --- 타입 레벨 프로그래밍: 재귀 타입 ---
type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : [];
type R12 = Reverse<[1, 2, 3]>; // [3, 2, 1]

// 타입 레벨 산술
type BuildTuple<N extends number, T extends unknown[] = []> =
  T["length"] extends N ? T : BuildTuple<N, [...T, unknown]>;
type Add<A extends number, B extends number> =
  [...BuildTuple<A>, ...BuildTuple<B>]["length"];
type R13 = Add<3, 4>; // 7

// ─── Day 4: 제네릭 고급 & 타입 가드 ────────────────────────────────────────

// --- Generic Constraints ---
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Generic Defaults
interface ApiResponse<T = unknown, E = Error> {
  data: T;
  error: E | null;
}

// Higher-order function types
type Middleware<T> = (value: T, next: (value: T) => T) => T;

function compose<T>(...middlewares: Middleware<T>[]): (value: T) => T {
  return (value) => {
    let index = middlewares.length - 1;
    const next = (v: T): T => {
      if (index < 0) return v;
      return middlewares[index--](v, next);
    };
    return next(value);
  };
}

// --- Type Predicates ---
interface Dog { bark(): void; breed: string; }
interface Cat { meow(): void; color: string; }

function isDog(animal: Dog | Cat): animal is Dog {
  return "bark" in animal;
}

// Assertion Functions
function assertNonNull<T>(value: T | null | undefined, msg?: string): asserts value is T {
  if (value == null) throw new Error(msg ?? "Expected non-null");
}

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new TypeError("Expected string");
}

// typeof narrowing
function process(value: string | number | boolean) {
  if (typeof value === "string") {
    value.toUpperCase(); // string
  } else if (typeof value === "number") {
    value.toFixed(2); // number
  } else {
    value satisfies boolean;
  }
}

// in narrowing
function handleShape(shape: Shape) {
  if ("radius" in shape) {
    console.log(shape.radius); // circle로 좁혀짐
  }
}

// Control flow & exhaustiveness
type Action =
  | { type: "INCREMENT"; amount: number }
  | { type: "DECREMENT"; amount: number }
  | { type: "RESET" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "INCREMENT": return state + action.amount;
    case "DECREMENT": return state - action.amount;
    case "RESET": return 0;
    default:
      // 새 Action 추가 시 컴파일 에러 발생
      const _: never = action;
      return state;
  }
}

// ─── Day 5: Decorators & 설정 ──────────────────────────────────────────────

// --- TC39 Decorators (Stage 3) ---
// 클래스 데코레이터
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// 메서드 데코레이터 (TC39 Stage 3 syntax)
function log<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
  return function (this: This, ...args: Args): Return {
    console.log(`Calling ${String(context.name)} with`, args);
    const result = target.call(this, ...args);
    console.log(`${String(context.name)} returned`, result);
    return result;
  };
}

// Accessor 데코레이터
function clamp(min: number, max: number) {
  return function <This>(
    target: ClassAccessorDecoratorTarget<This, number>,
    context: ClassAccessorDecoratorContext<This, number>
  ): ClassAccessorDecoratorResult<This, number> {
    return {
      set(value: number) {
        target.set.call(this, Math.min(max, Math.max(min, value)));
      },
      get() {
        return target.get.call(this);
      },
    };
  };
}

// Field 데코레이터
function defaultValue<T>(value: T) {
  return function (
    _target: undefined,
    _context: ClassFieldDecoratorContext
  ) {
    return () => value;
  };
}

// 사용 예시
class MyClass {
  @log
  greet(name: string) {
    return `Hello, ${name}`;
  }

  @clamp(0, 100)
  accessor percentage = 50;

  @defaultValue([])
  items!: string[];
}

// Decorator Factory 패턴
function validate(schema: Record<string, (v: any) => boolean>) {
  return function <T extends new (...args: any[]) => any>(
    target: T,
    _context: ClassDecoratorContext
  ) {
    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        for (const [key, validator] of Object.entries(schema)) {
          if (!validator((this as any)[key])) {
            throw new Error(`Validation failed for ${key}`);
          }
        }
      }
    };
  };
}

// --- tsconfig.json 핵심 옵션 ---
/*
{
  "compilerOptions": {
    // === Strict ===
    "strict": true,                    // 아래 모든 strict 옵션 활성화
    "strictNullChecks": true,          // null/undefined 엄격 검사
    "strictFunctionTypes": true,       // 함수 타입 매개변수 반공변성
    "strictBindCallApply": true,       // bind/call/apply 타입 검사
    "strictPropertyInitialization": true, // 클래스 속성 초기화 강제
    "noImplicitAny": true,             // 암시적 any 금지
    "noImplicitThis": true,            // 암시적 this 금지
    "useUnknownInCatchVariables": true, // catch의 e가 unknown

    // === 추가 검사 ===
    "exactOptionalPropertyTypes": true, // optional 속성에 undefined 직접 할당 금지
    "noUncheckedIndexedAccess": true,   // 인덱스 시그니처 접근 시 undefined 추가
    "noFallthroughCasesInSwitch": true, // switch fallthrough 금지
    "noImplicitReturns": true,          // 모든 경로에서 return 필요
    "noImplicitOverride": true,         // override 키워드 강제

    // === Module ===
    "module": "esnext",
    "moduleResolution": "bundler",     // 번들러 환경 (Vite, webpack 등)
    // "moduleResolution": "node16",   // Node.js ESM
    // "moduleResolution": "nodenext", // Node.js 최신
    "verbatimModuleSyntax": true,      // import type 강제 분리
    "isolatedModules": true,           // 단일 파일 변환 호환

    // === Output ===
    "target": "ES2022",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "declaration": true,               // .d.ts 생성
    "declarationMap": true,            // .d.ts.map 생성
    "sourceMap": true,

    // === 기타 ===
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowJs": true,
    "incremental": true
  }
}
*/

// --- .d.ts 작성 ---
// types.d.ts
declare module "untyped-lib" {
  export function doSomething(input: string): Promise<number>;
  export interface Config {
    debug: boolean;
    timeout: number;
  }
  export default function init(config: Config): void;
}

// Triple-slash directives
/// <reference types="vite/client" />
/// <reference path="./custom-types.d.ts" />
/// <reference lib="es2023" />
