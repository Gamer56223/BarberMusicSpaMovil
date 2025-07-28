import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import ProductoCard from '../../components/ProductoCard';
import { useNavigation } from "@react-navigation/native";
import { listarProductos, eliminarProducto } from "../../Src/Servicios/ProductoService";
import { listarCategorias } from "../../Src/Servicios/CategoriaService";

import styles from "../../Styles/Producto/ListarProductoStyles";

const PRODUCTS_PER_LOAD = 5;

export default function ListarProductos (){
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoriasMap, setCategoriasMap] = useState({});
    const [displayCount, setDisplayCount] = useState(PRODUCTS_PER_LOAD);
    const navigation = useNavigation();

    const handleProductos = async () => {
        setLoading(true);
        try {
            const [categoriasRes, productosRes] = await Promise.all([
                listarCategorias(),
                listarProductos()
            ]);

            let tempCategoriasMap = {};
            if (categoriasRes.success) {
                categoriasRes.data.forEach(categoria => {
                    tempCategoriasMap[categoria.id] = categoria.nombre;
                });
                setCategoriasMap(tempCategoriasMap);
            } else {
                console.error("Error al cargar categorías:", categoriasRes.message);
                Alert.alert("Error de Carga", categoriasRes.message || "No se pudieron cargar las categorías.");
            }

            if (productosRes.success) {
                const enrichedProductos = productosRes.data.map(productoItem => {
                    const nombreCategoria = tempCategoriasMap[productoItem.categoria_id] || 'Categoría Desconocida';
                    return {
                        ...productoItem,
                        nombreCategoria,
                    };
                });
                setProductos(enrichedProductos);
            } else {
                Alert.alert("Error", productosRes.message || "No se pudieron cargar los productos");
            }
        } catch (error) {
            console.error("Error general al cargar datos de productos:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleProductos();
            setDisplayCount(PRODUCTS_PER_LOAD); // Reiniciar el contador al volver a la pantalla
        });
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar este producto?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarProducto(id);
                            if (result.success) {
                                Alert.alert("Éxito", "Producto eliminado correctamente.");
                                handleProductos();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el producto.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar producto:", error);
                            Alert.alert("Error", "Ocurrió un error inesperado al eliminar el producto.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearProducto');
    };

    const handleEditar = (producto) => {
        navigation.navigate("EditarProducto", {producto});
    };

    const HandleDetalle = (productoId) => {
        navigation.navigate("DetalleProducto", {productoId: productoId});
    };

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + PRODUCTS_PER_LOAD);
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando productos...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            <View style={styles.headerContainer}>
                <Ionicons name="cube-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Productos</Text>
            </View>

            <FlatList
                data={productos.slice(0, displayCount)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductoCard
                        producto={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => HandleDetalle(item.id)}
                    />
                )}
                ListEmptyComponent = {
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="cube-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay productos registrados.</Text>
                        <Text style={styles.emptyText}>¡Añade un nuevo producto!</Text>
                    </View>
                }
                ListFooterComponent={
                    displayCount < productos.length ? (
                        <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreButton}>
                            <Text style={styles.loadMoreButtonText}>Ver más productos</Text>
                            <Ionicons name="arrow-down-circle-outline" size={20} color="#1976D2" />
                        </TouchableOpacity>
                    ) : null
                }
                contentContainerStyle={productos.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Producto</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
