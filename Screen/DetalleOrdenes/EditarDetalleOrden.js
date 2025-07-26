// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarDetalleOrden } from "../../Src/Servicios/DetalleOrdenService"; // Asume que tienes este servicio
// import { listarOrdenes } from "../../Src/Servicios/OrdenService"; // Servicio para listar órdenes
// import { listarProductos } from "../../Src/Servicios/ProductoService"; // Servicio para listar productos

// import styles from "../../Styles/EditarDetalleOrdenStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarDetalleOrden({ navigation }) {
//     const route = useRoute();
//     const detalleOrdenInicial = route.params?.detalleOrden;

//     const [ordenId, setOrdenId] = useState(detalleOrdenInicial?.orden_id?.toString() || "");
//     const [productoId, setProductoId] = useState(detalleOrdenInicial?.producto_id?.toString() || "");
//     const [nombreProductoHistorico, setNombreProductoHistorico] = useState(detalleOrdenInicial?.nombre_producto_historico || "");
//     const [cantidad, setCantidad] = useState(detalleOrdenInicial?.cantidad?.toString() || "");
//     const [precioUnitarioHistorico, setPrecioUnitarioHistorico] = useState(detalleOrdenInicial?.precio_unitario_historico?.toString() || "");
//     const [subtotalLinea, setSubtotalLinea] = useState(detalleOrdenInicial?.subtotal_linea?.toString() || "");

//     const [ordenes, setOrdenes] = useState([]);
//     const [productos, setProductos] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const esEdicion = !!detalleOrdenInicial;

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
//         const cargarDependencias = async () => {
//             setLoadingDependencies(true);
//             try {
//                 const [ordenesRes, productosRes] = await Promise.all([
//                     listarOrdenes(),
//                     listarProductos()
//                 ]);

//                 if (ordenesRes.success) setOrdenes(ordenesRes.data);
//                 else Alert.alert("Error", ordenesRes.message || "No se pudieron cargar las órdenes.");

//                 if (productosRes.success) setProductos(productosRes.data);
//                 else Alert.alert("Error", productosRes.message || "No se pudieron cargar los productos.");

//                 // Set initial values for Pickers if editing
//                 if (esEdicion) {
//                     if (detalleOrdenInicial?.orden_id) setOrdenId(detalleOrdenInicial.orden_id.toString());
//                     if (detalleOrdenInicial?.producto_id) setProductoId(detalleOrdenInicial.producto_id.toString());
//                 } else {
//                     // Set default values for new detail
//                     if (ordenesRes.data.length > 0) setOrdenId(ordenesRes.data[0].id.toString());
//                     if (productosRes.data.length > 0) setProductoId(productosRes.data[0].id.toString());
//                 }

//             } catch (error) {
//                 console.error("Error al cargar dependencias de detalle de orden:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar las dependencias.");
//             } finally {
//                 setLoadingDependencies(false);
//             }
//         };
//         cargarDependencias();
//     }, [esEdicion, detalleOrdenInicial]);

//     const handleGuardar = async () => {
//         if (!ordenId || !productoId || !nombreProductoHistorico || !cantidad || !precioUnitarioHistorico || !subtotalLinea) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         const cantidadNumerica = parseInt(cantidad);
//         if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
//             Alert.alert("Formato de Cantidad", "Por favor, ingrese una cantidad válida.");
//             return;
//         }

//         const precioNumerico = parseFloat(precioUnitarioHistorico);
//         if (isNaN(precioNumerico) || precioNumerico < 0) {
//             Alert.alert("Formato de Precio Unitario", "Por favor, ingrese un precio unitario válido.");
//             return;
//         }

//         const subtotalNumerico = parseFloat(subtotalLinea);
//         if (isNaN(subtotalNumerico) || subtotalNumerico < 0) {
//             Alert.alert("Formato de Subtotal", "Por favor, ingrese un subtotal de línea válido.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 orden_id: parseInt(ordenId),
//                 producto_id: parseInt(productoId),
//                 nombre_producto_historico: nombreProductoHistorico,
//                 cantidad: cantidadNumerica,
//                 precio_unitario_historico: precioNumerico,
//                 subtotal_linea: subtotalNumerico,
//             };

//             result = await editarDetalleOrden(detalleOrdenInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Detalle de orden actualizado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar el detalle de orden"));
//             }
//         } catch (error) {
//             console.error("Error al guardar detalle de orden:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el detalle de orden."));
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
//                         <Text style={styles.title}>{esEdicion ? "Editar Detalle de Orden" : "Nuevo Detalle de Orden"}</Text>

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
//                                             <Picker.Item key={orden.id.toString()} label={`Orden ${orden.id} - ${orden.codigo}`} value={orden.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabelActual}>Producto:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={productoId}
//                                         onValueChange={(itemValue) => setProductoId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Producto --" value="" />
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

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingDependencies}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Detalle de Orden"}</Text>
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