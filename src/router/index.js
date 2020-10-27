import { createRouter, createWebHashHistory } from 'vue-router';

import { auth } from '../firebase';

// screens
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Home from '../views/Home';
import Resetpassword from '../views/Resetpassword.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Signup
  },
  {
    path: '/reset-password',
    name: 'Resetpassword',
    component: Resetpassword
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;