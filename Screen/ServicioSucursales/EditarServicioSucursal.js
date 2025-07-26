// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarServicioSucursal } from "../../Src/Servicios/ServicioSucursalService"; // Asume que tienes este servicio
// import { listarServicios } from "../../Src/Servicios/ServicioService"; // Servicio para listar servicios
// import { listarSucursales } from "../../Src/Servicios/SucursalService"; // Servicio para listar sucursales

// import styles from "../../Styles/EditarServicioSucursalStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarServicioSucursal({ navigation }) {
//     const route = useRoute();
//     const servicioSucursalInicial = route.params?.servicioSucursal;

//     const [servicioId, setServicioId] = useState(servicioSucursalInicial?.servicio_id?.toString() || "");
//     const [sucursalId, setSucursalId] = useState(servicioSucursalInicial?.sucursal_id?.toString() || "");
//     const [precioEnSucursal, setPrecioEnSucursal] = useState(servicioSucursalInicial?.precio_en_sucursal?.toString() || "");
//     const [estaDisponible, setEstaDisponible] = useState(servicioSucursalInicial?.esta_disponible ? "1" : "0");

//     const [servicios, setServicios] = useState([]);
//     const [sucursales, setSucursales] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const esEdicion = !!servicioSucursalInicial;

//     const getAlertMessage = (msg, defaultMsg) => {
//         if (typeof msg === 'string') {
//             return msg;
//         }
//         if (msg && typeof msg === 'object') {
//             if (msg.errors) {
//                 const messages = Object.values(msg.errors).flat();
//                 return messages.join('\n');
//             }
//             if (msg.message) {
//                 if (typeof msg.message === 'string') {
//                     return msg.message;
//                 }
//                 return JSON.stringify(msg.message);
//             }
//             return JSON.stringify(msg);
//         }
//         return defaultMsg;
//     };

//     useEffect(() => {
//         const cargarDependencias = async () => {
//             setLoadingDependencies(true);
//             try {
//                 const [resServicios, resSucursales] = await Promise.all([listarServicios(), listarSucursales()]);

//                 if (resServicios.success) {
//                     setServicios(resServicios.data);
//                     if (!esEdicion && resServicios.data.length > 0) {
//                         setServicioId(resServicios.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resServicios.message || "No se pudieron cargar los servicios.");
//                 }

//                 if (resSucursales.success) {
//                     setSucursales(resSucursales.data);
//                     if (!esEdicion && resSucursales.data.length > 0) {
//                         setSucursalId(resSucursales.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resSucursales.message || "No se pudieron cargar las sucursales.");
//                 }
//             } catch (error) {
//                 console.error("Error al cargar dependencias:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar las dependencias.");
//             } finally {
//                 setLoadingDependencies(false);
//             }
//         };
//         cargarDependencias();
//     }, [esEdicion]);

//     const handleGuardar = async () => {
//         if (!servicioId || !sucursalId || !precioEnSucursal) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 servicio_id: parseInt(servicioId),
//                 sucursal_id: parseInt(sucursalId),
//                 precio_en_sucursal: parseFloat(precioEnSucursal),
//                 esta_disponible: estaDisponible === "1" ? true : false,
//             };

//             // Dado que no hay un ID único para la tabla pivote, asumo que la edición se realiza por servicio_id y sucursal_id
//             // En una API REST real, esto podría requerir un endpoint específico o un ID compuesto.
//             // Para fines de ejemplo, pasaremos ambos IDs al servicio.
//             result = await editarServicioSucursal(servicioId, sucursalId, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Asignación de servicio a sucursal actualizada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la asignación de servicio a sucursal"));
//             }
//         } catch (error) {
//             console.error("Error al guardar asignación:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la asignación."));
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <KeyboardAvoidingView
//             style={styles.keyboardAvoidingView}
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <ScrollView contentContainerStyle={styles.scrollContainer}>
//                     <View style={styles.container}>
//                         <Text style={styles.title}>{esEdicion ? "Editar Servicio por Sucursal" : "Nueva Asignación de Servicio a Sucursal"}</Text>

//                         {loadingDependencies ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabelActual}>Servicio:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={servicioId}
//                                         onValueChange={(itemValue) => setServicioId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                         enabled={!esEdicion} // No permitir cambiar el servicio en edición si es parte de la clave compuesta
//                                     >
//                                         <Picker.Item label="-- Seleccione Servicio --" value="" />
//                                         {servicios.map((servicio) => (
//                                             <Picker.Item key={servicio.id.toString()} label={servicio.nombre} value={servicio.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabelActual}>Sucursal:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={sucursalId}
//                                         onValueChange={(itemValue) => setSucursalId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                         enabled={!esEdicion} // No permitir cambiar la sucursal en edición si es parte de la clave compuesta
//                                     >
//                                         <Picker.Item label="-- Seleccione Sucursal --" value="" />
//                                         {sucursales.map((sucursal) => (
//                                             <Picker.Item key={sucursal.id.toString()} label={sucursal.nombre} value={sucursal.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Precio en Sucursal"
//                             placeholderTextColor="#888"
//                             value={precioEnSucursal}
//                             onChangeText={setPrecioEnSucursal}
//                             keyboardType="numeric"
//                         />

//                         <Text style={styles.pickerLabelActual}>¿Está Disponible?</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={estaDisponible}
//                                 onValueChange={(itemValue) => setEstaDisponible(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="Sí" value="1" />
//                                 <Picker.Item label="No" value="0" />
//                             </Picker>
//                         </View>

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingDependencies}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Asignación"}</Text>
//                                 </View>
//                             )}
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//                             <Ionicons name="arrow-back-circle-outline" size={24} color="#555" />
//                             <Text style={styles.backButtonText}>Volver</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ScrollView>
//             </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//     );
// }