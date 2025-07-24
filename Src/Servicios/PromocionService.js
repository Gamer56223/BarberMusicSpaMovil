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


// export const listarPromociones = async () => {
//     try {
//         const response = await api.get("/listarPromociones");
//         console.log("Respuesta listarPromociones:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al listar promociones:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// }

// export const DetallePromocionId = async (id) => {
//     try {
//         const response = await api.get(`listarPromociones/${id}`);
//         console.log("Respuesta DetallePromociones:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al detalle promocion:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };


// export const eliminarPromocion = async (id) => {
//     console.log("Intentando eliminar promocion con ID:", id);
//     try {
//         const response = await api.delete(`/eliminarPromocion/${id}`);
//         console.log("Respuesta eliminarProducto:", response.data);
//         return { success: true, message: response.data.message || "Excepcion Promocion eliminada correctamente" };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al eliminar Promocion:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };

// export const crearPromocion = async (data) => {
//     try {
//         const response = await api.post("/crearPromocion", data);
//         console.log("Respuesta crearPromocion:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al crear producto:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };

// export const editarPromocion = async (id, data) => {
//     try {
//         const response = await api.put(`/editarPromocion/${id}`, data);
//         console.log("Respuesta editarPromocion:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al editar la promocion:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };