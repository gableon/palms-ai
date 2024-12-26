// import {parseFileToBase64} from "@/utils/parseFileToBase64";

import {findSolanaAddress} from "@/utils";

export async function fetchToken({ message }: { message: string }) {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        if (!url || url === '') {
            console.error('API URL is not defined')
            return {ok: false, message: "dApp is facing unpredicted issues"}
        }

        const tokenId = findSolanaAddress(message);

        const URI = `${url}/tokenInfo?token_id=${tokenId}`

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

        return {
            ok: response.ok,
            message: await response.text()
        }
    } catch (error) {
        console.error('Error sending message to Lambda:', error);
        return { ok: false, message: "Something odd happened to us right now... Sorry for the trouble - please retry" }
    }
}
