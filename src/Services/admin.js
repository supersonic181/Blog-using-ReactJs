import axios from "axios";

export const adminlogin = async (email, password) => {

    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.post(
            "http://localhost:8000/api/auth/admin/login",
            {
                "email": email,
                "password": password
            },
            config
        );
        return data;
    }
    catch (err) {
        throw err.response.message;
    }
}

export const addCategory = async (name, slug) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.post(
            "http://localhost:8000/api/category/add",
            {
                "name": name,
                "slug": slug
            },
            config
        );

        return data;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const addTag = async (name, slug) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.post(
            "http://localhost:8000/api/tag/add",
            {
                "name": name,
                "slug": slug
            },
            config
        );

        return data;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const getAllAccess = async () => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(
            "http://localhost:8000/api/access/view-all",
            config
        );

        return data.response;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const updateUserAccess = async (email, access) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.put(
            "http://localhost:8000/api/access/update/user",
            {
                "email": email,
                "access_level": access
            },
            config
        );

        return data;
    }
    catch (err) {
        throw err.response.data;
    }
}