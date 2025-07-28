import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, Image } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { DetalleProductoId } from "../../Src/Servicios/ProductoService"; // Asume que tienes este servicio
import styles from "../../Styles/Producto/DetalleProductoStyles";

export default function DetalleProducto({ route, navigation }) {
    const { productoId } = route.params;

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDetalleProducto = async () => {
            setLoading(true);
            try {
                const result = await DetalleProductoId(productoId); // Llama al servicio
                if (result.success) {
                    setProducto(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudo cargar el producto.");
                    navigation.goBack(); // Regresar si hay un error
                }
            } catch (error) {
                console.error("Error al cargar detalle de producto:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar el producto.");
                navigation.goBack(); // Regresar si hay un error
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
                    <BotonComponent
                        title="Volver al Listado"
                        onPress={() => navigation.goBack()}
                        buttonStyle={styles.backButton}
                        textStyle={styles.buttonText}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
            <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Producto</Text>

            <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                <Text style={[styles.productoName, {color: '#2c3e50'}]}>{producto.nombre}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{producto.id}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Descripción: </Text>{producto.descripcion || 'N/A'}</Text>
                
                {producto.imagen_path ? (
                    <Image
                        source={{ uri: producto.imagen_path }}
                        style={styles.productoImage}
                        resizeMode="contain"
                    />
                ) : (
                    <Text style={[styles.detailText, {color: '#5C6F7F', fontStyle: 'italic'}]}>No hay imagen disponible.</Text>
                )}
                
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Precio: </Text>${producto.precio}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Stock: </Text>{producto.stock}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>SKU: </Text>{producto.sku || 'N/A'}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID Categoría: </Text>{producto.categoria_id}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Activo: </Text>{producto.activo ? 'Sí' : 'No'}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{producto.created_at}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{producto.updated_at}</Text>
            </View>

            <BotonComponent
                title="Volver al Listado"
                onPress={() => navigation.goBack()}
                buttonStyle={styles.backButton}
                textStyle={styles.buttonText}
            />
        </SafeAreaView>
    );
}