// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import ServicioSucursalCard from '../../components/ServicioSucursalCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarServicioSucursal, eliminarServicioSucursal } from "../../Src/Servicios/ServicioSucursalService";
// import { listarServicios } from "../../Src/Servicios/ServicioService";
// import { listarSucursales } from "../../Src/Servicios/SucursalService";

// import styles from "../../Styles/ListarServicioSucursalStyles";

// export default function ListarServicioSucursal (){
//     const [servicioSucursal, setServicioSucursal] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [serviciosMap, setServiciosMap] = useState({});
//     const [sucursalesMap, setSucursalesMap] = useState({});
//     const navigation = useNavigation();

//     const handleServicioSucursal = async () => {
//         setLoading(true);
//         try {
//             const [serviciosRes, sucursalesRes, servicioSucursalRes] = await Promise.all([
//                 listarServicios(),
//                 listarSucursales(),
//                 listarServicioSucursal()
//             ]);

//             let tempServiciosMap = {};
//             if (serviciosRes.success) {
//                 serviciosRes.data.forEach(item => {
//                     tempServiciosMap[item.id] = item.nombre;
//                 });
//                 setServiciosMap(tempServiciosMap);
//             } else {
//                 console.error("Error al cargar servicios:", serviciosRes.message);
//                 Alert.alert("Error de Carga", serviciosRes.message || "No se pudieron cargar los servicios.");
//             }

//             let tempSucursalesMap = {};
//             if (sucursalesRes.success) {
//                 sucursalesRes.data.forEach(item => {
//                     tempSucursalesMap[item.id] = item.Nombre;
//                 });
//                 setSucursalesMap(tempSucursalesMap);
//             } else {
//                 console.error("Error al cargar sucursales:", sucursalesRes.message);
//                 Alert.alert("Error de Carga", sucursalesRes.message || "No se pudieron cargar las sucursales.");
//             }

//             if (servicioSucursalRes.success) {
//                 const enrichedData = servicioSucursalRes.data.map(item => {
//                     const nombreServicio = tempServiciosMap[item.servicio_id] || 'Servicio no encontrado';
//                     const nombreSucursal = tempSucursalesMap[item.sucursal_id] || 'Sucursal no encontrada';

//                     return {
//                         ...item,
//                         nombreServicio,
//                         nombreSucursal
//                     };
//                 });
//                 setServicioSucursal(enrichedData);
//             } else {
//                 Alert.alert("Error", servicioSucursalRes.message || "No se pudieron cargar las asignaciones");
//             }
//         } catch (error) {
//             console.error("Error general al cargar datos:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handleServicioSucursal);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar esta asignación de servicio a sucursal?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarServicioSucursal(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Asignación eliminada correctamente.");
//                                 handleServicioSucursal();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar la asignación.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar asignación:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar la asignación.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearServicioSucursal'); 
//     };

//     const handleEditar = (relacion) => {
//         navigation.navigate("EditarServicioSucursal", {relacion});
//     };

//     const HandleDetalle = (relacionId) => {
//         navigation.navigate("DetalleServicioSucursal", {relacionId: relacionId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando servicios por sucursal...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="git-network-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Servicios por Sucursal</Text>
//             </View>

//             <FlatList
//                 data={servicioSucursal}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <ServicioSucursalCard
//                         relacion={item}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="git-network-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay servicios asignados a sucursales.</Text>
//                         <Text style={styles.emptyText}>¡Asigna un servicio a una sucursal!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={servicioSucursal.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Asignar Servicio</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }