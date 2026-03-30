# JS / TS / React / Next.js 전체 API 완전정복 스터디 플랜

> **목표**: 모든 주요 API를 한번씩 직접 써보며 복습하기
> **대상**: 고급 개발자 (심화 개념 복습 목적)
> **기간**: 8주 (주 5일, 하루 1~2시간 기준)

---

## 📋 전체 커리큘럼 개요

| 주차  | 영역                       | 핵심 토픽                                                |
| ----- | -------------------------- | -------------------------------------------------------- |
| 1주차 | JavaScript Core            | 원시타입, Object, Array, Map/Set, WeakRef                |
| 2주차 | JavaScript Async & Runtime | Promise, AsyncIterator, Worker, Proxy, Reflect           |
| 3주차 | JavaScript Web APIs        | DOM, Fetch, Streams, Intl, Temporal, Observers           |
| 4주차 | TypeScript 타입 시스템     | Utility Types, Conditional, Template Literal, Decorators |
| 5주차 | React Core                 | 모든 Hooks, Fiber, Concurrent Features                   |
| 6주차 | React Patterns & APIs      | Context, Suspense, ErrorBoundary, Server Components      |
| 7주차 | Next.js Routing & Data     | App Router, Layouts, Loading, Error, Server Actions      |
| 8주차 | Next.js 고급 기능          | Middleware, ISR, Image, Font, Metadata, Instrumentation  |

---

## Week 1: JavaScript Core APIs

### Day 1 — 원시값 & 래퍼 객체

- [x] `Symbol()`, `Symbol.for()`, `Symbol.iterator`, `Symbol.asyncIterator`
- [x] `Symbol.toPrimitive`, `Symbol.hasInstance`, `Symbol.species`
- [ ] `BigInt()`, BigInt 연산자, `BigInt.asIntN()`, `BigInt.asUintN()`
- [ ] `Number.isFinite()`, `Number.isNaN()`, `Number.isInteger()`, `Number.isSafeInteger()`
- [ ] `Number.parseFloat()`, `Number.parseInt()`, `Number.EPSILON`, `Number.MAX_SAFE_INTEGER`

### Day 2 — String & RegExp 완전판

- [ ] `String.raw`, `str.at()`, `str.normalize()`
- [ ] `str.replaceAll()`, `str.matchAll()`, `str.padStart/End()`
- [ ] `str.trimStart/End()`, `str.startsWith/endsWith/includes()`
- [ ] `str.isWellFormed()`, `str.toWellFormed()`
- [ ] RegExp: `d` flag (indices), `v` flag (unicodeSets), named groups `(?<name>)`
- [ ] `RegExp.prototype[Symbol.matchAll]`, lookbehind assertions

### Day 3 — Object 심화

- [ ] `Object.create()`, `Object.assign()`, `Object.is()`
- [ ] `Object.keys/values/entries()`, `Object.fromEntries()`
- [ ] `Object.defineProperty()`, `Object.defineProperties()`
- [ ] `Object.getOwnPropertyDescriptor/s()`, `Object.getOwnPropertyNames()`
- [ ] `Object.getOwnPropertySymbols()`, `Object.getPrototypeOf/setPrototypeOf()`
- [ ] `Object.freeze()`, `Object.seal()`, `Object.preventExtensions()`
- [ ] `Object.isFrozen()`, `Object.isSealed()`, `Object.isExtensible()`
- [ ] `Object.hasOwn()`, `Object.groupBy()`
- [ ] `structuredClone()`

### Day 4 — Array 전체 메서드

- [ ] Mutating: `push/pop/shift/unshift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`
- [ ] Non-mutating: `map`, `filter`, `reduce/reduceRight`, `find/findIndex`, `findLast/findLastIndex`
- [ ] `every`, `some`, `includes`, `indexOf/lastIndexOf`
- [ ] `flat`, `flatMap`, `slice`, `concat`, `join`
- [ ] `at()`, `with()`, `toSorted()`, `toReversed()`, `toSpliced()`
- [ ] `Array.from()`, `Array.of()`, `Array.fromAsync()`
- [ ] `Array.isArray()`, `Array.prototype[Symbol.iterator]`
- [ ] `TypedArray` (Uint8Array, Float64Array 등), `ArrayBuffer`, `SharedArrayBuffer`, `DataView`

### Day 5 — Map, Set, WeakMap, WeakSet, WeakRef

- [ ] `Map`: `set/get/has/delete/clear`, `size`, `entries/keys/values/forEach`
- [ ] `Set`: `add/has/delete/clear`, `size`, `union/intersection/difference/symmetricDifference`
- [ ] `Set.prototype.isSubsetOf()`, `isDisjointFrom()`, `isSupersetOf()`
- [ ] `WeakMap`, `WeakSet` — 사용 사례 (private data, DOM 메타데이터)
- [ ] `WeakRef`, `FinalizationRegistry` — GC 관찰 패턴

---

## Week 2: JavaScript Async & Runtime APIs

### Day 1 — Promise 완전판

- [ ] `new Promise()`, `resolve/reject`, `.then/.catch/.finally`
- [ ] `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, `Promise.any()`
- [ ] `Promise.withResolvers()`, `Promise.try()`
- [ ] Microtask queue vs Macrotask queue 동작 확인
- [ ] `queueMicrotask()`

### Day 2 — Iterator & Generator

- [ ] Iterator Protocol: `[Symbol.iterator]()`, `{ next(), return(), throw() }`
- [ ] Generator: `function*`, `yield`, `yield*`, `return`
- [ ] AsyncIterator: `[Symbol.asyncIterator]()`, `for await...of`
- [ ] AsyncGenerator: `async function*`
- [ ] 실전: 무한 시퀀스, 페이지네이션, 스트림 변환

### Day 3 — Proxy & Reflect

- [ ] `new Proxy(target, handler)` — 모든 trap 써보기
    - [ ] `get`, `set`, `has`, `deleteProperty`, `ownKeys`
    - [ ] `apply`, `construct`, `getPrototypeOf`, `setPrototypeOf`
    - [ ] `isExtensible`, `preventExtensions`, `defineProperty`, `getOwnPropertyDescriptor`
- [ ] `Reflect` — 모든 정적 메서드 (Proxy trap과 1:1 대응)
- [ ] `Proxy.revocable()`
- [ ] 실전: 반응형 시스템, 유효성 검증, 로깅 프록시

### Day 4 — 에러 처리 & 고급 함수

- [ ] `Error`, `TypeError`, `RangeError`, `SyntaxError`, `ReferenceError`
- [ ] `AggregateError`, `Error.cause`, `Error.stackTraceLimit`
- [ ] `try/catch/finally`, error 객체 속성 (`message`, `name`, `stack`, `cause`)
- [ ] `eval()`, `Function()` 생성자
- [ ] `globalThis`, `import()` 동적 임포트, `import.meta`

### Day 5 — Worker & Atomics

- [ ] `Worker`, `SharedWorker`, `MessageChannel`, `MessagePort`
- [ ] `BroadcastChannel`
- [ ] `Atomics.add/sub/and/or/xor`, `Atomics.load/store`
- [ ] `Atomics.wait()`, `Atomics.notify()`, `Atomics.waitAsync()`
- [ ] `SharedArrayBuffer` + `Atomics` 실전 사용
- [ ] `structuredClone()` 으로 Worker 간 데이터 전달

---

## Week 3: JavaScript Web/Browser APIs

### Day 1 — Fetch & Streams

- [ ] `fetch()` — headers, method, body, mode, credentials, signal
- [ ] `Request`, `Response`, `Headers` 객체
- [ ] `AbortController`, `AbortSignal`, `AbortSignal.timeout()`, `AbortSignal.any()`
- [ ] `ReadableStream`, `WritableStream`, `TransformStream`
- [ ] `ReadableStream.from()`, stream piping `.pipeThrough()`, `.pipeTo()`
- [ ] `TextEncoder`, `TextDecoder`, `TextEncoderStream`, `TextDecoderStream`
- [ ] `CompressionStream`, `DecompressionStream`

### Day 2 — URL, Encoding, Crypto

- [ ] `URL`, `URLSearchParams`, `URLPattern`
- [ ] `atob()`, `btoa()`, `encodeURIComponent()`, `decodeURIComponent()`
- [ ] `crypto.randomUUID()`, `crypto.getRandomValues()`
- [ ] `SubtleCrypto`: `digest`, `encrypt/decrypt`, `sign/verify`
- [ ] `SubtleCrypto`: `generateKey`, `deriveKey`, `deriveBits`
- [ ] `SubtleCrypto`: `importKey`, `exportKey`, `wrapKey/unwrapKey`

### Day 3 — Intl (국제화) 완전판

- [ ] `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.RelativeTimeFormat`
- [ ] `Intl.ListFormat`, `Intl.PluralRules`, `Intl.Collator`
- [ ] `Intl.Segmenter` (grapheme/word/sentence 분리)
- [ ] `Intl.DisplayNames` (언어/지역/통화 이름)
- [ ] `Intl.DurationFormat`, `Intl.Locale`

### Day 4 — DOM & Observer APIs

- [ ] `MutationObserver` — DOM 변경 감지
- [ ] `IntersectionObserver` — 뷰포트 교차 감지
- [ ] `ResizeObserver` — 요소 크기 변화 감지
- [ ] `PerformanceObserver` — 성능 지표 수집
- [ ] `ReportingObserver` — 브라우저 리포트 수집
- [ ] `document.querySelector/All`, `element.closest()`, `element.matches()`
- [ ] `element.toggleAttribute()`, `element.getAnimations()`

### Day 5 — 기타 Web APIs

- [ ] `setTimeout`, `setInterval`, `requestAnimationFrame`, `requestIdleCallback`
- [ ] `Blob`, `File`, `FileReader`, `FileReaderSync`
- [ ] `FormData`, `URLSearchParams`
- [ ] `CustomEvent`, `EventTarget`, `dispatchEvent`
- [ ] `Navigator` APIs: `navigator.clipboard`, `navigator.share`, `navigator.vibrate`
- [ ] `structuredClone()`, `JSON.parse/stringify` (replacer/reviver)
- [ ] `console` 완전판: `table`, `group/groupEnd`, `time/timeEnd`, `assert`, `trace`, `count`
- [ ] `Storage` (localStorage/sessionStorage), `IndexedDB`, `CacheStorage`

---

## Week 4: TypeScript 타입 시스템 완전정복

### Day 1 — 기본 & 내장 Utility Types

- [ ] `Partial<T>`, `Required<T>`, `Readonly<T>`
- [ ] `Pick<T,K>`, `Omit<T,K>`, `Record<K,T>`
- [ ] `Exclude<T,U>`, `Extract<T,U>`, `NonNullable<T>`
- [ ] `ReturnType<T>`, `Parameters<T>`, `ConstructorParameters<T>`, `InstanceType<T>`
- [ ] `Awaited<T>`, `ThisParameterType<T>`, `OmitThisParameter<T>`, `ThisType<T>`
- [ ] `Uppercase<T>`, `Lowercase<T>`, `Capitalize<T>`, `Uncapitalize<T>`
- [ ] `NoInfer<T>`

### Day 2 — Conditional & Mapped Types

- [ ] Conditional Types: `T extends U ? X : Y`
- [ ] `infer` 키워드 심화 (`infer` in tuple positions, constrained infer)
- [ ] Distributive conditional types
- [ ] Mapped Types: `[K in keyof T]: ...`
- [ ] `as` clause in mapped types (key remapping)
- [ ] Template literal types: `` `${A}-${B}` ``
- [ ] 실전: DeepPartial, DeepReadonly, PathOf<T> 직접 구현

### Day 3 — 고급 타입 기법

- [ ] Discriminated Unions (태그 유니온)
- [ ] `satisfies` 연산자
- [ ] `const` assertion (`as const`), `const` type parameters
- [ ] Variadic Tuple Types: `[...T, ...U]`
- [ ] Labeled Tuple Elements: `[name: string, age: number]`
- [ ] `declare`, `namespace`, module augmentation
- [ ] Type-level 프로그래밍: 재귀 타입, 타입 레벨 산술

### Day 4 — 제네릭 고급 & 타입 가드

- [ ] Generic constraints: `<T extends ...>`
- [ ] Generic defaults: `<T = DefaultType>`
- [ ] Higher-order function types
- [ ] Type predicates: `x is Type`
- [ ] `asserts x is Type` (assertion functions)
- [ ] `typeof` type guards, `instanceof`, `in` operator narrowing
- [ ] Control flow analysis & exhaustiveness checking (`never`)

### Day 5 — Decorators & 설정

- [ ] TC39 Decorators (Stage 3): class, method, accessor, field
- [ ] Decorator factories, metadata
- [ ] `tsconfig.json` 핵심 옵션 완전정리
    - [ ] `strict` 계열: strictNullChecks, strictFunctionTypes, strictBindCallApply 등
    - [ ] `moduleResolution`: bundler, node16, nodenext
    - [ ] `verbatimModuleSyntax`, `isolatedModules`
    - [ ] `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
- [ ] `.d.ts` 파일 작성법, Triple-slash directives

---

## Week 5: React Core APIs (모든 Hook + 핵심 API)

### Day 1 — State & Effect Hooks

- [ ] `useState` — lazy initializer, 함수 업데이트
- [ ] `useReducer` — complex state, init function
- [ ] `useEffect` — cleanup, dependency array, 실행 타이밍
- [ ] `useLayoutEffect` — DOM 측정, 동기 사이드이펙트
- [ ] `useInsertionEffect` — CSS-in-JS 라이브러리용

### Day 2 — Ref & Memo Hooks

- [ ] `useRef` — DOM 접근, 인스턴스 변수
- [ ] `useImperativeHandle` — ref 커스터마이징
- [ ] `useMemo` — 값 메모이제이션
- [ ] `useCallback` — 함수 메모이제이션
- [ ] `memo()` — 컴포넌트 메모이제이션, custom areEqual

### Day 3 — Context & Identity Hooks

- [ ] `createContext`, `useContext`
- [ ] `useId` — SSR-safe 고유 ID 생성
- [ ] `useDebugValue` — DevTools 커스텀 라벨
- [ ] `useSyncExternalStore` — 외부 스토어 구독
- [ ] 실전: 자체 상태 관리 라이브러리 구현

### Day 4 — React 19 신규 Hooks

- [ ] `useTransition` — 비긴급 상태 업데이트
- [ ] `useDeferredValue` — 값의 지연 업데이트
- [ ] `useOptimistic` — 낙관적 업데이트 (React 19)
- [ ] `useActionState` — form action 상태 관리 (React 19)
- [ ] `useFormStatus` — form 제출 상태 (React 19)
- [ ] `use()` — Promise/Context 읽기 (React 19)

### Day 5 — React Component APIs

- [ ] `forwardRef` (React 19에서는 props로 ref 전달 가능)
- [ ] `lazy()`, `Suspense` — 코드 스플리팅
- [ ] `startTransition` (hook 밖에서 사용)
- [ ] `createPortal` — DOM 트리 밖 렌더링
- [ ] `flushSync` — 동기 DOM 업데이트 강제
- [ ] `createElement`, `cloneElement`, `isValidElement`
- [ ] `Children.map/forEach/count/only/toArray`
- [ ] `Fragment`, `StrictMode`, `Profiler`

---

## Week 6: React Patterns & Advanced APIs

### Day 1 — Suspense & Error Handling

- [ ] `Suspense` — 로딩 경계, 중첩 Suspense
- [ ] `ErrorBoundary` (class component) — getDerivedStateFromError, componentDidCatch
- [ ] Error Recovery 패턴, `resetErrorBoundary`
- [ ] Suspense + ErrorBoundary 조합 패턴

### Day 2 — Server Components & Actions

- [ ] React Server Components (RSC) 개념
- [ ] `"use client"` / `"use server"` directives
- [ ] Server Actions: form action, `useActionState`
- [ ] Streaming SSR: `renderToPipeableStream`, `renderToReadableStream`

### Day 3 — 고급 패턴

- [ ] Compound Components 패턴
- [ ] Render Props 패턴
- [ ] HOC (Higher-Order Components)
- [ ] Custom Hooks 설계 원칙
- [ ] Controlled vs Uncontrolled Components
- [ ] State Machines in React (XState 패턴)

### Day 4 — React DOM APIs

- [ ] `createRoot`, `hydrateRoot`
- [ ] `<form>` action 속성 (React 19)
- [ ] Document Metadata: `<title>`, `<meta>`, `<link>` 호이스팅 (React 19)
- [ ] Stylesheet 관리: `precedence` 속성 (React 19)
- [ ] Resource preloading: `preload`, `preinit`, `prefetchDNS`, `preconnect` (React 19)

### Day 5 — 성능 최적화 & 테스트

- [ ] React Profiler API
- [ ] `useMemo`/`useCallback` 올바른 사용
- [ ] React Compiler (React 19.x) 개념
- [ ] Concurrent Features: `useTransition`, `useDeferredValue` 심화
- [ ] Testing: render, screen, fireEvent, waitFor (React Testing Library)

---

## Week 7: Next.js App Router & Data Fetching

### Day 1 — App Router 기본 구조

- [ ] `app/` 디렉토리 구조
- [ ] `page.tsx`, `layout.tsx`, `template.tsx`
- [ ] `loading.tsx`, `error.tsx`, `not-found.tsx`
- [ ] `default.tsx` (Parallel Routes)
- [ ] `route.ts` (Route Handlers — GET, POST, PUT, DELETE 등)
- [ ] `global-error.tsx`

### Day 2 — 라우팅 심화

- [ ] Dynamic Routes: `[slug]`, `[...slug]`, `[[...slug]]`
- [ ] Route Groups: `(group)`
- [ ] Parallel Routes: `@slot`
- [ ] Intercepting Routes: `(.)`, `(..)`, `(..)(..)``, `(...)`
- [ ] `generateStaticParams()` — Static Generation
- [ ] `useRouter`, `usePathname`, `useSearchParams`, `useParams`
- [ ] `useSelectedLayoutSegment`, `useSelectedLayoutSegments`
- [ ] `redirect()`, `permanentRedirect()`, `notFound()`

### Day 3 — Data Fetching & Caching

- [ ] Server Component에서의 `fetch()` + caching
- [ ] `cache()` (React) — 요청 메모이제이션
- [ ] `unstable_cache()` (Next.js) — 데이터 캐시
- [ ] `revalidateTag()`, `revalidatePath()` — 온디맨드 재검증
- [ ] `cookies()`, `headers()`, `draftMode()`
- [ ] Fetch options: `next.revalidate`, `next.tags`, `cache`

### Day 4 — Server Actions

- [ ] `"use server"` — 서버 액션 정의
- [ ] `<form action={serverAction}>` — form 연동
- [ ] `useActionState` — 서버 액션 상태
- [ ] `useFormStatus` — pending 상태
- [ ] Server Action에서의 `revalidatePath/Tag`, `redirect`
- [ ] 파일 업로드, 유효성 검증, 에러 핸들링 패턴
- [ ] Progressive Enhancement — JS 없이 작동하는 폼

### Day 5 — Streaming & 데이터 패턴

- [ ] Streaming SSR — React Suspense + Next.js
- [ ] `loading.tsx` vs 컴포넌트 단위 Suspense
- [ ] 병렬 데이터 fetching 패턴
- [ ] 순차 vs 병렬 vs Waterfall 패턴
- [ ] `generateMetadata()` — 동적 메타데이터
- [ ] `generateStaticParams()` 심화 — 크로스 패스 생성

---

## Week 8: Next.js 고급 기능 & 최적화

### Day 1 — Middleware & Configuration

- [ ] `middleware.ts` — 요청 가로채기, 리디렉트, 리라이트
- [ ] `NextRequest`, `NextResponse` API
- [ ] `matcher` config — 미들웨어 경로 매칭
- [ ] `next.config.js` 주요 옵션
    - [ ] `rewrites`, `redirects`, `headers`
    - [ ] `images`, `experimental`
    - [ ] `webpack` 커스터마이징

### Day 2 — 최적화 컴포넌트

- [ ] `next/image` — `Image` 컴포넌트 (fill, sizes, placeholder, blurDataURL)
- [ ] `next/font` — Google Fonts, Local Fonts (variable fonts)
- [ ] `next/link` — `Link` 컴포넌트 (prefetch, replace, scroll)
- [ ] `next/script` — `Script` 컴포넌트 (strategy: beforeInteractive/afterInteractive/lazyOnload)
- [ ] `next/dynamic` — Dynamic Import + SSR 제어

### Day 3 — Metadata & SEO

- [ ] Static Metadata: `export const metadata`
- [ ] Dynamic Metadata: `generateMetadata()`
- [ ] `opengraph-image.tsx`, `twitter-image.tsx` — 이미지 생성
- [ ] `sitemap.ts`, `robots.ts` — SEO 파일 생성
- [ ] `icon.tsx`, `apple-icon.tsx` — 파비콘 생성
- [ ] `manifest.ts` — Web App Manifest
- [ ] JSON-LD 구조화 데이터

### Day 4 — API Routes & Edge

- [ ] Route Handlers: 모든 HTTP 메서드
- [ ] Route Segment Config: `runtime`, `dynamic`, `revalidate`, `fetchCache`
- [ ] `export const runtime = 'edge'` vs `'nodejs'`
- [ ] Streaming responses (Route Handlers에서)
- [ ] `NextRequest` cookies, headers, geo, ip
- [ ] CORS, Rate Limiting 패턴
- [ ] Webhook 패턴

### Day 5 — 빌드 & 배포 관련

- [ ] ISR (Incremental Static Regeneration) — `revalidate` 옵션
- [ ] PPR (Partial Prerendering) — 실험적 기능
- [ ] `instrumentation.ts` — 서버 초기화 훅
- [ ] `next/headers` — `cookies()`, `headers()`
- [ ] `next/navigation` — 전체 API 정리
- [ ] Environment Variables: `NEXT_PUBLIC_` vs 서버 전용
- [ ] `output: 'standalone'` — Docker 배포

---

## ✅ 체크리스트 사용법

1. 각 항목을 실제 코드로 작성해보세요
2. 완료하면 `[ ]` → `[x]` 로 체크
3. 잘 모르는 부분은 별도 노트 작성
4. 주차 끝날 때마다 미니 프로젝트로 통합 복습

## 🎯 미니 프로젝트 제안

| 주차     | 프로젝트                                              |
| -------- | ----------------------------------------------------- |
| Week 1-2 | JS 유틸리티 라이브러리 직접 구현 (lodash 일부 재구현) |
| Week 3   | 브라우저 기반 암호화 메모장 (Web Crypto + Streams)    |
| Week 4   | Type-safe API 클라이언트 (타입 레벨 URL 파서)         |
| Week 5-6 | 상태관리 라이브러리 직접 구현 (Zustand 미니 클론)     |
| Week 7-8 | Full-stack Next.js 앱 (모든 Next.js 기능 통합)        |
