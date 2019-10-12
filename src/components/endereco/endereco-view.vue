<template>
  <div>
    <div v-if="enderecoView !== null">
        <div class="row gutter-sm">
        <div class="col-sm-3">
          <q-input
          disable
          v-if="enderecoView.tipoLogradouro"
              v-model="enderecoView.tipoLogradouro.descricao"
              float-label="LOGRADOURO"
              color="primary"/>
          </div>
        <div class="col-sm-3">
          <q-input
          disable
              v-model="enderecoView.logradouro"
              float-label="ENDEREÇO"
              color="secondary"/>
        </div>
        <div class="col-sm-3">
          <q-input
          disable
              v-model="enderecoView.numero"
              float-label="NÚMERO"
              color="secondary"/>
        </div>
        <div class="col-sm-3">
           <q-input
          disable
              v-model="enderecoView.complemento"
              float-label="COMPLEMENTO"
              color="secondary"/>
        </div>
        </div>
       <div class="row gutter-sm">
        <div class="col-sm-3">
          <q-input
          disable
              v-model="enderecoView.cep"
              float-label="CEP"
              color="secondary"/>
        </div>
        <div class="col-sm-3">
          <q-input
          disable
          v-if="enderecoView.uf"
              v-model="enderecoView.uf.sigla"
              float-label="UF"
              color="secondary"/>
        </div>
        <div class="col-sm-3">
           <q-input
          disable
          v-if="enderecoView.localidade"
              v-model="enderecoView.localidade.descricao"
              float-label="MUNICÍPIO"
              color="secondary"/>
        </div>
        <div class="col-sm-3">
               <q-input
          disable
              v-model="enderecoView.bairro"
              float-label="BAIRRO"
              color="secondary"/>
        </div>
        </div>
     </div>
  </div>
</template>
<script>
export default {
  props: ['enderecoView']
}
</script>
