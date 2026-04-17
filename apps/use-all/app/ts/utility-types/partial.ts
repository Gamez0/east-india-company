/**
 * TS Utility Types - Partial
 *
 * TS가 내장으로 제공하는 타입 변환 도구. 기존 타입을 기반으로 속성을 optional로 일괄 변경한 새 타입을 만들어줘요.
 *
 * Mapped Type으로 구현되어 있고, 실제 내부 구현이 매우 짧습니다:
 */

// TS 소스코드에 있는 실제 정의
type Partial<T> = { [K in keyof T]?: T[K] };

// 이해를 위해 기준이 될 타입을 하나 정의하겠습니다:

interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
    nickname?: string;
}

// Partial<T>
// 모든 속성을 optional(?)로 바꿉니다.
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

// 실전용도 - 기본값 병합
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

export {};
