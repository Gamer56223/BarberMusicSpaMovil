// Archivo: EditarAgendamientoStyles.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    // --- Contenedores y Layout ---
    // Estilo principal para la vista que se ajusta al teclado
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    // Contenedor para el ScrollView
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 40,
    },
    // Contenedor principal del formulario
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    // --- Tipografía ---
    // Título de la pantalla
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A2533',
        textAlign: 'center',
        marginBottom: 30,
    },
    // Etiqueta general para los campos
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
        marginTop: 16,
    },
    // Etiqueta para los Pickers
    pickerLabelActual: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
    },

    // --- Campo Cliente (no editable) ---
    // Estilo para mostrar el nombre del cliente
    pickerDisplay: {
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#E2E8F0', // Color de fondo para indicar que no es editable
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        marginBottom: 20,
        color: '#1A2533',
        fontWeight: '500',
    },

    // --- Pickers (Selectores) ---
    // Contenedor para el Picker de Servicio y Sucursal
    pickerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        marginBottom: 20,
        height: 50,
    },
    // Estilo del Picker
    picker: {
        width: '100%',
        height: '100%',
        color: '#1A2533',
    },
    // Estilo para los ítems del Picker en iOS
    pickerItem: {
        height: 120, // Específico para iOS
        color: '#1A2533',
    },
    // Indicador de carga para los Pickers
    pickerLoading: {
        marginVertical: 20,
    },

    // --- Campos de Fecha y Hora ---
    // Botón para abrir los selectores de fecha y hora
    datePickerButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        marginBottom: 10,
    },
    // Texto dentro del botón de fecha y hora
    datePickerButtonText: {
        fontSize: 16,
        color: '#1A2533',
    },

    // --- Campos de Texto ---
    // Estilo general para los campos de entrada de texto (precio, notas)
    input: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        fontSize: 16,
        color: '#1A2533',
        marginBottom: 20,
    },
    // Estilo específico para campos multilínea (notas)
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },

    // --- Botones de Acción ---
    // Estilo del botón "Guardar Cambios"
    boton: {
        backgroundColor: '#1976D2',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    // Contenido del botón, para organizar el ícono y el texto
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // Ícono del botón
    botonIcon: {
        marginRight: 8,
    },
    // Texto del botón
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Botón "Volver"
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        padding: 10,
    },
    // Texto del botón "Volver"
    backButtonText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 5,
    },
});

export default styles;
