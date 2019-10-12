<template>
    <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
      <q-toolbar slot="header" color="dark">
        <q-toolbar-title align="center">
          Dados da Indicação
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          color="white"
          icon="clear"
          v-close-overlay/>
      </q-toolbar>
      <q-card class="layout-padding">
        <q-card-title  class="bg-grey-3" text-color="white">
          <label  id="label-view"> Indicação</label>
        </q-card-title>
        <q-card-main style="margin-top:10px" class="q-ml-sm" >
          <br/>
          <div  class="row gutter-xs justify-between">
            <div class="col-md-6" >
              <label  id="internal-label">TÍTULO: </label><span id="span-view">{{premio.titulo}}</span>
            </div>
            <div class="col-md-6">
              <label id="internal-label">NÍVEL:</label><span id="span-view">{{premio.nivel}}</span>
            </div>
          </div>
          <div v-if="premio.length > 0" class="row gutter-xs justify-between">
            <div class="col-md-6">
              <label id="internal-label">ARQUIVO: </label><span id="span-view">{{premio.arquivo.id ? 'Enviado' : 'Não enviado'}}</span>
            </div>
            <div class="col-md-6">
              <label id="internal-label">ANO:</label><span id="span-view">{{premio.ano}}</span>
            </div>
          </div>
          <div v-if="premio.length > 0" class="row gutter-xs justify-between">
            <div class="col-md-6">
              <label v-if="premio.instituicao" id="internal-label">INSTITUIÇÃO:</label><span id="span-view"> {{premio.instituicao.descricao}} </span>
            </div>
            <div v-if="premio.length > 0"  class="col-md-6">
              <label v-if="premio.curso" id="internal-label">CURSO: </label><span id="span-view">{{premio.curso.descricao}}</span>
            </div>
          </div>
          <div v-if="premio.length > 0" class="row gutter-xs justify-between">
            <div class="col-md-6">
              <label v-if="premio.campus" id="internal-label">CAMPOS:</label><span id="span-view"> {{premio.campus.descricao}}</span>
            </div>
            <div v-if="premio.length > 0"  class="col-md-6">
              <label id="internal-label">DATA DE ENVIO: </label><span id="span-view">{{premio.dataEnvioFormatada}}</span>
            </div>
          </div>
          <div v-if="premio.length > 0" class="row gutter-xs justify-between">
            <div class="col-md-6">
              <label id="internal-label">STATUS: </label><span id="span-view">{{premio.status ? 'FINALIZADA - CONCORDOU COM O TERMO' : 'NÃO FINALIZADA'}}</span>
            </div>
          </div>
        </q-card-main>
      </q-card>
        <div>
          <q-table ref="table"
                   color="primary"
                   row-key="codigo"
                   :data="participantes"
                   :columns="columns"
                   no-data-label = "Não possui participantes.">
            <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="cpf" :props="props">
                <small class="text-italic">{{ props.row.cpf }}</small>
              </q-td>
              <q-td key="pessoa" :props="props">
                <small class="text-italic">{{ props.row.pessoa.nome}}</small>
              </q-td>
              <q-td key="papel" :props="props">
                <small class="text-italic" v-if="props.row.papel === '1'">Autor</small>
                <small class="text-italic" v-if="props.row.papel === '2'">Avaliador</small>
                <small class="text-italic" v-if="props.row.papel === '3'">Coorientador</small>
                <small class="text-italic" v-if="props.row.papel === '4'">Orientador</small>
                <small class="text-italic" v-if="props.row.papel === '5'">Comissão de Seleção</small>
              </q-td>
              <q-td key="email" :props="props">
                <small class="text-italic">{{ props.row.email}}</small>
              </q-td>
              <q-td key="telefone" :props="props">
                <small class="text-italic">{{ props.row.telefone}}</small>
              </q-td>
            </q-tr>
          </q-table>
        </div>
      </q-modal-layout>
    </q-modal>
</template>
<script>
export default {
  data () {
    return {
      opened: false,
      participantes: [],
      premio: [],
      columns: [
        { name: 'cpf', align: 'left', label: 'Nome', field: row => 'cpf' },
        { name: 'pessoa', align: 'left', label: 'Nome', field: row => row.pessoa },
        { name: 'papel', align: 'left', label: 'Tipo', field: row => 'papel' },
        { name: 'email', align: 'left', label: 'Email', field: 'email' },
        { name: 'telefone', align: 'left', label: 'Telefone', field: 'telefone' }
      ]
    }
  },
  methods: {
    async toggle (idPremio) {
      if (!this.opened) {
        this.$axios
          .get('cadastro/instituicao-ensino/premio-tct/participantes/' + idPremio)
          .then(response => {
            this.participantes = response.data.data
            this.opened = !this.opened
          })
        this.getPremio(idPremio)
      } else {
        this.opened = !this.opened
      }
    },
    getPremio (idPremio) {
      this.$axiosClean
        .get('cadastro/instituicao-ensino/premio-tct/premio/' + idPremio)
        .then(response => {
          this.premio = response.data.data
        })
    }
  }
}

</script>
