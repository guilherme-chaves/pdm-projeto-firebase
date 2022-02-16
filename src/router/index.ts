import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import LoginPage from '../views/LoginPage.vue'
// Autenticação / Autorização
import useFirebaseAuth from "../api/firebase-auth";
const state = useFirebaseAuth();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/tab1'
  },
  {
    path: '/home/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/home/tab1'
      },
      {
        path: 'tab1',
        name: 'ClosetList',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        name: 'Search',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        name: 'Profile',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'tab1/new',
        name: 'NewCloth',
        component: () => import('@/views/NewClothPage.vue')
      },
      {
        path: 'tab1/:category',
        name: 'Category',
        component: () => import('@/views/CategoryPage.vue')
      },
      {
        path: 'tab1/:category/:item',
        name: 'Item',
        component: () => import('@/views/ClothPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  //console.log('user' + state.user.value);
  if (state.user.value && (to.name === 'Login')) {
    next({ name: "Home", replace: true });
  } else if (!state.user.value && !(to.name === 'Login')) {
    next({ name: "Login", replace: true });
  } else {
    next();
  }
})

export default router
