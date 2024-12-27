import {findSolanaAddress} from "@/utils";

export async function fetchToken({ message }: { message: string }) {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        if (!url || url === '') {
            console.error('API URL is not defined')
            return {ok: false, message: "dApp is facing unpredicted issues"}
        }

        let tokenId;
        if (message.startsWith("Featured Token ")) {
            tokenId = message.replace(" ", "-")
        } else {
            tokenId = findSolanaAddress(message);
        }

        const URI = `${url}/tokenInfo?token_id=${tokenId}`

        // todo: add formData to handle image and audios?
        // const formData = new FormData();
        // formData.append('message', message.message);
        // formData.append('address', message.address);
        // todo: handle messages in array

        const response = await fetch(URI, {
            method: 'POST',
            headers: {
                // todo: add proper auth
                'Authorization': 'Bearer 123456',
            },
            body: JSON.stringify(message),
            // body: formData,
        });

        // Parse the JSON response
        const responseData = await response.json();
        console.log("response data json", responseData);

        return {
            ok: response.ok,
            text: responseData.text || "InVaL1D R3Sp0nS3!¡",
            audioB64: responseData.audio_base64 || "",
            audioId: responseData.audio_id || "",
        };
    } catch (error) {
        console.error('Error sending message to Lambda:', error);
        return { ok: false, text: "Something odd happened to us right now... Sorry for the trouble - please retry" }
    }
}
