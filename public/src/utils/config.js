export const header = () => {
    let AuthStr = 'Bearer '.concat(localStorage.JWT);
    let formString = AuthStr;
    return {headers: { Authorization: AuthStr } }
}