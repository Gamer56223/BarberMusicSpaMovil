import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Modal
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { editarAgendamiento, DetalleAgendamientoId } from "../../Src/Servicios/AgendamientoService";
import { listarPersonal } from "../../Src/Servicios/PersonalService";
import { listarUsuarios } from '../../Src/Servicios/UsuarioService';
import { listarServicios } from "../../Src/Servicios/ServicioService";
import { listarSucursales } from "../../Src/Servicios/SucursalService";
import styles from "../../Styles/Agendamiento/EditarAgendamientoStyles";

export default function EditarAgendamiento({ route, navigation }) {
    const { agendamientoId } = route.params;

    const [loading, setLoading] = useState(true);

    // Estados para los campos editables
    const [estado, setEstado] = useState("");
    const [notasInternas, setNotasInternas] = useState("");
    const [personalId, setPersonalId] = useState(null);
    const [clienteUsuarioId, setClienteUsuarioId] = useState(null);
    const [servicioId, setServicioId] = useState(null);
    const [sucursalId, setSucursalId] = useState(null);
    const [fechaHoraInicio, setFechaHoraInicio] = useState("");
    const [fechaHoraFin, setFechaHoraFin] = useState("");

    // Estados para los datos de los selectores
    const [personalList, setPersonalList] = useState([]);
    const [clientesList, setClientesList] = useState([]);
    const [serviciosList, setServiciosList] = useState([]);
    const [sucursalesList, setSucursalesList] = useState([]);

    // Estados para los modales de selección
    const [showEstadoModal, setShowEstadoModal] = useState(false);
    const [showPersonalModal, setShowPersonalModal] = useState(false);
    const [showClienteModal, setShowClienteModal] = useState(false);
    const [showServicioModal, setShowServicioModal] = useState(false);
    const [showSucursalModal, setShowSucursalModal] = useState(false);

    // Estados válidos en MAYÚSCULAS para tu backend de Laravel
    const estadosValidos = ["PROGRAMADA", "CONFIRMADA", "CANCELADA"];

    // Función para obtener el nombre de un item dado su ID de una lista
    const getItemNameById = (list, id, idKey, nameKeys) => {
        if (!list || !id) return 'No Asignado';
        const item = list.find(item => item[idKey] === id);
        if (!item) return 'No Asignado';
        // Concatenar los nombres de las claves, manejando las que puedan ser nulas o no existan
        return nameKeys.map(key => item[key] || '').filter(Boolean).join(' ').trim() || 'No Asignado';
    };

    useEffect(() => {
        const cargarDatos = async () => {
            if (!agendamientoId) {
                Alert.alert("Error de navegación", "No se proporcionó un ID de agendamiento válido.");
                setLoading(false);
                navigation.goBack();
                return;
            }

            try {
                // Cargar datos de agendamiento y listas para selectores
                const [agendamientoRes, personalRes, clientesRes, serviciosRes, sucursalesRes] = await Promise.all([
                    DetalleAgendamientoId(agendamientoId),
                    listarPersonal(),
                    listarUsuarios(),
                    listarServicios(),
                    listarSucursales()
                ]);

                if (agendamientoRes.success && agendamientoRes.data) {
                    const data = agendamientoRes.data;
                    // Inicializar estados con los datos del agendamiento
                    setEstado(data.estado || "");
                    setNotasInternas(data.notas_internas || "");
                    setPersonalId(data.personal_id);
                    setClienteUsuarioId(data.cliente_usuario_id);
                    setServicioId(data.servicio_id);
                    setSucursalId(data.sucursal_id);
                    setFechaHoraInicio(data.fecha_hora_inicio || "");
                    setFechaHoraFin(data.fecha_hora_fin || "");
                } else {
                    Alert.alert("Error", "No se pudieron cargar los datos del agendamiento.");
                    navigation.goBack();
                    return;
                }

                // Cargar listas para los selectores
                if (personalRes.success && Array.isArray(personalRes.data)) {
                    setPersonalList(personalRes.data);
                }
                if (clientesRes.success && Array.isArray(clientesRes.data)) {
                    setClientesList(clientesRes.data);
                }
                if (serviciosRes.success && Array.isArray(serviciosRes.data)) {
                    setServiciosList(serviciosRes.data);
                }
                if (sucursalesRes.success && Array.isArray(sucursalesRes.data)) {
                    setSucursalesList(sucursalesRes.data);
                }

            } catch (error) {
                console.error("Error al cargar datos:", error);
                Alert.alert("Error", "Ocurrió un error al cargar el agendamiento.");
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, [agendamientoId, navigation]);

    const handleGuardar = async () => {
        if (!estado || !personalId || !clienteUsuarioId || !servicioId || !sucursalId || !fechaHoraInicio || !fechaHoraFin) {
            Alert.alert("Campos incompletos", "Por favor, complete todos los campos obligatorios.");
            return;
        }
        if (!estadosValidos.includes(estado.toUpperCase())) {
            Alert.alert("Error de validación", `El estado '${estado}' no es un valor válido. Los valores permitidos son: ${estadosValidos.join(', ')}.`);
            return;
        }

        setLoading(true);
        try {
            const agendamientoPayload = {
                estado: estado.trim().toUpperCase(),
                notas_internas: notasInternas.trim(),
                personal_id: personalId,
                cliente_usuario_id: clienteUsuarioId,
                servicio_id: servicioId,
                sucursal_id: sucursalId,
                fecha_hora_inicio: fechaHoraInicio,
                fecha_hora_fin: fechaHoraFin,
            };

            const result = await editarAgendamiento(agendamientoId, agendamientoPayload);

            if (result.success) {
                Alert.alert("Éxito", "Agendamiento actualizado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo actualizar el agendamiento.");
            }
        } catch (error) {
            console.error("Error al editar agendamiento:", error);
            Alert.alert("Error", "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    // Componente genérico para los selectores modales
    const renderModalSelector = (visible, list, idKey, nameKeys, onSelect, onClose, title) => (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <ScrollView style={styles.modalScrollView}>
                            {list.map((item, index) => (
                                <TouchableOpacity
                                    key={item[idKey] ? item[idKey].toString() : `item-${index}`}
                                    style={styles.modalOption}
                                    onPress={() => onSelect(item[idKey])}
                                >
                                    <Text style={styles.modalOptionText}>
                                        {getItemNameById(list, item[idKey], idKey, nameKeys)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
                            <Text style={styles.modalCloseText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Cargando datos...</Text>
            </View>
        );
    }
    
    // Obtener la lista de personal con nombres de usuario
    const personalConNombres = personalList.map(p => ({
        ...p,
        nombre: getItemNameById(clientesList, p.usuario_id, 'id', ['nombre', 'apellido'])
    }));

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Editar Agendamiento #{agendamientoId}</Text>
                        
                        {/* Campo: Estado */}
                        <Text style={styles.label}>Estado del Agendamiento</Text>
                        <TouchableOpacity style={styles.input} onPress={() => setShowEstadoModal(true)}>
                            <Text style={estado ? styles.pickerText : styles.pickerPlaceholder}>
                                {estado || "Seleccione el Estado"}
                            </Text>
                        </TouchableOpacity>
                        {renderModalSelector(
                            showEstadoModal,
                            estadosValidos.map(s => ({ estado: s })),
                            'estado',
                            ['estado'],
                            (value) => { setEstado(value); setShowEstadoModal(false); },
                            () => setShowEstadoModal(false),
                            "Seleccionar Estado"
                        )}

                        {/* Campo: Personal */}
                        <Text style={styles.label}>Personal Asignado</Text>
                        <TouchableOpacity style={styles.input} onPress={() => setShowPersonalModal(true)}>
                            <Text style={personalId ? styles.pickerText : styles.pickerPlaceholder}>
                                {getItemNameById(personalConNombres, personalId, 'personal_id', ['nombre']) || "Seleccione Personal"}
                            </Text>
                        </TouchableOpacity>
                        {renderModalSelector(
                            showPersonalModal,
                            personalConNombres,
                            'personal_id',
                            ['nombre'],
                            (value) => { setPersonalId(value); setShowPersonalModal(false); },
                            () => setShowPersonalModal(false),
                            "Seleccionar Personal"
                        )}

                        {/* Campo: Cliente */}
                        <Text style={styles.label}>Cliente</Text>
                        <TouchableOpacity style={styles.input} onPress={() => setShowClienteModal(true)}>
                            <Text style={clienteUsuarioId ? styles.pickerText : styles.pickerPlaceholder}>
                                {getItemNameById(clientesList, clienteUsuarioId, 'id', ['nombre', 'apellido']) || "Seleccione Cliente"}
                            </Text>
                        </TouchableOpacity>
                        {renderModalSelector(
                            showClienteModal,
                            clientesList,
                            'id',
                            ['nombre', 'apellido'],
                            (value) => { setClienteUsuarioId(value); setShowClienteModal(false); },
                            () => setShowClienteModal(false),
                            "Seleccionar Cliente"
                        )}

                        {/* Campo: Servicio */}
                        <Text style={styles.label}>Servicio</Text>
                        <TouchableOpacity style={styles.input} onPress={() => setShowServicioModal(true)}>
                            <Text style={servicioId ? styles.pickerText : styles.pickerPlaceholder}>
                                {getItemNameById(serviciosList, servicioId, 'id', ['nombre']) || "Seleccione Servicio"}
                            </Text>
                        </TouchableOpacity>
                        {renderModalSelector(
                            showServicioModal,
                            serviciosList,
                            'id',
                            ['nombre'],
                            (value) => { setServicioId(value); setShowServicioModal(false); },
                            () => setShowServicioModal(false),
                            "Seleccionar Servicio"
                        )}

                        {/* Campo: Sucursal */}
                        <Text style={styles.label}>Sucursal</Text>
                        <TouchableOpacity style={styles.input} onPress={() => setShowSucursalModal(true)}>
                            <Text style={sucursalId ? styles.pickerText : styles.pickerPlaceholder}>
                                {getItemNameById(sucursalesList, sucursalId, 'id', ['nombre']) || "Seleccione Sucursal"}
                            </Text>
                        </TouchableOpacity>
                        {renderModalSelector(
                            showSucursalModal,
                            sucursalesList,
                            'id',
                            ['nombre'],
                            (value) => { setSucursalId(value); setShowSucursalModal(false); },
                            () => setShowSucursalModal(false),
                            "Seleccionar Sucursal"
                        )}

                        {/* Campo: Fecha y Hora de Inicio */}
                        <Text style={styles.label}>Fecha y Hora de Inicio</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="YYYY-MM-DD HH:MM:SS" 
                            value={fechaHoraInicio} 
                            onChangeText={setFechaHoraInicio} 
                        />

                        {/* Campo: Fecha y Hora de Fin */}
                        <Text style={styles.label}>Fecha y Hora de Fin</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="YYYY-MM-DD HH:MM:SS" 
                            value={fechaHoraFin} 
                            onChangeText={setFechaHoraFin} 
                        />

                        {/* Campo: Notas Internas */}
                        <Text style={styles.label}>Notas Internas</Text>
                        <TextInput 
                            style={[styles.input, styles.multilineInput]} 
                            placeholder="Notas Internas (Opcional)" 
                            value={notasInternas} 
                            onChangeText={setNotasInternas} 
                            multiline 
                        />
                        
                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBoton}>Guardar Cambios</Text>}
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
