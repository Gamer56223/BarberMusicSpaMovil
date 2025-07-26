// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from "@react-native-picker/picker";
// import { crearDetalleOrden } from "../../Src/Servicios/DetalleOrdenService"; // Asume que tienes este servicio
// import { listarOrdenes } from "../../Src/Servicios/OrdenService"; // Asume que tienes este servicio
// import { listarProductos } from "../../Src/Servicios/ProductoService"; // Asume que tienes este servicio

// import styles from "../../Styles/AgregarDetalleOrdenStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarDetalleOrden({ navigation }) {
//     const [ordenId, setOrdenId] = useState("");
//     const [productoId, setProductoId] = useState("");
//     const [nombreProductoHistorico, setNombreProductoHistorico] = useState("");
//     const [cantidad, setCantidad] = useState("");
//     const [precioUnitarioHistorico, setPrecioUnitarioHistorico] = useState("");
//     const [subtotalLinea, setSubtotalLinea] = useState("");

//     const [ordenes, setOrdenes] = useState([]);
//     const [productos, setProductos] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingData, setLoadingData] = useState(true);

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
//             }
//         return defaultMsg;
//     };

//     useEffect(() => {
//         const cargarDatosIniciales = async () => {
//             setLoadingData(true);
//             try {
//                 const [resultOrdenes, resultProductos] = await Promise.all([
//                     listarOrdenes(),
//                     listarProductos(),
//                 ]);

//                 if (resultOrdenes.success) {
//                     setOrdenes(resultOrdenes.data);
//                     if (resultOrdenes.data.length > 0) {
//                         setOrdenId(resultOrdenes.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar órdenes", resultOrdenes.message || "No se pudieron cargar las órdenes.");
//                 }

//                 if (resultProductos.success) {
//                     setProductos(resultProductos.data);
//                     if (resultProductos.data.length > 0) {
//                         setProductoId(resultProductos.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar productos", resultProductos.message || "No se pudieron cargar los productos.");
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
//         if (!ordenId || !productoId || !nombreProductoHistorico || !cantidad || !precioUnitarioHistorico || !subtotalLinea) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos.");
//             return;
//         }

//         const cantidadNumerica = parseInt(cantidad);
//         if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
//             Alert.alert("Cantidad inválida", "Por favor, ingrese una cantidad válida.");
//             return;
//         }

//         const precioUnitarioNumerico = parseFloat(precioUnitarioHistorico);
//         if (isNaN(precioUnitarioNumerico) || precioUnitarioNumerico <= 0) {
//             Alert.alert("Precio Unitario inválido", "Por favor, ingrese un precio unitario válido.");
//             return;
//         }

//         const subtotalLineaNumerico = parseFloat(subtotalLinea);
//         if (isNaN(subtotalLineaNumerico) || subtotalLineaNumerico <= 0) {
//             Alert.alert("Subtotal de Línea inválido", "Por favor, ingrese un subtotal de línea válido.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearDetalleOrden({
//                 orden_id: parseInt(ordenId),
//                 producto_id: parseInt(productoId),
//                 nombre_producto_historico: nombreProductoHistorico,
//                 cantidad: cantidadNumerica,
//                 precio_unitario_historico: precioUnitarioNumerico,
//                 subtotal_linea: subtotalLineaNumerico,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Detalle de orden creado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el detalle de orden"));
//             }
//         } catch (error) {
//             console.error("Error al crear detalle de orden:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el detalle de orden."));
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
//                         <Text style={styles.title}>Nuevo Detalle de Orden</Text>

//                         {loadingData ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabel}>Orden:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={ordenId}
//                                         onValueChange={(itemValue) => setOrdenId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione una Orden --" value="" />
//                                         {ordenes.map((orden) => (
//                                             <Picker.Item key={orden.id.toString()} label={`Orden #${orden.numero_orden}`} value={orden.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabel}>Producto:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={productoId}
//                                         onValueChange={(itemValue) => setProductoId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione un Producto --" value="" />
//                                         {productos.map((producto) => (
//                                             <Picker.Item key={producto.id.toString()} label={producto.nombre} value={producto.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nombre del Producto Histórico"
//                             placeholderTextColor="#888"
//                             value={nombreProductoHistorico}
//                             onChangeText={setNombreProductoHistorico}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Cantidad"
//                             placeholderTextColor="#888"
//                             value={cantidad}
//                             onChangeText={setCantidad}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Precio Unitario Histórico"
//                             placeholderTextColor="#888"
//                             value={precioUnitarioHistorico}
//                             onChangeText={setPrecioUnitarioHistorico}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Subtotal de Línea"
//                             placeholderTextColor="#888"
//                             value={subtotalLinea}
//                             onChangeText={setSubtotalLinea}
//                             keyboardType="numeric"
//                         />

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Detalle de Orden</Text>
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