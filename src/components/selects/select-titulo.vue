<template>
<div>
   <q-select
        color="secondary"
        float-label="Titulo / Formação"
        v-model="titulos.label"
        :value="titulos"
        filter
        :options="titulos"
        @input="seleciona"
      />
</div>
</template>
<script>
export default {
  created () {
    this.getTitulos()
  },
  data () {
    return {
      titulos: []
    }
  },
  methods: {
    seleciona (value) {
      this.$emit('input', value)
    },
    getTitulos () {
      let listTempTitulos = []
      this.$axios
        .get('cadastro/confeatitulo/list')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTempTitulos.push({value: el.id, label: el.descricao})
          })
        })
      this.titulos = listTempTitulos
    }
  }
}

</script>
