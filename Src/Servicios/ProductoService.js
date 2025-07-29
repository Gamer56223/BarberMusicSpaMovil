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

export const listarProductos = async () => {
    try {
        const response = await api.get("/Catalog_productos/productos");
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const DetalleProductoId = async (id) => {
    try {
        const response = await api.get(`/Catalog_productos/productos/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const eliminarProducto = async (id) => {
    try {
        const response = await api.delete(`/Catalog_productos/productos/${id}`);
        return { success: true, message: response.data.message || "Producto eliminado correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearProducto = async (data) => {
    try {
        const response = await api.post("/Catalog_productos/productos", data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarProducto = async (id, data) => {
    try {
        const response = await api.put(`/Catalog_productos/productos/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        return {
            success: false,
            message: errorMessage
        };
    }
};