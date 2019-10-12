<template>
  <div>
    <q-table
      ref="table"
      class="no-border-grid"
      rows-per-page-label="Endereços por página:"
      color="primary"
      row-key="codigo"
      :data="listaEnderecos"
      :columns="columns"
      :loading = loading
      :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
      no-data-label = "Não possui nenhum endereço cadastrado.">
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="tipoEndereco" :props="props">
       <small class="text-italic">{{ props.row.tipoEndereco.descricao }}</small>
      </q-td>
      <q-td key="postal" :props="props">
       <small class="text-italic">{{ props.row.postal}}</small>
      </q-td>
      <q-td key="enderecoCompleto" :props="props">
        <small class="text-italic">{{ props.row.enderecoCompleto}}</small>
      </q-td>
      <q-td key="complemento" :props="props">
          <small style="margin-left:20px" class="text-italic">{{ props.row.complemento}}</small>
      </q-td>
      <q-td key="acaoEditar" :props="props">
        <q-btn-dropdown
          label="Ações"
          color="dark" size="10px"
          flat rounded>
          <q-list link>
            <q-item v-close-overlay @click.native="$refs.modalEndereco.verificaEndereco(props.row)">
              <q-item-side color="dark" icon="edit" />
              <q-item-main >
                Editar
              </q-item-main>
            </q-item>
            <q-item v-close-overlay @click.native="$refs.modalEndereco.excluiEndereco(props.row)">
              <q-item-side color="red-9" icon="clear" />
              <q-item-main >
                Excluir
              </q-item-main>
            </q-item>
          </q-list>
      </q-btn-dropdown>
      </q-td>
    </q-tr>
      <template slot="top-right" slot-scope="props">
        <botao :label="'Cadastrar novo Endereço'"
              :icon="'note_add'"
              @emit="$refs.modalEndereco.verificaEndereco()" />
      </template>
    </q-table>
    <modal-endereco
          ref="modalEndereco"
          tipo="GRID"
          :idPessoa="idPessoa"
          @getListEndereco="getListEndereco" />
  </div>
</template>
<script>
import Botao from '../../components/button/botao'
import ModalEndereco from '../endereco/modal/modal-endereco'
export default {
  props: ['enderecos', 'idPessoa'],
  components: { Botao, ModalEndereco },
  created () {
    this.listaEnderecos = this.enderecos
  },
  data () {
    return {
      listaEnderecos: [],
      columns: [
        { name: 'tipoEndereco', align: 'center', label: 'TIPO', field: row => row.tipoEndereco, sortable: true },
        { name: 'postal', align: 'center', label: 'ENDEREÇO POSTAL', field: 'postal', sortable: true },
        { name: 'enderecoCompleto', align: 'left', label: 'ENDEREÇO COMPLETO', field: 'enderecoCompleto', sortable: true },
        { name: 'complemento', align: 'center', label: 'COMPLEMENTO', field: 'complemento', sortable: true },
        { name: 'acaoEditar', align: 'center', label: '', field: 'acaoEditar' }
      ],
      loading: false
    }
  },
  methods: {
    getListEndereco () {
      this.$axios
        .get('endereco/lista-endereco/' + this.$store.getters['user/getUserRegistro'])
        .then(response => {
          this.listaEnderecos = response.data.data
        })
    }
  },
  watch: {
    enderecos: function (value, oldValue) {
      this.listaEnderecos = value
    }
  }
}
</script>
