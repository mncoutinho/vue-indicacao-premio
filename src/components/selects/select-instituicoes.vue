<template>
  <div>
    <div v-show="!this.nomeInstituicaoSelecionada">
      <q-select
        :error="v.$error"
        color="secondary"
        filter
        filter-placeholder="Filtro"
        separator
        float-label="INSTITUIÇÕES"
        :value="value"
        :options="instituicoes"
        @input="$emit('input', $event)"
      />
    </div>
    <div v-show="this.nomeInstituicaoSelecionada">
      <q-input v-model="nomeInstituicaoSelecionada" disable float-label="Instituição"/>
    </div>
  </div>
</template>
<script>
export default {
  props: ['v', 'value', 'nomeInstituicaoSelecionada', 'tipo'],
  created () {
    this.getInstituicoes()
  },
  data () {
    return {
      instituicoes: []
    }
  },
  methods: {
    getInstituicoes () {
      let listTemp = []
      if (this.tipo === 'couchdb') {
        this.$axiosCouchDB
          .get('/instituicoes/_all_docs?include_docs=true')
          .then(response => {
            response.data.rows.forEach(function (el) {
              listTemp.push({value: {idString: el.doc._id, nome: el.doc.nome}, label: el.doc.nome})
            })
            this.instituicoes = listTemp
          })
      } else {
        this.$axios
          .get('/cadastro/instituicoes-ensino')
          .then(response => {
            response.data.data.forEach(el => {
              listTemp.push({value: { id: el.id, nome: el.nome }, label: el.nome})
            })
            this.instituicoes = listTemp
          })
      }
    }
  }
}
</script>
