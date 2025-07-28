import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import styles from "../Styles/Producto/ProductoCardStyles";

// Se quita 'nombreCategoria' de los props porque ya viene dentro del objeto 'producto'
function ProductoCard({ producto, onEdit, onDelete, onDetail }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                {/* CORRECCIÓN: Se usan las propiedades en minúscula para que coincidan con la API */}
                <Text style={styles.nombre}>{producto.nombre}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Descripción:</Text> {producto.descripcion}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Imagen Path:</Text> {producto.imagen_path}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Precio:</Text> ${producto.precio}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Stock:</Text> {producto.stock}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Sku:</Text> {producto.sku}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {producto.activo ? 'Sí' : 'No'}</Text>
                
                {/* CORRECCIÓN: Leemos 'nombreCategoria' desde el objeto 'producto' */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Categoria:</Text> {producto.nombreCategoria}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDetail} style={styles.iconBtn}>
                    <Ionicons name="bulb-outline" size={26} color="silver" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default React.memo(ProductoCard);