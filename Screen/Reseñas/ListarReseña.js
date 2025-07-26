// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import ResenaCard from '../../components/ResenaCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarResenas, eliminarResena } from "../../Src/Servicios/ResenaService";
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService";
// import { listarServicios } from "../../Src/Servicios/ServicioService";

// import styles from "../../Styles/ListarResenasStyles";

// export default function ListarResenas (){
//     const [resenas, setResenas] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [usuariosMap, setUsuariosMap] = useState({});
//     const [resenablesMap, setResenablesMap] = useState({});
//     const navigation = useNavigation();

//     const handleResenas = async () => {
//         setLoading(true);
//         try {
//             const [usuariosRes, serviciosRes, resenasRes] = await Promise.all([
//                 listarUsuarios(),
//                 listarServicios(), // Asumimos que las reseñas son de servicios por ahora
//                 listarResenas()
//             ]);

//             let tempUsuariosMap = {};
//             if (usuariosRes.success) {
//                 usuariosRes.data.forEach(usuario => {
//                     tempUsuariosMap[usuario.id] = usuario.nombre || usuario.email;
//                 });
//                 setUsuariosMap(tempUsuariosMap);
//             } else {
//                 console.error("Error al cargar usuarios:", usuariosRes.message);
//                 Alert.alert("Error de Carga", usuariosRes.message || "No se pudieron cargar los usuarios.");
//             }

//             let tempResenablesMap = {};
//             if (serviciosRes.success) {
//                 serviciosRes.data.forEach(servicio => {
//                     // La clave incluye el tipo para manejar relaciones polimórficas
//                     tempResenablesMap[`service-${servicio.id}`] = servicio.nombre;
//                 });
//                 setResenablesMap(tempResenablesMap);
//             } else {
//                 console.error("Error al cargar servicios:", serviciosRes.message);
//                 Alert.alert("Error de Carga", serviciosRes.message || "No se pudieron cargar los servicios.");
//             }

//             if (resenasRes.success) {
//                 const enrichedResenas = resenasRes.data.map(item => {
//                     const nombreCliente = tempUsuariosMap[item.cliente_usuario_id] || 'Cliente Desconocido';
//                     const nombreResenable = tempResenablesMap[`${item.resenable_type.toLowerCase()}-${item.resenable_id}`] || 'Elemento no encontrado';
                    
//                     return {
//                         ...item,
//                         nombreCliente,
//                         nombreResenable
//                     };
//                 });
//                 setResenas(enrichedResenas);
//             } else {
//                 Alert.alert("Error", resenasRes.message || "No se pudieron cargar las reseñas");
//             }
//         } catch (error) {
//             console.error("Error general al cargar datos:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handleResenas);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar esta reseña?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarResena(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Reseña eliminada correctamente.");
//                                 handleResenas();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar la reseña.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar reseña:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar la reseña.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearResena'); 
//     };

//     const handleEditar = (resena) => {
//         navigation.navigate("EditarResena", {resena});
//     };

//     const HandleDetalle = (resenaId) => {
//         navigation.navigate("DetalleResena", {resenaId: resenaId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando reseñas...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="star-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Gestión de Reseñas</Text>
//             </View>

//             <FlatList
//                 data={resenas}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <ResenaCard
//                         resena={item}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="chatbox-ellipses-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay reseñas registradas.</Text>
//                         <Text style={styles.emptyText}>¡Crea una nueva reseña!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={resenas.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nueva Reseña</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }