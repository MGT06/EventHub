export function getAllUsers() {
  return JSON.parse(localStorage.getItem("dataUser")) || [];
}
