<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Integra Instituição de Ensino
          <span style="color: #cc0000; font-size: 18px; font-weight: bold;">{{homologacao}}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null" >
      <q-card color="faded">
        <q-item>
          <q-item-main
            class="text-bold"
            style="font-size: 14px; margin-left: 30px; margin-top: 8px"
            :label="user.nome || user.razaoSocial">
          </q-item-main>
        </q-item>
      </q-card>
      <br />
      <q-collapsible v-for="m in this.$store.getters['user/getMenu']" :key="m.id" :icon="m.icon" :label="m.label.toUpperCase()">
        <q-item v-for="c in m.children"  link :to="c.router" :key="c.label" class="q-body-1">
          {{c.label}}
        </q-item>
      </q-collapsible>
      <q-btn size="15px" class="full-width" align="left" color="grey-8" @click="$router.push('/premio-crearj/fale-conosco')" flat>
        <q-icon size="20px" color="grey-7" name="fas fa-headset" />
        &nbsp;&nbsp;&nbsp;&nbsp;<q-item>Fale Conosco</q-item>
      </q-btn>
      <q-btn size="15px" class="full-width" align="left" color="grey-8" @click="sair()" flat>
        <q-icon size="20px" color="grey-7" name="lock" />
        &nbsp;&nbsp;&nbsp;&nbsp;<q-item>Sair</q-item>
      </q-btn>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { openURL } from 'quasar'
import listMenu from 'assets/menu'
export default {
  name: 'LayoutDefault',
  mounted () {
    this.user = this.$store.getters['user/getUser']
  },
  updated () {
    this.user = this.$store.getters['user/getUser']
  },
  data () {
    return {
      listMenu,
      listaMenu: [],
      user: {},
      leftDrawerOpen: this.$q.platform.is.desktop,
      selected: null,
      homologacao: process.env.AMBIENTE !== 'PROD' ? ' - HOMOLOGAÇÃO' : ''
    }
  },
  methods: {
    openURL,
    sair () {
      this.$store.commit('user/offUser')
      this.$router.push('/indicacao-premio/login')
      this.$q.notify({message: 'Usuário saiu do sistema', type: 'positive'})
    }
  }
}
</script>
<style scoped>
.q-card{
  border-radius: 0%;
  height: 50px;
}
</style>
