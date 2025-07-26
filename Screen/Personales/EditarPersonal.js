// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarPersonal } from "../../Src/Servicios/PersonalService"; // Asume que tienes este servicio
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService"; // Servicio para listar usuarios
// import { listarSucursales } from "../../Src/Servicios/SucursalService"; // Servicio para listar sucursales

// import styles from "../../Styles/EditarPersonalStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarPersonal({ navigation }) {
//     const route = useRoute();
//     const personalInicial = route.params?.personal;

//     const [usuarioId, setUsuarioId] = useState(personalInicial?.usuario_id?.toString() || "");
//     const [sucursalAsignadaId, setSucursalAsignadaId] = useState(personalInicial?.sucursal_asignada_id?.toString() || "");
//     const [tipoPersonal, setTipoPersonal] = useState(personalInicial?.tipo_personal || "");
//     const [numeroEmpleado, setNumeroEmpleado] = useState(personalInicial?.numero_empleado || "");
//     const [fechaContratacion, setFechaContratacion] = useState(personalInicial?.fecha_contratacion ? new Date(personalInicial.fecha_contratacion) : new Date());
//     const [activoEnEmpresa, setActivoEnEmpresa] = useState(personalInicial?.activo_en_empresa ? "1" : "0");

//     const [usuarios, setUsuarios] = useState([]);
//     const [sucursales, setSucursales] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const [showDatePicker, setShowDatePicker] = useState(false);

//     const esEdicion = !!personalInicial;

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
//                 const [resUsuarios, resSucursales] = await Promise.all([listarUsuarios(), listarSucursales()]);

//                 if (resUsuarios.success) {
//                     setUsuarios(resUsuarios.data);
//                     if (!esEdicion && resUsuarios.data.length > 0) {
//                         setUsuarioId(resUsuarios.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resUsuarios.message || "No se pudieron cargar los usuarios.");
//                 }

//                 if (resSucursales.success) {
//                     setSucursales(resSucursales.data);
//                     if (!esEdicion && resSucursales.data.length > 0) {
//                         setSucursalAsignadaId(resSucursales.data[0].id.toString());
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

//     const onDateChange = (event, selectedDate) => {
//         const currentDate = selectedDate || fechaContratacion;
//         setShowDatePicker(Platform.OS === 'ios');
//         setFechaContratacion(currentDate);
//     };

//     const tiposPersonal = [
//         "ADMIN_GENERAL",
//         "ADMIN_SUCURSAL",
//         "BARBERO",
//         "ESTILISTA",
//         "COSMIATRA",
//         "MASAJISTA",
//         "TECNICO_LASER",
//         "DISEÑADOR_CEJAS_MICROPIGMENTACION",
//         // Agrega otros tipos según sea necesario
//     ];

//     const handleGuardar = async () => {
//         if (!usuarioId || !sucursalAsignadaId || !tipoPersonal || !numeroEmpleado || !fechaContratacion) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 usuario_id: parseInt(usuarioId),
//                 sucursal_asignada_id: parseInt(sucursalAsignadaId),
//                 tipo_personal: tipoPersonal,
//                 numero_empleado: numeroEmpleado,
//                 fecha_contratacion: fechaContratacion.toISOString().split('T')[0], // Formato YYYY-MM-DD
//                 activo_en_empresa: activoEnEmpresa === "1" ? true : false,
//             };

//             result = await editarPersonal(personalInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Personal actualizado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar el personal"));
//             }
//         } catch (error) {
//             console.error("Error al guardar personal:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el personal."));
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
//                         <Text style={styles.title}>{esEdicion ? "Editar Personal" : "Nuevo Personal"}</Text>

//                         {loadingDependencies ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabelActual}>Usuario:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={usuarioId}
//                                         onValueChange={(itemValue) => setUsuarioId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Usuario --" value="" />
//                                         {usuarios.map((user) => (
//                                             <Picker.Item key={user.id.toString()} label={user.nombre} value={user.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabelActual}>Sucursal Asignada:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={sucursalAsignadaId}
//                                         onValueChange={(itemValue) => setSucursalAsignadaId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Sucursal --" value="" />
//                                         {sucursales.map((suc) => (
//                                             <Picker.Item key={suc.id.toString()} label={suc.nombre} value={suc.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <Text style={styles.pickerLabelActual}>Tipo de Personal:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={tipoPersonal}
//                                 onValueChange={(itemValue) => setTipoPersonal(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione Tipo --" value="" />
//                                 {tiposPersonal.map((tipo) => (
//                                     <Picker.Item key={tipo} label={tipo.replace(/_/g, ' ')} value={tipo} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Número de Empleado"
//                             placeholderTextColor="#888"
//                             value={numeroEmpleado}
//                             onChangeText={setNumeroEmpleado}
//                         />

//                         <Text style={styles.label}>Fecha de Contratación:</Text>
//                         <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>{fechaContratacion.toLocaleDateString()}</Text>
//                         </TouchableOpacity>
//                         {showDatePicker && (
//                             <DateTimePicker
//                                 testID="datePicker"
//                                 value={fechaContratacion}
//                                 mode="date"
//                                 display="default"
//                                 onChange={onDateChange}
//                             />
//                         )}

//                         <Text style={styles.pickerLabelActual}>Activo en la Empresa:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={activoEnEmpresa}
//                                 onValueChange={(itemValue) => setActivoEnEmpresa(itemValue)}
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
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Personal"}</Text>
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