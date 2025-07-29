import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import UsuarioCard from '../../components/UsuarioCard';
import { useNavigation } from "@react-navigation/native";
import { listarUsuarios, eliminarUsuario } from "../../Src/Servicios/UsuarioService";
import { listarSucursales } from "../../Src/Servicios/SucursalService";
import { listarMusicaPreferencias } from "../../Src/Servicios/MusicaPreferenciaService";

import styles from "../../Styles/ListarUsuariosStyles";

export default function ListarUsuarios (){
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sucursalesMap, setSucursalesMap] = useState({});
    const [musicaMap, setMusicaMap] = useState({});
    const navigation = useNavigation();

    const handleUsuarios = async () => {
        setLoading(true);
        try {
            const [sucursalesRes, musicaRes, usuariosRes] = await Promise.all([
                listarSucursales(),
                listarMusicaPreferencias(),
                listarUsuarios()
            ]);

            let tempSucursalesMap = {};
            if (sucursalesRes.success) {
                sucursalesRes.data.forEach(item => {
                    tempSucursalesMap[item.id] = item.Nombre;
                });
                setSucursalesMap(tempSucursalesMap);
            } else {
                console.error("Error al cargar sucursales:", sucursalesRes.message);
                Alert.alert("Error de Carga", sucursalesRes.message || "No se pudieron cargar las sucursales.");
            }

            let tempMusicaMap = {};
            if (musicaRes.success) {
                musicaRes.data.forEach(item => {
                    tempMusicaMap[item.id] = item.nombre_opcion;
                });
                setMusicaMap(tempMusicaMap);
            } else {
                console.error("Error al cargar preferencias de música:", musicaRes.message);
                Alert.alert("Error de Carga", musicaRes.message || "No se pudieron cargar las preferencias de música.");
            }

            if (usuariosRes.success) {
                const enrichedData = usuariosRes.data.map(item => {
                    const sucursalPreferida = tempSucursalesMap[item.sucursal_preferida_id] || 'Ninguna';
                    const musicaPreferida = tempMusicaMap[item.musica_preferencia_id] || 'Ninguna';

                    return {
                        ...item,
                        sucursalPreferida,
                        musicaPreferida
                    };
                });
                setUsuarios(enrichedData);
            } else {
                Alert.alert("Error", usuariosRes.message || "No se pudieron cargar los usuarios");
            }
        } catch (error) {
            console.error("Error general al cargar datos:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleUsuarios);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar este usuario?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarUsuario(id);
                            if (result.success) {
                                Alert.alert("Éxito", "Usuario eliminado correctamente.");
                                handleUsuarios();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el usuario.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar usuario:", error);
                            Alert.alert("Error", "Ocurrió un error inesperado al eliminar el usuario.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearUsuario'); 
    };

    const handleEditar = (usuario) => {
        navigation.navigate("EditarUsuario", {usuario});
    };

    const HandleDetalle = (usuarioId) => {
        navigation.navigate("DetalleUsuario", {usuarioId: usuarioId});
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando usuarios...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            <View style={styles.headerContainer}>
                <Ionicons name="person-circle-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Usuarios</Text>
            </View>

            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <UsuarioCard
                        usuario={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => HandleDetalle(item.id)}
                    />
                )}
                ListEmptyComponent = {
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="people-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay usuarios registrados.</Text>
                        <Text style={styles.emptyText}>¡Crea un nuevo usuario!</Text>
                    </View>
                }
                contentContainerStyle={usuarios.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Usuario</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}