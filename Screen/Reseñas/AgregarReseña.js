// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from "@react-native-picker/picker";
// import { crearResena } from "../../Src/Servicios/ResenaService";
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService";
// import { listarServicios } from "../../Src/Servicios/ServicioService";
// import styles from "../../Styles/AgregarResenaStyles";

// export default function AgregarResena({ navigation }) {
//     const [clienteUsuarioId, setClienteUsuarioId] = useState("");
//     const [calificacion, setCalificacion] = useState("5");
//     const [comentario, setComentario] = useState("");
//     const [resenableId, setResenableId] = useState("");
//     const [resenableType, setResenableType] = useState("service"); // Fijo a 'service' según el ejemplo
//     const [aprobada, setAprobada] = useState(true);
//     const [fechaResena, setFechaResena] = useState(""); // Formato 'YYYY-MM-DD HH:MM:SS'

//     const [clientes, setClientes] = useState([]);
//     const [servicios, setServicios] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingData, setLoadingData] = useState(true);

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
//         const cargarDatosIniciales = async () => {
//             setLoadingData(true);
//             try {
//                 const [resultClientes, resultServicios] = await Promise.all([
//                     listarUsuarios(),
//                     listarServicios(),
//                 ]);

//                 if (resultClientes.success) {
//                     // Filtramos para obtener solo usuarios con rol de CLIENTE
//                     const clientesFiltrados = resultClientes.data.filter(u => u.rol === 'CLIENTE');
//                     setClientes(clientesFiltrados);
//                     if (clientesFiltrados.length > 0) {
//                         setClienteUsuarioId(clientesFiltrados[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar clientes", getAlertMessage(resultClientes.message, "No se pudieron cargar los clientes."));
//                 }

//                 if (resultServicios.success) {
//                     setServicios(resultServicios.data);
//                     if (resultServicios.data.length > 0) {
//                         setResenableId(resultServicios.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar servicios", getAlertMessage(resultServicios.message, "No se pudieron cargar los servicios."));
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
//         if (!clienteUsuarioId || !resenableId || !calificacion || !comentario || !fechaResena) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearResena({
//                 cliente_usuario_id: parseInt(clienteUsuarioId),
//                 calificacion: parseInt(calificacion),
//                 comentario: comentario,
//                 resenable_id: parseInt(resenableId),
//                 resenable_type: resenableType,
//                 aprobada: aprobada,
//                 fecha_reseña: fechaResena,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Reseña creada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la reseña"));
//             }
//         } catch (error) {
//             console.error("Error al crear reseña:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la reseña."));
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
//                         <Text style={styles.title}>Nueva Reseña</Text>

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
//                                         {clientes.map((user) => (
//                                             <Picker.Item key={user.id.toString()} label={user.nombre || user.email} value={user.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabel}>Elemento a Reseñar (Servicio):</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={resenableId}
//                                         onValueChange={(itemValue) => setResenableId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione un Servicio --" value="" />
//                                         {servicios.map((servicio) => (
//                                             <Picker.Item key={servicio.id.toString()} label={servicio.nombre} value={servicio.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <Text style={styles.pickerLabel}>Calificación:</Text>
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
//                             style={styles.inputMultiline}
//                             placeholder="Comentario de la reseña"
//                             placeholderTextColor="#888"
//                             value={comentario}
//                             onChangeText={setComentario}
//                             multiline
//                             numberOfLines={4}
//                         />

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Fecha de la Reseña (YYYY-MM-DD HH:MM:SS)"
//                             placeholderTextColor="#888"
//                             value={fechaResena}
//                             onChangeText={setFechaResena}
//                         />
                        
//                         <View style={styles.switchContainer}>
//                             <Text style={styles.switchLabel}>Aprobada:</Text>
//                             <Switch
//                                 onValueChange={setAprobada}
//                                 value={aprobada}
//                             />
//                         </View>

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Reseña</Text>
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