// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from "@react-native-picker/picker";
// import { crearOrden } from "../../Src/Servicios/OrdenService"; // Asume que tienes este servicio
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService"; // Ya tenemos este servicio

// import styles from "../../Styles/AgregarOrdenStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarOrden({ navigation }) {
//     const [clienteUsuarioId, setClienteUsuarioId] = useState("");
//     const [numeroOrden, setNumeroOrden] = useState("");
//     const [fechaOrden, setFechaOrden] = useState(""); // Formato 'YYYY-MM-DD HH:MM:SS'
//     const [fechaRecibida, setFechaRecibida] = useState(""); // Formato 'YYYY-MM-DD HH:MM:SS'
//     const [subtotal, setSubtotal] = useState("");
//     const [descuentoTotal, setDescuentoTotal] = useState("");
//     const [impuestosTotal, setImpuestosTotal] = useState("");
//     const [totalOrden, setTotalOrden] = useState("");
//     const [estadoOrden, setEstadoOrden] = useState("");
//     const [notasOrden, setNotasOrden] = useState("");

//     const [usuarios, setUsuarios] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingData, setLoadingData] = useState(true);

//     const estadosOrden = [
//         { label: "Pendiente de Pago", value: "PENDIENTE_PAGO" },
//         { label: "Pagada", value: "PAGADA" },
//         { label: "En Proceso", value: "EN_PROCESO" },
//         { label: "Enviada", value: "ENVIADA" },
//         { label: "Completada", value: "COMPLETADA" },
//         { label: "Cancelada", value: "CANCELADA" },
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
//         const cargarUsuarios = async () => {
//             setLoadingData(true);
//             try {
//                 const result = await listarUsuarios();
//                 if (result.success) {
//                     setUsuarios(result.data);
//                     if (result.data.length > 0) {
//                         setClienteUsuarioId(result.data[0].id.toString());
//                     } else {
//                         setClienteUsuarioId("");
//                     }
//                 } else {
//                     Alert.alert(
//                         "Error al cargar usuarios",
//                         result.message || "No se pudieron cargar los usuarios."
//                     );
//                 }
//             } catch (error) {
//                 console.error("Error al cargar usuarios:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar los usuarios.");
//             } finally {
//                 setLoadingData(false);
//             }
//         };
//         cargarUsuarios();
//     }, []);

//     const handleGuardar = async () => {
//         if (!clienteUsuarioId || !numeroOrden || !fechaOrden || !estadoOrden || !subtotal || !totalOrden) {
//             Alert.alert("Campos requeridos", "Por favor, complete los campos obligatorios: Cliente, Número de Orden, Fecha de Orden, Estado, Subtotal y Total de Orden.");
//             return;
//         }

//         const subtotalNum = parseFloat(subtotal);
//         const descuentoTotalNum = parseFloat(descuentoTotal || 0);
//         const impuestosTotalNum = parseFloat(impuestosTotal || 0);
//         const totalOrdenNum = parseFloat(totalOrden);

//         if (isNaN(subtotalNum) || subtotalNum < 0 ||
//             isNaN(descuentoTotalNum) || descuentoTotalNum < 0 ||
//             isNaN(impuestosTotalNum) || impuestosTotalNum < 0 ||
//             isNaN(totalOrdenNum) || totalOrdenNum < 0) {
//             Alert.alert("Valores numéricos inválidos", "Por favor, ingrese valores numéricos válidos para los montos.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearOrden({
//                 cliente_usuario_id: parseInt(clienteUsuarioId),
//                 numero_orden: numeroOrden,
//                 fecha_orden: fechaOrden,
//                 fecha_recibida: fechaRecibida || null,
//                 subtotal: subtotalNum,
//                 descuento_total: descuentoTotalNum,
//                 impuestos_total: impuestosTotalNum,
//                 total_orden: totalOrdenNum,
//                 estado_orden: estadoOrden,
//                 notas_orden: notasOrden,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Orden creada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la orden"));
//             }
//         } catch (error) {
//             console.error("Error al crear orden:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la orden."));
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
//                         <Text style={styles.title}>Nueva Orden</Text>

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
//                                         {usuarios.map((usuario) => (
//                                             <Picker.Item key={usuario.id.toString()} label={usuario.nombre || usuario.email} value={usuario.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Número de Orden (ej. ORD0001)"
//                             placeholderTextColor="#888"
//                             value={numeroOrden}
//                             onChangeText={setNumeroOrden}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Fecha de Orden (YYYY-MM-DD HH:MM:SS)"
//                             placeholderTextColor="#888"
//                             value={fechaOrden}
//                             onChangeText={setFechaOrden}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Fecha Recibida (YYYY-MM-DD HH:MM:SS - Opcional)"
//                             placeholderTextColor="#888"
//                             value={fechaRecibida}
//                             onChangeText={setFechaRecibida}
//                         />
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
//                             placeholder="Descuento Total (Opcional)"
//                             placeholderTextColor="#888"
//                             value={descuentoTotal}
//                             onChangeText={setDescuentoTotal}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Impuestos Total (Opcional)"
//                             placeholderTextColor="#888"
//                             value={impuestosTotal}
//                             onChangeText={setImpuestosTotal}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Total de Orden"
//                             placeholderTextColor="#888"
//                             value={totalOrden}
//                             onChangeText={setTotalOrden}
//                             keyboardType="numeric"
//                         />

//                         <Text style={styles.pickerLabel}>Estado de la Orden:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={estadoOrden}
//                                 onValueChange={(itemValue) => setEstadoOrden(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione un Estado --" value="" />
//                                 {estadosOrden.map((estado) => (
//                                     <Picker.Item key={estado.value} label={estado.label} value={estado.value} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <TextInput
//                             style={styles.inputMultiline}
//                             placeholder="Notas de la Orden (Opcional)"
//                             placeholderTextColor="#888"
//                             value={notasOrden}
//                             onChangeText={setNotasOrden}
//                             multiline
//                             numberOfLines={3}
//                         />

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Orden</Text>
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