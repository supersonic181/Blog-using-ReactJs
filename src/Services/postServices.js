import axios from "axios";

export const getCategory = async () => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(
            "http://localhost:8000/api/category/view-all",
            config
        );

        return data;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const getTag = async () => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(
            "http://localhost:8000/api/tag/view-all",
            config
        );

        return data;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const createPost = async(title, body, category, tag) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.post(
            "http://localhost:8000/api/post/add",{
                "title": title,
                "body": body,
                "category_id": category,
                "tags": tag
            },
            config
        );

        return data;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const getAllPost = async () => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(
            "http://localhost:8000/api/post/view-all",
            config
        );

        return data.response;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const getAllPostByCategory = async (slug) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(
            "http://localhost:8000/api/post/category/"+slug,
            config
        );

        return data.response;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const getAllPostByTag = async (slug) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(
            "http://localhost:8000/api/post/tag/"+slug,
            config
        );

        return data.response;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const getAllPostByID = async (ID) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(
            "http://localhost:8000/api/post/"+ID,
            config
        );

        return data.response;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const getAllUserPost = async () => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(
            "http://localhost:8000/api/post/author/view-all",
            config
        );

        return data.response;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const deletePostById = async (id) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.delete(
            "http://localhost:8000/api/post/"+id,
            config
        );

        return data.response;
    }
    catch (err) {
        throw err.response.data;
    }
}

export const updatePost = async(id, title, body, category, tag) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.put(
            "http://localhost:8000/api/post/"+id,{
                "title": title,
                "body": body,
                "category_id": category,
                "tags": tag
            },
            config
        );

        return data;
    }
    catch (err) {
        throw err.response.data;
    }
}