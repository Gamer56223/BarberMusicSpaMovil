import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import ServicioCard from '../../components/ServicioCard';
import { useNavigation } from "@react-navigation/native";
import { listarServicios, eliminarServicio } from "../../Src/Servicios/ServicioService";
import { listarCategorias } from "../../Src/Servicios/CategoriaService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService";
import styles from "../../Styles/Servicio/ListarServicioStyles";

// --- MAPA COMPLETO DE SERVICIOS ---
const nombreASlugMap = {
  "SculpSure": 'sculpsure',
  "Lipo sin Cirugía": 'lipo-sin-ciruga',
  "Criolipolisis": 'criolipolisis',
  "Paquete Reafirmante": 'paquete-reafirmante',
  "Levantamiento de Glúteos": 'levantamiento-de-glteos',
  "Eliminación de Celulitis": 'eliminacin-de-celulitis',
  "HIFU Facial": 'hifu-facial',
  "Radiofrecuencia Facial": 'radiofrecuencia-facial',
  "Hidradermoabrasión": 'hidradermoabrasin',
  "Microdermoabrasión": 'microdermoabrasin',
  "Hollywood Peel": 'hollywood-peel',
  "Limpieza Facial": 'limpieza-facial',
  "Despigmentación Facial": 'despigmentacin-facial',
  "Maderoterapia": 'maderoterapia',
  "Masaje Relajante": 'masaje-relajante',
  "Arreglo y Diseño de Barba": 'arreglo-y-diseo-de-barba',
  "Corte de Cabello Masculino": 'corte-de-cabello-masculino',
  "Coloración de Cabello": 'coloracin-de-cabello',
  "Tratamiento Capilar": 'tratamiento-capilar',
  "Corte de Cabello General": 'corte-de-cabello-general',
  "Depilación Láser SHR (Sesión)": 'depilacin-lser-shr-sesin',
  "Diseño y Delineado de Cejas": 'diseo-y-delineado-de-cejas',
  "Perfilado de Cejas": 'perfilado-de-cejas',
  "Eliminación de Tatuajes (Sesión)": 'eliminacin-de-tatuajes-sesin'
};

export default function ListarServicios (){
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleServicios = async () => {
        setLoading(true);
        try {
            const [categoriasRes, especialidadesRes, serviciosRes] = await Promise.all([
                listarCategorias(),
                listarEspecialidades(),
                listarServicios()
            ]);

            let tempCategoriasMap = {};
            if (categoriasRes.success) {
                categoriasRes.data.forEach(item => { tempCategoriasMap[item.id] = item.nombre; });
            }
            let tempEspecialidadesMap = {};
            if (especialidadesRes.success) {
                especialidadesRes.data.forEach(item => { tempEspecialidadesMap[item.id] = item.nombre; });
            }

            if (serviciosRes.success) {
                const enrichedServicios = serviciosRes.data.map(item => {
                    const slug = nombreASlugMap[item.nombre];
                    return {
                        ...item,
                        slug: slug,
                        nombreCategoria: tempCategoriasMap[item.categoria_id] || 'Categoría Desconocida',
                        nombreEspecialidad: tempEspecialidadesMap[item.especialidad_requerida_id] || 'No requerida',
                    };
                });
                setServicios(enrichedServicios);
            } else {
                Alert.alert("Error", serviciosRes.message || "No se pudieron cargar los servicios");
            }
        } catch (error) {
            console.error("Error general al cargar datos:", error);
            Alert.alert("Error", "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleServicios);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => { /* Tu lógica de eliminar */ };
    const handleCrear = () => navigation.navigate('CrearServicio');
    const handleEditar = (servicio) => navigation.navigate("EditarServicio", { servicio });
    const HandleDetalle = (item) => navigation.navigate("DetalleServicio", { servicio: item });

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text>Cargando servicios...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />
            <View style={styles.headerContainer}>
                <Ionicons name="file-tray-full-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Servicios</Text>
            </View>
            <FlatList
                data={servicios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ServicioCard
                        servicio={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => HandleDetalle(item)}
                    />
                )}
                ListEmptyComponent = {
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="file-tray-full-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay servicios registrados.</Text>
                    </View>
                }
                contentContainerStyle={servicios.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Servicio</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}