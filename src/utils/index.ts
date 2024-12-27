export const findSolanaAddress = (input: string): string[] => {
    const regex = /\b[A-HJ-NP-Za-km-z1-9]{32,44}\b/g;
    return input.match(regex) || [];
};

export const playBase64Audio = (base64: string) => {
    try {
        if (!base64) return;
        // Convert Base64 to a binary string
        const binaryString = atob(base64);

        // Convert binary string to a Uint8Array
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Create a Blob with the correct MIME type
        const blob = new Blob([bytes], { type: 'audio/wav' });

        // Generate a URL for the Blob
        const audioUrl = URL.createObjectURL(blob);

        // Create an Audio object and play it
        const audio = new Audio(audioUrl);
        audio.play();
    } catch (error) {
        console.error("Error playing Base64 audio:", error);
    }
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
