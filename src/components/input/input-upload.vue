<template>
  <div>
    <q-uploader
      v-if="!this.uploadExecutado"
      ref="uploader"
      :color="color"
      extensions=".pdf"
      :error="arquivoInvalido"
      inverted
      auto-expand
      hide-upload-button
      :url="url()"
      :float-label = "label"
      :additionalFields=(additionalFields)
      @add = "add"
      @remove:abort = "removeAbort"
      @uploaded = "uploaded"
      @fail="fail"
      @finish="finish"
      :headers="{'Authorization': tokenLogin }"
    />
    <q-list v-if="this.uploadExecutado"
      highlight
      inset-separator >
      <q-item link >
        <q-item-side
        icon="file_copy" />
        <q-item-main
        link
        @click.native="download"
        :label="this.arquivoDTO.nomeOriginal"
        label-lines="1" />
        <q-item-side right>
          <q-btn
          @click="clickBotaoDeletar"
          flat
          round
          dense
          icon="delete_sweep"
          color="red-9"  />
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>
<script>
const TIMEOUT = 4000
import { openURL } from 'quasar'
import { notify } from '../../mixins/mixin-notify'
export default {
  mixins: [notify],
  mounted () {
    if (this.arquivo.uri) {
      this.uploadExecutado = true
    }
    this.tokenLogin = localStorage.getItem('TOKEN')
    this.turnArrayAdditionalFieldsDefault()
  },
  props: {
    tamanho: String,
    label: String,
    color: String,
    arquivo: Object,
    parametros: Object
  },
  data () {
    return {
      arquivoInvalido: false,
      uploadExecutado: false,
      arquivoDTO: this.arquivo,
      additionalFields: [{name: 'modulo', value: this.arquivo.modulo}, {name: 'privado', value: this.arquivo.privado}],
      additionalFieldsDefault: [{name: 'modulo', value: this.arquivo.modulo}, {name: 'privado', value: this.arquivo.privado}],
      tokenLogin: ''
    }
  },
  methods: {
    add (e) {
      /* console.log('Triggered when file is picked for upload ') */
      if (this.parametros !== undefined) {
        if (!this.parametros.tipo.includes(e[0].type) || e[0].size > this.parametros.tamanho) {
          this.arquivoInvalido = true
          this.$refs.uploader.abort()
          this.mostrarMensagem('Inserir um arquivo do tipo pdf e menor que 20 MB', 'negative', TIMEOUT)
        } else {
          this.arquivoInvalido = false
        }
      } else {
        this.arquivoInvalido = false
      }
      // console.log(file.name)
      if (!this.arquivoInvalido) {
        this.turnArrayAdditionalFieldsDefault()
        var files = e, i, file
        for (i = 0, file = files[i]; i !== files.length; ++i) {
          this.additionalFields.push({name: 'name', value: file.name})
          this.additionalFields.push({name: 'size', value: file.size})
          this.$refs.uploader.upload()
          this.arquivoInvalido = false
        }
      }
    },
    removeAbort (file) {
      this.$refs.uploader.abort()
    },
    removeCancel (file) {
      /* Triggered when file is removed from upload queue before uploading
      console.log('Triggered when file is removed from upload queue before uploading ' + JSON.stringify(file)) */
    },
    removeDone (file) {
      /* Triggered when file is removed from upload list after it has been uploaded
      console.log('Triggered when file is removed from upload list after it has been uploaded ' + JSON.stringify(file)) */
    },
    uploaded (file, xhr) {
      /* Triggered individually for each file that has just been uploaded
      console.log('Triggered individually for each file that has just been uploaded ' + JSON.stringify(file) + ' - ' + JSON.stringify(xhr)) */
      let response = JSON.parse(xhr.response)
      this.arquivoDTO = response.data
      this.uploadExecutado = true
      this.turnArrayAdditionalFieldsDefault()
      this.$emit('salvaArquivo', response)
    },
    fail (file, xhr) {
      console.log(file, 'testeeeeeeeeeeee')
      /* Triggered individually for each file that has encountered error while uploading
      console.log('Triggered individually for each file that has encountered error while uploading ' + JSON.stringify(file) + ' - ' + JSON.stringify(xhr)) */
      this.mostrarMensagem('Infelizmente não conseguimos concluir o Upload. Favor tentar novamente.', 'negative', TIMEOUT)
    },
    start (file) {
      /* Triggered when upload has started
      console.log('Triggered when upload has started ' + JSON.stringify(file)) */
    },
    finish (file) {
      /* Triggered when upload of file(s) has ended (with success or failure)
      console.log('Triggered when upload of file(s) has ended (with success or failure) ' + JSON.stringify(file)) */
    },
    clickBotaoDeletar () {
      this.$emit('deletarArquivo', this.arquivoDTO)
    },
    deletarFisicamente (id) {
      this.$axios
        .delete('commons/arquivo/' + id)
        .then(response => {
          this.arquivoDTO = this.arquivo
          this.uploadExecutado = false
          this.turnArrayAdditionalFieldsDefault()
        })
        .catch(() => {
          this.mostrarMensagem('Desculpe! Não conseguimos completar sua requisição. Por favor tente novamente.', 'negative', TIMEOUT)
        })
    },
    turnArrayAdditionalFieldsDefault () {
      this.additionalFields.length = 0
      this.additionalFields.push.apply(this.additionalFields, this.additionalFieldsDefault)
    },
    url () {
      return process.env.API + '/rest-api/crea/commons/arquivo'
    },
    download () {
      openURL(process.env.API + '/rest-api/crea' + this.arquivoDTO.uri)
    },
    openURL
  }
}
</script>
