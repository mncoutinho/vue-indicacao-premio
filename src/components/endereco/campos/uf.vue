<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red-9">
      <q-select filter
                filter-placeholder="Filtro"
                separator
                float-label="UF"
                :value="value.uf.id"
                :options="listUf"
                @input="edita" />
    </q-field>
  </div>
</template>

<script>
import listUfs from '../../../assets/listUF.js'
export default {
  props: ['value'],
  data () {
    return {
      listUf: listUfs
    }
  },
  methods: {
    edita (val) {
      this.value.uf = { id: val, descricao: this.filterGetDescricao(val, listUfs) }
      this.value.localidade = { id: '' }
      this.$emit('input', this.value)
      this.$emit('atualizou', this.value)
    },
    filterGetDescricao (id, lista) {
      let elemento = lista.filter(function (el) { return el.value === id })
      if (elemento[0]) {
        return elemento[0].descricao
      } else {
        return ''
      }
    }
  }
}
</script>
