import ApiClient from "../../utilities/axios";

let instance: null | AuthService = null;
export class AuthService {

    public async login(email: string, password: string) {
        try {
            const response = await ApiClient.put(`/login`, {
                email,
                password
            });
            return response;
        } catch (error) {
            console.error(error);
            if ((error as Error).message) return (error as Error).message;
            return "Unable to authenticate user."
        }
    }

    public static getInstance() {
        if (!instance) {
            instance = new AuthService()
        }

        return instance;
    }
}
