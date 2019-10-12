export default [
  {
    id: 1,
    label: 'Prêmio CREA-RJ',
    header: 'root',
    icon: 'fas fa-trophy',
    children: [
      {
        label: 'Cadastro',
        header: 'children',
        router: '/premio-tct/cadastro'
      },
      {
        label: 'Trabalhos Enviados',
        header: 'children',
        router: '/premio-crearj/enviados'
      }
    ]
  },
  {
    id: 2,
    label: 'Administrador',
    icon: 'fas fa-cogs',
    header: 'root',
    children: [
      {
        label: 'Prêmios',
        header: 'children',
        router: '/premio-crearj/admin'
      }
    ]
  }
]
