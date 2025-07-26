// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import Ionicons from '@expo/vector-icons/Ionicons';
// import * as ImagePicker from 'expo-image-picker'; // Necesitas instalar esta librería: npx expo install expo-image-picker

// import { editarServicio } from "../../Src/Servicios/ServicioService"; // Asume que tienes este servicio
// import { listarCategorias } from "../../Src/Servicios/CategoriaService"; // Servicio para listar categorías
// import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService"; // Servicio para listar especialidades

// import styles from "../../Styles/EditarServicioStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarServicio({ navigation }) {
//     const route = useRoute();
//     const servicioInicial = route.params?.servicio;

//     const [nombre, setNombre] = useState(servicioInicial?.nombre || "");
//     const [descripcion, setDescripcion] = useState(servicioInicial?.descripcion || "");
//     const [imagenPath, setImagenPath] = useState(servicioInicial?.imagen_path || null); // Para guardar la URI de la imagen
//     const [precioBase, setPrecioBase] = useState(servicioInicial?.precio_base?.toString() || "");
//     const [duracionMinutos, setDuracionMinutos] = useState(servicioInicial?.duracion_minutos?.toString() || "");
//     const [categoriaId, setCategoriaId] = useState(servicioInicial?.categoria_id?.toString() || "");
//     const [especialidadRequeridaId, setEspecialidadRequeridaId] = useState(servicioInicial?.especialidad_requerida_id?.toString() || "");
//     const [activo, setActivo] = useState(servicioInicial?.activo ? "1" : "0");

//     const [categorias, setCategorias] = useState([]);
//     const [especialidades, setEspecialidades] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const esEdicion = !!servicioInicial;

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
//         const cargarDependencias = async () => {
//             setLoadingDependencies(true);
//             try {
//                 const [resCategorias, resEspecialidades] = await Promise.all([listarCategorias(), listarEspecialidades()]);

//                 if (resCategorias.success) {
//                     setCategorias(resCategorias.data);
//                     if (!esEdicion && resCategorias.data.length > 0) {
//                         setCategoriaId(resCategorias.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resCategorias.message || "No se pudieron cargar las categorías.");
//                 }

//                 if (resEspecialidades.success) {
//                     setEspecialidades(resEspecialidades.data);
//                     if (!esEdicion && resEspecialidades.data.length > 0) {
//                         setEspecialidadRequeridaId(resEspecialidades.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resEspecialidades.message || "No se pudieron cargar las especialidades.");
//                 }
//             } catch (error) {
//                 console.error("Error al cargar dependencias:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar las dependencias.");
//             } finally {
//                 setLoadingDependencies(false);
//             }
//         };
//         cargarDependencias();
//     }, [esEdicion]);

//     const pickImage = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert('Permiso requerido', 'Necesitamos acceso a la galería para seleccionar una imagen.');
//             return;
//         }

//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.canceled) {
//             setImagenPath(result.assets[0].uri);
//         }
//     };

//     const handleGuardar = async () => {
//         if (!nombre || !descripcion || !precioBase || !duracionMinutos || !categoriaId || !especialidadRequeridaId) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const formData = new FormData();
//             formData.append('nombre', nombre);
//             formData.append('descripcion', descripcion);
//             formData.append('precio_base', parseFloat(precioBase));
//             formData.append('duracion_minutos', parseInt(duracionMinutos));
//             formData.append('categoria_id', parseInt(categoriaId));
//             formData.append('especialidad_requerida_id', parseInt(especialidadRequeridaId));
//             formData.append('activo', activo === "1" ? true : false);

//             if (imagenPath && imagenPath.startsWith('file://')) {
//                 const filename = imagenPath.split('/').pop();
//                 const match = /\.(\w+)$/.exec(filename);
//                 const type = match ? `image/${match[1]}` : `image`;
//                 formData.append('imagen', { uri: imagenPath, name: filename, type });
//             } else if (imagenPath) {
//                 // Si ya es una URL de imagen existente y no se cambió, no se envía el archivo
//                 // Se podría enviar un campo 'imagen_path_existente' si la API lo requiere para indicar que no hubo cambio
//             }

//             result = await editarServicio(servicioInicial.id, formData);

//             if (result.success) {
//                 Alert.alert("Éxito", "Servicio actualizado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar el servicio"));
//             }
//         } catch (error) {
//             console.error("Error al guardar servicio:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el servicio."));
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
//                         <Text style={styles.title}>{esEdicion ? "Editar Servicio" : "Nuevo Servicio"}</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nombre del Servicio"
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

//                         <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
//                             <Ionicons name="image-outline" size={24} color="#1976D2" />
//                             <Text style={styles.imagePickerButtonText}>Seleccionar Imagen</Text>
//                         </TouchableOpacity>
//                         {imagenPath && (
//                             <Image source={{ uri: imagenPath }} style={styles.imagePreview} />
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Precio Base"
//                             placeholderTextColor="#888"
//                             value={precioBase}
//                             onChangeText={setPrecioBase}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Duración en Minutos"
//                             placeholderTextColor="#888"
//                             value={duracionMinutos}
//                             onChangeText={setDuracionMinutos}
//                             keyboardType="numeric"
//                         />

//                         {loadingDependencies ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabelActual}>Categoría:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={categoriaId}
//                                         onValueChange={(itemValue) => setCategoriaId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Categoría --" value="" />
//                                         {categorias.map((cat) => (
//                                             <Picker.Item key={cat.id.toString()} label={cat.nombre} value={cat.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabelActual}>Especialidad Requerida:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={especialidadRequeridaId}
//                                         onValueChange={(itemValue) => setEspecialidadRequeridaId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Especialidad --" value="" />
//                                         {especialidades.map((esp) => (
//                                             <Picker.Item key={esp.id.toString()} label={esp.nombre} value={esp.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

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

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingDependencies}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Servicio"}</Text>
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