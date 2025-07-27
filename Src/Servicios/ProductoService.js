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
        const response = await api.get("Catalog_productos/productos");
        console.log("Respuesta listarProductos:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar productos:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const DetalleProductoId = async (id) => {
    try {
        const response = await api.get(`Catalog_productos/productos/${id}`);
        console.log("Respuesta DetalleProductos:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al detalle producto:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const eliminarProducto = async (id) => {
    console.log("Intentando eliminar producto con ID:", id);
    try {
        const response = await api.delete(`Catalog_productos/productos/${id}`);
        console.log("Respuesta eliminarProducto:", response.data);
        return { success: true, message: response.data.message || "Producto eliminado correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Producto:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearProducto = async (data) => {
    try {
        const response = await api.post("Catalog_productos/productos", data);
        console.log("Respuesta crearProducto:", response.data);
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

export const editarProducto = async (id, data) => {
    try {
        const response = await api.put(`Catalog_productos/productos/${id}`, data);
        console.log("Respuesta editarProducto:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar el producto:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};