import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import PublicRoute from '@/PublicRoute';
import { publicRoutes } from 'configs/RoutesConfig';

const Routes = () => {
    return (
        <RouterRoutes>
            <Route path="/" element={<PublicRoute />}>
                {publicRoutes.map((route) => {
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<AppRoute routeKey={route.key} component={route.component} {...route.meta} />}
                        />
                    );
                })}
            </Route>
        </RouterRoutes>
    );
};

export default Routes;
