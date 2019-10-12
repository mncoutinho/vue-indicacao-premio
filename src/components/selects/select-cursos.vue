<template>
  <div>
    <div v-show="!this.nomeCursoSelecionado">
      <q-select
        :error="v.$error"
        color="secondary"
        filter
        filter-placeholder="Filtro"
        separator
        float-label="CURSOS"
        :value="value"
        :options="cursos"
        @input="$emit('input', $event)"
      />
    </div>
    <div v-show="this.nomeCursoSelecionado">
      <q-input v-model="nomeCursoSelecionado" disable float-label="Curso"/>
    </div>
</div>
</template>
<script>
export default {
  props: ['v', 'value', 'idCampus', 'idInstituicao', 'nomeCursoSelecionado', 'naoPermiteIncluir', 'tipo'],
  created () {
    this.getCursos()
  },
  data () {
    return {
      cursos: []
    }
  },
  methods: {
    getCursos () {
      let listTemp = []
      if (!this.naoPermiteIncluir) {
        listTemp.push({value: {id: 'cursoEmprotocolo', descricao: ''}, label: 'SELECIONE AQUI CASO O CURSO NÃO CONSTE NA LISTA', icon: 'warning', leftColor: 'red-9'})
      }
      if (this.tipo === 'couchdb') {
        this.$axiosCouchDB
          .get('/instituicoes-cursos/_design/cursos/_view/get-by-idCampus?include_docs=true&key="' + this.idCampus + '"')
          .then(response => {
            response.data.rows.forEach(function (el) {
              listTemp.push({value: {idString: el.doc._id, nome: el.doc.nome}, label: el.doc.nome})
            })
            this.cursos = listTemp
          })
      } else if (this.idInstituicao !== undefined) {
        this.$axios
          .get('/cadastro/instituicoes-ensino/campus/' + this.idCampus + '/cursos')
          .then(response => {
            response.data.data.forEach(el => {
              listTemp.push({value: { id: el.id, nome: el.nome }, label: el.nome})
            })
            this.cursos = listTemp
          })
      }
    }
  },
  watch: {
    idCampus () {
      this.getCursos()
    },
    idInstituicao () {
      this.cursos = []
    }
  }
}
</script>
