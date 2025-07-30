import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';

import { editarPromocion, DetallePromocionId } from "../../Src/Servicios/PromocionService"; 

import styles from "../../Styles/Promocion/EditarPromocionStyles";

export default function EditarPromocion({ navigation }) {
    const route = useRoute();
    const promocionId = route.params?.promocion?.id || route.params?.promocionId;

    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipoDescuento, setTipoDescuento] = useState("Porcentaje"); // Valor inicial
    const [valorDescuento, setValorDescuento] = useState("");
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [usosMaximosTotal, setUsosMaximosTotal] = useState("");
    const [usosMaximosPorCliente, setUsosMaximosPorCliente] = useState("");
    const [aplicaATodosProductos, setAplicaATodosProductos] = useState("0");
    const [aplicaATodosServicios, setAplicaATodosServicios] = useState("0");
    const [activo, setActivo] = useState("1");

    const [loading, setLoading] = useState(true);
    const [showFechaInicioPicker, setShowFechaInicioPicker] = useState(false);
    const [showFechaFinPicker, setShowFechaFinPicker] = useState(false);
    
    // 1. CORRECCIÓN: Los 'value' ahora son exactamente como las etiquetas.
    const tiposDescuento = [
        { label: "Porcentaje", value: "Porcentaje" },
        { label: "Monto Fijo", value: "Monto Fijo" },
    ];

    useEffect(() => {
        if (!promocionId) {
            Alert.alert("Error", "No se recibió un ID de promoción válido.");
            navigation.goBack();
            return;
        }

        const cargarDatosPromocion = async () => {
            try {
                const res = await DetallePromocionId(promocionId);
                if (res.success) {
                    const promo = res.data;
                    setCodigo(promo.codigo || "");
                    setNombre(promo.nombre || "");
                    setDescripcion(promo.descripcion || "");
                    // 2. CORRECCIÓN: Se quita la conversión a minúsculas.
                    setTipoDescuento(promo.tipo_descuento || "Porcentaje");
                    setValorDescuento(promo.valor_descuento?.toString() || "");
                    setFechaInicio(promo.fecha_inicio ? new Date(promo.fecha_inicio) : new Date());
                    setFechaFin(promo.fecha_fin ? new Date(promo.fecha_fin) : new Date());
                    setUsosMaximosTotal(promo.usos_maximos_total?.toString() || "1");
                    setUsosMaximosPorCliente(promo.usos_maximos_por_cliente?.toString() || "1");
                    setAplicaATodosProductos(promo.aplica_a_todos_productos ? "1" : "0");
                    setAplicaATodosServicios(promo.aplica_a_todos_servicios ? "1" : "0");
                    setActivo(promo.activo ? "1" : "0");
                } else {
                    Alert.alert("Error", "No se pudieron cargar los datos.");
                    navigation.goBack();
                }
            } catch (error) {
                Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
            } finally {
                setLoading(false);
            }
        };
        cargarDatosPromocion();
    }, [promocionId]);
    
    const getAlertMessage = (msg, defaultMsg) => {
        if (typeof msg === 'string') return msg;
        if (msg && typeof msg === 'object') {
            if (msg.errors) return Object.values(msg.errors).flat().join('\n');
            if (msg.message) return typeof msg.message === 'string' ? msg.message : JSON.stringify(msg.message);
            return JSON.stringify(msg);
        }
        return defaultMsg;
    };

    const onFechaInicioChange = (event, selectedDate) => {
        const currentDate = selectedDate || fechaInicio;
        setShowFechaInicioPicker(Platform.OS === 'ios');
        setFechaInicio(currentDate);
    };

    const onFechaFinChange = (event, selectedDate) => {
        const currentDate = selectedDate || fechaFin;
        setShowFechaFinPicker(Platform.OS === 'ios');
        setFechaFin(currentDate);
    };

    const formatDateForAPI = (date, endOfDay = false) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const time = endOfDay ? '23:59:59' : '00:00:00';
        return `${year}-${month}-${day} ${time}`;
    };

    const handleGuardar = async () => {
        if (!codigo || !nombre || !tipoDescuento || !valorDescuento) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('codigo', codigo);
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('tipo_descuento', tipoDescuento);
            formData.append('valor_descuento', parseFloat(valorDescuento));
            formData.append('fecha_inicio', formatDateForAPI(fechaInicio));
            formData.append('fecha_fin', formatDateForAPI(fechaFin, true));
            formData.append('usos_maximos_total', parseInt(usosMaximosTotal || '1'));
            formData.append('usos_maximos_por_cliente', parseInt(usosMaximosPorCliente || '1'));
            formData.append('aplica_a_todos_productos', aplicaATodosProductos);
            formData.append('aplica_a_todos_servicios', aplicaATodosServicios);
            formData.append('activo', activo);
            formData.append('_method', 'PUT');

            const result = await editarPromocion(promocionId, formData);

            if (result.success) {
                Alert.alert("Éxito", "Promoción actualizada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la promoción"));
            }
        } catch (error) {
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado."));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#1976D2" style={{ flex: 1 }} />;
    }

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Editar Promoción</Text>

                        <TextInput style={styles.input} placeholder="Código" value={codigo} onChangeText={setCodigo} />
                        <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                        <TextInput style={styles.inputMultiline} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} multiline />

                        <Text style={styles.pickerLabel}>Tipo de Descuento:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={tipoDescuento} onValueChange={(itemValue) => setTipoDescuento(itemValue)} style={styles.picker}>
                                {tiposDescuento.map((tipo) => ( <Picker.Item key={tipo.value} label={tipo.label} value={tipo.value} /> ))}
                            </Picker>
                        </View>

                        <TextInput style={styles.input} placeholder="Valor del Descuento" value={valorDescuento} onChangeText={setValorDescuento} keyboardType="numeric" />

                        <Text style={styles.pickerLabel}>Fecha de Inicio:</Text>
                        <TouchableOpacity onPress={() => setShowFechaInicioPicker(true)} style={styles.datePickerButton}>
                            <Text style={styles.datePickerButtonText}>{fechaInicio.toLocaleDateString('es-CO')}</Text>
                        </TouchableOpacity>
                        {showFechaInicioPicker && ( <DateTimePicker value={fechaInicio} mode="date" display="default" onChange={onFechaInicioChange} /> )}

                        <Text style={styles.pickerLabel}>Fecha de Fin:</Text>
                        <TouchableOpacity onPress={() => setShowFechaFinPicker(true)} style={styles.datePickerButton}>
                            <Text style={styles.datePickerButtonText}>{fechaFin.toLocaleDateString('es-CO')}</Text>
                        </TouchableOpacity>
                        {showFechaFinPicker && ( <DateTimePicker value={fechaFin} mode="date" display="default" onChange={onFechaFinChange} /> )}

                        <TextInput style={styles.input} placeholder="Usos Máximos Totales" value={usosMaximosTotal} onChangeText={setUsosMaximosTotal} keyboardType="numeric" />
                        <TextInput style={styles.input} placeholder="Usos Máximos por Cliente" value={usosMaximosPorCliente} onChangeText={setUsosMaximosPorCliente} keyboardType="numeric" />

                        <Text style={styles.pickerLabel}>Aplica a todos los Productos:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={aplicaATodosProductos} onValueChange={(itemValue) => setAplicaATodosProductos(itemValue)} style={styles.picker}>
                                <Picker.Item label="Sí" value="1" />
                                <Picker.Item label="No" value="0" />
                            </Picker>
                        </View>

                        <Text style={styles.pickerLabel}>Aplica a todos los Servicios:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={aplicaATodosServicios} onValueChange={(itemValue) => setAplicaATodosServicios(itemValue)} style={styles.picker}>
                                <Picker.Item label="Sí" value="1" />
                                <Picker.Item label="No" value="0" />
                            </Picker>
                        </View>

                        <Text style={styles.pickerLabel}>Activo:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={activo} onValueChange={(itemValue) => setActivo(itemValue)} style={styles.picker}>
                                <Picker.Item label="Sí" value="1" />
                                <Picker.Item label="No" value="0" />
                            </Picker>
                        </View>

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