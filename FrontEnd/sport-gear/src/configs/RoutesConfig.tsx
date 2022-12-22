import React from 'react';
import { AUTH_PREFIX_PATH } from './AppConfig';

export const publicRoutes = [
    {
        key: 'home',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('pages/public-pages/home')),
    },
]