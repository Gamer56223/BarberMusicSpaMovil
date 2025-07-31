import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: '#F5F8FA',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 25,
    },
    container: {
        padding: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A2533',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    pickerLabel: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
        fontWeight: '600',
    },
    pickerContainer: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        marginBottom: 15,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    picker: {
        height: Platform.OS === 'ios' ? 120 : 50,
        width: '100%',
    },
    imagePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F2FD', // Fondo similar a "Ver más productos"
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#BBDEFB',
    },
    imagePickerButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#1976D2',
        fontWeight: 'bold',
    },
    imagePreview: {
        width: 150,
        height: 150,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    boton: {
        backgroundColor: '#1976D2', // Color azul consistente
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
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
        padding: 10,
        marginTop: 15,
    },
    backButtonText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 8,
    },
});

export default styles;