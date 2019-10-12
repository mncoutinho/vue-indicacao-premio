<template>
  <div>
    <div>
      <q-item style="font-size: 13px; opacity: 0.7; color:#001a66; cursor: pointer; text-align: right" @click.native="toggle()">Esqueceu a senha?</q-item>
    </div>
    <q-modal v-model="opened" :content-css="{minWidth: '42vw', minHeight: '29vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" color="dark">
          <q-toolbar-title align="center">
            Reenviar Senha
          </q-toolbar-title>
          <q-btn
            flat
            round
            dense
            color="white"
            icon="clear"
            v-close-overlay/>
        </q-toolbar>
          <div class="q-ml-lg" >
            <br/>
            <div class="row">
              <q-input :error="$v.cpfInput.$error" @input="verificaCpf" type="text" v-model="cpfInput" float-label="CPF"  color="primary"></q-input>
            </div>
          </div>
          <br/>
          <div class="row justify-end" style="padding: 20px">
              <q-btn
                size="sm"
                icon="arrow_upward"
                color="secondary"
                @click="reenviarSenha()"
                label="Enviar"/>
          </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { notify } from '../../mixins/mixin-notify'
import _ from 'lodash'
export default {
  mixins: [notify],
  data () {
    return {
      cpfInput: '',
      opened: false
    }
  },
  validations: {
    cpfInput: { required }
  },
  methods: {
    toggle () {
      this.$v.$reset()
      this.cpfInput = ''
      this.opened = !this.opened
    },
    verificaCpf: _.debounce(function () {
      this.cpfInput = this.cpfInput.replace(/\./g, '').replace(/-/g, '')
      if (this.cpfInput.length >= 11) {
        this.$axios
          .get('pessoa/fisica/' + this.cpfInput)
          .then(response => {
            if (response.data.type === 'INFORMATION') {
              this.mostrarMensagem('Você deve se cadastrar primeiro', 'negative', 1500)
            }
          })
      }
    }, 300),
    reenviarSenha: _.debounce(function () {
      this.$v.cpfInput.$touch()
      if (!this.$v.cpfInput.$error) {
        let authDto = { login: this.cpfInput, tipo: 'LEIGOPF' }
        this.$axios
          .post('/corporativo/auth/gerar-senha', authDto)
          .then(response => {
          })
        this.toggle()
      } else {
        this.mostrarMensagem('Preencher o campo CPF', 'negative', 1500)
      }
    }, 1000)
  }
}
</script>
