import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";
import { Alert } from 'react-native';

export const loginUser = async (email, password) => {
    // **********************************************************************
    // *** CÓDIGO ORIGINAL DE LOGIN (HABILITADO)                         ***
    // **********************************************************************
    try {
        const response = await api.post("Client_usuarios/auth/login", { email, password });
        const token = response.data?.data?.token;

        if (token) {
            await AsyncStorage.setItem("userToken", token);
            return { success: true, token };
        } else {
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
    // **********************************************************************
    // *** CÓDIGO ORIGINAL DE LOGOUT (HABILITADO)                        ***
    // **********************************************************************
    try {
        await api.post("/Client_usuarios/auth/logout");
        await AsyncStorage.removeItem("userToken");
        return { success: true };
    } catch (error) {
        console.error("Error al cerrar sesión:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Error al cerrar sesión."
        };
    }
};

// **********************************************************************
// *** FUNCIÓN getUserProfile (HABILITADA PARA LLAMADA REAL A LA API)***
// **********************************************************************
export const getUserProfile = async () => {
    try {
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

export const editarPerfil = async (id, data) => {
    // **********************************************************************
    // *** FUNCIÓN editarPerfil (HABILITADA PARA LLAMADA REAL A LA API)  ***
    // **********************************************************************
    try {
        const dataToSend = { ...data };
        // Si tu backend espera la imagen en Base64, asegúrate de que 'imagen_path'
        // contenga solo la cadena Base64 (sin el prefijo 'data:image/jpeg;base64,').
        // Si tu backend espera la imagen como un archivo, necesitarás una lógica
        // más compleja aquí (ej. FormData).
        // Por ahora, se envía 'imagen_path' tal como viene del estado.

        const response = await api.put("/Client_usuarios/profile", dataToSend); // Asegúrate que esta ruta es la correcta en tu backend
        return { success: true, user: response.data.data };
    } catch (error) {
        console.error("Error al editar perfil:", error.response ? error.response.data : error.message);
        const message = error.response?.data?.errors
            ? Object.values(error.response.data.errors).flat().join('\n')
            : error.response?.data?.message || "Ocurrió un error al actualizar el perfil.";
        return { success: false, message };
    }
};
