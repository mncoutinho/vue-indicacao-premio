export const dialog = {
  methods: {
    async dialogGeneric (titulo, message) {
      return this.$q.dialog({
        title: titulo,
        message: message,
        preventClose: true,
        ok: 'Sim',
        cancel: 'Não'
      }).then(() => { return true })
        .catch(() => { return false })
    }
  }
}
