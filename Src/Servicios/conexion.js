// Src/Servicios/conexion.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Configuración centralizada de Axios para la API.
 */

const API_BASE_URL = "http://192.168.89.78:8000/api";

// Crea la instancia de Axios.
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Tiempo de espera de 10 segundos para las peticiones
});

/**
 * Interceptor de peticiones (Request).
 * Se ejecuta ANTES de que cada petición se envíe.
 * Su función es adjuntar el token de autenticación si existe.
 */
api.interceptors.request.use(
    async (config) => {
        // Intenta obtener el token del almacenamiento.
        const userToken = await AsyncStorage.getItem('userToken');
        
        // Si el token existe, lo añade al encabezado de autorización.
        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
        }
        
        // Devuelve la configuración para que la petición continúe.
        return config;
    },
    (error) => {
        // Si hay un error durante la configuración de la petición, se rechaza.
        return Promise.reject(error);
    }
);

/**
 * Interceptor de respuestas (Response).
 * Se ejecuta DESPUÉS de recibir una respuesta.
 * Útil para manejar errores globales, como un token expirado (401).
 */
api.interceptors.response.use(
    // Si la respuesta es exitosa (status 2xx), simplemente la devuelve.
    (response) => response,
    
    // Si la respuesta es un error...
    async (error) => {
        const originalRequest = error.config;

        // Si el error es un 401 (No Autorizado) y no es un reintento,
        // podría ser un token expirado.
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Previene bucles infinitos de reintentos.
            
            console.warn("Respuesta 401: Token inválido o expirado.");
            
            // Aquí podrías implementar una lógica para refrescar el token si tu API lo permite.
            // Por ahora, simplemente lo eliminamos para forzar un nuevo login.
            await AsyncStorage.removeItem('userToken');

            // Opcional: Redirigir al usuario a la pantalla de login.
            // Esto usualmente se maneja en un nivel superior de la app (ej. en el Contexto de Autenticación).
        }
        
        // Rechaza el error para que pueda ser manejado por el .catch() del código que hizo la llamada.
        return Promise.reject(error);
    }
);

export default api;