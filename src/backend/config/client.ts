// the polyfills must be one of the first things imported in node.js.
// The only modules to be imported higher - node modules with es6-promise 3.x or other Promise polyfill dependency
// (rule of thumb: do it if you have zone.js exception that it has been overwritten)
// if you are including modules that modify Promise, such as NewRelic,, you must include them before polyfills
import 'angular2-universal-polyfills';
import 'ts-helpers';
import '../../__workaround.node'; // temporary until 2.1.1 things are patched in Core

// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// App
import { MainModule } from '../../app/app.node.module';

export const frontend = {

  setup(app: any, db, config): void {

    // Express View
    app.engine('.html', createEngine({
      precompile: true,
      ngModule: MainModule,
      providers: [
        // use only if you have shared state between users
        // { provide: 'LRU', useFactory: () => new LRU(10) }

        // stateless providers only since it's shared
      ]
    }));

  },

};
