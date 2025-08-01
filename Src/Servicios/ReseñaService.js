import api from "./conexion";

/**
 * @description Formatea y extrae un mensaje de error legible de la respuesta de la API.
 * @param {object|string} errorResponseData - Los datos de error de la respuesta de la API.
 * @returns {string} El mensaje de error formateado.
 */
const formatErrorMessage = (errorResponseData) => {
    if (typeof errorResponseData === 'string') {
        return errorResponseData;
    }
    if (errorResponseData && typeof errorResponseData === 'object') {
        if (errorResponseData.errors) {
            // Maneja errores de validación de Laravel
            const messages = Object.values(errorResponseData.errors).flat();
            return messages.join('\n');
        }
        if (errorResponseData.message) {
            // Maneja mensajes de error genéricos
            if (typeof errorResponseData.message === 'string') {
                return errorResponseData.message;
            }
            return JSON.stringify(errorResponseData.message);
        }
        // Devuelve el objeto completo si no se encuentra un mensaje específico
        return JSON.stringify(errorResponseData);
    }
    return "Error desconocido";
};

/**
 * @description Obtiene todas las reseñas de la API.
 * @returns {Promise<{success: boolean, data?: object[], message?: string}>}
 */
export const listarReseñas = async () => {
    try {
        const response = await api.get("/Client_reseñas/reviews");
        console.log("Respuesta listarReseñas:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar reseñas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * @description Obtiene las reseñas no aprobadas de la API.
 * @returns {Promise<{success: boolean, data?: object[], message?: string}>}
 */
export const listarReseñasNoAprobadas = async () => {
    try {
        // La ruta corregida es 'reviews/pending' según la lista de rutas
        const response = await api.get("/Client_reseñas/reviews/pending");
        console.log("Respuesta listarReseñasNoAprobadas:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar reseñas no aprobadas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * @description Aprueba una reseña por su ID.
 * @param {number} id - El ID de la reseña a aprobar.
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export const aprobarResena = async (id) => {
    try {
        const response = await api.put(`/Client_reseñas/reviews/${id}/aprobar`);
        console.log("Respuesta aprobarResena:", response.data);
        return { success: true, message: "Reseña aprobada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al aprobar reseña:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * @description Elimina una reseña por su ID.
 * @param {number} id - El ID de la reseña a eliminar.
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export const eliminarResena = async (id) => {
    console.log("Intentando eliminar reseña con ID:", id);
    try {
        const response = await api.delete(`/Client_reseñas/reviews/${id}`);
        console.log("Respuesta eliminarResena:", response.data);
        return { success: true, message: response.data.message || "Reseña eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar reseña:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};
