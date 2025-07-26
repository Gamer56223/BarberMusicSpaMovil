// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Ionicons } from '@expo/vector-icons';

// import { editarResena } from "../../Src/Servicios/ResenaService";
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService";
// import { listarServicios } from "../../Src/Servicios/ServicioService";

// import styles from "../../Styles/EditarResenaStyles";

// export default function EditarResena({ navigation }) {
//     const route = useRoute();
//     const resenaInicial = route.params?.resena;

//     const [clienteUsuarioId, setClienteUsuarioId] = useState(resenaInicial?.cliente_usuario_id?.toString() || "");
//     const [calificacion, setCalificacion] = useState(resenaInicial?.calificacion?.toString() || "5");
//     const [comentario, setComentario] = useState(resenaInicial?.comentario || "");
//     const [resenableId, setResenableId] = useState(resenaInicial?.resenable_id?.toString() || "");
//     const [resenableType, setResenableType] = useState(resenaInicial?.resenable_type || "service");
//     const [aprobada, setAprobada] = useState(resenaInicial?.aprobada ? "1" : "0");
//     const [fechaResena, setFechaResena] = useState(
//         resenaInicial?.fecha_reseña ? new Date(resenaInicial.fecha_reseña) : new Date()
//     );

//     const [clientes, setClientes] = useState([]);
//     const [servicios, setServicios] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const [showFechaResenaPicker, setShowFechaResenaPicker] = useState(false);

//     const getAlertMessage = (msg, defaultMsg) => {
//         if (typeof msg === 'string') return msg;
//         if (msg && typeof msg === 'object') {
//             if (msg.errors) {
//                 return Object.values(msg.errors).flat().join('\n');
//             }
//             if (msg.message) {
//                 return typeof msg.message === 'string' ? msg.message : JSON.stringify(msg.message);
//             }
//             return JSON.stringify(msg);
//         }
//         return defaultMsg;
//     };

//     useEffect(() => {
//         const cargarDependencias = async () => {
//             setLoadingDependencies(true);
//             try {
//                 const [resClientes, resServicios] = await Promise.all([listarUsuarios(), listarServicios()]);

//                 if (resClientes.success) {
//                     const clientesFiltrados = resClientes.data.filter(u => u.rol === 'CLIENTE');
//                     setClientes(clientesFiltrados);
//                 } else {
//                     Alert.alert("Error", getAlertMessage(resClientes.message, "No se pudieron cargar los clientes."));
//                 }

//                 if (resServicios.success) {
//                     setServicios(resServicios.data);
//                 } else {
//                     Alert.alert("Error", getAlertMessage(resServicios.message, "No se pudieron cargar los servicios."));
//                 }
//             } catch (error) {
//                 console.error("Error al cargar dependencias:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar las dependencias.");
//             } finally {
//                 setLoadingDependencies(false);
//             }
//         };
//         cargarDependencias();
//     }, []);

//     const onFechaResenaChange = (event, selectedDate) => {
//         const currentDate = selectedDate || fechaResena;
//         setShowFechaResenaPicker(Platform.OS === 'ios');
//         setFechaResena(currentDate);
//     };

//     const handleGuardar = async () => {
//         if (!clienteUsuarioId || !resenableId || !calificacion || !comentario || !fechaResena) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const dataToSave = {
//                 cliente_usuario_id: parseInt(clienteUsuarioId),
//                 calificacion: parseInt(calificacion),
//                 comentario: comentario,
//                 resenable_id: parseInt(resenableId),
//                 resenable_type: resenableType,
//                 aprobada: aprobada === "1" ? true : false,
//                 fecha_reseña: fechaResena.toISOString().slice(0, 19).replace('T', ' '),
//             };

//             const result = await editarResena(resenaInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Reseña actualizada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la reseña"));
//             }
//         } catch (error) {
//             console.error("Error al guardar reseña:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la reseña."));
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
//                         <Text style={styles.title}>Editar Reseña</Text>

//                         {loadingDependencies ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabelActual}>Cliente:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={clienteUsuarioId}
//                                         onValueChange={(itemValue) => setClienteUsuarioId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Cliente --" value="" />
//                                         {clientes.map((user) => (
//                                             <Picker.Item key={user.id.toString()} label={user.nombre} value={user.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabelActual}>Servicio Reseñado:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={resenableId}
//                                         onValueChange={(itemValue) => setResenableId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Servicio --" value="" />
//                                         {servicios.map((item) => (
//                                             <Picker.Item key={item.id.toString()} label={item.nombre} value={item.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <Text style={styles.pickerLabelActual}>Calificación:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={calificacion}
//                                 onValueChange={(itemValue) => setCalificacion(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 {[1, 2, 3, 4, 5].map(num => (
//                                     <Picker.Item key={num} label={`${num} Estrella${num > 1 ? 's' : ''}`} value={num.toString()} />
//                                 ))}
//                             </Picker>
//                         </View>
                        
//                         <TextInput
//                             style={[styles.input, styles.multilineInput]}
//                             placeholder="Comentario"
//                             placeholderTextColor="#888"
//                             value={comentario}
//                             onChangeText={setComentario}
//                             multiline
//                             numberOfLines={4}
//                         />

//                         <Text style={styles.label}>Fecha de la Reseña:</Text>
//                         <TouchableOpacity onPress={() => setShowFechaResenaPicker(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>{fechaResena.toLocaleString()}</Text>
//                         </TouchableOpacity>
//                         {showFechaResenaPicker && (
//                             <DateTimePicker
//                                 testID="fechaResenaPicker"
//                                 value={fechaResena}
//                                 mode="datetime"
//                                 display="default"
//                                 onChange={onFechaResenaChange}
//                             />
//                         )}

//                         <Text style={styles.pickerLabelActual}>Aprobada:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={aprobada}
//                                 onValueChange={(itemValue) => setAprobada(itemValue)}
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
//                                     <Text style={styles.textoBoton}>Guardar Cambios</Text>
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