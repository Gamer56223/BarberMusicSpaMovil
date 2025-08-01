import api from "./conexion";

/**
 * Formatea un mensaje de error a partir de la respuesta de la API.
 * @param {object | string} errorResponseData - Los datos de error de la respuesta.
 * @returns {string} - El mensaje de error formateado.
 */
const formatErrorMessage = (errorResponseData) => {
    if (typeof errorResponseData === 'string') {
        return errorResponseData;
    }
    if (errorResponseData && typeof errorResponseData === 'object') {
        if (errorResponseData.errors) {
            const messages = Object.values(errorResponseData.errors).flat();
            return messages.join('\n');
        }
        if (errorResponseData.message) {
            if (typeof errorResponseData.message === 'string') {
                return errorResponseData.message;
            }
            return JSON.stringify(errorResponseData.message);
        }
        return JSON.stringify(errorResponseData);
    }
    return "Error desconocido";
};


/**
 * Obtiene la lista completa de órdenes.
 * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
 */
export const listarOrdenes = async () => {
    try {
        const response = await api.get("/Client_ordenes/ordenes/all");
        console.log("Respuesta listarOrdenes:", response.data);
        
        // Se asegura de que la propiedad 'data' exista antes de acceder a ella
        if (!response.data || !response.data.data) {
            return { success: false, message: "Formato de respuesta inesperado." };
        }
        
        return { success: true, data: response.data.data };

    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar ordenes:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

/**
 * Obtiene el detalle de una orden específica por su ID.
 * @param {string} id - El ID de la orden.
 * @returns {Promise<{success: boolean, data?: object, message?: string}>}
 */
export const DetalleOrdenId = async (id) => {
    // Log para verificar el ID recibido por el servicio
    console.log("OrdenService: Intentando obtener detalle para el ID:", id);
    
    try {
        // Log para ver la URL completa de la petición
        console.log("OrdenService: Realizando petición a:", `/Client_ordenes/ordenes/${id}`);
        const response = await api.get(`/Client_ordenes/ordenes/${id}`);
        
        // Log para ver la respuesta completa de la API
        console.log("OrdenService: Respuesta completa de la API:", response);
        
        const ordenData = response.data.data ? response.data.data : response.data;
        
        if (!ordenData) {
            return { success: false, message: "No se encontró la orden en la respuesta de la API." };
        }

        return { success: true, data: ordenData };

    } catch (error) {
        // Log para ver el error completo de la API
        console.error("OrdenService: Error al detalle orden:", error.response ? error.response.data : error.message);
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        return {
            success: false,
            message: errorMessage,
        };
    }
};


/**
 * Elimina una orden por su ID.
 * @param {string} id - El ID de la orden.
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export const eliminarOrden = async (id) => {
    console.log("Intentando eliminar orden con ID:", id);
    try {
        const response = await api.delete(`/Client_ordenes/ordenes/${id}`);
        console.log("Respuesta eliminarOrden:", response.data);
        return { success: true, message: response.data.message || "Orden eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Orden:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};
