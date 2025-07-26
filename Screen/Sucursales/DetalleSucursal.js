// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, Image, ScrollView, Linking } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetalleSucursalId } from "../../Src/Servicios/SucursalService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetalleSucursalStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetalleSucursal({ route, navigation }) {
//     const { sucursalId } = route.params;

//     const [sucursal, setSucursal] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetalleSucursal = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetalleSucursalId(sucursalId); // Llama al servicio
//                 if (result.success) {
//                     setSucursal(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar la sucursal.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de sucursal:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar la sucursal.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetalleSucursal();
//     }, [sucursalId, navigation]);

//     const handleOpenLink = (url) => {
//         if (url) {
//             Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
//         }
//     };

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Sucursal...</Text>
//             </View>
//         );
//     }

//     if (!sucursal) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Sucursal</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para esta sucursal.</Text>
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
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Sucursal</Text>

//             <ScrollView contentContainerStyle={styles.scrollViewContent}>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.sucursalName, {color: '#2c3e50'}]}>{sucursal.nombre}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{sucursal.id}</Text>
                    
//                     {sucursal.imagen_path ? (
//                         <Image
//                             source={{ uri: sucursal.imagen_path }}
//                             style={styles.sucursalImage}
//                             resizeMode="contain"
//                         />
//                     ) : (
//                         <Text style={[styles.detailText, {color: '#5C6F7F', fontStyle: 'italic'}]}>No hay imagen disponible.</Text>
//                     )}
                    
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Teléfono: </Text>{sucursal.telefono_contacto}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Email: </Text>{sucursal.email_contacto}</Text>
                    
//                     {sucursal.link_maps && (
//                         <Text style={[styles.detailText, {color: '#5C6F7F'}]}>
//                             <Text style={styles.detailLabel}>Ubicación: </Text>
//                             <Text style={styles.linkText} onPress={() => handleOpenLink(sucursal.link_maps)}>Ver en Mapas</Text>
//                         </Text>
//                     )}
                    
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Latitud: </Text>{sucursal.latitud}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Longitud: </Text>{sucursal.longitud}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Activo: </Text>{sucursal.activo ? 'Sí' : 'No'}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{sucursal.created_at}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{sucursal.updated_at}</Text>
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