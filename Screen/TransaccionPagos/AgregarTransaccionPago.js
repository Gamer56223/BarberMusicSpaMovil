// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from "@react-native-picker/picker";
// import { crearTransaccionPago } from "../../Src/Servicios/TransaccionPagoService"; // Asume que tienes este servicio
// import { listarOrdenes } from "../../Src/Servicios/OrdenService"; // Ya tenemos este servicio
// import { listarAgendamientos } from "../../Src/Servicios/AgendamientoService"; // Ya tenemos este servicio
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService"; // Ya tenemos este servicio
// import styles from "../../Styles/AgregarTransaccionPagoStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarTransaccionPago({ navigation }) {
//     const [ordenId, setOrdenId] = useState("");
//     const [agendamientoId, setAgendamientoId] = useState("");
//     const [clienteUsuarioId, setClienteUsuarioId] = useState("");
//     const [monto, setMonto] = useState("");
//     const [moneda, setMoneda] = useState("USD");
//     const [metodoPago, setMetodoPago] = useState("");
//     const [idTransaccionPasarela, setIdTransaccionPasarela] = useState("");
//     const [estadoPago, setEstadoPago] = useState("");
//     const [fechaTransaccion, setFechaTransaccion] = useState(""); // Formato 'YYYY-MM-DD HH:MM:SS'
//     const [datosPasarelaRequest, setDatosPasarelaRequest] = useState("");
//     const [datosPasarelaResponse, setDatosPasarelaResponse] = useState("");

//     const [ordenes, setOrdenes] = useState([]);
//     const [agendamientos, setAgendamientos] = useState([]);
//     const [usuarios, setUsuarios] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingData, setLoadingData] = useState(true);

//     const monedas = [
//         { label: "Dólar Estadounidense (USD)", value: "USD" },
//         { label: "Peso Mexicano (MXN)", value: "MXN" },
//         { label: "Euro (EUR)", value: "EUR" },
//     ];

//     const metodosPago = [
//         { label: "Tarjeta de Crédito (Visa)", value: "TARJETA_CREDITO_VISA" },
//         { label: "Tarjeta de Crédito (Mastercard)", value: "TARJETA_CREDITO_MASTERCARD" },
//         { label: "PayPal", value: "PAYPAL" },
//         { label: "Transferencia Bancaria", value: "TRANSFERENCIA_BANCARIA" },
//         { label: "Efectivo", value: "EFECTIVO" },
//     ];

//     const estadosPago = [
//         { label: "Pendiente", value: "PENDIENTE" },
//         { label: "Completado", value: "COMPLETADO" },
//         { label: "Fallido", value: "FALLIDO" },
//         { label: "Reembolsado", value: "REEMBOLSADO" },
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
//                 const [resultOrdenes, resultAgendamientos, resultUsuarios] = await Promise.all([
//                     listarOrdenes(),
//                     listarAgendamientos(),
//                     listarUsuarios(),
//                 ]);

//                 if (resultOrdenes.success) {
//                     setOrdenes(resultOrdenes.data);
//                 } else {
//                     Alert.alert("Error al cargar órdenes", resultOrdenes.message || "No se pudieron cargar las órdenes.");
//                 }

//                 if (resultAgendamientos.success) {
//                     setAgendamientos(resultAgendamientos.data);
//                 } else {
//                     Alert.alert("Error al cargar agendamientos", resultAgendamientos.message || "No se pudieron cargar los agendamientos.");
//                 }

//                 if (resultUsuarios.success) {
//                     setUsuarios(resultUsuarios.data);
//                 } else {
//                     Alert.alert("Error al cargar usuarios", resultUsuarios.message || "No se pudieron cargar los usuarios.");
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
//         if (!monto || !moneda || !metodoPago || !estadoPago || !fechaTransaccion) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios: Monto, Moneda, Método de Pago, Estado de Pago y Fecha de Transacción.");
//             return;
//         }

//         const montoNum = parseFloat(monto);
//         if (isNaN(montoNum) || montoNum <= 0) {
//             Alert.alert("Monto inválido", "Por favor, ingrese un monto numérico válido.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearTransaccionPago({
//                 orden_id: ordenId ? parseInt(ordenId) : null,
//                 agendamiento_id: agendamientoId ? parseInt(agendamientoId) : null,
//                 cliente_usuario_id: clienteUsuarioId ? parseInt(clienteUsuarioId) : null,
//                 monto: montoNum,
//                 moneda: moneda,
//                 metodo_pago: metodoPago,
//                 id_transaccion_pasarela: idTransaccionPasarela,
//                 estado_pago: estadoPago,
//                 fecha_transaccion: fechaTransaccion,
//                 datos_pasarela_request: datosPasarelaRequest,
//                 datos_pasarela_response: datosPasarelaResponse,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Transacción de pago creada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la transacción de pago"));
//             }
//         } catch (error) {
//             console.error("Error al crear transacción de pago:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la transacción de pago."));
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
//                         <Text style={styles.title}>Nueva Transacción de Pago</Text>

//                         {loadingData ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabel}>Orden (Opcional):</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={ordenId}
//                                         onValueChange={(itemValue) => setOrdenId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione una Orden --" value="" />
//                                         {ordenes.map((ord) => (
//                                             <Picker.Item key={ord.id.toString()} label={`Orden #${ord.id} - ${ord.numero_orden}`} value={ord.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabel}>Agendamiento (Opcional):</Text>
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

//                                 <Text style={styles.pickerLabel}>Cliente/Usuario:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={clienteUsuarioId}
//                                         onValueChange={(itemValue) => setClienteUsuarioId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione un Cliente --" value="" />
//                                         {usuarios.map((user) => (
//                                             <Picker.Item key={user.id.toString()} label={user.nombre || user.email} value={user.id.toString()} />
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
                        
//                         <Text style={styles.pickerLabel}>Moneda:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={moneda}
//                                 onValueChange={(itemValue) => setMoneda(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 {monedas.map((mon) => (
//                                     <Picker.Item key={mon.value} label={mon.label} value={mon.value} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <Text style={styles.pickerLabel}>Método de Pago:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={metodoPago}
//                                 onValueChange={(itemValue) => setMetodoPago(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione un Método --" value="" />
//                                 {metodosPago.map((met) => (
//                                     <Picker.Item key={met.value} label={met.label} value={met.value} />
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
                        
//                         <Text style={styles.pickerLabel}>Estado de Pago:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={estadoPago}
//                                 onValueChange={(itemValue) => setEstadoPago(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione un Estado --" value="" />
//                                 {estadosPago.map((est) => (
//                                     <Picker.Item key={est.value} label={est.label} value={est.value} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Fecha de Transacción (YYYY-MM-DD HH:MM:SS)"
//                             placeholderTextColor="#888"
//                             value={fechaTransaccion}
//                             onChangeText={setFechaTransaccion}
//                         />
//                         <TextInput
//                             style={styles.inputMultiline}
//                             placeholder="Datos Pasarela Request (JSON - Opcional)"
//                             placeholderTextColor="#888"
//                             value={datosPasarelaRequest}
//                             onChangeText={setDatosPasarelaRequest}
//                             multiline
//                             numberOfLines={3}
//                         />
//                         <TextInput
//                             style={styles.inputMultiline}
//                             placeholder="Datos Pasarela Response (JSON - Opcional)"
//                             placeholderTextColor="#888"
//                             value={datosPasarelaResponse}
//                             onChangeText={setDatosPasarelaResponse}
//                             multiline
//                             numberOfLines={3}
//                         />

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Transacción</Text>
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