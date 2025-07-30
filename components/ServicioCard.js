import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import styles from '../Styles/Servicio/ServicioCardStyles';
import { imageMap } from '../utils/ImageMapper';

function ServicioCard({ servicio, onEdit, onDelete, onDetail }) {
  const slug = servicio.nombre.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const imageSource = imageMap.servicios[slug] || imageMap.default;

  const cleanDescription = (text) => {
    if (!text) return '';
    return text.trim();
  };

  return (
    <View style={styles.card}>
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <View style={styles.contentContainer}>
        <View style={styles.mainContent}>
          <Text style={styles.nombre}>{servicio.nombre}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detalle}><Text style={styles.detalleLabel}>Categoría</Text>: {servicio.nombreCategoria}</Text>
          </View>
          {servicio.nombreEspecialidad && (
            <View style={styles.detailRow}>
              <Text style={styles.detalle}><Text style={styles.detalleLabel}>Especialidad</Text>: {servicio.nombreEspecialidad}</Text>
            </View>
          )}
          {servicio.descripcion ? (
            <Text style={styles.shortDescription} numberOfLines={2} ellipsizeMode="tail">
              <Text style={styles.detalleLabel}>Descripción</Text>: {cleanDescription(servicio.descripcion)}
            </Text>
          ) : null}
          <View style={styles.priceDurationSection}>
            <Text style={styles.priceText}><Text style={styles.detalleLabel}>Precio Base</Text>: ${servicio.precio_base}</Text>
            <Text style={styles.durationText}><Text style={styles.detalleLabel}>Duración</Text>: {servicio.duracion_minutos} min</Text>
          </View>
          <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo</Text>: {servicio.activo ? 'Sí' : 'No'}</Text>
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

export default React.memo(ServicioCard);