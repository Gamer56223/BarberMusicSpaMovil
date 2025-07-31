import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import styles from "../Styles/Producto/ProductoCardStyles";
import { imageMap } from '../utils/ImageMapper';

function ProductoCard({ producto, onEdit, onDelete, onDetail }) {
    const slug = producto.nombre.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const imageSource = imageMap.productos[slug] || imageMap.default;

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                {imageSource && <Image source={imageSource} style={styles.image} />}
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.mainContent}>
                    <Text style={styles.nombre}>{producto.nombre}</Text>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detalle}>
                            <Text style={styles.detalleLabel}>Categoría:</Text> {producto.nombreCategoria}
                        </Text>
                    </View>

                    {producto.descripcion ? (
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.detalleLabel}>Descripción:</Text>
                            <Text style={styles.shortDescription} numberOfLines={2} ellipsizeMode="tail">
                                {producto.descripcion}
                            </Text>
                        </View>
                    ) : null}

                    <View style={styles.priceStockSkuSection}>
                        <Text style={styles.priceText}>
                            <Text style={styles.detalleLabel}>Precio:</Text> ${producto.precio}
                        </Text>
                        <Text style={styles.stockText}>
                            <Text style={styles.detalleLabel}>Stock:</Text> {producto.stock}
                        </Text>
                    </View>

                    <Text style={styles.detalle}>
                        <Text style={styles.detalleLabel}>Activo:</Text> {producto.activo ? 'Sí' : 'No'}
                    </Text>
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
        </View>
    );
}

export default React.memo(ProductoCard);