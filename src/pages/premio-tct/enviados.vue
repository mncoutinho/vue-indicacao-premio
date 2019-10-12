<template>
    <q-page class="layout-padding justify-center">
      <div class="row gutter-x-lg">
        <div class="col-4">
          <select-instituicoes tipo="couchdb"
                               :v="$v.pesquisa.instituicao"
                               v-model="pesquisa.instituicao"
                               >
          </select-instituicoes>
        </div>
        <div class="col-4">
          <select-campus      tipo="couchdb"
                              :v="$v.pesquisa.campus"
                              v-model="pesquisa.campus"
                              :idInstituicao="pesquisa.instituicao.idString"
                              ></select-campus>
        </div>
        <div class="col-4" >
        <q-btn
          style="margin-top:25px;"
          class="full-width"
          color="primary"
          rounded
          icon="search"
          @click="getPremios()"
          size="sm"
          label="Pesquisar" />
        </div>
      </div>
      <div>
      <br>
      <br>
        <grid-consulta-premios ref="gridConsultaEnviados"></grid-consulta-premios>
    </div>
  </q-page>
</template>
<script>
import GridConsultaPremios from '../../components/grid/grid-consulta-premios'
import SelectInstituicoes from '../../components/selects/select-instituicoes'
import SelectCampus from '../../components/selects/select-campus'
import { required } from 'vuelidate/lib/validators'
import { notify } from '../../mixins/mixin-notify'
export default {
  mixins: [notify],
  components: {
    SelectInstituicoes, SelectCampus, GridConsultaPremios},
  created () {
    this.user = this.$store.getters['user/getUser']
    this.pesquisa.idPessoa = this.user.idPessoa
  },
  data () {
    return {
      pesquisa: { instituicao: {}, campus: {}, idPessoa: null }
    }
  },
  validations: {
    pesquisa: { instituicao: { required }, campus: { required } }
  },
  methods: {
    getPremios () {
      this.$v.pesquisa.$touch()
      if (!this.$v.pesquisa.$error) {
        this.$refs.gridConsultaEnviados.getPremios(this.pesquisa)
      } else {
        this.mostrarMensagem('Preencher os campos obrigatórios!', 'negative', 1500)
      }
    }
  }
}
</script>
