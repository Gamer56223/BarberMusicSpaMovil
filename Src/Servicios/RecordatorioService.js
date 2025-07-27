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


export const listarRecordatorios = async () => {
    try {
        const response = await api.get("/listarRecordatorios");
        console.log("Respuesta listarRecordatorios:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar recordatorios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const DetalleRecordatorioId = async (id) => {
    try {
        const response = await api.get(`listarRecordatorios/${id}`);
        console.log("Respuesta DetalleRecordatorios:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al detalle recordatorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};


export const eliminarRecordatorio = async (id) => {
    console.log("Intentando eliminar recordatorio con ID:", id);
    try {
        const response = await api.delete(`/eliminarRecordatorio/${id}`);
        console.log("Respuesta eliminarRecordatorio:", response.data);
        return { success: true, message: response.data.message || "Excepcion Recordatorio eliminado correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Recordatorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearRecordatorio = async (data) => {
    try {
        const response = await api.post("/crearRecordatorio", data);
        console.log("Respuesta crearRecordatorio:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear recordatorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarRecordatorio = async (id, data) => {
    try {
        const response = await api.put(`/editarRecordatorio/${id}`, data);
        console.log("Respuesta editarRecordatorio:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar el recordatorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};