import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { PersonalCard } from "../../components/PersonalCard";
import { useNavigation } from "@react-navigation/native";
import { listarPersonal, eliminarPersonal } from "../../Src/Servicios/PersonalService";
import { listarUsuarios } from "../../Src/Servicios/UsuarioService";
import { listarSucursales } from "../../Src/Servicios/SucursalService";
import styles from "../../Styles/Personal/ListarPersonalStyles";

export default function ListarPersonal (){
    const [personal, setPersonal] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handlePersonal = async () => {
        setLoading(true);
        try {
            const [usuariosRes, sucursalesRes, personalRes] = await Promise.all([
                listarUsuarios(),
                listarSucursales(),
                listarPersonal()
            ]);

            let tempUsuariosMap = {};
            if (usuariosRes.success && Array.isArray(usuariosRes.data)) {
                usuariosRes.data.forEach(usuario => {
                    tempUsuariosMap[usuario.id] = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim();
                });
            }

            let tempSucursalesMap = {};
            if (sucursalesRes.success && Array.isArray(sucursalesRes.data)) {
                sucursalesRes.data.forEach(sucursal => {
                    tempSucursalesMap[sucursal.id] = sucursal.nombre;
                });
            }

            if (personalRes.success && Array.isArray(personalRes.data)) {
                const enrichedPersonal = personalRes.data.map(personalItem => ({
                    ...personalItem,
                    nombreUsuario: tempUsuariosMap[personalItem.usuario_id] || 'Usuario Desconocido',
                    nombreSucursal: tempSucursalesMap[personalItem.sucursal_asignada_id] || 'Sucursal Desconocida'
                }));
                setPersonal(enrichedPersonal);
            } else {
                Alert.alert("Error", personalRes.message || "No se pudo cargar el personal");
                setPersonal([]);
            }
        } catch (error) {
            Alert.alert("Error", "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handlePersonal);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert("Confirmar Eliminación", "¿Estás seguro?",
            [{ text: "Cancelar" }, { text: "Eliminar", style: "destructive",
                onPress: async () => {
                    const result = await eliminarPersonal(id);
                    if (result.success) {
                        Alert.alert("Éxito", "Eliminado correctamente.");
                        handlePersonal();
                    } else {
                        Alert.alert("Error", result.message || "No se pudo eliminar.");
                    }
                },
            }]
        );
    };

    const handleCrear = () => {
        navigation.navigate('AgregarPersonal');
    };

    const handleDetalle = (personalId) => {
        navigation.navigate("DetallePersonal", { personalId: personalId });
    };

    if (loading) {
        return ( <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color="#1976D2" />
            <Text style={styles.loadingText}>Cargando personal...</Text>
        </View> );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />
            <View style={styles.headerContainer}>
                <Ionicons name="people-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Personal</Text>
            </View>
            <FlatList
                data={personal}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PersonalCard
                        personal={item}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => handleDetalle(item.id)}
                        // Se elimina la propiedad onEdit
                    />
                )}
                ListEmptyComponent = { <View style={styles.emptyListContainer}><Ionicons name="people-outline" size={80} color="#BDC3C7" /><Text style={styles.emptyText}>No hay personal registrado.</Text></View> }
                contentContainerStyle={personal.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Personal</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}