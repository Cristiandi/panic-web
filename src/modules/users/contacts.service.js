import enviroment from '../../environment';



class ContactService {
    constructor() {
        this.baseUrl = enviroment.API_BASE_URL;

    }
    
}
export const contactService = new ContactService();