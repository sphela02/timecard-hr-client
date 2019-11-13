export interface OidcUserProfile {
    sub: string;
    email: string;
}

export interface OidcUserSession {
    id_token: string;
    access_token: string;
    token_type: string;
    scope: string;
    expired: boolean;
    profile: OidcUserProfile;
    expires_at: number;
}
