/**
 * Record<K, V> 키 타입과 값 타입을 지정해서 객체 타입을 만듭니다.
 */

type Record<K extends string | number | symbol, V> = {
    [P in K]: V;
};

// Pick/Omit과 달리, 기존 타입에서 파생하는 게 아니라 처음부터 새로 만드는 유틸리티입니다.
// 기본사용

// 키: 문자열 리터럴 유니온, 값: 고정 타입
type RolePermissions = Record<"admin" | "user" | "guest", string[]>;
// {
//     admin: string[];
//     user: string[];
//     guest: string[];
// }

const perms: RolePermissions = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"],
    // visitor: ["read"], // Error: 'visitor' does not exist in type 'RolePermissions'
};

/**
 * 키에 들어갈 수 있는 것들
 */

// 1) 문자열 리터럴 유니온
type ThemeColors = Record<"primary" | "secondary" | "accent", string>;

// 2) 기존 타입에서 추출한 유니온
type UserFields = Record<keyof User, string>;

// 3) 임의의 문자열 - 인덱스 시그니처와 동일
type StringMap = Record<string, number>;
// { [key: string]: number; }

const scores: StringMap = {
    alice: 90,
    bob: 85,
    // 어떤 키도 가능
};

// 4) 숫자
type IndexedData = Record<number, string>;

/** 값에 복잡한 타입 */

// 값이 객체
type UserDirectory = Record<string, Pick<User, "name" | "email">>;

const directory: UserDirectory = {
    u001: { name: "Alice", email: "alice@example.com" },
    u002: { name: "Bob", email: "bob@example.com" },
};

// 값이 유니온
type StatusMap = Record<"success" | "error" | "pending", number | null>;
const status: StatusMap = {
    success: 200,
    error: null,
    pending: 102,
};

/**
 * 인덱스 시그니처와의 비교
 */

// 이 둘은 동일
type A = Record<string, number>;
type B = { [key: string]: number };

// 하지만 Record는 키를 제한할 수 있음
type C = Record<"x" | "y" | "z", number>;
// -> 인덱스 시그니처로는 이런 제한이 안됨

/**
 * 실전 용도
 */

// 1) enum-like 매핑
type HttpStatus = 200 | 301 | 404 | 500;
type StatusMessages = Record<HttpStatus, string>;

const messages: StatusMessages = {
    200: "OK",
    301: "Moved Permanently",
    404: "Not Found",
    500: "Internal Server Error",
    // 하나라도 빠지면 에러
};

// 2) 폼 에러
type FormFields = "name" | "email" | "password";
type FormErrors = Record<FormFields, string | undefined>;

const errors: FormErrors = {
    name: undefined,
    email: "Invalid email address",
    password: "Too short",
};

// 3) 캐시/룩업 테이블
type Cache = Record<
    string,
    {
        data: unknown;
        timestamp: number;
        ttl: number;
    }
>;
const cache: Cache = {
    user_123: { data: { name: "Alice" }, timestamp: 1620000000, ttl: 3600 },
    user_456: { data: { name: "Bob" }, timestamp: 1620001000, ttl: 3600 },
};

// 4) 그룹핑 결과
type GroupedUsers = Record<User["role"], User[]>;
// { admin: User[]; user: User[]; }

/**
 * 세 개 조합
 */

// 읽기 전용 딕셔너리
type ReadonlyMap = Readonly<Record<string, User>>;

// id 제외한 필드명으로 에러 맵
type ValidationErrors = Partial<Record<keyof Omit<User, "id">, string>>;

// API 응답 - 엔티티별 CRUD 타입 자동 생성
type Entity = User;
type CreateDTO = Omit<Entity, "id">;
type UpdateDTO = Partial<Omit<Entity, "id">>;
type EntityMap = Record<string, Readonly<Entity>>;

/**
 * 요약
 * 유틸리티 하는 일 핵심
 * Pick<T, K> 원하는 속성만 선택 K는 T에 존재하는 키만 가능
 * Omit<T, K> 특정 속성만 제외 남길 게 많을 때 Pick 대신 사용
 * Record<K, V> 키-값 타입으로 새 객체 타입 생성 기존 타입 파생이 아닌 새로 만들기
 */

export {};
