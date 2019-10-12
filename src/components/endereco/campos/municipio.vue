<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red-9">
      <q-select filter
                filter-placeholder="Filtro"
                separator
                float-label="Município"
                :value="value.localidade.id"
                :options="listMunicipios"
                @input="atualizaMunicipio" />
    </q-field>
  </div>
</template>

<script>
export default {
  props: ['value'],
  created () {
    if (this.value.uf) {
      this.buscaMunicipio(this.value.uf)
    }
  },
  data () {
    return {
      listMunicipios: []
    }
  },
  methods: {
    buscaMunicipio (value) {
      if (value.id && value.id !== '') {
        let listTemp = []
        this.$axios
          .get('endereco/' + value.id + '/municipio')
          .then(response => {
            response.data.data.forEach(function (el) {
              listTemp.push({value: el.id, label: el.descricao})
            })
          })
        this.listMunicipios = listTemp
      }
    },
    atualizaMunicipio (val) {
      this.value.localidade = { id: val }
      this.$emit('input', this.value)
    }
  },
  watch: {
    value: function (value, oldValue) {
      this.buscaMunicipio(value.uf)
    }
  }
}
</script>
