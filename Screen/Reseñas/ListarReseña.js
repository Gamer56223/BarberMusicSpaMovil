import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Suponiendo que tienes un servicio para gestionar las reseñas
import { listarReseñasNoAprobadas, aprobarReseña, eliminarReseña } from '../../Src/Servicios/ReseñaService';

export default function ReseñasPendientes({ navigation }) {
    const [reseñas, setReseñas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Función para obtener las reseñas no aprobadas desde la API
    const fetchReseñas = async () => {
        try {
            setLoading(true);
            const result = await listarReseñasNoAprobadas();
            if (result.success) {
                setReseñas(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar las reseñas pendientes.");
            }
        } catch (error) {
            console.error("Error al listar reseñas no aprobadas:", error);
            Alert.alert("Error", "Ocurrió un error al cargar las reseñas. " + error.message);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    // Función para manejar la acción de aprobar una reseña
    const handleAprobar = async (id) => {
        try {
            const result = await aprobarReseña(id);
            if (result.success) {
                Alert.alert("Éxito", "Reseña aprobada correctamente.");
                // Recargar la lista después de aprobar
                fetchReseñas();
            } else {
                Alert.alert("Error", result.message || "No se pudo aprobar la reseña.");
            }
        } catch (error) {
            console.error("Error al aprobar reseña:", error);
            Alert.alert("Error", "Ocurrió un error inesperado.");
        }
    };

    // Función para manejar la acción de eliminar una reseña
    const handleEliminar = async (id) => {
        try {
            const result = await eliminarReseña(id);
            if (result.success) {
                Alert.alert("Éxito", "Reseña eliminada correctamente.");
                // Recargar la lista después de eliminar
                fetchReseñas();
            } else {
                Alert.alert("Error", result.message || "No se pudo eliminar la reseña.");
            }
        } catch (error) {
            console.error("Error al eliminar reseña:", error);
            Alert.alert("Error", "Ocurrió un error inesperado.");
        }
    };

    // Cargar las reseñas al iniciar el componente
    useEffect(() => {
        fetchReseñas();
    }, []);

    const onRefresh = () => {
        setIsRefreshing(true);
        fetchReseñas();
    };

    // Función para renderizar cada item de la lista
    const renderItem = ({ item }) => (
        <View style={styles.reviewCard}>
            <Text style={styles.reviewText}>
                <Text style={styles.reviewLabel}>Cliente:</Text> {item.cliente?.nombre || 'N/A'}
            </Text>
            <Text style={styles.reviewText}>
                <Text style={styles.reviewLabel}>Servicio:</Text> {item.servicio?.nombre || 'N/A'}
            </Text>
            <Text style={styles.reviewText}>
                <Text style={styles.reviewLabel}>Puntuación:</Text> {item.calificacion} estrellas
            </Text>
            <Text style={styles.reviewText}>
                <Text style={styles.reviewLabel}>Comentario:</Text> {item.comentario || 'Sin comentario'}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.approveButton]} onPress={() => handleAprobar(item.id)}>
                    <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Aprobar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleEliminar(item.id)}>
                    <Ionicons name="trash-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reseñas Pendientes</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <FlatList
                    data={reseñas}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="chatbox-outline" size={80} color="#ccc" />
                            <Text style={styles.emptyText}>No hay reseñas pendientes de aprobación.</Text>
                        </View>
                    }
                    contentContainerStyle={reseñas.length === 0 && styles.flatListContent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a202c',
        textAlign: 'center',
        marginVertical: 20,
    },
    reviewCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    reviewText: {
        fontSize: 16,
        color: '#4a5568',
        marginBottom: 5,
    },
    reviewLabel: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
    },
    approveButton: {
        backgroundColor: '#28a745',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#a0aec0',
        marginTop: 10,
        textAlign: 'center',
    },
    flatListContent: {
        flex: 1,
        justifyContent: 'center',
    }
});
