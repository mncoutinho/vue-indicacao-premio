<template>
  <div>
    <q-field icon="fas fa-asterisk"
             icon-color="red-8">
      <q-select filter
                filter-placeholder="Filtro"
                separator
                float-label="País"
                v-model="pais"
                :options="listUfPaises"
                @input="edita" />
    </q-field>
  </div>
</template>
<script>
import { filter } from '../../../mixins/mixin-select-utils'
export default {
  mixins: [filter],
  props: ['idPais'],
  created () {
    this.getListUfPaises()
    this.pais = this.idPais
  },
  data () {
    return {
      listUfPaises: [],
      pais: null
    }
  },
  methods: {
    edita (idPais) {
      this.$emit('atualizaPais', idPais)
    },
    getListUfPaises () {
      let listTemp = []
      this.$axios
        .get('endereco/uf-paises')
        .then(response => {
          response.data.data.forEach(function (el) {
            listTemp.push({value: el.id, label: el.descricao})
          })
          this.listUfPaises = listTemp
        })
    }
  },
  watch: {
    idPais: function (value, oldValue) {
      this.pais = value
    }
  }
}
</script>
