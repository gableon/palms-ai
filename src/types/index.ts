// TODO: TO BETTER DEFINE THIS

export interface Message {
    id: string;
    text: string;
    author: Author.CHAT | Author.USER
    image?: string // base64
    image_description?: string | undefined // revised prompt
}

export interface FeaturedToken {
    name: string;
    slug?: string;
    contractAddress: string;
    image?: string;
    price: number | undefined;
    marketCap: number | undefined;
}

export interface ChatContext {
    content: string,
    role: Role.ASSISTANT | Role.USER,
}

export interface MessageRequest {
    message: string,
    address: string,
    imageDescription?: string,
    partner?: string,
    file?: File | null,
    chat: ChatContext[],
}

export enum Role {
    ASSISTANT = 'assistant',
    USER = 'user',
}

export enum Author {
    CHAT = "CHAT",
    USER = "USER",
}


