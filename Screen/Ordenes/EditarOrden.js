// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarOrden } from "../../Src/Servicios/OrdenService"; // Asume que tienes este servicio
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService"; // Servicio para listar usuarios

// import styles from "../../Styles/EditarOrdenStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarOrden({ navigation }) {
//     const route = useRoute();
//     const ordenInicial = route.params?.orden;

//     const [clienteUsuarioId, setClienteUsuarioId] = useState(ordenInicial?.cliente_usuario_id?.toString() || "");
//     const [numeroOrden, setNumeroOrden] = useState(ordenInicial?.numero_orden || "");
//     const [fechaOrden, setFechaOrden] = useState(ordenInicial?.fecha_orden ? new Date(ordenInicial.fecha_orden) : new Date());
//     const [fechaRecibida, setFechaRecibida] = useState(ordenInicial?.fecha_recibida ? new Date(ordenInicial.fecha_recibida) : null);
//     const [subtotal, setSubtotal] = useState(ordenInicial?.subtotal?.toString() || "");
//     const [descuentoTotal, setDescuentoTotal] = useState(ordenInicial?.descuento_total?.toString() || "");
//     const [impuestosTotal, setImpuestosTotal] = useState(ordenInicial?.impuestos_total?.toString() || "");
//     const [totalOrden, setTotalOrden] = useState(ordenInicial?.total_orden?.toString() || "");
//     const [estadoOrden, setEstadoOrden] = useState(ordenInicial?.estado_orden || "");
//     const [notasOrden, setNotasOrden] = useState(ordenInicial?.notas_orden || "");

//     const [usuarios, setUsuarios] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const [showFechaOrdenPicker, setShowFechaOrdenPicker] = useState(false);
//     const [showFechaRecibidaPicker, setShowFechaRecibidaPicker] = useState(false);

//     const esEdicion = !!ordenInicial;

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
//         const cargarUsuarios = async () => {
//             setLoadingDependencies(true);
//             try {
//                 const res = await listarUsuarios();
//                 if (res.success) {
//                     setUsuarios(res.data);
//                     if (!esEdicion && res.data.length > 0) {
//                         setClienteUsuarioId(res.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", res.message || "No se pudieron cargar los usuarios.");
//                 }
//             } catch (error) {
//                 console.error("Error al cargar usuarios:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar los usuarios.");
//             } finally {
//                 setLoadingDependencies(false);
//             }
//         };
//         cargarUsuarios();
//     }, [esEdicion]);

//     const onFechaOrdenChange = (event, selectedDate) => {
//         const currentDate = selectedDate || fechaOrden;
//         setShowFechaOrdenPicker(Platform.OS === 'ios');
//         setFechaOrden(currentDate);
//     };

//     const onFechaRecibidaChange = (event, selectedDate) => {
//         const currentDate = selectedDate || fechaRecibida;
//         setShowFechaRecibidaPicker(Platform.OS === 'ios');
//         setFechaRecibida(currentDate);
//     };

//     const estadosOrden = [
//         "PENDIENTE_PAGO", "PAGADA", "EN_PROCESO", "COMPLETADO",
//         "CANCELADA", "ENVIADA", "RECIBIDA", "DEVUELTA"
//     ];

//     const handleGuardar = async () => {
//         if (!clienteUsuarioId || !numeroOrden || !fechaOrden || !subtotal || !totalOrden || !estadoOrden) {
//             Alert.alert("Campos requeridos", "Por favor, complete los campos obligatorios: Cliente, Número de Orden, Fecha de Orden, Subtotal, Total y Estado.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 cliente_usuario_id: parseInt(clienteUsuarioId),
//                 numero_orden: numeroOrden,
//                 fecha_orden: fechaOrden.toISOString().split('T')[0], // Formato YYYY-MM-DD
//                 fecha_recibida: fechaRecibida ? fechaRecibida.toISOString().split('T')[0] : null,
//                 subtotal: parseFloat(subtotal),
//                 descuento_total: parseFloat(descuentoTotal || "0"),
//                 impuestos_total: parseFloat(impuestosTotal || "0"),
//                 total_orden: parseFloat(totalOrden),
//                 estado_orden: estadoOrden,
//                 notas_orden: notasOrden,
//             };

//             result = await editarOrden(ordenInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Orden actualizada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la orden"));
//             }
//         } catch (error) {
//             console.error("Error al guardar orden:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la orden."));
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
//                         <Text style={styles.title}>{esEdicion ? "Editar Orden" : "Nueva Orden"}</Text>

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
//                                         {usuarios.map((user) => (
//                                             <Picker.Item key={user.id.toString()} label={user.nombre} value={user.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Número de Orden"
//                             placeholderTextColor="#888"
//                             value={numeroOrden}
//                             onChangeText={setNumeroOrden}
//                         />

//                         <Text style={styles.label}>Fecha de Orden:</Text>
//                         <TouchableOpacity onPress={() => setShowFechaOrdenPicker(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>{fechaOrden.toLocaleDateString()}</Text>
//                         </TouchableOpacity>
//                         {showFechaOrdenPicker && (
//                             <DateTimePicker
//                                 testID="fechaOrdenPicker"
//                                 value={fechaOrden}
//                                 mode="date"
//                                 display="default"
//                                 onChange={onFechaOrdenChange}
//                             />
//                         )}

//                         <Text style={styles.label}>Fecha Recibida (Opcional):</Text>
//                         <TouchableOpacity onPress={() => setShowFechaRecibidaPicker(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>
//                                 {fechaRecibida ? fechaRecibida.toLocaleDateString() : "Seleccionar Fecha"}
//                             </Text>
//                         </TouchableOpacity>
//                         {showFechaRecibidaPicker && (
//                             <DateTimePicker
//                                 testID="fechaRecibidaPicker"
//                                 value={fechaRecibida || new Date()}
//                                 mode="date"
//                                 display="default"
//                                 onChange={onFechaRecibidaChange}
//                             />
//                         )}
//                         {fechaRecibida && (
//                             <TouchableOpacity onPress={() => setFechaRecibida(null)} style={styles.clearDateButton}>
//                                 <Text style={styles.clearDateButtonText}>Limpiar Fecha Recibida</Text>
//                             </TouchableOpacity>
//                         )}


//                         <TextInput
//                             style={styles.input}
//                             placeholder="Subtotal"
//                             placeholderTextColor="#888"
//                             value={subtotal}
//                             onChangeText={setSubtotal}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Descuento Total"
//                             placeholderTextColor="#888"
//                             value={descuentoTotal}
//                             onChangeText={setDescuentoTotal}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Impuestos Total"
//                             placeholderTextColor="#888"
//                             value={impuestosTotal}
//                             onChangeText={setImpuestosTotal}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Total de la Orden"
//                             placeholderTextColor="#888"
//                             value={totalOrden}
//                             onChangeText={setTotalOrden}
//                             keyboardType="numeric"
//                         />

//                         <Text style={styles.pickerLabelActual}>Estado de la Orden:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={estadoOrden}
//                                 onValueChange={(itemValue) => setEstadoOrden(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione Estado --" value="" />
//                                 {estadosOrden.map((estado) => (
//                                     <Picker.Item key={estado} label={estado.replace(/_/g, ' ')} value={estado} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <TextInput
//                             style={[styles.input, styles.multilineInput]}
//                             placeholder="Notas de la Orden"
//                             placeholderTextColor="#888"
//                             value={notasOrden}
//                             onChangeText={setNotasOrden}
//                             multiline
//                             numberOfLines={4}
//                         />

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingDependencies}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Orden"}</Text>
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