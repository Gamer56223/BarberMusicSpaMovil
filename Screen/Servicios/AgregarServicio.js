// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from "@react-native-picker/picker";
// import { crearServicioSucursal } from "../../Src/Servicios/ServicioSucursalService"; // Asume que tienes este servicio
// import { listarServicios } from "../../Src/Servicios/ServicioService"; // Ya tenemos este servicio
// import { listarSucursales } from "../../Src/Servicios/SucursalService"; // Ya tenemos este servicio
// import styles from "../../Styles/AgregarServicioSucursalStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarServicioSucursal({ navigation }) {
//     const [servicioId, setServicioId] = useState("");
//     const [sucursalId, setSucursalId] = useState("");
//     const [precioEnSucursal, setPrecioEnSucursal] = useState("");
//     const [estaDisponible, setEstaDisponible] = useState(true);

//     const [servicios, setServicios] = useState([]);
//     const [sucursales, setSucursales] = useState([]);
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
//         }
//         return defaultMsg;
//     };

//     useEffect(() => {
//         const cargarDatosIniciales = async () => {
//             setLoadingData(true);
//             try {
//                 const [resultServicios, resultSucursales] = await Promise.all([
//                     listarServicios(),
//                     listarSucursales(),
//                 ]);

//                 if (resultServicios.success) {
//                     setServicios(resultServicios.data);
//                     if (resultServicios.data.length > 0) {
//                         setServicioId(resultServicios.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar servicios", resultServicios.message || "No se pudieron cargar los servicios.");
//                 }

//                 if (resultSucursales.success) {
//                     setSucursales(resultSucursales.data);
//                     if (resultSucursales.data.length > 0) {
//                         setSucursalId(resultSucursales.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error al cargar sucursales", resultSucursales.message || "No se pudieron cargar las sucursales.");
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
//         if (!servicioId || !sucursalId || !precioEnSucursal) {
//             Alert.alert("Campos requeridos", "Por favor, complete los campos obligatorios: Servicio, Sucursal y Precio en Sucursal.");
//             return;
//         }

//         const precioEnSucursalNum = parseFloat(precioEnSucursal);

//         if (isNaN(precioEnSucursalNum) || precioEnSucursalNum < 0) {
//             Alert.alert("Precio inválido", "Por favor, ingrese un precio numérico válido.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearServicioSucursal({
//                 servicio_id: parseInt(servicioId),
//                 sucursal_id: parseInt(sucursalId),
//                 precio_en_sucursal: precioEnSucursalNum,
//                 esta_disponible: estaDisponible,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Servicio en sucursal creado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el servicio en sucursal"));
//             }
//         } catch (error) {
//             console.error("Error al crear servicio en sucursal:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el servicio en sucursal."));
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
//                         <Text style={styles.title}>Nuevo Servicio por Sucursal</Text>

//                         {loadingData ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabel}>Servicio:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={servicioId}
//                                         onValueChange={(itemValue) => setServicioId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione un Servicio --" value="" />
//                                         {servicios.map((srv) => (
//                                             <Picker.Item key={srv.id.toString()} label={srv.nombre} value={srv.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabel}>Sucursal:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={sucursalId}
//                                         onValueChange={(itemValue) => setSucursalId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione una Sucursal --" value="" />
//                                         {sucursales.map((suc) => (
//                                             <Picker.Item key={suc.id.toString()} label={suc.nombre} value={suc.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Precio en Sucursal"
//                             placeholderTextColor="#888"
//                             value={precioEnSucursal}
//                             onChangeText={setPrecioEnSucursal}
//                             keyboardType="numeric"
//                         />
                        
//                         <View style={styles.switchContainer}>
//                             <Text style={styles.switchLabel}>Está Disponible:</Text>
//                             <Switch
//                                 onValueChange={setEstaDisponible}
//                                 value={estaDisponible}
//                             />
//                         </View>

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Servicio por Sucursal</Text>
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