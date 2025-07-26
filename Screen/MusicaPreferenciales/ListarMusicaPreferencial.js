// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import MusicaPreferenciaCard from '../../components/MusicaPreferenciaCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarMusicaPreferencias, eliminarMusicaPreferencia } from "../../Src/Servicios/MusicaPreferenciaService";

// import styles from "../../Styles/ListarMusicaPreferenciasStyles";

// export default function ListarMusicaPreferencias (){
//     const [musicaPreferencias, setMusicaPreferencias] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigation = useNavigation();

//     const handleMusicaPreferencias = async () => {
//         setLoading(true);
//         try {
//             const preferenciasRes = await listarMusicaPreferencias();
//             if (preferenciasRes.success) {
//                 setMusicaPreferencias(preferenciasRes.data);
//             } else {
//                 Alert.alert("Error", preferenciasRes.message || "No se pudieron cargar las preferencias de música");
//             }
//         } catch (error) {
//             console.error("Error al cargar las preferencias de música:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handleMusicaPreferencias);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar esta preferencia de música?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarMusicaPreferencia(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Preferencia eliminada correctamente.");
//                                 handleMusicaPreferencias();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar la preferencia.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar preferencia:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar la preferencia.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearMusicaPreferencia'); 
//     };

//     const handleEditar = (preferencia) => {
//         navigation.navigate("EditarMusicaPreferencia", {preferencia});
//     };

//     const HandleDetalle = (preferenciaId) => {
//         navigation.navigate("DetalleMusicaPreferencia", {preferenciaId: preferenciaId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando preferencias de música...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="musical-notes-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Preferencias de Música</Text>
//             </View>

//             <FlatList
//                 data={musicaPreferencias}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <MusicaPreferenciaCard
//                         preferencia={item}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="musical-notes-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay preferencias de música registradas.</Text>
//                         <Text style={styles.emptyText}>¡Crea una nueva preferencia!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={musicaPreferencias.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nueva Preferencia</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }