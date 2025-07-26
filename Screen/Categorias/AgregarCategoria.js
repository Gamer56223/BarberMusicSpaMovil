// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { crearCategoria } from "../../Src/Servicios/CategoriaService"; // Asume que tienes este servicio
// import styles from "../../Styles/AgregarCategoriaStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarCategoria({ navigation }) {
//     const [nombre, setNombre] = useState("");
//     const [descripcion, setDescripcion] = useState("");
//     const [tipoCategoria, setTipoCategoria] = useState(""); // Asumo que es 'tipo_categoria'
//     const [iconoClave, setIconoClave] = useState("");
//     const [activo, setActivo] = useState(true); // O puedes usar un Switch para esto

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
//         if (!nombre || !tipoCategoria) {
//             Alert.alert("Campos requeridos", "Por favor, ingrese el nombre y el tipo de categoría.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearCategoria({
//                 Nombre: nombre,
//                 Descripcion: descripcion,
//                 Tipo_categoria: tipoCategoria, // Coincide con el nombre de campo en tu DB si es 'tipo_categoria'
//                 Icono_clave: iconoClave,
//                 Activo: activo,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Categoría creada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la categoría"));
//             }
//         } catch (error) {
//             console.error("Error al crear categoría:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la categoría."));
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
//                         <Text style={styles.title}>Nueva Categoría</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nombre de la Categoría"
//                             placeholderTextColor="#888"
//                             value={nombre}
//                             onChangeText={setNombre}
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
//                             placeholder="Tipo de Categoría (ej. Servicio, Producto)"
//                             placeholderTextColor="#888"
//                             value={tipoCategoria}
//                             onChangeText={setTipoCategoria}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Ícono Clave (ej. icono_estetica_corporal)"
//                             placeholderTextColor="#888"
//                             value={iconoClave}
//                             onChangeText={setIconoClave}
//                         />
//                         {/* Puedes añadir un Switch para 'activo' si lo deseas */}
//                         {/*
//                         <View style={styles.switchContainer}>
//                             <Text style={styles.switchLabel}>Activo:</Text>
//                             <Switch
//                                 onValueChange={setActivo}
//                                 value={activo}
//                             />
//                         </View>
//                         */}

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Categoría</Text>
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