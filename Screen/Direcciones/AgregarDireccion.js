// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { crearDireccion } from "../../Src/Servicios/DireccionService"; // Asume que tienes este servicio
// import styles from "../../Styles/AgregarDireccionStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarDireccion({ navigation }) {
//     const [direccionableId, setDireccionableId] = useState("");
//     const [direccionableType, setDireccionableType] = useState("");
//     const [direccion, setDireccion] = useState("");
//     const [colonia, setColonia] = useState("");
//     const [codigoPostal, setCodigoPostal] = useState("");
//     const [ciudad, setCiudad] = useState("");
//     const [estado, setEstado] = useState("");
//     const [referencias, setReferencias] = useState("");
//     const [esPredeterminada, setEsPredeterminada] = useState(false);

//     const [loading, setLoading] = useState(false);

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

//     const handleGuardar = async () => {
//         if (!direccionableId || !direccionableType || !direccion || !colonia || !ciudad || !estado) {
//             Alert.alert("Campos requeridos", "Por favor, complete al menos los campos obligatorios: ID Relacionable, Tipo Relacionable, Dirección, Colonia, Ciudad, y Estado.");
//             return;
//         }

//         const direccionableIdNum = parseInt(direccionableId);
//         if (isNaN(direccionableIdNum) || direccionableIdNum <= 0) {
//             Alert.alert("ID Relacionable inválido", "Por favor, ingrese un ID relacionable numérico válido.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearDireccion({
//                 direccionable_id: direccionableIdNum,
//                 direccionable_type: direccionableType,
//                 direccion: direccion,
//                 colonia: colonia,
//                 codigo_postal: codigoPostal,
//                 ciudad: ciudad,
//                 estado: estado,
//                 referencias: referencias,
//                 es_predeterminada: esPredeterminada,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Dirección creada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la dirección"));
//             }
//         } catch (error) {
//             console.error("Error al crear dirección:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la dirección."));
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
//                         <Text style={styles.title}>Nueva Dirección</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="ID Relacionable (ej. ID de Usuario o Sucursal)"
//                             placeholderTextColor="#888"
//                             value={direccionableId}
//                             onChangeText={setDireccionableId}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Tipo Relacionable (ej. App\\Models\\User, App\\Models\\Sucursal)"
//                             placeholderTextColor="#888"
//                             value={direccionableType}
//                             onChangeText={setDireccionableType}
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
//                             style={styles.inputMultiline}
//                             placeholder="Referencias (ej. entre calles, color de casa)"
//                             placeholderTextColor="#888"
//                             value={referencias}
//                             onChangeText={setReferencias}
//                             multiline
//                             numberOfLines={3}
//                         />

//                         <View style={styles.switchContainer}>
//                             <Text style={styles.switchLabel}>Es Predeterminada:</Text>
//                             <Switch
//                                 onValueChange={setEsPredeterminada}
//                                 value={esPredeterminada}
//                             />
//                         </View>

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Dirección</Text>
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