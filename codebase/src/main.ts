import { createApp } from 'vue';
import App from './App.vue';

/*
TIP: To get started with clean router change path to @/router/router.ts.
 */
import router from '@/router/router';
import store from './store';
import ElementPlus from 'element-plus';
import i18n from '@/core/plugins/i18n';

//imports for app initialization
import ApiService from '@/core/services/ApiService';
import { initApexCharts } from '@/core/plugins/apexcharts';
import { initInlineSvg } from '@/core/plugins/inline-svg';
import { initVeeValidate } from '@/core/plugins/vee-validate';

import '@/core/plugins/prismjs';
import 'bootstrap';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);

app.mount('#app');
