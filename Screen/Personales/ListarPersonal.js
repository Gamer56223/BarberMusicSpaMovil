// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import PersonalCard from '../../components/PersonalCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarPersonal, eliminarPersonal } from "../../Src/Servicios/PersonalService";
// import { listarUsuarios } from "../../Src/Servicios/UsuarioService";
// import { listarSucursales } from "../../Src/Servicios/SucursalService";

// import styles from "../../Styles/ListarPersonalStyles";

// export default function ListarPersonal (){
//     const [personal, setPersonal] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [usuariosMap, setUsuariosMap] = useState({});
//     const [sucursalesMap, setSucursalesMap] = useState({});
//     const navigation = useNavigation();

//     const handlePersonal = async () => {
//         setLoading(true);
//         try {
//             const [usuariosRes, sucursalesRes, personalRes] = await Promise.all([
//                 listarUsuarios(),
//                 listarSucursales(),
//                 listarPersonal()
//             ]);

//             let tempUsuariosMap = {};
//             if (usuariosRes.success) {
//                 usuariosRes.data.forEach(usuario => {
//                     tempUsuariosMap[usuario.id] = `${usuario.Nombre} ${usuario.Apellido}`;
//                 });
//                 setUsuariosMap(tempUsuariosMap);
//             } else {
//                 console.error("Error al cargar usuarios:", usuariosRes.message);
//                 Alert.alert("Error de Carga", usuariosRes.message || "No se pudieron cargar los usuarios.");
//             }

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

//             if (personalRes.success) {
//                 const enrichedPersonal = personalRes.data.map(personalItem => {
//                     const nombreUsuario = tempUsuariosMap[personalItem.usuario_id] || 'Usuario Desconocido';
//                     const nombreSucursal = tempSucursalesMap[personalItem.sucursal_asignada_id] || 'Sucursal Desconocida';

//                     return {
//                         ...personalItem,
//                         nombreUsuario,
//                         nombreSucursal
//                     };
//                 });
//                 setPersonal(enrichedPersonal);
//             } else {
//                 Alert.alert("Error", personalRes.message || "No se pudo cargar el personal");
//             }
//         } catch (error) {
//             console.error("Error general al cargar datos del personal:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handlePersonal);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar a este miembro del personal?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarPersonal(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Miembro del personal eliminado correctamente.");
//                                 handlePersonal();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar al miembro del personal.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar personal:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar al miembro del personal.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearPersonal'); 
//     };

//     const handleEditar = (miembro) => {
//         navigation.navigate("EditarPersonal", {miembro});
//     };

//     const HandleDetalle = (personalId) => {
//         navigation.navigate("DetallePersonal", {personalId: personalId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando personal...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="people-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Gestión de Personal</Text>
//             </View>

//             <FlatList
//                 data={personal}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <PersonalCard
//                         personal={item}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="people-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay personal registrado.</Text>
//                         <Text style={styles.emptyText}>¡Añade un nuevo miembro!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={personal.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nuevo Personal</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }