import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";
import { Alert } from 'react-native';

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("Client_usuarios/auth/login", { email, password });
        const token = response.data?.data?.token;

        if (token) {
            await AsyncStorage.setItem("userToken", token);
            return { success: true, token };
        } else {
            console.error("LOGIN FALLIDO: No se recibió un token válido.");
            return {
                success: false,
                message: response.data.message || "No se recibió un token de autenticación válido."
            };
        }
    } catch (error) {
        console.error("Error de login:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales."
        };
    }
};

export const logoutUser = async () => {
    try {
        await api.post("/Client_usuarios/auth/logout");
        await AsyncStorage.removeItem("userToken");
        return { success: true };
    } catch (error) {
        console.error("Error al cerrar sesión:", error.response ? error.response.data : error.message);
        await AsyncStorage.removeItem("userToken");
        return {
            success: false,
            message: error.response?.data?.message || "Error al cerrar sesión."
        };
    }
};

export const getUserProfile = async () => {
    try {
        const currentToken = await AsyncStorage.getItem("userToken");
        console.log("GET PROFILE: Token recuperado de AsyncStorage para la solicitud:", currentToken);
        
        const response = await api.get("/Client_usuarios/profile");
        return { success: true, user: response.data.data };
    } catch (error) {
        console.error("Error al obtener perfil:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Error al obtener la información del perfil."
        };
    }
};

export const editarPerfil = async (data) => {
    try {
        console.log("EDITAR PERFIL - Datos enviados:", data);
        const response = await api.put("/Client_usuarios/profile", data);
        return { success: true, user: response.data.data };
    } catch (error) {
        console.error("Error al editar perfil:", error.response ? error.response.data : error.message);
        const message = error.response?.data?.errors
            ? Object.values(error.response.data.errors).flat().join('\n')
            : error.response?.data?.message || "Ocurrió un error al actualizar el perfil.";
        return { success: false, message };
    }
};

export const changeUserPassword = async (data) => {
    try {
        console.log("CAMBIAR CONTRASEÑA - Datos enviados:", data);
        const response = await api.post("/Client_usuarios/profile/change-password", data);
        return { success: true, user: response.data.data };
    } catch (error) {
        console.error("Error al cambiar contraseña:", error.response ? error.response.data : error.message);
        const message = error.response?.data?.errors
            ? Object.values(error.response.data.errors).flat().join('\n')
            : error.response?.data?.message || "Ocurrió un error al cambiar la contraseña.";
        return { success: false, message };
    }
};
