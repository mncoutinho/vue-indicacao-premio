<template>
  <div>
    <div>
      <q-table
        ref="table"
        color="secondary"
        row-key="cpf"
        :data="this.listaParticipantes"
        :columns="columns"
        no-data-label = "Nenhum participante cadastrado.">
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="acao" :props="props">
          <q-btn flat round dense icon="more_horiz">
            <q-popover>
              <q-list link>
                <q-item v-close-overlay>
                  <q-btn icon="clear" label="Excluir"
                    flat
                    @click="excluir(props.row.id,props.row.pessoa.nome)"
                    size="sm" dense />
                </q-item>
                <q-item v-close-overlay>
                  <q-btn icon="fas fa-info-circle" label="Informações"
                    flat
                    @click="toggle(props.row, getPapel(props.row.papel)[0].label )"
                    size="sm" dense />
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
        </q-td>
        <q-td key="papel" :props="props">
          <small>{{ getPapel(props.row.papel)[0].label }}</small>
        </q-td>
        <q-td key="nome" :props="props">
          <small>{{ props.row.pessoa.nome }}</small>
        </q-td>
      </q-tr>
        <template slot="top-right" slot-scope="props">
          <q-btn
            rounded
            color="primary"
            @click="abrirModal()"
            class="full-width"
            size="sm"
            wait-for-ripple label="Adicionar Participantes"
          />
        </template>
      </q-table>
    </div>
    <modal-participantes-cadastro @populaGrid="populaGrid" ref="modalParticipantes"></modal-participantes-cadastro>
    <q-modal v-model="opened"  :content-css="{minWidth: '40vw', minHeight: '26vh', maxWidth: '60vw'}">
      <q-modal-layout>
      <q-toolbar slot="header" color="dark">
        <q-toolbar-title align="center">
            Informações Participante
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
        <div class="row gutter-sm" style="padding: 20px">
          <div class="col-sm-3">
            <q-input
              disable
              v-model="infoParticipantes.pessoa.nome"
              float-label="Nome"
              color="secondary"/>
          </div>

            <div class="col-sm-3">
            <q-input
              disable
              v-model="infoParticipantes.cpf"
              float-label="CPF"
              color="secondary"/>
            </div>
            <div class="col-sm-3">
              <q-input
                disable
                v-model="papel"
                float-label="Tipo"
                color="secondary"/>
            </div>
            <div class="col-sm-3">
              <q-input
                disable
                v-model="infoParticipantes.idTitulo"
                float-label="Tipo"
                color="secondary"/>
            </div>
            </div>
            <div class="row gutter-sm" style="padding: 20px">
          <div class="col-sm-4">
              <q-input
                disable
                v-model="infoParticipantes.email"
                float-label="Email"
                color="secondary"/>
          </div>
            <div class="col-sm-4">
              <q-input
                disable
                v-model="infoParticipantes.telefone"
                float-label="Telefone"
                color="secondary"/>
            </div>
            <div class="col-sm-4">
              <q-input
                disable
                v-model="infoParticipantes.celular"
                float-label="Celular"
                color="secondary"/>
            </div>

             <endereco v-if="infoParticipantes.idEndereco"
                       class="q-mt-sm col-12"
                       :enderecoView="enderecoView"/>

          </div>
        </div>

      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>

import papeis from '../../assets/papeis'
import { dialog } from '../../mixins/mixin-dialog'
import EnderecoModel from '../models/Endereco.js'
import Endereco from '../endereco/endereco-view'
import ModalParticipantesCadastro from '../modais/modal-participantes-cadastro'
export default {
  props: ['idPremio', 'nivel'],
  mixins: [dialog],
  components: { ModalParticipantesCadastro,
    Endereco,
    EnderecoModel},
  created () {
    this.enderecoView = new EnderecoModel()

    if (this.idPremio) {
      this.populaGrid()
    }
  },
  data () {
    return {
      enderecoView: {},
      papel: '',
      listaParticipantes: [],
      infoParticipantes: { pessoa: { nome: '' }, idEndereco: '' },
      opened: false,
      papeis,
      columns: [
        { name: 'acao', label: '', field: 'acao' },
        { name: 'papel', align: 'left', label: 'Tipo', field: row => row.papel, sortable: true },
        { name: 'nome', align: 'left', label: 'Nome', field: row => row.pessoa.nome, sortable: true }
      ]
    }
  },
  methods: {
    async getEndereco (idEndereco) {
      await this.$axios
        .get('endereco/busca-endereco/' + idEndereco)
        .then(response => {
          this.enderecoView = response.data.data
          return this.enderecoView
        })
    },
    getPapel (value) {
      return this.papeis.filter(function (el) { return el.value === value })
    },
    async populaGrid () {
      await this.$axios
        .get('cadastro/instituicao-ensino/premio-tct/participantes/' + this.idPremio)

        .then(response => {
          this.listaParticipantes = response.data.data
        })
      this.$emit('atualizaListaParticipantes', this.listaParticipantes)
    },
    abrirModal () {
      this.$refs.modalParticipantes.toggle({ idPremio: this.idPremio, nivel: this.nivel })
    },
    async excluir (id, nome) {
      if (await this.dialogGeneric('Atenção', 'Você deseja realmente excluir o participante ' + nome + '?')) {
        this.$axios
          .delete('cadastro/instituicao-ensino/premio-tct/participante/' + id)
          .then(response => {
            this.populaGrid()
          })
      }
    },
    toggle (info, papel, enderecoView) {
      this.papel = papel
      this.infoParticipantes = info
      this.enderecoView = this.getEndereco(info.idEndereco)
      this.opened = !this.opened
    },
    limparGrid () {
      this.listaParticipantes = []
    }
  }
}
</script>
