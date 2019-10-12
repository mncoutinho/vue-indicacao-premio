<template>
<div>
  <q-modal v-model="opened" :content-css="{minWidth: '54vw', minHeight: '45vh'}">
    <q-modal-layout>
      <q-toolbar slot="header" color="primary">
        <q-toolbar-title align="center">
          Adicionar Participante
        </q-toolbar-title>
        <q-btn
          flat
          rounded
          color="white"
          icon="clear"
          v-close-overlay/>
      </q-toolbar>
      <div style="padding: 20px">
        <div class="row gutter-x-sm">
          <div class="col-3">
            <input-cpf :v="$v.participante.pessoa.cpf" v-model="participante.pessoa.cpf"
            @recebePessoa="recebePessoa" :estilo="{ cor: 'primary' }"/>
          </div>
          <div class="col-9">
            <q-input
              v-if="tipoRespostaCpf === 'SUCCESS' || tipoRespostaCpf === 'INFORMATION'"
              :disable="desabilitaNome"
              id="uppercase"
              v-model="participante.pessoa.nome"
              float-label="Nome"
              color="primary"/>
          </div>
        </div>
        <br>
        <br>
        <div class="row gutter-x-sm" v-if="tipoRespostaCpf === 'SUCCESS' || tipoRespostaCpf === 'INFORMATION'" >
          <div class="col-3">
          <selecttitulo
          v-model="participante.idTitulo"
          />
          </div>
          <div class="col-2">
            <q-select
              color="primary"
              separator
              float-label="Tipo Participante"
              :error="$v.participante.papel.$error"
              v-model="participante.papel"
              :options="papeis"/>
          </div>
          <div class="col-3">
            <q-input
              :error="$v.participante.email.$error"
              v-model="participante.email"
              float-label="Email"
              color="primary"/>
          </div>
          <div class="col-2">
            <q-input
              :error="$v.participante.telefone.$error"
              v-model="participante.telefone"
              float-label="Telefone"
              color="primary"
              v-mask="['(##) ####-####', '(##) #####-####']"
              masked="true"/>
          </div>
          <div style="margin-bottom: 25px" class="col-2">
            <q-input
              :error="$v.participante.celular.$error"
              v-model="participante.celular"
              float-label="Celular"
              color="primary"
              v-mask="['(##) ####-####', '(##) #####-####']"
              masked="true"/>
          </div>
        <div class="row gutter-y-sm q-mt-sm"
             v-if="tipoRespostaCpf === 'SUCCESS' || tipoRespostaCpf === 'INFORMATION'">
          <div class="col-12" >
            <small
            v-if="participante.pessoa.tipo !== 'PROFISSIONAL'"
            style="color:red; "
            >* Atenção este participante não é profissional registrado no CREA-RJ
            </small>
          </div>
        </div>
          <endereco
                class="q-mt-sm col-12"
                :idEndereco = "idEndereco"
                :tipoEndereco="'CONTRATANTE'"
                :titulo="title"
                color="primary"
                ehArt
                @atualizaEndereco="atualizaEndereco" />
        </div>
        <div class="row gutter-y-sm q-mt-sm col-12">
            <q-btn
            v-if="participante.pessoa.cpf"
            size="sm"
            rounded
            class="full-width q-mt-lg"
            icon="fas fa-user-graduate"
            color="green-7"
            @click="cadastrar()"
            label="Cadastrar Participante"/>
          </div>

      </div>
    </q-modal-layout>
  </q-modal>
</div>
</template>
<script>
const TIMEOUT = 4000
import selecttitulo from '../selects/select-titulo'
import { required, minLength, email } from 'vuelidate/lib/validators'
import InputCpf from '../input/input-cpf'
import Endereco from '../endereco/endereco'
import {mask} from 'vue-the-mask'
import papeis from '../../assets/papeis'
import { notify } from '../../mixins/mixin-notify'
import Participante from '../../components/models/participante'
import EnderecoModel from '../models/Endereco.js'
export default {
  directives: {mask},
  mixins: [notify],
  components: {
    selecttitulo,
    InputCpf,
    Participante,
    EnderecoModel,
    Endereco
  },
  created () {
    this.title = ''
    this.idEndereco = this.enderecoView
  },
  data () {
    return {
      tipoRespostaCpf: '',
      idEndereco: null,
      title: '',
      papeis,
      idPremio: null,
      nivel: null,
      existeNaBase: false,
      desabilitaNome: true,
      opened: false,
      participante: new Participante(),
      idSituacao: null
    }
  },
  validations: {
    participante: {
      email: { required, email },
      telefone: { required, minLength: minLength(14) },
      celular: { required, minLength: minLength(15) },
      papel: { required },
      pessoa: { cpf: { required, minLength: minLength(11) }, nome: { required, minLength: minLength(3) } },
      idEndereco: { required }
    }
  },
  methods: {
    async toggle (value) {
      this.idPremio = value.idPremio
      this.nivel = value.nivel
      this.participante = new Participante(this.idPremio)
      this.$v.$reset()
      this.idEndereco = ''
      this.opened = !this.opened
      this.participante.id = ''
    },
    async fechar () {
      this.participante = new Participante(this.idPremio)
      this.$v.$reset()
      this.opened = false
    },
    getPapel (value) {
      this.papeis.filter(function (el) { return el.value === value })
    },
    recebePessoa (value) {
      this.participante = new Participante(this.idPremio)
      if (value.type !== 'ERROR') {
        if (value.type === 'SUCCESS') {
          this.existeNaBase = true
          this.idSituacao = value.situacao.id
        } else {
          this.existeNaBase = false
          this.participante.pessoa.tipo = 'LEIGOPF'
          this.idSituacao = null
        }
        this.pessoaExisteNaBase(value)
      }
    },
    pessoaExisteNaBase (value) {
      if (this.existeNaBase) {
        this.desabilitaNome = true
        this.preencheParticipante(value)
        this.tipoRespostaCpf = value.type
      } else {
        this.desabilitaNome = false
        this.participante.pessoa.cpf = value.cpf
        this.tipoRespostaCpf = 'SUCCESS'
      }
    },
    preencheParticipante (value) {
      this.participante.pessoa.id = value.id
      this.participante.pessoa.cpf = value.cpf
      this.participante.pessoa.nome = value.nome
      this.participante.pessoa.tipo = value.tipo
      this.participante.pessoa.idEndereco = value.idEndereco
      this.participante.idTitulo = selecttitulo.value
    },
    async cadastrar () {
      this.$v.participante.$touch()
      if (!this.$v.participante.$error) {
        this.idEndereco = null
        if (this.existeNaBase) {
          this.validaParticipante()
        } else {
          this.cadastraLeigo(this.participante)
        }
      } else {
        this.mostrarMensagem('Preencher os campos obrigatorios.', 'negative', 1500)
      }
    },
    cadastraLeigo (participante) {
      let pessoaDto = { tipoPessoa: 'LEIGOPF', cpfOuCnpj: participante.pessoa.cpf, nome: participante.pessoa.nome, email: participante.email, telefones: [{ tipoTelefone: { id: 1 }, ddd: participante.telefone.substring(1, 3), numero: participante.telefone.substring(4) }, { tipoTelefone: { id: 3 }, ddd: participante.celular.substring(1, 3), numero: participante.celular.substring(4) }] }
      this.$axios
        .post('pessoa/leigo/', pessoaDto)
        .then(response => {
          this.participante = participante
          this.participante.pessoa.id = response.data.data.id
          this.participante.pessoa.tipo = 'LEIGOPF'
          this.existeNaBase = true
          this.validaParticipante()
        })
    },

    atualizaEndereco (value) {
      if (value) {
        this.enderecoView = Object.assign({}, value)
        this.idEndereco = this.enderecoView.idString
        this.participante.idEndereco = this.idEndereco
      } else {
        this.enderecoView = new EnderecoModel()
        this.idEndereco = null
        this.excluiEndereco()
      }
    },
    async validaParticipante () {
      if (this.participante.papel === '5' && this.participante.pessoa.tipo !== 'PROFISSIONAL') {
        this.mostrarMensagem('Profissional não registrado no Crea-RJ não poderá ser parte da Comissão.', 'negative', 2000)
      } else if (this.participante.papel === '1' && (this.nivel === 'MESTRADO' || this.nivel === 'DOUTORADO') && this.participante.pessoa.tipo !== 'PROFISSIONAL') {
        this.mostrarMensagem('Profissional não registrado no Crea-RJ não poderá ser autor para indicações de nível de Mestrado ou Doutorado.', 'negative', 2000)
      } else {
        let situacoesValidas = [1, 3, 5, 6, 7, 12, 14]
        if (((this.participante.papel === '5') || (this.participante.papel === 1 && (this.nivel === 'MESTRADO' || this.nivel === 'DOUTORADO'))) && this.participante.pessoa.tipo === 'PROFISSIONAL' && !situacoesValidas.includes(this.idSituacao)) {
          if (this.idSituacao === 9) { // valida tecnico CFT
            this.validaTecnicoTransferidoCFT()
          } else {
            this.mostrarMensagem('O registro deste profissional não está ativo no Crea-RJ', 'negative', TIMEOUT)
          }
        } else {
          this.incluirParticipante()
        }
      }
    },
    async validaTecnicoTransferidoCFT () {
      console.log('valida cft')
      let eventoTransferenciaCft = 4
      await this.$axios
        .get('cadastro/historico/' + this.participante.pessoa.id + '/' + eventoTransferenciaCft)
        .then(response => {
          let historicos = response.data.data
          let historicoAtualEhTransferidoCft = false
          if (historicos !== null) {
            if (historicos.length !== 0) {
              historicoAtualEhTransferidoCft = historicos.filter(function (el) { return el.dataFinal === '' }).length !== 0
            }
          }
          if (historicoAtualEhTransferidoCft) {
            this.incluirParticipante()
          } else {
            this.mostrarMensagem('O registro deste profissional não está ativo no Crea-RJ', 'negative', TIMEOUT)
          }
        })
    },
    async incluirParticipante () {
      await this.$axios
        .post('cadastro/instituicao-ensino/premio-tct/participante', this.participante)
        .then(response => {
          this.$emit('populaGrid')
          this.participante = new Participante(this.idPremio)
          this.fechar()
        })
    }
  },
  watch: {
    'participante.pessoa.cpf': function (value, oldValue) {
      if (value.length < 11) {
        this.tipoRespostaCpf = ''
        this.participante = new Participante(this.idPremio)
      }
    }
  }
}
</script>
<style>
#uppercase{
  text-transform: uppercase
}
</style>
