import api from "./conexion";

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


export const listarAgendamientos = async () => {
    try {
        const response = await api.get("/Scheduling_agendamientos/agendamientos");
        console.log("Respuesta listarAgendamientos:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar agendamientos:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * Función para obtener los detalles de un agendamiento por su ID.
 * @param {string|number} id El ID del agendamiento a buscar.
 * @returns {object} Un objeto con 'success' y 'data' (en caso de éxito) o 'message' (en caso de error).
 */
export const DetalleAgendamientoId = async (id) => {
    console.log("Intentando obtener detalles del agendamiento con ID:", id);
    try {
        const response = await api.get(`/Scheduling_agendamientos/agendamientos/${id}`);
        console.log("Respuesta DetalleAgendamientoId:", response.data);
        // La API debe devolver un objeto de agendamiento, lo devolvemos en 'data'
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al obtener detalles del agendamiento:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};


export const eliminarAgendamiento = async (id) => {
    console.log("Intentando eliminar agendamiento con ID:", id);
    try {
        const response = await api.delete(`/Scheduling_agendamientos/agendamientos/${id}`);
        console.log("Respuesta eliminarAgendamiento:", response.data);
        return { success: true, message: response.data.message || "Agendamiento eliminado correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Agendamiento:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};


export const editarAgendamiento = async (id, data) => {
    try {
        const response = await api.put(`/Scheduling_agendamientos/agendamientos/${id}`, data);
        console.log("Respuesta editarAgendamiento:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar el agendamiento:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};
