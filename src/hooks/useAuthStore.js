import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { onChecking, onlogin, onLogout, clearErrorMessage, onLogoutCalendar } from '../store';
import { useCalendarStore } from './useCalendarStore';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {
        dispatch(onChecking());

        try {
            const {data} = await calendarApi.post('/auth', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onlogin({name: data.name, uid: data.uid}));

        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') );          
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async({name, email, password}) => {
        dispatch(onChecking());

        try {
            const {data} = await calendarApi.post('/auth/new', {name, email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onlogin({name: data.name, uid: data.uid}) );

        } catch (error) {
            dispatch( onLogout( error.response.data?.msg || 'Datos incorrectos') );          
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch( onLogout() );

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onlogin({name: data.name, uid: data.uid}) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() ); 
        }
    }

    const startLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        dispatch( onLogoutCalendar() );
        dispatch( onLogout() );
    }

    return {
        //* Propiedades
        status, 
        user, 
        errorMessage,

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister
    }
}