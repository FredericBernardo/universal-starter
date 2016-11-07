import { universal } from './backend/config/client'

universal.init();

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

universal.setup(app);

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(express.static(path.join(ROOT, 'dist/client'), {index: false}));


import { serverApi } from './backend/api';
// Our API for demos only
app.get('/data.json', serverApi);

function ngApp(req, res) {
  res.render('index', {
    req,
    res,
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: 'http://localhost:3000'
  });
}
// Routes with html5pushstate
// ensure routes match client-side-app
app.get('/', ngApp);
app.get('/about', ngApp);
app.get('/about/*', ngApp);
app.get('/home', ngApp);
app.get('/home/*', ngApp);


app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

// Server
let server = app.listen(app.get('port'), () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
