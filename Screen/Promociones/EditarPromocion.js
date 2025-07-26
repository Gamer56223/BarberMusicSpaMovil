// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Ionicons from '@expo/vector-icons/Ionicons';

// import { editarPromocion } from "../../Src/Servicios/PromocionService"; // Asume que tienes este servicio

// import styles from "../../Styles/EditarPromocionStyles"; // Asume que tienes un archivo de estilos similar

// export default function EditarPromocion({ navigation }) {
//     const route = useRoute();
//     const promocionInicial = route.params?.promocion;

//     const [codigo, setCodigo] = useState(promocionInicial?.codigo || "");
//     const [nombre, setNombre] = useState(promocionInicial?.nombre || "");
//     const [descripcion, setDescripcion] = useState(promocionInicial?.descripcion || "");
//     const [tipoDescuento, setTipoDescuento] = useState(promocionInicial?.tipo_descuento || "");
//     const [valorDescuento, setValorDescuento] = useState(promocionInicial?.valor_descuento?.toString() || "");
//     const [fechaInicio, setFechaInicio] = useState(promocionInicial?.fecha_inicio ? new Date(promocionInicial.fecha_inicio) : new Date());
//     const [fechaFin, setFechaFin] = useState(promocionInicial?.fecha_fin ? new Date(promocionInicial.fecha_fin) : new Date());
//     const [usosMaximosTotal, setUsosMaximosTotal] = useState(promocionInicial?.usos_maximos_total?.toString() || "");
//     const [usosMaximosPorCliente, setUsosMaximosPorCliente] = useState(promocionInicial?.usos_maximos_por_cliente?.toString() || "");
//     const [aplicaATodosProductos, setAplicaATodosProductos] = useState(promocionInicial?.aplica_a_todos_productos ? "1" : "0");
//     const [aplicaATodosServicios, setAplicaATodosServicios] = useState(promocionInicial?.aplica_a_todos_servicios ? "1" : "0");
//     const [activo, setActivo] = useState(promocionInicial?.activo ? "1" : "0");

//     const [loading, setLoading] = useState(false);

//     const [showFechaInicioPicker, setShowFechaInicioPicker] = useState(false);
//     const [showFechaFinPicker, setShowFechaFinPicker] = useState(false);

//     const esEdicion = !!promocionInicial;

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

//     const onFechaInicioChange = (event, selectedDate) => {
//         const currentDate = selectedDate || fechaInicio;
//         setShowFechaInicioPicker(Platform.OS === 'ios');
//         setFechaInicio(currentDate);
//     };

//     const onFechaFinChange = (event, selectedDate) => {
//         const currentDate = selectedDate || fechaFin;
//         setShowFechaFinPicker(Platform.OS === 'ios');
//         setFechaFin(currentDate);
//     };

//     const tiposDescuento = [
//         { label: "Porcentaje", value: "PORCENTAJE" },
//         { label: "Monto Fijo", value: "MONTO_FIJO" },
//     ];

//     const handleGuardar = async () => {
//         if (!codigo || !nombre || !tipoDescuento || !valorDescuento || !fechaInicio || !fechaFin || !usosMaximosTotal || !usosMaximosPorCliente) {
//             Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
//             return;
//         }

//         setLoading(true);
//         let result;
//         try {
//             const dataToSave = {
//                 codigo: codigo,
//                 nombre: nombre,
//                 descripcion: descripcion,
//                 tipo_descuento: tipoDescuento,
//                 valor_descuento: parseFloat(valorDescuento),
//                 fecha_inicio: fechaInicio.toISOString().split('T')[0], // Formato YYYY-MM-DD
//                 fecha_fin: fechaFin.toISOString().split('T')[0], // Formato YYYY-MM-DD
//                 usos_maximos_total: parseInt(usosMaximosTotal),
//                 usos_maximos_por_cliente: parseInt(usosMaximosPorCliente),
//                 aplica_a_todos_productos: aplicaATodosProductos === "1" ? true : false,
//                 aplica_a_todos_servicios: aplicaATodosServicios === "1" ? true : false,
//                 activo: activo === "1" ? true : false,
//             };

//             result = await editarPromocion(promocionInicial.id, dataToSave);

//             if (result.success) {
//                 Alert.alert("Éxito", "Promoción actualizada correctamente");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la promoción"));
//             }
//         } catch (error) {
//             console.error("Error al guardar promoción:", error);
//             Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la promoción."));
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
//                         <Text style={styles.title}>{esEdicion ? "Editar Promoción" : "Nueva Promoción"}</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Código de Promoción"
//                             placeholderTextColor="#888"
//                             value={codigo}
//                             onChangeText={setCodigo}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nombre de la Promoción"
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

//                         <Text style={styles.pickerLabelActual}>Tipo de Descuento:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={tipoDescuento}
//                                 onValueChange={(itemValue) => setTipoDescuento(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="-- Seleccione Tipo --" value="" />
//                                 {tiposDescuento.map((tipo) => (
//                                     <Picker.Item key={tipo.value} label={tipo.label} value={tipo.value} />
//                                 ))}
//                             </Picker>
//                         </View>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Valor del Descuento"
//                             placeholderTextColor="#888"
//                             value={valorDescuento}
//                             onChangeText={setValorDescuento}
//                             keyboardType="numeric"
//                         />

//                         <Text style={styles.label}>Fecha de Inicio:</Text>
//                         <TouchableOpacity onPress={() => setShowFechaInicioPicker(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>{fechaInicio.toLocaleDateString()}</Text>
//                         </TouchableOpacity>
//                         {showFechaInicioPicker && (
//                             <DateTimePicker
//                                 testID="fechaInicioPicker"
//                                 value={fechaInicio}
//                                 mode="date"
//                                 display="default"
//                                 onChange={onFechaInicioChange}
//                             />
//                         )}

//                         <Text style={styles.label}>Fecha de Fin:</Text>
//                         <TouchableOpacity onPress={() => setShowFechaFinPicker(true)} style={styles.datePickerButton}>
//                             <Text style={styles.datePickerButtonText}>{fechaFin.toLocaleDateString()}</Text>
//                         </TouchableOpacity>
//                         {showFechaFinPicker && (
//                             <DateTimePicker
//                                 testID="fechaFinPicker"
//                                 value={fechaFin}
//                                 mode="date"
//                                 display="default"
//                                 onChange={onFechaFinChange}
//                             />
//                         )}

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Usos Máximos Totales"
//                             placeholderTextColor="#888"
//                             value={usosMaximosTotal}
//                             onChangeText={setUsosMaximosTotal}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Usos Máximos por Cliente"
//                             placeholderTextColor="#888"
//                             value={usosMaximosPorCliente}
//                             onChangeText={setUsosMaximosPorCliente}
//                             keyboardType="numeric"
//                         />

//                         <Text style={styles.pickerLabelActual}>Aplica a todos los Productos:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={aplicaATodosProductos}
//                                 onValueChange={(itemValue) => setAplicaATodosProductos(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="Sí" value="1" />
//                                 <Picker.Item label="No" value="0" />
//                             </Picker>
//                         </View>

//                         <Text style={styles.pickerLabelActual}>Aplica a todos los Servicios:</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={aplicaATodosServicios}
//                                 onValueChange={(itemValue) => setAplicaATodosServicios(itemValue)}
//                                 style={styles.picker}
//                                 itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
//                             >
//                                 <Picker.Item label="Sí" value="1" />
//                                 <Picker.Item label="No" value="0" />
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

//                         <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
//                             {loading ? (
//                                 <ActivityIndicator color="#fff" />
//                             ) : (
//                                 <View style={styles.botonContent}>
//                                     <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
//                                     <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Promoción"}</Text>
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