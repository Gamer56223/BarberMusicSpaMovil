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
 * @description Obtiene todas las promociones de la API.
 * @returns {Promise<{success: boolean, data?: object[], message?: string}>}
 */
export const listarPromociones = async () => {
    try {
        const response = await api.get("/Admin_promociones/promociones");
        console.log("Respuesta listarPromociones:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar promociones:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

/**
 * @description Obtiene los detalles de una promoción por su ID.
 * @param {number} id - El ID de la promoción a obtener.
 * @returns {Promise<{success: boolean, data?: object, message?: string}>}
 */
export const DetallePromocionId = async (id) => {
    try {
        const response = await api.get(`/Admin_promociones/promociones/${id}`);
        console.log("Respuesta DetallePromociones:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al detalle promocion:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * @description Elimina una promoción por su ID.
 * @param {number} id - El ID de la promoción a eliminar.
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export const eliminarPromocion = async (id) => {
    console.log("Intentando eliminar promocion con ID:", id);
    try {
        const response = await api.delete(`/Admin_promociones/promociones/${id}`);
        console.log("Respuesta eliminarProducto:", response.data);
        return { success: true, message: response.data.message || "Excepcion Promocion eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Promocion:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * @description Crea una nueva promoción.
 * @param {object} data - Los datos de la promoción a crear.
 * @returns {Promise<{success: boolean, data?: object, message?: string}>}
 */
export const crearPromocion = async (data) => {
    try {
        const response = await api.post("/Admin_promociones/promociones", data);
        console.log("Respuesta crearPromocion:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear producto:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

/**
 * @description Edita una promoción existente.
 * @param {number} id - El ID de la promoción a editar.
 * @param {object} data - Los datos actualizados de la promoción.
 * @returns {Promise<{success: boolean, data?: object, message?: string}>}
 */
export const editarPromocion = async (id, data) => {
    try {
        const response = await api.put(`/Admin_promociones/promociones/${id}`, data);
        console.log("Respuesta editarPromocion:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar la promocion:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};
