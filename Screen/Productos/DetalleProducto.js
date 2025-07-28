import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, Image, ScrollView } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { DetalleProductoId } from "../../Src/Servicios/ProductoService";
import { listarCategorias } from "../../Src/Servicios/CategoriaService";
import styles from "../../Styles/Producto/DetalleProductoStyles";

export default function DetalleProducto({ route, navigation }) {
    const { productoId } = route.params;

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categoriaNombre, setCategoriaNombre] = useState('Cargando...');

    // Función para limpiar referencias y quitar los dos puntos si es necesario
    const cleanDescription = (text) => {
        if (!text) return 'N/A';
        // Elimina [cite: número] y luego cualquier ": " que quede al principio o al final si no hay más texto
        let cleanedText = text.replace(/\[cite: \d+\]/g, '').trim();
        return cleanedText;
    };

    useEffect(() => {
        const cargarDetalleProducto = async () => {
            setLoading(true);
            try {
                const [productoRes, categoriasRes] = await Promise.all([
                    DetalleProductoId(productoId),
                    listarCategorias()
                ]);

                if (productoRes.success) {
                    setProducto(productoRes.data);

                    if (categoriasRes.success && productoRes.data.categoria_id) {
                        const categoriaEncontrada = categoriasRes.data.find(cat => cat.id === productoRes.data.categoria_id);
                        setCategoriaNombre(categoriaEncontrada ? categoriaEncontrada.nombre : 'Desconocida');
                    } else {
                        setCategoriaNombre('Desconocida');
                    }

                } else {
                    Alert.alert("Error", productoRes.message || "No se pudo cargar el producto.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error("Error al cargar detalle de producto:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar el producto.");
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };
        cargarDetalleProducto();
    }, [productoId, navigation]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Producto...</Text>
            </View>
        );
    }

    if (!producto) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
                <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Producto</Text>
                <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                    <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este producto.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Producto</Text>

                <View style={styles.detailCard}>
                    <Text style={styles.productoName}>{producto.nombre}</Text>
                    
                    {producto.imagen_path ? (
                        <Image
                            source={{ uri: producto.imagen_path }}
                            style={styles.productoImage}
                            resizeMode="contain"
                        />
                    ) : (
                        <Text style={styles.noImageText}>No hay imagen disponible.</Text>
                    )}

                    <View style={styles.detailSection}>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>ID</Text>: {producto.id}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Categoría</Text>: {categoriaNombre}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Descripción</Text>: {cleanDescription(producto.descripcion)}</Text>
                        <Text style={styles.priceDetailText}><Text style={styles.detailLabel}>Precio</Text>: ${producto.precio}</Text>
                        <Text style={styles.stockDetailText}><Text style={styles.detailLabel}>Stock</Text>: {producto.stock}</Text>
                        <Text style={styles.skuDetailText}><Text style={styles.detailLabel}>SKU</Text>: {producto.sku || 'N/A'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Activo</Text>: {producto.activo ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
