<template>
  <div>
    <div v-show="!this.nomeCampusSelecionado">
      <q-select
        color="secondary"
        filter
        filter-placeholder="Filtro"
        separator
        :error="v.$error"
        float-label="CAMPUS"
        :value="value"
        :options="campus"
        @input="$emit('input', $event)"
      />
    </div>
    <div v-show="this.nomeCampusSelecionado">
      <q-input v-model="nomeCampusSelecionado" disable float-label="Campus"/>
    </div>
</div>
</template>
<script>
export default {
  props: ['v', 'value', 'idInstituicao', 'nomeCampusSelecionado', 'tipo'],
  created () {
    this.getCampus()
  },
  data () {
    return {
      campus: []
    }
  },
  methods: {
    getCampus () {
      let listTemp = []
      if (this.tipo === 'couchdb') {
        this.$axiosCouchDB
          .get('/instituicoes-campus/_design/campus/_view/get-by-id-instituicao?include_docs=true&key="' + this.idInstituicao + '"')
          .then(response => {
            response.data.rows.forEach(function (el) {
              listTemp.push({value: {idString: el.doc._id, nome: el.doc.nome}, label: el.doc.nome})
            })
            this.campus = listTemp
          })
      } else {
        if (this.idInstituicao !== undefined) {
          this.$axios
            .get('/cadastro/instituicoes-ensino/' + this.idInstituicao + '/campus')
            .then(response => {
              response.data.data.forEach(el => {
                listTemp.push({value: { id: el.id, nome: el.nome }, label: el.nome})
              })
              this.campus = listTemp
            })
        }
      }
    }
  },
  watch: {
    idInstituicao () {
      this.getCampus()
    }
  }
}
</script>
