export const getUser = (state) => {
  return state.user
}

export const isAuthenticated = (state) => {
  return !!state.token
}

export const authStatus = (state) => {
  return state.status
}

export const getMenu = (state) => {
  return state.listaMenu
}
export const getUserRegistro = (state) => {
  if (state.user) {
    return state.user.registro
  }
}
