# East India Company — 프로젝트 컨텍스트

## 모노레포 구조

```
east-india-company/
├── apps/
│   ├── bithumb/      # 암호화폐 거래소 대시보드 (port 3000)
│   ├── bunjang/      # 중고거래 플랫폼 (port 3001)
│   ├── canvas/       # 캔버스 애플리케이션 (port 3002)
│   ├── coding-test/  # 코딩테스트 예제
│   └── use-all/      # Next.js 베이스 앱
├── packages/
│   └── ui/           # 공유 UI 컴포넌트 (@repo/ui) — Radix UI 기반
├── package.json      # 루트: 공통 의존성 + turbo 스크립트
├── turbo.json        # Turbo 파이프라인 정의
└── pnpm-workspace.yaml
```

## 패키지 매니저

**pnpm 9.3.0**

- 새 패키지 설치: `pnpm add <pkg> --filter <app>`
- 전체 의존성 설치: `pnpm install`

## 공통 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 모든 앱 동시 실행 |
| `pnpm dev:bithumb` | bithumb만 실행 |
| `pnpm dev:bunjang` | bunjang만 실행 |
| `pnpm dev:canvas` | canvas만 실행 |
| `pnpm dev:use-all` | use-all만 실행 |
| `pnpm dev:coding-test` | coding-test만 실행 |
| `pnpm build` | 전체 빌드 (Turbo 캐시 활용) |
| `pnpm lint` | 전체 린트 |

## 기술 스택

- **프레임워크**: Next.js 16 + React 19 + TypeScript
- **스타일**: TailwindCSS 4
- **UI 라이브러리**: Radix UI, `@repo/ui` (공유 컴포넌트)
- **상태/비동기**: TanStack Query v5
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React
- **토스트**: Sonner
- **빌드**: Turbo

## 공통 설정 위치

- `tsconfig`: 각 앱 루트에 위치, 루트 공통 설정 상속
- `tailwind.config`: 각 앱 루트
- `eslint.config`: 각 앱 루트 (`eslint-config-next` 기반)
- 공유 UI: `packages/ui/` — `@repo/ui`로 import

## 스터디 레포 규칙

1. **각 앱은 독립적으로 실행 가능해야 한다** — 다른 앱에 의존하면 안 됨
2. **공통 컴포넌트는 `packages/ui`에** — 앱 간 중복 코드는 여기로 추출
3. **앱별 필터 명령어로 개발** — `pnpm dev` 대신 `pnpm dev:<앱이름>` 사용 권장
4. **루트 `package.json`의 의존성은 모든 앱이 공유** — 앱별 추가 의존성만 각 앱 `package.json`에 선언
