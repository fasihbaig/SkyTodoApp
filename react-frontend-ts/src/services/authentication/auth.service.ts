import ApiClient from "../../utilities/axios";
import { get } from "lodash";

let instance: null | AuthService = null;

export type LoginDTO = {
    token: string,
    user: {
        email: string,
        username: string,
        _id: string
    }
}
export class AuthService {

    public async login(email: string, password: string): Promise<LoginDTO> {
        try {
            const response = await ApiClient.post(`/auth/login`, {
                email,
                password
            });
            return response.data;
        } catch (error) {
            throw new Error(get(error, "message") || "Unable to authenticate user.")
        }
    }

    public static getInstance() {
        if (!instance) {
            instance = new AuthService()
        }

        return instance;
    }
}
