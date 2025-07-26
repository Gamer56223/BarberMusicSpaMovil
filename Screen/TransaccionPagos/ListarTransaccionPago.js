// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import TransaccionPagoCard from '../../components/TransaccionPagoCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarTransaccionesPago, eliminarTransaccionPago } from "../../Src/Servicios/TransaccionPagoService";
// import { listarOrdenes } from "../../Src/Servicios/OrdenService";
// import { listarClientes } from "../../Src/Servicios/ClienteService";

// import styles from "../../Styles/ListarTransaccionesStyles";

// export default function ListarTransaccionesPago (){
//     const [transacciones, setTransacciones] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [ordenesMap, setOrdenesMap] = useState({});
//     const [clientesMap, setClientesMap] = useState({});
//     const navigation = useNavigation();

//     const handleTransacciones = async () => {
//         setLoading(true);
//         try {
//             const [ordenesRes, clientesRes, transaccionesRes] = await Promise.all([
//                 listarOrdenes(),
//                 listarClientes(),
//                 listarTransaccionesPago()
//             ]);

//             let tempOrdenesMap = {};
//             if (ordenesRes.success) {
//                 ordenesRes.data.forEach(item => {
//                     tempOrdenesMap[item.id] = item.numero_orden;
//                 });
//                 setOrdenesMap(tempOrdenesMap);
//             } else {
//                 console.error("Error al cargar órdenes:", ordenesRes.message);
//                 Alert.alert("Error de Carga", ordenesRes.message || "No se pudieron cargar las órdenes.");
//             }

//             let tempClientesMap = {};
//             if (clientesRes.success) {
//                 clientesRes.data.forEach(item => {
//                     tempClientesMap[item.id] = `${item.Nombre} ${item.Apellido}`;
//                 });
//                 setClientesMap(tempClientesMap);
//             } else {
//                 console.error("Error al cargar clientes:", clientesRes.message);
//                 Alert.alert("Error de Carga", clientesRes.message || "No se pudieron cargar los clientes.");
//             }

//             if (transaccionesRes.success) {
//                 const enrichedData = transaccionesRes.data.map(item => {
//                     const numeroOrden = tempOrdenesMap[item.orden_id] || 'Orden no encontrada';
//                     const nombreCliente = tempClientesMap[item.cliente_usuario_id] || 'Cliente no encontrado';

//                     return {
//                         ...item,
//                         numeroOrden,
//                         nombreCliente
//                     };
//                 });
//                 setTransacciones(enrichedData);
//             } else {
//                 Alert.alert("Error", transaccionesRes.message || "No se pudieron cargar las transacciones");
//             }
//         } catch (error) {
//             console.error("Error general al cargar datos:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handleTransacciones);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar esta transacción?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarTransaccionPago(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Transacción eliminada correctamente.");
//                                 handleTransacciones();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar la transacción.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar transacción:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar la transacción.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearTransaccionPago'); 
//     };

//     const handleEditar = (transaccion) => {
//         navigation.navigate("EditarTransaccionPago", {transaccion});
//     };

//     const HandleDetalle = (transaccionId) => {
//         navigation.navigate("DetalleTransaccionPago", {transaccionId: transaccionId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando transacciones...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="card-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Transacciones de Pago</Text>
//             </View>

//             <FlatList
//                 data={transacciones}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <TransaccionPagoCard
//                         transaccion={item}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="card-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay transacciones registradas.</Text>
//                         <Text style={styles.emptyText}>¡Crea una nueva transacción!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={transacciones.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nueva Transacción</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }