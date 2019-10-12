<template>
  <div>

    <q-modal v-model="opened" :content-css="{minWidth: '20vw', minHeight: '25vh'}">
      <q-modal-layout>
      <q-toolbar slot="header" color="primary">
        <q-toolbar-title align="center">
          Editar Indicação
        </q-toolbar-title>
        <q-btn flat round dense color="white" icon="clear" v-close-overlay />
      </q-toolbar>
      <div style="padding: 20px">
        <div class="col-12 gutter-y-sm">
          <select-niveis
          :v="$v.premio.nivel"
          v-model="premio.nivel"/>
          <q-input
          v-model="premio.titulo"
          float-label="Título do Trabalho"
          color="secondary" />
        </div>
      </div>
      <q-card-separator />
      <div class="row justify-end" style="padding: 20px">
        <q-btn
          size="sm"
          @click.native="salvar()"
          icon="edit"
          rounded
          color="primary"
          label="Salvar"
        />
      </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>

import SelectNiveis from '../../components/selects/select-niveis'
import { required } from 'vuelidate/lib/validators'

import { dialog } from '../../mixins/mixin-dialog'
export default {
  mixins: [dialog],
  components: {
    SelectNiveis

  },
  data () {
    return {
      opened: false,
      premio: {}
    }
  },
  validations: {
    premio: {nivel: { required }}
  },
  methods: {
    async toggle (premio) {
      this.opened = !this.opened
      this.premio = premio
    },
    salvar () {
      delete this.premio.__index
      this.$axios
        .put('cadastro/instituicao-ensino/premio-tct', this.premio)
        .then(response => {
          this.toggle(this.premio)
        })
    }
  }
}
</script>
