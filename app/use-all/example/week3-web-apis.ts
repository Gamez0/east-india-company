// ============================================================================
// Week 3: JavaScript Web/Browser APIs — 코드 예제 모음
// ============================================================================

// ─── Day 1: Fetch & Streams ────────────────────────────────────────────────

// --- fetch 전체 옵션 ---
const response = await fetch("https://api.example.com/data", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: "Bearer token" },
  body: JSON.stringify({ key: "value" }),
  mode: "cors", // cors | no-cors | same-origin
  credentials: "include", // omit | same-origin | include
  cache: "no-store", // default | no-store | reload | no-cache | force-cache
  redirect: "follow", // follow | error | manual
  referrerPolicy: "no-referrer",
  signal: AbortSignal.timeout(5000), // 5초 타임아웃
  keepalive: true,
});

// --- Request & Response 객체 ---
const req = new Request("https://api.example.com", {
  method: "POST",
  headers: new Headers({ "X-Custom": "value" }),
});
console.log(req.url, req.method);
const clonedReq = req.clone(); // 스트림 재사용을 위한 클론

const res = new Response(JSON.stringify({ ok: true }), {
  status: 200,
  statusText: "OK",
  headers: { "Content-Type": "application/json" },
});
console.log(res.ok, res.status, res.redirected);
const body = await res.json();
// 다른 body 읽기: .text(), .blob(), .arrayBuffer(), .formData()

// --- Headers 객체 ---
const headers = new Headers();
headers.append("Accept", "application/json");
headers.append("Accept", "text/plain"); // 값 추가 (덮어쓰기 X)
headers.set("Authorization", "Bearer token"); // 덮어쓰기
headers.has("Accept"); // true
headers.get("Accept"); // "application/json, text/plain"
headers.delete("Authorization");
for (const [name, value] of headers) console.log(name, value);

// --- AbortController ---
const controller = new AbortController();
const { signal } = controller;

signal.addEventListener("abort", () => {
  console.log("Aborted!", signal.reason);
});

// fetch에 signal 전달
// fetch("/api/data", { signal }).catch(e => {
//   if (e.name === "AbortError") console.log("Request was aborted");
// });
// controller.abort("User cancelled");

// AbortSignal.timeout — 자동 타임아웃
// fetch("/api", { signal: AbortSignal.timeout(3000) });

// AbortSignal.any — 여러 시그널 결합 (ES2024)
const timeout = AbortSignal.timeout(5000);
const manual = new AbortController();
const combined = AbortSignal.any([timeout, manual.signal]);
// fetch("/api", { signal: combined });

// --- Streams API ---

// ReadableStream 생성
const readable = new ReadableStream<string>({
  start(controller) {
    controller.enqueue("Hello ");
    controller.enqueue("World");
    controller.close();
  },
});

// 읽기
const reader = readable.getReader();
let chunk;
while (!(chunk = await reader.read()).done) {
  console.log(chunk.value);
}

// ReadableStream.from — 이터러블에서 스트림 생성
const fromIter = ReadableStream.from(["a", "b", "c"]);

// WritableStream
const writable = new WritableStream<string>({
  write(chunk) { console.log("Writing:", chunk); },
  close() { console.log("Stream closed"); },
  abort(reason) { console.log("Aborted:", reason); },
});

// TransformStream — 변환 파이프
const uppercase = new TransformStream<string, string>({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

// Piping
// readable.pipeThrough(uppercase).pipeTo(writable);

// TextEncoder/Decoder
const encoder = new TextEncoder();
const encoded = encoder.encode("Hello 세계"); // Uint8Array
const decoder = new TextDecoder("utf-8");
console.log(decoder.decode(encoded)); // "Hello 세계"

// Streaming encoder/decoder
const encoderStream = new TextEncoderStream();
const decoderStream = new TextDecoderStream();

// CompressionStream / DecompressionStream
const compressed = new Response("large data")
  .body!
  .pipeThrough(new CompressionStream("gzip"));
// .pipeThrough(new DecompressionStream("gzip")) 로 복원

// ─── Day 2: URL, Encoding, Crypto ──────────────────────────────────────────

// --- URL ---
const url = new URL("https://user:pass@example.com:8080/path?q=test#hash");
console.log(url.protocol); // "https:"
console.log(url.username); // "user"
console.log(url.hostname); // "example.com"
console.log(url.port); // "8080"
console.log(url.pathname); // "/path"
console.log(url.search); // "?q=test"
console.log(url.hash); // "#hash"
console.log(url.origin); // "https://example.com:8080"
console.log(url.href); // 전체 URL

// URLSearchParams
const params = new URLSearchParams("a=1&b=2&a=3");
console.log(params.getAll("a")); // ["1", "3"]
params.append("c", "4");
params.set("a", "99"); // 첫번째만 덮어쓰기
params.delete("b");
params.sort();
console.log(params.toString()); // "a=99&c=4"
for (const [k, v] of params) console.log(k, v);
console.log(params.has("c")); // true
console.log(params.size); // 2

// URLPattern (일부 환경에서 지원)
// const pattern = new URLPattern({ pathname: "/users/:id" });
// const match = pattern.exec("https://example.com/users/123");
// console.log(match?.pathname.groups.id); // "123"

// --- Encoding ---
console.log(btoa("Hello World")); // "SGVsbG8gV29ybGQ=" (base64 인코딩)
console.log(atob("SGVsbG8gV29ybGQ=")); // "Hello World" (base64 디코딩)
console.log(encodeURIComponent("hello world&foo=bar")); // "hello%20world%26foo%3Dbar"
console.log(decodeURIComponent("hello%20world")); // "hello world"
console.log(encodeURI("https://example.com/path name")); // URI 전체 인코딩
console.log(decodeURI("https://example.com/path%20name"));

// --- Web Crypto API ---
// UUID 생성
console.log(crypto.randomUUID()); // "550e8400-e29b-41d4-a716-446655440000"

// 난수 생성
const randomBytes = new Uint8Array(32);
crypto.getRandomValues(randomBytes);

// SubtleCrypto — SHA-256 해시
const data = new TextEncoder().encode("Hello World");
const hashBuffer = await crypto.subtle.digest("SHA-256", data);
const hashHex = [...new Uint8Array(hashBuffer)]
  .map((b) => b.toString(16).padStart(2, "0"))
  .join("");
console.log(hashHex);

// AES-GCM 암호화/복호화
const key = await crypto.subtle.generateKey(
  { name: "AES-GCM", length: 256 },
  true, // extractable
  ["encrypt", "decrypt"]
);

const iv = crypto.getRandomValues(new Uint8Array(12));
const plaintext = new TextEncoder().encode("Secret message");

const ciphertext = await crypto.subtle.encrypt(
  { name: "AES-GCM", iv },
  key,
  plaintext
);

const decrypted = await crypto.subtle.decrypt(
  { name: "AES-GCM", iv },
  key,
  ciphertext
);
console.log(new TextDecoder().decode(decrypted)); // "Secret message"

// HMAC 서명/검증
const hmacKey = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"]
);
const signature = await crypto.subtle.sign("HMAC", hmacKey, data);
const isValid = await crypto.subtle.verify("HMAC", hmacKey, signature, data);
console.log(isValid); // true

// Key Export/Import
const rawKey = await crypto.subtle.exportKey("raw", key);
const importedKey = await crypto.subtle.importKey(
  "raw",
  rawKey,
  { name: "AES-GCM" },
  true,
  ["encrypt", "decrypt"]
);

// PBKDF2 — 비밀번호 기반 키 유도
const passwordKey = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode("my-password"),
  "PBKDF2",
  false,
  ["deriveKey"]
);
const derivedKey = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt: randomBytes, iterations: 100000, hash: "SHA-256" },
  passwordKey,
  { name: "AES-GCM", length: 256 },
  true,
  ["encrypt", "decrypt"]
);

// ─── Day 3: Intl (국제화) ──────────────────────────────────────────────────

// --- DateTimeFormat ---
const date = new Date("2024-12-25T15:30:00");
console.log(new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "full", timeStyle: "long"
}).format(date));
// "2024년 12월 25일 수요일 오후 3시 30분 00초 GMT+9"

console.log(new Intl.DateTimeFormat("en-US", {
  weekday: "long", year: "numeric", month: "long", day: "numeric"
}).format(date));

// formatRange — 날짜 범위
const start = new Date("2024-01-01");
const end = new Date("2024-01-15");
console.log(new Intl.DateTimeFormat("ko-KR").formatRange(start, end));
// "2024. 1. 1. ~ 2024. 1. 15."

// formatToParts
const parts = new Intl.DateTimeFormat("en-US").formatToParts(date);
console.log(parts); // [{ type: "month", value: "12" }, ...]

// --- NumberFormat ---
console.log(new Intl.NumberFormat("ko-KR", {
  style: "currency", currency: "KRW"
}).format(1234567)); // "₩1,234,567"

console.log(new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD"
}).format(1234.56)); // "$1,234.56"

console.log(new Intl.NumberFormat("en", {
  notation: "compact", compactDisplay: "short"
}).format(1_500_000)); // "1.5M"

console.log(new Intl.NumberFormat("en", {
  style: "unit", unit: "kilometer-per-hour"
}).format(120)); // "120 km/h"

console.log(new Intl.NumberFormat("en", {
  style: "percent", minimumFractionDigits: 1
}).format(0.856)); // "85.6%"

// signDisplay
console.log(new Intl.NumberFormat("en", {
  signDisplay: "always"
}).format(42)); // "+42"

// --- RelativeTimeFormat ---
const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });
console.log(rtf.format(-1, "day")); // "어제"
console.log(rtf.format(2, "hour")); // "2시간 후"
console.log(rtf.format(-3, "month")); // "3개월 전"

// --- ListFormat ---
const lf = new Intl.ListFormat("ko", { style: "long", type: "conjunction" });
console.log(lf.format(["사과", "바나나", "체리"])); // "사과, 바나나 및 체리"

const lfEn = new Intl.ListFormat("en", { style: "long", type: "disjunction" });
console.log(lfEn.format(["red", "blue", "green"])); // "red, blue, or green"

// --- PluralRules ---
const pr = new Intl.PluralRules("en");
console.log(pr.select(0)); // "other"
console.log(pr.select(1)); // "one"
console.log(pr.select(2)); // "other"

const prOrdinal = new Intl.PluralRules("en", { type: "ordinal" });
console.log(prOrdinal.select(1)); // "one" → 1st
console.log(prOrdinal.select(2)); // "two" → 2nd
console.log(prOrdinal.select(3)); // "few" → 3rd

// --- Collator ---
const collator = new Intl.Collator("ko", { sensitivity: "base" });
console.log(["다", "가", "나"].sort(collator.compare)); // ["가", "나", "다"]

// --- Segmenter ---
const segmenter = new Intl.Segmenter("ko", { granularity: "word" });
const segments = [...segmenter.segment("안녕하세요 세계입니다")];
console.log(segments.map(s => s.segment)); // ["안녕하세요", " ", "세계입니다"]

const graphemes = new Intl.Segmenter("en", { granularity: "grapheme" });
console.log([...graphemes.segment("👨‍👩‍👧‍👦")].length); // 1 (이모지 클러스터)
console.log("👨‍👩‍👧‍👦".length); // 11 (코드 유닛)

// --- DisplayNames ---
const dn = new Intl.DisplayNames("ko", { type: "language" });
console.log(dn.of("en")); // "영어"
console.log(dn.of("ja")); // "일본어"

const dnRegion = new Intl.DisplayNames("ko", { type: "region" });
console.log(dnRegion.of("US")); // "미국"

const dnCurrency = new Intl.DisplayNames("ko", { type: "currency" });
console.log(dnCurrency.of("USD")); // "미국 달러"

// --- DurationFormat ---
// const df = new Intl.DurationFormat("ko", { style: "long" });
// console.log(df.format({ hours: 2, minutes: 30, seconds: 15 }));
// "2시간 30분 15초"

// --- Locale ---
const locale = new Intl.Locale("ko-KR-u-ca-buddhist");
console.log(locale.language); // "ko"
console.log(locale.region); // "KR"
console.log(locale.calendar); // "buddhist"

// ─── Day 4: DOM & Observer APIs ────────────────────────────────────────────

// --- MutationObserver ---
// const mutObs = new MutationObserver((mutations) => {
//   mutations.forEach((m) => {
//     console.log(m.type, m.target, m.addedNodes, m.removedNodes);
//     console.log(m.attributeName, m.oldValue);
//   });
// });
// mutObs.observe(document.body, {
//   childList: true, subtree: true, attributes: true,
//   attributeOldValue: true, characterData: true
// });
// mutObs.disconnect();
// mutObs.takeRecords(); // 대기 중인 기록 가져오기

// --- IntersectionObserver ---
// const intObs = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       console.log(entry.isIntersecting, entry.intersectionRatio);
//       console.log(entry.boundingClientRect, entry.intersectionRect);
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         intObs.unobserve(entry.target); // lazy load 패턴
//       }
//     });
//   },
//   { root: null, rootMargin: "0px 0px -100px 0px", threshold: [0, 0.5, 1] }
// );
// document.querySelectorAll(".lazy").forEach(el => intObs.observe(el));

// --- ResizeObserver ---
// const resObs = new ResizeObserver((entries) => {
//   entries.forEach((entry) => {
//     const { width, height } = entry.contentRect;
//     console.log(`${entry.target.id}: ${width}x${height}`);
//     // borderBoxSize, contentBoxSize, devicePixelContentBoxSize 도 사용 가능
//     const [box] = entry.borderBoxSize;
//     console.log(box.inlineSize, box.blockSize);
//   });
// });

// --- PerformanceObserver ---
// const perfObs = new PerformanceObserver((list) => {
//   list.getEntries().forEach((entry) => {
//     console.log(entry.name, entry.entryType, entry.duration, entry.startTime);
//   });
// });
// perfObs.observe({ type: "measure", buffered: true });
// performance.mark("start");
// // ... work ...
// performance.mark("end");
// performance.measure("work-duration", "start", "end");

// --- DOM 메서드 ---
// document.querySelector(".my-class");
// document.querySelectorAll("[data-role]");
// element.closest(".parent-class"); // 가장 가까운 조상
// element.matches(".some-selector"); // 셀렉터 매칭 확인
// element.toggleAttribute("hidden"); // 있으면 제거, 없으면 추가
// element.getAnimations(); // 실행 중인 Animation 객체들

// ─── Day 5: 기타 Web APIs ──────────────────────────────────────────────────

// --- Timing APIs ---
// setTimeout, setInterval — 생략 (기본)
// requestAnimationFrame — 60fps 애니메이션
// let animId: number;
// function animate(timestamp: DOMHighResTimeStamp) {
//   // update...
//   animId = requestAnimationFrame(animate);
// }
// cancelAnimationFrame(animId);

// requestIdleCallback — 유휴 시간에 작업 실행
// requestIdleCallback((deadline) => {
//   while (deadline.timeRemaining() > 0) {
//     // 낮은 우선순위 작업 수행
//   }
// }, { timeout: 2000 }); // 최대 2초 대기

// --- Blob & File ---
const blob = new Blob(["Hello World"], { type: "text/plain" });
console.log(blob.size, blob.type);
const text = await blob.text();
const arrayBuf = await blob.arrayBuffer();
const sliced = blob.slice(0, 5, "text/plain"); // 부분 Blob
// const blobUrl = URL.createObjectURL(blob);
// URL.revokeObjectURL(blobUrl); // 메모리 해제

// File — Blob의 서브클래스
const file = new File(["content"], "test.txt", {
  type: "text/plain",
  lastModified: Date.now(),
});
console.log(file.name, file.lastModified);

// FileReader
const fileReader = new FileReader();
fileReader.onload = () => console.log(fileReader.result);
fileReader.onerror = () => console.error(fileReader.error);
// fileReader.readAsText(file);
// fileReader.readAsDataURL(file);   // base64
// fileReader.readAsArrayBuffer(file);
// fileReader.readAsBinaryString(file);

// --- FormData ---
const formData = new FormData();
formData.append("name", "John");
formData.append("file", blob, "hello.txt");
formData.set("name", "Jane"); // 덮어쓰기
formData.has("name"); // true
formData.get("name"); // "Jane"
formData.getAll("name"); // ["Jane"]
formData.delete("name");
for (const [k, v] of formData) console.log(k, v);

// --- CustomEvent & EventTarget ---
const emitter = new EventTarget();
emitter.addEventListener("custom", (e: Event) => {
  const ce = e as CustomEvent;
  console.log("Custom event:", ce.detail);
});
emitter.dispatchEvent(new CustomEvent("custom", { detail: { foo: "bar" } }));

// --- Navigator APIs ---
// navigator.clipboard.writeText("copied!");
// const clipText = await navigator.clipboard.readText();

// navigator.share({ title: "Title", text: "Text", url: "https://..." });
// navigator.vibrate([200, 100, 200]); // 진동 패턴

// --- JSON 고급 ---
// replacer — 직렬화 커스터마이징
const jsonStr = JSON.stringify(
  { name: "John", age: 30, password: "secret", date: new Date() },
  (key, value) => {
    if (key === "password") return undefined; // 제외
    if (value instanceof Date) return value.toISOString();
    return value;
  },
  2 // 들여쓰기
);

// reviver — 역직렬화 커스터마이징
const parsed = JSON.parse(jsonStr, (key, value) => {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value);
  }
  return value;
});

// --- console 완전판 ---
console.table([{ name: "A", score: 90 }, { name: "B", score: 85 }]);
console.group("Grouped");
console.log("Inside group");
console.groupEnd();
console.time("timer");
// ... work ...
console.timeEnd("timer"); // timer: 0.123ms
console.assert(1 === 2, "1 is not 2"); // 실패 시만 출력
console.trace("Stack trace"); // 콜스택 출력
console.count("label"); // label: 1
console.count("label"); // label: 2
console.countReset("label");
console.dir({ nested: { deep: true } }); // 객체 구조 출력

// --- Storage APIs (브라우저) ---
// localStorage.setItem("key", "value");
// localStorage.getItem("key"); // "value"
// localStorage.removeItem("key");
// localStorage.clear();
// localStorage.length;
// localStorage.key(0); // 첫번째 키 이름

// sessionStorage — 동일 API, 탭/세션 단위

// --- IndexedDB 간단 사용 ---
// const dbReq = indexedDB.open("myDB", 1);
// dbReq.onupgradeneeded = (e) => {
//   const db = e.target.result;
//   const store = db.createObjectStore("items", { keyPath: "id", autoIncrement: true });
//   store.createIndex("name", "name", { unique: false });
// };
// dbReq.onsuccess = (e) => {
//   const db = e.target.result;
//   const tx = db.transaction("items", "readwrite");
//   const store = tx.objectStore("items");
//   store.add({ name: "Item 1" });
//   store.getAll().onsuccess = (e) => console.log(e.target.result);
// };

// --- Cache API (Service Worker) ---
// const cache = await caches.open("v1");
// await cache.add("/api/data");
// await cache.put(new Request("/custom"), new Response("cached"));
// const match = await cache.match("/api/data");
// await caches.delete("v1");
