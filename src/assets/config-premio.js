export default class ConfigPremio {
  constructor (dataAtual) {
    this._ano = new Date().getFullYear()
    this._imagem = 'http://portalservicos.crea-rj.org.br/images/logo-premio.png'
    this._titulo = 'Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos '
    this._dataInicio = new Date(this._ano + '/05/31')
    // se a data de encerramento é dia 22 deve ser colocado dia 23
    this._dataFim = new Date(this._ano + '/09/15')
    this._msgFimInscricao = 'Atenção o período de inscrições é de: '
    this._dataAtual = dataAtual
    Object.freeze(this)
  }
  get imagem () {
    return this._imagem
  }
  get titulo () {
    return this._titulo + this._ano
  }
  get dataInicio () {
    return this._dataInicio
  }
  get dataFim () {
    return this._dataFim
  }
  get msgFimInscricao () {
    return this._msgFimInscricao + this.formataData(this._dataInicio) + ' - ' + this.formataData(this._dataFim)
  }
  get dataAtual () {
    return new Date(this._dataAtual.getTime())
  }
  estaNoPeriodoDeIncricao () {
    return this._dataAtual >= this._dataInicio && this._dataAtual <= this._dataFim
  }
  formataData (data) {
    return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear()
  }
}
