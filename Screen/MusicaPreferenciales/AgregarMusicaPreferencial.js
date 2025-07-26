// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { crearMusicaPreferenciaNavegacion } from "../../Src/Servicios/MusicaPreferenciaNavegacionService"; // Asume que tienes este servicio
// import styles from "../../Styles/AgregarMusicaPreferenciaNavegacionStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarMusicaPreferenciaNavegacion({ navigation }) {
//     const [nombreOpcion, setNombreOpcion] = useState("");
//     const [descripcion, setDescripcion] = useState("");
//     const [streamUrlEjemplo, setStreamUrlEjemplo] = useState("");
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
//         if (!nombreOpcion) {
//             Alert.alert("Campo requerido", "Por favor, ingrese el nombre de la opción de música.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearMusicaPreferenciaNavegacion({
//                 nombre_opcion: nombreOpcion,
//                 descripcion: descripcion,
//                 stream_url_ejemplo: streamUrlEjemplo,
//                 activo: activo,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Preferencia de música creada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la preferencia de música"));
//             }
//         } catch (error) {
//             console.error("Error al crear preferencia de música:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la preferencia de música."));
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
//                 <ScrollView contentContainerContainerStyle={styles.scrollContainer}>
//                     <View style={styles.container}>
//                         <Text style={styles.title}>Nueva Preferencia de Música</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nombre de la Opción (ej. Música Electrónica)"
//                             placeholderTextColor="#888"
//                             value={nombreOpcion}
//                             onChangeText={setNombreOpcion}
//                         />
//                         <TextInput
//                             style={styles.inputMultiline}
//                             placeholder="Descripción (Opcional)"
//                             placeholderTextColor="#888"
//                             value={descripcion}
//                             onChangeText={setDescripcion}
//                             multiline
//                             numberOfLines={3}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="URL de Ejemplo (ej. https://open.spotify.com/...)"
//                             placeholderTextColor="#888"
//                             value={streamUrlEjemplo}
//                             onChangeText={setStreamUrlEjemplo}
//                             keyboardType="url"
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
//                                     <Text style={styles.textoBoton}>Crear Preferencia</Text>
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