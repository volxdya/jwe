import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц
import MainPage from './views/MainPage.vue';
import AllProducts from './views/AllProducts.vue';
import ProductPage from './views/ProductPage.vue';
import BasketPage from './views/BasketPage.vue';
import AdminPage from './views/AdminPage.vue';
import NewsPage from './views/NewsPage.vue';


export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'MainPage',
            component: MainPage,
        },
        {
            path: '/products',
            name: 'AllProducts',
            component: AllProducts
        },
        {
            path: '/product/:_id',
            name: 'ProductPage',
            component: ProductPage
        },
        {
            path: '/basket',
            name: 'BasketPage',
            component: BasketPage
        },
        {
            path: '/admin',
            name: 'AdminPage',
            component: AdminPage
        },
        {
            path: '/news',
            name: 'NewsPage',
            component: NewsPage
        },
        {
            path: '/admin/news',
            name: 'AdminNewsPage',
            component: NewsPage
        },
        {
            path: '/admin/products',
            name: 'AdminProducts',
            component: AllProducts
        },
    ]
})