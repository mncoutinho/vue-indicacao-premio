import listMenu from 'assets/menu'
export const setUser = (state, value) => {
  state.user = value
  state.listaMenu = Object.assign([], listMenu)
  if (state.user.perfil !== undefined && state.user.perfil !== null) {
    if (state.user.perfil.perfil !== 'Admin Prêmio CREA-RJ' && state.user.perfil.perfil !== 'Gestor Cadastro (PERFIL ADMIN)') {
      state.listaMenu.splice(1, 1)
    }
  } else {
    state.listaMenu.splice(1, 1)
  }
}

export const offUser = (state, value) => {
  localStorage.removeItem('TOKEN')
  state.user = null
}
