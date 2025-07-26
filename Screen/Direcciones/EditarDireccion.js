// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarDireccion } from "../../Src/Servicios/DireccionService"; // Asume que tienes este servicio
// // Puedes necesitar servicios para listar usuarios y sucursales si direccionable_type lo requiere
// // import { listarUsuarios } from "../../Src/Servicios/UsuarioService";
// // import { listarSucursales } from "../../Src/Servicios/SucursalService";

// import styles from "../../Styles/EditarDireccionStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarDireccion({ navigation }) {
//     const route = useRoute();
//     const direccionInicial = route.params?.direccion;

//     const [direccionableId, setDireccionableId] = useState(direccionInicial?.direccionable_id?.toString() || "");
//     const [direccionableType, setDireccionableType] = useState(direccionInicial?.direccionable_type || "");
//     const [direccion, setDireccion] = useState(direccionInicial?.direccion || "");
//     const [colonia, setColonia] = useState(direccionInicial?.colonia || "");
//     const [codigoPostal, setCodigoPostal] = useState(direccionInicial?.codigo_postal || "");
//     const [ciudad, setCiudad] = useState(direccionInicial?.ciudad || "");
//     const [estado, setEstado] = useState(direccionInicial?.estado || "");
//     const [referencias, setReferencias] = useState(direccionInicial?.referencias || "");
//     const [esPredeterminada, setEsPredeterminada] = useState(direccionInicial?.es_predeterminada ? "1" : "0");

//     const [loading, setLoading] = useState(false);
//     // const [loadingDependencies, setLoadingDependencies] = useState(true); // Para futuras dependencias de Pickers dinámicos

//     const esEdicion = !!direccionInicial;

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

//     // Opciones para direccionable_type (ejemplos, ajusta según tus entidades)
//     const direccionableTypes = ["Sucursal", "Usuario", "Proveedor"];

//     const handleGuardar = async () => {
//         if (!direccionableId || !direccionableType || !direccion || !ciudad || !estado) {
//             Alert.alert("Campos requeridos", "Por favor, complete los campos obligatorios: ID Direccionable, Tipo Direccionable, Dirección, Ciudad y Estado.");
//             return;
//         }

//         const direccionableIdNum = parseInt(direccionableId);
//         if (isNaN(direccionableIdNum) || direccionableIdNum <= 0) {
//             Alert.alert("ID Direccionable", "Por favor, ingrese un ID direccionable válido.");
//             return;
//         }


//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 direccionable_id: direccionableIdNum,
//                 direccionable_type: direccionableType,
//                 direccion: direccion,
//                 colonia: colonia,
//                 codigo_postal: codigoPostal,
//                 ciudad: ciudad,
//                 estado: estado,
//                 referencias: referencias,
//                 es_predeterminada: esPredeterminada === "1" ? true : false,
//             };

//             result = await editarDireccion(direccionInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Dirección actualizada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la dirección"));
//             }
//         } catch (error) {
//             console.error("Error al guardar dirección:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la dirección."));
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
//                         <Text style={styles.title}>{esEdicion ? "Editar Dirección" : "Nueva Dirección"}</Text>

//                         <Text style={styles.pickerLabelActual}>Tipo de Entidad:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={direccionableType}
//                                 onValueChange={(itemValue) => setDireccionableType(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione Tipo --" value="" />
//                                 {direccionableTypes.map((type) => (
//                                     <Picker.Item key={type} label={type} value={type} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="ID de la Entidad (Sucursal/Usuario/etc.)"
//                             placeholderTextColor="#888"
//                             value={direccionableId}
//                             onChangeText={setDireccionableId}
//                             keyboardType="numeric"
//                         />

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Dirección (Calle y Número)"
//                             placeholderTextColor="#888"
//                             value={direccion}
//                             onChangeText={setDireccion}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Colonia"
//                             placeholderTextColor="#888"
//                             value={colonia}
//                             onChangeText={setColonia}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Código Postal"
//                             placeholderTextColor="#888"
//                             value={codigoPostal}
//                             onChangeText={setCodigoPostal}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Ciudad"
//                             placeholderTextColor="#888"
//                             value={ciudad}
//                             onChangeText={setCiudad}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Estado"
//                             placeholderTextColor="#888"
//                             value={estado}
//                             onChangeText={setEstado}
//                         />
//                         <TextInput
//                             style={[styles.input, styles.multilineInput]}
//                             placeholder="Referencias Adicionales"
//                             placeholderTextColor="#888"
//                             value={referencias}
//                             onChangeText={setReferencias}
//                             multiline
//                             numberOfLines={4}
//                         />

//                         <Text style={styles.pickerLabelActual}>¿Es Predeterminada?:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={esPredeterminada}
//                                 onValueChange={(itemValue) => setEsPredeterminada(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="No" value="0" />
//                                 <Picker.Item label="Sí" value="1" />
//                             </Picker>
//                         </View>

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Dirección"}</Text>
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