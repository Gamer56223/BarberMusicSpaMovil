import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator } from "react-native";
import styles from "../../Styles/Producto/DetalleProductoStyles";
import { imageMap } from "../../utils/ImageMapper";

export default function DetalleProducto({ route }) {
    const producto = route.params?.producto;

    if (!producto) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text>Cargando Producto...</Text>
            </View>
        );
    }

    const imagenDelProducto = imageMap.productos[producto.slug] || imageMap.default;

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Producto</Text>
                <View style={styles.detailCard}>
                    <Text style={styles.productoName}>{producto.nombre || 'Nombre no disponible'}</Text>
                    
                    <Image
                        source={imagenDelProducto}
                        style={styles.productoImage}
                        resizeMode="contain"
                    />

                    <View style={styles.detailSection}>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>ID: </Text>{producto.id}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Categoría: </Text>{producto.nombreCategoria || 'Desconocida'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Descripción: </Text>{producto.descripcion || 'N/A'}</Text>
                        <Text style={styles.priceDetailText}><Text style={styles.detailLabel}>Precio: </Text>${producto.precio}</Text>
                        <Text style={styles.stockDetailText}><Text style={styles.detailLabel}>Stock: </Text>{producto.stock}</Text>
                        <Text style={styles.skuDetailText}><Text style={styles.detailLabel}>SKU: </Text>{producto.sku || 'N/A'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Activo: </Text>{producto.activo ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}