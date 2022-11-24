import axios from "axios";

const url = process.env.REACT_APP_URL;

export const login = async (email, password) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.post(
            url + "/api/auth/login",
            {
                "email": email,
                "password": password
            },
            config
        );

        return data;
    }
    catch (err) {
        throw err.response;
    }
}

export const register = async (email, name, password) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.post(
            url + "/api/auth/register",
            {
                "email": email,
                "name": name,
                "password": password,
                "access": 4
            },
            config
        );

        return data;
    }
    catch (err) {
        throw err.response;
    }
}

export const logout = async () => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.delete(
            url + "/api/auth/logout",
            config
        );

        return data;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const getAccessLevel = async () => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(
            url + "/api/user/access",
            config
        );

        return data.response[0].name;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const getUserProfile = async () => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(
            url + "/api/user/profile",
            config
        );

        return data.response;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const updateUserProfile = async (email, name, password) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.put(
            url + "/api/user/profile",
            {
                "email": email,
                "name": name,
                "password": password
            },
            config
        );

        return data.response;
    }
    catch (err) {
        throw err.response.data;
    }
}