<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red-9">
      <q-select filter
                filter-placeholder="Filtro"
                separator
                float-label="Logradouro"
                :value="value !== null ? value.id : null"
                :options="listLogradouros"
                @input="edita" />
    </q-field>
  </div>
</template>
<script>
import { filter } from '../../../mixins/mixin-select-utils'
export default {
  mixins: [filter],
  props: ['value'],
  data () {
    return {
      listLogradouros: []
    }
  },
  created () {
    this.getTipoLogradouro()
  },
  methods: {
    edita (val) {
      this.$emit('input', { id: val })
    },
    getTipoLogradouro () {
      this.$axios
        .get('endereco/tipo-logradouro')
        .then(response => {
          this.listLogradouros = this.listaSelects(response.data.data)
        })
    }
  }
}
</script>
