// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetalleExcepcionHorarioSucursalId } from "../../Src/Servicios/ExcepcionHorarioSucursalService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetalleExcepcionHorarioSucursalStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetalleExcepcionHorarioSucursal({ route, navigation }) {
//     const { excepcionId } = route.params;

//     const [excepcion, setExcepcion] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetalleExcepcion = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetalleExcepcionHorarioSucursalId(excepcionId); // Llama al servicio
//                 if (result.success) {
//                     setExcepcion(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar la excepción de horario.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de excepción de horario:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar la excepción de horario.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetalleExcepcion();
//     }, [excepcionId, navigation]);

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Excepción de Horario...</Text>
//             </View>
//         );
//     }

//     if (!excepcion) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Excepción de Horario</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para esta excepción de horario.</Text>
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

//     return (
//         <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Excepción de Horario</Text>

//             <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                 <Text style={[styles.excepcionTitle, {color: '#2c3e50'}]}>Excepción #{excepcion.id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID Sucursal: </Text>{excepcion.sucursal_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Fecha: </Text>{excepcion.fecha}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Está Cerrado: </Text>{excepcion.esta_cerrado ? 'Sí' : 'No'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Hora Apertura: </Text>{excepcion.hora_apertura}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Hora Cierre: </Text>{excepcion.hora_cierre}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Descripción: </Text>{excepcion.descripcion || 'N/A'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{excepcion.created_at}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{excepcion.updated_at}</Text>
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