/**
 * Number 정적 메서드 - 숫자 검사 4종
 *
 * 왜 이것들이 필요한가
 * JS의 number 타입은 단순한 정수가 아니라 IEEE 754 64 비트 부동소수점입니다.
 * 이 안에는 일반 숫자 외에도 Infinity, -Infinity, Nan 같은 특수 값이 섞여 있어요.
 * 그래서 "이게 진짜 쓸 수 있는 숫자인가?" 를 확인하는 메서드가 필요합니다.
 *
 * number 타입에 속하는 모든 값:
 *
 * 일반 숫자: 0,1,-3.14,0.1+0.2, ...
 * 특수 값: Infinity, -Infinity, NaN
 *
 * typeof Infinity; // "number"
 * typeof NaN; // "number" <- 이름이 "Not a Number"인데 타입은 number
 *
 * -----------------------------------------------------------------
 *
 * Number.inFinite(value)
 * "유한한 숫자인가?" - Infinity, -Infinity, NaN을 모두 걸러냅니다.
 */

// true
Number.isFinite(42);

// false
Number.isFinite(Infinity);
Number.isFinite(-Infinity);
Number.isFinite(NaN);

// number 가 아닌 타입은 무조건 false
Number.isFinite("42");
Number.isFinite(true);
Number.isFinite(null);
Number.isFinite(undefined);

/**
 * 글로버 isFinite() 와의 차이
 * 여기가 핵심입니다. ES5부터 있던 글로벌 isFinite()는 먼저 Number 로 변환한 후 검사합니다:
 */

// 글로벌 - 암묵적 변환 후 검사
// isFinite("42"); // true <- Number("42") = 42 -> 유한
// isFinite(""); // 0 유한
// isFinite(null); // 0 유한
// isFinite(true); // 1 유한

/**
 * Number.isFinite() 가 더 엄격하고 안전합니다. 글로벌 버전은 사실상 쓸 이유가 없어요.
 * 실전용도
 */

function divide(a: number, b: number): number | null {
    const result = a / b;
    if (!Number.isFinite(result)) return null;
    return result;
}

divide(10, 3); // 3.333...
divide(10, 0); // null (Infinity 걸러짐)
divide(0, 0); // null (NaN 걸러짐)

/**
 * Number.isSafeInteger(value)
 * "안전한 정수인가?" - 정수이면서 정밀도 손실 없이 정확히 표현 가능한 범위 안에 있는지 확인합니다.
 *
 * 안전한 정수의 범위는 -(2^53 -1) ~ 2^53 -1 입니다:
 */

Number.isSafeInteger(9007199254740991); // true (2^53 -1 = MAX_SAFE_INTEGER)
Number.isSafeInteger(9007199254740992); // false (2^53 - 범위 초과)
Number.isSafeInteger(-9007199254740991); // true  (MIN_SAFE_INTEGER)

const a = 9007199254740992; // 2^53
const b = 9007199254740993; // 2^53 + 1

a === b; // true <- 서로 닫른 수인데 같다고 판정!

// 부동소수점이 이 범위에서 1 단위를 구별할 수 없기 때문
9007199254740992 + 1; // 9007199254740992 ← 1을 더해도 안 바뀜

/**
 * Number 파싱 & 상수
 *
 * Number.parseInt(string, radix)
 * 문자열의 앞부분에서 정수를 추출합니다. 글로벌 parseInt()와 완전히 동일한 함수에요.
 */

// 기본 사용
// 결과: 42
Number.parseInt("42");
Number.parseInt("42.9");
Number.parseInt("  42  ");

// 핵심 동작: 앞에서부터 파싱, 숫자가 아닌 문자를 만나면 멈춤
Number.parseInt("42abc");
Number.parseInt("100px");
Number.parseInt("3.14.15"); // 3 - 첫 번째 비숫자(.)에서 멈춤

// 파싱 불가능하면 NaN
Number.parseInt("abc"); // NaN
Number.parseInt(""); // NaN
// Number.parseInt(undefined); // NaN

/**
 * radix - 진법 지정
 * 두 번째 인자로 몇 진법으로 해석할지 지정합니다:
 */

// 16진수
Number.parseInt("FF", 16); // 255
Number.parseInt("0xFF", 16); // 255
Number.parseInt("ff", 16); // 255

// 2진수
Number.parseInt("1010", 2); // 10

// 해당 진법에 유효하지 않은 숫자에서 멈춤
Number.parseInt("19", 8); // 1 - 8진수에 9는 없으므로 "1"까지만 파싱

/**
 * radix를 반드시 명시해야 하는 이유
 */

// radix를 생략하면 문자열 접두사로 추측
Number.parseInt("0xFF"); // 255 - "0x"를 보고 16진수로 추측
Number.parseInt("077"); // 77 - 현대 엔진은 10진수로 처리

// 하지만 혼란을 피하려면 항상 명시
Number.parseInt("077", 10);
Number.parseInt("077", 8);

/**
 * Number.parseFloat(string)
 * 문자열 앞부분에서 부동소수점 숫자를 추출합니다. 글로벌 parseFloat()와 동일합니다.
 */
// 기본 사용
Number.parseFloat("3.14");
Number.parseFloat("  3.14  ");

Number.parseFloat("3.14abc"); // 3.14
Number.parseFloat("100.5px"); // 100.5
Number.parseFloat("3.14.15"); // 3.14 - 두 번째 점에서 멈춤

// 과학적 표기법 지원
Number.parseFloat("3.14e2"); // 314
Number.parseFloat("1e-5"); // 0.00001

// 특수 값
Number.parseFloat("Infinity"); // Infinity
Number.parseFloat("-Infinity"); // -Infinity

// 파싱 불가
Number.parseFloat("abc"); // NaN
Number.parseFloat(""); // NaN

/**
 * parseInt vs parseFloat vs Number()
 */

const input = "3.14abc";

Number.parseInt(input); // 3
Number.parseFloat(input); // 3.14
Number(input); // NaN

/**
 * 핵심 차이는 파싱(앞에서부터 추출)과 변환(전체가 유효해야 함)입니다:
 */

Number.parseInt("100px"); // 100
Number.parseFloat("3.14em");

// Number() - 전체 변환, 엄격함
Number("100px"); // NaN
Number("3.14em"); // NaN

// Number()가 더 유용한 경우
Number(""); // 0
Number("  42  "); // 42
Number(true); // 1
// Number(null): // 0
Number(false); // 0

// parse 계열은 이런 건 못 함
Number.parseInt(""); // NaN
// Number.parseInt(true); // NaN

/**
 * Number.EPSILON
 * 1과 1보다 큰 가장 작은 부동소수점 수의 차이입니다. 약 2.220446049250313e-16 (2^-52)
 */

console.log(Number.EPSILON); // 2.220446049250313e-16

/**
 * ### 이게 뭘 의미하는가
 *
 * 부동소수점에서 1 근처의 숫자 간격이 얼마인지를 나타냅니다:
 *
 * 수직선 위에 부동소수점으로 표현 가능한 숫자들:
 *
 * 0.9999999999999998  1.0 1.0000000000000002  1.0000000000000004 ...
 *                        ↕
 *                     EPSILON
 *                  (이 간격이 2^-52)
 *
 * 1과 1 + Number.EPSILON 사이에는 부동소수점 숫자가 하나도 없어요. 즉, 1에서 의미 있는 변화를 줄 수 있는 가장 작은 값입니다.
 */

1 + Number.EPSILON; // 1.0000000000000002 - 구별됨
1 + Number.EPSILON / 2; // 1 - 너무 작아서 1과 동일

/**
 * 실전 용도 - 부동소수점 비교
 */

0.1 + 0.2 === 0.3; // false - 부동소수점 오차

// EPSILON으로 "거의 같은지" 비교
function nearlyEqual(a: number, b: number): boolean {
    return Math.abs(a - b) < Number.EPSILON;
}

nearlyEqual(0.1 + 0.2, 0.3); // true

/**
 * 주의: EPSILON이 만능은 아님
 */

// 큰 숫자에서는 EPSILON이 너무 작아서 쓸모없음
const a1 = 1000000.1 + 1000000.2;
const b1 = 2000000.3;

Math.abs(a1 - b1) < Number.EPSILON; // false - 오차가 EPSILON보다 큼

// 큰 숫자에서는 상대 오차를 써야 함
function relativelyEqual(a: number, b: number): boolean {
    const maxAbs = Math.max(Math.abs(a), Math.abs(b));
    return Math.abs(a - b) < Number.EPSILON * maxAbs;
}

relativelyEqual(1000000.1 + 1000000.2, 2000000.3); // true

/**
 * EPSILON은 1 근처에서의 간격이기 때문에, 숫자 크기에 비례하여 스케일링해줘야 합니다.
 */

/**
 * Number.MAX_SAFE_INTEGER / MIN_SAFE_INTEGER
 */
Number.MAX_SAFE_INTEGER; // 9007199254740991 (2^53 - 1)
Number.MIN_SAFE_INTEGER; // -9007199254740991 (-(2^53 - 1))

/**
 * 이전에 isSafeInteger에서 다뤘던 경계값입니다. 이 범위 안에서만 정수 연산이 정확해요.
 *
 * 관련 상수들 전체
 */

// 안전한 정수 범위
Number.MAX_SAFE_INTEGER; //  9007199254740991 (2^53 - 1)
Number.MIN_SAFE_INTEGER; // -9007199254740991

// 표현 가능한 최대/최소 값
Number.MAX_VALUE; // 1.7976931348623157e+308
Number.MIN_VALUE; // 5e-324 (0보다 큰 가장 작은 양수)
Number.MAX_VALUE * 2; // Infinity

// 특수 값
Number.POSITIVE_INFINITY; // Infinity
Number.NEGATIVE_INFINITY; // -Infinity
Number.NaN; // NaN

// 정밀도
Number.EPSILON; // 2.220446049250313e-16 (2^-52)

/**
 * ```

이것들의 관계를 수직선으로 보면:
```
-∞ ← ─────────────────────────────────────────────────────── → +∞
     │                        │                        │
  -MAX_VALUE             0  MIN_VALUE              MAX_VALUE
                              (5e-324)            (1.8e+308)

안전한 정수 범위 (확대):
     │                  │                  │
  MIN_SAFE         0              MAX_SAFE
  (-9007조)                       (9007조)
 */

/**
 * 요약
 *
 * API 용도 핵심 특징
 * parseInt(str, radix) 문자열 -> 정수 앞에서부터 파싱, radix명시 필수
 * parseFloat(str) 문자열 -> 소수 앞에서부터 파싱, 과학적 표기 지원
 * EPSILON 부동소수점 비교 기준 1근처의 최소 간격, 큰 수에선 스케일링 필요
 * MAX_SAFE_INTEGER 안전한 정수 한계 2^53-1, 초과 시 BigInt 사용
 */

export {};
