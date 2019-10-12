<template>
  <div>
    <!-- <q-btn icon="search" flat size="sm" dense label="Participantes" /> -->
    <q-modal v-model="opened" :content-css="{minWidth: '60vw', minHeight: '49vh'}">
      <q-modal-layout>
      <q-toolbar slot="header" color="primary">
        <q-toolbar-title align="center">
          Lista de Participantes
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          color="white"
          icon="clear"
          v-close-overlay/>
      </q-toolbar>
      <div>
        <q-table
          ref="table"
          color="primary"
          row-key="codigo"
          :data="participantes"
          :columns="columns"
          no-data-label = "Não possui participantes."
        >
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td key="cpf" :props="props">
              <small class="text-italic" >{{props.row.cpf}} </small>
            </q-td>
            <q-td key="pessoa" :props="props">
              <small class="text-italic" >{{props.row.pessoa.nome}}</small>
              </q-td>
            <q-td key="titulo" :props="props">
              <small class="text-italic" v-if="props.row.titulo">{{props.row.titulo}}</small>
            </q-td>
            <q-td key="papel" :props="props">
              <small class="text-italic" v-if="props.row.papel === '1'">Autor</small>
              <small class="text-italic" v-if="props.row.papel === '2'">Avaliador</small>
              <small class="text-italic" v-if="props.row.papel === '3'">Coorientador</small>
              <small class="text-italic" v-if="props.row.papel === '4'">Orientador</small>
              <small class="text-italic" v-if="props.row.papel === '5'">Comissão de Seleção</small>
              <small class="text-italic" v-if="props.row.papel === '6'">Autoridade</small>
            </q-td>
            <q-td key="email" :props="props">
              <small class="text-italic" props.row.email>{{props.row.email}}</small>
            </q-td>
            <q-td key="telefone" :props="props">
              <small class="text-italic">{{props.row.telefone}}</small>
            </q-td>
          </q-tr>
        </q-table>
      </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import Participante from '../models/participante'
export default {
  componets: {
    Participante
  },
  data () {
    return {

      enderecoView: {},
      papel: '',
      listaParticipantes: [],
      opened: false,
      participantes: [],
      columns: [
        { name: 'cpf', align: 'left', label: 'CPF', field: row => 'cpf' },
        { name: 'pessoa', align: 'left', label: 'Nome', field: row => row.pessoa },
        { name: 'titulo', align: 'left', label: 'Titulo/Formação', field: row => row.titulo.descricao },
        { name: 'papel', align: 'left', label: 'Tipo', field: row => 'papel' },
        { name: 'email', align: 'left', label: 'Email', field: 'email' },
        { name: 'telefone', align: 'left', label: 'Telefone', field: 'telefone' }
      ]
    }
  },
  methods: {
    async populaGrid () {
      await this.$axios
        .get('cadastro/instituicao-ensino/premio-tct/participantes/' + this.idPremio)
        .then(response => {
          this.listaParticipantes = response.data.data
          console.log(this.listaParticipantes)
        })
    },

    async excluir (id) {
      if (await this.dialogGeneric('Atenção', 'Você deseja realmente excluir esse Participante?')) {
        this.$axios
          .delete('cadastro/instituicao-ensino/premio-tct/participante' + id)
          .then(response => {
            this.$emit('atualizaGrid')
            this.getPremios()
          })
      }
    },
    toggle (idPremio) {
      if (!this.opened) {
        this.$axios
          .get('cadastro/instituicao-ensino/premio-tct/participantes/' + idPremio)
          .then(response => {
            this.participantes = response.data.data
            this.opened = !this.opened
          })
      } else {
        this.opened = !this.opened
      }
    }
  }
}
</script>
