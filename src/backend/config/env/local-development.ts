export = {
    domain: 'localhost',
    host: '127.0.0.1',
    db: {
        uri: 'mongodb://localhost/local-dev',
        options: {
            user: '',
            pass: ''
        }
    },
    sessionSecret: process.env.SESSION_SECRET || 'youshouldchangethistosomethingsecret',
    facebook: {
        clientID: process.env.FACEBOOK_ID || 'APP_ID',
        clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
        callbackURL: '/api/auth/facebook/callback'
    }
};
