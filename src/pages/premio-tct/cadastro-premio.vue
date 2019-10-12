<template>
  <q-page class="layout-padding justify-center">
    <div >
      <div class="row">
        <div class="col-2">
          <img :src="config.imagem" style="max-width: 60%; height: auto;">
        </div>
        <div class="col-10 q-display-1 text-weight-bold">
          {{config.titulo}}
        </div>
      </div>
      <div class="row" v-if="config.estaNoPeriodoDeIncricao()">
        <div class="col-6 gutter-y-sm q-pa-lg">
          <select-instituicoes
              tipo="couchdb"
              :v="$v.premio.instituicao"
              v-model="premio.instituicao"
              :nomeInstituicaoSelecionada="premio.instituicao.descricao">
          </select-instituicoes>
          <select-campus
              tipo="couchdb"
              :v="$v.premio.campus"
              v-model="premio.campus"
              :idInstituicao="premio.instituicao.idString"
              v-if="premio.instituicao.idString !== ''"
              :nomeCampusSelecionado="premio.campus.descricao">
          </select-campus>
          <select-cursos
              tipo="couchdb"
              :v="$v.premio.curso"
              v-model="premio.curso"
              :idInstituicao="premio.instituicao.idString"
              :idCampus="premio.campus.idString"
              v-if="premio.campus.idString !== ''"
              :nomeCursoSelecionado="premio.curso.descricao">
          </select-cursos>
          <div v-show="cursoEmRegistroSelecionado">
            <q-btn
              v-if="!this.premio.id"
              label="Exibir lista de curso"
              icon="reply"
              flat
              value=""
              @click="exibirListaCurso"
              />
            <q-input
              v-if="!this.premio.id"
              float-label="PROTOCOLO DO CURSO EM REGISTRO"
              color="secondary"
              v-model="premio.protocoloCurso"
              value=""
              />
            <q-input
              v-if="this.premio.id"
              float-label="PROTOCOLO DO CURSO EM REGISTRO"
              v-model="premio.protocoloCurso"
              disable
              />
            <q-input v-if="!this.premio.id"
              float-label="DESCRIÇÃO DO CURSO EM REGISTRO"
              color="secondary"
              v-model="premio.descricaoCurso"
              value=""
              />
            <q-input v-if="this.premio.id"
              float-label="DESCRIÇÃO DO CURSO EM REGISTRO"
              v-model="premio.descricaoCurso"
              disable
              />
          </div>
          <select-niveis v-if="!this.premio.id" :v="$v.premio.nivel" v-model="premio.nivel"></select-niveis>
          <q-input
              v-if="this.premio.id"
              float-label="NÍVEL"
              v-model="premio.nivel"
              disable/>
          <q-input v-if="!this.premio.id"
              upper-case
              float-label="Título do Trabalho"
              :error="$v.premio.titulo.$error"
              color="secondary"
              v-model="premio.titulo"
              value=""/>
          <q-input v-if="this.premio.id"
              v-model="premio.titulo"
              float-label="Título do Trabalho"
              disable/>
          <upload
              v-if="this.premio.id"
              tamanho="M"
              :arquivo="this.premio.arquivo"
              :parametros="{ 'tipo': ['application/pdf'], 'tamanho': 21111111}"
              label="UPLOAD DO TRABALHO"
              color="primary"
              @salvaArquivo="salvaArquivo"
              @deletarArquivo="deletarArquivo"
              ref="uploadComponente"/>
          <upload
              v-if="this.premio.id"
              tamanho="M"
              :arquivo="this.premio.arquivoResumo"
              :parametros="{ 'tipo': ['application/pdf'], 'tamanho': 21111111}"
              label="UPLOAD DO RESUMO"
              color="primary"
              @salvaArquivo="salvaArquivoResumo"
              @deletarArquivo="deletarArquivoResumo"
              ref="uploadComponenteResumo"/>
           <upload
              v-if="this.premio.id"
              tamanho="M"
              :arquivo="this.premio.arquivoTermo"
              :parametros="{ 'tipo': ['application/pdf'], 'tamanho': 21111111}"
              label="UPLOAD DO TERMO"
              color="primary"
              @salvaArquivo="salvaArquivoTermo"
              @deletarArquivo="deletarArquivoTermo"
              ref="uploadComponenteTermo"/>
          <br>
          <a href="/formularios/indicacao-premiacao-termo.pdf">BAIXE O TERMO/DECLARAÇÃO AQUI</a>
          <q-btn
              v-if="!this.premio.id"
              color="primary"
              rounded
              size="sm"
              label="Iniciar Indicação"
              class="full-width q-mt-lg q-mb-sm"
              value=""
              @click="iniciarIndicacao"/>
        </div>
        <div class="col-6 gutter-y-sm q-pa-lg">
          <grid-participantes v-if="premio.id" ref="grid" :nivel="premio.nivel"
          :idPremio="premio.id" @atualizaListaParticipantes="atualizaListaParticipantes">
          </grid-participantes>
          <br>
          <div>
            <q-card text-color="dark">
              <q-card-title>
                Regras para Concluir a Indicação
              </q-card-title>
              <q-card-main>
                <small style="font-size: 10px; color: grey">Os arquivos devem estar no formato: PDF e devem ter um tamanho máximo de 20 MB</small><br/>
                <q-icon v-if="premio.arquivo.id" name="check" color="green-9" />
                  <span :style="premio.arquivo.id ? 'text-decoration: line-through' : ''">
                   <label>ARQUIVO: </label>
                     <small>Envio do arquivo referente ao trabalho.</small>
                  </span><br/>
                  <q-icon v-if="premio.arquivoResumo.id" name="check" color="green-9" />
                  <span :style="premio.arquivoResumo.id ? 'text-decoration: line-through' : ''">
                   <label>RESUMO: </label>
                     <small>Envio do arquivo referente ao resumo do trabalho.</small>
                  </span><br/>
                  <q-icon v-if="premio.arquivoTermo.id" name="check" color="green-9" />
                  <span :style="premio.arquivoTermo.id ? 'text-decoration: line-through' : ''">
                   <label>TERMO/DECLARAÇÃO: </label>
                     <small>Envio do arquivo referente ao termo assinado.</small>
                  </span><br/>
                <q-icon v-if="validaAutor" name="check" color="green-9" />
                  <span :style="validaAutor ? 'text-decoration: line-through' : ''">
                    <label>AUTOR: </label>
                     <small>De 1 a 4 autores, o autor não pode ser: avaliador, orientador, co-orientador ou comissão de seleção.</small>
                  </span><br/>
                <q-icon v-if="validaAvaliador" name="check" color="green-9" />
                <span :style="validaAvaliador ? 'text-decoration: line-through' : ''">
                  <label>AVALIADOR: </label>
                  <small>Obrigatoriamente 1, podendo cadastrar até 3.</small>
                </span><br/>
                <q-icon v-if="validaOrientador" name="check" color="green-9" />
                 <span :style="validaOrientador ? 'text-decoration: line-through' : ''">
                   <label>ORIENTADOR: </label>
                    <small>Obrigatoriamente 1, podendo ser o avaliador.</small>
                  </span><br/>
                <q-icon v-if="validaComissao" name="check" color="green-9" />
                 <span :style="validaComissao ? 'text-decoration: line-through' : ''">
                   <label>COMISSÃO DE SELEÇÃO: </label>
                    <small>Obrigatoriamente 3, com registro ativo no CREA-RJ, podendo ser o avaliador, orientador ou co-orientador, não podendo ser autor.</small>
                 </span><br/>
                <q-icon v-if="premio.aceite" name="check" color="green-9" />
                 <span :style="premio.aceite ? 'text-decoration: line-through' : ''">
                   <label>ACEITE DO TERMO DO REGULAMENTO: </label>
                   <small style="font-size: 10px; color: grey">Só será permitido finalizar a indicação após o preenchimento do formulário, a inclusão do arquivo, dos participantes obrigatórios</small>
                  </span><br/>
              </q-card-main>
            </q-card>
          </div>
          <br/>
          <check-aceite :validacao="(validaParticipantes && premio.arquivo.id && premio.id) ? true : false"
           @aceitarEFinalizarInscricao="aceitarEFinalizarInscricao" @atualizaAceite="atualizaAceite" ref="aceite" />
          <br>
          <q-btn v-if="this.premio.id"
              color="red-9"
              rounded
              label="Cancelar Indicação"
              class="full-width"
              value=""
              size="sm"
              @click="cancelarIndicacao"/>
        </div>
      </div>
     </div>
    <div v-if="!config.estaNoPeriodoDeIncricao()">
      <br/><br/><br/>
      <q-card  color="yellow-4" text-color="dark" style="width: 100%;">
        <q-card-title>
          <div class="q-headline"> <q-icon name="priority_high" size="30px" />{{config.msgFimInscricao}}</div>
        </q-card-title>
       </q-card>
    </div>
  </q-page>
</template>
<script>
import ConfigPremio from '../../assets/config-premio'
import GridParticipantes from '../../components/grid/grid-participantes'
import Premio from '../../components/models/premio'
import Arquivo from '../../components/models/arquivo'
import CheckAceite from '../../components/checkbox/check-aceite'
import SelectNiveis from '../../components/selects/select-niveis'
import { required, maxLength } from 'vuelidate/lib/validators'
import InputCpf from '../../components/input/input-cpf'
import SelectInstituicoes from '../../components/selects/select-instituicoes'
import SelectCampus from '../../components/selects/select-campus'
import SelectCursos from '../../components/selects/select-cursos'
import upload from '../../components/input/input-upload'
import { notify } from '../../mixins/mixin-notify'
import { dialog } from '../../mixins/mixin-dialog'
export default {

  mixins: [notify, dialog],
  components: {
    ConfigPremio,
    CheckAceite,
    GridParticipantes,
    SelectNiveis,
    InputCpf,
    SelectInstituicoes,
    SelectCampus,
    SelectCursos,
    upload
  },
  created () {
    this.config = new ConfigPremio(new Date())
    let idPremio = localStorage.getItem('@#$%ASDWQQ')
    if (idPremio) {
      this.$axiosClean
        .get('cadastro/instituicao-ensino/premio-tct/premio/' + idPremio)
        .then(response => {
          this.premio = response.data.data
        }).catch(() => {
          localStorage.removeItem('@#$%ASDWQQ')
        })
    }
    this.user = this.$store.getters['user/getUser']
    this.premio.idPessoa = this.user.idPessoa
  },
  data () {
    return {
      config: {},
      user: {},
      cursoEmRegistroSelecionado: false,
      premio: new Premio()
    }
  },
  validations: {
    premio: {
      instituicao: { required },
      nivel: { required },
      campus: { required },
      curso: { required },
      titulo: { required, maxLength: maxLength(2000) }
    }
  },
  methods: {
    iniciarIndicacao () {
      this.$v.premio.$touch()
      if (!this.$v.premio.$error) {
        if (this.premio.curso.id === '0') {
          if (this.premio.descricaoCurso === null || this.premio.descricaoCurso === undefined || this.premio.descricaoCurso === '' ||
          this.premio.protocoloCurso === null || this.premio.protocoloCurso === undefined || this.premio.protocoloCurso === '') {
            this.mostrarMensagem('Preencher os campos obrigatórios protocolo do curso e descrição do curso!', 'negative', 1500)
          } else {
            this.criarIndicacao()
          }
        } else {
          this.criarIndicacao()
        }
      } else {
        this.mostrarMensagem('Preencher os campos obrigatórios!', 'negative', 1500)
      }
    },
    criarIndicacao () {
      if (this.premio.nivel === 'GRADUAÇÃO' || this.premio.nivel === 'TÉCNICO') {
        this.$axios
          .post('cadastro/instituicao-ensino/premio-tct', this.premio)
          .then(response => {
            if (response.data.type === 'SUCCESS') {
              localStorage.setItem('@#$%ASDWQQ', response.data.data.id)
              this.premio = response.data.data
              this.$v.premio.$reset()
            }
          })
      } else
      if (this.premio.nivel === 'MESTRADO' || this.premio.nivel === 'DOUTORADO') {
        this.$axios
          .post('cadastro/instituicao-ensino/premio-tct/mestrado-doutorado', this.premio)
          .then(response => {
            if (response.data.type === 'SUCCESS') {
              localStorage.setItem('@#$%ASDWQQ', response.data.data.id)
              this.premio = response.data.data
              this.$v.premio.$reset()
            }
          })
      }
    },
    cancelarIndicacao () {
      this.$axios
        .delete('cadastro/instituicao-ensino/premio-tct/' + this.premio.id)
        .then(response => {
          localStorage.removeItem('@#$%ASDWQQ')
          this.premio = new Premio(this.user.idPessoa)
          this.$v.premio.$reset()
          this.$refs.grid.limparGrid()
        })
    },
    async salvaArquivo (arquivo) {
      this.premio.arquivo.id = arquivo.data.id
      await this.$axios
        .put('cadastro/instituicao-ensino/premio-tct/arquivo', this.premio)
        .then(response => {
          this.premio.arquivo = response.data.data.arquivo
        })
    },
    async deletarArquivo (arquivo) {
      if (await this.dialogGeneric('Atenção', 'Você deseja realmente excluir o arquivo ?')) {
        this.$axios
          .delete('cadastro/instituicao-ensino/premio-tct/arquivo/' + this.premio.id)
          .then(response => {
            this.$refs.uploadComponente.deletarFisicamente(arquivo.id)
            this.premio.arquivo = new Arquivo()
            arquivo = new Arquivo()
          })
      }
    },
    async salvaArquivoResumo (arquivo) {
      this.premio.arquivoResumo.id = arquivo.data.id
      await this.$axios
        .put('cadastro/instituicao-ensino/premio-tct/arquivoResumo', this.premio)
        .then(response => {
          this.premio.arquivoResumo = response.data.data.arquivoResumo
        })
    },
    async deletarArquivoResumo (arquivo) {
      if (await this.dialogGeneric('Atenção', 'Você deseja realmente excluir o arquivo ?')) {
        this.$axios
          .delete('cadastro/instituicao-ensino/premio-tct/arquivoResumo/' + this.premio.id)
          .then(response => {
            this.$refs.uploadComponenteResumo.deletarFisicamente(arquivo.id)
            this.premio.arquivoResumo = new Arquivo()
            arquivo = new Arquivo()
          })
      }
    },
    async salvaArquivoTermo (arquivo) {
      this.premio.arquivoTermo.id = arquivo.data.id
      await this.$axios
        .put('cadastro/instituicao-ensino/premio-tct/arquivoTermo', this.premio)
        .then(response => {
          this.premio.arquivoTermo = response.data.data.arquivoTermo
        })
    },
    async deletarArquivoTermo (arquivo) {
      if (await this.dialogGeneric('Atenção', 'Você deseja realmente excluir o arquivo ?')) {
        this.$axios
          .delete('cadastro/instituicao-ensino/premio-tct/arquivoTermo/' + this.premio.id)
          .then(response => {
            this.$refs.uploadComponenteTermo.deletarFisicamente(arquivo.id)
            this.premio.arquivoTermo = new Arquivo()
            arquivo = new Arquivo()
          })
      }
    },
    aceitarEFinalizarInscricao () {
      this.premio.aceite = true
      this.$axios
        .put('cadastro/instituicao-ensino/premio-tct/aceite', this.premio)
        .then(response => {
          this.premio = new Premio(this.user.idPessoa)
          this.premio.idPessoa = this.user.idPessoa
          this.cursoEmRegistroSelecionado = false
          localStorage.removeItem('@#$%ASDWQQ')
          this.$refs.grid.limparGrid()
          this.$refs.aceite.limpar()
        })
    },
    atualizaListaParticipantes (listParticipantes) {
      this.premio.listaParticipantes = listParticipantes
    },
    exibirListaCurso () {
      this.cursoEmRegistroSelecionado = false
      this.premio.protocoloCurso = ''
      this.premio.descricaoCurso = ''
    },
    atualizaAceite (value) {
      this.premio.aceite = value
    }
  },
  watch: {
    'premio.curso.id': function (value) {
      if (this.premio.curso.id === 'cursoEmprotocolo') {
        this.premio.curso = {id: '0', nome: ' '}
        this.cursoEmRegistroSelecionado = true
      }
    }
  },
  computed: {
    validaParticipantes: {
      get () {
        let papeisRequeridos = ['1', '2', '4']
        let tamanho = this.premio.listaParticipantes.filter(el => el.papel === '5').length
        return papeisRequeridos.every(el => this.premio.listaParticipantes.some(p => p.papel === el)) && tamanho === 3
      }
    },
    validaAutor: {
      get () {
        let tamanho = this.premio.listaParticipantes.filter(el => el.papel === '1').length
        return tamanho > 0 && tamanho < 5
      }
    },
    validaAvaliador: {
      get () {
        let tamanho = this.premio.listaParticipantes.filter(el => el.papel === '2').length
        return tamanho > 0 && tamanho < 4
      }
    },
    validaOrientador: {
      get () {
        let tamanho = this.premio.listaParticipantes.filter(el => el.papel === '4').length
        return tamanho === 1
      }
    },
    validaComissao: {
      get () {
        let tamanho = this.premio.listaParticipantes.filter(el => el.papel === '5').length
        return tamanho === 3
      }
    }
  }
}
</script>
