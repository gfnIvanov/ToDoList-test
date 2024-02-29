type AuthData = {
    login: string;
    password: string;
};

const mockAuthData = {
    login: 'admin',
    password: 'admin',
} as const as AuthData;

export function authentication(authData: AuthData) {
    return (
        authData.login === mockAuthData.login &&
        authData.password === mockAuthData.password
    );
}
