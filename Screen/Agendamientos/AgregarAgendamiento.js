// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from "@react-native-picker/picker";
// import { crearAgendamiento } from "../../Src/Servicios/AgendamientoService"; // Asume que tienes este servicio
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService"; // Asume que tienes este servicio
// import { listarPersonal } from "../../Src/Servicios/PersonalService"; // Asume que tienes este servicio
// import { listarServicios } from "../../Src/Servicios/ServicioService"; // Asume que tienes este servicio
// import { listarSucursales } from "../../Src/Servicios/SucursalService"; // Asume que tienes este servicio

// import styles from "../../Styles/AgregarAgendamientoStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarAgendamiento({ navigation }) {
//     const [clienteUsuarioId, setClienteUsuarioId] = useState("");
//     const [personalId, setPersonalId] = useState("");
//     const [servicioId, setServicioId] = useState("");
//     const [sucursalId, setSucursalId] = useState("");
//     const [fechaHoraInicio, setFechaHoraInicio] = useState(""); // Formato 'YYYY-MM-DD HH:MM:SS'
//     const [fechaHoraFin, setFechaHoraFin] = useState(""); // Formato 'YYYY-MM-DD HH:MM:SS'
//     const [precioFinal, setPrecioFinal] = useState("");
//     const [estado, setEstado] = useState("");
//     const [notasCliente, setNotasCliente] = useState("");
//     const [notasInternas, setNotasInternas] = useState("");

//     const [usuarios, setUsuarios] = useState([]);
//     const [personal, setPersonal] = useState([]);
//     const [servicios, setServicios] = useState([]);
//     const [sucursales, setSucursales] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingData, setLoadingData] = useState(true);

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
//         const cargarDatosIniciales = async () => {
//             setLoadingData(true);
//             try {
//                 const [
//                     resultUsuarios,
//                     resultPersonal,
//                     resultServicios,
//                     resultSucursales,
//                 ] = await Promise.all([
//                     listarUsuarios(),
//                     listarPersonal(),
//                     listarServicios(),
//                     listarSucursales(),
//                 ]);

//                 if (resultUsuarios.success) {
//                     setUsuarios(resultUsuarios.data);
//                     if (resultUsuarios.data.length > 0) {
//                         setClienteUsuarioId(resultUsuarios.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar usuarios", resultUsuarios.message || "No se pudieron cargar los usuarios.");
//                 }

//                 if (resultPersonal.success) {
//                     setPersonal(resultPersonal.data);
//                     if (resultPersonal.data.length > 0) {
//                         setPersonalId(resultPersonal.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar personal", resultPersonal.message || "No se pudo cargar el personal.");
//                 }

//                 if (resultServicios.success) {
//                     setServicios(resultServicios.data);
//                     if (resultServicios.data.length > 0) {
//                         setServicioId(resultServicios.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar servicios", resultServicios.message || "No se pudieron cargar los servicios.");
//                 }

//                 if (resultSucursales.success) {
//                     setSucursales(resultSucursales.data);
//                     if (resultSucursales.data.length > 0) {
//                         setSucursalId(resultSucursales.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar sucursales", resultSucursales.message || "No se pudieron cargar las sucursales.");
//                 }

//             } catch (error) {
//                 console.error("Error al cargar datos iniciales:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos iniciales.");
//             } finally {
//                 setLoadingData(false);
//             }
//         };
//         cargarDatosIniciales();
//     }, []);

//     const handleGuardar = async () => {
//         if (!clienteUsuarioId || !personalId || !servicioId || !sucursalId || !fechaHoraInicio || !fechaHoraFin || !precioFinal || !estado) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         const precioNumerico = parseFloat(precioFinal);
//         if (isNaN(precioNumerico)) {
//             Alert.alert("Formato de Precio", "Por favor, ingrese un precio final válido.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearAgendamiento({
//                 cliente_usuario_id: parseInt(clienteUsuarioId),
//                 personal_id: parseInt(personalId),
//                 servicio_id: parseInt(servicioId),
//                 sucursal_id: parseInt(sucursalId),
//                 fecha_hora_inicio: fechaHoraInicio,
//                 fecha_hora_fin: fechaHoraFin,
//                 precio_final: precioNumerico,
//                 estado: estado,
//                 notas_cliente: notasCliente,
//                 notas_internas: notasInternas,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Agendamiento creado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el agendamiento"));
//             }
//         } catch (error) {
//             console.error("Error al crear agendamiento:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el agendamiento."));
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
//                         <Text style={styles.title}>Nuevo Agendamiento</Text>

//                         {loadingData ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabel}>Cliente:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={clienteUsuarioId}
//                                         onValueChange={(itemValue) => setClienteUsuarioId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione un Cliente --" value="" />
//                                         {usuarios.map((usuario) => (
//                                             <Picker.Item key={usuario.id.toString()} label={usuario.nombre || usuario.email} value={usuario.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabel}>Personal:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={personalId}
//                                         onValueChange={(itemValue) => setPersonalId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione un Personal --" value="" />
//                                         {personal.map((p) => (
//                                             <Picker.Item key={p.id.toString()} label={p.nombre} value={p.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabel}>Servicio:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={servicioId}
//                                         onValueChange={(itemValue) => setServicioId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione un Servicio --" value="" />
//                                         {servicios.map((s) => (
//                                             <Picker.Item key={s.id.toString()} label={s.nombre} value={s.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabel}>Sucursal:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={sucursalId}
//                                         onValueChange={(itemValue) => setSucursalId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione una Sucursal --" value="" />
//                                         {sucursales.map((suc) => (
//                                             <Picker.Item key={suc.id.toString()} label={suc.nombre} value={suc.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Fecha y Hora de Inicio (YYYY-MM-DD HH:MM:SS)"
//                             placeholderTextColor="#888"
//                             value={fechaHoraInicio}
//                             onChangeText={setFechaHoraInicio}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Fecha y Hora de Fin (YYYY-MM-DD HH:MM:SS)"
//                             placeholderTextColor="#888"
//                             value={fechaHoraFin}
//                             onChangeText={setFechaHoraFin}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Precio Final"
//                             placeholderTextColor="#888"
//                             value={precioFinal}
//                             onChangeText={setPrecioFinal}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Estado (ej. Confirmado, Pendiente)"
//                             placeholderTextColor="#888"
//                             value={estado}
//                             onChangeText={setEstado}
//                         />
//                         <TextInput
//                             style={styles.inputMultiline}
//                             placeholder="Notas del Cliente (Opcional)"
//                             placeholderTextColor="#888"
//                             value={notasCliente}
//                             onChangeText={setNotasCliente}
//                             multiline
//                             numberOfLines={3}
//                         />
//                         <TextInput
//                             style={styles.inputMultiline}
//                             placeholder="Notas Internas (Opcional)"
//                             placeholderTextColor="#888"
//                             value={notasInternas}
//                             onChangeText={setNotasInternas}
//                             multiline
//                             numberOfLines={3}
//                         />

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Agendamiento</Text>
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