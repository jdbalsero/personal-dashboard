import React, { useState, useEffect, useRef, useCallback} from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { startOfDay, isSameDay } from 'date-fns';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './SharedStyles.css'


function CalendarBox(props) {
    const { events } = props;
    const clickRef = useRef(null)

    useEffect(() => {
        /**
         * This is to prevent a memory leak, in the off chance that you
         * teardown your interface prior to the timed method being called.
         */
        return () => {
            window.clearTimeout(clickRef?.current)
        }
    }, [])

    const locales = {
        'en-US': enUS,
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek: () => startOfWeek(new Date(), { locale: locales['en-US'], weekStartsOn: 1 }),
        getDay,
        locales,
    })

    const messages = {
        allDay: 'all day',
        previous: '<',
        next: '>',
    };

    function getDayProp(date) {
        const now = startOfDay(new Date());
        const day = startOfDay(new Date(date));

        if (isSameDay(day, now)) {
            return {
                style: {
                    backgroundColor: '#7C93FE'
                },
            };
        }
        return {};
    }

    function getEventProp(event) {
        return {
            style: {
                backgroundColor: "#7C93FE",
                color: 'rgba(0,0,0,1)',
                borderColor: "white",
                borderWidth: '2px',
                borderStyle: 'solid'
            }
        };
    }

    const onSelectSlot = useCallback((slotInfo) => {
        /**
         * Here we are waiting 250 milliseconds (use what you want) prior to firing
         * our method. Why? Because both 'click' and 'doubleClick'
         * would fire, in the event of a 'doubleClick'. By doing
         * this, the 'click' handler is overridden by the 'doubleClick'
         * action.
         */
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            //Validate
            const { start, end, action } = slotInfo;
            // const val = validateSelect(start, end, action);
            const dateToSend = dayjs(new Date(start));
            //Que hacer si se selecciona algun dia
            //Redirect
        }, 250)
    }, [])

    return <React.Fragment>
        <div>
            {events && <Calendar
                localizer={localizer}
                className='calendario'
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 430 }}
                defaultDate={new Date()}
                messages={messages}
                dayPropGetter={getDayProp}
                eventPropGetter={getEventProp}
                selectable='false'
            />}
        </div>
    </React.Fragment>
}

export { CalendarBox };