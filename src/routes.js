import { useRoutes } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';

export const AppRouter = () => {
    const elements = useRoutes([
        {
            path: '/',
            element: <Welcome />
        }
    ]);
    return elements;
};