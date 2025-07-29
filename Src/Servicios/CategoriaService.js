import api from "./conexion";

const formatErrorMessage = (errorResponseData) => {
    // ... (esta función no cambia)
    if (typeof errorResponseData === 'string') return errorResponseData;
    if (errorResponseData && typeof errorResponseData === 'object') {
        if (errorResponseData.errors) {
            return Object.values(errorResponseData.errors).flat().join('\n');
        }
        if (errorResponseData.message) {
            return typeof errorResponseData.message === 'string' ? errorResponseData.message : JSON.stringify(errorResponseData.message);
        }
        return JSON.stringify(errorResponseData);
    }
    return "Error desconocido";
};

export const listarCategorias = async () => {
    // ... (esta función no cambia)
    try {
        const response = await api.get("/Admin_categorias/categorias");
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        return { success: false, message: errorMessage };
    }
}

export const DetalleCategoriaId = async (id) => {
    // ... (esta función no cambia)
    try {
        const response = await api.get(`/Admin_categorias/categorias/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        return { success: false, message: errorMessage };
    }
};

export const eliminarCategoria = async (id) => {
    // ... (esta función no cambia)
    try {
        const response = await api.delete(`/Admin_categorias/categorias/${id}`);
        return { success: true, message: response.data.message || "Categoria eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        return { success: false, message: errorMessage };
    }
};

// --- FUNCIÓN CORREGIDA ---
export const crearCategoria = async (data) => {
    // 1. Convertimos el objeto de datos a FormData
    const formData = new FormData();
    for (const key in data) {
        if (data[key] !== null) { // Evita enviar valores nulos
            formData.append(key, data[key]);
        }
    }

    try {
        // 2. Enviamos el objeto FormData
        const response = await api.post("/Admin_categorias/categorias", formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Aseguramos la cabecera correcta
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear categoria:", error.response ? error.response.data : error.message);
        return { success: false, message: errorMessage };
    }
};


// --- FUNCIÓN CORREGIDA (PROACTIVAMENTE) ---
// La función de editar tendría el mismo problema, así que también la corrijo.
export const editarCategoria = async (id, data) => {
    const formData = new FormData();
    for (const key in data) {
        if (data[key] !== null) {
            formData.append(key, data[key]);
        }
    }
    // Truco común para que Laravel acepte 'PUT' con FormData
    formData.append('_method', 'PUT'); 

    try {
        // Se envía como POST pero con el método 'PUT' especificado dentro
        const response = await api.post(`/Admin_categorias/categorias/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar la categoria:", error.response ? error.response.data : error.message);
        return { success: false, message: errorMessage };
    }
};