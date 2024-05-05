export const mean = (array: number[]): number => {
    const numberOfElements = array.length;
    const sum = array.reduce((partOfTheSum, number) => (partOfTheSum = partOfTheSum + number), 0);
    return sum / numberOfElements;
};
