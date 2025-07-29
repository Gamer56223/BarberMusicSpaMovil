import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../Styles/Categoria/CategoriaCardStyles';

function CategoriaCard({ categoria, onEdit, onDelete, onDetail }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{categoria.nombre || 'Nombre no disponible'}</Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Descripción:</Text> {categoria.descripcion || 'N/A'}
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Tipo:</Text> {categoria.tipo_categoria || 'N/A'}
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Icono Clave:</Text> {categoria.icono_clave || 'N/A'}
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Activo:</Text> {categoria.activo ? 'Sí' : 'No'}
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDetail} style={styles.iconBtn}>
                    <Ionicons name="eye-outline" size={26} color="#4CAF50" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default React.memo(CategoriaCard);