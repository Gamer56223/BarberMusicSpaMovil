// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from "@react-native-picker/picker";
// import { crearPersonal } from "../../Src/Servicios/PersonalService"; // Asume que tienes este servicio
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService"; // Ya tenemos este servicio
// import { listarSucursales } from "../../Src/Servicios/SucursalService"; // Ya tenemos este servicio
// import styles from "../../Styles/AgregarPersonalStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarPersonal({ navigation }) {
//     const [usuarioId, setUsuarioId] = useState("");
//     const [sucursalId, setSucursalId] = useState("");
//     const [tipoPersonal, setTipoPersonal] = useState("");
//     const [numeroEmpleado, setNumeroEmpleado] = useState("");
//     const [fechaContratacion, setFechaContratacion] = useState(""); // Formato 'YYYY-MM-DD'
//     const [activoEnEmpresa, setActivoEnEmpresa] = useState(true);

//     const [usuarios, setUsuarios] = useState([]);
//     const [sucursales, setSucursales] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingData, setLoadingData] = useState(true);

//     const tiposPersonal = [
//         { label: "Barbero / Estilista Masculino", value: "BARBERO_ESTILISTA" },
//         { label: "Cosmiatra / Terapeuta en Estética Avanzada", value: "COSMIATRA_ESTETICA" },
//         { label: "Masajista / Terapeuta Corporal", value: "MASAJISTA_CORPORAL" },
//         { label: "Admin General", value: "ADMIN_GENERAL" },
//         { label: "Admin Sucursal", value: "ADMIN_SUCURSAL" },
//         { label: "Recepcionista", value: "RECEPCIONISTA" },
//         { label: "Técnico en Depilación Láser", value: "TECNICO_LASER" },
//         { label: "Estilista / Colorista", value: "ESTILISTA_COLORISTA" },
//         { label: "Diseñador de Cejas / Micropigmentador", value: "DISENADOR_CEJAS" },
//     ];

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
//                 const [resultUsuarios, resultSucursales] = await Promise.all([
//                     listarUsuarios(),
//                     listarSucursales(),
//                 ]);

//                 if (resultUsuarios.success) {
//                     setUsuarios(resultUsuarios.data);
//                     if (resultUsuarios.data.length > 0) {
//                         setUsuarioId(resultUsuarios.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar usuarios", resultUsuarios.message || "No se pudieron cargar los usuarios.");
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
//         if (!usuarioId || !sucursalId || !tipoPersonal || !numeroEmpleado || !fechaContratacion) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearPersonal({
//                 usuario_id: parseInt(usuarioId),
//                 sucursal_id: parseInt(sucursalId),
//                 tipo_personal: tipoPersonal,
//                 numero_empleado: numeroEmpleado,
//                 fecha_contratacion: fechaContratacion,
//                 activo_en_empresa: activoEnEmpresa,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Personal creado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el personal"));
//             }
//         } catch (error) {
//             console.error("Error al crear personal:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el personal."));
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
//                         <Text style={styles.title}>Nuevo Personal</Text>

//                         {loadingData ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabel}>Usuario:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={usuarioId}
//                                         onValueChange={(itemValue) => setUsuarioId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione un Usuario --" value="" />
//                                         {usuarios.map((user) => (
//                                             <Picker.Item key={user.id.toString()} label={user.nombre || user.email} value={user.id.toString()} />
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

//                                 <Text style={styles.pickerLabel}>Tipo de Personal:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={tipoPersonal}
//                                         onValueChange={(itemValue) => setTipoPersonal(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione un Tipo --" value="" />
//                                         {tiposPersonal.map((tipo) => (
//                                             <Picker.Item key={tipo.value} label={tipo.label} value={tipo.value} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Número de Empleado"
//                             placeholderTextColor="#888"
//                             value={numeroEmpleado}
//                             onChangeText={setNumeroEmpleado}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Fecha de Contratación (YYYY-MM-DD)"
//                             placeholderTextColor="#888"
//                             value={fechaContratacion}
//                             onChangeText={setFechaContratacion}
//                         />
                        
//                         <View style={styles.switchContainer}>
//                             <Text style={styles.switchLabel}>Activo en la Empresa:</Text>
//                             <Switch
//                                 onValueChange={setActivoEnEmpresa}
//                                 value={activoEnEmpresa}
//                             />
//                         </View>

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Personal</Text>
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