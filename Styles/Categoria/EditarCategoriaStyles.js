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
    pickerLabelActual: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
        marginTop: 4, // Espacio extra para separar de los inputs
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
});

export default styles;