<template>
  <div>
    <q-modal v-model="opened" >
      <q-modal-layout>
        <q-toolbar slot="header" color="primary">
          <q-toolbar-title align="center">
            {{endereco.id ? 'Editar' : 'Adicionar'}} Endereço
          </q-toolbar-title>
          <q-btn icon="clear"
          size="sm"
                 flat round dense
                 color="white"
                 v-close-overlay />
        </q-toolbar>
        <div style="padding: 20px">
          <q-tabs v-if="endereco.id === null && opened && (tipo === 'CONTRATANTE' || tipo === 'PROPRIETARIO' || tipo === 'CONTRATO')" v-model="tabSelecionada" inverted no-pane-border align="justify">
              <endereco-edicao :tipo="tipo"
                               :ehArt="ehArt"
                               @atualizaEndereco="atualizaEndereco"
                               @getListEndereco="getListEndereco" />
                             </q-tabs>
          <endereco-edicao v-if="endereco.id === null && opened && (tipo !== 'CONTRATANTE' && tipo !== 'PROPRIETARIO' && tipo !== 'CONTRATO')"
                           :tipo="tipo"
                           :ehArt="ehArt"
                           @atualizaEndereco="atualizaEndereco"
                           @getListEndereco="getListEndereco" />
          <endereco-edicao v-show="endereco.id && endereco.cep !== '00000000' "
                           ref="enderecoEdicao"
                           :tipo="tipo"
                           :ehArt="ehArt"
                           @atualizaEndereco="atualizaEndereco"
                           @getListEndereco="getListEndereco" />

        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import Endereco from '../../models/Endereco.js'
import EnderecoEdicao from '../edicao/endereco-edicao'

export default {
  props: {
    tipo: String,
    ehArt: Boolean
  },
  components: { EnderecoEdicao },
  created () {
    this.endereco = new Endereco()
  },
  data () {
    return {
      opened: false,
      endereco: new Endereco(),
      tabSelecionada: null
    }
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    },
    atualizaEndereco (value) {
      this.$emit('atualizaEndereco', value)
      this.toggle()
    },
    getListEndereco (value) {
      this.$emit('getListEndereco', value)
      this.toggle()
    },
    verificaEndereco (enderecoView) {
      this.toggle()
      if (!enderecoView) {
        this.endereco = new Endereco()
        this.$refs.enderecoEdicao.verificaSeHaEndereco(enderecoView)
        this.$refs.enderecoEdicaoExterior.verifica(this.endereco)
      } else {
        this.endereco = enderecoView
        if (this.endereco.tipoLogradouro.id === 2024) {
          this.$refs.enderecoEdicaoExterior.verifica(enderecoView)
        } else {
          this.$refs.enderecoEdicao.verificaSeHaEndereco(enderecoView)
        }
      }
    },
    excluiEndereco (endereco) {
      if (endereco.postal === 'SIM') {
        this.$q.notify({ message: 'Para excluir esse endereço é necessário adicionar outro como postal.', type: 'negative', position: 'center', timeout: 1300 })
      } else {
        this.$axios
          .put('endereco/exclui-endereco/' + endereco.idString)
          .then(response => {
            if (response.data.type === 'SUCCESS') {
              this.$q.notify({ message: 'Excluído com sucesso', type: 'positive', position: 'center', timeout: 1000 })
              this.$emit('getListEndereco')
            }
          })
      }
    }
  }
}
</script>
