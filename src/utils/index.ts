export const findSolanaAddress = (input: string): string[] => {
    const regex = /\b[A-HJ-NP-Za-km-z1-9]{32,44}\b/g;
    return input.match(regex) || [];
};