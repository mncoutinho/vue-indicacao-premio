<template>
    <q-modal v-if="opened" v-model="opened" :content-css="{minWidth: '50vw', minHeight: '40vh'}">
      <q-modal-layout>
      <q-toolbar slot="header" color="dark">
        <q-toolbar-title align="center">
          Dados do Responsável pela Indicação
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          color="white"
          icon="clear"
          v-close-overlay/>
      </q-toolbar>
      <q-card class="layout-padding">
        <br/>
        <q-card-title  class="bg-grey-3" text-color="white">
          <label  id="label-view"> Dados Pessoais</label>
        </q-card-title>
        <q-card-main style="margin-top:10px" class="q-ml-sm" >
          <br/>
          <div class="row gutter-xs justify-between">
            <div v-if="pessoa.nome" class="col-md-12">
              <label id="internal-label">NOME: </label><span id="span-view">{{pessoa.nome}}</span>
            </div>
          </div>
          <div v-if="pessoa.email" class="row gutter-xs justify-between">
            <div class="col-md-12">
              <label id="internal-label">EMAIL: </label><span id="span-view"> {{email.toUpperCase()}}</span>
            </div>
          </div>
          <div class="row gutter-xs justify-between">
            <div class="col-md-12">
              <label v-if="telefones.length > 0" id="internal-label">TELEFONES:</label>
                  <span v-for="tel in telefones" :key="tel.codigo" id="span-view">({{tel.ddd}}) {{tel.numero}}</span>
            </div>
          </div>
          <div v-if="enderecos" class="row gutter-xs justify-between">
            <div class="col-md-12">
              <label v-if="enderecos" id="internal-label">ENDEREÇOS: </label><span id="span-view">{{enderecos.enderecoCompleto.toUpperCase()}}</span>
            </div>
          </div>
        </q-card-main>
      </q-card>
      </q-modal-layout>
    </q-modal>
</template>
<script>
export default {
  data () {
    return {
      opened: false,
      pessoa: '',
      telefones: [],
      email: null,
      enderecos: null,
      columns: [
        { name: 'cpf', align: 'left', label: 'Nome', field: row => 'cpf' },
        { name: 'pessoa', align: 'left', label: 'Nome', field: row => row.pessoa },
        { name: 'papel', align: 'left', label: 'Tipo', field: row => 'papel' },
        { name: 'email', align: 'left', label: 'Email', field: 'email' },
        { name: 'telefone', align: 'left', label: 'Telefone', field: 'telefone' }
      ]
    }
  },
  methods: {
    async toggle (idPessoa) {
      if (!this.opened) {
        this.getPessoa(idPessoa)
        this.getTelefones(idPessoa)
        this.getEmail(idPessoa)
        this.getEnderecos(idPessoa)
        this.opened = !this.opened
      } else {
        this.opened = !this.opened
      }
    },
    getPessoa (idPessoa) {
      this.$axios
        .get('pessoa/interessado/' + idPessoa)
        .then(response => {
          this.pessoa = response.data.data
        })
    },
    getTelefones (idPessoa) {
      this.$axios
        .get('cadastro/telefone/' + idPessoa)
        .then(response => {
          this.telefones = response.data.data
        })
    },
    getEmail (idPessoa) {
      this.$axios
        .get('commons/email/pessoa/' + idPessoa)
        .then(response => {
          let emails = response.data.data
          if (emails !== null) {
            this.email = emails[0].descricao
          }
        })
    },
    getEnderecos (idPessoa) {
      this.$axios
        .get('endereco/pessoa/' + idPessoa)
        .then(response => {
          this.enderecos = response.data.data
        })
    }
  }
}
</script>
