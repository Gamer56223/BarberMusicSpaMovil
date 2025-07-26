// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetalleServicioSucursalId } from "../../Src/Servicios/ServicioSucursalService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetalleServicioSucursalStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetalleServicioSucursal({ route, navigation }) {
//     const { servicioId, sucursalId } = route.params; // Necesitas ambos IDs para una clave compuesta

//     const [servicioSucursal, setServicioSucursal] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetalleServicioSucursal = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetalleServicioSucursalId(servicioId, sucursalId); // Llama al servicio
//                 if (result.success) {
//                     setServicioSucursal(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar la información del servicio por sucursal.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de servicio_sucursal:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar la información.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetalleServicioSucursal();
//     }, [servicioId, sucursalId, navigation]);

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Servicio por Sucursal...</Text>
//             </View>
//         );
//     }

//     if (!servicioSucursal) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Servicio por Sucursal</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para esta combinación de servicio y sucursal.</Text>
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
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Servicio por Sucursal</Text>

//             <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                 <Text style={[styles.servicioSucursalTitle, {color: '#2c3e50'}]}>Servicio ID: {servicioSucursal.servicio_id} - Sucursal ID: {servicioSucursal.sucursal_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Precio en Sucursal: </Text>{servicioSucursal.precio_en_sucursal ? `$${servicioSucursal.precio_en_sucursal}` : 'No definido'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Está Disponible: </Text>{servicioSucursal.esta_disponible ? 'Sí' : 'No'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{servicioSucursal.created_at}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{servicioSucursal.updated_at}</Text>
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