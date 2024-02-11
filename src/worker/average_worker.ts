const averageWorker = () => {

    let result: number[][] = [];
  
    const sentData = () => {
        // eslint-disable-next-line no-restricted-globals
        self.postMessage(result)
    }
  
    // eslint-disable-next-line no-restricted-globals
    self.onmessage = ({ data }) => {

        function calculateCombinations(
            marks: number[],
            maximumMark: number,
            minimumMark: number,
            missingMarks: number,
            averageTarget: number
        ): number[][] {
        
            const excess = calculateExcess(marks, averageTarget);
        
            let pointstoAdd = -excess;
        
            return findCombinations(
                averageTarget * missingMarks + pointstoAdd,
                missingMarks, 
                minimumMark, 
                maximumMark
            );
        }
        
        function calculateExcess(
            marks: number[],
            averageTarget: number,
        ): number {
        
            let excess = 0;
        
            marks.forEach((mark) => {
                if(mark > averageTarget) {
                    excess += (mark - averageTarget);
                }
                if(mark < averageTarget) {
                    excess -= (averageTarget - mark);
                }
            });
        
            return excess;
        }
        
        function findCombinations(sum: number, length: number, lowCeiling: number, highCeiling: number): number[][] {
            
            const results: number[][] = [];
            const stack: { startIndex: number; currentSum: number; combination: number[] }[] = [];
        
            stack.push({ startIndex: lowCeiling, currentSum: 0, combination: [] });
        
            while (stack.length > 0) {
                const { startIndex, currentSum, combination } = stack.pop()!;
                if (combination.length === length) {
                    if (currentSum === sum) {
                        results.push(combination.slice().sort((a, b) => a - b));
                    }
                } else {
                    const remainingSum = sum - currentSum;
                    const maxToAdd = Math.min(highCeiling, remainingSum - (length - combination.length - 1) * lowCeiling);
                    for (let i = startIndex; i <= maxToAdd; i++) {
                        const newCombination = combination.concat(i);
                        stack.push({ startIndex: i, currentSum: currentSum + i, combination: newCombination });
                    }
                }
            }
        
            return results.reverse();
        }

        result = calculateCombinations(
            data.marks, 
            data.maximum_mark, 
            data.minimum_mark, 
            data.missing_marks, 
            data.average_target,
        );
        sentData();
    }
}
  
export default averageWorker;