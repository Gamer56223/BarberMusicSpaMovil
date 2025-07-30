// components/SucursalCard.js (CON DIAGNÓSTICO)

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import styles from "../Styles/Sucursal/SucursalCardStyles";
import { imageMap } from '../utils/ImageMapper';

function SucursalCard({ sucursal, onEdit, onDelete, onDetail }) {
    const slug = sucursal.nombre.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const imageSource = imageMap.sucursales[slug] || imageMap.default;

    // --- INICIO DE LA DEPURACIÓN ---
    // Solo imprime en la consola las sucursales que están fallando
    if (!imageMap.sucursales[slug]) {
      console.log('--- ⚠️ IMAGEN NO ENCONTRADA PARA SUCURSAL:', `"${sucursal.nombre}"` ,'---');
      console.log('CLAVE GENERADA:', `"${slug}"`);
      console.log('>>> Copia esta clave y pégala en la sección "sucursales" de tu ImageMapper.js');
      console.log('----------------------------------------------------');
    }
    // --- FIN DE LA DEPURACIÓN ---

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                {imageSource && <Image source={imageSource} style={styles.image} />}
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.mainContent}>
                    <Text style={styles.nombre}>{sucursal.nombre}</Text>
                    <Text style={styles.detalle}><Text style={styles.detalleLabel}>Email:</Text> {sucursal.email_contacto}</Text>
                    <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {sucursal.telefono_contacto}</Text>
                    <Text style={styles.detalle}>
                        <Text style={styles.detalleLabel}>Estado:</Text> {sucursal.activo ? 'Activo' : 'Inactivo'}
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