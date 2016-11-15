// the polyfills must be one of the first things imported in node.js.
// The only modules to be imported higher - node modules with es6-promise 3.x or other Promise polyfill dependency
// (rule of thumb: do it if you have zone.js exception that it has been overwritten)
// if you are including modules that modify Promise, such as NewRelic,, you must include them before polyfills
import 'angular2-universal-polyfills';
import { NodeDomRootRenderer, NodeDomRenderer } from 'angular2-universal/node';
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// App
import { MainModule } from '../../app/app.node.module';

// Fix Universal Style
function renderComponentFix(componentProto: any) {
  return new NodeDomRenderer(this, componentProto, this._animationDriver);
}

export const frontend = {

  setup(app: any, db, config): void {
    // Angular 2
    NodeDomRootRenderer.prototype.renderComponent = renderComponentFix;

    // enable prod for faster renders
    enableProdMode();

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
