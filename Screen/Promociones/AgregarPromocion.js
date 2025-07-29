import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { crearPromocion } from "../../Src/Servicios/PromocionService"; // Asume que tienes este servicio
import styles from "../../Styles/Promocion/AgregarPromocionStyles"; // Asume que tienes un archivo de estilos similar

export default function AgregarPromocion({ navigation }) {
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipoDescuento, setTipoDescuento] = useState("");
    const [valorDescuento, setValorDescuento] = useState("");
    const [fechaInicio, setFechaInicio] = useState(""); // Formato 'YYYY-MM-DD HH:MM:SS'
    const [fechaFin, setFechaFin] = useState("");     // Formato 'YYYY-MM-DD HH:MM:SS'
    const [usosMaximosTotal, setUsosMaximosTotal] = useState("");
    const [usosMaximosPorCliente, setUsosMaximosPorCliente] = useState("");
    const [usosActuales, setUsosActuales] = useState("0"); // Valor por defecto
    const [activo, setActivo] = useState(true);
    const [aplicaATodosProductos, setAplicaATodosProductos] = useState(false);
    const [aplicaATodosServicios, setAplicaATodosServicios] = useState(false);

    const [loading, setLoading] = useState(false);

    const tiposDescuento = [
        { label: "Porcentaje", value: "PORCENTAJE" },
        { label: "Monto Fijo", value: "MONTO_FIJO" },
    ];

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

    const handleGuardar = async () => {
        if (!codigo || !nombre || !tipoDescuento || !valorDescuento || !fechaInicio || !fechaFin) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios: Código, Nombre, Tipo de Descuento, Valor de Descuento, Fecha de Inicio y Fecha de Fin.");
            return;
        }

        const valorDescuentoNum = parseFloat(valorDescuento);
        const usosMaximosTotalNum = parseInt(usosMaximosTotal || 0);
        const usosMaximosPorClienteNum = parseInt(usosMaximosPorCliente || 0);
        const usosActualesNum = parseInt(usosActuales || 0);

        if (isNaN(valorDescuentoNum) || valorDescuentoNum < 0) {
            Alert.alert("Valor de Descuento inválido", "Por favor, ingrese un valor numérico válido para el descuento.");
            return;
        }
        if (isNaN(usosMaximosTotalNum) || usosMaximosTotalNum < 0 ||
            isNaN(usosMaximosPorClienteNum) || usosMaximosPorClienteNum < 0 ||
            isNaN(usosActualesNum) || usosActualesNum < 0) {
            Alert.alert("Usos máximos inválidos", "Por favor, ingrese valores numéricos válidos para los usos.");
            return;
        }

        setLoading(true);
        try {
            const result = await crearPromocion({
                codigo: codigo,
                nombre: nombre,
                descripcion: descripcion,
                tipo_descuento: tipoDescuento,
                valor_descuento: valorDescuentoNum,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                usos_maximos_total: usosMaximosTotalNum,
                usos_maximos_por_cliente: usosMaximosPorClienteNum,
                usos_actuales: usosActualesNum,
                activo: activo,
                aplica_a_todos_productos: aplicaATodosProductos,
                aplica_a_todos_servicios: aplicaATodosServicios,
            });

            if (result.success) {
                Alert.alert("Éxito", "Promoción creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la promoción"));
            }
        } catch (error) {
            console.error("Error al crear promoción:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la promoción."));
        } finally {
            setLoading(false);
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
                        <Text style={styles.title}>Nueva Promoción</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Código (ej. VERANO2025)"
                            placeholderTextColor="#888"
                            value={codigo}
                            onChangeText={setCodigo}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de la Promoción"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.inputMultiline}
                            placeholder="Descripción (Opcional)"
                            placeholderTextColor="#888"
                            value={descripcion}
                            onChangeText={setDescripcion}
                            multiline
                            numberOfLines={3}
                        />

                        <Text style={styles.pickerLabel}>Tipo de Descuento:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={tipoDescuento}
                                onValueChange={(itemValue) => setTipoDescuento(itemValue)}
                                style={styles.picker}
                                itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                            >
                                <Picker.Item label="-- Seleccione un Tipo --" value="" />
                                {tiposDescuento.map((tipo) => (
                                    <Picker.Item key={tipo.value} label={tipo.label} value={tipo.value} />
                                ))}
                            </Picker>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Valor de Descuento (ej. 0.15 para 15%, 10.00 para $10)"
                            placeholderTextColor="#888"
                            value={valorDescuento}
                            onChangeText={setValorDescuento}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Fecha de Inicio (YYYY-MM-DD HH:MM:SS)"
                            placeholderTextColor="#888"
                            value={fechaInicio}
                            onChangeText={setFechaInicio}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Fecha de Fin (YYYY-MM-DD HH:MM:SS)"
                            placeholderTextColor="#888"
                            value={fechaFin}
                            onChangeText={setFechaFin}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Usos Máximos Totales (0 para ilimitado)"
                            placeholderTextColor="#888"
                            value={usosMaximosTotal}
                            onChangeText={setUsosMaximosTotal}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Usos Máximos por Cliente (0 para ilimitado)"
                            placeholderTextColor="#888"
                            value={usosMaximosPorCliente}
                            onChangeText={setUsosMaximosPorCliente}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Usos Actuales (se inicializa en 0)"
                            placeholderTextColor="#888"
                            value={usosActuales}
                            onChangeText={setUsosActuales}
                            keyboardType="numeric"
                            editable={false} // Usos Actuales se gestiona en backend
                        />
                        
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Activo:</Text>
                            <Switch
                                onValueChange={setActivo}
                                value={activo}
                            />
                        </View>
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Aplica a Todos los Productos:</Text>
                            <Switch
                                onValueChange={setAplicaATodosProductos}
                                value={aplicaATodosProductos}
                            />
                        </View>
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Aplica a Todos los Servicios:</Text>
                            <Switch
                                onValueChange={setAplicaATodosServicios}
                                value={aplicaATodosServicios}
                            />
                        </View>

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>Crear Promoción</Text>
                                </View>
                            )}
                        </TouchableOpacity>
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