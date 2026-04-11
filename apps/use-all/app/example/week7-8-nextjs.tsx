// ============================================================================
// Week 7-8: Next.js App Router & Advanced Features — 코드 예제 모음
// ============================================================================
// 파일 구조와 함께 보여드립니다. 각 코드 블록의 주석에 파일 경로가 있습니다.

// ─── Week 7 Day 1: App Router 기본 구조 ────────────────────────────────────

// --- app/layout.tsx (루트 레이아웃) ---
// 모든 페이지에 적용되는 레이아웃. <html>, <body> 필수.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

// --- app/page.tsx (홈 페이지) ---
// 해당 라우트의 UI. default export 필수.
export default function HomePage() {
  return <h1>Home</h1>;
}

// --- app/template.tsx ---
// layout과 비슷하지만 탐색 시 새 인스턴스 생성 (상태 리셋)
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="template-wrapper">{children}</div>;
}

// --- app/loading.tsx ---
// 페이지 로딩 중 자동 Suspense fallback
export default function Loading() {
  return <div className="skeleton">Loading...</div>;
}

// --- app/error.tsx ---
// "use client" 필수
("use client");
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// --- app/not-found.tsx ---
export default function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

// --- app/global-error.tsx ---
// 루트 레이아웃의 에러를 잡음. "use client" 필수. <html>, <body> 포함해야 함.
("use client");
export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Global Error: {error.message}</h2>
        <button onClick={reset}>Reset</button>
      </body>
    </html>
  );
}

// --- app/api/hello/route.ts (Route Handler) ---
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  return NextResponse.json({ message: "Hello", query });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ updated: body });
}

export async function DELETE(request: NextRequest) {
  return new NextResponse(null, { status: 204 });
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json({ patched: true });
}

// HEAD, OPTIONS도 지원

// ─── Week 7 Day 2: 라우팅 심화 ─────────────────────────────────────────────

// --- Dynamic Routes ---

// app/users/[id]/page.tsx — 단일 동적 세그먼트
export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>; // Next.js 15+ 에서 params는 Promise
}) {
  const { id } = await params;
  return <div>User: {id}</div>;
}

// app/docs/[...slug]/page.tsx — Catch-all
export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  // /docs/a/b/c → slug = ["a", "b", "c"]
  return <div>Docs: {slug.join("/")}</div>;
}

// app/shop/[[...slug]]/page.tsx — Optional Catch-all
// /shop → slug = undefined
// /shop/a/b → slug = ["a", "b"]

// --- Route Groups: app/(marketing)/about/page.tsx ---
// (marketing)은 URL에 포함되지 않음. 레이아웃 분리용.

// --- Parallel Routes: app/@modal/login/page.tsx ---
// app/layout.tsx에서 { children, modal } 슬롯으로 받음
export default function LayoutWithModal({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

// --- app/@modal/default.tsx ---
// Parallel Route의 기본 렌더링 (슬롯이 매치되지 않을 때)
export default function Default() {
  return null;
}

// --- Intercepting Routes ---
// app/feed/@modal/(.)photo/[id]/page.tsx
// (.) — 같은 레벨 인터셉트
// (..) — 한 레벨 위
// (..)(..) — 두 레벨 위
// (...) — 루트에서

// --- generateStaticParams ---
export async function generateStaticParams() {
  const posts = await fetch("/api/posts").then((r) => r.json());
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// --- Client Hooks ---
("use client");
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { redirect, permanentRedirect, notFound } from "next/navigation";

function NavigationDemo() {
  const router = useRouter();
  const pathname = usePathname(); // "/users/123"
  const searchParams = useSearchParams(); // URLSearchParams
  const params = useParams(); // { id: "123" }
  const segment = useSelectedLayoutSegment(); // "users" (현재 레이아웃의 활성 자식)
  const segments = useSelectedLayoutSegments(); // ["users", "123"]

  return (
    <div>
      <p>Path: {pathname}</p>
      <p>Query: {searchParams.get("q")}</p>
      <button onClick={() => router.push("/home")}>Go Home</button>
      <button onClick={() => router.replace("/login")}>Replace to Login</button>
      <button onClick={() => router.refresh()}>Refresh</button>
      <button onClick={() => router.back()}>Back</button>
      <button onClick={() => router.forward()}>Forward</button>
      <button onClick={() => router.prefetch("/heavy-page")}>Prefetch</button>
    </div>
  );
}

// Server Component에서의 리디렉트
async function CheckAuth() {
  const session = await getSession();
  if (!session) redirect("/login"); // 307
  // permanentRedirect("/new-url"); // 308
  // notFound(); // 404
}
async function getSession() { return null; }

// ─── Week 7 Day 3: Data Fetching & Caching ─────────────────────────────────

// --- Server Component에서 fetch ---
async function PostList() {
  // 기본: 자동 캐시 (static)
  const res1 = await fetch("https://api.example.com/posts");

  // 캐시 비활성화 (항상 fresh)
  const res2 = await fetch("https://api.example.com/posts", {
    cache: "no-store",
  });

  // 시간 기반 재검증 (ISR)
  const res3 = await fetch("https://api.example.com/posts", {
    next: { revalidate: 60 }, // 60초마다 재검증
  });

  // 태그 기반 캐시
  const res4 = await fetch("https://api.example.com/posts", {
    next: { tags: ["posts"] }, // 태그로 온디맨드 재검증 가능
  });

  const posts = await res1.json();
  return <div>{posts.map((p: any) => <p key={p.id}>{p.title}</p>)}</div>;
}

// --- React cache() — 요청 단위 메모이제이션 ---
import { cache } from "react";

const getUser = cache(async (id: string) => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
});

// 같은 요청 내에서 여러 번 호출해도 한 번만 fetch
async function UserPage2() {
  const user = await getUser("1"); // fetch 1회
  return <UserProfile2 userId="1" />;
}
async function UserProfile2({ userId }: { userId: string }) {
  const user = await getUser(userId); // 캐시된 결과 반환
  return <div>{user.name}</div>;
}

// --- unstable_cache (Next.js 데이터 캐시) ---
import { unstable_cache } from "next/cache";

const getCachedPosts = unstable_cache(
  async () => {
    const res = await fetch("https://api.example.com/posts");
    return res.json();
  },
  ["posts"], // 캐시 키
  { revalidate: 3600, tags: ["posts"] } // 1시간 캐시, 태그
);

// --- revalidateTag / revalidatePath ---
import { revalidateTag, revalidatePath } from "next/cache";

// app/api/revalidate/route.ts
export async function POST_revalidate(req: NextRequest) {
  revalidateTag("posts"); // "posts" 태그가 붙은 모든 캐시 무효화
  revalidatePath("/blog"); // /blog 페이지 재생성
  revalidatePath("/blog", "layout"); // 레이아웃 포함
  return NextResponse.json({ revalidated: true });
}

// --- cookies & headers ---
import { cookies, headers } from "next/headers";

async function ServerComponent() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  cookieStore.set("theme", "dark", { httpOnly: true, maxAge: 86400 });
  cookieStore.delete("old-cookie");

  const headersList = await headers();
  const userAgent = headersList.get("user-agent");
  const contentType = headersList.get("content-type");
}

// --- draftMode ---
import { draftMode } from "next/headers";

async function DraftPage() {
  const draft = await draftMode();
  if (draft.isEnabled) {
    // 미발행 콘텐츠 표시 (CMS 프리뷰)
  }
}

// ─── Week 7 Day 4: Server Actions ──────────────────────────────────────────

// --- 서버 액션 정의 (인라인) ---
async function TodoPage() {
  async function addTodo(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    // await db.insert({ title });
    revalidatePath("/todos");
  }

  return (
    <form action={addTodo}>
      <input name="title" required />
      <button type="submit">Add</button>
    </form>
  );
}

// --- 서버 액션 정의 (별도 파일) ---
// app/actions.ts
("use server");

interface ActionState {
  error?: string;
  success?: boolean;
}

export async function createPost(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // 유효성 검증
  if (!title || title.length < 3) {
    return { error: "Title must be at least 3 characters" };
  }

  try {
    // await db.post.create({ data: { title, content } });
    revalidatePath("/posts");
    redirect("/posts");
  } catch (e) {
    return { error: "Failed to create post" };
  }

  return { success: true };
}

// 파일 업로드
export async function uploadFile(formData: FormData) {
  "use server";
  const file = formData.get("file") as File;
  if (!file) return { error: "No file" };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // await writeFile(`/uploads/${file.name}`, buffer);

  return { success: true, filename: file.name };
}

// --- useActionState + useFormStatus 클라이언트 ---
("use client");

function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(createPost, {});

  return (
    <form action={formAction}>
      <input name="title" disabled={isPending} />
      <textarea name="content" disabled={isPending} />
      {state.error && <p className="error">{state.error}</p>}
      <SubmitBtn />
    </form>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus(); // 가장 가까운 form의 상태
  return <button disabled={pending}>{pending ? "Creating..." : "Create"}</button>;
}

// Progressive Enhancement — JS 없이도 form 작동!

// ─── Week 7 Day 5: Streaming & Metadata ────────────────────────────────────

// --- 컴포넌트 단위 Suspense (loading.tsx 대신) ---
import { Suspense } from "react";

async function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* 각 섹션이 독립적으로 스트리밍 */}
      <Suspense fallback={<div>Loading stats...</div>}>
        <Stats />
      </Suspense>
      <Suspense fallback={<div>Loading chart...</div>}>
        <Chart />
      </Suspense>
      <Suspense fallback={<div>Loading activity...</div>}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}

async function Stats() {
  const data = await fetch("/api/stats", { next: { revalidate: 60 } });
  return <div>{/* stats */}</div>;
}
async function Chart() { return <div>Chart</div>; }
async function RecentActivity() { return <div>Activity</div>; }

// --- 병렬 데이터 fetching ---
async function ParallelFetchPage() {
  // ✅ 병렬 — Promise.all 사용
  const [users, posts] = await Promise.all([
    fetch("/api/users").then((r) => r.json()),
    fetch("/api/posts").then((r) => r.json()),
  ]);

  return <div>{/* render */}</div>;
}

// --- generateMetadata ---
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetch(`/api/posts/${slug}`).then((r) => r.json());
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image, ...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
    },
  };
}

// --- Static Metadata ---
export const metadata: Metadata = {
  title: { default: "My App", template: "%s | My App" },
  description: "My awesome app",
  metadataBase: new URL("https://example.com"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

// ─── Week 8 Day 1: Middleware & Config ──────────────────────────────────────

// --- middleware.ts (프로젝트 루트) ---
export function middleware(request: NextRequest) {
  // 리디렉트
  if (request.nextUrl.pathname === "/old-page") {
    return NextResponse.redirect(new URL("/new-page", request.url));
  }

  // 리라이트 (URL은 유지, 다른 페이지 렌더)
  if (request.nextUrl.pathname.startsWith("/proxy")) {
    return NextResponse.rewrite(new URL("/api/proxy", request.url));
  }

  // 헤더 추가
  const response = NextResponse.next();
  response.headers.set("x-custom-header", "my-value");

  // 쿠키 설정
  response.cookies.set("visited", "true", { maxAge: 86400 });

  // Request 정보
  const ip = request.ip;
  const geo = request.geo; // { city, country, region, latitude, longitude }
  const ua = request.headers.get("user-agent");

  return response;
}

// 경로 매칭 설정
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // 정적 파일 제외
    "/dashboard/:path*", // 특정 경로
  ],
};

// --- next.config.js ---
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 리디렉트
  async redirects() {
    return [
      {
        source: "/old/:slug",
        destination: "/new/:slug",
        permanent: true, // 308
      },
    ];
  },

  // 리라이트
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://backend.example.com/:path*",
      },
    ];
  },

  // 커스텀 헤더
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },

  // 이미지 최적화
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.example.com", pathname: "/images/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // 실험적 기능
  experimental: {
    ppr: true, // Partial Prerendering
    // typedRoutes: true,
  },

  // 빌드 출력
  output: "standalone", // Docker 배포용
};

// ─── Week 8 Day 2: 최적화 컴포넌트 ─────────────────────────────────────────

// --- next/image ---
import Image from "next/image";

function ImageExamples() {
  return (
    <>
      {/* 기본 사용 */}
      <Image src="/hero.jpg" alt="Hero" width={1200} height={630} priority />

      {/* Fill 모드 — 부모 크기에 맞춤 */}
      <div style={{ position: "relative", width: "100%", height: 400 }}>
        <Image
          src="/bg.jpg"
          alt="Background"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Blur placeholder */}
      <Image
        src="/photo.jpg"
        alt="Photo"
        width={800}
        height={600}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/..."
      />

      {/* 외부 이미지 */}
      <Image
        src="https://cdn.example.com/image.png"
        alt="External"
        width={400}
        height={300}
        quality={85}
        loading="lazy" // default
      />
    </>
  );
}

// --- next/font ---
import { Inter, Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto",
});

const myFont = localFont({
  src: [
    { path: "./fonts/MyFont-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/MyFont-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-custom",
});

// layout.tsx에서
function FontLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${notoSansKR.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// --- next/link ---
import Link from "next/link";

function NavLinks() {
  return (
    <nav>
      <Link href="/about">About</Link>
      <Link href="/blog" prefetch={false}>Blog (no prefetch)</Link>
      <Link href="/dashboard" replace>Dashboard (replace history)</Link>
      <Link href="/section" scroll={false}>Section (no scroll reset)</Link>
      <Link href={{ pathname: "/users", query: { sort: "name" } }}>Users</Link>
    </nav>
  );
}

// --- next/script ---
import Script from "next/script";

function ScriptExamples() {
  return (
    <>
      {/* 페이지 인터랙티브 전 로드 */}
      <Script src="/critical.js" strategy="beforeInteractive" />

      {/* 페이지 인터랙티브 후 로드 (기본값) */}
      <Script src="https://analytics.example.com/script.js" strategy="afterInteractive" />

      {/* 브라우저 유휴 시간에 로드 */}
      <Script src="/non-critical.js" strategy="lazyOnload" />

      {/* 인라인 스크립트 */}
      <Script id="inline-script" strategy="afterInteractive">
        {`console.log('Hello from inline script')`}
      </Script>

      {/* 이벤트 핸들러 */}
      <Script
        src="https://maps.googleapis.com/maps/api/js"
        onLoad={() => console.log("Maps loaded")}
        onError={(e) => console.error("Script error:", e)}
      />
    </>
  );
}

// --- next/dynamic ---
import dynamic from "next/dynamic";

// SSR 비활성화
const NoSSRComponent = dynamic(() => import("./HeavyEditor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

// Named export
const DynamicChart = dynamic(
  () => import("./Charts").then((mod) => mod.BarChart),
  { loading: () => <p>Loading chart...</p> }
);

// ─── Week 8 Day 3: Metadata & SEO ──────────────────────────────────────────

// --- opengraph-image.tsx ---
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        width: "100%", height: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white", fontSize: 60, fontWeight: "bold",
      }}>
        {params.slug}
      </div>
    ),
    { ...size }
  );
}

// --- sitemap.ts ---
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetch("/api/posts").then((r) => r.json());
  return [
    { url: "https://example.com", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ...posts.map((post: any) => ({
      url: `https://example.com/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

// --- robots.ts ---
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "Googlebot", allow: "/" },
    ],
    sitemap: "https://example.com/sitemap.xml",
  };
}

// --- manifest.ts ---
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "My App",
    short_name: "App",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

// --- JSON-LD ---
function BlogPostWithJsonLd({ post }: { post: any }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>{post.title}</article>
    </>
  );
}

// ─── Week 8 Day 4: Route Handlers & Edge ────────────────────────────────────

// --- Route Segment Config ---
export const dynamic = "force-dynamic"; // "auto" | "force-dynamic" | "error" | "force-static"
export const revalidate = 60; // false | 0 | number
export const runtime = "nodejs"; // "nodejs" | "edge"
export const fetchCache = "auto"; // "auto" | "default-cache" | "only-cache" | "force-cache" | etc.

// --- Streaming Response ---
export async function GET_stream() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        controller.enqueue(encoder.encode(`data: ${i}\n\n`));
        await new Promise((r) => setTimeout(r, 100));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// --- Edge Runtime Route ---
export const runtime_edge = "edge";

export async function GET_edge(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // Edge에서는 Node.js API 사용 불가 (fs, path 등)
  return NextResponse.json({ edge: true });
}

// --- CORS ---
export async function GET_cors(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const allowed = ["https://example.com", "https://app.example.com"];

  const response = NextResponse.json({ data: "hello" });

  if (allowed.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  return response;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// --- Webhook Pattern ---
export async function POST_webhook(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-webhook-signature");

  // 서명 검증
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(process.env.WEBHOOK_SECRET!),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    Buffer.from(signature!, "hex"),
    new TextEncoder().encode(body)
  );

  if (!isValid) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

  const payload = JSON.parse(body);
  // process webhook...

  return NextResponse.json({ received: true });
}

// ─── Week 8 Day 5: Build & Deploy ──────────────────────────────────────────

// --- instrumentation.ts (서버 초기화) ---
export async function register() {
  // 서버 시작 시 한 번 실행
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Node.js 전용 초기화
    console.log("Initializing server...");
    // await initializeDB();
    // await warmupCache();
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge 전용 초기화
  }
}

// --- Environment Variables ---
// .env.local
// DATABASE_URL=postgres://...     ← 서버 전용 (클라이언트 접근 불가)
// NEXT_PUBLIC_API_URL=https://... ← 클라이언트에서도 접근 가능

// 서버에서
// process.env.DATABASE_URL
// 클라이언트에서
// process.env.NEXT_PUBLIC_API_URL

// --- ISR (Incremental Static Regeneration) ---
// page.tsx
export const revalidate_isr = 60; // 60초마다 재생성

// 또는 fetch 단위
async function ISRPage() {
  const data = await fetch("https://api.example.com/data", {
    next: { revalidate: 3600 }, // 1시간
  });
  return <div>{/* ... */}</div>;
}

// On-demand ISR
// app/api/revalidate/route.ts
export async function GET_ondemand(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  revalidatePath("/blog");
  revalidateTag("posts");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

// --- PPR (Partial Prerendering) — 실험적 ---
// next.config.js: experimental: { ppr: true }
// 정적 셸 + 동적 구멍(Suspense)을 하나의 응답으로

// --- output: 'standalone' ---
// Dockerfile 예시:
/*
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
*/
