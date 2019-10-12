<template>
    <q-field
             label="Busca por CEP:"
             helper="Ex: 20070022">
      <q-input :value="value.cep"
               v-mask="'########'"
               float-label="CEP"
               placeholder="20070022"
               maxlength
               type="text"
               @input="buscaCep" />
    </q-field>
</template>
<script>
import Endereco from '../../models/Endereco.js'
import {mask} from 'vue-the-mask'
import _ from 'lodash'
export default {
  components: { Endereco },
  props: ['value', 'idEndereco'],
  directives: {mask},
  methods: {
    buscaCep: _.debounce(function (value) {
      if (String(value).length === 8) {
        this.$axios
          .get('endereco/' + value)
          .then(response => {
            let endereco = response.data.data
            endereco.tipoEndereco = { id: '', descricao: '' }
            endereco.id = this.idEndereco
            endereco.idString = this.idEndereco
            this.$emit('input', endereco)
          })
          .catch(() => {
            let endereco = new Endereco()
            endereco.id = this.idEndereco
            endereco.idString = this.idEndereco
            this.$q.notify({ message: 'Endereço não localizado pelo CEP informado. Favor preencher o endereço nos campos abaixo.', type: 'negative', position: 'center', timeout: 2000 })
            endereco.cep = value
            this.$emit('input', endereco)
          })
      }
    }, 10)
  }
}
</script>
