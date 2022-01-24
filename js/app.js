//import style
import '../css/global.css';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { init } from './ui';
import { initSelects } from './selectores';

//iniciar funciones
document.addEventListener('DOMContentLoaded', 
(async () => {
    await initSelects();
    await init();
})()
);