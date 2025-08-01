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

// *** CAMBIO AQUÍ: RENOMBRADA a listarPersonal (singular) ***
export const listarPersonal = async () => { //
    try {
        const response = await api.get("/Admin_personal/personal");
        console.log("Respuesta listarPersonal:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar personal:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const eliminarPersonal = async (id) => {
    console.log("Intentando eliminar personal con ID:", id);
    try {
        const response = await api.delete(`/Admin_personal/personal/${id}`);
        console.log("Respuesta eliminarPersonal:", response.data);
        return { success: true, message: response.data.message || "Personal eliminado correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Personal:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearPersonal = async (data) => {
    try {
        const response = await api.post("/Admin_personal/personal", data);
        console.log("Respuesta crearPersonal:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear personal:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

// *** NUEVA FUNCIÓN AGREGADA para obtener el detalle de un personal por su ID ***
export const DetallePersonalId = async (id) => {
    console.log("Intentando obtener detalle de personal con ID:", id);
    try {
        const response = await api.get(`/Admin_personal/personal/${id}`);
        console.log("Respuesta DetallePersonalId:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al obtener detalle de Personal:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};
