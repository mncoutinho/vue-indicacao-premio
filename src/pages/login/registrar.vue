<template>
  <div class="text-center">
    <div class="text-left gutter-xs">
      <div class="row gutter-xs">
        <div class="col-4">
          <input-cpf
          :v="$v.cadastro.cpfOuCnpj"
          v-model="cadastro.cpfOuCnpj"
           @recebePessoa="recebePessoa"
           :estilo="{ cor: 'primary', inverted: false }"/>
        </div>
        <div class="col-8" >
          <q-input
          type="text"
          :error="$v.cadastro.nome.$error"
          :readonly="existeNaBase"
          v-model="cadastro.nome"
          float-label="Nome"
          color="primary"/>
        </div>
      </div>
      <div class="row gutter-xs" v-if="!possuiTelefone">
        <div class="col-4">
          <q-input
          type="text"
          v-model="cadastro.telefones[0].ddd"
          float-label="DDD"
          color="primary"/>
        </div>
        <div class="col-8">
          <q-input
          type="text"
          v-model="cadastro.telefones[0].numero"
          float-label="Telefone para Contato"
          color="primary"
          maxlength="11" />
        </div>
      </div>
      <div class="row" v-if="!possuiEmail">
        <div class="col-12">
          <q-input
          type="email"
          :error="$v.cadastro.email.$error"
          v-model="cadastro.email"
          float-label="Email"
          color="primary"/>
        </div>
      </div>
    </div>
    <q-btn
    size="12px"
    icon="send" rounded
    :disable="tipoRespostaCpf === 'ERROR'"
    label="Enviar"
    color="primary"
    class="full-width q-mt-lg q-mb-lg"
    @click="cadastrar()" />
  </div>
</template>

<script>
import { notify } from '../../mixins/mixin-notify'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { debounce } from 'quasar'
import { dialog } from '../../mixins/mixin-dialog'
import InputCpf from '../../components/input/input-cpf'
export default {
  mixins: [notify, dialog],
  components: { InputCpf },
  data () {
    return {
      tipoRespostaCpf: '',
      possuiEmail: false,
      possuiTelefone: false,
      possuiSenha: false,
      existeNaBase: false,
      cadastro: { cpfOuCnpj: '', nome: '', email: '', telefones: [ { ddd: '', numero: '', tipoTelefone: { id: 1 } } ] }
    }
  },
  validations: {
    cadastro: {
      nome: { required }, cpfOuCnpj: {required, minLength: minLength(11)}, email: {email, required}}
  },
  methods: {
    limparInput () {
      this.$v.$reset()
      this.possuiEmail = false
      this.possuiTelefone = false
      this.possuiSenha = false
      this.existeNaBase = false
      this.cadastro = { cpfOuCnpj: '', nome: '', email: '', telefones: [ { ddd: '', numero: '', tipoTelefone: { id: 1 } } ] }
    },
    async existeCadastro () {
      if (await this.dialogGeneric('Atenção', 'Você possui cadastro no Crea, Clicando em enviar, sua senha de usuário no CreaOnline também irá mudar! Tem certeza disto?')) {
        this.geraAcesso(this.cadastro.id)
      }
    },
    cadastrar: debounce(function (value) {
      this.$v.cadastro.$touch()
      if (!this.$v.cadastro.$error) {
        if (this.existeNaBase) {
          this.existeCadastro()
        } else {
          this.cadastraLeigoEGeraAcesso()
        }
      } else {
        if (this.$v.cadastro.cpfOuCnpj.$error) {
          this.mostrarMensagem('Preencher os campos obrigatorios.', 'negative', 1500)
        }
      }
    }, 300, true), // true, dispara a função de inicio e impede o segundo disparo até que se passe o delay definido
    geraAcesso (idPessoa) {
      let pessoaDto = { id: idPessoa, email: null, telefones: [] }
      if (this.existeNaBase && !this.possuiEmail) {
        pessoaDto.email = this.cadastro.email
      }
      if (this.existeNaBase && !this.possuiTelefone) {
        pessoaDto.telefones = this.cadastro.telefones
        pessoaDto.telefones[0].codPessoa = idPessoa
      }
      this.$axios
        .put('/cadastro/instituicao-ensino/premio-tct/gera-acesso/' + this.cadastro.cpfOuCnpj, pessoaDto)
        .then(response => {
          this.mostrarMensagem('Login criado com sucesso, sua senha será enviada para o e-mail cadastrado', 'positive', 2500)
          this.limparInput()
        })
    },
    recebePessoa (value) {
      this.tipoRespostaCpf = value.type
      if (value.type === 'SUCCESS') {
        this.existeNaBase = true
        this.cadastro.nome = value.nome
        this.cadastro.id = value.id
        this.cadastro.tipoPessoa = value.tipo
        // this.telefones = value.telefones
      }
      if (value.email !== null && value.email !== '' && value.email !== undefined) {
        this.possuiEmail = true
        this.cadastro.email = value.email
      } else {
        this.possuiEmail = false
        this.cadastro.email = ''
      }
      if (value.telefones !== null && value.telefones.length !== 0 && value.telefones !== undefined) {
        this.possuiTelefone = true
        this.telefones = value.telefones
      } else {
        this.possuiTelefone = false
      }
      if (value.dataCriacaoLogin !== null && value.dataCriacaoLogin !== '') {
        this.possuiSenha = true
      } else {
        this.possuiSenha = false
      }
    },
    cadastraLeigoEGeraAcesso () {
      this.cadastro.tipoPessoa = 'LEIGOPF'
      this.$axios
        .post('pessoa/leigo/', this.cadastro)
        .then(response => {
          this.geraAcesso(response.data.data.id)
        })
        .catch(error => {
          if (error.response.data.messages[0] === 'validator.email.invalido') {
            this.mostrarMensagem('E-mail inválido', 'negative', 1500)
          } else if (error.response.data.messages[0] === 'cpfOuCnpj.invalido') {
            this.mostrarMensagem('CPF inválido', 'negative', 1500)
          }
        })
    }
  },
  watch: {
    'tipoRespostaCpf': function (value, oldValue) {
      if (value !== 'SUCCESS') {
        this.cadastro.nome = ''
        this.cadastro.telefones = [ { ddd: '', numero: '', tipoTelefone: { id: 1 } }, { ddd: '', numero: '', tipoTelefone: { id: 3 } } ]
        this.cadastro.email = ''
        this.existeNaBase = false
      }
    }
  }
}
</script>
