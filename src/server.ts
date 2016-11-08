import { frontend } from './backend/config/client'
import { backend } from  './backend/config/server'

var app = backend.init();
frontend.setup(app);

backend.finalize();
