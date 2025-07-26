// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import AgendamientoCard from '../../components/AgendamientoCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarAgendamientos, eliminarAgendamiento } from "../../Src/Servicios/AgendamientoService";
// import { listarPersonal } from "../../Src/Servicios/PersonalService";
// import { listarClientes } from "../../Src/Servicios/ClienteService";
// import { listarServicios } from "../../Src/Servicios/ServicioService";
// import { listarSucursales } from "../../Src/Servicios/SucursalService";

// import styles from "../../Styles/ListarAgendamientoStyles";

// export default function ListarAgendamiento (){
//     const [agendamientos, setAgendamientos] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [personalMap, setPersonalMap] = useState({});
//     const [clientesMap, setClientesMap] = useState({});
//     const [serviciosMap, setServiciosMap] = useState({});
//     const [sucursalesMap, setSucursalesMap] = useState({});
//     const navigation = useNavigation();

//     const handleAgendamientos = async () => {
//         setLoading(true);
//         try {
//             const [personalRes, clientesRes, serviciosRes, sucursalesRes, agendamientosRes] = await Promise.all([
//                 listarPersonal(),
//                 listarClientes(),
//                 listarServicios(),
//                 listarSucursales(),
//                 listarAgendamientos()
//             ]);

//             let tempPersonalMap = {};
//             if (personalRes.success) {
//                 personalRes.data.forEach(p => {
//                     tempPersonalMap[p.id] = `${p.Nombre} ${p.Apellido}`;
//                 });
//                 setPersonalMap(tempPersonalMap);
//             } else {
//                 console.error("Error al cargar personal:", personalRes.message);
//                 Alert.alert("Error de Carga", personalRes.message || "No se pudo cargar el personal.");
//             }

//             let tempClientesMap = {};
//             if (clientesRes.success) {
//                 clientesRes.data.forEach(cliente => {
//                     tempClientesMap[cliente.id] = `${cliente.Nombre} ${cliente.Apellido}`;
//                 });
//                 setClientesMap(tempClientesMap);
//             } else {
//                 console.error("Error al cargar clientes:", clientesRes.message);
//                 Alert.alert("Error de Carga", clientesRes.message || "No se pudieron cargar los clientes.");
//             }

//             let tempServiciosMap = {};
//             if (serviciosRes.success) {
//                 serviciosRes.data.forEach(servicio => {
//                     tempServiciosMap[servicio.id] = servicio.Nombre;
//                 });
//                 setServiciosMap(tempServiciosMap);
//             } else {
//                 console.error("Error al cargar servicios:", serviciosRes.message);
//                 Alert.alert("Error de Carga", serviciosRes.message || "No se pudieron cargar los servicios.");
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

//             if (agendamientosRes.success) {
//                 const enrichedAgendamientos = agendamientosRes.data.map(agendamientoItem => {
//                     const nombrePersonal = tempPersonalMap[agendamientoItem.personal_id] || 'Personal Desconocido';
//                     const nombreCliente = tempClientesMap[agendamientoItem.cliente_usuario_id] || 'Cliente Desconocido';
//                     const nombreServicio = tempServiciosMap[agendamientoItem.servicio_id] || 'Servicio Desconocido';
//                     const nombreSucursal = tempSucursalesMap[agendamientoItem.sucursal_id] || 'Sucursal Desconocida';

//                     return {
//                         ...agendamientoItem,
//                         nombrePersonal,
//                         nombreCliente,
//                         nombreServicio,
//                         nombreSucursal
//                     };
//                 });
//                 setAgendamientos(enrichedAgendamientos);
//             } else {
//                 Alert.alert("Error", agendamientosRes.message || "No se pudieron cargar los agendamientos");
//             }
//         } catch (error) {
//             console.error("Error general al cargar datos de agendamientos y relacionados:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos de los agendamientos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handleAgendamientos);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar este agendamiento?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarAgendamiento(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Agendamiento eliminado correctamente.");
//                                 handleAgendamientos();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar el agendamiento.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar agendamiento:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar el agendamiento.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearAgendamiento'); 
//     };

//     const handleEditar = (agendamiento) => {
//         navigation.navigate("EditarAgendamiento", {agendamiento});
//     };

//     const HandleDetalle = (agendamientoId) => {
//         navigation.navigate("DetalleAgendamiento", {agendamientoId: agendamientoId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando agendamientos...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="calendar-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Gestión de Agendamientos</Text>
//             </View>

//             <FlatList
//                 data={agendamientos}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <AgendamientoCard
//                         agendamiento={item}
//                         nombrePersonal={item.nombrePersonal}
//                         nombreCliente={item.nombreCliente}
//                         nombreServicio={item.nombreServicio}
//                         nombreSucursal={item.nombreSucursal}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="calendar-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay agendamientos registrados.</Text>
//                         <Text style={styles.emptyText}>¡Crea un nuevo agendamiento!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={agendamientos.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nuevo Agendamiento</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }