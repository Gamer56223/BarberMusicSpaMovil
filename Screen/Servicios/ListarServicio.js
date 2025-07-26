// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import ServicioCard from '../../components/ServicioCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarServicios, eliminarServicio } from "../../Src/Servicios/ServicioService";
// import { listarCategorias } from "../../Src/Servicios/CategoriaService";
// import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService";

// import styles from "../../Styles/ListarServiciosStyles";

// export default function ListarServicios (){
//     const [servicios, setServicios] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [categoriasMap, setCategoriasMap] = useState({});
//     const [especialidadesMap, setEspecialidadesMap] = useState({});
//     const navigation = useNavigation();

//     const handleServicios = async () => {
//         setLoading(true);
//         try {
//             const [categoriasRes, especialidadesRes, serviciosRes] = await Promise.all([
//                 listarCategorias(),
//                 listarEspecialidades(),
//                 listarServicios()
//             ]);

//             let tempCategoriasMap = {};
//             if (categoriasRes.success) {
//                 categoriasRes.data.forEach(item => {
//                     tempCategoriasMap[item.id] = item.nombre;
//                 });
//                 setCategoriasMap(tempCategoriasMap);
//             } else {
//                 console.error("Error al cargar categorías:", categoriasRes.message);
//                 Alert.alert("Error de Carga", categoriasRes.message || "No se pudieron cargar las categorías.");
//             }

//             let tempEspecialidadesMap = {};
//             if (especialidadesRes.success) {
//                 especialidadesRes.data.forEach(item => {
//                     tempEspecialidadesMap[item.id] = item.nombre;
//                 });
//                 setEspecialidadesMap(tempEspecialidadesMap);
//             } else {
//                 console.error("Error al cargar especialidades:", especialidadesRes.message);
//                 Alert.alert("Error de Carga", especialidadesRes.message || "No se pudieron cargar las especialidades.");
//             }

//             if (serviciosRes.success) {
//                 const enrichedServicios = serviciosRes.data.map(item => {
//                     const nombreCategoria = tempCategoriasMap[item.categoria_id] || 'Categoría Desconocida';
//                     const nombreEspecialidad = tempEspecialidadesMap[item.especialidad_requerida_id] || 'Especialidad no requerida';

//                     return {
//                         ...item,
//                         nombreCategoria,
//                         nombreEspecialidad
//                     };
//                 });
//                 setServicios(enrichedServicios);
//             } else {
//                 Alert.alert("Error", serviciosRes.message || "No se pudieron cargar los servicios");
//             }
//         } catch (error) {
//             console.error("Error general al cargar datos:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handleServicios);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar este servicio?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarServicio(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Servicio eliminado correctamente.");
//                                 handleServicios();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar el servicio.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar servicio:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar el servicio.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearServicio'); 
//     };

//     const handleEditar = (servicio) => {
//         navigation.navigate("EditarServicio", {servicio});
//     };

//     const HandleDetalle = (servicioId) => {
//         navigation.navigate("DetalleServicio", {servicioId: servicioId});
//     };



//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando servicios...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="file-tray-full-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Gestión de Servicios</Text>
//             </View>

//             <FlatList
//                 data={servicios}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <ServicioCard
//                         servicio={item}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="file-tray-full-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay servicios registrados.</Text>
//                         <Text style={styles.emptyText}>¡Crea un nuevo servicio!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={servicios.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nuevo Servicio</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }