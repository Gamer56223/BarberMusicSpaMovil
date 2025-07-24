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


// export const listarOrdenes = async () => {
//     try {
//         const response = await api.get("/listarOrdenes");
//         console.log("Respuesta listarOrdenes:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al listar ordenes:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// }

// export const DetalleOrdenId = async (id) => {
//     try {
//         const response = await api.get(`listarOrdenes/${id}`);
//         console.log("Respuesta DetalleOrdenes:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al detalle orden:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };


// export const eliminarOrden = async (id) => {
//     console.log("Intentando eliminar orden con ID:", id);
//     try {
//         const response = await api.delete(`/eliminarOrden/${id}`);
//         console.log("Respuesta eliminarOrden:", response.data);
//         return { success: true, message: response.data.message || "Excepcion Orden eliminada correctamente" };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al eliminar Orden:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };

// export const crearOrden = async (data) => {
//     try {
//         const response = await api.post("/crearOrden", data);
//         console.log("Respuesta crearOrden:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al crear orden:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };

// export const editarOrden = async (id, data) => {
//     try {
//         const response = await api.put(`/editarOrden/${id}`, data);
//         console.log("Respuesta editarOrden:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al editar la orden:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };