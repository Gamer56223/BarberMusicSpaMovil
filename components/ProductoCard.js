import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import styles from "../Styles/Producto/ProductoCardStyles";

function ProductoCard({ producto, onEdit, onDelete, onDetail }) {
    return (
        <View style={styles.card}>
            <View style={styles.contentContainer}>
                <Text style={styles.nombre}>{producto.nombre}</Text>
                
                <View style={styles.detailRow}>
                    <Text style={styles.detalle}><Text style={styles.detalleLabel}>Categoría:</Text> {producto.nombreCategoria}</Text>
                </View>

                {producto.descripcion ? (
                    <Text style={styles.shortDescription} numberOfLines={2} ellipsizeMode="tail">
                        <Text style={styles.detalleLabel}>Descripción:</Text> {producto.descripcion}
                    </Text>
                ) : null}

                <View style={styles.priceStockSkuSection}>
                    <Text style={styles.priceText}><Text style={styles.detalleLabel}>Precio:</Text> ${producto.precio}</Text>
                    <Text style={styles.stockText}><Text style={styles.detalleLabel}>Stock:</Text> {producto.stock}</Text>
                    <Text style={styles.skuText}><Text style={styles.detalleLabel}>SKU:</Text> {producto.sku}</Text>
                </View>
                
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {producto.activo ? 'Sí' : 'No'}</Text>
                
                {producto.imagen_path ? (
                    <Text style={styles.detalle} numberOfLines={1} ellipsizeMode="tail">
                        <Text style={styles.detalleLabel}>Imagen:</Text> {producto.imagen_path}
                    </Text>
                ) : null}
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1976D2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={24} color="#D32F2F" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDetail} style={styles.iconBtn}>
                    <Ionicons name="information-circle-outline" size={24} color="#555" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default React.memo(ProductoCard);
