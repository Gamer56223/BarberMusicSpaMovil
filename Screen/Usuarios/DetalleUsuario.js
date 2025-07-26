// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, Image, ScrollView } from "react-native";
// import BotonComponent from "../../components/BottonComponent";
// import { DetalleUsuarioId } from "../../Src/Servicios/UsuarioService"; // Asume que tienes este servicio
// import styles from "../../Styles/DetalleUsuarioStyles"; // Asume que tienes un archivo de estilos similar

// export default function DetalleUsuario({ route, navigation }) {
//     const { userId } = route.params;

//     const [usuario, setUsuario] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const cargarDetalleUsuario = async () => {
//             setLoading(true);
//             try {
//                 const result = await DetalleUsuarioId(userId); // Llama al servicio
//                 if (result.success) {
//                     setUsuario(result.data);
//                 } else {
//                     Alert.alert("Error", result.message || "No se pudo cargar el usuario.");
//                     navigation.goBack(); // Regresar si hay un error
//                 }
//             } catch (error) {
//                 console.error("Error al cargar detalle de usuario:", error);
//                 Alert.alert("Error", "Ocurrió un error inesperado al cargar el usuario.");
//                 navigation.goBack(); // Regresar si hay un error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         cargarDetalleUsuario();
//     }, [userId, navigation]);

//     if (loading) {
//         return (
//             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
//                 <ActivityIndicator size="large" color="#007B8C" />
//                 <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Usuario...</Text>
//             </View>
//         );
//     }

//     if (!usuario) {
//         return (
//             <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
//                 <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Usuario</Text>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este usuario.</Text>
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
//             <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Usuario</Text>

//             <ScrollView contentContainerStyle={styles.scrollViewContent}>
//                 <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
//                     <Text style={[styles.usuarioName, {color: '#2c3e50'}]}>{usuario.nombre}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{usuario.id}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Email: </Text>{usuario.email}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Email Verificado: </Text>{usuario.email_verified_at ? 'Sí' : 'No'}</Text>
                    
//                     {usuario.imagen_path ? (
//                         <Image
//                             source={{ uri: usuario.imagen_path }}
//                             style={styles.usuarioImage}
//                             resizeMode="contain"
//                         />
//                     ) : (
//                         <Text style={[styles.detailText, {color: '#5C6F7F', fontStyle: 'italic'}]}>No hay imagen de perfil disponible.</Text>
//                     )}
                    
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Teléfono: </Text>{usuario.telefono || 'N/A'}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Activo: </Text>{usuario.activo ? 'Sí' : 'No'}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Rol: </Text>{usuario.rol}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Preferencia Música ID: </Text>{usuario.musica_preferencia_navegacion_id || 'N/A'}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Sucursal Preferida ID: </Text>{usuario.sucursal_preferida_id || 'N/A'}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{usuario.created_at}</Text>
//                     <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{usuario.updated_at}</Text>
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