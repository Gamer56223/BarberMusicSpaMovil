// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarEspecialidad } from "../../Src/Servicios/EspecialidadService"; // Asume que tienes este servicio

// import styles from "../../Styles/EditarEspecialidadStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarEspecialidad({ navigation }) {
//     const route = useRoute();
//     const especialidadInicial = route.params?.especialidad;

//     const [nombre, setNombre] = useState(especialidadInicial?.nombre || "");
//     const [descripcion, setDescripcion] = useState(especialidadInicial?.descripcion || "");
//     const [iconoClave, setIconoClave] = useState(especialidadInicial?.icono_clave || "");
//     const [activo, setActivo] = useState(especialidadInicial?.activo ? "1" : "0");

//     const [loading, setLoading] = useState(false);

//     const esEdicion = !!especialidadInicial;

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
//         if (!nombre) {
//             Alert.alert("Campos requeridos", "Por favor, ingrese el nombre de la especialidad.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 nombre: nombre,
//                 descripcion: descripcion,
//                 icono_clave: iconoClave,
//                 activo: activo === "1" ? true : false,
//             };

//             result = await editarEspecialidad(especialidadInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Especialidad actualizada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la especialidad"));
//             }
//         } catch (error) {
//             console.error("Error al guardar especialidad:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la especialidad."));
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
//                         <Text style={styles.title}>{esEdicion ? "Editar Especialidad" : "Nueva Especialidad"}</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nombre de la Especialidad"
//                             placeholderTextColor="#888"
//                             value={nombre}
//                             onChangeText={setNombre}
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
//                             placeholder="Clave del Icono (ej: 'icono_barbero')"
//                             placeholderTextColor="#888"
//                             value={iconoClave}
//                             onChangeText={setIconoClave}
//                         />

//                         <Text style={styles.pickerLabelActual}>Estado:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={activo}
//                                 onValueChange={(itemValue) => setActivo(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="Activo" value="1" />
//                                 <Picker.Item label="Inactivo" value="0" />
//                             </Picker>
//                         </View>

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Especialidad"}</Text>
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