<template>
  <div>
    <q-modal v-model="opened" :content-css="{minWidth: '78vw', minHeight: '30vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" color="dark">
          <q-toolbar-title align="center">
            Confirmação de Endereço
          </q-toolbar-title>
          <q-btn icon="clear"
                 flat round dense color="white"
                 @click.native="naoConfirma()"/>
        </q-toolbar>
        <div class="q-pa-md">
          <p>Deseja utilizar o endereço abaixo?</p>
          <endereco-view v-if="opened" :enderecoView="enderecoView" />
        </div>
        <q-card-separator />
        <div class="row justify-end q-pa-md">
          <q-btn label="NÃO"
                  class="q-mr-sm"
                  flat rounded color="red-9"
                  @click.native="naoConfirma()" />
          <q-btn label="SIM"
                  flat rounded
                  color="secondary"
                  @click.native="confirma()" />
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import EnderecoView from '../endereco-view'
export default {
  props: ['enderecoView'],
  components: {
    EnderecoView
  },
  data () {
    return {
      opened: false
    }
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    },
    confirma () {
      let endereco = Object.assign({}, this.enderecoView)
      endereco.tipoEndereco.id = 7
      endereco.id = null
      endereco.idString = null
      this.$axios
        .post('endereco', endereco)
        .then(response => {
          this.$emit('enderecoConfirmado', response.data.data)
          this.$q.notify({ message: 'Salvo com sucesso', type: 'positive', position: 'center', timeout: 1000 })
        })
      this.toggle()
    },
    naoConfirma () {
      this.$emit('enderecoConfirmado')
      this.toggle()
    }
  }
}
</script>
