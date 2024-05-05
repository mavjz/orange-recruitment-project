export const delay = (timeInSec: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, timeInSec * 1000));
