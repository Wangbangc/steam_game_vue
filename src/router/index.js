import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex';
import Login from '../views/user/UserLogin.vue';
import Register from '../views/user/UserRegister.vue';
import Profile from '../views/user/UserProfile.vue';
import Games from '../views/games/GameList.vue';
import Analysis from '../views/games/GameAnalysis.vue';
import GameHome from '../views/games/GameHome.vue';
const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/games', name: 'games', component: Games },
  { path: '/analysis', name: 'analysis', component: Analysis },
  { path: '/home', name: 'home', component: GameHome },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.name);
  const store = useStore();
  const isAuthenticated = store.state.user !== null;
  if (!isAuthenticated && to.name !== 'login' && to.name !== 'register') {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;