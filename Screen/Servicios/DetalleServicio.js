// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, Image } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetalleServicioId } from "../../Src/Servicios/ServicioService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetalleServicioStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetalleServicio({ route, navigation }) {
//     const { servicioId } = route.params;

//     const [servicio, setServicio] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetalleServicio = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetalleServicioId(servicioId); // Llama al servicio
//                 if (result.success) {
//                     setServicio(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar el servicio.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de servicio:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar el servicio.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetalleServicio();
//     }, [servicioId, navigation]);

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Servicio...</Text>
//             </View>
//         );
//     }

//     if (!servicio) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Servicio</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este servicio.</Text>
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
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Servicio</Text>

//             <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                 <Text style={[styles.servicioName, {color: '#2c3e50'}]}>{servicio.nombre}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{servicio.id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Descripción: </Text>{servicio.descripcion || 'N/A'}</Text>
                
//                 {servicio.imagen_path ? (
//                     <Image
//                         source={{ uri: servicio.imagen_path }}
//                         style={styles.servicioImage}
//                         resizeMode="contain"
//                     />
//                 ) : (
//                     <Text style={[styles.detailText, {color: '#5C6F7F', fontStyle: 'italic'}]}>No hay imagen disponible.</Text>
//                 )}
                
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Precio Base: </Text>${servicio.precio_base}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Duración (minutos): </Text>{servicio.duracion_minutos}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID Categoría: </Text>{servicio.categoria_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID Especialidad Requerida: </Text>{servicio.especialidad_requerida_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Activo: </Text>{servicio.activo ? 'Sí' : 'No'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{servicio.created_at}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{servicio.updated_at}</Text>
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