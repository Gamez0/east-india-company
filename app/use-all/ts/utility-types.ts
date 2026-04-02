/**
 * TS Utility Types - Partial, Required, Readonly
 *
 * TS가 내장으로 제공하는 타입 변환 도구. 기존 타입을 기반으로 속성의 성질(optional, required, readonly)을 일괄 변경한 새 타입을 만들어줘요.
 *
 * 세 개 모두 Mapped Type으로 구현되어 있고, 실제 내부 구현이 매우 짧습니다:
 */

// TS 소스코드에 있는 실제 정의
type Partial<T> = { [K in keyof T]?: T[K] };
type Required<T> = { [K in keyof T]-?: T[K] };
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// 이해를 위해 기준이 될 타입을 하나 정의하겠습니다:

interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
    nickname?: string;
}

// Partial<T>
// 모둔 속성을 optional(?)로 바꿉니다.
type PartialUser = Partial<User>;

// 결과 모두 optional

const a: PartialUser = {};
const b: PartialUser = { name: "KIM" };

// 실전 용도 - 부분 업데이트
// 가장 흔한 용도입니다. 전체 객체가 아니라 변경할 필드만 받고 싶을 때:
function updateUser(id: number, updates: Partial<User>) {
    // updates 에는 User의 어떤 속성이든 들어올 수 있음
    // 하지만 User 에 없는 속성은 안됨
}

updateUser(1, { name: "Lee" });
// updateUser(1, { foo: "bar" }); // Error - User 에 foo 는 없음

// Partial 없이 같은걸 하려면 이렇게 됩니다:
interface UserUpdate {
    id?: number;
    name?: string;
    email?: string;
    age?: number;
    nickname?: string;
}
// User에 필드 추가할 때마다 여기도 수정해야 함 -> 동기화 실수 위험

// 실전용도 - 기본값 병함
interface Config {
    theme: "light" | "dark";
    language: string;
    fontSize: number;
    notifications: boolean;
}

const defaults: Config = {
    theme: "light",
    language: "ko",
    fontSize: 14,
    notifications: true,
};

function createConfig(overrides: Partial<Config>): Config {
    return {
        ...defaults,
        ...overrides,
    };
}

createConfig({ theme: "dark" });
createConfig({ fontSize: 18, language: "en" });

// Required<T>
// 모든 속성에서 optional(?)을 제거합니다. Partial의 정반대

type RequiredUser = Required<User>;

const user: RequiredUser = {
    id: 1,
    name: "Kim",
    email: "123@k.com",
    age: 25,
    nickname: "kk",
};

// 내부 동작 -? 문법
type Required2<T> = { [K in keyof T]-?: T[K] };
// -? = optional 제거

// 반대로 Partial은 +? (+는 생략 가능)
type Partial2<T> = { [K in keyof T]+?: T[K] };
type Partial3<T> = { [K in keyof T]?: T[K] };

// 실전 용도 - 유효성 검증 후 타입
interface FormInput {
    name?: string;
    email?: string;
    age?: number;
}

function validateForm(input: FormInput): Required<FormInput> {
    if (!input.name) throw new Error("Name required");
    if (!input.email) throw new Error("Email required");
    if (!input.age) throw new Error("Age required");

    // 이 시점에서 모든 필드가 존재함을 보장
    return input as Required<FormInput>;
}

const validated = validateForm({ name: "Kim", email: "k@k.com", age: 25 });
const t = validated.name; // string - optional이 아님, 안전하게 사용 가능

// 실전 용도 - 내부 처리용 타입
// 외부 API: 일부 필드 선택적
interface ApiResponse {
    data?: object;
    error?: string;
    timestamp?: number;
}

// 내부 처리: 정규화 후 모든 필드 존재 보장
function normalizeResponse(res: ApiResponse): Required<ApiResponse> {
    return {
        data: res.data ?? {},
        error: res.error ?? "",
        timestamp: res.timestamp ?? Date.now(),
    };
}

// Readonly<T>
// 모든 속성에 readonly를 붙입니다. 할당하면 컴파일 에러.
type ReadonlyUser = Readonly<User>;
// 결과
// {
//     readonly id: number;
//     readonly name: string;
//     readonly email: string;
//     readonly age?: number;
//     readonly nickname?: string;
// }
const user3: ReadonlyUser = {
    id: 1,
    name: "Kim",
    email: "k@k.com",
};

// user3.name = "Lee"; // Error - readonly 속성에 할당 불가

// 중요: 얕은(shallow) readonly
interface Post {
    title: string;
    tags: string[];
    author: { name: string };
}

const post: Readonly<Post> = {
    title: "Hello",
    tags: ["ts", "js"],
    author: { name: "Kim" },
};

post.tags.push("react"); // OK - 배열 내부는 보호 안 됨
post.author.name = "Lee"; // OK - 중첩 객체도 보호 안 됨
// Readonly 는 1단계 속성만 readonly 로 만듭니다. 깊은 보호가 필요하면 직접 만들어야 해요:
type DeepReadonly<T> = T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

const post2: DeepReadonly<Post> = {
    title: "Hello",
    tags: ["ts", "js"],
    author: { name: "Shin" },
};

// post2.tags.push("react"); // Error - 배열도 readonly
// post2.author.name = "Lee"; // Error - 중첩 객체도 readonly

// 실전 용도 - 불변 상태
// Redux 스타일 상태 관리
interface State {
    count: number;
    items: string[];
}

type Action =
    | { type: "INCREMENT"; amount: number }
    | { type: "DECREMENT"; amount: number }
    | { type: "RESET" };

function reducer(state: Readonly<State>, action: Action): State {
    // state.count = 10; // Error - 실수로 직접 변경 방지

    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + 1 }; // 새 객체 반환
        default:
            return { ...state };
    }
}

function processItems(items: Readonly<string[]>) {
    // items.push("new"); // Error - 원본 배열 변경 방지
    // items.sort(): // Error - sort 도 변경 메서드
    items.map((i) => i.toUpperCase()); // OK - 새 배열 반환하는 메서드는 가능
}

const myItems = ["a", "b", "c"];
processItems(myItems);

// 세 개 조합하기
// 이 유틸리티들은 조합해서 쓸 수 있습니다:

// 읽기 전용 + 모든 필드 필수
type StrictUser = Readonly<Required<User>>;
// {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
//   readonly age: number;
//   readonly nickname: string;
// }

// 읽기 전용 + 부분 업데이트 타입
type ReadonlyPartialUser = Readonly<Partial<User>>;
// 한번 만들면 변경 불가능한 업데이트 객체

// Partial과 Required의 역관계
// 원본
interface User3 {
    id: number;
    name: string;
    age?: number;
}

// Partial -> Required = 원본과 다름!
type A = Required<Partial<User3>>;
// age가 필수가 되어버림 - 원본에서는 optional 이었는데

// Required → Partial = 모든 게 optional
type B = Partial<Required<User>>;
// { id?: number; name?: string; age?: number }
// 순서에 따라 결과가 달라지므로 주의가 필요합니다.

/**
 * 요약
 * 유틸리티 변환 내부 문법 대표 용도
 * Partial<T> 전부 optional로 ? 추가 부분 업데이트, 기본값 병합
 * Required<T> 전부필수로 -?제거 검증 후 타입, 내부 정규화
 * Readonly<T> 전부읽기전용 readonly 추가 불변 상태, 인자 보호
 */
export {};
