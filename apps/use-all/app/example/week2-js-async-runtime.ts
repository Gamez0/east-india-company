// ============================================================================
// Week 2: JavaScript Async & Runtime APIs — 코드 예제 모음
// ============================================================================

// ─── Day 1: Promise 완전판 ──────────────────────────────────────────────────

// 기본 생성
const p = new Promise<string>((resolve, reject) => {
  setTimeout(() => resolve("done"), 100);
});
p.then(console.log).catch(console.error).finally(() => console.log("cleanup"));

// Promise.all — 모두 성공해야 resolve
const [a, b, c] = await Promise.all([
  fetch("/api/users"),
  fetch("/api/posts"),
  fetch("/api/comments"),
]);

// Promise.allSettled — 실패해도 전부 기다림
const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error("fail")),
  Promise.resolve(3),
]);
results.forEach((r) => {
  if (r.status === "fulfilled") console.log("✓", r.value);
  else console.log("✗", r.reason.message);
});
// ✓ 1, ✗ fail, ✓ 3

// Promise.race — 가장 빠른 하나 (성공이든 실패든)
const winner = await Promise.race([
  new Promise((r) => setTimeout(() => r("slow"), 200)),
  new Promise((r) => setTimeout(() => r("fast"), 100)),
]);
console.log(winner); // "fast"

// Promise.any — 가장 빠른 성공 (모두 실패하면 AggregateError)
try {
  const first = await Promise.any([
    Promise.reject("err1"),
    Promise.resolve("ok"),
    Promise.reject("err2"),
  ]);
  console.log(first); // "ok"
} catch (e) {
  if (e instanceof AggregateError) console.log(e.errors);
}

// Promise.withResolvers — resolve/reject 외부 노출 (ES2024)
const { promise, resolve, reject } = Promise.withResolvers<string>();
setTimeout(() => resolve("external resolve!"), 100);
console.log(await promise);

// Promise.try — 동기/비동기 코드를 Promise로 래핑 (ES2025)
// const result = await Promise.try(() => {
//   if (Math.random() > 0.5) throw new Error("sync error");
//   return 42;
// });

// Microtask vs Macrotask 순서 확인
console.log("1: sync");
setTimeout(() => console.log("2: macrotask (setTimeout)"), 0);
Promise.resolve().then(() => console.log("3: microtask (promise)"));
queueMicrotask(() => console.log("4: microtask (queueMicrotask)"));
console.log("5: sync");
// 출력 순서: 1, 5, 3, 4, 2

// ─── Day 2: Iterator & Generator ───────────────────────────────────────────

// --- 커스텀 Iterator ---
class InfiniteCounter {
  private count: number;
  constructor(start = 0) { this.count = start; }

  [Symbol.iterator]() {
    let current = this.count;
    return {
      next() { return { value: current++, done: false }; },
      return(value?: number) {
        console.log("Iterator closed");
        return { value, done: true };
      },
    };
  }
}

// for...of는 break 시 return() 호출
for (const n of new InfiniteCounter()) {
  if (n > 3) break;
  console.log(n); // 0, 1, 2, 3
}

// --- Generator ---
function* fibonacci(): Generator<number, void, unknown> {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next()); // { value: 0, done: false }
console.log(fib.next()); // { value: 1, done: false }
console.log(fib.next()); // { value: 1, done: false }
console.log(fib.return()); // { value: undefined, done: true }

// yield* — 다른 이터러블에 위임
function* concat<T>(...iterables: Iterable<T>[]): Generator<T> {
  for (const iter of iterables) {
    yield* iter;
  }
}
console.log([...concat([1, 2], [3, 4], "ab")]); // [1,2,3,4,"a","b"]

// Generator로 양방향 통신
function* stateMachine(): Generator<string, void, string> {
  let input = yield "ready";
  while (input !== "quit") {
    input = yield `received: ${input}`;
  }
  return;
}
const sm = stateMachine();
console.log(sm.next()); // { value: "ready" }
console.log(sm.next("hello")); // { value: "received: hello" }
console.log(sm.next("world")); // { value: "received: world" }
console.log(sm.next("quit")); // { value: undefined, done: true }

// --- Async Generator ---
async function* paginate<T>(
  fetchPage: (cursor: string) => Promise<{ data: T[]; next?: string }>
): AsyncGenerator<T[]> {
  let cursor = "";
  while (true) {
    const { data, next } = await fetchPage(cursor);
    yield data;
    if (!next) break;
    cursor = next;
  }
}

// for await...of 사용
// for await (const page of paginate(fetchFn)) {
//   page.forEach(item => process(item));
// }

// --- Async Iterator Protocol 직접 구현 ---
const asyncIter = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      async next() {
        await new Promise((r) => setTimeout(r, 100));
        return i < 3 ? { value: i++, done: false } : { done: true, value: undefined };
      },
    };
  },
};

// ─── Day 3: Proxy & Reflect ────────────────────────────────────────────────

// --- 모든 Proxy Trap ---
const handler: ProxyHandler<any> = {
  // 속성 읽기
  get(target, prop, receiver) {
    console.log(`GET ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },

  // 속성 쓰기
  set(target, prop, value, receiver) {
    console.log(`SET ${String(prop)} = ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },

  // in 연산자
  has(target, prop) {
    console.log(`HAS ${String(prop)}`);
    return Reflect.has(target, prop);
  },

  // delete 연산자
  deleteProperty(target, prop) {
    console.log(`DELETE ${String(prop)}`);
    return Reflect.deleteProperty(target, prop);
  },

  // Object.keys(), for...in 등
  ownKeys(target) {
    console.log("OWNKEYS");
    return Reflect.ownKeys(target);
  },

  // 함수 호출 (target이 함수일 때)
  apply(target, thisArg, args) {
    console.log(`APPLY with args: ${args}`);
    return Reflect.apply(target, thisArg, args);
  },

  // new 연산자 (target이 함수일 때)
  construct(target, args, newTarget) {
    console.log(`CONSTRUCT with args: ${args}`);
    return Reflect.construct(target, args, newTarget);
  },

  // Object.getPrototypeOf
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target);
  },

  // Object.setPrototypeOf
  setPrototypeOf(target, proto) {
    return Reflect.setPrototypeOf(target, proto);
  },

  // Object.isExtensible
  isExtensible(target) {
    return Reflect.isExtensible(target);
  },

  // Object.preventExtensions
  preventExtensions(target) {
    return Reflect.preventExtensions(target);
  },

  // Object.defineProperty
  defineProperty(target, prop, desc) {
    return Reflect.defineProperty(target, prop, desc);
  },

  // Object.getOwnPropertyDescriptor
  getOwnPropertyDescriptor(target, prop) {
    return Reflect.getOwnPropertyDescriptor(target, prop);
  },
};

// 반응형 시스템 (Vue 스타일)
function reactive<T extends object>(target: T): T {
  const subscribers = new Map<string | symbol, Set<() => void>>();
  let activeEffect: (() => void) | null = null;

  const proxy = new Proxy(target, {
    get(obj, prop, receiver) {
      if (activeEffect) {
        if (!subscribers.has(prop)) subscribers.set(prop, new Set());
        subscribers.get(prop)!.add(activeEffect);
      }
      return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, value, receiver) {
      const result = Reflect.set(obj, prop, value, receiver);
      subscribers.get(prop)?.forEach((fn) => fn());
      return result;
    },
  });

  return proxy;
}

// Proxy.revocable — 취소 가능한 프록시
const { proxy: revocable, revoke } = Proxy.revocable({ x: 1 }, {});
console.log(revocable.x); // 1
revoke();
// revocable.x; // TypeError: Cannot perform 'get' on a proxy that has been revoked

// 유효성 검증 프록시
const validated = new Proxy(
  {} as Record<string, number>,
  {
    set(target, prop, value) {
      if (typeof value !== "number") throw new TypeError(`${String(prop)} must be a number`);
      if (value < 0) throw new RangeError(`${String(prop)} must be non-negative`);
      return Reflect.set(target, prop, value);
    },
  }
);

// ─── Day 4: 에러 처리 & 고급 함수 ──────────────────────────────────────────

// --- Error 타입들 ---
try {
  throw new TypeError("expected string");
} catch (e) {
  if (e instanceof TypeError) console.log("Type error:", e.message);
}

// AggregateError — 여러 에러를 묶음
const aggErr = new AggregateError(
  [new Error("err1"), new Error("err2")],
  "Multiple errors"
);
console.log(aggErr.errors); // [Error, Error]

// Error.cause — 에러 체이닝 (ES2022)
try {
  try {
    JSON.parse("invalid");
  } catch (e) {
    throw new Error("Config parsing failed", { cause: e });
  }
} catch (e) {
  console.log(e.message); // "Config parsing failed"
  console.log(e.cause);   // SyntaxError: ...
}

// --- 동적 import ---
// const module = await import("./my-module.ts");

// import.meta
// console.log(import.meta.url);
// console.log(import.meta.resolve("./other.ts"));

// globalThis — 어디서든 전역 객체
console.log(globalThis === globalThis); // true (브라우저: window, Node: global)

// ─── Day 5: Worker & Atomics ───────────────────────────────────────────────

// --- Web Worker (브라우저 환경) ---
// main.ts
// const worker = new Worker("./worker.ts", { type: "module" });
// worker.postMessage({ type: "compute", data: [1, 2, 3] });
// worker.onmessage = (e) => console.log("Result:", e.data);
// worker.onerror = (e) => console.error("Worker error:", e);
// worker.terminate();

// worker.ts
// self.onmessage = (e) => {
//   const result = e.data.data.reduce((a, b) => a + b, 0);
//   self.postMessage(result);
// };

// --- MessageChannel ---
// const { port1, port2 } = new MessageChannel();
// port1.onmessage = (e) => console.log("port1 received:", e.data);
// port2.postMessage("hello from port2");

// --- BroadcastChannel ---
// const bc = new BroadcastChannel("app-sync");
// bc.onmessage = (e) => console.log("Broadcast:", e.data);
// bc.postMessage({ type: "state-update", payload: { user: "logged-in" } });
// bc.close();

// --- SharedArrayBuffer & Atomics ---
// (COOP/COEP 헤더 필요)
const sab = new SharedArrayBuffer(16); // 16바이트
const int32 = new Int32Array(sab);

// Atomics 연산 (다른 Worker와 안전하게 공유)
Atomics.store(int32, 0, 42);
console.log(Atomics.load(int32, 0)); // 42
Atomics.add(int32, 0, 10);
console.log(Atomics.load(int32, 0)); // 52
Atomics.sub(int32, 0, 2);
Atomics.and(int32, 0, 0xFF);
Atomics.or(int32, 0, 0x100);
Atomics.xor(int32, 0, 0xFF);
Atomics.exchange(int32, 0, 100);
Atomics.compareExchange(int32, 0, 100, 200); // if (arr[0] === 100) arr[0] = 200;

// Atomics.wait & Atomics.notify (동기화)
// Worker 1: Atomics.wait(int32, 0, 0); // 값이 0이면 대기
// Worker 2: Atomics.store(int32, 0, 1); Atomics.notify(int32, 0, 1); // 깨움

// Atomics.waitAsync — 메인 스레드에서도 사용 가능
const waitResult = Atomics.waitAsync(int32, 0, 0);
if (waitResult.async) {
  waitResult.value.then((result) => console.log("Wait result:", result));
}

// structuredClone — Worker 간 복잡한 객체 전달
const complex = {
  date: new Date(),
  map: new Map([[1, "one"]]),
  set: new Set([1, 2, 3]),
  buffer: new ArrayBuffer(8),
  regex: /hello/gi,
};
const clone = structuredClone(complex);
// worker.postMessage(clone);

// Transferable Objects — 소유권 이전 (복사 X)
// const ab = new ArrayBuffer(1024 * 1024); // 1MB
// worker.postMessage(ab, [ab]); // 이전 후 ab.byteLength === 0
