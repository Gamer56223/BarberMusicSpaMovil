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


// export const listarDetalleOrdenes = async () => {
//     try {
//         const response = await api.get("/listarDetalleOrdenes");
//         console.log("Respuesta listarDetalleOrdenes:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al listar detalleordenes:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// }

// export const DetalleOrdenId = async (id) => {
//     try {
//         const response = await api.get(`listarDetalleOrdenes/${id}`);
//         console.log("Respuesta DetalleDetalleOrdenes:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al detalle detalle orden:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };


// export const eliminarDetalleOrden = async (id) => {
//     console.log("Intentando eliminar detalle orden con ID:", id);
//     try {
//         const response = await api.delete(`/eliminarDetalleOrden/${id}`);
//         console.log("Respuesta eliminarDetalleOrden:", response.data);
//         return { success: true, message: response.data.message || "Detalle Orden eliminada correctamente" };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al eliminar Detalle Orden:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };

// export const crearDetalleOrden = async (data) => {
//     try {
//         const response = await api.post("/crearDetalleOrden", data);
//         console.log("Respuesta crearDetalleOrden:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al crear detalle orden:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };

// export const editarDetalleOrden = async (id, data) => {
//     try {
//         const response = await api.put(`/editarDetalleOrden/${id}`, data);
//         console.log("Respuesta editarDetalleOrden:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al editar el detalle orden:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };