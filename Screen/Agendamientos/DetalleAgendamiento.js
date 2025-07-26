// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetalleAgendamientoId } from "../../Src/Servicios/AgendamientoService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetalleAgendamientoStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetalleAgendamiento({ route, navigation }) {
//     const { agendamientoId } = route.params;

//     const [agendamiento, setAgendamiento] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetalleAgendamiento = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetalleAgendamientoId(agendamientoId); // Llama al servicio
//                 if (result.success) {
//                     setAgendamiento(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar el agendamiento.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de agendamiento:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar el agendamiento.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetalleAgendamiento();
//     }, [agendamientoId, navigation]);

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Agendamiento...</Text>
//             </View>
//         );
//     }

//     if (!agendamiento) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Agendamiento</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este agendamiento.</Text>
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
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Agendamiento</Text>

//             <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                 <Text style={[styles.agendamientoTitle, {color: '#2c3e50'}]}>Agendamiento #{agendamiento.id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Cliente ID: </Text>{agendamiento.cliente_usuario_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Personal ID: </Text>{agendamiento.personal_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Servicio ID: </Text>{agendamiento.servicio_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Sucursal ID: </Text>{agendamiento.sucursal_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Inicio: </Text>{agendamiento.fecha_hora_inicio}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Fin: </Text>{agendamiento.fecha_hora_fin}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Precio Final: </Text>${agendamiento.precio_final}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Estado: </Text>{agendamiento.estado}</Text>
//                 {agendamiento.notas_cliente && <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Notas Cliente: </Text>{agendamiento.notas_cliente}</Text>}
//                 {agendamiento.notas_internas && <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Notas Internas: </Text>{agendamiento.notas_internas}</Text>}
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{agendamiento.created_at}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{agendamiento.updated_at}</Text>
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