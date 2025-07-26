// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import SucursalCard from '../../components/SucursalCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarSucursales, eliminarSucursal } from "../../Src/Servicios/SucursalService";

// import styles from "../../Styles/ListarSucursalesStyles";

// export default function ListarSucursales (){
//     const [sucursales, setSucursales] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigation = useNavigation();

//     const handleSucursales = async () => {
//         setLoading(true);
//         try {
//             const sucursalesRes = await listarSucursales();
//             if (sucursalesRes.success) {
//                 setSucursales(sucursalesRes.data);
//             } else {
//                 Alert.alert("Error", sucursalesRes.message || "No se pudieron cargar las sucursales");
//             }
//         } catch (error) {
//             console.error("Error al cargar las sucursales:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handleSucursales);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar esta sucursal?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarSucursal(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Sucursal eliminada correctamente.");
//                                 handleSucursales();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar la sucursal.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar sucursal:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar la sucursal.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearSucursal'); 
//     };

//     const handleEditar = (sucursal) => {
//         navigation.navigate("EditarSucursal", {sucursal});
//     };

//     const HandleDetalle = (sucursalId) => {
//         navigation.navigate("DetalleSucursal", {sucursalId: sucursalId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando sucursales...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="business-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Gestión de Sucursales</Text>
//             </View>

//             <FlatList
//                 data={sucursales}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <SucursalCard
//                         sucursal={item}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="business-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay sucursales registradas.</Text>
//                         <Text style={styles.emptyText}>¡Crea una nueva sucursal!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={sucursales.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nueva Sucursal</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }