// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { Picker } from "@react-native-picker/picker"; // Necesario para el Picker de 'activo' y 'tipo_categoria'

// import { editarCategoria } from "../../Src/Servicios/CategoriaService"; // Asume que tienes este servicio

// import styles from "../../Styles/EditarCategoriaStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarCategoria({ navigation }) {
//     const route = useRoute();
//     const categoriaInicial = route.params?.categoria;

//     const [nombre, setNombre] = useState(categoriaInicial?.nombre || "");
//     const [descripcion, setDescripcion] = useState(categoriaInicial?.descripcion || "");
//     const [tipoCategoria, setTipoCategoria] = useState(categoriaInicial?.tipo_categoria || "");
//     const [iconoClave, setIconoClave] = useState(categoriaInicial?.icono_clave || "");
//     const [activo, setActivo] = useState(categoriaInicial?.activo ? "1" : "0"); // Para el switch o picker

//     const [loading, setLoading] = useState(false);

//     const esEdicion = !!categoriaInicial;

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
//         if (!nombre || !tipoCategoria) {
//             Alert.alert("Campos requeridos", "Por favor, ingrese el nombre y el tipo de categoría.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 nombre: nombre,
//                 descripcion: descripcion,
//                 tipo_categoria: tipoCategoria,
//                 icono_clave: iconoClave,
//                 activo: activo === "1" ? true : false,
//             };

//             result = await editarCategoria(categoriaInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Categoría actualizada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la categoría"));
//             }
//         } catch (error) {
//             console.error("Error al guardar categoría:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la categoría."));
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Opciones para tipo_categoria (ajusta estas según tus necesidades reales)
//     const tiposCategoria = ["Servicio", "Producto", "General"]; // Ejemplo de tipos

//     return (
//         <KeyboardAvoidingView
//             style={styles.keyboardAvoidingView}
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <ScrollView contentContainerStyle={styles.scrollContainer}>
//                     <View style={styles.container}>
//                         <Text style={styles.title}>{esEdicion ? "Editar Categoría" : "Nueva Categoría"}</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nombre de la Categoría"
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

//                         <Text style={styles.pickerLabelActual}>Tipo de Categoría:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={tipoCategoria}
//                                 onValueChange={(itemValue) => setTipoCategoria(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione un Tipo --" value="" />
//                                 {tiposCategoria.map((tipo) => (
//                                     <Picker.Item key={tipo} label={tipo} value={tipo} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Clave del Icono (ej: 'bar-chart')"
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
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Categoría"}</Text>
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