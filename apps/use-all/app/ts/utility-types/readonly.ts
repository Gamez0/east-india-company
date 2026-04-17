/**
 * TS Utility Types - Readonly
 *
 * 모든 속성에 readonly를 붙입니다. 할당하면 컴파일 에러.
 *
 * Mapped Type으로 구현되어 있고, 실제 내부 구현이 매우 짧습니다:
 */

// TS 소스코드에 있는 실제 정의
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// 이해를 위해 기준이 될 타입을 하나 정의하겠습니다:

interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
    nickname?: string;
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
