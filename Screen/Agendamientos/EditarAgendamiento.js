// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from '@react-native-community/datetimepicker'; // Necesitas instalar esta librería: npm install @react-native-community/datetimepicker

// import { editarAgendamiento } from "../../Src/Servicios/AgendamientoService"; // Asume que tienes este servicio
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService"; // Servicio para listar clientes/usuarios
// import { listarPersonal } from "../../Src/Servicios/PersonalService"; // Servicio para listar personal
// import { listarServicios } from "../../Src/Servicios/ServicioService"; // Servicio para listar servicios
// import { listarSucursales } from "../../Src/Servicios/SucursalService"; // Servicio para listar sucursales

// import Ionicons from '@expo/vector-icons/Ionicons';

// import styles from "../../Styles/EditarAgendamientoStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarAgendamiento({ navigation }) {
//     const route = useRoute();
//     const agendamientoInicial = route.params?.agendamiento;

//     const [clienteUsuarioId, setClienteUsuarioId] = useState(agendamientoInicial?.cliente_usuario_id?.toString() || "");
//     const [personalId, setPersonalId] = useState(agendamientoInicial?.personal_id?.toString() || "");
//     const [servicioId, setServicioId] = useState(agendamientoInicial?.servicio_id?.toString() || "");
//     const [sucursalId, setSucursalId] = useState(agendamientoInicial?.sucursal_id?.toString() || "");
//     const [fechaHoraInicio, setFechaHoraInicio] = useState(agendamientoInicial?.fecha_hora_inicio ? new Date(agendamientoInicial.fecha_hora_inicio) : new Date());
//     const [fechaHoraFin, setFechaHoraFin] = useState(agendamientoInicial?.fecha_hora_fin ? new Date(agendamientoInicial.fecha_hora_fin) : new Date());
//     const [precioFinal, setPrecioFinal] = useState(agendamientoInicial?.precio_final?.toString() || "");
//     const [estado, setEstado] = useState(agendamientoInicial?.estado || "");
//     const [notasCliente, setNotasCliente] = useState(agendamientoInicial?.notas_cliente || "");
//     const [notasInternas, setNotasInternas] = useState(agendamientoInicial?.notas_internas || "");

//     const [usuarios, setUsuarios] = useState([]);
//     const [personalList, setPersonalList] = useState([]);
//     const [servicios, setServicios] = useState([]);
//     const [sucursales, setSucursales] = useState([]);

//     const [loading, setLoading] = useState(false);
//     const [loadingDependencies, setLoadingDependencies] = useState(true);

//     const [showDatePickerInicio, setShowDatePickerInicio] = useState(false);
//     const [showTimePickerInicio, setShowTimePickerInicio] = useState(false);
//     const [showDatePickerFin, setShowDatePickerFin] = useState(false);
//     const [showTimePickerFin, setShowTimePickerFin] = useState(false);

//     const esEdicion = !!agendamientoInicial;

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
//                 const [usuariosRes, personalRes, serviciosRes, sucursalesRes] = await Promise.all([
//                     listarUsuarios(),
//                     listarPersonal(),
//                     listarServicios(),
//                     listarSucursales()
//                 ]);

//                 if (usuariosRes.success) setUsuarios(usuariosRes.data);
//                 else Alert.alert("Error", usuariosRes.message || "No se pudieron cargar los usuarios.");

//                 if (personalRes.success) setPersonalList(personalRes.data);
//                 else Alert.alert("Error", personalRes.message || "No se pudo cargar el personal.");

//                 if (serviciosRes.success) setServicios(serviciosRes.data);
//                 else Alert.alert("Error", serviciosRes.message || "No se pudieron cargar los servicios.");

//                 if (sucursalesRes.success) setSucursales(sucursalesRes.data);
//                 else Alert.alert("Error", sucursalesRes.message || "No se pudieron cargar las sucursales.");

//                 // Set initial values for Pickers if editing
//                 if (esEdicion) {
//                     if (agendamientoInicial?.cliente_usuario_id) setClienteUsuarioId(agendamientoInicial.cliente_usuario_id.toString());
//                     if (agendamientoInicial?.personal_id) setPersonalId(agendamientoInicial.personal_id.toString());
//                     if (agendamientoInicial?.servicio_id) setServicioId(agendamientoInicial.servicio_id.toString());
//                     if (agendamientoInicial?.sucursal_id) setSucursalId(agendamientoInicial.sucursal_id.toString());
//                     if (agendamientoInicial?.estado) setEstado(agendamientoInicial.estado);
//                 } else {
//                     // Set default values for new agendamiento
//                     if (usuariosRes.data.length > 0) setClienteUsuarioId(usuariosRes.data[0].id.toString());
//                     if (personalRes.data.length > 0) setPersonalId(personalRes.data[0].id.toString());
//                     if (serviciosRes.data.length > 0) setServicioId(serviciosRes.data[0].id.toString());
//                     if (sucursalesRes.data.length > 0) setSucursalId(sucursalesRes.data[0].id.toString());
//                     setEstado("Programado"); // O el estado por defecto que consideres
//                 }

//             } catch (error) {
//                 console.error("Error al cargar dependencias de agendamiento:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar las dependencias.");
//             } finally {
//                 setLoadingDependencies(false);
//             }
//         };
//         cargarDependencias();
//     }, [esEdicion, agendamientoInicial]);

//     const onDateChangeInicio = (event, selectedDate) => {
//         const currentDate = selectedDate || fechaHoraInicio;
//         setShowDatePickerInicio(Platform.OS === 'ios');
//         setFechaHoraInicio(currentDate);
//     };

//     const onTimeChangeInicio = (event, selectedTime) => {
//         const currentTime = selectedTime || fechaHoraInicio;
//         setShowTimePickerInicio(Platform.OS === 'ios');
//         setFechaHoraInicio(currentTime);
//     };

//     const onDateChangeFin = (event, selectedDate) => {
//         const currentDate = selectedDate || fechaHoraFin;
//         setShowDatePickerFin(Platform.OS === 'ios');
//         setFechaHoraFin(currentDate);
//     };

//     const onTimeChangeFin = (event, selectedTime) => {
//         const currentTime = selectedTime || fechaHoraFin;
//         setShowTimePickerFin(Platform.OS === 'ios');
//         setFechaHoraFin(currentTime);
//     };

//     const handleGuardar = async () => {
//         if (!clienteUsuarioId || !personalId || !servicioId || !sucursalId || !fechaHoraInicio || !fechaHoraFin || !precioFinal || !estado) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         const precioNumerico = parseFloat(precioFinal);
//         if (isNaN(precioNumerico) || precioNumerico < 0) {
//             Alert.alert("Formato de Precio", "Por favor, ingrese un precio final válido.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 cliente_usuario_id: parseInt(clienteUsuarioId),
//                 personal_id: parseInt(personalId),
//                 servicio_id: parseInt(servicioId),
//                 sucursal_id: parseInt(sucursalId),
//                 fecha_hora_inicio: fechaHoraInicio.toISOString(), // Formato ISO para la API
//                 fecha_hora_fin: fechaHoraFin.toISOString(),     // Formato ISO para la API
//                 precio_final: precioNumerico,
//                 estado: estado,
//                 notas_cliente: notasCliente,
//                 notas_internas: notasInternas,
//             };

//             result = await editarAgendamiento(agendamientoInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Agendamiento actualizado correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar el agendamiento"));
//             }
//         } catch (error) {
//             console.error("Error al guardar agendamiento:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el agendamiento."));
//         } finally {
//             setLoading(false);
//         }
//     };

//     const estadosAgendamiento = ["Programado", "Confirmado", "Cancelado por Cliente", "Realizado", "No Asistió", "En Proceso"]; // Define tus estados

//     return (
//         <KeyboardAvoidingView
//             style={styles.keyboardAvoidingView}
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <ScrollView contentContainerStyle={styles.scrollContainer}>
//                     <View style={styles.container}>
//                         <Text style={styles.title}>{esEdicion ? "Editar Agendamiento" : "Nuevo Agendamiento"}</Text>

//                         {loadingDependencies ? (
//                             <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
//                         ) : (
//                             <>
//                                 <Text style={styles.pickerLabelActual}>Cliente:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={clienteUsuarioId}
//                                         onValueChange={(itemValue) => setClienteUsuarioId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Cliente --" value="" />
//                                         {usuarios.map((user) => (
//                                             <Picker.Item key={user.id.toString()} label={user.nombre} value={user.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabelActual}>Personal Asignado:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={personalId}
//                                         onValueChange={(itemValue) => setPersonalId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Personal --" value="" />
//                                         {personalList.map((personal) => (
//                                             <Picker.Item key={personal.id.toString()} label={personal.tipo_personal} value={personal.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabelActual}>Servicio:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={servicioId}
//                                         onValueChange={(itemValue) => setServicioId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Servicio --" value="" />
//                                         {servicios.map((service) => (
//                                             <Picker.Item key={service.id.toString()} label={service.nombre} value={service.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>

//                                 <Text style={styles.pickerLabelActual}>Sucursal:</Text>
//                                 <View style={styles.pickerContainer}>
//                                     <Picker
//                                         selectedValue={sucursalId}
//                                         onValueChange={(itemValue) => setSucursalId(itemValue)}
//                                         style={styles.picker}
//                                         itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                                     >
//                                         <Picker.Item label="-- Seleccione Sucursal --" value="" />
//                                         {sucursales.map((sucursal) => (
//                                             <Picker.Item key={sucursal.id.toString()} label={sucursal.nombre} value={sucursal.id.toString()} />
//                                         ))}
//                                     </Picker>
//                                 </View>
//                             </>
//                         )}

//                         <Text style={styles.label}>Fecha y Hora de Inicio:</Text>
//                         <TouchableOpacity onPress={() => setShowDatePickerInicio(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>{fechaHoraInicio.toLocaleString()}</Text>
//                         </TouchableOpacity>
//                         {showDatePickerInicio && (
//                             <DateTimePicker
//                                 testID="dateTimePickerInicio"
//                                 value={fechaHoraInicio}
//                                 mode="date"
//                                 display="default"
//                                 onChange={onDateChangeInicio}
//                             />
//                         )}
//                         {showTimePickerInicio && (
//                             <DateTimePicker
//                                 testID="timePickerInicio"
//                                 value={fechaHoraInicio}
//                                 mode="time"
//                                 display="default"
//                                 onChange={onTimeChangeInicio}
//                             />
//                         )}
//                          <TouchableOpacity onPress={() => setShowTimePickerInicio(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>Seleccionar Hora de Inicio</Text>
//                         </TouchableOpacity>


//                         <Text style={styles.label}>Fecha y Hora de Fin:</Text>
//                         <TouchableOpacity onPress={() => setShowDatePickerFin(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>{fechaHoraFin.toLocaleString()}</Text>
//                         </TouchableOpacity>
//                         {showDatePickerFin && (
//                             <DateTimePicker
//                                 testID="dateTimePickerFin"
//                                 value={fechaHoraFin}
//                                 mode="date"
//                                 display="default"
//                                 onChange={onDateChangeFin}
//                             />
//                         )}
//                         {showTimePickerFin && (
//                             <DateTimePicker
//                                 testID="timePickerFin"
//                                 value={fechaHoraFin}
//                                 mode="time"
//                                 display="default"
//                                 onChange={onTimeChangeFin}
//                             />
//                         )}
//                          <TouchableOpacity onPress={() => setShowTimePickerFin(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>Seleccionar Hora de Fin</Text>
//                         </TouchableOpacity>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Precio Final"
//                             placeholderTextColor="#888"
//                             value={precioFinal}
//                             onChangeText={setPrecioFinal}
//                             keyboardType="numeric"
//                         />

//                         <Text style={styles.pickerLabelActual}>Estado:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={estado}
//                                 onValueChange={(itemValue) => setEstado(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione Estado --" value="" />
//                                 {estadosAgendamiento.map((est) => (
//                                     <Picker.Item key={est} label={est} value={est} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <TextInput
//                             style={[styles.input, styles.multilineInput]}
//                             placeholder="Notas del Cliente"
//                             placeholderTextColor="#888"
//                             value={notasCliente}
//                             onChangeText={setNotasCliente}
//                             multiline
//                             numberOfLines={4}
//                         />

//                         <TextInput
//                             style={[styles.input, styles.multilineInput]}
//                             placeholder="Notas Internas"
//                             placeholderTextColor="#888"
//                             value={notasInternas}
//                             onChangeText={setNotasInternas}
//                             multiline
//                             numberOfLines={4}
//                         />

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingDependencies}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Agendamiento"}</Text>
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