import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CategoriaCard from '../../components/CategoriaCard';
import { useNavigation } from "@react-navigation/native";
import { listarCategorias, eliminarCategoria } from "../../Src/Servicios/CategoriaService";

import styles from "../../Styles/Categoria/ListarCategoriaStyles";

export default function ListarCategorias (){
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleCategorias = async () => {
        setLoading(true);
        try {
            const categoriasRes = await listarCategorias();
            if (categoriasRes.success && Array.isArray(categoriasRes.data)) {
                setCategorias(categoriasRes.data);
            } else {
                Alert.alert("Error", categoriasRes.message || "No se pudieron cargar las categorías");
                setCategorias([]);
            }
        } catch (error) {
            console.error("Error al cargar las categorías:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCategorias);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar esta categoría?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        const result = await eliminarCategoria(id);
                        if (result.success) {
                            Alert.alert("Éxito", "Categoría eliminada correctamente.");
                            handleCategorias();
                        } else {
                            Alert.alert("Error", result.message || "No se pudo eliminar la categoría.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        // Asegúrate que tu pantalla se llame 'AgregarCategoria' en el navegador
        navigation.navigate('AgregarCategoria');
    };

    // --- ¡CORRECCIÓN AQUÍ! ---
    // Ahora enviamos solo el ID con el nombre de parámetro correcto.
    const handleEditar = (categoria) => {
        navigation.navigate("EditarCategoria", { categoriaId: categoria.id });
    };

    // (Ajuste de nombre para consistencia)
    const handleDetalle = (categoriaId) => {
        navigation.navigate("DetalleCategoria", { categoriaId: categoriaId });
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando categorías...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            <View style={styles.headerContainer}>
                <Ionicons name="layers-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Categorías</Text>
            </View>

            <FlatList
                data={categorias}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CategoriaCard
                        categoria={item}
                        // --- ¡CORRECCIÓN AQUÍ! ---
                        // Ahora se llama a la función corregida.
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        // (Ajuste de nombre para consistencia)
                        onDetail={() => handleDetalle(item.id)}
                    />
                )}
                ListEmptyComponent = {
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="layers-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay categorías registradas.</Text>
                        <Text style={styles.emptyText}>¡Crea una nueva categoría!</Text>
                    </View>
                }
                contentContainerStyle={categorias.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Categoría</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}