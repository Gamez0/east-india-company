export default function Page() {
    const input: number[] = [125, 17];
    const blinkCount: number = 25;

    // const solution = () => {
    //     while (blinkCount--) {
    //         allInOne();
    //     }
    //     console.log(input);
    //     return input;
    // };

    // const allInOne = () => {
    //     const beforeFlat = input.map((val, index) => {
    //         if (val === 0) {
    //             return 1;
    //         } else if ((String(val).length & 1) === 0) {
    //             const stringVal = String(val);
    //             const left = stringVal.slice(0, stringVal.length / 2);
    //             const right = stringVal.slice(stringVal.length / 2);
    //             return [Number(left), Number(right)];
    //         } else {
    //             return val * 2024;
    //         }
    //     });
    //     input = beforeFlat.flat();
    // };
    // solution();

    // console.log(input.length);

    const dpSolution = (initial: number[], blinkCount: number) => {
        let counter = new Map();

        // 초기세팅
        for (const num of initial) {
            counter.set(num, (counter.get(num) ?? 0) + 1);
        }

        for (let i = 0; i < blinkCount; i++) {
            const next = new Map();

            for (const [num, count] of counter.entries()) {
                if (num === 0) {
                    next.set(1, (next.get(1) ?? 0) + count);
                } else if (String(num).length % 2 === 0) {
                    const str = String(num);
                    const left = Number(str.slice(0, str.length / 2));
                    const right = Number(str.slice(str.length / 2));

                    next.set(left, (next.get(left) ?? 0) + count);
                    next.set(right, (next.get(right) ?? 0) + count);
                } else {
                    const newVal = num * 2024;
                    next.set(newVal, (next.get(newVal) ?? 0) + count);
                }
            }
            counter = next;
            console.log(counter);
        }
        let total = 0;
        for (const count of counter.values()) {
            total += count;
        }
        console.log(total);
    };

    dpSolution(input, blinkCount);

    return <div>12313</div>;
}
