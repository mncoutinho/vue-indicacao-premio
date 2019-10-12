
export const filter = {
  methods: {
    filterGetDescricao (id, lista) {
      let descricao = lista.filter(function (el) { return el.value === id })
      if (descricao[0]) {
        return descricao[0].label
      } else {
        return ''
      }
    },
    listaSelects (lista) {
      let listTemp = []
      lista.forEach(function (el) {
        listTemp.push({value: el.id, label: el.descricao})
      })
      return listTemp
    }
  }
}
