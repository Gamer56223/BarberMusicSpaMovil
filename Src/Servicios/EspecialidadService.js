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


// export const listarEspecialidades = async () => {
//     try {
//         const response = await api.get("/listarEspecialidades");
//         console.log("Respuesta listarEspecialidades:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al listar especialidades:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// }

// export const DetalleEspecialidadId = async (id) => {
//     try {
//         const response = await api.get(`listarEspecialidades/${id}`);
//         console.log("Respuesta DetalleEspecialidades:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al detalle especialidad:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };


// export const eliminarEspecialidad = async (id) => {
//     console.log("Intentando eliminar especialidad con ID:", id);
//     try {
//         const response = await api.delete(`/eliminarEspecialidad/${id}`);
//         console.log("Respuesta eliminarEspecialidad:", response.data);
//         return { success: true, message: response.data.message || "Especialidad eliminada correctamente" };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al eliminar Especialidad:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };

// export const crearEspecialidad = async (data) => {
//     try {
//         const response = await api.post("/crearEspecialidad", data);
//         console.log("Respuesta crearEspecialidad:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al crear especialidad:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };

// export const editarEspecialidad = async (id, data) => {
//     try {
//         const response = await api.put(`/editarEspecialidad/${id}`, data);
//         console.log("Respuesta editarEspecialidad:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al editar la especialidad:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };