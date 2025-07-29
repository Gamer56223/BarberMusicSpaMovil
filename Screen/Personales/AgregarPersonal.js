import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { crearPersonal } from "../../Src/Servicios/PersonalService";
import { listarUsuarios } from "../../Src/Servicios/UsuarioService";
import { listarSucursales } from "../../Src/Servicios/SucursalService";
import styles from "../../Styles/Personal/AgregarPersonalStyles";

export default function AgregarPersonal({ navigation }) {
    const [usuarioId, setUsuarioId] = useState("");
    const [sucursalId, setSucursalId] = useState("");
    const [tipoPersonal, setTipoPersonal] = useState("");
    const [numeroEmpleado, setNumeroEmpleado] = useState("");
    const [fechaContratacion, setFechaContratacion] = useState("");
    const [activoEnEmpresa, setActivoEnEmpresa] = useState(true);

    const [usuarios, setUsuarios] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const tiposPersonal = [ { label: "Barbero / Estilista Masculino", value: "BARBERO_ESTILISTA" }, { label: "Cosmiatra / Terapeuta en Estética Avanzada", value: "COSMIATRA_ESTETICA" }, { label: "Masajista / Terapeuta Corporal", value: "MASAJISTA_CORPORAL" }, { label: "Admin General", value: "ADMIN_GENERAL" }, { label: "Admin Sucursal", value: "ADMIN_SUCURSAL" }, { label: "Recepcionista", value: "RECEPCIONISTA" }, { label: "Técnico en Depilación Láser", value: "TECNICO_LASER" }, { label: "Estilista / Colorista", value: "ESTILISTA_COLORISTA" }, { label: "Diseñador de Cejas / Micropigmentador", value: "DISENADOR_CEJAS" }, ];

    const getAlertMessage = (msg, defaultMsg) => {
        if (typeof msg === 'string') return msg;
        if (msg && typeof msg === 'object') {
            if (msg.errors) {
                return Object.values(msg.errors).flat().join('\n');
            }
            if (msg.message) {
                return typeof msg.message === 'string' ? msg.message : JSON.stringify(msg.message);
            }
            return JSON.stringify(msg);
        }
        return defaultMsg;
    };

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            setLoadingData(true);
            try {
                const [resultUsuarios, resultSucursales] = await Promise.all([ listarUsuarios(), listarSucursales() ]);
                if (resultUsuarios.success) {
                    setUsuarios(resultUsuarios.data);
                }
                if (resultSucursales.success) {
                    setSucursales(resultSucursales.data);
                }
            } catch (error) {
                Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos iniciales.");
            } finally {
                setLoadingData(false);
            }
        };
        cargarDatosIniciales();
    }, []);

    const handleGuardar = async () => {
        if (!usuarioId || !sucursalId || !tipoPersonal || !numeroEmpleado || !fechaContratacion) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos.");
            return;
        }

        setLoading(true);
        try {
            const result = await crearPersonal({
                usuario_id: parseInt(usuarioId),
                sucursal_asignada_id: parseInt(sucursalId), // Corregido para coincidir con el backend
                tipo_personal: tipoPersonal,
                numero_empleado: numeroEmpleado,
                fecha_contratacion: fechaContratacion,
                // CORRECCIÓN: Se envía '1' o '0' para máxima compatibilidad
                activo_en_empresa: activoEnEmpresa ? '1' : '0',
            });

            if (result.success) {
                Alert.alert("Éxito", "Personal creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el personal"));
            }
        } catch (error) {
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Nuevo Personal</Text>
                        {loadingData ? <ActivityIndicator size="large" color="#1976D2" /> : (
                            <>
                                <Text style={styles.pickerLabel}>Usuario:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker selectedValue={usuarioId} onValueChange={(itemValue) => setUsuarioId(itemValue)} style={styles.picker}>
                                        <Picker.Item label="-- Seleccione Usuario --" value="" />
                                        {usuarios.map((user) => (
                                            <Picker.Item key={user.id.toString()} label={`${user.nombre} ${user.apellido}`.trim()} value={user.id.toString()} />
                                        ))}
                                    </Picker>
                                </View>
                                <Text style={styles.pickerLabel}>Sucursal:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker selectedValue={sucursalId} onValueChange={(itemValue) => setSucursalId(itemValue)} style={styles.picker}>
                                        <Picker.Item label="-- Seleccione Sucursal --" value="" />
                                        {sucursales.map((suc) => (
                                            <Picker.Item key={suc.id.toString()} label={suc.nombre} value={suc.id.toString()} />
                                        ))}
                                    </Picker>
                                </View>
                                <Text style={styles.pickerLabel}>Tipo de Personal:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker selectedValue={tipoPersonal} onValueChange={(itemValue) => setTipoPersonal(itemValue)} style={styles.picker}>
                                        <Picker.Item label="-- Seleccione Tipo --" value="" />
                                        {tiposPersonal.map((tipo) => (
                                            <Picker.Item key={tipo.value} label={tipo.label} value={tipo.value} />
                                        ))}
                                    </Picker>
                                </View>
                            </>
                        )}
                        <TextInput style={styles.input} placeholder="Número de Empleado" value={numeroEmpleado} onChangeText={setNumeroEmpleado} keyboardType="numeric" />
                        <TextInput style={styles.input} placeholder="Fecha Contratación (YYYY-MM-DD)" value={fechaContratacion} onChangeText={setFechaContratacion} />
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Activo en la Empresa:</Text>
                            <Switch onValueChange={setActivoEnEmpresa} value={activoEnEmpresa} />
                        </View>
                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBoton}>Crear Personal</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.backButtonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}