import { useNavigate } from 'react-router-dom';

import { RoutesConfig } from '../../config/RoutesConfig';
import './Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div className="top-container">
            <div className="container-wrapper">
                <div className="auth-container">
                    <h2 className="title">Welcome to EventFlow</h2>
                    <div>Manage your conference program easily.</div>
                    <div className="button-container">
                        <button onClick={() => navigate(RoutesConfig.createPresentation)}>Create Presentation</button>
                        <button onClick={() => navigate(RoutesConfig.conferenceAgenda)}>Conference Agenda</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
