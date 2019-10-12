<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import axios from './plugins/axios'
export default {
  name: 'App',
  components: {
    axios
  },
  created () {
    let token = localStorage.getItem('TOKEN')
    if (token) {
      this.getUsuarioSessao()
    } else {
      this.$router.push('/indicacao-premio/login')
    }
  },
  methods: {
    getUsuarioSessao () {
      this.$axios
        .get('corporativo/usuario-sessao')
        .then(response => {
          this.$store.commit('user/setUser', response.data.data)
        }).catch(() => {
          this.$router.push('/indicacao-premio/login')
        })
    }
  }
}
</script>
