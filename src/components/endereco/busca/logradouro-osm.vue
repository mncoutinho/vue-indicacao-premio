<template>
  <div>
    <q-field icon="place"
            label="Busca por logradouro:"
            helper="Ex: Rua Buenos Aires, 40, Rio de Janeiro">
      <q-input v-model="terms"
               float-label="Busca por logradouro"
               placeholder="Digite o endereço"
               @keyup.enter="buscar"
               :after="[{ icon: 'search', handler () { buscar() } }]" />
      <span>
        <q-popover v-model="showing"
                   anchor="top middle"
                   self="bottom left">
          <q-list link>
            <q-item v-for="resultado in listaResultado" :key="resultado.lat" v-close-overlay @click.native="selecionado(resultado)">
              <q-item-side color="dark" icon="place" />
              <q-item-main>
                {{resultado.label}}
              </q-item-main>
            </q-item>
          </q-list>
        </q-popover>
      </span>
    </q-field>
  </div>
</template>

<script>
import Endereco from '../../models/Endereco'
export default {
  props: ['idEndereco'],
  components: { Endereco },
  data () {
    return {
      endereco: new Endereco(),
      listaResultado: [],
      terms: '',
      min: 150,
      seleciona: null,
      showing: false
    }
  },
  methods: {
    atualiza () {},
    async buscar () {
      this.showing = true
      await this.buscaOpenStreetMap(this.terms)
    },
    async buscaOpenStreetMap (busca) {
      let list = []
      await this.$axios
        .get('https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=' + busca)
        .then(response => {
          response.data.forEach(function (el) {
            list.push({value: el.display_name, label: el.display_name, obj: el})
          })
        })
      this.listaResultado = list
    },
    selecionado (enderecoSelecionado) {
      this.buscaCep(enderecoSelecionado.obj.address.postcode)
    },
    buscaCep (cep) {
      let cepFormatado = cep.slice(0, 5) + cep.slice(6, 9)
      this.$axios
        .get('endereco/' + cepFormatado)
        .then(response => {
          let endereco = response.data.data
          endereco.tipoEndereco = { id: '', descricao: '' }
          endereco.id = this.idEndereco
          endereco.idString = this.idEndereco
          this.$emit('input', endereco)
        })
        .catch(() => {
          let endereco = new Endereco()
          endereco.id = this.idEndereco
          endereco.idString = this.idEndereco
          this.$q.notify({ message: 'Endereço não localizado pelo CEP informado.', type: 'negative', position: 'center', timeout: 1000 })
          this.$emit('input', endereco)
        })
    }
  }
}
</script>
