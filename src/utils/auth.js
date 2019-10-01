const TOKEN_KEY = 'msm-token'
const USER_KEY = 'msm-user'

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token)
}

export function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY))
}

export function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}