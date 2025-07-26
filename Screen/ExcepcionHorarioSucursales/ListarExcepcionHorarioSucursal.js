// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import ExcepcionHorarioCard from '../../components/ExcepcionHorarioCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarExcepcionesHorarioSucursal, eliminarExcepcionHorarioSucursal } from "../../Src/Servicios/ExcepcionHorarioService";
// import { listarSucursales } from "../../Src/Servicios/SucursalService";

// import styles from "../../Styles/ListarExcepcionesStyles";

// export default function ListarExcepcionesHorarioSucursal (){
//     const [excepciones, setExcepciones] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [sucursalesMap, setSucursalesMap] = useState({});
//     const navigation = useNavigation();

//     const handleExcepciones = async () => {
//         setLoading(true);
//         try {
//             const [sucursalesRes, excepcionesRes] = await Promise.all([
//                 listarSucursales(),
//                 listarExcepcionesHorarioSucursal()
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

//             if (excepcionesRes.success) {
//                 const enrichedExcepciones = excepcionesRes.data.map(excepcionItem => {
//                     const nombreSucursal = tempSucursalesMap[excepcionItem.sucursal_id] || 'Sucursal Desconocida';
//                     return {
//                         ...excepcionItem,
//                         nombreSucursal,
//                     };
//                 });
//                 setExcepciones(enrichedExcepciones);
//             } else {
//                 Alert.alert("Error", excepcionesRes.message || "No se pudieron cargar las excepciones de horario");
//             }
//         } catch (error) {
//             console.error("Error general al cargar datos:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handleExcepciones);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar esta excepción de horario?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarExcepcionHorarioSucursal(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Excepción eliminada correctamente.");
//                                 handleExcepciones();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar la excepción.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar excepción:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar la excepción.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearExcepcionHorario'); 
//     };

//     const handleEditar = (excepcion) => {
//         navigation.navigate("EditarExcepcionHorario", {excepcion});
//     };

//     const HandleDetalle = (excepcionId) => {
//         navigation.navigate("DetalleExcepcionHorario", {excepcionId: excepcionId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando excepciones de horario...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="time-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Excepciones de Horario</Text>
//             </View>

//             <FlatList
//                 data={excepciones}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <ExcepcionHorarioCard
//                         excepcion={item}
//                         nombreSucursal={item.nombreSucursal}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="alert-circle-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay excepciones de horario registradas.</Text>
//                         <Text style={styles.emptyText}>¡Crea una nueva excepción!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={excepciones.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nueva Excepción</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }