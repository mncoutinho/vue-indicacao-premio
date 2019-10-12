<template>
  <div>
    <q-input :error="v.$error" @input="buscaPorCpf" :value="value" float-label="CPF" :inverted="estilo.inverted" :color="estilo.cor" maxlength="11" />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: ['v', 'value', 'estilo'],
  methods: {
    buscaPorCpf: _.debounce(function (value) {
      let cpf = value.replace(/\./g, '').replace(/-/g, '')
      this.$emit('input', cpf)
      if (cpf.length === 11) {
        this.$axios
          .get('pessoa/fisica/' + cpf)
          .then(response => {
            if (response.data.type === 'SUCCESS') {
              let pessoa = response.data.data[0]
              pessoa.type = 'SUCCESS'
              this.$emit('recebePessoa', pessoa)
            } else if (response.data.type === 'INFORMATION') {
              this.populaPessoa('INFORMATION', { 'cpf': cpf })
            }
          })
          .catch(() => {
            this.populaPessoa('ERROR', { 'cpf': cpf })
          })
      }
    }, 300),
    populaPessoa (type, resposta) {
      let pessoa = resposta
      pessoa.type = type
      this.$emit('recebePessoa', pessoa)
    }
  }
}
</script>
