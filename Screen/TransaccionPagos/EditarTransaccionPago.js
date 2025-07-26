// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarTransaccionPago } from "../../Src/Servicios/TransaccionPagoService"; // Asume que tienes este servicio
// import { listarOrdenes } from "../../Src/Servicios/OrdenService"; // Servicio para listar órdenes
// import { listarAgendamientos } from "../../Src/Servicios/AgendamientoService"; // Servicio para listar agendamientos
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService"; // Servicio para listar usuarios

// import styles from "../../Styles/EditarTransaccionPagoStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarTransaccionPago({ navigation }) {
//     const route = useRoute();
//     const transaccionInicial = route.params?.transaccion;

//     const [ordenId, setOrdenId] = useState(transaccionInicial?.orden_id?.toString() || "");
//     const [agendamientoId, setAgendamientoId] = useState(transaccionInicial?.agendamiento_id?.toString() || "");
//     const [clienteUsuarioId, setClienteUsuarioId] = useState(transaccionInicial?.cliente_usuario_id?.toString() || "");
//     const [monto, setMonto] = useState(transaccionInicial?.monto?.toString() || "");
//     const [moneda, setMoneda] = useState(transaccionInicial?.moneda || "");
//     const [metodoPago, setMetodoPago] = useState(transaccionInicial?.metodo_pago || "");
//     const [idTransaccionPasarela, setIdTransaccionPasarela] = useState(transaccionInicial?.id_transaccion_pasarela || "");
//     const [estadoPago, setEstadoPago] = useState(transaccionInicial?.estado_pago || "");
//     const [fechaTransaccion, setFechaTransaccion] = useState(
//         transaccionInicial?.fecha_transaccion ? new Date(transaccionInicial.fecha_transaccion) : new Date()
//     );
//     const [datosPasarelaRequest, setDatosPasarelaRequest] = useState(
//         transaccionInicial?.datos_pasarela_request ? JSON.stringify(transaccionInicial.datos_pasarela_request, null, 2) : ""
//     );
//     const [datosPasarelaResponse, setDatosPasarelaResponse] = useState(
//         transaccionInicial?.datos_pasarela_response ? JSON.stringify(transaccionInicial.datos_pasarela_response, null, 2) : ""
//     );

//     const [ordenes, setOrdenes] = useState([]);
//     const [agendamientos, setAgendamientos] = useState([]);
//     const [usuarios, setUsuarios] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const [showFechaTransaccionPicker, setShowFechaTransaccionPicker] = useState(false);

//     const esEdicion = !!transaccionInicial;

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
//                 const [resOrdenes, resAgendamientos, resUsuarios] = await Promise.all([
//                     listarOrdenes(),
//                     listarAgendamientos(),
//                     listarUsuarios()
//                 ]);

//                 if (resOrdenes.success) {
//                     setOrdenes(resOrdenes.data);
//                     if (!esEdicion && resOrdenes.data.length > 0) {
//                         setOrdenId(resOrdenes.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resOrdenes.message || "No se pudieron cargar las órdenes.");
//                 }

//                 if (resAgendamientos.success) {
//                     setAgendamientos(resAgendamientos.data);
//                     if (!esEdicion && resAgendamientos.data.length > 0) {
//                         setAgendamientoId(resAgendamientos.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resAgendamientos.message || "No se pudieron cargar los agendamientos.");
//                 }

//                 if (resUsuarios.success) {
//                     setUsuarios(resUsuarios.data);
//                     if (!esEdicion && resUsuarios.data.length > 0) {
//                         setClienteUsuarioId(resUsuarios.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resUsuarios.message || "No se pudieron cargar los usuarios.");
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

//     const onFechaTransaccionChange = (event, selectedDate) => {
//         const currentDate = selectedDate || fechaTransaccion;
//         setShowFechaTransaccionPicker(Platform.OS === 'ios');
//         setFechaTransaccion(currentDate);
//     };

//     const estadosPago = ["PENDIENTE", "COMPLETADO", "FALLIDO", "REEMBOLSADO"];
//     const metodosPago = ["Tarjeta de Crédito", "PayPal", "Transferencia Bancaria", "Efectivo"]; // Puedes expandir esto
//     const monedas = ["USD", "MXN", "EUR"]; // Puedes expandir esto

//     const handleGuardar = async () => {
//         if (!ordenId || !agendamientoId || !clienteUsuarioId || !monto || !moneda || !metodoPago || !estadoPago || !fechaTransaccion) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 orden_id: parseInt(ordenId),
//                 agendamiento_id: parseInt(agendamientoId),
//                 cliente_usuario_id: parseInt(clienteUsuarioId),
//                 monto: parseFloat(monto),
//                 moneda: moneda,
//                 metodo_pago: metodoPago,
//                 id_transaccion_pasarela: idTransaccionPasarela,
//                 estado_pago: estadoPago,
//                 fecha_transaccion: fechaTransaccion.toISOString(),
//                 datos_pasarela_request: datosPasarelaRequest ? JSON.parse(datosPasarelaRequest) : null,
//                 datos_pasarela_response: datosPasarelaResponse ? JSON.parse(datosPasarelaResponse) : null,
//             };

//             result = await editarTransaccionPago(transaccionInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Transacción de pago actualizada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la transacción de pago"));
//             }
//         } catch (error) {
//             console.error("Error al guardar transacción de pago:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la transacción de pago. Asegúrese de que los campos JSON sean válidos."));
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
//                         <Text style={styles.title}>{esEdicion ? "Editar Transacción de Pago" : "Nueva Transacción de Pago"}</Text>

//                         {loadingDependencies ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabelActual}>Orden:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={ordenId}
//                                         onValueChange={(itemValue) => setOrdenId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Orden --" value="" />
//                                         {ordenes.map((orden) => (
//                                             <Picker.Item key={orden.id.toString()} label={`Orden #${orden.id} - ${orden.estado_orden}`} value={orden.id.toString()} />
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
//                                         {agendamientos.map((agendamiento) => (
//                                             <Picker.Item key={agendamiento.id.toString()} label={`Agendamiento #${agendamiento.id} - ${agendamiento.titulo}`} value={agendamiento.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabelActual}>Cliente (Usuario):</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={clienteUsuarioId}
//                                         onValueChange={(itemValue) => setClienteUsuarioId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Cliente --" value="" />
//                                         {usuarios.map((usuario) => (
//                                             <Picker.Item key={usuario.id.toString()} label={usuario.nombre} value={usuario.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Monto"
//                             placeholderTextColor="#888"
//                             value={monto}
//                             onChangeText={setMonto}
//                             keyboardType="numeric"
//                         />
//                         <Text style={styles.pickerLabelActual}>Moneda:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={moneda}
//                                 onValueChange={(itemValue) => setMoneda(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione Moneda --" value="" />
//                                 {monedas.map((m) => (
//                                     <Picker.Item key={m} label={m} value={m} />
//                                 ))}
//                             </Picker>
//                         </View>
//                         <Text style={styles.pickerLabelActual}>Método de Pago:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={metodoPago}
//                                 onValueChange={(itemValue) => setMetodoPago(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione Método --" value="" />
//                                 {metodosPago.map((mp) => (
//                                     <Picker.Item key={mp} label={mp} value={mp} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="ID Transacción Pasarela"
//                             placeholderTextColor="#888"
//                             value={idTransaccionPasarela}
//                             onChangeText={setIdTransaccionPasarela}
//                         />
//                         <Text style={styles.pickerLabelActual}>Estado de Pago:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={estadoPago}
//                                 onValueChange={(itemValue) => setEstadoPago(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione Estado --" value="" />
//                                 {estadosPago.map((estado) => (
//                                     <Picker.Item key={estado} label={estado.replace(/_/g, ' ')} value={estado} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <Text style={styles.label}>Fecha de Transacción:</Text>
//                         <TouchableOpacity onPress={() => setShowFechaTransaccionPicker(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>{fechaTransaccion.toLocaleString()}</Text>
//                         </TouchableOpacity>
//                         {showFechaTransaccionPicker && (
//                             <DateTimePicker
//                                 testID="fechaTransaccionPicker"
//                                 value={fechaTransaccion}
//                                 mode="datetime"
//                                 display="default"
//                                 onChange={onFechaTransaccionChange}
//                             />
//                         )}

//                         <TextInput
//                             style={[styles.input, styles.multilineInput]}
//                             placeholder="Datos Pasarela Request (JSON)"
//                             placeholderTextColor="#888"
//                             value={datosPasarelaRequest}
//                             onChangeText={setDatosPasarelaRequest}
//                             multiline
//                             numberOfLines={6}
//                         />
//                         <TextInput
//                             style={[styles.input, styles.multilineInput]}
//                             placeholder="Datos Pasarela Response (JSON)"
//                             placeholderTextColor="#888"
//                             value={datosPasarelaResponse}
//                             onChangeText={setDatosPasarelaResponse}
//                             multiline
//                             numberOfLines={6}
//                         />

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingDependencies}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Transacción"}</Text>
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