import React from 'react';
import ReactDOM from 'react-dom';
import { AppRunner, asyncComponentLoader as asyncComponent } from 'project-customer-portal-fe';
import * as serviceWorker from './serviceWorker';

const routes = [
    {
        path: '/dashboard',
        component: asyncComponent(() => import('./components/dashboard')),
        isSecure: true,
        roles: []
    },
    {
        path: '/bids/:id?',
        component: asyncComponent(() => import('./components/Bids')),
        isSecure: true,
        roles: []
    },
    {
        path: '/invoices/:id?',
        component: asyncComponent(() => import('./components/Invoices')),
        isSecure: true,
        roles: []
    },
    {
        path: '/jobs/:id?',
        component: asyncComponent(() => import('./components/Jobs')),
        isSecure: true,
        roles: []
    }
]

// const links = [
//     {
//         path: '/dashboard',
//         label: 'Dashboard',
//         leftIcon: 'dashboard',
//         color: '#673AB7',
//         name: 'dashboard',
//         access: _keyby(getDashboard)
//     },
//     {
//         path: '/bids',
//         label: 'Bids',
//         leftIcon: 'person',
//         color: '#2196F3',
//         name: 'bids',
//         access: _keyby(getBids)
//     },
//     {
//         path: '/invoices',
//         label: 'Invoices',
//         leftIcon: 'payment',
//         color: '#4CAF50',
//         name: 'finances',
//         access: _keyby(getFinance)
//     },
//     {
//         path: '/jobs',
//         label: 'Jobs',
//         leftIcon: 'perm_data_setting',
//         color: '#2196F3',
//         name: 'jobs',
//         access: _keyby(getJobs)
//     },
// ]

const notifyCb = message => console.info('Notification', message);

const props = { routes, notifyCb }

ReactDOM.render(<AppRunner {...props} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
