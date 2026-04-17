/**
 * TS Utility Types - Required
 *
 * 모든 속성에서 optional(?)을 제거합니다. Partial의 정반대.
 *
 * Mapped Type으로 구현되어 있고, 실제 내부 구현이 매우 짧습니다:
 */

// TS 소스코드에 있는 실제 정의
type Required<T> = { [K in keyof T]-?: T[K] };

// 이해를 위해 기준이 될 타입을 하나 정의하겠습니다:

interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
    nickname?: string;
}

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

export {};
