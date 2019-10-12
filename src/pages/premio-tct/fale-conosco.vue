<template>
  <q-page class="layout-padding justify-center">
      <div>
      <div class="row gutter-x-sm gutter-y-sm">
        <div class="col-12">
           <q-select float-label="Motivo"
                     color="secondary"
                     v-model="dto.issue.tracker_id"
                     :options="[
                     {value: 1, label: 'Erro no sistema'},
                     {value: 65, label: 'Ausência de Curso na Lista do Sistema'},
                     {value: 66, label: 'Sobre a Premiação'},
                     {value: 67, label: 'Dúvida sobre regulamento da Premiação'}]"
                     :error="dto.issue.tracker_id === 0" />
        </div>
        <br>
        <div class="col-12">
            <q-input v-model="dto.issue.email"
                float-label="Informe seu Email"
                 color="dark"
                 :error="$v.dto.issue.email.$error"
            />
        </div>
        <div class="col-12">
            <q-input v-model="dto.issue.subject"
                float-label="Descreva o assunto"
                 color="dark"
                 :error="$v.dto.issue.subject.$error"
            />
        </div>
        <div class="col-12">
            <q-input v-model="dto.issue.description"
                float-label="Descreva aqui o motivo"
                type="textarea"
                color="dark" rows="5"
                :error="$v.dto.issue.description.$error"
                maxlength="1000"
            />
        </div>
        <div class="col-12 justify-end">
          <q-btn   style="margin-top:20px;"
                  class="full-width q-mt-lg q-mb-sm"
                  outline
                  size="sm"
                  rounded inverted color="blue-10" icon="send"  @click="enviar" label="Enviar" />
        </div>
       </div>
    </div>
  </q-page>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      dto: {
        issue: {
          project_id: 18,
          email: '',
          subject: '',
          description: '',
          tracker_id: 0
        }
      }
    }
  },
  validations: {
    dto: {
      issue: {
        tracker_id: { required },
        email: { required },
        subject: { required },
        description: { required }
      }
    }
  },
  methods: {
    enviar () {
      this.$v.$touch()
      if (this.$v.dto.$error || this.dto.issue.tracker_id === 0) {
        this.$q.notify({ message: 'Preencha os campos obrigatórios!', type: 'negative', position: 'center', timeout: 1000 })
      } else {
        let destinatario = ''
        if (this.dto.issue.tracker_id === 1 || this.dto.issue.tracker_id === 65) {
          destinatario = {nome: 'ATEC', email: 'atec@crea-rj.org.br'}
        } else {
          destinatario = {nome: 'Prêmio', email: 'premiocrea@crea-rj.org.br'}
        }
        let emailEnvioDto = { assunto: 'Indicação Prêmio TCT - ' + this.dto.issue.subject, mensagem: this.dto.issue.description, emissor: this.dto.issue.email, destinatarios: [destinatario] }
        this.$axios
          .post('/commons/email/envia', emailEnvioDto)
          .then(response => {
            this.$q.notify({ message: 'Mensagem enviada com sucesso!', type: 'positive', position: 'center', timeout: 1000 })
            this.dto.issue.subject = ''
            this.dto.issue.description = ''
            this.dto.issue.tracker_id = 0
            this.$v.$reset()
          })
      }
    }
  }
}
</script>
