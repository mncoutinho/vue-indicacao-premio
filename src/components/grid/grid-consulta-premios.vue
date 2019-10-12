<template>
  <div>
     <q-table
      ref="table"
      color="primary"
      class="no-border-grid"
      row-key="codigo"
      :data="listPremios"
      :columns="columns"
      :loading = loading
      no-data-label = "Nenhuma indicação para este filtro.">
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="acao" :props="props">
          <div>
            <q-btn flat round dense icon="more_horiz">
              <q-popover>
                <q-list link>
                  <q-item v-if="ADMIN" v-close-overlay @click.native="$refs.modalResponsavelIndicacao.toggle(props.row.idPessoa)">
                    <q-btn icon="assignment" flat size="sm" dense label="Dados do Responsável pela Indicação" />
                  </q-item>
                  <q-item v-if="ADMIN" v-close-overlay @click.native="$refs.modalDadosPremio.toggle(props.row.id)">
                    <q-btn icon="assignment" flat size="sm" dense label="Dados da Indicação" />
                  </q-item>
                  <q-item v-close-overlay @click.native="$refs.modalParticipantes.toggle(props.row.id)">
                    <q-btn icon="search" flat size="sm" dense label="Participantes" />

                  </q-item>
                  <q-item v-close-overlay @click.native="$refs.modalCadastraAutoridade.toggle(props.row.id)">
                    <q-btn icon="add" flat size="sm" dense label="Cadastrar Autoridade" />
                  </q-item>
                  <q-item v-close-overlay @click.native="download(props.row.arquivo.uri)">
                    <q-btn
                      icon="cloud_download"
                      flat
                      size="sm" dense
                      label="Download Trabalho" />
                  </q-item>
                  <q-item v-close-overlay @click.native="download(props.row.arquivoResumo.uri)">
                    <q-btn
                      icon="cloud_download"
                      flat
                      size="sm" dense
                      label="Download Resumo" />
                  </q-item>
                  <q-item v-close-overlay @click.native="download(props.row.arquivoTermo.uri)">
                    <q-btn
                      icon="cloud_download"
                      flat
                      size="sm" dense
                      label="Download Termo" />
                  </q-item>
                  <q-item v-close-overlay @click.native="excluir(props.row.id)">
                    <q-btn
                      icon="delete"
                      flat
                      size="sm" dense
                      label="Excluir" />
                  </q-item>
                  <q-item v-close-overlay @click.native="$refs.modalEditarIndicacao.toggle(props.row)">
                    <q-btn icon="edit" flat size="sm" dense label="Editar" />
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
             <modal-editar-indicacao ref="modalEditarIndicacao"/>
          </div>
        </q-td>
        <q-td key="instituicao" :props="props">
          <small class="text-italic">{{ props.row.instituicao.nome.substring(0,40)}}</small>
          <q-tooltip>{{ props.row.instituicao.nome }}</q-tooltip>
        </q-td>
        <q-td key="campus" :props="props">
          <small class="text-italic">{{ props.row.campus.nome.substring(0,20)}}</small>
          <q-tooltip>{{ props.row.campus.nome }}</q-tooltip>
        </q-td>
        <q-td key="curso" :props="props">
          <span v-if="props.row.curso.nome !== null">
            <small class="text-italic">{{ props.row.curso.nome.substring(0,25)}}</small>
            <q-tooltip>{{ props.row.curso.nome }}</q-tooltip>
          </span>
          <span v-if="props.row.curso.nome === null">
            <small v-if="props.row.descricaoCurso !== null && props.row.descricaoCurso.length > 12" class="text-italic">{{ props.row.descricaoCurso.substring(0,12)}}</small>
            <small v-if="props.row.descricaoCurso !== null && props.row.descricaoCurso.length <= 12" class="text-italic">{{ props.row.descricaoCurso}}</small>
            <q-tooltip>{{ props.row.descricaoCurso }}</q-tooltip>
          </span>
        </q-td>
        <q-td key="titulo" :props="props">
          <span v-if="props.row.titulo !== null">
            <small v-if="props.row.titulo.length > 12" class="text-italic">{{ props.row.titulo.substring(0,12)}}</small>
            <small v-if="props.row.titulo.length <= 12" class="text-italic">{{ props.row.titulo}}</small>
            <q-tooltip>{{ props.row.titulo }}</q-tooltip>
          </span>
        </q-td>
        <q-td key="dataEnvio" :props="props">
          <small class="text-italic">{{ props.row.dataEnvioFormatada }}</small>
        </q-td>
        <q-td key="ano" :props="props">
          <small class="text-italic">{{ props.row.ano }}</small>
        </q-td>
        <q-td key="arquivo" :props="props">
          <q-icon v-if="props.row.arquivo.id" name="check" size="16px" color="green-9" title="Arquivo enviado" />
          <q-icon v-if="!props.row.arquivo.id" name="clear" size="16px" color="red-9" title="Arquivo não enviado" />
        </q-td>
        <q-td key="resumo" :props="props">
          <q-icon v-if="props.row.arquivoResumo.id" name="check" size="16px" color="green-9" title="Arquivo enviado" />
          <q-icon v-if="!props.row.arquivoResumo.id" name="clear" size="16px" color="red-9" title="Arquivo não enviado" />
        </q-td>
          <q-td key="termo" :props="props">
          <q-icon v-if="props.row.arquivoTermo.id" name="check" size="16px" color="green-9" title="Arquivo enviado" />
          <q-icon v-if="!props.row.arquivoTermo.id" name="clear" size="16px" color="red-9" title="Arquivo não enviado" />
        </q-td>
        <q-td key="finalizado" :props="props">
          <q-chip v-if="props.row.status" color="green-9" dense>Finalizado</q-chip>
          <q-chip v-if="!props.row.status" color="red-9" dense>Não Finalizado</q-chip>
        </q-td>
      </q-tr>
    </q-table>
    <modal-dados-responsavel-indicacao ref="modalResponsavelIndicacao" />
    <modal-dados-premio ref="modalDadosPremio" />
    <modal-participantes ref="modalParticipantes" />
    <modal-participantes-cadastro-autoridade ref="modalCadastraAutoridade" />
  </div>
</template>
<script>
import { dialog } from '../../mixins/mixin-dialog'
import { notify } from '../../mixins/mixin-notify'
import ModalDadosResponsavelIndicacao from '../modais/modal-dados-responsavel-indicacao'
import ModalDadosPremio from '../modais/modal-dados-premio'
import ModalParticipantes from '../modais/modal-participantes'
import ModalEditarIndicacao from '../modais/modal-editar-indicacao'
import ModalParticipantesCadastroAutoridade from '../modais/modal-participantes-cadastro-autoridade'
import { openURL } from 'quasar'
export default {
  mixins: [dialog, notify],
  components: {
    ModalDadosResponsavelIndicacao,
    ModalDadosPremio,
    ModalParticipantes,
    ModalEditarIndicacao,
    ModalParticipantesCadastroAutoridade
  },
  props: {
    ADMIN: Boolean
  },
  data () {
    return {
      pesquisa: {},
      loading: false,
      listPremios: [],
      columns: [
        { name: 'acao', align: 'left', label: 'Ação', field: 'acao' },
        { name: 'instituicao', align: 'left', label: 'Instituição', field: row => row.instituicao.nome, sortable: true },
        { name: 'campus', align: 'left', label: 'Campus', field: row => row.campus.nome, sortable: true },
        { name: 'curso', align: 'left', label: 'Curso', field: row => row.curso.nome, sortable: true },
        { name: 'titulo', align: 'left', label: 'Título', field: 'titulo', sortable: true },
        { name: 'dataEnvio', align: 'left', label: 'Data Envio', field: 'dataEnvio', sortable: true },
        { name: 'ano', align: 'left', label: 'Ano', field: 'ano' },
        { name: 'arquivo', align: 'left', label: 'Arquivo', field: row => row.arquivo.id, sortable: true },
        { name: 'resumo', align: 'left', label: 'Resumo', field: row => row.arquivoResumo.id, sortable: true },
        { name: 'termo', align: 'left', label: 'Termo', field: row => row.arquivoTermo.id, sortable: true },
        { name: 'finalizado', align: 'left', label: 'Finalizado', field: 'status', sortable: true }
      ]
    }
  },
  methods: {
    getPremios (value) {
      if (value !== null && value !== undefined) {
        this.pesquisa = value
      }
      this.$axios
        .post('cadastro/instituicao-ensino/premio-tct/pesquisa', this.pesquisa)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.listPremios = response.data.data
          }
        })
    },
    download (uri) {
      if (uri) {
        openURL(process.env.API + '/rest-api/crea' + uri)
      } else {
        this.mostrarMensagem('Sem arquivo para download', 'negative', 1000)
      }
    },
    async excluir (id) {
      if (await this.dialogGeneric('Atenção', 'Você deseja realmente excluir essa indicação?')) {
        this.$axios
          .delete('cadastro/instituicao-ensino/premio-tct/' + id)
          .then(response => {
            this.$emit('atualizaGrid')
            this.getPremios()
          })
      }
    }
  }
}
</script>
