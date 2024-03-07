import React, {useState}from "react";
import { Button, TextField,
    InputAdornment, FormControl
} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';
import './PopupCreateEvent.css'

function PopupCreateEvent(props) {
    const { classHeader, handleAddEvent, closePopup } = props;
    const isMobile = window.innerWidth <= 600;
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDateInitial, setEventDateInitial] = useState(dayjs(new Date()));
    const [eventDateFinal, setEventDateFinal] = useState(dayjs(new Date()));

    return (
        <React.Fragment>
            <div className="full-events-modal">
                <div className="modal-events-upper">
                    <div className="modal-events-header-title">
                        <h2>Create a New Event</h2>
                    </div>
                </div>
                <div className="modal-events-inputs">
                    <div className="modal-events-name-description">
                        <FormControl fullWidth>
                            <TextField
                                className="text-event-name"
                                label="Event Title"
                                value={eventName}
                                type="text"
                                onChange={(e) => setEventName(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start"></InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                className="text-event-description"
                                label="Event Description"
                                value={eventDescription}
                                type="text"
                                onChange={(e) => setEventDescription(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start"></InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                    </div>
                    <div className="modal-events-dateInitial-dateFinal">
                        <FormControl fullWidth>
                            <DateTimePicker
                                label="Start Date"
                                value={eventDateInitial}
                                onChange={(newValue) => setEventDateInitial(newValue)}
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <DateTimePicker
                                label="End Date"
                                value={eventDateFinal}
                                onChange={(newValue) => setEventDateFinal(newValue)}
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="events-button-container">
                    <Button
                        variant="contained"
                        className="form-button"
                        sx={{ margin: "2rem" }}
                        onClick={() => handleAddEvent({
                                            title: eventName,
                                            start: new Date(eventDateInitial),
                                            end: new Date(eventDateFinal),
                                            description: eventDescription,
                                        })
                        }
                    >
                        Create
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ margin: "2rem" }}
                        className="form-button"
                        onClick={closePopup}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export { PopupCreateEvent };