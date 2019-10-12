
<template>
<div>
  <q-field icon="place"
           label="Busca por logradouro:"
           helper="Ex: Rua Buenos Aires, 40">
    <vue-google-autocomplete ref="address"
                             :id="'a' + Math.floor(Math.random() * 10)"
                             :country="['br']"
                             v-model="autocompleteText"
                             class="col q-input-target text-left"
                             placeholder="Digite o endereço"
                             v-on:placechanged="getAddressData"
                             size="50"
                             align="left" />
  </q-field>
</div>
</template>

<script>
import Endereco from '../../models/Endereco'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  props: ['idEndereco'],
  components: {
    VueGoogleAutocomplete, Endereco
  },
  data () {
    return {
      autocompleteText: '',
      endereco: new Endereco()
    }
  },
  methods: {
    getAddressData (addressData, placeResultData, id) {
      this.populaEnderecoBase(addressData)
      this.populaBairroEmunicipio(placeResultData.address_components)
      this.buscaLocalidade(this.endereco)
    },
    populaEnderecoBase (el) {
      this.endereco.tipoLogradouro.descricao = (el.route.slice(0, el.route.indexOf(' '))).toUpperCase()
      this.endereco.logradouro = (el.route.slice(el.route.indexOf(' ') + 1)).toUpperCase()
      this.endereco.numero = el.street_number
      this.endereco.uf.sigla = el.administrative_area_level_1
      this.endereco.latitude = el.latitude
      this.endereco.longitude = el.longitude
      this.populaCep(el)
      this.buscaLogradouro()
    },
    populaBairroEmunicipio (el) {
      for (var i = 0; i < el.length; i++) {
        switch (el[i].types[0]) {
          case 'sublocality_level_1':
            this.populaBairro(el[i])
            break
          case 'administrative_area_level_2':
            this.populaMunicipio(el[i])
            break
        }
      }
    },
    populaCep (el) {
      if (el.postal_code !== undefined) {
        if (el.postal_code.length === 9) {
          this.endereco.cep = (el.postal_code).replace('-', '')
        }
      } else {
        this.$q.notify('O número do logradouro foi informado? Busca não retornou CEP!')
      }
    },
    populaBairro (el) {
      this.endereco.bairro = (el.long_name).toUpperCase()
    },
    populaMunicipio (el) {
      this.endereco.localidade.descricao = el.long_name.toUpperCase()
    },
    async buscaLocalidade () {
      await this.$axios
        .get('endereco/busca-localidade?descricaoLocalidade=' + this.endereco.localidade.descricao + '&descricaoUF=' + this.endereco.uf.sigla)
        .then(response => {
          this.endereco.uf.id = response.data.data.uf.id
          this.endereco.localidade.id = response.data.data.id
          if (!this.endereco.cep && response.data.data.cep) {
            this.endereco.cep = response.data.data.cep
          }
        })
      this.endereco.tipoEndereco.id = ''
      this.endereco.id = this.idEndereco
      this.$emit('input', this.endereco)
      this.autocompleteText = ''
    },
    buscaLogradouro () {
      this.$axios
        .get('endereco/tipo-logradouro/' + this.endereco.tipoLogradouro.descricao.toUpperCase())
        .then(response => {
          this.endereco.tipoLogradouro.id = response.data.data.id
        })
    }
  }
}
</script>
<style>
.pac-container {
  z-index:10000;
  box-shadow: none;
}
</style>
