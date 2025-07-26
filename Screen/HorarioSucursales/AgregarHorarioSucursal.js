// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from "@react-native-picker/picker";
// import { crearHorarioSucursal } from "../../Src/Servicios/HorarioSucursalService"; // Asume que tienes este servicio
// import { listarSucursales } from "../../Src/Servicios/SucursalService"; // Ya tenemos este servicio
// import styles from "../../Styles/AgregarHorarioSucursalStyles"; // Asume que tienes un archivo de estilos similar

// export default function AgregarHorarioSucursal({ navigation }) {
//     const [sucursalId, setSucursalId] = useState("");
//     const [diaSemana, setDiaSemana] = useState("");
//     const [horaApertura, setHoraApertura] = useState(""); // Formato 'HH:MM:SS'
//     const [horaCierre, setHoraCierre] = useState("");     // Formato 'HH:MM:SS'
//     const [estaCerradoRegularmente, setEstaCerradoRegularmente] = useState(false);

//     const [sucursales, setSucursales] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingData, setLoadingData] = useState(true);

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
//         const cargarSucursales = async () => {
//             setLoadingData(true);
//             try {
//                 const result = await listarSucursales();
//                 if (result.success) {
//                     setSucursales(result.data);
//                     if (result.data.length > 0) {
//                         setSucursalId(result.data[0].id.toString());
//                     } else {
//                         setSucursalId("");
//                     }
//                 } else {
//                     Alert.alert(
//                         "Error al cargar sucursales",
//                         result.message || "No se pudieron cargar las sucursales."
//                     );
//                 }
//             } catch (error) {
//                 console.error("Error al cargar sucursales:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar las sucursales.");
//             } finally {
//                 setLoadingData(false);
//             }
//         };
//         cargarSucursales();
//     }, []);

//     const handleGuardar = async () => {
//         if (!sucursalId || diaSemana === "") {
//             Alert.alert("Campos requeridos", "Por favor, seleccione una sucursal y un día de la semana.");
//             return;
//         }

//         if (!estaCerradoRegularmente && (!horaApertura || !horaCierre)) {
//             Alert.alert("Horario requerido", "Si la sucursal no está cerrada regularmente, por favor, ingrese la hora de apertura y cierre.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await crearHorarioSucursal({
//                 sucursal_id: parseInt(sucursalId),
//                 dia_semana: parseInt(diaSemana),
//                 hora_apertura: estaCerradoRegularmente ? null : horaApertura,
//                 hora_cierre: estaCerradoRegularmente ? null : horaCierre,
//                 esta_cerrado_regularmente: estaCerradoRegularmente,
//             });

//             if (result.success) {
//                 Alert.alert("Éxito", "Horario de sucursal creado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el horario de sucursal"));
//             }
//         } catch (error) {
//             console.error("Error al crear horario de sucursal:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el horario de sucursal."));
//         } finally {
//             setLoading(false);
//         }
//     };

//     const diasDeLaSemana = [
//         { label: "Domingo", value: "0" },
//         { label: "Lunes", value: "1" },
//         { label: "Martes", value: "2" },
//         { label: "Miércoles", value: "3" },
//         { label: "Jueves", value: "4" },
//         { label: "Viernes", value: "5" },
//         { label: "Sábado", value: "6" },
//     ];

//     return (
//         <KeyboardAvoidingView
//             style={styles.keyboardAvoidingView}
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <ScrollView contentContainerStyle={styles.scrollContainer}>
//                     <View style={styles.container}>
//                         <Text style={styles.title}>Nuevo Horario de Sucursal</Text>

//                         {loadingData ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabel}>Sucursal:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={sucursalId}
//                                         onValueChange={(itemValue) => setSucursalId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione una Sucursal --" value="" />
//                                         {sucursales.map((suc) => (
//                                             <Picker.Item key={suc.id.toString()} label={suc.nombre} value={suc.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabel}>Día de la Semana:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={diaSemana}
//                                         onValueChange={(itemValue) => setDiaSemana(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione un Día --" value="" />
//                                         {diasDeLaSemana.map((dia) => (
//                                             <Picker.Item key={dia.value} label={dia.label} value={dia.value} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <View style={styles.switchContainer}>
//                             <Text style={styles.switchLabel}>¿Cerrado Regularmente Todo el Día?</Text>
//                             <Switch
//                                 onValueChange={setEstaCerradoRegularmente}
//                                 value={estaCerradoRegularmente}
//                             />
//                         </View>

//                         {!estaCerradoRegularmente && (
//                             <>
//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder="Hora de Apertura (HH:MM:SS)"
//                                     placeholderTextColor="#888"
//                                     value={horaApertura}
//                                     onChangeText={setHoraApertura}
//                                 />
//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder="Hora de Cierre (HH:MM:SS)"
//                                     placeholderTextColor="#888"
//                                     value={horaCierre}
//                                     onChangeText={setHoraCierre}
//                                 />
//                             </>
//                         )}

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>Crear Horario</Text>
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