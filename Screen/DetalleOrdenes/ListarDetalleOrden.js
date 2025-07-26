// import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import DetalleOrdenCard from '../../components/DetalleOrdenCard';
// import { useNavigation } from "@react-navigation/native";
// import { listarDetalleOrdenes, eliminarDetalleOrden } from "../../Src/Servicios/DetalleOrdenService";
// import { listarProductos } from "../../Src/Servicios/ProductoService";
// import { listarOrdenes } from "../../Src/Servicios/OrdenService";

// import styles from "../../Styles/ListarDetalleOrdenesStyles";

// export default function ListarDetalleOrdenes (){
//     const [detallesOrdenes, setDetallesOrdenes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [productosMap, setProductosMap] = useState({});
//     const [ordenesMap, setOrdenesMap] = useState({});
//     const navigation = useNavigation();

//     const handleDetalleOrdenes = async () => {
//         setLoading(true);
//         try {
//             const [productosRes, ordenesRes, detallesRes] = await Promise.all([
//                 listarProductos(),
//                 listarOrdenes(),
//                 listarDetalleOrdenes()
//             ]);

//             let tempProductosMap = {};
//             if (productosRes.success) {
//                 productosRes.data.forEach(producto => {
//                     tempProductosMap[producto.id] = producto.Nombre;
//                 });
//                 setProductosMap(tempProductosMap);
//             } else {
//                 console.error("Error al cargar productos:", productosRes.message);
//                 Alert.alert("Error de Carga", productosRes.message || "No se pudieron cargar los productos.");
//             }

//             let tempOrdenesMap = {};
//             if (ordenesRes.success) {
//                 ordenesRes.data.forEach(orden => {
//                     tempOrdenesMap[orden.id] = `Orden #${orden.id}`;
//                 });
//                 setOrdenesMap(tempOrdenesMap);
//             } else {
//                 console.error("Error al cargar órdenes:", ordenesRes.message);
//                 Alert.alert("Error de Carga", ordenesRes.message || "No se pudieron cargar las órdenes.");
//             }

//             if (detallesRes.success) {
//                 const enrichedDetalles = detallesRes.data.map(detalleItem => {
//                     const nombreProducto = tempProductosMap[detalleItem.producto_id] || detalleItem.nombre_producto_historico || 'Producto Desconocido';
//                     const descripcionOrden = tempOrdenesMap[detalleItem.orden_id] || 'Orden Desconocida';

//                     return {
//                         ...detalleItem,
//                         nombreProducto,
//                         descripcionOrden,
//                     };
//                 });
//                 setDetallesOrdenes(enrichedDetalles);
//             } else {
//                 Alert.alert("Error", detallesRes.message || "No se pudieron cargar los detalles de las órdenes");
//             }
//         } catch (error) {
//             console.error("Error general al cargar datos:", error);
//             Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', handleDetalleOrdenes);
//         return unsubscribe;
//     }, [navigation]);

//     const handleEliminar = (id) => {
//         Alert.alert(
//             "Confirmar Eliminación",
//             "¿Estás seguro de que deseas eliminar este detalle de la orden?",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 {
//                     text: "Eliminar",
//                     style: "destructive",
//                     onPress: async () => {
//                         try {
//                             const result = await eliminarDetalleOrden(id);
//                             if (result.success) {
//                                 Alert.alert("Éxito", "Detalle eliminado correctamente.");
//                                 handleDetalleOrdenes();
//                             } else {
//                                 Alert.alert("Error", result.message || "No se pudo eliminar el detalle.");
//                             }
//                         } catch (error) {
//                             console.error("Error al eliminar detalle:", error);
//                             Alert.alert("Error", "Ocurrió un error inesperado al eliminar el detalle.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const handleCrear = () => {
//         navigation.navigate('CrearDetalleOrden'); 
//     };

//     const handleEditar = (detalle) => {
//         navigation.navigate("EditarDetalleOrden", {detalle});
//     };

//     const HandleDetalle = (detalleId) => {
//         navigation.navigate("DetalleOrden", {detalleId: detalleId});
//     };

//     if (loading) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <ActivityIndicator size="large" color="#1976D2" />
//                 <Text style={styles.loadingText}>Cargando detalles de órdenes...</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.fullScreenContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

//             <View style={styles.headerContainer}>
//                 <Ionicons name="receipt-outline" size={32} color="#007BFF" style={styles.headerIcon} />
//                 <Text style={styles.headerTitle}>Detalles de Órdenes</Text>
//             </View>

//             <FlatList
//                 data={detallesOrdenes}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <DetalleOrdenCard
//                         detalle={item}
//                         nombreProducto={item.nombreProducto}
//                         descripcionOrden={item.descripcionOrden}
//                         onEdit={() => handleEditar(item)}
//                         onDelete={() => handleEliminar(item.id)}
//                         onDetail={() => HandleDetalle(item.id)}
//                     />
//                 )}
//                 ListEmptyComponent = {
//                     <View style={styles.emptyListContainer}>
//                         <Ionicons name="receipt-outline" size={80} color="#BDC3C7" />
//                         <Text style={styles.emptyText}>No hay detalles de órdenes registrados.</Text>
//                         <Text style={styles.emptyText}>¡Crea un nuevo detalle!</Text>
//                     </View>
//                 }
//                 contentContainerStyle={detallesOrdenes.length === 0 ? styles.flatListEmpty : styles.flatListContent}
//             />

//             <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
//                 <View style={styles.botonCrearContent}>
//                     <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
//                     <Text style={styles.textoBotonCrear}>Nuevo Detalle</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }