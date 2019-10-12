export const notify = {
  methods: {
    mostrarMensagem (mensagem, tipo, tempo) {
      this.$q.notify({ message: mensagem, type: tipo, position: 'center', timeout: tempo })
    }
  }
}
