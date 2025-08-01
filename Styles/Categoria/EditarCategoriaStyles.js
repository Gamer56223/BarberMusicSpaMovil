import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // --- Contenedores y Layout ---
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 40,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    // --- Tipografía ---
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A2533',
        textAlign: 'center',
        marginBottom: 30,
    },
    // Estilo para las nuevas etiquetas de campo
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
        marginTop: 10,
    },
    pickerLabelActual: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
        marginTop: 4, // Espacio extra para separar de los inputs
    },
    pickerText: {
        color: '#1A2533',
    },
    pickerPlaceholder: {
        color: '#9CA3AF', // Un color más claro para el placeholder
    },

    // --- Campos de Texto ---
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
    multilineInput: {
        height: 100,
        textAlignVertical: 'top', // Para que el texto empiece arriba en Android
    },

    // --- Pickers (Selectores) ---
    pickerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        marginBottom: 20,
        height: 50,
    },
    picker: {
        width: '100%',
        height: '100%',
        color: '#1A2533',
    },
    pickerItem: {
        height: 120, // Específico para iOS
        color: '#1A2533',
    },

    // --- Switch de Activo ---
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
    },

    // --- Botones de Acción ---
    boton: {
        backgroundColor: '#1976D2', // Azul primario
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
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonIcon: {
        marginRight: 8,
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        padding: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 5,
    },

    // --- Modal para el Picker ---
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '50%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalOption: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalOptionText: {
        fontSize: 18,
        textAlign: 'center',
    },
    modalCloseButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalCloseText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
});

export default styles;
