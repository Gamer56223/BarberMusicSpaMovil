import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Simulación de los servicios de la API. Reemplaza estos con tus servicios reales
// Se ha modificado el mock para que sea más claro qué usuario ya es personal.
const mockApiServices = {
    // Simula la obtención de la lista de usuarios. El usuario con id: 1 ya es personal.
    listarUsuarios: async () => {
        return {
            success: true,
            data: [
                { id: 1, nombre: 'Juan', apellido: 'Perez' },
                { id: 2, nombre: 'Maria', apellido: 'Gomez' },
                { id: 3, nombre: 'Carlos', apellido: 'Lopez' },
                { id: 4, nombre: 'Ana', apellido: 'Martinez' },
            ]
        };
    },
    // Simula la obtención de la lista de personal.
    listarPersonal: async () => {
        return {
            success: true,
            data: [
                { id: 101, usuario_id: 1, sucursal_asignada_id: 15, tipo_personal: 'BARBERO' }, // Usuario 1 ya es personal
            ]
        };
    },
    // Simula la obtención de la lista de sucursales
    listarSucursales: async () => {
        return {
            success: true,
            data: [
                { id: 1, nombre: 'Sucursal Centro' },
                { id: 2, nombre: 'Sucursal Norte' },
                { id: 15, nombre: 'Sucursal Principal' },
            ]
        };
    },
    // Simula el servicio de creación de personal
    crearPersonal: async (personalData) => {
        console.log("Datos enviados al backend:", personalData);
        // Simula una respuesta exitosa
        return { success: true, message: 'Personal creado exitosamente.' };
    }
};

export default function AgregarPersonal() {
    const navigation = useNavigation();

    // Estados para los datos del formulario
    const [availableUsers, setAvailableUsers] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedSucursalId, setSelectedSucursalId] = useState(null);
    const [tipoPersonal, setTipoPersonal] = useState('');
    const [numeroEmpleado, setNumeroEmpleado] = useState('');
    const [fechaContratacion, setFechaContratacion] = useState('');
    const [loading, setLoading] = useState(true);

    /**
     * @description Carga los datos de la API, filtra los usuarios y llena los selectores del formulario.
     */
    const cargarDatos = async () => {
        setLoading(true);
        try {
            // Realiza las llamadas a la API en paralelo para optimizar el tiempo de carga
            const [usuariosRes, personalRes, sucursalesRes] = await Promise.all([
                mockApiServices.listarUsuarios(),
                mockApiServices.listarPersonal(),
                mockApiServices.listarSucursales(),
            ]);

            if (usuariosRes.success && personalRes.success && sucursalesRes.success) {
                // 1. Obtener los IDs de los usuarios que ya son personal
                const existingUserIds = new Set(personalRes.data.map(p => p.usuario_id));
                
                // 2. Filtrar la lista completa de usuarios.
                // Solo mantenemos los usuarios cuyo ID no está en la lista de personal.
                const filteredUsers = usuariosRes.data.filter(user => !existingUserIds.has(user.id));
                
                // 3. Establecer los estados con los datos filtrados y las sucursales
                setAvailableUsers(filteredUsers);
                setSucursales(sucursalesRes.data);
                
                // Establece el primer usuario y sucursal como valores predeterminados
                if (filteredUsers.length > 0) {
                    setSelectedUserId(filteredUsers[0].id);
                }
                if (sucursalesRes.data.length > 0) {
                    setSelectedSucursalId(sucursalesRes.data[0].id);
                }
            } else {
                Alert.alert("Error", "No se pudieron cargar los datos necesarios.");
            }
        } catch (error) {
            console.error("Error al cargar los datos:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleGuardarPersonal = async () => {
        if (!selectedUserId || !selectedSucursalId || !tipoPersonal || !numeroEmpleado || !fechaContratacion) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        const nuevoPersonal = {
            usuario_id: selectedUserId,
            sucursal_asignada_id: selectedSucursalId,
            tipo_personal: tipoPersonal,
            numero_empleado: numeroEmpleado,
            fecha_contratacion: fechaContratacion,
            activo_en_empresa: true
        };

        try {
            const result = await mockApiServices.crearPersonal(nuevoPersonal);
            if (result.success) {
                Alert.alert("Éxito", "Personal creado exitosamente.");
                // Navega de regreso a la pantalla de la lista
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo crear el personal.");
            }
        } catch (error) {
            console.error("Error al guardar personal:", error);
            Alert.alert("Error", "Ocurrió un error al intentar guardar.");
        }
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Cargando datos para el formulario...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <Ionicons name="person-add-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                    <Text style={styles.headerTitle}>Agregar Nuevo Personal</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Seleccionar Usuario:</Text>
                    {availableUsers.length > 0 ? (
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedUserId}
                                onValueChange={(itemValue) => setSelectedUserId(itemValue)}
                                style={styles.picker}
                            >
                                {availableUsers.map((user) => (
                                    <Picker.Item key={user.id} label={`${user.nombre} ${user.apellido}`} value={user.id} />
                                ))}
                            </Picker>
                        </View>
                    ) : (
                        <Text style={styles.noDataText}>No hay usuarios disponibles para asignar como personal.</Text>
                    )}

                    <Text style={styles.label}>Sucursal Asignada:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedSucursalId}
                            onValueChange={(itemValue) => setSelectedSucursalId(itemValue)}
                            style={styles.picker}
                        >
                            {sucursales.map((sucursal) => (
                                <Picker.Item key={sucursal.id} label={sucursal.nombre} value={sucursal.id} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Tipo de Personal:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. BARBERO, ESTILISTA"
                        value={tipoPersonal}
                        onChangeText={setTipoPersonal}
                    />

                    <Text style={styles.label}>Número de Empleado:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. EMP-001"
                        value={numeroEmpleado}
                        onChangeText={setNumeroEmpleado}
                    />

                    <Text style={styles.label}>Fecha de Contratación (YYYY-MM-DD):</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. 2025-01-15"
                        value={fechaContratacion}
                        onChangeText={setFechaContratacion}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleGuardarPersonal}>
                        <Text style={styles.buttonText}>Crear Personal</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Estilos del componente
const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 10,
    },
    headerIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    formContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#34495e',
        marginTop: 15,
        marginBottom: 5,
    },
    input: {
        height: 45,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 15,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        fontSize: 16,
        color: '#555',
    },
    pickerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    picker: {
        height: 45,
        width: '100%',
    },
    button: {
        backgroundColor: '#27ae60',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F8FA',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    noDataText: {
        color: '#e74c3c',
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fdecec',
        borderRadius: 8,
    }
});
