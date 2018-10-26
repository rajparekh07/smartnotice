import VueRouter from 'vue-router';
import allRoutes from './routes.js';

let dashboardRoute = [
    // catch all redirect
    {
        path: '*',
        redirect: '/content'
    }
];
console.log(allRoutes);

let routes = allRoutes.concat(dashboardRoute);

export default new VueRouter({
        routes,
        mode: 'history',
        linkActiveClass: 'active'
    }
);
