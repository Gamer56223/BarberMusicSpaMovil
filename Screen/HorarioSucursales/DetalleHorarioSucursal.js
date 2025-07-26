// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetalleHorarioSucursalId } from "../../Src/Servicios/HorarioSucursalService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetalleHorarioSucursalStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetalleHorarioSucursal({ route, navigation }) {
//     const { horarioId } = route.params;

//     const [horario, setHorario] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetalleHorario = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetalleHorarioSucursalId(horarioId); // Llama al servicio
//                 if (result.success) {
//                     setHorario(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar el horario de sucursal.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de horario de sucursal:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar el horario de sucursal.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetalleHorario();
//     }, [horarioId, navigation]);

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Horario de Sucursal...</Text>
//             </View>
//         );
//     }

//     if (!horario) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Horario de Sucursal</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este horario.</Text>
//                     <BotonComponent
//                         title="Volver al Listado"
//                         onPress={() => navigation.goBack()}
//                         buttonStyle={styles.backButton}
//                         textStyle={styles.buttonText}
//                     />
//                 </View>
//             </SafeAreaView>
//         );
//     }

//     // Mapeo de números de día a nombres
//     const diasSemana = {
//         0: 'Domingo',
//         1: 'Lunes',
//         2: 'Martes',
//         3: 'Miércoles',
//         4: 'Jueves',
//         5: 'Viernes',
//         6: 'Sábado',
//     };

//     return (
//         <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Horario de Sucursal</Text>

//             <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                 <Text style={[styles.horarioTitle, {color: '#2c3e50'}]}>Horario #{horario.id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID Sucursal: </Text>{horario.sucursal_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Día de la Semana: </Text>{diasSemana[horario.dia_semana] || horario.dia_semana}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Hora Apertura: </Text>{horario.hora_apertura}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Hora Cierre: </Text>{horario.hora_cierre}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Cerrado Regularmente: </Text>{horario.esta_cerrado_regularmente ? 'Sí' : 'No'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{horario.created_at}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{horario.updated_at}</Text>
//             </View>

//             <BotonComponent
//                 title="Volver al Listado"
//                 onPress={() => navigation.goBack()}
//                 buttonStyle={styles.backButton}
//                 textStyle={styles.buttonText}
//             />
//         </SafeAreaView>
//     );
// }