
const routes = [
  { path: '/indicacao-premio/login', component: () => import('pages/login/indicacao-premio/index') }
]

const showhome = {
  path: '/',
  component: () => import('layouts/menu'),
  children: [
    { path: '', component: () => import('pages/index') },
    { path: 'premio-tct/cadastro', component: () => import('pages/premio-tct/cadastro-premio') },
    { path: 'premio-crearj/enviados', component: () => import('pages/premio-tct/enviados') },
    { path: 'premio-crearj/admin', component: () => import('pages/premio-tct/admin-premio') },
    { path: 'premio-crearj/fale-conosco', component: () => import('pages/premio-tct/fale-conosco') }
  ]
}

routes.push(showhome)

export default routes
