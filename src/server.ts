import { frontend } from './backend/config/client';
var backend = require('./backend/config/server');

backend.start(frontend.setup);
