import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { RoutesConfig } from '../../config/RoutesConfig';
import PresentationService from '../../services/PresentationService';
import './CreatePresentation.css';

const CreatePresentation = () => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const validateForm = () => {
        if (!name.trim()) return "Please enter a presentation name.";
        if (duration <= 0 || duration > 180) return "Duration must be between 1 and 180 minutes.";
        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setLoading(true);
        try {
            const presentationData = {
                name,
                duration: Number(duration)
            };
            await PresentationService.createPresentation(presentationData);
            setLoading(false);
            setSnackbarMessage('Presentation created successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (apiError) {
            setLoading(false);
            setSnackbarMessage(apiError.toString());
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <div className="create-presentation-container">
            <div className="navigation-buttons">
                <Button className="button" onClick={() => navigate(RoutesConfig.welcomePage)}>Back</Button>
                <Button className="button" onClick={() => navigate(RoutesConfig.conferenceAgenda)}>Conference Agenda</Button>
            </div>
            <div className="form-container">
                <h2 className="title">Create Presentation</h2>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Presentation Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Duration (in minutes)"
                        variant="outlined"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        inputProps={{min: "1", max: "180"}}
                        fullWidth
                        margin="normal"
                    />
                    <Button className="button" type="submit" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </form>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} elevation={6} variant="filled">
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        </div>
    );
};

export default CreatePresentation;