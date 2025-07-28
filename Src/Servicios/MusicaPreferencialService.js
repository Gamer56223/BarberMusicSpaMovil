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


export const listarMusicaPreferenciales = async () => {
    try {
        const response = await api.get("/Client_musica_preferencias/preferencias");
        console.log("Respuesta listarMusicaPreferenciales:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar musica preferenciales:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const DetalleMusicaPreferencialId = async (id) => {
    try {
        const response = await api.get(`/Client_musica_preferencias/preferencias/${id}`);
        console.log("Respuesta DetalleMusicaPreferenciales:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al detalle musica preferencial:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};


export const eliminarMusicaPreferencial = async (id) => {
    console.log("Intentando eliminar musica preferencial con ID:", id);
    try {
        const response = await api.delete(`/Client_musica_preferencias/preferencias/${id}`);
        console.log("Respuesta eliminarMusicaPreferencial:", response.data);
        return { success: true, message: response.data.message || "Excepcion Musica Preferencial eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Musica Preferencial:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearMusicaPreferencial = async (data) => {
    try {
        const response = await api.post("/Client_musica_preferencias/preferencias", data);
        console.log("Respuesta crearMusicaPreferencial:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear musica preferencial:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarMusicaPreferencial = async (id, data) => {
    try {
        const response = await api.put(`/Client_musica_preferencias/preferencias/${id}`, data);
        console.log("Respuesta editarMusicaPreferencial:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar la musica preferencial:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};