<template>
  <q-page class="justify-center" style="padding: 30px">
    <div class="row gutter-x-sm">
      <div class="col-2" >
        <q-input v-model="pesquisa.ano"
        :error="$v.pesquisa.ano.$error"
        maxlength="4"
        float-label="Ano"
        />
      </div>
      <div class="col-3" >
        <q-btn class="full-width q-mt-lg"
          color="primary"
          rounded
          icon="search"
          @click="getPremios()"
          size="sm"
          label="Pesquisar" />
      </div>
      <div class="col-1">
      </div>
      <div class="col-3">
        <q-select
          color="primary"
          v-model="tipoRelatorio"
          float-label="Tipo Relatório"
          :options="tiposDeRelatorio" />
      </div>
      <div class="col-3">
        <q-btn class="full-width q-mt-lg"
          color="primary"
          rounded
          @click="gerarRelatorio()"
          size="sm"
          label="Gerar Relatório" />
      </div>
    </div>
    <div>
      <grid-consulta-premios class="q-mt-md" ref="gridConsulta" ADMIN></grid-consulta-premios>
    </div>
  </q-page>
</template>
<script>
import GridConsultaPremios from '../../components/grid/grid-consulta-premios'
import SelectInstituicoes from '../../components/selects/select-instituicoes'
import { required } from 'vuelidate/lib/validators'
import { notify } from '../../mixins/mixin-notify'
export default {
  mixins: [notify],
  components: { SelectInstituicoes, GridConsultaPremios },
  created () {
    this.user = this.$store.getters['user/getUser']
  },
  data () {
    return {
      pesquisa: { ano: null },
      tipoRelatorio: null,
      tiposDeRelatorio: [
        {value: 'MALA_DIRETA', label: 'Mala Direta'},
        {value: 'CRACHA', label: 'Crachá'},
        {value: 'CERTIFICADO', label: 'Certificado'},
        {value: 'QUANTITATIVO', label: 'Quantitativo'},
        {value: 'CONFIRMACAO_PRESENCA', label: 'Confirmação de Presença'},
        {value: 'PLANILHAO', label: 'Planilhão'}
      ]
    }
  },
  validations: {
    pesquisa: { ano: { required } }
  },
  methods: {
    getPremios () {
      this.$v.pesquisa.$touch()
      if (!this.$v.pesquisa.$error) {
        this.$refs.gridConsulta.getPremios(this.pesquisa)
      } else {
        this.mostrarMensagem('Preencher os campos obrigatórios!', 'negative', 1500)
      }
    },
    gerarRelatorio () {
      this.$v.pesquisa.$touch()
      if (!this.$v.pesquisa.$error) {
        this.$axios
          .post('cadastro/instituicao-ensino/premio-tct/relatorio', { ano: this.pesquisa.ano, tipoRelatorio: this.tipoRelatorio }, {
            responseType: 'arraybuffer',
            headers: {
              'Accept': 'application/vnd.ms-excel'
            }
          })
          .then(response => {
            const blob = new Blob([response.data], {
              type: 'application/vnd.ms-excel'
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'premio-' + this.tipoRelatorio + '.xls')
            document.body.appendChild(link)
            link.click()
          })
      } else {
        this.mostrarMensagem('Preencher os campos obrigatórios!', 'negative', 1500)
      }
    }
  }
}
</script>
