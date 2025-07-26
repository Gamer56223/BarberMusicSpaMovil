// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, Linking } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetalleMusicaPreferenciaNavegacionId } from "../../Src/Servicios/MusicaPreferenciaNavegacionService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetalleMusicaPreferenciaNavegacionStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetalleMusicaPreferenciaNavegacion({ route, navigation }) {
//     const { musicaPreferenciaId } = route.params;

//     const [musicaPreferencia, setMusicaPreferencia] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetalleMusicaPreferencia = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetalleMusicaPreferenciaNavegacionId(musicaPreferenciaId); // Llama al servicio
//                 if (result.success) {
//                     setMusicaPreferencia(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar la preferencia de música.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de preferencia de música:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar la preferencia de música.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetalleMusicaPreferencia();
//     }, [musicaPreferenciaId, navigation]);

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Preferencia de Música...</Text>
//             </View>
//         );
//     }

//     if (!musicaPreferencia) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Preferencia de Música</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para esta preferencia de música.</Text>
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

//     const handleLinkPress = async (url) => {
//         if (url) {
//             const supported = await Linking.canOpenURL(url);
//             if (supported) {
//                 await Linking.openURL(url);
//             } else {
//                 Alert.alert(`No se puede abrir esta URL: ${url}`);
//             }
//         }
//     };

//     return (
//         <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Preferencia de Música</Text>

//             <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                 <Text style={[styles.musicaTitle, {color: '#2c3e50'}]}>{musicaPreferencia.nombre_opcion}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{musicaPreferencia.id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Descripción: </Text>{musicaPreferencia.descripcion || 'N/A'}</Text>
//                 {musicaPreferencia.stream_url_ejemplo && (
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}>
//                         <Text style={styles.detailLabel}>URL Ejemplo: </Text>
//                         <Text style={styles.linkText} onPress={() => handleLinkPress(musicaPreferencia.stream_url_ejemplo)}>
//                             {musicaPreferencia.stream_url_ejemplo}
//                         </Text>
//                     </Text>
//                 )}
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Activo: </Text>{musicaPreferencia.activo ? 'Sí' : 'No'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{musicaPreferencia.created_at}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{musicaPreferencia.updated_at}</Text>
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