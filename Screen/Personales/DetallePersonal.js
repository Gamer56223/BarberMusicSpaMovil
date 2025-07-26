// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetallePersonalId } from "../../Src/Servicios/PersonalService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetallePersonalStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetallePersonal({ route, navigation }) {
//     const { personalId } = route.params;

//     const [personal, setPersonal] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetallePersonal = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetallePersonalId(personalId); // Llama al servicio
//                 if (result.success) {
//                     setPersonal(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar el personal.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de personal:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar el personal.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetallePersonal();
//     }, [personalId, navigation]);

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Personal...</Text>
//             </View>
//         );
//     }

//     if (!personal) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Personal</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este personal.</Text>
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
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Personal</Text>

//             <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                 <Text style={[styles.personalTitle, {color: '#2c3e50'}]}>Personal ID: {personal.id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID Usuario: </Text>{personal.usuario_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID Sucursal Asignada: </Text>{personal.sucursal_asignada_id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Tipo Personal: </Text>{personal.tipo_personal}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Número Empleado: </Text>{personal.numero_empleado || 'N/A'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Fecha Contratación: </Text>{personal.fecha_contratacion}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Activo en Empresa: </Text>{personal.activo_en_empresa ? 'Sí' : 'No'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{personal.created_at}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{personal.updated_at}</Text>
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