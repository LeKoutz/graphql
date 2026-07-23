const SIGNIN_ENDPOINT = 'https://platform.zone01.gr/api/auth/signin'

export async function requestJWT(identifier, password) {
    const credentials = btoa(`${identifier}:${password}`);
    const response = await fetch(SIGNIN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`
        }
    })
    if (!response.ok) {
        throw new Error('Invalid credentials')
    }
    const token = await response.json()
    return token
}

export function saveJWT(token) {
    sessionStorage.setItem('jwt', token);
}

export function getJWT() {
    return sessionStorage.getItem('jwt');
}

export function clearJWT() {
    sessionStorage.removeItem('jwt');
}

