// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from "@react-native-picker/picker";
// import { crearRecordatorio } from "../../Src/Servicios/RecordatorioService"; // Asume que tienes este servicio
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService"; // Ya tenemos este servicio
// import { listarAgendamientos } from "../../Src/Servicios/AgendamientoService"; // Ya tenemos este servicio
// import styles from "../../Styles/AgregarRecordatorioStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarRecordatorio({ navigation }) {
//     const [usuarioId, setUsuarioId] = useState("");
//     const [agendamientoId, setAgendamientoId] = useState("");
//     const [titulo, setTitulo] = useState("");
//     const [descripcion, setDescripcion] = useState("");
//     const [fechaHoraRecordatorio, setFechaHoraRecordatorio] = useState(""); // Formato 'YYYY-MM-DD HH:MM:SS'
//     const [canalNotificacion, setCanalNotificacion] = useState("");
//     const [enviado, setEnviado] = useState(false);
//     const [fechaEnvio, setFechaEnvio] = useState(""); // Formato 'YYYY-MM-DD HH:MM:SS'
//     const [activo, setActivo] = useState(true);
//     const [fijado, setFijado] = useState(false);

//     const [usuarios, setUsuarios] = useState([]);
//     const [agendamientos, setAgendamientos] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingData, setLoadingData] = useState(true);

//     const canalesNotificacion = [
//         { label: "Email", value: "EMAIL" },
//         { label: "SMS", value: "SMS" },
//         { label: "Push Notification", value: "PUSH_NOTIFICATION" },
//         { label: "WhatsApp", value: "WHATSAPP" },
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
//                 const [resultUsuarios, resultAgendamientos] = await Promise.all([
//                     listarUsuarios(),
//                     listarAgendamientos(),
//                 ]);

//                 if (resultUsuarios.success) {
//                     setUsuarios(resultUsuarios.data);
//                     if (resultUsuarios.data.length > 0) {
//                         setUsuarioId(resultUsuarios.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar usuarios", resultUsuarios.message || "No se pudieron cargar los usuarios.");
//                 }

//                 if (resultAgendamientos.success) {
//                     setAgendamientos(resultAgendamientos.data);
//                     if (resultAgendamientos.data.length > 0) {
//                         setAgendamientoId(resultAgendamientos.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar agendamientos", resultAgendamientos.message || "No se pudieron cargar los agendamientos.");
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
//         if (!usuarioId || !agendamientoId || !titulo || !fechaHoraRecordatorio || !canalNotificacion) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearRecordatorio({
//                 usuario_id: parseInt(usuarioId),
//                 agendamiento_id: parseInt(agendamientoId),
//                 titulo: titulo,
//                 descripcion: descripcion,
//                 fecha_hora_recordatorio: fechaHoraRecordatorio,
//                 canal_notificacion: canalNotificacion,
//                 enviado: enviado,
//                 fecha_envio: fechaEnvio || null, // Puede ser null si aún no se ha enviado
//                 activo: activo,
//                 fijado: fijado,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Recordatorio creado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el recordatorio"));
//             }
//         } catch (error) {
//             console.error("Error al crear recordatorio:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el recordatorio."));
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
//                         <Text style={styles.title}>Nuevo Recordatorio</Text>

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

//                                 <Text style={styles.pickerLabel}>Agendamiento:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={agendamientoId}
//                                         onValueChange={(itemValue) => setAgendamientoId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione un Agendamiento --" value="" />
//                                         {agendamientos.map((agendamiento) => (
//                                             <Picker.Item key={agendamiento.id.toString()} label={`Agendamiento #${agendamiento.id} - ${agendamiento.fecha_hora_inicio}`} value={agendamiento.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Título del Recordatorio"
//                             placeholderTextColor="#888"
//                             value={titulo}
//                             onChangeText={setTitulo}
//                         />
//                         <TextInput
//                             style={styles.inputMultiline}
//                             placeholder="Descripción (Opcional)"
//                             placeholderTextColor="#888"
//                             value={descripcion}
//                             onChangeText={setDescripcion}
//                             multiline
//                             numberOfLines={3}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Fecha y Hora del Recordatorio (YYYY-MM-DD HH:MM:SS)"
//                             placeholderTextColor="#888"
//                             value={fechaHoraRecordatorio}
//                             onChangeText={setFechaHoraRecordatorio}
//                         />
                        
//                         <Text style={styles.pickerLabel}>Canal de Notificación:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={canalNotificacion}
//                                 onValueChange={(itemValue) => setCanalNotificacion(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione un Canal --" value="" />
//                                 {canalesNotificacion.map((canal) => (
//                                     <Picker.Item key={canal.value} label={canal.label} value={canal.value} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <View style={styles.switchContainer}>
//                             <Text style={styles.switchLabel}>Enviado:</Text>
//                             <Switch
//                                 onValueChange={setEnviado}
//                                 value={enviado}
//                             />
//                         </View>
//                         {enviado && (
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Fecha y Hora de Envío (YYYY-MM-DD HH:MM:SS - Opcional)"
//                                 placeholderTextColor="#888"
//                                 value={fechaEnvio}
//                                 onChangeText={setFechaEnvio}
//                             />
//                         )}
                        
//                         <View style={styles.switchContainer}>
//                             <Text style={styles.switchLabel}>Activo:</Text>
//                             <Switch
//                                 onValueChange={setActivo}
//                                 value={activo}
//                             />
//                         </View>
//                         <View style={styles.switchContainer}>
//                             <Text style={styles.switchLabel}>Fijado:</Text>
//                             <Switch
//                                 onValueChange={setFijado}
//                                 value={fijado}
//                             />
//                         </View>

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Recordatorio</Text>
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