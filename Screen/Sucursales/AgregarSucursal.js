// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { crearSucursal } from "../../Src/Servicios/SucursalService"; // Asume que tienes este servicio
// import styles from "../../Styles/AgregarSucursalStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarSucursal({ navigation }) {
//     const [nombre, setNombre] = useState("");
//     const [imagenPath, setImagenPath] = useState("");
//     const [telefonoContacto, setTelefonoContacto] = useState("");
//     const [emailContacto, setEmailContacto] = useState("");
//     const [linkMaps, setLinkMaps] = useState("");
//     const [latitud, setLatitud] = useState("");
//     const [longitud, setLongitud] = useState("");
//     const [activo, setActivo] = useState(true);

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
//         if (!nombre || !telefonoContacto || !emailContacto || !linkMaps || !latitud || !longitud) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios: Nombre, Teléfono, Email, Link de Maps, Latitud y Longitud.");
//             return;
//         }

//         const latitudNum = parseFloat(latitud);
//         const longitudNum = parseFloat(longitud);

//         if (isNaN(latitudNum) || isNaN(longitudNum)) {
//             Alert.alert("Coordenadas inválidas", "Por favor, ingrese valores numéricos válidos para Latitud y Longitud.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearSucursal({
//                 nombre: nombre,
//                 imagen_path: imagenPath,
//                 telefono_contacto: telefonoContacto,
//                 email_contacto: emailContacto,
//                 link_maps: linkMaps,
//                 latitud: latitudNum,
//                 longitud: longitudNum,
//                 activo: activo,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Sucursal creada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la sucursal"));
//             }
//         } catch (error) {
//             console.error("Error al crear sucursal:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la sucursal."));
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
//                         <Text style={styles.title}>Nueva Sucursal</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nombre de la Sucursal"
//                             placeholderTextColor="#888"
//                             value={nombre}
//                             onChangeText={setNombre}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Ruta de la Imagen (URL o Path - Opcional)"
//                             placeholderTextColor="#888"
//                             value={imagenPath}
//                             onChangeText={setImagenPath}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Teléfono de Contacto"
//                             placeholderTextColor="#888"
//                             value={telefonoContacto}
//                             onChangeText={setTelefonoContacto}
//                             keyboardType="phone-pad"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Email de Contacto"
//                             placeholderTextColor="#888"
//                             value={emailContacto}
//                             onChangeText={setEmailContacto}
//                             keyboardType="email-address"
//                             autoCapitalize="none"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Link de Google Maps"
//                             placeholderTextColor="#888"
//                             value={linkMaps}
//                             onChangeText={setLinkMaps}
//                             autoCapitalize="none"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Latitud"
//                             placeholderTextColor="#888"
//                             value={latitud}
//                             onChangeText={setLatitud}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Longitud"
//                             placeholderTextColor="#888"
//                             value={longitud}
//                             onChangeText={setLongitud}
//                             keyboardType="numeric"
//                         />
                        
//                         <View style={styles.switchContainer}>
//                             <Text style={styles.switchLabel}>Activo:</Text>
//                             <Switch
//                                 onValueChange={setActivo}
//                                 value={activo}
//                             />
//                         </View>

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Sucursal</Text>
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