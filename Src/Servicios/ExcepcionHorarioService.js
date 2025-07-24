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


// export const listarExcepcionHorarios = async () => {
//     try {
//         const response = await api.get("/listarExcepcionHorarios");
//         console.log("Respuesta listarExcepcionHorarios:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al listar excepcion horarios:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// }

// export const DetalleExcepcionHorarioId = async (id) => {
//     try {
//         const response = await api.get(`listarExcepcionHorarios/${id}`);
//         console.log("Respuesta DetalleExcepcionHorarios:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al detalle excepcion horario:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };


// export const eliminarExcepcionHorario = async (id) => {
//     console.log("Intentando eliminar excepcion horario con ID:", id);
//     try {
//         const response = await api.delete(`/eliminarExcepcionHorario/${id}`);
//         console.log("Respuesta eliminarExcepcionHorario:", response.data);
//         return { success: true, message: response.data.message || "Excepcion Horario eliminada correctamente" };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al eliminar Excepcion Horario:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };

// export const crearExcepcionHorario = async (data) => {
//     try {
//         const response = await api.post("/crearExcepcionHorario", data);
//         console.log("Respuesta crearExcepcionHorario:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al crear excepcion horario:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };

// export const editarExcepcionHorario = async (id, data) => {
//     try {
//         const response = await api.put(`/editarExcepcionHorario/${id}`, data);
//         console.log("Respuesta editarExcepcionHorario:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al editar la excepcion horario:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };