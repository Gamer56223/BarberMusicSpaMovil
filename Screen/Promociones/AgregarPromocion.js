import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { crearPromocion } from "../../Src/Servicios/PromocionService";
import styles from "../../Styles/Promocion/AgregarPromocionStyles";

export default function AgregarPromocion({ navigation }) {
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipoDescuento, setTipoDescuento] = useState("PORCENTAJE");
    const [valorDescuento, setValorDescuento] = useState("");
    
    const [usosMaximosTotal, setUsosMaximosTotal] = useState("1");
    const [usosMaximosPorCliente, setUsosMaximosPorCliente] = useState("1");

    const [activo, setActivo] = useState(true);
    const [aplicaATodosProductos, setAplicaATodosProductos] = useState(false);
    const [aplicaATodosServicios, setAplicaATodosServicios] = useState(false);
    const [loading, setLoading] = useState(false);

    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [showInicioPicker, setShowInicioPicker] = useState(false);
    const [showFinPicker, setShowFinPicker] = useState(false);

    const tiposDescuento = [ { label: "Porcentaje", value: "PORCENTAJE" }, { label: "Monto Fijo", value: "MONTO_FIJO" } ];

    const getAlertMessage = (msg, defaultMsg) => {
        if (typeof msg === 'string') return msg;
        if (msg && typeof msg === 'object') {
            if (msg.errors) return Object.values(msg.errors).flat().join('\n');
            if (msg.message) return typeof msg.message === 'string' ? msg.message : JSON.stringify(msg.message);
            return JSON.stringify(msg);
        }
        return defaultMsg;
    };
    
    const onChangeInicio = (event, selectedDate) => {
        const currentDate = selectedDate || fechaInicio;
        setShowInicioPicker(Platform.OS === 'ios');
        setFechaInicio(currentDate);
    };

    const onChangeFin = (event, selectedDate) => {
        const currentDate = selectedDate || fechaFin;
        setShowFinPicker(Platform.OS === 'ios');
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
            const result = await crearPromocion({
                codigo: codigo,
                nombre: nombre,
                descripcion: descripcion,
                tipo_descuento: tipoDescuento,
                valor_descuento: parseFloat(valorDescuento),
                fecha_inicio: formatDateForAPI(fechaInicio),
                fecha_fin: formatDateForAPI(fechaFin, true),
                usos_maximos_total: parseInt(usosMaximosTotal || '1'),
                usos_maximos_por_cliente: parseInt(usosMaximosPorCliente || '1'),
                usos_actuales: 0,
                activo: activo ? '1' : '0',
                aplica_a_todos_productos: aplicaATodosProductos ? '1' : '0',
                aplica_a_todos_servicios: aplicaATodosServicios ? '1' : '0',
            });

            if (result.success) {
                Alert.alert("Éxito", "Promoción creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la promoción"));
            }
        } catch (error) {
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado."));
        } finally {
            setLoading(false);
        }
    };

    // Estilos internos para las etiquetas
    const localStyles = StyleSheet.create({
        label: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#34495e',
            marginTop: 15,
            marginBottom: 5,
        },
    });

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Nueva Promoción</Text>

                        <Text style={localStyles.label}>Código</Text>
                        <TextInput style={styles.input} placeholder="ej. VERANO2025" value={codigo} onChangeText={setCodigo} />

                        <Text style={localStyles.label}>Nombre de la Promoción</Text>
                        <TextInput style={styles.input} placeholder="Nombre descriptivo" value={nombre} onChangeText={setNombre} />
                        
                        <Text style={localStyles.label}>Descripción</Text>
                        <TextInput style={styles.inputMultiline} placeholder="Descripción detallada (Opcional)" value={descripcion} onChangeText={setDescripcion} multiline />

                        <Text style={localStyles.label}>Tipo de Descuento:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={tipoDescuento} onValueChange={(itemValue) => setTipoDescuento(itemValue)} style={styles.picker}>
                                {tiposDescuento.map((tipo) => ( <Picker.Item key={tipo.value} label={tipo.label} value={tipo.value} /> ))}
                            </Picker>
                        </View>

                        <Text style={localStyles.label}>Valor del Descuento</Text>
                        <TextInput style={styles.input} placeholder="ej. 15 (para 15% o $15)" value={valorDescuento} onChangeText={setValorDescuento} keyboardType="numeric" />
                        
                        <Text style={localStyles.label}>Fecha de Inicio</Text>
                        <TouchableOpacity onPress={() => setShowInicioPicker(true)} style={styles.datePickerButton}>
                            <Text style={styles.datePickerButtonText}>{fechaInicio.toLocaleDateString('es-CO')}</Text>
                        </TouchableOpacity>
                        {showInicioPicker && ( <DateTimePicker value={fechaInicio} mode={'date'} display="default" onChange={onChangeInicio} /> )}

                        <Text style={localStyles.label}>Fecha de Fin</Text>
                        <TouchableOpacity onPress={() => setShowFinPicker(true)} style={styles.datePickerButton}>
                               <Text style={styles.datePickerButtonText}>{fechaFin.toLocaleDateString('es-CO')}</Text>
                        </TouchableOpacity>
                        {showFinPicker && ( <DateTimePicker value={fechaFin} mode={'date'} display="default" onChange={onChangeFin} /> )}

                        <Text style={localStyles.label}>Usos Máximos Totales</Text>
                        <TextInput style={styles.input} placeholder="mínimo 1" value={usosMaximosTotal} onChangeText={setUsosMaximosTotal} keyboardType="numeric" />
                        
                        <Text style={localStyles.label}>Usos Máximos por Cliente</Text>
                        <TextInput style={styles.input} placeholder="mínimo 1" value={usosMaximosPorCliente} onChangeText={setUsosMaximosPorCliente} keyboardType="numeric" />
                        
                        <View style={styles.switchContainer}><Text style={styles.switchLabel}>Activo:</Text><Switch onValueChange={setActivo} value={activo} /></View>
                        <View style={styles.switchContainer}><Text style={styles.switchLabel}>Aplica a Todos los Productos:</Text><Switch onValueChange={setAplicaATodosProductos} value={aplicaATodosProductos} /></View>
                        <View style={styles.switchContainer}><Text style={styles.switchLabel}>Aplica a Todos los Servicios:</Text><Switch onValueChange={setAplicaATodosServicios} value={aplicaATodosServicios} /></View>

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBoton}>Crear Promoción</Text>}
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
