export = {
  client: {
    css: [
      'src/app/modules/*/*.css'
    ],
    modules: [
      'src/app/modules/*/*.ts'
    ],
    img: [
      'src/app/modules/*/assets/*'
    ],
    views: [
      'src/app/modules/*/*.html'
    ],
  },
  server: {
    allTS: [
      'src/backend/config/**/*.ts',
      'src/backend/modules/*/*.ts'
    ],
    config: 'src/backend/config/**/*.ts',
    models: '/modules/*/*.model.js',
    routes: 'src/backend/modules/*/*.routes.ts',
    sockets: 'src/backend/modules/*/*.sockets.ts',
    policies: 'src/backend/modules/*/*.policies.ts',
  }
};
