/**
 * BigInt
 *
 * 한 줄 정의
 * BigInt는 크기 제한 없이 정수를 표현할 수 있는 원시 타입입니다. ES2020에서 추가되었어요.
 *
 * 왜 만들어졌는가
 * JS의 Number는 IEEE 754 64비트 부동소수점을 사용합니다.
 * 이 형식으로 정확하게 표현할 수 있는 정수 범위에는 한계가 있어요.
 *
 */

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 (2^53 - 1)
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 <- 같은 값! 정밀도 손실

/**
 * 2^53을 넘으면 숫자가 조용히 틀려집니다.
 * 데이터베이스 ID, 암호학 연산, 금융 계산, 고정밀 타임 스탬프 등에서 이건 치명적이에요.
 * BigInt는 이 문제를 해결합니다.
 *
 * 생성 방법
 * 두 가지 방법이 있습니다.
 */

// 1. 리터럴 - 숫자 위에 n 접미사
const a = 42n;
const big1 = 123456789012345678901234567890n;

// 2. BigInt() 함수 - 다른 값에서 변환
const b = BigInt(42); // 42n
const c = BigInt("9999999999999999999"); // 9999999999999999999n
const d = BigInt("0xff"); // 255n(16진수 문자열)
const e = BigInt(true); // 1n
const f = BigInt(false); // 0n

// 이런 건 안됨
// BigInt(3.14); // RangeError - 정수가 아님
// BigInt("hello"); // SyntaxError - 숫자로 파싱 불가
// BigInt(undefined); // TypeError
// BigInt(null); // TypeError
// BigInt(Symbol()); // TypeError
// new BigInt(42); // TypeError - 원시 타입이니까 new 불가

/**
 * 연산자
 * BigInt는 대부분의 산술 연살자를 지원하지만, 한 가지 철칙이 있습니다.
 *
 * 철칙: Number 와 섞어서 연살할 수 없다
 */

10n + 3n;
10n - 3n;
10n * 3n;
10n / 3n; // 3n <- 소수점 버림! (정수만 표현하니까)
10n % 3n; // 1n
2n ** 10n; // 1023n

// Number와 섞으면 TypeError
// 10n + 3
// 10n * 2

/**
 * 왜 섞을 수 없냐면, 결과 타입을 어느 쪽으로 해도 문제가 생기기 때문입니다.
 * BigInt로 하면 소수점을 일고, Number로 하면 정밀도를 잃어요.
 * 그래서 언어 차원에서 아예 막아버렸습니다.
 *
 */

// 섞어야 할 때는 명시적으로 변환
const big2 = 100n;
const num = 3;

Number(big2) + num;
big2 + BigInt(num);

/**
 * 나눗셈의 특이점
 * BigInt는 정수만 표현하므로 나눗셈에서 소수점이 잘립니다.
 * 반올림이 아니라 0 방향으로 절삭(truncation)이에요.
 *
 */

7n / 2n; // 3n (3.5가 아님)
-7n / 2n; // -3n(0 방향으로 절삭)
1n / 2n; // 0n

/**
 * 단항 연산자
 */

-10n; // -10n 단항 마이너르는 됨
// +10n; // TypeError <- 단항 플러스는 안 됨!

/**
 * 단항 + 가 안되는  이유는, JS에서 +x는 Number(x)와 동일하게 동작하는 관례가 있어서,
 * +bigint이 암묵적으로 Number 변화을 일으키면 혼란스럽기 때문입니다.
 *
 * 비교 연산자
 * 비교는 Number와 섞어도 됩니다. 산술과 달리 정보 손실이 없으니까요.
 */

// BigInt끼리
1n === 1n;
1n < 2n;

// Number와 비교 - 가능!
// 1n == 1; // true
// 1n === 1; // false (strict equality)
2n > 1; // true
3n >= 3; // true

// 정렬도 가능
const mixed = [3n, 2, 1n, 4, 0n];
mixed.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
// [0n, 1n, 2, 3n, 4]

/**
 * 비트 연산자
 * BigInt는 비트 연산을 완전 지원합니다. Number와 달리 비트 수 제한이 없어요.
 */

// Number 비트 연산: 32비트로 잘림
0xffffffffff | 0; // -1 (32비트 signed)

// BigInt 비트 연산: 무한 비트
const mask = 0xffffffffffffffffn;
mask & 0xff00n; // 0xff00n
mask | 1n; // 0xFFFFFFFFFFFFFFFFn
mask ^ 0n; // 0xFFFFFFFFFFFFFFFFn
~0n; // -1n
1n << 100n; // 1267650600228229401496703205376n (2^100)
1024n >> 5n; // 32n

// 음수는 2의 보수 (무한 비트 확장)
~0n; // -1n (모든 비트 반전 -> ...111111 -> -1)
~1n; // -2n

/**
 * BigInt.asIntN()과 BigInt.asUintN()
 * 이 두 정적 메서드는 BigInt를 고정 비트 폭의 정수로 잘라내는(wrap) 함수입니다.
 *
 * 왜 필요한가
 * BigInt는 무한 비트지만, 실제 시스템과 소통할 때는 고정 비트 폭을 다뤄야 할 때가 많아요.
 * C/Rust의 int32, uint64, 네트워크 프로토콜의 고정 폭 필드, WebAssembly의 i64등이 그렇습니다.
 * 이 메서드는 "이 BigInt를 N비트 정수로 해석하면 어떤 값인가"를 알려줍니다.
 *
 * BigInt.asIntN(bits, bigint) - Signed해석
 * N비트 부호 있는 정수(signed integer) 범위로 래핑합니다.
 * 범위는 -2^(N-1) ~ 2^(N-1) -1 입니다.
 */

// 8비트 signed: -128 ~ 127
BigInt.asIntN(8, 0n);
BigInt.asIntN(8, 127n);
BigInt.asIntN(8, 128n); // -128n (범위 초과 - 오버플로!)
BigInt.asIntN(8, 255n); // -1n (이진: 11111111 -> signed 해석 = -1)
BigInt.asIntN(8, 256n); // 0n (한 바퀴 돌아옴)
BigInt.asIntN(8, -129n); // 127n (반대쪽 오버플로)

/**
 * BigInt.asUintN(bits, bigint) - Unsigned해석
 * N비트 부호 없는 정수(unsigned Integer) 범위로 래핑합니다. 범위는 0~2^N -1 입니다.
 */

// 8비트 unsigned: 0 ~ 255
BigInt.asUintN(8, 0n); // 0n
BigInt.asUintN(8, 255n); // 255n (범위 안 - 그대로)
BigInt.asUintN(8, 256n); // 0n (오버플로 - 한 바퀴)
BigInt.asUintN(8, 257n); // 1n
BigInt.asUintN(8, -1n); // 255n (음수 -> unsigned 해석)

/**
 * 비교
 */

const value = 255n;

// 같은 비트 패턴, 다른 해석
BigInt.asIntN(8, value); // -1n (signed: 11111111 = -1)
BigInt.asUintN(8, value); // 255n (unsigned: 11111111 = 255)

// 실전에서 자주 쓰는 비트 폭
BigInt.asIntN(32, value); // 255n  (32비트 범위 안이라 그대로)
BigInt.asUintN(64, -1n); // 18446744073709551615n (uint64 max)

/**
 * 실전 사용 예시
 */

// 1) C 스타일 정수 오버플로 시뮬레이션
function addInt32(a: bigint, b: bigint): bigint {
    return BigInt.asIntN(32, a + b);
}
addInt32(2147483647n, 1n); // -2147483648n (C의 int32_t과 동일한 오버플로)

// 2) 네트워크 프로토콜 - 64비트 unsigned 필드
function writeUint64(value: bigint): bigint {
    if (value < 0n || value > BigInt.asUintN(64, -1n)) {
        throw new RangeError("Value out of uint64 range");
    }
    return BigInt.asUintN(64, value);
}

// 3) 비트 플래그 - 64개 이상의 플래그
const FLAGS = {
    READ: 1n << 0n,
    WRITE: 1n << 1n,
    EXECUTE: 1n << 2n,
    // ... 64비트 이상도 가능
    SPECIAL: 1n << 100n,
};

const permissions = FLAGS.READ | FLAGS.WRITE;
const canRead = (permissions & FLAGS.READ) !== 0n; // true

/**
 * 타입 변환 정리
 */

const big = 42n;

// BigInt -> 다른 타입
String(big); // "42"
big.toString();
big.toString(16); // "2a" (16진수)
big.toString(2); // "101010" (2진수)
Boolean(big); // true (0n만 false)
Boolean(0n); // false
Number(big); // 42 (큰 값이면 정밀도 손실!)

// 다른 타입 -> BigInt
BigInt(42); // 42n
BigInt("42"); // 42n
BigInt(true); // 1n
BigInt(false); // 0n

// JSON은 지원하지 않음
// JSON.stringify(42n); // TypeError: BigInt value can't be serialized
// 직접 처리해야 함
JSON.stringify(42n, (_, v) => (typeof v === "bigint" ? v.toString() : v)); // "42"

/**
 * 주의사항
 */

// 1) Math 메서드 사용 불가
// Math.max(1n, 2n); // TypeError
// Math.abs(-1n); // TypeError
// 직접 구현해야 함
const absBig = (n: bigint) => (n < 0n ? -n : n);

// 2) 소수점 없음 - 나눗셈 주의
5n / 2n; // 2n (2.5가 아님!)

// 3) TypedArray 사용 가능
const i64arr = new BigInt64Array(4);
const u64arr = new BigUint64Array(4);
i64arr[0] = 9007199254740993n;

/**
 * 요약
 * 항목 내용
 * 목적 2^53이상의 정수를 정확하게 표현
 * 생성 42n 리터럴 또는 BigInt(42)
 * Number와 연산 불가 - 명시적 변환 필요
 * Number와 비교 가능 - 2n > 1 ok
 * 나눗셈 소수점 절삭 (7n / 2n = 3n)
 * asIntN(N,v) N비트 signed 정수로 래핑
 * asUIntN(N,v) N비트 unsigned 정수로 래핑
 * JSON 기본 지원 없음, 수동 변환 필요
 */

export {};
