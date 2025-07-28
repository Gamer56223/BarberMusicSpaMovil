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


export const listarServicios = async () => {
    try {
        const response = await api.get("/Catalog_servicios/servicios");
        console.log("Respuesta listarServicios:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar servicios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const DetalleServicioId = async (id) => {
    try {
        const response = await api.get(`/Catalog_servicios/servicios/${id}`);
        console.log("Respuesta DetalleServicios:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al detalle servicio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};


export const eliminarServicio = async (id) => {
    console.log("Intentando eliminar servicio con ID:", id);
    try {
        const response = await api.delete(`/Catalog_servicios/servicios/${id}`);
        console.log("Respuesta eliminarServicio:", response.data);
        return { success: true, message: response.data.message || "Servicio eliminado correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Servicio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearServicio = async (data) => {
    try {
        const response = await api.post("/Catalog_servicios/servicios", data);
        console.log("Respuesta crearServicio:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear servicio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarServicio = async (id, data) => {
    try {
        const response = await api.put(`/Catalog_servicios/servicios/${id}`, data);
        console.log("Respuesta editarServicio:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar el servicio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};