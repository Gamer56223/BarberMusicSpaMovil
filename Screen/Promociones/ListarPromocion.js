import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { listarPromociones, eliminarPromocion } from "../../Src/Servicios/PromocionService";

import styles from "../../Styles/Promocion/ListarPromocionStyles";

export default function ListarPromociones (){
    const [promociones, setPromociones] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handlePromociones = async () => {
        setLoading(true);
        try {
            const promocionesRes = await listarPromociones();
            if (promocionesRes.success) {
                setPromociones(promocionesRes.data);
            } else {
                Alert.alert("Error", promocionesRes.message || "No se pudieron cargar las promociones");
            }
        } catch (error) {
            console.error("Error al cargar las promociones:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handlePromociones);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar esta promoción?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarPromocion(id);
                            if (result.success) {
                                Alert.alert("Éxito", "Promoción eliminada correctamente.");
                                handlePromociones();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la promoción.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar promoción:", error);
                            Alert.alert("Error", "Ocurrió un error inesperado al eliminar la promoción.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearPromocion'); 
    };

    const handleEditar = (promocion) => {
        navigation.navigate("EditarPromocion", {promocion});
    };

    const HandleDetalle = (promocionId) => {
        navigation.navigate("DetallePromocion", {promocionId: promocionId});
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando promociones...</Text>
            </View>
        );
    }

    // Estilos internos para la tarjeta de promoción, reemplazando a PromocionCard
    const cardStyles = StyleSheet.create({
        cardContainer: {
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            padding: 16,
            marginHorizontal: 16,
            marginTop: 10,
            marginBottom: 6,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        promocionName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#2c3e50',
            flex: 1,
            marginRight: 10,
        },
        promocionCode: {
            fontSize: 14,
            color: '#7f8c8d',
        },
        detailsContainer: {
            marginBottom: 12,
        },
        detailText: {
            fontSize: 14,
            color: '#5C6F7F',
            marginBottom: 4,
        },
        detailLabel: {
            fontWeight: '600',
            color: '#2c3e50',
        },
        discountText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#27ae60',
        },
        dateText: {
            fontSize: 12,
            color: '#95a5a6',
        },
        actionContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 10,
        },
        actionButton: {
            marginLeft: 15,
        },
    });

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            <View style={styles.headerContainer}>
                <Ionicons name="pricetag-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Promociones</Text>
            </View>

            <FlatList
                data={promociones}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={cardStyles.cardContainer}>
                        <View style={cardStyles.cardHeader}>
                            <Text style={cardStyles.promocionName}>{item.nombre}</Text>
                            <Text style={cardStyles.promocionCode}>{item.codigo}</Text>
                        </View>
                        <View style={cardStyles.detailsContainer}>
                            <Text style={cardStyles.detailText} numberOfLines={2}>
                                <Text style={cardStyles.detailLabel}>Descripción: </Text>{item.descripcion || 'N/A'}
                            </Text>
                            <Text style={cardStyles.detailText}>
                                <Text style={cardStyles.detailLabel}>Descuento: </Text>
                                <Text style={cardStyles.discountText}>{item.valor_descuento}{item.tipo_descuento === 'Porcentaje' ? '%' : '$'}</Text>
                            </Text>
                            <Text style={cardStyles.dateText}>
                                Válido del {item.fecha_inicio} al {item.fecha_fin}
                            </Text>
                            <Text style={cardStyles.detailText}>
                                <Text style={cardStyles.detailLabel}>Activo: </Text>{item.activo ? 'Sí' : 'No'}
                            </Text>
                        </View>
                        <View style={cardStyles.actionContainer}>
                            <TouchableOpacity onPress={() => HandleDetalle(item.id)} style={cardStyles.actionButton}>
                                <Ionicons name="eye-outline" size={24} color="#555" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEditar(item)} style={cardStyles.actionButton}>
                                <Ionicons name="create-outline" size={24} color="#007BFF" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEliminar(item.id)} style={cardStyles.actionButton}>
                                <Ionicons name="trash-outline" size={24} color="#FF5252" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent = {
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="pricetag-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay promociones registradas.</Text>
                        <Text style={styles.emptyText}>¡Crea una nueva promoción!</Text>
                    </View>
                }
                contentContainerStyle={promociones.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Promoción</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
