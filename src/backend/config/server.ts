import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

// Demo
import { serverApi } from '../api';

export const backend = {

  init(): void {
    this.app = express();
    const ROOT = path.join(path.resolve(__dirname, '../../..'));

    this.app.set('port', process.env.PORT || 3000);
    this.app.set('views', __dirname);
    this.app.set('view engine', 'html');

    this.app.use(cookieParser('Angular 2 Universal'));
    this.app.use(bodyParser.json());

    // Serve static files
    this.app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
    this.app.use(express.static(path.join(ROOT, 'dist/client'), {index: false}));

    // Our API for demos only
    this.app.get('/data.json', serverApi);

    // Server
    let server = this.app.listen(this.app.get('port'), () => {
      console.log(`Listening on: http://localhost:${server.address().port}`);
    });

    return this.app;
  },

  finalize(): void {

    // Routes
    require('../modules/core/core.routes')(this.app);

    this.app.get('*', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      var pojo = {status: 404, message: 'No Content'};
      var json = JSON.stringify(pojo, null, 2);
      res.status(404).send(json);
    });

  }
};
