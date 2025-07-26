// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import PromocionCard from '../../components/PromocionCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarPromociones, eliminarPromocion } from "../../Src/Servicios/PromocionService";

// import styles from "../../Styles/ListarPromocionesStyles";

// export default function ListarPromociones (){
//     const [promociones, setPromociones] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigation = useNavigation();

//     const handlePromociones = async () => {
//         setLoading(true);
//         try {
//             const promocionesRes = await listarPromociones();
//             if (promocionesRes.success) {
//                 setPromociones(promocionesRes.data);
//             } else {
//                 Alert.alert("Error", promocionesRes.message || "No se pudieron cargar las promociones");
//             }
//         } catch (error) {
//             console.error("Error al cargar las promociones:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handlePromociones);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar esta promoción?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarPromocion(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Promoción eliminada correctamente.");
//                                 handlePromociones();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar la promoción.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar promoción:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar la promoción.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearPromocion'); 
//     };

//     const handleEditar = (promocion) => {
//         navigation.navigate("EditarPromocion", {promocion});
//     };

//     const HandleDetalle = (promocionId) => {
//         navigation.navigate("DetallePromocion", {promocionId: promocionId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando promociones...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="pricetag-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Gestión de Promociones</Text>
//             </View>

//             <FlatList
//                 data={promociones}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <PromocionCard
//                         promocion={item}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="pricetag-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay promociones registradas.</Text>
//                         <Text style={styles.emptyText}>¡Crea una nueva promoción!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={promociones.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nueva Promoción</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }