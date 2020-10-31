import axios from 'axios';

import enviroment from '../../environment';
import { auth } from '../../firebase';

class UserService {
    constructor() {
        this.baseUrl = enviroment.API_BASE_URL;

    }

    // con esta funcion obtengo el token del usuario que esta loggeado en este momento
    async getTokenFromCurrentUser() {
        if (!auth.currentUser) {
            throw new Error('el usuario no esta loggeado.');
        }

        // obtengo el token
        const idTokenResult = await auth.currentUser.getIdTokenResult();

        // saco el token del resultado
        const { token } = idTokenResult;

        return token;
    }

    async register({
        email,
        phone,
        fullName,
        password
    }) {
        const response = await axios({
            url: `${this.baseUrl}users`,
            method: 'post',
            data: {
                email,
                phone,
                full_name: fullName,
                password
            }
        });

        // const user = await this.login({ email, password });

        return {
            ...response.data,
            message: 'Tú usuario ha sido creado, puedes iniciar sesión.'
        };
    }

    async login({ email, password }) {
        const { user } = await auth.signInWithEmailAndPassword(email, password);

        return user;
    }

    async logout() {
        if (auth.currentUser) await auth.signOut();
    }

    async resetPassword({ email }) {
        const response = await axios({
            url: `${this.baseUrl}users/send-forgotten-password-email`,
            method: 'post',
            data: {
                email
            }
        });

        return {
            ...response.data,
            message: 'Te enviamos un correo, revisalo.'
        };
    }

    async changePassword({ email, oldPassword, newPassword }) {
        // en esta funcion necesito obtener el token, porque el usuario necesita
        // estar loggeado para poder realizar esta accion y la manera en la que el backen válida eso
        // es mediante el token de el usuario.

        const token = await this.getTokenFromCurrentUser();

        const response = await axios({
            // esta es la url del endpoint a donde voy a realizar la peticion
            url: `${this.baseUrl}users/change-password`,
            // este es el metodo http
            method: 'post',
            // estos son los headers / cabeceras -> se utilizan para enviar información extra, como por ejemplo el token
            headers: {
                Authorization: `Bearer ${token}`
            },
            // este es el body de la peticion
            data: {
                email,
                old_password: oldPassword,
                new_password: newPassword
            }
        });

        return {
            ...response.data,
            message: 'Tú clave a sido actualizada.'
        };
    }

    async me({ uuid }) {
        const token = await this.getTokenFromCurrentUser();

        const response = await axios({
            url: `${this.baseUrl}users/me/${uuid}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }
}


export const userService = new UserService();
