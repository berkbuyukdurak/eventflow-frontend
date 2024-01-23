import { useRoutes } from 'react-router-dom';
import { RoutesConfig } from './config/RoutesConfig';
import Welcome from './pages/Welcome/Welcome';
import CreatePresentation from './pages/CreatePresentation/CreatePresentation';
import ConferenceAgenda from './pages/ConferenceAgenda/ConferenceAgenda';

export const AppRouter = () => {
    const elements = useRoutes([
        {
            path: RoutesConfig.welcomePage,
            element: <Welcome />
        },
        {
            path: RoutesConfig.createPresentation,
            element: <CreatePresentation />
        },
        {
            path: RoutesConfig.conferenceAgenda,
            element: <ConferenceAgenda />
        }
    ]);
    return elements;
};