// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarRecordatorio } from "../../Src/Servicios/RecordatorioService"; // Asume que tienes este servicio
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService"; // Servicio para listar usuarios
// import { listarAgendamientos } from "../../Src/Servicios/AgendamientoService"; // Servicio para listar agendamientos

// import styles from "../../Styles/EditarRecordatorioStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarRecordatorio({ navigation }) {
//     const route = useRoute();
//     const recordatorioInicial = route.params?.recordatorio;

//     const [usuarioId, setUsuarioId] = useState(recordatorioInicial?.usuario_id?.toString() || "");
//     const [agendamientoId, setAgendamientoId] = useState(recordatorioInicial?.agendamiento_id?.toString() || "");
//     const [titulo, setTitulo] = useState(recordatorioInicial?.titulo || "");
//     const [descripcion, setDescripcion] = useState(recordatorioInicial?.descripcion || "");
//     const [fechaHoraRecordatorio, setFechaHoraRecordatorio] = useState(
//         recordatorioInicial?.fecha_hora_recordatorio ? new Date(recordatorioInicial.fecha_hora_recordatorio) : new Date()
//     );
//     const [canalNotificacion, setCanalNotificacion] = useState(recordatorioInicial?.canal_notificacion || "");
//     const [enviado, setEnviado] = useState(recordatorioInicial?.enviado ? "1" : "0");
//     const [fechaEnvio, setFechaEnvio] = useState(recordatorioInicial?.fecha_envio ? new Date(recordatorioInicial.fecha_envio) : null);
//     const [activo, setActivo] = useState(recordatorioInicial?.activo ? "1" : "0");
//     const [fijado, setFijado] = useState(recordatorioInicial?.fijado ? "1" : "0"); // Nuevo campo 'fijado'

//     const [usuarios, setUsuarios] = useState([]);
//     const [agendamientos, setAgendamientos] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const [showFechaHoraRecordatorioPicker, setShowFechaHoraRecordatorioPicker] = useState(false);
//     const [showFechaEnvioPicker, setShowFechaEnvioPicker] = useState(false);

//     const esEdicion = !!recordatorioInicial;

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
//                 const [resUsuarios, resAgendamientos] = await Promise.all([listarUsuarios(), listarAgendamientos()]);

//                 if (resUsuarios.success) {
//                     setUsuarios(resUsuarios.data);
//                     if (!esEdicion && resUsuarios.data.length > 0) {
//                         setUsuarioId(resUsuarios.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resUsuarios.message || "No se pudieron cargar los usuarios.");
//                 }

//                 if (resAgendamientos.success) {
//                     setAgendamientos(resAgendamientos.data);
//                     if (!esEdicion && resAgendamientos.data.length > 0) {
//                         setAgendamientoId(resAgendamientos.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resAgendamientos.message || "No se pudieron cargar los agendamientos.");
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

//     const onFechaHoraRecordatorioChange = (event, selectedDate) => {
//         const currentDate = selectedDate || fechaHoraRecordatorio;
//         setShowFechaHoraRecordatorioPicker(Platform.OS === 'ios');
//         setFechaHoraRecordatorio(currentDate);
//     };

//     const onFechaEnvioChange = (event, selectedDate) => {
//         const currentDate = selectedDate || fechaEnvio;
//         setShowFechaEnvioPicker(Platform.OS === 'ios');
//         setFechaEnvio(currentDate);
//     };

//     const canalesNotificacion = [
//         "EMAIL",
//         "SMS",
//         "PUSH_NOTIFICATION"
//     ];

//     const handleGuardar = async () => {
//         if (!usuarioId || !agendamientoId || !titulo || !fechaHoraRecordatorio || !canalNotificacion) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 usuario_id: parseInt(usuarioId),
//                 agendamiento_id: parseInt(agendamientoId),
//                 titulo: titulo,
//                 descripcion: descripcion,
//                 fecha_hora_recordatorio: fechaHoraRecordatorio.toISOString(),
//                 canal_notificacion: canalNotificacion,
//                 enviado: enviado === "1" ? true : false,
//                 fecha_envio: fechaEnvio ? fechaEnvio.toISOString() : null,
//                 activo: activo === "1" ? true : false,
//                 fijado: fijado === "1" ? true : false, // Incluir 'fijado'
//             };

//             result = await editarRecordatorio(recordatorioInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Recordatorio actualizado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar el recordatorio"));
//             }
//         } catch (error) {
//             console.error("Error al guardar recordatorio:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el recordatorio."));
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
//                         <Text style={styles.title}>{esEdicion ? "Editar Recordatorio" : "Nuevo Recordatorio"}</Text>

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

//                                 <Text style={styles.pickerLabelActual}>Agendamiento:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={agendamientoId}
//                                         onValueChange={(itemValue) => setAgendamientoId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Agendamiento --" value="" />
//                                         {agendamientos.map((agenda) => (
//                                             <Picker.Item key={agenda.id.toString()} label={`Agendamiento #${agenda.id}`} value={agenda.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Título"
//                             placeholderTextColor="#888"
//                             value={titulo}
//                             onChangeText={setTitulo}
//                         />
//                         <TextInput
//                             style={[styles.input, styles.multilineInput]}
//                             placeholder="Descripción"
//                             placeholderTextColor="#888"
//                             value={descripcion}
//                             onChangeText={setDescripcion}
//                             multiline
//                             numberOfLines={4}
//                         />

//                         <Text style={styles.label}>Fecha y Hora del Recordatorio:</Text>
//                         <TouchableOpacity onPress={() => setShowFechaHoraRecordatorioPicker(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>{fechaHoraRecordatorio.toLocaleString()}</Text>
//                         </TouchableOpacity>
//                         {showFechaHoraRecordatorioPicker && (
//                             <DateTimePicker
//                                 testID="fechaHoraRecordatorioPicker"
//                                 value={fechaHoraRecordatorio}
//                                 mode="datetime"
//                                 display="default"
//                                 onChange={onFechaHoraRecordatorioChange}
//                             />
//                         )}

//                         <Text style={styles.pickerLabelActual}>Canal de Notificación:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={canalNotificacion}
//                                 onValueChange={(itemValue) => setCanalNotificacion(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione Canal --" value="" />
//                                 {canalesNotificacion.map((canal) => (
//                                     <Picker.Item key={canal} label={canal.replace(/_/g, ' ')} value={canal} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <Text style={styles.pickerLabelActual}>Enviado:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={enviado}
//                                 onValueChange={(itemValue) => setEnviado(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="Sí" value="1" />
//                                 <Picker.Item label="No" value="0" />
//                             </Picker>
//                         </View>

//                         <Text style={styles.label}>Fecha de Envío (Opcional):</Text>
//                         <TouchableOpacity onPress={() => setShowFechaEnvioPicker(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>
//                                 {fechaEnvio ? fechaEnvio.toLocaleString() : "Seleccionar Fecha"}
//                             </Text>
//                         </TouchableOpacity>
//                         {showFechaEnvioPicker && (
//                             <DateTimePicker
//                                 testID="fechaEnvioPicker"
//                                 value={fechaEnvio || new Date()}
//                                 mode="datetime"
//                                 display="default"
//                                 onChange={onFechaEnvioChange}
//                             />
//                         )}
//                         {fechaEnvio && (
//                             <TouchableOpacity onPress={() => setFechaEnvio(null)} style={styles.clearDateButton}>
//                                 <Text style={styles.clearDateButtonText}>Limpiar Fecha de Envío</Text>
//                             </TouchableOpacity>
//                         )}


//                         <Text style={styles.pickerLabelActual}>Activo:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={activo}
//                                 onValueChange={(itemValue) => setActivo(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="Sí" value="1" />
//                                 <Picker.Item label="No" value="0" />
//                             </Picker>
//                         </View>

//                         {/* Nuevo campo Fijado */}
//                         <Text style={styles.pickerLabelActual}>Fijado:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={fijado}
//                                 onValueChange={(itemValue) => setFijado(itemValue)}
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
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Recordatorio"}</Text>
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