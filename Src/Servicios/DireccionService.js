// import api from "./conexion";

// const formatErrorMessage = (errorResponseData) => {
//     if (typeof errorResponseData === 'string') {
//         return errorResponseData;
//     }
//     if (errorResponseData && typeof errorResponseData === 'object') {
//         if (errorResponseData.errors) {
//             const messages = Object.values(errorResponseData.errors).flat();
//             return messages.join('\n');
//         }
//         if (errorResponseData.message) {
//             if (typeof errorResponseData.message === 'string') {
//                 return errorResponseData.message;
//             }
//             return JSON.stringify(errorResponseData.message);
//         }
//         return JSON.stringify(errorResponseData);
//     }
//     return "Error desconocido";
// };


// export const listarDirecciones = async () => {
//     try {
//         const response = await api.get("/listarDirecciones");
//         console.log("Respuesta listarDirecciones:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al listar direcciones:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// }

// export const DetalleDireccionId = async (id) => {
//     try {
//         const response = await api.get(`listarDirecciones/${id}`);
//         console.log("Respuesta DetalleDirecciones:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al detalle direccion:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };


// export const eliminarDireccion = async (id) => {
//     console.log("Intentando eliminar direccion con ID:", id);
//     try {
//         const response = await api.delete(`/eliminarDireccion/${id}`);
//         console.log("Respuesta eliminarDireccion:", response.data);
//         return { success: true, message: response.data.message || "Direccion eliminada correctamente" };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al eliminar Direccion:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };

// export const crearDireccion = async (data) => {
//     try {
//         const response = await api.post("/crearDireccion", data);
//         console.log("Respuesta crearDireccion:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al crear direccion:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };

// export const editarDireccion = async (id, data) => {
//     try {
//         const response = await api.put(`/editarDireccion/${id}`, data);
//         console.log("Respuesta editarDireccion:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al editar la direccion:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };