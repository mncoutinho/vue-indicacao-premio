<template>
      <q-modal v-model="opened" maximized :content-css="{padding: '50px'}">
        <div class="layout-padding">
            <div class="row justify-end">
                <q-btn dense  flat outline icon="clear" @click="toggle()"  color="dark" label="Fechar" />
            </div>
        </div>
    </q-modal>
</template>
<script>
export default {
  data () {
    return {
      opened: false,
      evento: {}
    }
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    },
    async salvar () {
      this.$axios
        .get('cadastro/instituicao-ensino/premio-tct/participantes/' + 44)
        .then(response => {
        })
    }
  }
}
</script>
