export const helpers = {
  methods: {
    validarCpf (cpf) {
      if ((cpf = cpf.replace(/[^\d]/g, '')).length !== 11) { return false }
      if (cpf === '00000000000') { return false }
      let r
      let s = 0
      for (let i = 1; i <= 9; i++) { s = s + parseInt(cpf[ i - 1 ]) * (11 - i) }
      r = (s * 10) % 11
      if ((r === 10) || (r === 11)) { r = 0 }
      if (r !== parseInt(cpf[9])) { return false }
      s = 0
      for (let i = 1; i <= 10; i++) { s = s + parseInt(cpf[i - 1]) * (12 - i) }
      r = (s * 10) % 11
      if ((r === 10) || (r === 11)) { r = 0 }
      if (r !== parseInt(cpf[10])) { return false }
      return true
    },
    validarData (data) {
      let aAr = typeof (data) === 'string' ? data.split('/') : data,
        lDay = parseInt(aAr[0]), lMon = parseInt(aAr[1]), lYear = parseInt(aAr[2]),
        BiY = (lYear % 4 === 0 && lYear % 100 !== 0) || lYear % 400 === 0,
        MT = [1, BiY ? -1 : -2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1]
      return lMon <= 12 && lMon > 0 && lDay <= MT[lMon - 1] + 30 && lDay > 0
    },
    validaTamanhoDoArquivo (arquivo) {
      return arquivo[0].size <= 30000
    },
    validaTipoArquivo (arquivo) {
      let tipos = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.oasis.opendocument.spreadsheet']
      return tipos.some(function (tipo) {
        return tipo === arquivo[0].type.trim()
      })
    }
  }
}
