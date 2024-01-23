import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConferenceAgenda.css';
import Button from '@mui/material/Button';
import { RoutesConfig } from '../../config/RoutesConfig';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ConferenceAgendaService from '../../services/ConferenceAgendaService';


const ConferenceAgenda = () => {
    const [agendaData, setAgendaData] = useState({ conferenceAgenda: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAgendaData = async () => {
            setLoading(true);
            try {
                const data = await ConferenceAgendaService.getConferenceAgenda();
                setAgendaData(data);
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAgendaData();
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError('');
    };

    return (
        <div className="agenda-container">
            {loading ? (
                <div className="loading-indicator">
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <div className="navigation-buttons">
                        <Button
                            variant="contained"
                            color="primary"
                            className="button"
                            onClick={() => navigate(RoutesConfig.welcomePage)}
                        >
                            Back to Welcome
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className="button"
                            onClick={() => navigate(RoutesConfig.createPresentation)}
                        >
                            Create Presentation
                        </Button>
                    </div>
                    {agendaData.conferenceAgenda.map((track, index) => (
                        <div key={index} className="track">
                            <h2 className="track-title">Track {index + 1}</h2>
                            <ul className="presentation-list">
                                {track.track.map((presentation, idx) => (
                                    <li key={idx} className="presentation">
                                        <span className="time">{presentation.startTime}</span>
                                        <span className="name">{presentation.name}</span>
                                        <span className="duration">
                                            {presentation.duration === 5
                                                ? 'lightning'
                                                : presentation.duration > 0
                                                    ? `${presentation.duration}min`
                                                    : null}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </>
            )}
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity="error" elevation={6} variant="filled">
                    {error}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default ConferenceAgenda;
