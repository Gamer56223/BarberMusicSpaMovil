// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import DireccionCard from '../../components/DireccionCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarDirecciones, eliminarDireccion } from "../../Src/Servicios/DireccionService";
// import { listarSucursales } from "../../Src/Servicios/SucursalService";

// import styles from "../../Styles/ListarDireccionesStyles";

// export default function ListarDirecciones (){
//     const [direcciones, setDirecciones] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [sucursalesMap, setSucursalesMap] = useState({});
//     const navigation = useNavigation();

//     const handleDirecciones = async () => {
//         setLoading(true);
//         try {
//             const [sucursalesRes, direccionesRes] = await Promise.all([
//                 listarSucursales(),
//                 listarDirecciones()
//             ]);

//             let tempSucursalesMap = {};
//             if (sucursalesRes.success) {
//                 sucursalesRes.data.forEach(sucursal => {
//                     tempSucursalesMap[sucursal.id] = sucursal.Nombre;
//                 });
//                 setSucursalesMap(tempSucursalesMap);
//             } else {
//                 console.error("Error al cargar sucursales:", sucursalesRes.message);
//                 Alert.alert("Error de Carga", sucursalesRes.message || "No se pudieron cargar las sucursales.");
//             }

//             if (direccionesRes.success) {
//                 const enrichedDirecciones = direccionesRes.data.map(direccionItem => {
//                     let nombrePropietario = 'Propietario Desconocido';
//                     let tipoPropietario = direccionItem.direccionable_type || 'Desconocido';

//                     if (direccionItem.direccionable_type === 'Sucursal') {
//                         nombrePropietario = tempSucursalesMap[direccionItem.direccionable_id] || 'Sucursal no encontrada';
//                     }
//                     // Aquí se podrían agregar más 'if' para otros tipos como Clientes, Personal, etc.

//                     return {
//                         ...direccionItem,
//                         nombrePropietario,
//                         tipoPropietario
//                     };
//                 });
//                 setDirecciones(enrichedDirecciones);
//             } else {
//                 Alert.alert("Error", direccionesRes.message || "No se pudieron cargar las direcciones");
//             }
//         } catch (error) {
//             console.error("Error general al cargar datos de direcciones:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handleDirecciones);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar esta dirección?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarDireccion(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Dirección eliminada correctamente.");
//                                 handleDirecciones();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar la dirección.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar dirección:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar la dirección.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearDireccion'); 
//     };

//     const handleEditar = (direccion) => {
//         navigation.navigate("EditarDireccion", {direccion});
//     };

//     const HandleDetalle = (direccionId) => {
//         navigation.navigate("DetalleDireccion", {direccionId: direccionId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando direcciones...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="location-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Gestión de Direcciones</Text>
//             </View>

//             <FlatList
//                 data={direcciones}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <DireccionCard
//                         direccion={item}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="map-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay direcciones registradas.</Text>
//                         <Text style={styles.emptyText}>¡Crea una nueva dirección!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={direcciones.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nueva Dirección</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }