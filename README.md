# Calendar App

Esta es una aplicación de un calendario colaborativo construida con React y Redux Toolkit. Permite a los usuarios autenticarse, crear, editar y eliminar eventos en el mismo.

## Características

- Autenticación de usuarios
- Crear, editar y eliminar eventos
- Visualización de eventos en un calendario
- Persistencia de estado con Redux Toolkit
- Manejo de fechas con `date-fns`
- Interfaz de usuario con `react-datepicker` y `sweetalert2`

## Librerías Utilizadas

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [date-fns](https://date-fns.org/)
- [react-datepicker](https://reactdatepicker.com/)
- [sweetalert2](https://sweetalert2.github.io/)
- [react-modal](https://github.com/reactjs/react-modal)

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/MatiasCutri/CalendarReactApp.git
    cd CalendarReactApp
    ```

2. Instala las dependencias:

    ```bash
    yarn install
    ```

3. Configura las variables de entorno:

    Crea un archivo `.env` en la raíz del proyecto y añade la URL de la API del CalendarApp:

    ```env
    REACT_APP_API_URL=
    ```

4. Inicia la aplicación:

    ```bash
    yarn dev
    ```

## Uso

### Autenticación

1. **Registro de Usuario**: Los nuevos usuarios pueden registrarse proporcionando un nombre, correo electrónico y contraseña. La aplicación enviará estos datos al backend para crear una nueva cuenta de usuario.

2. **Inicio de Sesión**: Los usuarios registrados pueden iniciar sesión proporcionando su correo electrónico y contraseña. Al iniciar sesión, la aplicación recibirá un token JWT que se almacenará en el `localStorage` para mantener la sesión activa.

3. **Verificación de Sesión**: Cada vez que la aplicación se carga, verifica si hay un token JWT válido en el `localStorage`. Si el token es válido, el usuario se mantiene autenticado; de lo contrario, se redirige al usuario a la página de inicio de sesión.

### Gestión de Eventos

1. **Crear Evento**: Los usuarios pueden crear nuevos eventos haciendo click en el botón que se encuentra en la parte inferior derecha de la pantalla. Se abrirá un modal donde pueden ingresar el título, notas, fecha y hora de inicio y fin del evento. Al guardar, el evento se añadirá al calendario.

2. **Editar Evento**: Los usuarios pueden editar sus propios eventos existentes haciendo doble click en el evento del calendario. Se abrirá un modal con los detalles del mismo, permitiendo al usuario modificar la información y guardar los cambios, solo si el evento fue creado por ellos.

3. **Eliminar Evento**: Los usuarios pueden eliminar sus propios eventos haciendo click en el evento del calendario y presionando el botón de eliminar. 

### Interfaz de Usuario

1. **Calendario**: La vista principal muestra un calendario con todos los eventos de los usuarios. Los eventos se muestran en las fechas correspondientes y se puede hacer doble click en cada uno de ellos para ver más detalles o editar.

2. **Modal de Evento**: El modal de evento se utiliza para crear y editar eventos. Incluye campos para el título, notas, fecha y hora de inicio y fin, y se valida que la fecha de fin sea posterior a la fecha de inicio.

3. **Notificaciones**: La aplicación utiliza `sweetalert2` para mostrar notificaciones y alertas, como errores de validación y confirmaciones de eliminación.

### Persistencia de Datos

1. **Estado Global**: La aplicación utiliza Redux Toolkit para manejar el estado global, incluyendo la autenticación del usuario y la gestión de eventos.

2. **Almacenamiento Local**: Los tokens JWT se almacenan en el `localStorage` para mantener la sesión del usuario activa entre recargas de la página.

3. **API**: La aplicación se comunica con un backend a través de una API REST para manejar la autenticación y la gestión de eventos. Las solicitudes se realizan utilizando `axios`.
