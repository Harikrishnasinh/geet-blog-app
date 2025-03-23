import axios from "axios"
const dbUrl = import.meta.env.VITE_DB_URL

export async function axiosPost(link: any, oBody?: any): Promise<any> {
    try {
        const token = localStorage.getItem("auth");
        const headers = {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
        };

        console.log(11, dbUrl, link, oBody, headers)

        const response = await axios.post(dbUrl + link, oBody, { headers });
        return response.data;
    } catch (error) {
        console.error("Error in axiosPost:", error);
        throw error;
    }
}

export async function axiosPut(link: any, oBody?: any): Promise<any> {
    try {
        const token = localStorage.getItem("auth");
        const headers = {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
        };

        console.log(11, dbUrl, link, oBody, headers)

        const response = await axios.put(dbUrl + link, oBody, { headers });
        return response.data;
    } catch (error) {
        console.error("Error in axiosPost:", error);
        throw error;
    }
}

export async function axiosGet(link: any): Promise<any> {
    try {
        const token = localStorage.getItem("auth");
        const headers = {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
        };

        console.log(11, dbUrl, link, headers)

        const response = await axios.get(dbUrl + link, { headers });
        return response.data;
    } catch (error) {
        console.error("Error in axiosPost:", error);
        throw error;
    }
}

export async function axiosDelete(link: any, oBody?: any): Promise<any> {
    try {
        const token = localStorage.getItem("auth");
        const headers = {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
        };

        console.log(11, dbUrl, link, oBody, headers)

        const response = await axios.delete(dbUrl + link, { headers });
        return response.data;
    } catch (error) {
        console.error("Error in axiosPost:", error);
        throw error;
    }
}

