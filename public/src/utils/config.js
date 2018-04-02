const AuthStr = 'Bearer '.concat(localStorage.JWT);

export const header = () => {
    return {headers: { Authorization: AuthStr } }
}