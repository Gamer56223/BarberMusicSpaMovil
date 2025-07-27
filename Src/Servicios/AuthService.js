import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

export const loginUser = async (email, password) => {
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

export const registerUser = async (name, email, password, role) => {
    try {
        const response = await api.post("/auth/register", { name, email, password, role });
        const token = response.data?.data?.token || response.data?.token;

        if (token) {
            await AsyncStorage.setItem("userToken", token);
            return { success: true, token };
        } else {
            return {
                success: false,
                message: response.data.message || "No se recibió un token de autenticación válido después del registro."
            };
        }
    } catch (error) {
        console.error("Error de registro:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Error al registrar el usuario. El correo podría ya estar registrado."
        };
    }
};

export const editarPerfil = async (id, data) => {
    try {
        const response = await api.put(`/editarUser/${id}`, data);
        return { success: true, user: response.data.user };
    } catch (error) {
        console.error("Error al editar perfil:", error.response ? error.response.data : error.message);
        const message = error.response?.data?.errors
            ? Object.values(error.response.data.errors).flat().join('\n')
            : error.response?.data?.message || "Ocurrió un error al actualizar el perfil.";
        return { success: false, message };
    }
};