import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";
import { Alert } from 'react-native';

export const loginUser = async (email, password) => {
    // **********************************************************************
    // *** CÓDIGO TEMPORAL: SIMULACIÓN DE LOGIN EXITOSO PARA DESARROLLO ***
    // **********************************************************************
    // Este bloque simula un login exitoso y DEBE ser eliminado o comentado
    // cuando quieras volver a la autenticación real con tu backend.

    console.log("Modo de desarrollo: Simulando login exitoso para", email);
    Alert.alert("Simulación de Login", `¡Has ingresado como ${email} (modo desarrollo)!`);
    
    // *** ¡LA LÍNEA CRÍTICA QUE FALTABA! ***
    // Guarda el token simulado en AsyncStorage para que App.js lo pueda leer
    await AsyncStorage.setItem("userToken", "fake_token_para_desarrollo_12345"); 
    
    // Retorna un éxito simulado con un token falso para que la función que llama lo use
    return {
        success: true,
        message: "Login simulado exitosamente",
        token: "fake_token_para_desarrollo_12345", // Se devuelve también para consistencia
        user: { email: email, name: "Usuario Simulado" } // Datos de usuario simulados
    };

    // **********************************************************************
    // *** FIN DEL CÓDIGO TEMPORAL (el resto de la función es el original)***
    // **********************************************************************


    // **********************************************************************
    // *** CÓDIGO ORIGINAL DE LOGIN (COMENTADO PARA SIMULACIÓN)          ***
    // *** DESCOMENTAR TODO EL BLOQUE SIGUIENTE PARA HABILITAR AUTENTICACIÓN REAL ***
    // **********************************************************************
    /*
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
    */
    // **********************************************************************
    // *** FIN DEL CÓDIGO ORIGINAL COMENTADO                            ***
    // **********************************************************************
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