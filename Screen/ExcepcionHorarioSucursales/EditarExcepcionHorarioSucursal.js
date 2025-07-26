// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from '@react-native-community/datetimepicker'; // Necesitas instalar esta librería: npm install @react-native-community/datetimepicker
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarExcepcionHorarioSucursal } from "../../Src/Servicios/ExcepcionHorarioSucursalService"; // Asume que tienes este servicio
// import { listarSucursales } from "../../Src/Servicios/SucursalService"; // Servicio para listar sucursales

// import styles from "../../Styles/EditarExcepcionHorarioSucursalStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarExcepcionHorarioSucursal({ navigation }) {
//     const route = useRoute();
//     const excepcionInicial = route.params?.excepcion;

//     const [sucursalId, setSucursalId] = useState(excepcionInicial?.sucursal_id?.toString() || "");
//     const [fecha, setFecha] = useState(excepcionInicial?.fecha ? new Date(excepcionInicial.fecha) : new Date());
//     const [estaCerrado, setEstaCerrado] = useState(excepcionInicial?.esta_cerrado ? "1" : "0");
//     const [horaApertura, setHoraApertura] = useState(excepcionInicial?.hora_apertura ? new Date(`2000-01-01T${excepcionInicial.hora_apertura}`) : new Date());
//     const [horaCierre, setHoraCierre] = useState(excepcionInicial?.hora_cierre ? new Date(`2000-01-01T${excepcionInicial.hora_cierre}`) : new Date());
//     const [descripcion, setDescripcion] = useState(excepcionInicial?.descripcion || "");

//     const [sucursales, setSucursales] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [showTimePickerApertura, setShowTimePickerApertura] = useState(false);
//     const [showTimePickerCierre, setShowTimePickerCierre] = useState(false);

//     const esEdicion = !!excepcionInicial;

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
//         const cargarSucursales = async () => {
//             setLoadingDependencies(true);
//             try {
//                 const res = await listarSucursales();
//                 if (res.success) {
//                     setSucursales(res.data);
//                     if (!esEdicion && res.data.length > 0) {
//                         setSucursalId(res.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", res.message || "No se pudieron cargar las sucursales.");
//                 }
//             } catch (error) {
//                 console.error("Error al cargar sucursales:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar las sucursales.");
//             } finally {
//                 setLoadingDependencies(false);
//             }
//         };
//         cargarSucursales();
//     }, [esEdicion]);

//     const onDateChange = (event, selectedDate) => {
//         const currentDate = selectedDate || fecha;
//         setShowDatePicker(Platform.OS === 'ios');
//         setFecha(currentDate);
//     };

//     const onTimeChangeApertura = (event, selectedTime) => {
//         const currentTime = selectedTime || horaApertura;
//         setShowTimePickerApertura(Platform.OS === 'ios');
//         setHoraApertura(currentTime);
//     };

//     const onTimeChangeCierre = (event, selectedTime) => {
//         const currentTime = selectedTime || horaCierre;
//         setShowTimePickerCierre(Platform.OS === 'ios');
//         setHoraCierre(currentTime);
//     };

//     const handleGuardar = async () => {
//         if (!sucursalId || !fecha || !descripcion || (estaCerrado === "0" && (!horaApertura || !horaCierre))) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 sucursal_id: parseInt(sucursalId),
//                 fecha: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD
//                 esta_cerrado: estaCerrado === "1" ? true : false,
//                 hora_apertura: estaCerrado === "0" ? horaApertura.toTimeString().split(' ')[0] : null, // Formato HH:MM:SS
//                 hora_cierre: estaCerrado === "0" ? horaCierre.toTimeString().split(' ')[0] : null,   // Formato HH:MM:SS
//                 descripcion: descripcion,
//             };

//             result = await editarExcepcionHorarioSucursal(excepcionInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Excepción de horario actualizada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la excepción de horario"));
//             }
//         } catch (error) {
//             console.error("Error al guardar excepción de horario:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la excepción de horario."));
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
//                         <Text style={styles.title}>{esEdicion ? "Editar Excepción de Horario" : "Nueva Excepción de Horario"}</Text>

//                         {loadingDependencies ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabelActual}>Sucursal:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={sucursalId}
//                                         onValueChange={(itemValue) => setSucursalId(itemValue)}
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

//                         <Text style={styles.label}>Fecha de Excepción:</Text>
//                         <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>{fecha.toLocaleDateString()}</Text>
//                         </TouchableOpacity>
//                         {showDatePicker && (
//                             <DateTimePicker
//                                 testID="datePicker"
//                                 value={fecha}
//                                 mode="date"
//                                 display="default"
//                                 onChange={onDateChange}
//                             />
//                         )}

//                         <Text style={styles.pickerLabelActual}>¿La sucursal está cerrada todo el día?:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={estaCerrado}
//                                 onValueChange={(itemValue) => setEstaCerrado(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="No" value="0" />
//                                 <Picker.Item label="Sí" value="1" />
//                             </Picker>
//                         </View>

//                         {estaCerrado === "0" && (
//                             <>
//                                 <Text style={styles.label}>Hora de Apertura:</Text>
//                                 <TouchableOpacity onPress={() => setShowTimePickerApertura(true)} style={styles.datePickerButton}>
//                                     <Text style={styles.datePickerButtonText}>{horaApertura.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
//                                 </TouchableOpacity>
//                                 {showTimePickerApertura && (
//                                     <DateTimePicker
//                                         testID="timePickerApertura"
//                                         value={horaApertura}
//                                         mode="time"
//                                         display="default"
//                                         onChange={onTimeChangeApertura}
//                                     />
//                                 )}

//                                 <Text style={styles.label}>Hora de Cierre:</Text>
//                                 <TouchableOpacity onPress={() => setShowTimePickerCierre(true)} style={styles.datePickerButton}>
//                                     <Text style={styles.datePickerButtonText}>{horaCierre.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
//                                 </TouchableOpacity>
//                                 {showTimePickerCierre && (
//                                     <DateTimePicker
//                                         testID="timePickerCierre"
//                                         value={horaCierre}
//                                         mode="time"
//                                         display="default"
//                                         onChange={onTimeChangeCierre}
//                                     />
//                                 )}
//                             </>
//                         )}

//                         <TextInput
//                             style={[styles.input, styles.multilineInput]}
//                             placeholder="Descripción (Motivo de la excepción, etc.)"
//                             placeholderTextColor="#888"
//                             value={descripcion}
//                             onChangeText={setDescripcion}
//                             multiline
//                             numberOfLines={4}
//                         />

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingDependencies}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Excepción"}</Text>
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