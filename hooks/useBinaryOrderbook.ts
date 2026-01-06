import { useEffect, useRef, useState } from "react";

export function useBinaryOrderbook(initial: Level[]) {
    const bufRef = useRef<Level[]>(initial);
    const [levels, setLevels] = useState<Level[]>(initial);

    useEffect(() => {
        const sock = createMockBinaryOrderbookStream(initial, (ev) => {
            bufRef.current = decodeOrderbookDelta(ev.data);
        });

        // 100ms에 한 번만 React state 반영 (리렌더 폭발 방지)
        const ui = setInterval(() => setLevels(bufRef.current), 100);

        return () => {
            sock.close();
            clearInterval(ui);
        };
    }, [initial]);

    return levels;
}

const MIN_Q = 0.0005;
const MAX_Q = 0.05;

function randomQ() {
    return Number((Math.random() * (MAX_Q - MIN_Q) + MIN_Q).toFixed(4));
}

export function createMockBinaryOrderbookStream(
    initial: Level[],
    onmessage: (ev: { data: ArrayBuffer }) => void,
    intervalMs = 80,
) {
    // 내부 상태(호가창)
    let book = initial.map((x) => ({ ...x }));

    const id = setInterval(() => {
        // 1~3개 레벨만 살짝 변경
        const k = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < k; i++) {
            const idx = Math.floor(Math.random() * book.length);
            const cur = book[idx];

            // q를 랜덤 워크 + 가끔 0
            if (Math.random() < 0.08) {
                cur.q = 0;
            } else if (cur.q === 0) {
                if (Math.random() < 0.35) {
                    cur.q = randomQ();
                }
            } else {
                const next = cur.q * (1 + (Math.random() - 0.5) * 0.6);
                cur.q = Math.max(0, Number(next.toFixed(4)));
            }
        }

        // 정렬(예: price 기준 내림차순) - 호가창 느낌
        book = book.slice().sort((a, b) => b.p - a.p);

        onmessage({ data: encodeOrderbookDelta(book) });
    }, intervalMs);

    return { close: () => clearInterval(id) };
}

export type Level = { p: number; q: number };

export function encodeOrderbookDelta(levels: Level[]): ArrayBuffer {
    const n = Math.min(255, levels.length);
    const payloadLen = 1 + 1 + n * 8; // type + count + (p,q)
    const buf = new ArrayBuffer(4 + payloadLen);
    const dv = new DataView(buf);

    // length prefix (payload length)
    dv.setUint32(0, payloadLen, false); // BE
    dv.setUint8(4, 1); // type=1
    dv.setUint8(5, n); // count

    let off = 6;
    for (let i = 0; i < n; i++) {
        dv.setUint32(off, levels[i].p, true); // LE
        dv.setFloat32(off + 4, levels[i].q, true); // LE
        off += 8;
    }
    return buf;
}

export function decodeOrderbookDelta(buf: ArrayBuffer): Level[] {
    const dv = new DataView(buf);
    const payloadLen = dv.getUint32(0, false);
    if (4 + payloadLen !== buf.byteLength) return [];

    const type = dv.getUint8(4);
    if (type !== 1) return [];

    const n = dv.getUint8(5);
    const out: Level[] = [];

    let off = 6;
    for (let i = 0; i < n; i++) {
        const p = dv.getUint32(off, true);
        const q = dv.getFloat32(off + 4, true);
        out.push({ p, q });
        off += 8;
    }
    return out;
}

export function createInitialOrderbook(
    midPrice = 129580000,
    levels = 10,
    step = 5000,
): { p: number; q: number }[] {
    return Array.from({ length: levels }, (_, i) => ({
        p: midPrice + (levels / 2 - i) * step,
        q: Number((Math.random() * 0.03 + 0.001).toFixed(4)),
    })).sort((a, b) => b.p - a.p);
}
