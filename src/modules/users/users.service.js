import axios from 'axios';

import enviroment from '../../environment';
import { auth } from '../../firebase';

class UserService {
    constructor() {
        this.baseUrl = enviroment.API_BASE_URL;
    }

    async register ({
        email,
        phone,
        fullName,
        password
    }) {
        console.log('EXECUTING REGISTER');
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

    async login ({ email, password }) {
        console.log('EXECUTING LOGIN');
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        
        return user;
    }

    async logout() {
        await auth.signOut();
    }
}

export const userService = new UserService();
