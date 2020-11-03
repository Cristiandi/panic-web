import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { auth } from './firebase';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let createdApp;
auth.onAuthStateChanged(user => {
    if (!createdApp) {        
        createdApp = createApp(App)
            .use(store)
            .use(router)
            .mount('#app');
    }

    if (user) {
        router.push('/home');
        store.dispatch('setCurrentUser', user)
            .catch(err => {
                console.error('error making setCurrentUser', err);
                store.dispatch('logout');
            });
    }
});
