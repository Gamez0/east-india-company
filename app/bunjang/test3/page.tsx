"use client";

import {
    QueryClient,
    QueryClientProvider,
    QueryErrorResetBoundary,
} from "@tanstack/react-query";
import PostsContainer from "./containers/PostsContainer";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

// client component using react query, useSuspenseQuery, form
export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary
                        fallbackRender={({ resetErrorBoundary }) => (
                            <div>
                                There was an error!{" "}
                                <button onClick={() => resetErrorBoundary()}>
                                    Try again
                                </button>
                                <pre style={{ whiteSpace: "normal" }}>
                                    error message
                                </pre>
                            </div>
                        )}
                        onReset={reset}
                    >
                        <PostsContainer />
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    );
}
