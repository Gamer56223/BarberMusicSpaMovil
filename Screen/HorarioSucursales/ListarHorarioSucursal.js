// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import HorarioSucursalCard from '../../components/HorarioSucursalCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarHorariosSucursal, eliminarHorarioSucursal } from "../../Src/Servicios/HorarioSucursalService";
// import { listarSucursales } from "../../Src/Servicios/SucursalService";

// import styles from "../../Styles/ListarHorariosStyles";

// const diasSemanaMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// export default function ListarHorariosSucursal (){
//     const [horarios, setHorarios] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [sucursalesMap, setSucursalesMap] = useState({});
//     const navigation = useNavigation();

//     const handleHorarios = async () => {
//         setLoading(true);
//         try {
//             const [sucursalesRes, horariosRes] = await Promise.all([
//                 listarSucursales(),
//                 listarHorariosSucursal()
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

//             if (horariosRes.success) {
//                 const enrichedHorarios = horariosRes.data.map(horarioItem => {
//                     const nombreSucursal = tempSucursalesMap[horarioItem.sucursal_id] || 'Sucursal Desconocida';
//                     const nombreDiaSemana = diasSemanaMap[horarioItem.dia_semana] || 'Día no válido';
//                     return {
//                         ...horarioItem,
//                         nombreSucursal,
//                         nombreDiaSemana
//                     };
//                 });
//                 setHorarios(enrichedHorarios);
//             } else {
//                 Alert.alert("Error", horariosRes.message || "No se pudieron cargar los horarios");
//             }
//         } catch (error) {
//             console.error("Error general al cargar datos de horarios:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handleHorarios);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar este horario?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarHorarioSucursal(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Horario eliminado correctamente.");
//                                 handleHorarios();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar el horario.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar horario:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar el horario.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearHorarioSucursal'); 
//     };

//     const handleEditar = (horario) => {
//         navigation.navigate("EditarHorarioSucursal", {horario});
//     };

//     const HandleDetalle = (horarioId) => {
//         navigation.navigate("DetalleHorarioSucursal", {horarioId: horarioId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando horarios...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="calendar-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Gestión de Horarios</Text>
//             </View>

//             <FlatList
//                 data={horarios}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <HorarioSucursalCard
//                         horario={item}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="calendar-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay horarios registrados.</Text>
//                         <Text style={styles.emptyText}>¡Crea un nuevo horario!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={horarios.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nuevo Horario</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }