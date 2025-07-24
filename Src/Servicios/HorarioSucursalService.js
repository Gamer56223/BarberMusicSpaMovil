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


// export const listarHorarioSucursales = async () => {
//     try {
//         const response = await api.get("/listarHorarioSucursales");
//         console.log("Respuesta listarHorarioSucursales:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al listar horario sucursales:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// }

// export const DetalleHorarioSucursalId = async (id) => {
//     try {
//         const response = await api.get(`listarHorarioSucursales/${id}`);
//         console.log("Respuesta DetalleHorarioSucursales:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al detalle horario sucursal:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };


// export const eliminarHorarioSucursal = async (id) => {
//     console.log("Intentando eliminar horario sucursal con ID:", id);
//     try {
//         const response = await api.delete(`/eliminarHorarioSucursal/${id}`);
//         console.log("Respuesta eliminarHorarioSucursal:", response.data);
//         return { success: true, message: response.data.message || "Excepcion Horario Sucursal eliminada correctamente" };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al eliminar Horario Sucursal:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };

// export const crearHorarioSucursal = async (data) => {
//     try {
//         const response = await api.post("/crearHorarioSucursal", data);
//         console.log("Respuesta crearHorarioSucursal:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al crear horario sucursal:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };

// export const editarHorarioSucursal = async (id, data) => {
//     try {
//         const response = await api.put(`/editarHorarioSucursal/${id}`, data);
//         console.log("Respuesta editarHorarioSucursal:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al editar el horario sucursal:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };