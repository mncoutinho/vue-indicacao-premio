export default class Premio {
  constructor (idPessoa) {
    this.idPessoa = idPessoa
  }
  id = null
  instituicao = {}
  campus = {}
  curso = {}
  idPessoa = null
  arquivo = { id: '', nomeOriginal: '', uri: '', modulo: 'INSTITUICAO', privado: true }
  arquivoResumo = { id: '', nomeOriginal: '', uri: '', modulo: 'INSTITUICAO', privado: true }
  arquivoTermo = { id: '', nomeOriginal: '', uri: '', modulo: 'INSTITUICAO', privado: true }
  listaParticipantes = []
  ano = new Date().getFullYear()
  aceite = false
  protocoloCurso = ''
  descricaoCurso = ''
  nivel = ''
  titulo = ''
}
