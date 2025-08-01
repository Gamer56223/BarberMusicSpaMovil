import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import EspecialidadCard from '../../components/EspecialidadCard';
import { useNavigation } from "@react-navigation/native";
import { listarEspecialidades, eliminarEspecialidad } from "../../Src/Servicios/EspecialidadService";

import styles from "../../Styles/Especialidad/ListarEspecialidadStyles";

export default function ListarEspecialidades (){
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleEspecialidades = async () => {
        setLoading(true);
        try {
            const especialidadesRes = await listarEspecialidades();
            if (especialidadesRes.success) {
                setEspecialidades(especialidadesRes.data);
            } else {
                Alert.alert("Error", especialidadesRes.message || "No se pudieron cargar las especialidades");
            }
        } catch (error) {
            console.error("Error al cargar las especialidades:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleEspecialidades);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar esta especialidad?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarEspecialidad(id);
                            if (result.success) {
                                Alert.alert("Éxito", "Especialidad eliminada correctamente.");
                                handleEspecialidades();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la especialidad.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar especialidad:", error);
                            Alert.alert("Error", "Ocurrió un error inesperado al eliminar la especialidad.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearEspecialidad'); 
    };

    const handleEditar = (especialidad) => {
        navigation.navigate("EditarEspecialidad", {especialidad});
    };

    const HandleDetalle = (especialidadId) => {
        navigation.navigate("DetalleEspecialidad", {especialidadId: especialidadId});
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando especialidades...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            <View style={styles.headerContainer}>
                <Ionicons name="sparkles-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Especialidades</Text>
            </View>

            <FlatList
                data={especialidades}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    // NOTA IMPORTANTE: Para quitar el campo "icono clave" de la lista,
                    // necesitas editar el componente 'EspecialidadCard'.
                    // Asegúrate de eliminar la línea de código que renderiza 'item.icono_clave'.
                    <EspecialidadCard
                        especialidad={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => HandleDetalle(item.id)}
                    />
                )}
                ListEmptyComponent = {
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="sparkles-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay especialidades registradas.</Text>
                        <Text style={styles.emptyText}>¡Crea una nueva especialidad!</Text>
                    </View>
                }
                contentContainerStyle={especialidades.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Especialidad</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
