// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from "@react-native-picker/picker";
// import { crearUsuario } from "../../Src/Servicios/UsuarioService"; // Asume que tienes este servicio
// import { listarMusicaPreferenciasNavegacion } from "../../Src/Servicios/MusicaPreferenciaNavegacionService"; // Asume que tienes este servicio
// import { listarSucursales } from "../../Src/Servicios/SucursalService"; // Ya tenemos este servicio
// import styles from "../../Styles/AgregarUsuarioStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarUsuario({ navigation }) {
//     const [nombre, setNombre] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [imagenPath, setImagenPath] = useState("");
//     const [telefono, setTelefono] = useState("");
//     const [rol, setRol] = useState("cliente"); // Rol por defecto
//     const [activo, setActivo] = useState(true);
//     const [musicaPreferenciaNavegacionId, setMusicaPreferenciaNavegacionId] = useState("");
//     const [sucursalPreferidaId, setSucursalPreferidaId] = useState("");

//     const [musicaPreferencias, setMusicaPreferencias] = useState([]);
//     const [sucursales, setSucursales] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingData, setLoadingData] = useState(true);

//     const roles = [
//         { label: "Cliente", value: "cliente" },
//         { label: "Empleado", value: "empleado" },
//         { label: "Administrador", value: "administrador" },
//     ];

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
//         const cargarDatosIniciales = async () => {
//             setLoadingData(true);
//             try {
//                 const [resultMusica, resultSucursales] = await Promise.all([
//                     listarMusicaPreferenciasNavegacion(),
//                     listarSucursales(),
//                 ]);

//                 if (resultMusica.success) {
//                     setMusicaPreferencias(resultMusica.data);
//                 } else {
//                     Alert.alert("Error al cargar preferencias de música", resultMusica.message || "No se pudieron cargar las preferencias de música.");
//                 }

//                 if (resultSucursales.success) {
//                     setSucursales(resultSucursales.data);
//                 } else {
//                     Alert.alert("Error al cargar sucursales", resultSucursales.message || "No se pudieron cargar las sucursales.");
//                 }

//             } catch (error) {
//                 console.error("Error al cargar datos iniciales:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos iniciales.");
//             } finally {
//                 setLoadingData(false);
//             }
//         };
//         cargarDatosIniciales();
//     }, []);

//     const handleGuardar = async () => {
//         if (!nombre || !email || !password || !telefono || !rol) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios: Nombre, Email, Contraseña, Teléfono y Rol.");
//             return;
//         }

//         if (!email.includes("@") || !email.includes(".")) {
//             Alert.alert("Email inválido", "Por favor, ingrese un formato de email válido.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearUsuario({
//                 nombre: nombre,
//                 email: email,
//                 password: password, // En un entorno real, la contraseña debe ser hasheada en el backend
//                 imagen_path: imagenPath,
//                 telefono: telefono,
//                 rol: rol,
//                 activo: activo,
//                 musica_preferencia_navegacion_id: musicaPreferenciaNavegacionId ? parseInt(musicaPreferenciaNavegacionId) : null,
//                 sucursal_preferida_id: sucursalPreferidaId ? parseInt(sucursalPreferidaId) : null,
//                 email_verified_at: null, // Se puede dejar null o establecer al momento de verificación
//                 remember_token: null, // Se gestiona en el backend
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Usuario creado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el usuario"));
//             }
//         } catch (error) {
//             console.error("Error al crear usuario:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el usuario."));
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
//                         <Text style={styles.title}>Nuevo Usuario</Text>

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
//                             placeholder="Contraseña"
//                             placeholderTextColor="#888"
//                             value={password}
//                             onChangeText={setPassword}
//                             secureTextEntry
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
//                             placeholder="Teléfono"
//                             placeholderTextColor="#888"
//                             value={telefono}
//                             onChangeText={setTelefono}
//                             keyboardType="phone-pad"
//                         />

//                         <Text style={styles.pickerLabel}>Rol:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={rol}
//                                 onValueChange={(itemValue) => setRol(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 {roles.map((r) => (
//                                     <Picker.Item key={r.value} label={r.label} value={r.value} />
//                                 ))}
//                             </Picker>
//                         </View>
                        
//                         <View style={styles.switchContainer}>
//                             <Text style={styles.switchLabel}>Activo:</Text>
//                             <Switch
//                                 onValueChange={setActivo}
//                                 value={activo}
//                             />
//                         </View>

//                         {loadingData ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabel}>Preferencia de Música (Opcional):</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={musicaPreferenciaNavegacionId}
//                                         onValueChange={(itemValue) => setMusicaPreferenciaNavegacionId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione una Preferencia --" value="" />
//                                         {musicaPreferencias.map((pref) => (
//                                             <Picker.Item key={pref.id.toString()} label={pref.nombre} value={pref.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabel}>Sucursal Preferida (Opcional):</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={sucursalPreferidaId}
//                                         onValueChange={(itemValue) => setSucursalPreferidaId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione una Sucursal --" value="" />
//                                         {sucursales.map((suc) => (
//                                             <Picker.Item key={suc.id.toString()} label={suc.nombre} value={suc.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Usuario</Text>
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