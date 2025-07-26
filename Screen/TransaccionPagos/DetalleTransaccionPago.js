// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, ScrollView } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetalleTransaccionPagoId } from "../../Src/Servicios/TransaccionPagoService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetalleTransaccionPagoStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetalleTransaccionPago({ route, navigation }) {
//     const { transaccionId } = route.params;

//     const [transaccion, setTransaccion] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetalleTransaccionPago = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetalleTransaccionPagoId(transaccionId); // Llama al servicio
//                 if (result.success) {
//                     setTransaccion(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar la transacción de pago.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de transacción de pago:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar la transacción de pago.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetalleTransaccionPago();
//     }, [transaccionId, navigation]);

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Transacción de Pago...</Text>
//             </View>
//         );
//     }

//     if (!transaccion) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Transacción de Pago</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para esta transacción de pago.</Text>
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
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Transacción de Pago</Text>

//             <ScrollView contentContainerStyle={styles.scrollViewContent}>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.transaccionTitle, {color: '#2c3e50'}]}>Transacción ID: {transaccion.id}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID Orden: </Text>{transaccion.orden_id || 'N/A'}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID Agendamiento: </Text>{transaccion.agendamiento_id || 'N/A'}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID Cliente Usuario: </Text>{transaccion.cliente_usuario_id}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Monto: </Text>{transaccion.monto} {transaccion.moneda}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Método de Pago: </Text>{transaccion.metodo_pago}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Tipo de Pago: </Text>{transaccion.tipo_pago}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID Transacción Pasarela: </Text>{transaccion.id_transaccion_pasarela}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Estado de Pago: </Text>{transaccion.estado_pago}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Fecha Transacción: </Text>{transaccion.fecha_transaccion}</Text>
                    
//                     {transaccion.datos_pasarela_request && (
//                         <View>
//                             <Text style={[styles.detailLabel, {color: '#2c3e50', marginTop: 10}]}>Datos Pasarela (Request):</Text>
//                             <Text style={[styles.detailText, {color: '#5C6F7F'}]}>{JSON.stringify(transaccion.datos_pasarela_request, null, 2)}</Text>
//                         </View>
//                     )}
//                     {transaccion.datos_pasarela_response && (
//                         <View>
//                             <Text style={[styles.detailLabel, {color: '#2c3e50', marginTop: 10}]}>Datos Pasarela (Response):</Text>
//                             <Text style={[styles.detailText, {color: '#5C6F7F'}]}>{JSON.stringify(transaccion.datos_pasarela_response, null, 2)}</Text>
//                         </View>
//                     )}

//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{transaccion.created_at}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{transaccion.updated_at}</Text>
//                 </View>
//             </ScrollView>

//             <BotonComponent
//                 title="Volver al Listado"
//                 onPress={() => navigation.goBack()}
//                 buttonStyle={styles.backButton}
//                 textStyle={styles.buttonText}
//             />
//         </SafeAreaView>
//     );
// }