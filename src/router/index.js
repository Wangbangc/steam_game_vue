import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex';
import Login from '../views/user/UserLogin.vue';
import Register from '../views/user/UserRegister.vue';
import Profile from '../views/user/UserProfile.vue';
import Games from '../views/games/GameList.vue';
import Analysis from '../views/games/GameAnalysis.vue';
import GameHome from '../views/games/GameHome.vue';
import GameSalesPrediction from '../views/games/predictiveModels/GameSalesPrediction.vue';
import PriceRatingAnalysis from '../views/games/predictiveModels/PriceRatingAnalysis.vue';
import CustomAnalysis from '../views/games/predictiveModels/CustomAnalysis.vue';
import RoseChart from '../views/games/predictiveModels/RoseChart.vue';
import BarLineChart from '../views/games/predictiveModels/BarLineChart.vue';
import BubbleChart from '../views/games/predictiveModels/BubbleChart.vue';
import DynamicBarChart from '../views/games/predictiveModels/DynamicBarChart.vue';

const routes = [

  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/games', name: 'games', component: Games },
  { path: '/analysis', name: 'analysis', component: Analysis },
  { path: '/home', name: 'home', component: GameHome },
  { path: '/sales-prediction', name: 'salesPrediction', component: GameSalesPrediction },
  { path: '/price-rating-analysis', name: 'priceRatingAnalysis', component: PriceRatingAnalysis },
  { path: '/custom-analysis', name: 'customAnalysis', component: CustomAnalysis },
  { path: '/rose-chart', name: 'roseChart', component: RoseChart },
  { path: '/bar-line-chart', name: 'barLineChart', component: BarLineChart },
  { path: '/bubble-chart', name: 'bubbleChart', component: BubbleChart },
  { path: '/dynamic-bar-chart', name: 'dynamicBarChart', component: DynamicBarChart },

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