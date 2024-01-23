import { useRoutes } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import CreatePresentation from './pages/CreatePresentation/CreatePresentation';

export const AppRouter = () => {
    const elements = useRoutes([
        {
            path: '/',
            element: <Welcome />
        },
        {
            path: '/create-presentation',
            element: <CreatePresentation />
        }
    ]);
    return elements;
};