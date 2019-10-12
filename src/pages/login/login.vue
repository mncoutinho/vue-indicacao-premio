<template>
  <div>
    <q-input
    class="full-width q-mt-xs"
    :error="$v.auth.login.$error"
    v-model="auth.login"
    float-label="CPF"
    :placeholder="'Digite seu CPF'" />
    <q-input
    class="full-width q-mt-md"
    :error="$v.auth.senha.$error"
    type="password" v-model="auth.senha"
    float-label="Senha"
    placeholder="Digite sua senha"
    @keyup.enter="autenticar()" />

    <q-btn
     color="primary"
     size="12px" rounded
     @click="autenticar()"
     class="full-width q-mt-lg q-mb-lg"
     icon="vpn_key" wait-for-ripple label="Acessar" />
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { notify } from '../../mixins/mixin-notify'
import { debounce } from 'quasar'
export default {
  mixins: [notify],
  data () {
    return {
      auth: {}
    }
  },
  validations: {
    auth: { senha: { required }, login: { required } }
  },
  methods: {
    autenticar: debounce(function (value) {
      this.$v.auth.$touch()
      if (!this.$v.auth.$error) {
        let credentials = {
          tipo: 'CPF',
          login: this.auth.login,
          senha: this.auth.senha
        }
        this.$axios
          .post('corporativo/login/cpf-cnpj', credentials)
          .then(response => {
            if (response.data.type === 'SUCCESS') {
              localStorage.setItem('TOKEN', response.data.data.token)
              this.$store.commit('user/setUser', response.data.data)
              this.$router.push('/')
            }
          })
      } else {
        this.mostrarMensagem('Preencher todos os campos obrigatorios.', 'negative', 1500)
      }
    }, 3000, true) // true, dispara a função de inicio e impede o segundo disparo até que se passe o delay definido
  }
}
</script>
