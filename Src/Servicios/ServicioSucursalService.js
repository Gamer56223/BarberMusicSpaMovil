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


// export const listarServicioSucursales = async () => {
//     try {
//         const response = await api.get("/listarServicioSucursales");
//         console.log("Respuesta listarServicioSucursales:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al listar servicio sucursales:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// }

// export const DetalleServicioSucursalId = async (id) => {
//     try {
//         const response = await api.get(`listarServicioSucursales/${id}`);
//         console.log("Respuesta DetalleServicioSucursales:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al detalle servicio sucursal:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };


// export const eliminarServicioSucursal = async (id) => {
//     console.log("Intentando eliminar servicio sucursal con ID:", id);
//     try {
//         const response = await api.delete(`/eliminarServicioSucursal/${id}`);
//         console.log("Respuesta eliminarServicioSucursal:", response.data);
//         return { success: true, message: response.data.message || "Excepcion Servicio Sucursal eliminado correctamente" };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al eliminar Servicio Sucursal:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage,
//         };
//     }
// };

// export const crearServicioSucursal = async (data) => {
//     try {
//         const response = await api.post("/crearServicioSucursal", data);
//         console.log("Respuesta crearServicioSucursal:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al crear servicio sucursal:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };

// export const editarServicioSucursal = async (id, data) => {
//     try {
//         const response = await api.put(`/editarServicioSucursal/${id}`, data);
//         console.log("Respuesta editarServicioSucursal:", response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
//         console.error("Error al editar el servicio sucursal:", error.response ? error.response.data : error.message);
//         return {
//             success: false,
//             message: errorMessage
//         };
//     }
// };