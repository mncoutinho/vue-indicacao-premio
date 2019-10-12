<template>
  <div>
    <q-btn v-if="!idEndereco"
           label="Adicionar Endereço"
           size="sm"
           class="full-width q-mt-lg"
           rounded
           color="primary"
           icon="fas fa-map-marked-alt"
           @click="$refs.modalEndereco.verificaEndereco(enderecoView)" />
    <q-card v-if="idEndereco">
      <q-card-title>
        <label id="label-view">ENDEREÇO {{titulo}} <q-icon v-if="tipoEndereco !== 'PROPRIETARIO'" name="fas fa-asterisk" color="red-9" size="6px" /></label>
        <div slot="right" class="row items-center">
          <q-btn v-show="exibirBotao"
                 label="Editar"
                 size="sm"
                 flat dense rounded color="secondary" class="q-mr-md"
                 @click="$refs.modalEndereco.verificaEndereco(enderecoView)" />
          <q-btn v-if="exibirBotao"
                 label="Excluir"
                 :loading="showLoandingBtn"
                 flat dense rounded color="red-9" size="sm"
                 @click="excluiEndereco(idEndereco)" />
        </div>
      </q-card-title>
      <q-card-main>
        <endereco-view v-if="idEndereco"
                       class="q-mt-sm"
                       :enderecoView="enderecoView" />
      </q-card-main>
    </q-card>
    <modal-endereco ref="modalEndereco"
                    :tipo="tipoEndereco"
                    :ehArt="ehArt"
                    @atualizaEndereco="atualizaEndereco" />
  </div>
</template>
<script>
import Endereco from '../models/Endereco.js'
import ModalEndereco from './modal/modal-endereco'
import EnderecoView from './endereco-view'
import _ from 'lodash'
export default {
  props: {
    idEndereco: String,
    tipoEndereco: String,
    titulo: String,
    ehArt: Boolean
  },
  components: {
    EnderecoView,
    ModalEndereco,
    Endereco
  },
  created () {
    this.enderecoView = new Endereco()
    this.getEndereco()
  },
  data () {
    return {
      showLoandingBtn: false,
      enderecoView: {}
    }
  },
  methods: {
    getEndereco () {
      if (this.idEndereco) {
        this.$axios
          .get('endereco/busca-endereco/' + this.idEndereco)
          .then(response => {
            this.enderecoView = response.data.data
          })
      }
    },
    atualizaEndereco: _.debounce(function (value) {
      if (value) {
        this.enderecoView = Object.assign({}, value)
        this.$emit('atualizaEndereco', value)
      } else {
        this.enderecoView = new Endereco()
        this.$emit('atualizaEndereco')
      }
      this.showLoandingBtn = false
    }, 1500),
    excluiEndereco (idEndereco) {
      this.showLoandingBtn = true
      this.$axios
        .put('endereco/exclui-endereco/' + idEndereco)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.atualizaEndereco()
            this.$q.notify({ message: 'Excluído com sucesso', type: 'positive', position: 'center', timeout: 1000 })
          }
        })
    }
  },
  watch: {
    idEndereco (value, oldValue) {
      this.getEndereco()
    }
  },
  computed: {
    exibirBotao () {
      if (this.tipoEndereco === 'CONTRATO') {
        if (this.$store.getters['art/unidadeAdministrativaEhSede']) {
          return false
        }
      }
      if (this.tipoEndereco === 'CONTRATO' || this.tipoEndereco === 'CONTRATANTE') {
        if (this.$store.getters['art/getIdTipo'] === 1 && this.$store.getters['art/getNumeroArtPrincipal'] !== '') {
          return false
        }
      }
      if (this.idEndereco) {
        return true
      }
    }
  }
}
</script>
