import axios from "axios";

export const login = async (email, password) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.post(
            "http://localhost:8000/api/auth/login",
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
            "http://localhost:8000/api/auth/register",
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
            "http://localhost:8000/api/auth/logout",
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
            "http://localhost:8000/api/user/access",
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
            "http://localhost:8000/api/user/profile",
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
            "http://localhost:8000/api/user/profile",
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