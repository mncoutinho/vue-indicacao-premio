<template>
  <div>
    <div class="row gutter-sm">
      <div class="col-md-4">
        <uf-paises :idPais="endereco.uf.id" @atualizaPais="atualizaPais" />
      </div>
      <div class="col-md-8">
        <q-field icon="fas fa-asterisk"
                 icon-color="red-8">
          <q-input v-model="endereco.logradouro" float-label="Endereço" maxlength="100" />
        </q-field>
      </div>
    </div>
    <div class="row gutter-sm">
      <div class="col-md-4">
        <q-field icon="fas fa-asterisk"
                 icon-color="red-8">
          <q-input v-model="endereco.bairro" float-label="Bairro" maxlength="70" />
        </q-field>
      </div>
      <div class="col-md-3">
        <q-input v-model="endereco.numero" float-label="Número" maxlength="15" />
      </div>
      <div class="col-md-5">
        <q-input v-model="endereco.complemento" float-label="Complemento" maxlength="30" />
      </div>
    </div>
    <q-card-separator class="q-mt-md" />
    <div class="row justify-end q-mt-md" style="padding: 20px">
      <q-btn v-if="!endereco.id"
             icon="save" color="dark"
             size="sm"
             flat rounded
             label="Adicionar"
             @click.native="adiciona()" />
      <q-btn v-if="endereco.id"
             icon="save" color="dark"
             size="sm"
             flat rounded
             label="Salvar"
             @click.native="atualiza()" />
    </div>
  </div>
</template>
<script>
import Endereco from '../../models/Endereco.js'
import UfPaises from '../campos/uf-paises'
export default {
  props: {
    tipo: String,
    enderecoView: Object
  },
  components: { Endereco, UfPaises },
  created () {
    this.endereco = new Endereco('EXTERIOR')
  },
  data () {
    return {
      endereco: new Endereco('EXTERIOR')
    }
  },
  methods: {
    verifica (endereco) {
      if (!endereco) {
        this.endereco = new Endereco('EXTERIOR')
        this.ehEdicao = false
      } else {
        this.endereco = Object.assign({}, endereco)
        if (this.tipo === 'CONTRATANTE' || this.tipo === 'CONTRATO' || this.tipo === 'PROPRIETARIO') {
          this.ehEdicao = true
          this.ehArt = true
        }
      }
    },
    adiciona () {
      if (this.validaEndereco()) {
        this.$axios
          .post('endereco', this.endereco)
          .then(response => {
            this.$emit('atualizaEndereco', response.data.data)
            this.$q.notify({ message: 'Salvo com sucesso', type: 'positive', position: 'center', timeout: 1000 })
          })
      } else {
        this.$q.notify({ message: 'Preencher os campos obrigatorios', type: 'negative', position: 'center', timeout: 1000 })
      }
    },
    atualiza () {
      if (this.validaEndereco()) {
        this.$axios
          .put('endereco/art', this.endereco)
          .then(response => {
            this.$emit('atualizaEndereco', response.data.data)
            this.$q.notify({ message: 'Salvo com sucesso', type: 'positive', position: 'center', timeout: 1000 })
          })
      } else {
        this.$q.notify({ message: 'Preencher os campos obrigatorios', type: 'negative', position: 'center', timeout: 1000 })
      }
    },
    validaEndereco () {
      return this.endereco.uf.id !== '' && this.endereco.bairro !== '' && this.endereco.bairro !== null && this.endereco.logradouro !== ''
    },
    atualizaPais (idPais) {
      this.endereco.uf.id = idPais
    }
  }
}
</script>
