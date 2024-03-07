import React, { useState, useEffect, useContext } from 'react';
import { Popup } from '../../../components/Shared/Popup';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { GlobalContext } from "../../../context/GlobalContext";
import { ContentHeader } from '../../../components/Shared/ContentHeader';
import { CalendarBox } from '../../../components/Shared/Calendar';
import { PopupCreateEvent } from './PopupCreateEvent';
import { Button } from "../../../components/Shared/Button";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './index.css';
const MySwal = withReactContent(Swal);


function CalendarClient() {
    const [events, setEvents] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { setActiveBlur } = useContext(GlobalContext);

    const fetchEvents = async () => {
        try {
            let dataEvents = JSON.parse(localStorage.getItem("Events")) === null ? [] : JSON.parse(localStorage.getItem("Events"));
            const eventsCalendar = await dataEvents.map((item, index) => {
                return {
                    id: index,
                    title: item.title,
                    start: new Date(item.start),
                    end: new Date(item.end),
                    description: item.description,
                }
            });
            setEvents(eventsCalendar);
        } catch (error) {
            console.error(error);
            setActiveBlur(true);
            MySwal.fire({
                icon: 'error',
                title: 'Oops ...',
                text: 'There was a unexpected error retrieving the tasks, please contact support.',
                showConfirmButton: false,
                timer: 1700,
                backdrop: true,
                customClass: {
                    popup: 'popup-sweet',
                    title: 'title-sweet',
                    htmlContainer: 'text-sweet',
                    confirmButton: 'confirm-button-sweet',
                    denyButton: 'deny-button-sweet',
                }
            }).finally(() => {setActiveBlur(false)});
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const createButtonClick = () => {
        setIsPopupOpen(true);
        setActiveBlur(true);
    }

    const handleAddEvent = (data) => {
        try{
            events.push(data);
            localStorage.setItem("Events", JSON.stringify(events));
            setActiveBlur(true);
            MySwal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Event Saved.',
                showConfirmButton: false,
                timer: 1700,
                backdrop: true,
                customClass: {
                    popup: 'popup-sweet',
                    title: 'title-sweet',
                    htmlContainer: 'text-sweet',
                    confirmButton: 'confirm-button-sweet',
                    denyButton: 'deny-button-sweet',
                }
            }).finally(() => {setActiveBlur(false)});
            closePopup();
            fetchEvents();
        }catch(err){
            console.error(err);
            setActiveBlur(true);
            MySwal.fire({
                icon: 'error',
                title: 'Oops ...',
                text: 'There was a unexpected error adding the event, please contact support.',
                showConfirmButton: false,
                timer: 1700,
                backdrop: true,
                customClass: {
                    popup: 'popup-sweet',
                    title: 'title-sweet',
                    htmlContainer: 'text-sweet',
                    confirmButton: 'confirm-button-sweet',
                    denyButton: 'deny-button-sweet',
                }
            }).finally(() => {setActiveBlur(false)});
        }
    }

    const closePopup = () => {
        setIsPopupOpen(false);
        setActiveBlur(false);
    }

    return <React.Fragment>
        <div className="calendar">
            <div className="calendar-header">
                <ContentHeader text="Calendar" />
            </div>
            <div className="calendar-body">
                { events !== undefined ? 
                    <>
                        <Popup isOpen={isPopupOpen} onClose={closePopup} modalClass="popup-info-task">
                            <PopupCreateEvent
                                handleAddEvent = {handleAddEvent}
                                closePopup = {closePopup}
                            />
                        </Popup>
                        <Button
                            buttonClassName="event-add-button"
                            onClick={createButtonClick}
                            children="Add Event"
                        />
                        <CalendarBox events={events} />
                    </>
                    :
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}
                    >
                        <CircularProgress style={{ height: "50px", width: "100px" }} color="inherit" />
                    </Backdrop>
                }
            </div>
        </div>
    </React.Fragment>
}

export { CalendarClient };