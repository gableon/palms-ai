// import {parseFileToBase64} from "@/utils/parseFileToBase64";

export async function fetchPrice({ message }: { message: string }) {
    try {

        // todo: only for testing - remove later
        return {
            ok: true,
            error: null,
            message: `
            Token Name: Solana (or other token name fetched via blockchain or an API)
Token Symbol: SOL (or the relevant symbol)
Contract Address: HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC
Token Price: $20.15 (real-time price or fetched data)
Market Cap: $7.8 billion (if available)
Circulating Supply: 500 million (if available)
Recent Activity:
Latest transaction: 12 mins ago
Total transactions in the past 24 hours: 1,203
Additional Information:
“This token is frequently traded and supports Solana's ecosystem.”
            `
        }
        const url = process.env.NEXT_PUBLIC_API_URL;
        if (!url || url === '') {
            console.error('API URL is not defined')
            return
        }

        const URI = `${url}/fetch-price`

        // todo: add formData to handle image and audios?
        // const formData = new FormData();
        // formData.append('message', message.message);
        // formData.append('address', message.address);

        // todo: handle messages in array

        // Optional fields
        // images
        // audio
        // etc

        const response = await fetch(URI, {
            method: 'POST',
            headers: {
                // todo: add proper auth
                'Authorization': 'Bearer 123456',
                // 'tier': '19234849'
            },
            body: JSON.stringify(message),
            // body: formData,
        });

        if (!response.ok) {
            const body = await response.json();

            return {
                ok: response.ok,
                error: body.error,
                message: body.message,
            }
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending message to Lambda:', error);
        return { message: "Something odd happened to us right now... Sorry for the trouble - please retry" }
    }
}
