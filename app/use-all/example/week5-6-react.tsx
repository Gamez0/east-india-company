// ============================================================================
// Week 5-6: React Core & Advanced APIs — 코드 예제 모음
// ============================================================================

import React, {
  useState, useReducer, useEffect, useLayoutEffect, useInsertionEffect,
  useRef, useImperativeHandle, useMemo, useCallback, memo,
  createContext, useContext, useId, useDebugValue, useSyncExternalStore,
  useTransition, useDeferredValue, useOptimistic, useActionState,
  use, forwardRef, lazy, Suspense, startTransition,
  createPortal, createElement, cloneElement, isValidElement,
  Children, Fragment, StrictMode, Profiler,
} from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot } from "react-dom/client";
import { useFormStatus } from "react-dom";

// ─── Day 1: State & Effect Hooks ───────────────────────────────────────────

// --- useState ---
function Counter() {
  // Lazy initializer — 초기값이 비싼 연산일 때
  const [count, setCount] = useState(() => {
    return JSON.parse(localStorage.getItem("count") ?? "0");
  });

  // 함수 업데이트 — 이전 상태 기반
  const increment = () => setCount((prev: number) => prev + 1);
  const reset = () => setCount(0);

  return <button onClick={increment}>{count}</button>;
}

// --- useReducer ---
type State = { count: number; step: number };
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "setStep"; step: number }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment": return { ...state, count: state.count + state.step };
    case "decrement": return { ...state, count: state.count - state.step };
    case "setStep": return { ...state, step: action.step };
    case "reset": return init(state.step); // init 함수 사용
  }
}

function init(step: number): State {
  return { count: 0, step };
}

function StepCounter() {
  // 3번째 인자: init 함수 (lazy initialization)
  const [state, dispatch] = useReducer(reducer, 1, init);
  return (
    <>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: "increment" })}>+{state.step}</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </>
  );
}

// --- useEffect ---
function DataFetcher({ id }: { id: string }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetch(`/api/items/${id}`, { signal: controller.signal });
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        throw e;
      }
    }
    fetchData();

    // Cleanup — 언마운트 또는 id 변경 시
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [id]); // dependency array

  return <div>{JSON.stringify(data)}</div>;
}

// --- useLayoutEffect ---
function TooltipPositioner({ children, targetRect }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // DOM 측정 후 페인트 전에 동기적으로 실행
  useLayoutEffect(() => {
    if (ref.current && targetRect) {
      const { height } = ref.current.getBoundingClientRect();
      setPosition({
        top: targetRect.top - height - 8,
        left: targetRect.left,
      });
    }
  }, [targetRect]);

  return <div ref={ref} style={position}>{children}</div>;
}

// --- useInsertionEffect ---
// CSS-in-JS 라이브러리에서 스타일 주입용 (DOM ref 접근 불가)
function useCSS(rule: string) {
  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.textContent = rule;
    document.head.appendChild(style);
    return () => style.remove();
  }, [rule]);
}

// ─── Day 2: Ref & Memo Hooks ───────────────────────────────────────────────

// --- useRef ---
function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const renderCountRef = useRef(0); // 인스턴스 변수 (리렌더 트리거 X)

  useEffect(() => {
    renderCountRef.current += 1;
  });

  return (
    <>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={() => videoRef.current?.play()}>Play</button>
      <button onClick={() => videoRef.current?.pause()}>Pause</button>
    </>
  );
}

// --- useImperativeHandle ---
interface InputHandle {
  focus: () => void;
  scrollIntoView: () => void;
  selectAll: () => void;
}

const FancyInput = forwardRef<InputHandle, { placeholder?: string }>(
  function FancyInput({ placeholder }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus() { inputRef.current?.focus(); },
      scrollIntoView() { inputRef.current?.scrollIntoView({ behavior: "smooth" }); },
      selectAll() { inputRef.current?.select(); },
    }), []);

    return <input ref={inputRef} placeholder={placeholder} />;
  }
);

// React 19에서는 forwardRef 없이 props로 ref 전달 가능
function FancyInputV19({ ref, placeholder }: { ref?: React.Ref<InputHandle>; placeholder?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    focus() { inputRef.current?.focus(); },
    scrollIntoView() { inputRef.current?.scrollIntoView({ behavior: "smooth" }); },
    selectAll() { inputRef.current?.select(); },
  }), []);
  return <input ref={inputRef} placeholder={placeholder} />;
}

// --- useMemo & useCallback ---
function ExpensiveList({ items, filter }: { items: string[]; filter: string }) {
  // 값 메모이제이션
  const filtered = useMemo(
    () => items.filter((item) => item.includes(filter)),
    [items, filter]
  );

  // 함수 메모이제이션
  const handleClick = useCallback((id: string) => {
    console.log("Clicked:", id);
  }, []); // 의존성 없으면 항상 같은 참조

  return filtered.map((item) => (
    <MemoChild key={item} item={item} onClick={handleClick} />
  ));
}

// --- memo ---
const MemoChild = memo(
  function MemoChild({ item, onClick }: { item: string; onClick: (id: string) => void }) {
    return <div onClick={() => onClick(item)}>{item}</div>;
  },
  // Custom comparison (optional)
  (prevProps, nextProps) => prevProps.item === nextProps.item
);

// ─── Day 3: Context & Identity Hooks ───────────────────────────────────────

// --- Context ---
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// --- useId ---
function FormField({ label }: { label: string }) {
  const id = useId(); // SSR-safe 고유 ID
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}

// --- useDebugValue ---
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    (cb) => {
      window.addEventListener("online", cb);
      window.addEventListener("offline", cb);
      return () => {
        window.removeEventListener("online", cb);
        window.removeEventListener("offline", cb);
      };
    },
    () => navigator.onLine,
    () => true // SSR fallback
  );

  // DevTools에서 "OnlineStatus: Online" 으로 표시
  useDebugValue(isOnline, (online) => (online ? "Online" : "Offline"));
  return isOnline;
}

// --- useSyncExternalStore ---
// 외부 스토어 구독 (자체 상태관리 구현)
type Listener = () => void;

function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<Listener>();

  return {
    getState: () => state,
    setState: (next: T | ((prev: T) => T)) => {
      state = typeof next === "function" ? (next as Function)(state) : next;
      listeners.forEach((l) => l());
    },
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const countStore = createStore({ count: 0 });

function useStore<T, S>(store: ReturnType<typeof createStore<T>>, selector: (state: T) => S): S {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState()) // SSR snapshot
  );
}

// ─── Day 4: React 19 신규 Hooks ────────────────────────────────────────────

// --- useTransition ---
function TabContainer() {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab); // 비긴급 업데이트 → 인풋 응답성 유지
    });
  }

  return (
    <div>
      <nav style={{ opacity: isPending ? 0.7 : 1 }}>
        <button onClick={() => selectTab("home")}>Home</button>
        <button onClick={() => selectTab("heavy")}>Heavy Tab</button>
      </nav>
      {tab === "home" ? <Home /> : <HeavyComponent />}
    </div>
  );
}
function Home() { return <div>Home</div>; }
function HeavyComponent() { return <div>Heavy</div>; }

// --- useDeferredValue ---
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  // deferredQuery는 타이핑 중에 이전 값을 유지 → 인풋 끊기지 않음
  const results = useMemo(() => {
    return heavySearch(deferredQuery);
  }, [deferredQuery]);

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      {results.map((r: string) => <div key={r}>{r}</div>)}
    </div>
  );
}
function heavySearch(q: string): string[] { return []; }

// --- useOptimistic (React 19) ---
function MessageList({ messages }: { messages: { id: string; text: string }[] }) {
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      { id: "temp-" + Date.now(), text: newMessage },
    ]
  );

  async function sendMessage(formData: FormData) {
    const text = formData.get("text") as string;
    addOptimistic(text); // 즉시 UI 반영
    await submitMessage(text); // 서버 전송
  }

  return (
    <form action={sendMessage}>
      {optimisticMessages.map((m) => <div key={m.id}>{m.text}</div>)}
      <input name="text" />
      <button type="submit">Send</button>
    </form>
  );
}
async function submitMessage(text: string) {}

// --- useActionState (React 19) ---
async function createTodo(prevState: any, formData: FormData) {
  const title = formData.get("title");
  if (!title) return { error: "Title required" };
  // await db.insert(...)
  return { error: null, success: true };
}

function TodoForm() {
  const [state, formAction, isPending] = useActionState(createTodo, { error: null });

  return (
    <form action={formAction}>
      <input name="title" disabled={isPending} />
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      <button disabled={isPending}>{isPending ? "Adding..." : "Add"}</button>
    </form>
  );
}

// --- useFormStatus (React 19) ---
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

// --- use() (React 19) ---
// Promise 읽기 — Suspense와 함께 사용
function UserProfile({ userPromise }: { userPromise: Promise<{ name: string }> }) {
  const user = use(userPromise); // Suspense 경계 필요
  return <div>{user.name}</div>;
}

// Context 읽기 — 조건문 안에서도 사용 가능!
function ConditionalTheme({ showTheme }: { showTheme: boolean }) {
  if (showTheme) {
    const theme = use(ThemeContext); // useContext와 달리 조건부 사용 가능
    return <div>{theme?.theme}</div>;
  }
  return <div>No theme</div>;
}

// ─── Day 5: React Component APIs ───────────────────────────────────────────

// --- lazy & Suspense ---
const HeavyChart = lazy(() => import("./HeavyChart"));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <HeavyChart />
    </Suspense>
  );
}

// --- createPortal ---
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}

// --- flushSync ---
function ScrollToBottom() {
  const listRef = useRef<HTMLUListElement>(null);
  const [items, setItems] = useState<string[]>([]);

  function addItem() {
    // flushSync — DOM 업데이트를 동기적으로 강제
    flushSync(() => {
      setItems((prev) => [...prev, `Item ${prev.length}`]);
    });
    // 이 시점에서 DOM이 이미 업데이트됨
    listRef.current?.lastElementChild?.scrollIntoView();
  }

  return (
    <>
      <ul ref={listRef}>{items.map((item) => <li key={item}>{item}</li>)}</ul>
      <button onClick={addItem}>Add</button>
    </>
  );
}

// --- createElement, cloneElement, isValidElement ---
const el = createElement("div", { className: "box" }, "Hello");
const cloned = cloneElement(el, { id: "cloned" }); // props 병합
console.log(isValidElement(el)); // true
console.log(isValidElement("string")); // false

// --- Children utilities ---
function Sidebar({ children }: { children: React.ReactNode }) {
  const count = Children.count(children);
  const arr = Children.toArray(children); // key 정규화
  const first = Children.only(children); // 자식이 1개가 아니면 에러

  return (
    <aside>
      <p>Items: {count}</p>
      {Children.map(children, (child, index) => (
        <div className="sidebar-item" key={index}>{child}</div>
      ))}
    </aside>
  );
}

// --- Profiler ---
function App() {
  return (
    <Profiler id="App" onRender={(
      id,            // Profiler id
      phase,         // "mount" | "update" | "nested-update"
      actualDuration, // 실제 렌더링 시간 (ms)
      baseDuration,   // 메모이제이션 없을 때 예상 시간
      startTime,      // 렌더링 시작 시간
      commitTime      // 커밋 시간
    ) => {
      console.log(`${id} [${phase}]: ${actualDuration.toFixed(2)}ms`);
    }}>
      <Dashboard />
    </Profiler>
  );
}

// ─── Week 6: Advanced Patterns ─────────────────────────────────────────────

// --- ErrorBoundary ---
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught:", error, errorInfo.componentStack);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <pre>{this.state.error?.message}</pre>
          <button onClick={this.reset}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Suspense + ErrorBoundary 조합
function SafeDataDisplay() {
  return (
    <ErrorBoundary fallback={<div>Error!</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile userPromise={fetchUser()} />
      </Suspense>
    </ErrorBoundary>
  );
}
function fetchUser(): Promise<{ name: string }> {
  return Promise.resolve({ name: "John" });
}

// --- Compound Components ---
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
const TabsContext = createContext<TabsContextType | null>(null);

function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabList({ children }: { children: React.ReactNode }) {
  return <div role="tablist">{children}</div>;
};

Tabs.Tab = function Tab({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return (
    <button
      role="tab"
      aria-selected={ctx.activeTab === value}
      onClick={() => ctx.setActiveTab(value)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabPanel({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  if (ctx.activeTab !== value) return null;
  return <div role="tabpanel">{children}</div>;
};

// 사용법:
// <Tabs defaultTab="tab1">
//   <Tabs.List>
//     <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
//     <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
//   </Tabs.List>
//   <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
//   <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
// </Tabs>

// --- React 19 DOM APIs ---
// Document Metadata 호이스팅
function BlogPost({ post }: { post: { title: string } }) {
  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.title} />
      <link rel="canonical" href={`/posts/${post.title}`} />
      <article>{post.title}</article>
    </>
  );
}

// Resource preloading (React 19)
// import { preload, preinit, prefetchDNS, preconnect } from "react-dom";
// preload("/font.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
// preinit("/critical.css", { as: "style" });
// prefetchDNS("https://api.example.com");
// preconnect("https://cdn.example.com");

// --- createRoot & hydrateRoot ---
// const root = createRoot(document.getElementById("root")!);
// root.render(<App />);
// root.unmount();

// SSR hydration
// const root = hydrateRoot(document.getElementById("root")!, <App />, {
//   onRecoverableError(error) {
//     console.error("Hydration error:", error);
//   },
// });
