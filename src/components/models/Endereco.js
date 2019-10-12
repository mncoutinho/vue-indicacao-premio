export default class Endereco {
  constructor (tipo) {
    this.id = null
    this.idString = null
    this.codPessoa = ''
    this.numero = ''
    this.postal = 'NAO'
    this.logradouro = ''
    this.complemento = ''
    this.bairro = ''
    this.cep = ''
    this.dataInclusao = new Date()
    this.enderecoCompleto = ''
    this.latitude = ''
    this.longitude = ''
    this.aproximado = false
    this.uf = { id: '', sigla: String }
    this.tipoLogradouro = {id: '', descricao: ''}
    this.tipoEndereco = {id: '', descricao: ''}
    this.localidade = {id: '', descricao: ''}

    if (tipo !== undefined && tipo === 'EXTERIOR') {
      this.tipoLogradouro = { id: 2024, descricao: '' }
      this.localidade = {id: 0, descricao: ''}
      this.cep = '00000000'
      this.tipoEndereco = {id: 8, descricao: ''}
    }
  }
}
