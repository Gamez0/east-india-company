type Omit<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]: T[P];
};

type UserWithoutId = Omit<User, "id">;

type PublicUser = Omit<User, "email" | "role">;
// {
//     id:number;
//     name: string;
//     age?: number;
// }

/*
Pick과의 관계
둘은 정반대 방향에서 같은 일을 합니다:
**/

// "id 와 name만 남기기"
type A = Pick<User, "id" | "name">;

// "id 와 name 빼고 나머지 제거" - 같은 결과
type B = Omit<User, "email" | "age" | "role">;

// 선택 기준:
// 남길 게 적으면 Pick
// 뺄 게 적으면 -> Omit

/**
 * Pick과의 미묘한 차이 - 존재하지 않는 키
 */

// Pick - 없는 키 넣으면 에러
// type Bad = Pick<User, "phone">; // Error: 'phone' does not exist in type 'User'

// Omit - 없는 키 넣어도 에러 안남 - 그냥 무시
type Ok = Omit<User, "phone">; // OK - User 전체가 그대로

/**
 * Omit의 K는 keyof T 가 아니라 string | number | symbol 로 제약이 느슨합니다. 이건 의도적인 설계인데, 실수를 잡기 어렵게 만들 수 있어서 주의가 필요해요.
 */

// 실전 용도
// 1) 생성 DTO - id 는 서버에서 생성하니까 제외
type CreateUserDTO = Omit<User, "id">;

function createUser(data: CreateUserDTO): User {
    return {
        id: 123,
        ...data,
    };
}

createUser({
    name: "Charlie",
    email: "charlie@example.com",
    role: "user",
    age: 25,
}); // OK

// 2) 수정 DTO - id 는 빼고 나머지는 optional
type UpdateUserDTO = Partial<Omit<User, "id">>;

function updateUser(id: number, data: UpdateUserDTO) {}

// 3) 컴포넌트 - HTML 속성에서 겹치는 것 제외
type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange"
> & {
    onChange: (value: string) => void; // 커스텀 onChange로 교체
};

export {};
