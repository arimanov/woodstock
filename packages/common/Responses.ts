export interface SignUpResponse {
    id: number,
    createdAt: string,
    token: string,
}

export interface LoginResponse {
    token: string,
    tokenType: string,
}

export interface Account {
    id: string,
    email: string,
    name: string,
    additionalInfo: string,
    createdAt: string,
}
