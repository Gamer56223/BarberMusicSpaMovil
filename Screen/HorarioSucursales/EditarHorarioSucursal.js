// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarHorarioSucursal } from "../../Src/Servicios/HorarioSucursalService"; // Asume que tienes este servicio
// import { listarSucursales } from "../../Src/Servicios/SucursalService"; // Servicio para listar sucursales

// import styles from "../../Styles/EditarHorarioSucursalStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarHorarioSucursal({ navigation }) {
//     const route = useRoute();
//     const horarioInicial = route.params?.horario;

//     const [sucursalId, setSucursalId] = useState(horarioInicial?.sucursal_id?.toString() || "");
//     const [diaSemana, setDiaSemana] = useState(horarioInicial?.dia_semana?.toString() || "");
//     const [horaApertura, setHoraApertura] = useState(horarioInicial?.hora_apertura ? new Date(`2000-01-01T${horarioInicial.hora_apertura}`) : new Date());
//     const [horaCierre, setHoraCierre] = useState(horarioInicial?.hora_cierre ? new Date(`2000-01-01T${horarioInicial.hora_cierre}`) : new Date());
//     const [estaCerradoRegularmente, setEstaCerradoRegularmente] = useState(horarioInicial?.esta_cerrado_regularmente ? "1" : "0");

//     const [sucursales, setSucursales] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const [showTimePickerApertura, setShowTimePickerApertura] = useState(false);
//     const [showTimePickerCierre, setShowTimePickerCierre] = useState(false);

//     const esEdicion = !!horarioInicial;

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
//         if (!sucursalId || !diaSemana || (estaCerradoRegularmente === "0" && (!horaApertura || !horaCierre))) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 sucursal_id: parseInt(sucursalId),
//                 dia_semana: parseInt(diaSemana),
//                 hora_apertura: estaCerradoRegularmente === "0" ? horaApertura.toTimeString().split(' ')[0] : null,
//                 hora_cierre: estaCerradoRegularmente === "0" ? horaCierre.toTimeString().split(' ')[0] : null,
//                 esta_cerrado_regularmente: estaCerradoRegularmente === "1" ? true : false,
//             };

//             result = await editarHorarioSucursal(horarioInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Horario de sucursal actualizado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar el horario de sucursal"));
//             }
//         } catch (error) {
//             console.error("Error al guardar horario de sucursal:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el horario de sucursal."));
//         } finally {
//             setLoading(false);
//         }
//     };

//     const diasDeLaSemana = [
//         { label: "Domingo", value: "0" },
//         { label: "Lunes", value: "1" },
//         { label: "Martes", value: "2" },
//         { label: "Miércoles", value: "3" },
//         { label: "Jueves", value: "4" },
//         { label: "Viernes", value: "5" },
//         { label: "Sábado", value: "6" },
//     ];

//     return (
//         <KeyboardAvoidingView
//             style={styles.keyboardAvoidingView}
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <ScrollView contentContainerStyle={styles.scrollContainer}>
//                     <View style={styles.container}>
//                         <Text style={styles.title}>{esEdicion ? "Editar Horario de Sucursal" : "Nuevo Horario de Sucursal"}</Text>

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

//                         <Text style={styles.pickerLabelActual}>Día de la Semana:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={diaSemana}
//                                 onValueChange={(itemValue) => setDiaSemana(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione Día --" value="" />
//                                 {diasDeLaSemana.map((dia) => (
//                                     <Picker.Item key={dia.value} label={dia.label} value={dia.value} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <Text style={styles.pickerLabelActual}>¿Está cerrada regularmente este día?:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={estaCerradoRegularmente}
//                                 onValueChange={(itemValue) => setEstaCerradoRegularmente(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="No" value="0" />
//                                 <Picker.Item label="Sí" value="1" />
//                             </Picker>
//                         </View>

//                         {estaCerradoRegularmente === "0" && (
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

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingDependencies}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Horario"}</Text>
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