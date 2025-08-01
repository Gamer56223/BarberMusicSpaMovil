// Archivo: EditarAgendamiento.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

// Importación de servicios (asumiendo que existen en la ruta especificada)
import { editarAgendamiento } from "../../Src/Servicios/AgendamientoService";
import { listarServicios } from "../../Src/Servicios/ServicioService";
import { listarSucursales } from "../../Src/Servicios/SucursalService";

// Importación de íconos para la interfaz de usuario
import Ionicons from '@expo/vector-icons/Ionicons';

// Importación de los estilos
import styles from "../../Styles/Agendamiento/EditarAgendamientoStyles";

/**
 * Función auxiliar para formatear la fecha a un formato compatible con la API (YYYY-MM-DD HH:MM:SS)
 * @param {Date} date - El objeto de fecha a formatear.
 * @returns {string|null} La fecha formateada o null si no se proporciona una fecha.
 */
const formatDateForAPI = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Componente principal para editar un agendamiento.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 */
export default function EditarAgendamiento({ navigation }) {
    const route = useRoute();
    const agendamientoInicial = route.params?.agendamiento;

    // Estado para los campos del formulario
    const [clienteUsuarioId] = useState(agendamientoInicial?.cliente_usuario_id?.toString() || "");
    const [nombreCliente, setNombreCliente] = useState('');
    const [servicioId, setServicioId] = useState(agendamientoInicial?.servicio_id?.toString() || "");
    const [sucursalId, setSucursalId] = useState(agendamientoInicial?.sucursal_id?.toString() || "");
    const [fechaHoraInicio, setFechaHoraInicio] = useState(agendamientoInicial?.fecha_hora_inicio ? new Date(agendamientoInicial.fecha_hora_inicio) : new Date());
    const [fechaHoraFin, setFechaHoraFin] = useState(agendamientoInicial?.fecha_hora_fin ? new Date(agendamientoInicial.fecha_hora_fin) : new Date());
    const [duracion, setDuracion] = useState(0);
    const [precioFinal, setPrecioFinal] = useState(agendamientoInicial?.precio_final?.toString() || "");
    const [estado, setEstado] = useState(agendamientoInicial?.estado || "");
    const [notasCliente, setNotasCliente] = useState(agendamientoInicial?.notas_cliente || "");
    const [notasInternas, setNotasInternas] = useState(agendamientoInicial?.notas_internas || "");

    // Estados para las listas de opciones del Picker
    const [servicios, setServicios] = useState([]);
    const [sucursales, setSucursales] = useState([]);

    // Estados para el manejo de la carga y la UI
    const [loading, setLoading] = useState(false); // Carga al guardar
    const [loadingDependencies, setLoadingDependencies] = useState(true); // Carga inicial de listas

    // Estados para controlar la visibilidad de los selectores de fecha y hora
    const [showDatePickerInicio, setShowDatePickerInicio] = useState(false);
    const [showTimePickerInicio, setShowTimePickerInicio] = useState(false);
    const [showDatePickerFin, setShowDatePickerFin] = useState(false);
    const [showTimePickerFin, setShowTimePickerFin] = useState(false);

    const esEdicion = !!agendamientoInicial;
    const estadosAgendamiento = ["Programado", "Confirmado", "Cancelado por Cliente", "Realizado", "No Asistió", "En Proceso"];

    /**
     * Función auxiliar para obtener un mensaje de alerta legible de un objeto de error.
     * @param {string|object} msg - El mensaje de error o el objeto de error.
     * @param {string} defaultMsg - El mensaje por defecto si no se puede parsear el error.
     * @returns {string} El mensaje de alerta a mostrar.
     */
    const getAlertMessage = (msg, defaultMsg) => {
        if (typeof msg === 'string') {
            return msg;
        }
        if (msg && typeof msg === 'object') {
            if (msg.errors) {
                const messages = Object.values(msg.errors).flat();
                return messages.join('\n');
            }
            if (msg.message) {
                if (typeof msg.message === 'string') {
                    return msg.message;
                }
                return JSON.stringify(msg.message);
            }
            return JSON.stringify(msg);
        }
        return defaultMsg;
    };

    /**
     * Hook para cargar las listas de servicios y sucursales al inicio del componente.
     */
    useEffect(() => {
        const cargarDependencias = async () => {
            setLoadingDependencies(true);
            try {
                const [serviciosRes, sucursalesRes] = await Promise.all([
                    listarServicios(),
                    listarSucursales()
                ]);

                // Asignar el nombre del cliente directamente desde agendamientoInicial
                setNombreCliente(agendamientoInicial?.nombreCliente || 'Cliente no encontrado');

                if (serviciosRes.success) setServicios(serviciosRes.data);
                else Alert.alert("Error", serviciosRes.message || "No se pudieron cargar los servicios.");

                if (sucursalesRes.success) setSucursales(sucursalesRes.data);
                else Alert.alert("Error", sucursalesRes.message || "No se pudieron cargar las sucursales.");

                if (esEdicion) {
                    // Convertir los IDs a string para que coincidan con los valores del Picker
                    if (agendamientoInicial?.servicio_id) setServicioId(String(agendamientoInicial.servicio_id));
                    if (agendamientoInicial?.sucursal_id) setSucursalId(String(agendamientoInicial.sucursal_id));
                    
                    if (agendamientoInicial?.estado && estadosAgendamiento.includes(agendamientoInicial.estado)) {
                        setEstado(agendamientoInicial.estado);
                    } else {
                        setEstado(estadosAgendamiento[0]);
                    }

                    // Calcular la duración inicial del agendamiento para usarla en los ajustes
                    const inicio = new Date(agendamientoInicial.fecha_hora_inicio);
                    const fin = new Date(agendamientoInicial.fecha_hora_fin);
                    setDuracion(fin.getTime() - inicio.getTime());
                } else {
                    // Configurar valores por defecto para un nuevo agendamiento
                    if (serviciosRes.data.length > 0) setServicioId(String(serviciosRes.data[0].id));
                    if (sucursalesRes.data.length > 0) setSucursalId(String(sucursalesRes.data[0].id));
                    setEstado("Programado");
                }
            } catch (error) {
                console.error("Error al cargar dependencias de agendamiento:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar las dependencias.");
            } finally {
                setLoadingDependencies(false);
            }
        };
        cargarDependencias();
    }, [esEdicion, agendamientoInicial]);

    /**
     * Hook para ajustar la fecha de finalización automáticamente si se cambia la fecha de inicio o la duración.
     */
    useEffect(() => {
        if (fechaHoraInicio && duracion > 0) {
            const nuevaFechaFin = new Date(fechaHoraInicio.getTime() + duracion);
            setFechaHoraFin(nuevaFechaFin);
        }
    }, [fechaHoraInicio, duracion]);

    /**
     * Maneja el evento de guardar el formulario (crear o editar agendamiento).
     */
    const handleGuardar = async () => {
        // 1. Validación de campos obligatorios
        if (!clienteUsuarioId || !servicioId || !sucursalId || !fechaHoraInicio || !fechaHoraFin || !precioFinal || !estado) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
            return;
        }

        const precioNumerico = parseFloat(precioFinal);
        if (isNaN(precioNumerico) || precioNumerico < 0) {
            Alert.alert("Formato de Precio", "Por favor, ingrese un precio final válido.");
            return;
        }

        // 2. Validación de fechas
        if (fechaHoraFin <= fechaHoraInicio) {
            Alert.alert("Error de Fechas", "La fecha y hora de finalización debe ser posterior a la de inicio.");
            return;
        }

        setLoading(true);
        let result;
        try {
            // 3. Preparación de los datos para enviar a la API
            const dataToSave = {
                cliente_usuario_id: parseInt(clienteUsuarioId),
                servicio_id: parseInt(servicioId),
                sucursal_id: parseInt(sucursalId),
                fecha_hora_inicio: formatDateForAPI(fechaHoraInicio),
                fecha_hora_fin: formatDateForAPI(fechaHoraFin),
                precio_final: precioNumerico,
                estado: estado,
                notas_cliente: notasCliente,
                notas_internas: notasInternas,
            };

            console.log("Datos a enviar a la API:", JSON.stringify(dataToSave, null, 2));

            // 4. Llamada al servicio para editar el agendamiento
            result = await editarAgendamiento(agendamientoInicial.id, dataToSave);

            // 5. Manejo de la respuesta de la API
            if (result.success) {
                Alert.alert("Éxito", "Agendamiento actualizado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar el agendamiento"));
            }
        } catch (error) {
            console.error("Error al guardar agendamiento:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el agendamiento."));
        } finally {
            setLoading(false);
        }
    };

    // Funciones para manejar los cambios en los selectores de fecha y hora de inicio
    const handleDateChangeInicio = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setTimeout(() => setShowDatePickerInicio(false), 50);
        } else {
            setShowDatePickerInicio(false);
        }
        if (selectedDate) {
            const newDate = new Date(fechaHoraInicio);
            newDate.setFullYear(selectedDate.getFullYear());
            newDate.setMonth(selectedDate.getMonth());
            newDate.setDate(selectedDate.getDate());
            setFechaHoraInicio(newDate);
        }
    };

    const handleTimeChangeInicio = (event, selectedTime) => {
        if (Platform.OS === 'android') {
            setTimeout(() => setShowTimePickerInicio(false), 50);
        } else {
            setShowTimePickerInicio(false);
        }
        if (selectedTime) {
            const newDate = new Date(fechaHoraInicio);
            newDate.setHours(selectedTime.getHours());
            newDate.setMinutes(selectedTime.getMinutes());
            setFechaHoraInicio(newDate);
        }
    };

    // Funciones para manejar los cambios en los selectores de fecha y hora de fin
    const handleDateChangeFin = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setTimeout(() => setShowDatePickerFin(false), 50);
        } else {
            setShowDatePickerFin(false);
        }
        if (selectedDate) {
            const newDate = new Date(fechaHoraFin);
            newDate.setFullYear(selectedDate.getFullYear());
            newDate.setMonth(selectedDate.getMonth());
            newDate.setDate(selectedDate.getDate());
            setFechaHoraFin(newDate);
        }
    };

    const handleTimeChangeFin = (event, selectedTime) => {
        if (Platform.OS === 'android') {
            setTimeout(() => setShowTimePickerFin(false), 50);
        } else {
            setShowTimePickerFin(false);
        }
        if (selectedTime) {
            const newDate = new Date(fechaHoraFin);
            newDate.setHours(selectedTime.getHours());
            newDate.setMinutes(selectedTime.getMinutes());
            setFechaHoraFin(newDate);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{esEdicion ? "Editar Agendamiento" : "Nuevo Agendamiento"}</Text>

                        {loadingDependencies ? (
                            <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
                        ) : (
                            <>
                                {/* Campo Cliente: No editable, solo se muestra el nombre */}
                                <Text style={styles.pickerLabelActual}>Cliente:</Text>
                                <Text style={styles.pickerDisplay}>{nombreCliente}</Text>

                                {/* Campo Servicio: Selector de servicio */}
                                <Text style={styles.pickerLabelActual}>Servicio:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={servicioId}
                                        onValueChange={(itemValue) => setServicioId(itemValue)}
                                        style={styles.picker}
                                        itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                                    >
                                        <Picker.Item label="-- Seleccione Servicio --" value="" />
                                        {servicios.map((service) => (
                                            <Picker.Item key={String(service.id)} label={service.nombre} value={String(service.id)} />
                                        ))}
                                    </Picker>
                                </View>

                                {/* Campo Sucursal: Selector de sucursal */}
                                <Text style={styles.pickerLabelActual}>Sucursal:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={sucursalId}
                                        onValueChange={(itemValue) => setSucursalId(itemValue)}
                                        style={styles.picker}
                                        itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                                    >
                                        <Picker.Item label="-- Seleccione Sucursal --" value="" />
                                        {sucursales.map((sucursal) => (
                                            <Picker.Item key={String(sucursal.id)} label={sucursal.nombre} value={String(sucursal.id)} />
                                        ))}
                                    </Picker>
                                </View>
                            </>
                        )}

                        {/* Campo Fecha de Inicio: Botón para abrir el selector de fecha */}
                        <Text style={styles.label}>Fecha de Inicio:</Text>
                        <TouchableOpacity onPress={() => setShowDatePickerInicio(true)} style={styles.datePickerButton}>
                            <Text style={styles.datePickerButtonText}>{fechaHoraInicio.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showDatePickerInicio && (
                            <DateTimePicker
                                testID="datePickerInicio"
                                value={fechaHoraInicio}
                                mode="date"
                                display="default"
                                onChange={handleDateChangeInicio}
                            />
                        )}

                        {/* Campo Hora de Inicio: Botón para abrir el selector de hora */}
                        <Text style={styles.label}>Hora de Inicio:</Text>
                        <TouchableOpacity onPress={() => setShowTimePickerInicio(true)} style={styles.datePickerButton}>
                            <Text style={styles.datePickerButtonText}>{fechaHoraInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        </TouchableOpacity>
                        {showTimePickerInicio && (
                            <DateTimePicker
                                testID="timePickerInicio"
                                value={fechaHoraInicio}
                                mode="time"
                                display="default"
                                onChange={handleTimeChangeInicio}
                            />
                        )}

                        {/* Campo Fecha de Fin: Botón para abrir el selector de fecha */}
                        <Text style={styles.label}>Fecha de Fin:</Text>
                        <TouchableOpacity onPress={() => setShowDatePickerFin(true)} style={styles.datePickerButton}>
                            <Text style={styles.datePickerButtonText}>{fechaHoraFin.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showDatePickerFin && (
                            <DateTimePicker
                                testID="datePickerFin"
                                value={fechaHoraFin}
                                mode="date"
                                display="default"
                                onChange={handleDateChangeFin}
                            />
                        )}

                        {/* Campo Hora de Fin: Botón para abrir el selector de hora */}
                        <Text style={styles.label}>Hora de Fin:</Text>
                        <TouchableOpacity onPress={() => setShowTimePickerFin(true)} style={styles.datePickerButton}>
                            <Text style={styles.datePickerButtonText}>{fechaHoraFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        </TouchableOpacity>
                        {showTimePickerFin && (
                            <DateTimePicker
                                testID="timePickerFin"
                                value={fechaHoraFin}
                                mode="time"
                                display="default"
                                onChange={handleTimeChangeFin}
                            />
                        )}

                        {/* Campo Precio Final: Campo de entrada de texto numérico */}
                        <Text style={styles.label}>Precio Final:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingrese el precio final"
                            placeholderTextColor="#888"
                            value={precioFinal}
                            onChangeText={setPrecioFinal}
                            keyboardType="numeric"
                        />

                        {/* Campo Estado: Selector de estado */}
                        <Text style={styles.pickerLabelActual}>Estado:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={estado}
                                onValueChange={(itemValue) => setEstado(itemValue)}
                                style={styles.picker}
                                itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                            >
                                <Picker.Item label="-- Seleccione Estado --" value="" />
                                {estadosAgendamiento.map((est) => (
                                    <Picker.Item key={est} label={est} value={est} />
                                ))}
                            </Picker>
                        </View>

                        {/* Campo Notas del Cliente: Campo de texto multilínea */}
                        <Text style={styles.label}>Notas del Cliente:</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            placeholder="Ingrese notas del cliente"
                            placeholderTextColor="#888"
                            value={notasCliente}
                            onChangeText={setNotasCliente}
                            multiline
                            numberOfLines={4}
                        />

                        {/* Campo Notas Internas: Campo de texto multilínea */}
                        <Text style={styles.label}>Notas Internas:</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            placeholder="Ingrese notas internas"
                            placeholderTextColor="#888"
                            value={notasInternas}
                            onChangeText={setNotasInternas}
                            multiline
                            numberOfLines={4}
                        />

                        {/* Botón para Guardar los cambios */}
                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingDependencies}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Agendamiento"}</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        {/* Botón para Volver a la pantalla anterior */}
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-circle-outline" size={24} color="#555" />
                            <Text style={styles.backButtonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
