import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActiveEvent, onLogoutCalendar, onUpdateEvent, onDeleteEvent, onLoadEvents, onUnsetActiveEvent } from "../store";
import { calendarApi } from "../api";
import { convertsEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar);
    const { user } = useSelector( state => state.auth);


    const setActiveEvent = (event) => {
        dispatch( onSetActiveEvent(event) );
    }
    
    const unsetActiveEvent = () => {
        dispatch ( onUnsetActiveEvent() );
    }

    const startSavingEvent = async( calendarEvent ) => {

        try {
            if(calendarEvent.id){
                // Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
                dispatch( onUpdateEvent({...calendarEvent, user}) );
                return;
            }
    
            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({...calendarEvent, id: data.evento.id, user}) );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startUpdatingEvent = (calendarEvent) => {
        dispatch( onUpdateEvent(calendarEvent) );
    }

    const startDeletingEvent = async( ) => {

        try {
            await calendarApi.delete(`/events/${ activeEvent.id }`);
            dispatch( onDeleteEvent() );
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertsEventsToDateEvents( data.eventos );
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Métodos
        setActiveEvent,
        unsetActiveEvent,
        startSavingEvent,
        startUpdatingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
