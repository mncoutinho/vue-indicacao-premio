<template>
  <div>
    <q-card color="lime-1" text-color="dark">
      <q-card-title>
         Aceite do regulamento e finalizar inscrição
      </q-card-title>
      <q-card-main>
        <modal-aceite-termo-premio></modal-aceite-termo-premio>
        <q-checkbox :disable="!validacao" keep-color v-model="aceite" color="secondary" label="Li e concordo com o termo" @input="atualizaAceite" :title="textoValidacaoAceite" />
      </q-card-main>
      <q-card-actions>
        <q-btn :disable="!aceite || !validacao"
                class="full-width"
                @click="$emit('aceitarEFinalizarInscricao')"
                color="green-9"
                rounded
                size="sm"
                label="Finalizar e enviar indicação" :title="textoValidacao" />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import ModalAceiteTermoPremio from '../modais/modal-aceite-termo-premio'
export default {
  props: ['validacao'],
  components: {
    ModalAceiteTermoPremio
  },
  data () {
    return {
      aceite: false,
      textoValidacao: 'Só será permitido finalizar a indicação após o preenchimento do formulário, a inclusão do arquivo, dos participantes obrigatórios e do aceite do termo',
      textoValidacaoAceite: 'Só será permitido finalizar a indicação após o preenchimento do formulário, a inclusão do arquivo, dos participantes obrigatórios'
    }
  },
  methods: {
    atualizaAceite (value) {
      this.$emit('atualizaAceite', value)
    },
    limpar () {
      this.aceite = false
    }
  }
}
</script>
