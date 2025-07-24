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


// export const listarTransaccionPagos = async () => {
//     try {
//         const response = await api.get("/listarTransaccionPagos");
//         console.log("Respuesta listarTransaccionPagos:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al listar transaccion pagos:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// }

// export const DetalleTransaccionPagoId = async (id) => {
//     try {
//         const response = await api.get(`listarTransaccionPagos/${id}`);
//         console.log("Respuesta DetalleTransaccionPagos:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al detalle transaccion pago:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };


// export const eliminarTransaccionPago = async (id) => {
//     console.log("Intentando eliminar transaccion pago con ID:", id);
//     try {
//         const response = await api.delete(`/eliminarTransaccionPago/${id}`);
//         console.log("Respuesta eliminarTransaccionPago:", response.data);
//         return { success: true, message: response.data.message || "Excepcion Transaccion Pago eliminada correctamente" };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al eliminar Transaccion Pago:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };

// export const crearTransaccionPago = async (data) => {
//     try {
//         const response = await api.post("/crearTransaccionPago", data);
//         console.log("Respuesta crearTransaccionPago:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al crear transaccion pago:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };

// export const editarTransaccionPago = async (id, data) => {
//     try {
//         const response = await api.put(`/editarTransaccionPago/${id}`, data);
//         console.log("Respuesta editarTransaccionPago:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al editar la transaccion pago:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };