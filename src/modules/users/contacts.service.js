import axios from 'axios';

import enviroment from '../../environment';
import { userService } from './users.service';



class ContactService {
    constructor() {
        this.baseUrl = enviroment.API_BASE_URL;
    }

    async getContact({ userId }) {
        const token = await userService.getTokenFromCurrentUser();

        const response = await axios({
            url: `${this.baseUrl}contacts/${userId}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { data } = response;

        return data;
    }

    async updateContact({ userId, email, phone, fullName }) {
        const token = await userService.getTokenFromCurrentUser();

        const response = await axios({
            url: `${this.baseUrl}contacts/${userId}`,
            method: 'patch',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                email,
                phone,
                full_name: fullName
            }
        });

        const { data } = response;

        return {
            ...data,
            message: 'Tú contacto ha sido actualizado.'
        };
    }

    async createContact({ userId, email, phone, fullName }) {
        const token = await userService.getTokenFromCurrentUser();

        const response = await axios({
            url: `${this.baseUrl}contacts`,
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                user_id: userId,
                email,
                phone,
                full_name: fullName
            }
        });

        const { data } = response;

        return {
            ...data,
            message: 'Tú contacto ha sido creado.'
        };
    }

}
export const contactService = new ContactService();