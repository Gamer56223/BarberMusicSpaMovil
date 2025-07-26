// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetallePromocionId } from "../../Src/Servicios/PromocionService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetallePromocionStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetallePromocion({ route, navigation }) {
//     const { promocionId } = route.params;

//     const [promocion, setPromocion] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetallePromocion = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetallePromocionId(promocionId); // Llama al servicio
//                 if (result.success) {
//                     setPromocion(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar la promoción.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de promoción:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar la promoción.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetallePromocion();
//     }, [promocionId, navigation]);

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Promoción...</Text>
//             </View>
//         );
//     }

//     if (!promocion) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Promoción</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para esta promoción.</Text>
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
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Promoción</Text>

//             <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                 <Text style={[styles.promocionName, {color: '#2c3e50'}]}>{promocion.nombre} ({promocion.codigo})</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{promocion.id}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Descripción: </Text>{promocion.descripcion || 'N/A'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Tipo Descuento: </Text>{promocion.tipo_descuento}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Valor Descuento: </Text>{promocion.valor_descuento}{promocion.tipo_descuento === 'Porcentaje' ? '%' : '$'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Fecha Inicio: </Text>{promocion.fecha_inicio}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Fecha Fin: </Text>{promocion.fecha_fin}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Usos Máximos Total: </Text>{promocion.usos_maximos_total || 'Ilimitado'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Usos Máximos por Cliente: </Text>{promocion.usos_maximos_por_cliente || 'Ilimitado'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Usos Actuales: </Text>{promocion.usos_actuales}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Activo: </Text>{promocion.activo ? 'Sí' : 'No'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Aplica a Todos los Productos: </Text>{promocion.aplica_a_todos_productos ? 'Sí' : 'No'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Aplica a Todos los Servicios: </Text>{promocion.aplica_a_todos_servicios ? 'Sí' : 'No'}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{promocion.created_at}</Text>
//                 <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{promocion.updated_at}</Text>
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