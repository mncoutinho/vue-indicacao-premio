module.exports = function (ctx) {
  let local = process.env.local
  let prod = process.env.prod
  let urlLocal = {
    API: JSON.stringify('http://localhost:8080'),
    COUCH_DB: JSON.stringify('https://dev-servicos.crea-rj.org.br/couchdb'),
    AMBIENTE: JSON.stringify('LOCAL')
  }
  let urlDev = {
    API: JSON.stringify('https://dev-servicos.crea-rj.org.br'),
    COUCH_DB: JSON.stringify('https://dev-servicos.crea-rj.org.br/couchdb'),
    AMBIENTE: JSON.stringify('DEV')
  }
  let urlProd = {
    API: JSON.stringify('https://portalservicos.crea-rj.org.br'),
    COUCH_DB: JSON.stringify('https://portalservicos.crea-rj.org.br/couchdb'),
    AMBIENTE: JSON.stringify('PROD')
  }

  let urlApi = {}
  if (local) {
    urlApi = urlLocal
  } else {
    urlApi = prod ? urlProd : urlDev
  }
  return {
    plugins: [
      'axios',
      'vuelidate'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      // 'ionicons',
      // 'mdi',
      'fontawesome'
    ],
    supportIE: false,
    build: {
      env: urlApi,
      scopeHoisting: true,
      distDir: 'dist/indicacao-premio',
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      }
    },
    devServer: {
      // https: true,
      port: 8081,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      i18n: 'pt-br',
      iconSet: 'fontawesome',
      components: [
        'QBtnDropdown',
        'QField',
        'QInput',
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QCardSeparator',
        'QItemSeparator',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QTable',
        'QTooltip',
        'QRadio',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QSelect',
        'QSearch',
        'QInnerLoading',
        'QModal',
        'QModalLayout',
        'QAutocomplete',
        'QTh',
        'QTr',
        'QTd',
        'QTableColumns',
        'QDialog',
        'QDatetime',
        'QCollapsible',
        'QCheckbox',
        'QTree',
        'QChip',
        'QPopover',
        'QCard',
        'QCardMain',
        'QOptionGroup',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QUploader',
        'QCardTitle',
        'QBtnToggle',
        'QCardActions',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QSpinnerGears',
        'QSpinnerFacebook'
      ],
      directives: [
        'Ripple', 'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify', 'Dialog', 'Loading'
      ]
    },
    // animations: 'all' --- includes all animations
    animations: [
    ],
    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack (cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.2'
  }
}
