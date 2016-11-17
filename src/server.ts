
import { enableProdMode } from '@angular/core';

import { frontend } from './backend/config/client';
var backend = require('./backend/config/server');

// enable prod for faster renders
enableProdMode();

backend.start(frontend.setup);
