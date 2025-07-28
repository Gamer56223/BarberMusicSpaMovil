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


export const listarSucursales = async () => {
    try {
        const response = await api.get("/Admin_sucursales/sucursales");
        console.log("Respuesta listarSucursales:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar sucursales:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const DetalleSucursalId = async (id) => {
    try {
        const response = await api.get(`/Admin_sucursales/sucursales/${id}`);
        console.log("Respuesta DetalleSucursales:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al detalle sucursal:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};


export const eliminarSucursal = async (id) => {
    console.log("Intentando eliminar sucursal con ID:", id);
    try {
        const response = await api.delete(`/Admin_sucursales/sucursales/${id}`);
        console.log("Respuesta eliminarSucursal:", response.data);
        return { success: true, message: response.data.message || "Sucursal eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Sucursal:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearSucursal = async (data) => {
    try {
        const response = await api.post("/Admin_sucursales/sucursales", data);
        console.log("Respuesta crearSucursal:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear sucursal:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarSucursal = async (id, data) => {
    try {
        const response = await api.put(`/Admin_sucursales/sucursales/${id}`, data);
        console.log("Respuesta editarSucursal:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar la sucursal:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};