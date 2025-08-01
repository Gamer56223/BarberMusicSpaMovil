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


export const listarUsuarios = async () => {
    try {
        const response = await api.get("/Admin_personal/usuarios"); // RUTA CORREGIDA
        console.log("Respuesta listarUsuarios:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar usuarios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const DetalleUsuarioId = async (id) => {
    try {
        const response = await api.get(`/Admin_personal/usuarios/${id}`); // RUTA CORREGIDA
        console.log("Respuesta DetalleUsuarios:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al detalle usuario:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};


export const eliminarUsuario = async (id) => {
    console.log("Intentando eliminar usuario con ID:", id);
    try {
        const response = await api.delete(`/Admin_personal/usuarios/${id}`); // RUTA CORREGIDA
        console.log("Respuesta eliminarUsuario:", response.data);
        return { success: true, message: response.data.message || "Usuario eliminado correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Usuario:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearUsuario = async (data) => {
    try {
        const response = await api.post("/Admin_personal/usuarios", data); // RUTA CORREGIDA
        console.log("Respuesta crearUsuario:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear usuario:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarUsuario = async (id, data) => {
    try {
        const response = await api.put(`/Admin_personal/usuarios/${id}`, data); // RUTA CORREGIDA
        console.log("Respuesta editarUsuario:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar usuario:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};