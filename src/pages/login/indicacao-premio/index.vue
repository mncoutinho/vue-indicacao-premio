<template>
  <div class="index-page bg-grey-2 window-height window-width column items-center no-wrap">
    <div class="banner bg-primary flex-center">
    </div>
    <div class="card bg-white shadow-2 column no-wrap group">
      <div>
        <img src="~assets/crea_logo.png" class="responsive">
        <q-card-separator />
        <div class="row justify-center full-width">
          <span style="color: #cc0000; font-size: 18px; font-weight: bold; align: center;">{{homologacao}}</span>
        </div>
        <div class="q-mt-md">
          <q-tabs inverted no-pane-border>
            <q-tab default slot="title" name="tab-1" icon="fas fa-user" label="Login" />
            <q-tab slot="title" name="tab-2" icon="fas fa-user-plus" label="Registrar" />

            <q-tab-pane name="tab-1">
              <login />
              <modal-reenviar-senha />
            </q-tab-pane>
            <q-tab-pane name="tab-2">
              <registrar />
            </q-tab-pane>
          </q-tabs>
        </div>
      </div>
      <div class="text-center">
        Em caso de dúvidas, entre em contato através do e-mail: <label style="font-size: 12px;">premiocrea@crea-rj.org.br</label>
      </div>
    </div>
  </div>
</template>

<script>
import ModalReenviarSenha from '../../../components/modais/modal-reenviar-senha'
import Registrar from '../registrar'
import Login from '../login'
export default {
  components: {
    Registrar,
    Login,
    ModalReenviarSenha
  },
  data () {
    return {
      homologacao: process.env.AMBIENTE !== 'PROD' ? 'HOMOLOGAÇÃO' : ''
    }
  }
}
</script>

<style lang="stylus">
.index-page
  .banner
    height 25vh
    width 100%
    font-size 15vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
  .card
    width 80vw
    max-width 500px
    padding 10px 25px
    margin-top -90px
    border-radius 2px
    img
      height 89px
      width 385px
.q-tabs-head:not(.scrollable) .q-tabs-scroller, .q-tabs-head:not(.scrollable) .q-tab {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
}
.q-tab {
  height: 10px;
  font-size: 13px;
  padding-left: 10px;
  padding-right: 10px;
}
.q-tab-icon { font-size: 20px; }
</style>
