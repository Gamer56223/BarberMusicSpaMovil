// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetalleDetalleOrdenId } from "../../Src/Servicios/DetalleOrdenService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetalleDetalleOrdenStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetalleDetalleOrden({ route, navigation }) {
//     const { detalleOrdenId } = route.params;

//     const [detalleOrden, setDetalleOrden] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetalleOrden = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetalleDetalleOrdenId(detalleOrdenId); // Llama al servicio
//                 if (result.success) {
//                     setDetalleOrden(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar el detalle de la orden.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de orden:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar el detalle de la orden.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetalleOrden();
//     }, [detalleOrdenId, navigation]);

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Orden...</Text>
//             </View>
//         );
//     }

//     if (!detalleOrden) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Orden</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para esta orden.</Text>
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
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Orden</Text>

//             <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                 <Text style={[styles.detalleOrdenTitle, {color: '#2c3e50'}]}>Detalle de Orden #{detalleOrden.id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID de Orden: </Text>{detalleOrden.orden_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID de Producto: </Text>{detalleOrden.producto_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Producto: </Text>{detalleOrden.nombre_producto_historico}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Cantidad: </Text>{detalleOrden.cantidad}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Precio Unitario: </Text>${detalleOrden.precio_unitario_historico}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Subtotal Línea: </Text>${detalleOrden.subtotal_linea}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{detalleOrden.created_at}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{detalleOrden.updated_at}</Text>
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