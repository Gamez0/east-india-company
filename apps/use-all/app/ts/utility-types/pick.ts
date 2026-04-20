interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
    role: "admin" | "user";
}

/**
 * Pick<T, K>
 * 원하는 속성만 골라서 새 타입을 만듭니다.
 */

// 내부 구현
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// K extends keyof T 이므로 T에 실제로 존재하는 키만 고를 수 있습니다.

type UserPreview = MyPick<User, "id" | "name">;

type UserAuth = MyPick<User, "email" | "role">;

// type Bad = Pick<User, "id" | "nonexistent">; // Error: 'nonexistent' does not exist in type 'User'

/**
 * optional 속성을 Pick 하면?
 * 원본의 성질이 그대로 유지됩니다.
 */

type WithAge = MyPick<User, "name" | "age">;

// 실전 용도
// 1) API 응답에서 필요한 것만
type UserListItem = Pick<User, "id" | "name" | "role">;

function renderUserList(users: UserListItem[]) {
    // id, name, role 만 사용 - email 같은 민감정보 배제
}

// 2) 컴포넌트 props - 필요한 것만 받기
type AvatarProps = MyPick<User, "name" | "email">;

function Avatar({ name, email }: AvatarProps) {
    // name과 email로 아바타 렌더링
}

// 3) 함수 인자 제한
function sendEmail(user: Pick<User, "name" | "email">) {
    // name 과 email 만 필요 - 전체 User 를 요구하지 않음
}

// User 객체도 넣을 수 있고, 딱 두 필드만 있는 객체도 가능
sendEmail({ name: "Alice", email: "alice@example.com" });
const foo: User = {
    id: 1,
    name: "Bob",
    email: "bob@example.com",
    age: 30,
    role: "admin",
};
sendEmail(foo); // User 객체도 가능 - 필요한 필드만 사용됨

export {};
