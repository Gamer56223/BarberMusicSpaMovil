// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import Ionicons from '@expo/vector-icons/Ionicons';
// import * as ImagePicker from 'expo-image-picker'; // Necesitas instalar esta librería: npx expo install expo-image-picker

// import { editarUsuario } from "../../Src/Servicios/UsuarioService"; // Asume que tienes este servicio
// import { listarPreferenciasMusicales } from "../../Src/Servicios/MusicaPreferenciaService"; // Servicio para listar preferencias musicales
// import { listarSucursales } from "../../Src/Servicios/SucursalService"; // Servicio para listar sucursales

// import styles from "../../Styles/EditarUsuarioStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarUsuario({ navigation }) {
//     const route = useRoute();
//     const usuarioInicial = route.params?.usuario;

//     const [nombre, setNombre] = useState(usuarioInicial?.nombre || "");
//     const [email, setEmail] = useState(usuarioInicial?.email || "");
//     const [password, setPassword] = useState(""); // No se precarga la contraseña por seguridad
//     const [imagenPath, setImagenPath] = useState(usuarioInicial?.imagen_path || null);
//     const [telefono, setTelefono] = useState(usuarioInicial?.telefono || "");
//     const [rol, setRol] = useState(usuarioInicial?.rol || "");
//     const [activo, setActivo] = useState(usuarioInicial?.activo ? "1" : "0");
//     const [musicaPreferenciaNavegacionId, setMusicaPreferenciaNavegacionId] = useState(usuarioInicial?.musica_preferencia_navegacion_id?.toString() || "");
//     const [sucursalPreferidaId, setSucursalPreferidaId] = useState(usuarioInicial?.sucursal_preferida_id?.toString() || "");

//     const [preferenciasMusicales, setPreferenciasMusicales] = useState([]);
//     const [sucursales, setSucursales] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const esEdicion = !!usuarioInicial;

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
//                 const [resMusica, resSucursales] = await Promise.all([listarPreferenciasMusicales(), listarSucursales()]);

//                 if (resMusica.success) {
//                     setPreferenciasMusicales(resMusica.data);
//                     if (!esEdicion && resMusica.data.length > 0) {
//                         setMusicaPreferenciaNavegacionId(resMusica.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resMusica.message || "No se pudieron cargar las preferencias musicales.");
//                 }

//                 if (resSucursales.success) {
//                     setSucursales(resSucursales.data);
//                     if (!esEdicion && resSucursales.data.length > 0) {
//                         setSucursalPreferidaId(resSucursales.data[0].id.toString());
//                     }
//                 } else {
//                     Alert.alert("Error", resSucursales.message || "No se pudieron cargar las sucursales.");
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
//             aspect: [1, 1], // Aspecto cuadrado para fotos de perfil
//             quality: 1,
//         });

//         if (!result.canceled) {
//             setImagenPath(result.assets[0].uri);
//         }
//     };

//     const handleGuardar = async () => {
//         if (!nombre || !email || !telefono || !rol || !musicaPreferenciaNavegacionId || !sucursalPreferidaId) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }
//         if (!esEdicion && !password) {
//             Alert.alert("Contraseña requerida", "Por favor, ingrese una contraseña para el nuevo usuario.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const formData = new FormData();
//             formData.append('nombre', nombre);
//             formData.append('email', email);
//             if (password) { // Solo enviar contraseña si se modificó o si es un nuevo usuario
//                 formData.append('password', password);
//             }
//             formData.append('telefono', telefono);
//             formData.append('rol', rol);
//             formData.append('activo', activo === "1" ? true : false);
//             formData.append('musica_preferencia_navegacion_id', parseInt(musicaPreferenciaNavegacionId));
//             formData.append('sucursal_preferida_id', parseInt(sucursalPreferidaId));

//             if (imagenPath && imagenPath.startsWith('file://')) {
//                 const filename = imagenPath.split('/').pop();
//                 const match = /\.(\w+)$/.exec(filename);
//                 const type = match ? `image/${match[1]}` : `image`;
//                 formData.append('imagen', { uri: imagenPath, name: filename, type });
//             } else if (imagenPath) {
//                 // Si ya es una URL de imagen existente y no se cambió, no se envía el archivo
//             }

//             // Si es edición, se usa el ID del usuario inicial. Si es nuevo, el ID será generado por la API.
//             result = await editarUsuario(esEdicion ? usuarioInicial.id : null, formData, esEdicion);

//             if (result.success) {
//                 Alert.alert("Éxito", `Usuario ${esEdicion ? "actualizado" : "creado"} correctamente`);
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, `No se pudo ${esEdicion ? "actualizar" : "crear"} el usuario`));
//             }
//         } catch (error) {
//             console.error("Error al guardar usuario:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el usuario."));
//         } finally {
//             setLoading(false);
//         }
//     };

//     const roles = ["CLIENTE", "EMPLEADO", "SUPER_ADMIN"]; // Roles definidos en la base de datos

//     return (
//         <KeyboardAvoidingView
//             style={styles.keyboardAvoidingView}
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <ScrollView contentContainerStyle={styles.scrollContainer}>
//                     <View style={styles.container}>
//                         <Text style={styles.title}>{esEdicion ? "Editar Usuario" : "Nuevo Usuario"}</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nombre Completo"
//                             placeholderTextColor="#888"
//                             value={nombre}
//                             onChangeText={setNombre}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Email"
//                             placeholderTextColor="#888"
//                             value={email}
//                             onChangeText={setEmail}
//                             keyboardType="email-address"
//                             autoCapitalize="none"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder={esEdicion ? "Nueva Contraseña (dejar vacío para no cambiar)" : "Contraseña"}
//                             placeholderTextColor="#888"
//                             value={password}
//                             onChangeText={setPassword}
//                             secureTextEntry
//                         />

//                         <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
//                             <Ionicons name="image-outline" size={24} color="#1976D2" />
//                             <Text style={styles.imagePickerButtonText}>Seleccionar Imagen de Perfil</Text>
//                         </TouchableOpacity>
//                         {imagenPath && (
//                             <Image source={{ uri: imagenPath }} style={styles.imagePreview} />
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Teléfono"
//                             placeholderTextColor="#888"
//                             value={telefono}
//                             onChangeText={setTelefono}
//                             keyboardType="phone-pad"
//                         />

//                         <Text style={styles.pickerLabelActual}>Rol:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={rol}
//                                 onValueChange={(itemValue) => setRol(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione Rol --" value="" />
//                                 {roles.map((r) => (
//                                     <Picker.Item key={r} label={r.replace(/_/g, ' ')} value={r} />
//                                 ))}
//                             </Picker>
//                         </View>

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

//                         {loadingDependencies ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabelActual}>Preferencia Musical para Navegación:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={musicaPreferenciaNavegacionId}
//                                         onValueChange={(itemValue) => setMusicaPreferenciaNavegacionId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Preferencia Musical --" value="" />
//                                         {preferenciasMusicales.map((pref) => (
//                                             <Picker.Item key={pref.id.toString()} label={pref.nombre_opcion} value={pref.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabelActual}>Sucursal Preferida:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={sucursalPreferidaId}
//                                         onValueChange={(itemValue) => setSucursalPreferidaId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Sucursal Preferida --" value="" />
//                                         {sucursales.map((sucursal) => (
//                                             <Picker.Item key={sucursal.id.toString()} label={sucursal.nombre} value={sucursal.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingDependencies}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Usuario"}</Text>
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