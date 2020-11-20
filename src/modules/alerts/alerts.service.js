import axios from 'axios';

import enviroment from '../../environment';
import { userService } from '../users/users.service';

class AlertService {
  constructor() {
    this.baseUrl = enviroment.API_BASE_URL;
  }

  async emitAlert({ userId }) {
    const token = await userService.getTokenFromCurrentUser();

    const response = await axios({
      url: `${this.baseUrl}alerts`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        user_id: userId
      }
    });

    const { data } = response;

    return {
      ...data,
      message: 'Alerta enviada a tu contacto.'
    };
  }
}

export const alertService = new AlertService();
