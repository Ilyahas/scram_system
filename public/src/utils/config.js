const header = () => {
  const AuthStr = 'Bearer '.concat(localStorage.JWT)
  return { headers: { Authorization: AuthStr } }
}
export default header
