// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Linking } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarMusicaPreferenciaNavegacion } from "../../Src/Servicios/MusicaPreferenciaNavegacionService"; // Asume que tienes este servicio

// import styles from "../../Styles/EditarMusicaPreferenciaNavegacionStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarMusicaPreferenciaNavegacion({ navigation }) {
//     const route = useRoute();
//     const musicaPreferenciaInicial = route.params?.musicaPreferencia;

//     const [nombreOpcion, setNombreOpcion] = useState(musicaPreferenciaInicial?.nombre_opcion || "");
//     const [descripcion, setDescripcion] = useState(musicaPreferenciaInicial?.descripcion || "");
//     const [streamUrlEjemplo, setStreamUrlEjemplo] = useState(musicaPreferenciaInicial?.stream_url_ejemplo || "");
//     const [activo, setActivo] = useState(musicaPreferenciaInicial?.activo ? "1" : "0");

//     const [loading, setLoading] = useState(false);

//     const esEdicion = !!musicaPreferenciaInicial;

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
//         if (!nombreOpcion || !descripcion || !streamUrlEjemplo) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 nombre_opcion: nombreOpcion,
//                 descripcion: descripcion,
//                 stream_url_ejemplo: streamUrlEjemplo,
//                 activo: activo === "1" ? true : false,
//             };

//             result = await editarMusicaPreferenciaNavegacion(musicaPreferenciaInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Preferencia de música actualizada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la preferencia de música"));
//             }
//         } catch (error) {
//             console.error("Error al guardar preferencia de música:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la preferencia de música."));
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleOpenURL = async (url) => {
//         const supported = await Linking.canOpenURL(url);
//         if (supported) {
//             await Linking.openURL(url);
//         } else {
//             Alert.alert(`No se puede abrir esta URL: ${url}`);
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
//                         <Text style={styles.title}>{esEdicion ? "Editar Preferencia de Música" : "Nueva Preferencia de Música"}</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nombre de la Opción"
//                             placeholderTextColor="#888"
//                             value={nombreOpcion}
//                             onChangeText={setNombreOpcion}
//                         />
//                         <TextInput
//                             style={[styles.input, styles.multilineInput]}
//                             placeholder="Descripción"
//                             placeholderTextColor="#888"
//                             value={descripcion}
//                             onChangeText={setDescripcion}
//                             multiline
//                             numberOfLines={4}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="URL de Ejemplo (Spotify, YouTube, etc.)"
//                             placeholderTextColor="#888"
//                             value={streamUrlEjemplo}
//                             onChangeText={setStreamUrlEjemplo}
//                             keyboardType="url"
//                         />
//                         {streamUrlEjemplo ? (
//                             <TouchableOpacity onPress={() => handleOpenURL(streamUrlEjemplo)} style={styles.urlButton}>
//                                 <Ionicons name="link-outline" size={20} color="#1976D2" />
//                                 <Text style={styles.urlButtonText}>Abrir URL de Ejemplo</Text>
//                             </TouchableOpacity>
//                         ) : null}

//                         <Text style={styles.pickerLabelActual}>Activo:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={activo}
//                                 onValueChange={(itemValue) => setActivo(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="Sí" value="1" />
//                                 <Picker.Item label="No" value="0" />
//                             </Picker>
//                         </View>

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Preferencia"}</Text>
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