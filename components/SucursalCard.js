import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import styles from "../Styles/Sucursal/SucursalCardStyles";
import { imageMap } from '../utils/ImageMapper';

function SucursalCard({ sucursal, onEdit, onDelete, onDetail }) {
    const slug = sucursal.nombre.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const imageSource = imageMap.sucursales[slug] || imageMap.default;

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                {imageSource && <Image source={imageSource} style={styles.image} />}
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.mainContent}>
                    <Text style={styles.nombre}>{sucursal.nombre}</Text>
                    <Text style={styles.detalle}>
                        <Text style={styles.detalleLabel}>Dirección:</Text> <Text>{sucursal.fullAddress || 'Dirección no disponible'}</Text>
                    </Text>
                    <Text style={styles.detalle}>
                        <Text style={styles.detalleLabel}>Estado:</Text> <Text>{sucursal.activo ? 'Activo' : 'Inactivo'}</Text>
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

export default React.memo(SucursalCard);