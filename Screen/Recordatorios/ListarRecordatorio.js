import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import RecordatorioCard from '../../components/RecordatorioCard';
import { useNavigation } from "@react-navigation/native";
import { listarRecordatorios, eliminarRecordatorio } from "../../Src/Servicios/RecordatorioService";
import { listarUsuarios } from "../../Src/Servicios/UsuarioService";
import { listarAgendamientos } from "../../Src/Servicios/AgendamientoService";

import styles from "../../Styles/Recordatorio/ListarRecordatorioStyles";

export default function ListarRecordatorios (){
    const [recordatorios, setRecordatorios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usuariosMap, setUsuariosMap] = useState({});
    const [agendamientosMap, setAgendamientosMap] = useState({});
    const navigation = useNavigation();

    const handleRecordatorios = async () => {
        setLoading(true);
        try {
            const [usuariosRes, agendamientosRes, recordatoriosRes] = await Promise.all([
                listarUsuarios(),
                listarAgendamientos(),
                listarRecordatorios()
            ]);

            let tempUsuariosMap = {};
            if (usuariosRes.success) {
                usuariosRes.data.forEach(usuario => {
                    tempUsuariosMap[usuario.id] = `${usuario.Nombre} ${usuario.Apellido}`;
                });
                setUsuariosMap(tempUsuariosMap);
            } else {
                console.error("Error al cargar usuarios:", usuariosRes.message);
                Alert.alert("Error de Carga", usuariosRes.message || "No se pudieron cargar los usuarios.");
            }

            let tempAgendamientosMap = {};
            if (agendamientosRes.success) {
                agendamientosRes.data.forEach(agendamiento => {
                    tempAgendamientosMap[agendamiento.id] = `Agendamiento #${agendamiento.id}`;
                });
                setAgendamientosMap(tempAgendamientosMap);
            } else {
                console.error("Error al cargar agendamientos:", agendamientosRes.message);
                Alert.alert("Error de Carga", agendamientosRes.message || "No se pudieron cargar los agendamientos.");
            }

            if (recordatoriosRes.success) {
                const enrichedRecordatorios = recordatoriosRes.data.map(item => {
                    const nombreUsuario = tempUsuariosMap[item.usuario_id] || 'Usuario Desconocido';
                    const descAgendamiento = tempAgendamientosMap[item.agendamiento_id] || 'Agendamiento no encontrado';

                    return {
                        ...item,
                        nombreUsuario,
                        descAgendamiento
                    };
                });
                setRecordatorios(enrichedRecordatorios);
            } else {
                Alert.alert("Error", recordatoriosRes.message || "No se pudieron cargar los recordatorios");
            }
        } catch (error) {
            console.error("Error general al cargar datos:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleRecordatorios);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar este recordatorio?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarRecordatorio(id);
                            if (result.success) {
                                Alert.alert("Éxito", "Recordatorio eliminado correctamente.");
                                handleRecordatorios();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el recordatorio.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar recordatorio:", error);
                            Alert.alert("Error", "Ocurrió un error inesperado al eliminar el recordatorio.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearRecordatorio'); 
    };

    const handleEditar = (recordatorio) => {
        navigation.navigate("EditarRecordatorio", {recordatorio});
    };

    const HandleDetalle = (recordatorioId) => {
        navigation.navigate("DetalleRecordatorio", {recordatorioId: recordatorioId});
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando recordatorios...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            <View style={styles.headerContainer}>
                <Ionicons name="notifications-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Recordatorios</Text>
            </View>

            <FlatList
                data={recordatorios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <RecordatorioCard
                        recordatorio={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => HandleDetalle(item.id)}
                    />
                )}
                ListEmptyComponent = {
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="notifications-off-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay recordatorios registrados.</Text>
                        <Text style={styles.emptyText}>¡Crea un nuevo recordatorio!</Text>
                    </View>
                }
                contentContainerStyle={recordatorios.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Recordatorio</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}