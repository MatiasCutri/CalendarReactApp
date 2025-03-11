import { useAuthStore } from "../../hooks"

export const Navbar = () => {

    const { startLogout, user } = useAuthStore();

    const handleOnClick = () => {
        startLogout();
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;
                Calendario de {user.name}
            </span>

            <button 
                className="btn btn-outline-danger" 
                onClick={handleOnClick}
            >
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;
                <span>Salir</span>
            </button>
        </div>
    )
}
