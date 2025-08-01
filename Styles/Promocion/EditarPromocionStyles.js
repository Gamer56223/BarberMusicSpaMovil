import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: '#F5F8FA', // Fondo claro y consistente
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100, // Espacio para el botón flotante
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A2533',
        marginLeft: 10,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 10, // Esquinas más redondeadas
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
        // Sombra para un efecto flotante
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    multilineInput: {
        height: 120, // Altura adecuada para texto multilinea
        textAlignVertical: 'top',
        paddingTop: 15,
    },
    pickerLabel: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
        fontWeight: '500',
        alignSelf: 'flex-start',
    },
    pickerContainer: {
        width: '100%',
        height: 50,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    picker: {
        width: '100%',
        height: '100%',
        color: '#333',
    },
    datePickerButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    datePickerButtonText: {
        fontSize: 16,
        color: '#333',
    },
    botonGuardar: {
        // Estilo flotante y centrado en la parte inferior de la pantalla
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        width: '90%', // Ocupa un buen porcentaje del ancho
        backgroundColor: '#28A745', // Color verde para la acción de guardar
        paddingVertical: 15,
        borderRadius: 30, // Botón de tipo píldora
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: '#28A745',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 8,
    },
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonIcon: {
        marginRight: 10,
    },
    textoBoton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 20,
        alignSelf: 'center',
    },
    backButtonText: {
        fontSize: 16,
        color: '#7F8C8D',
        fontWeight: '500',
    },
});

export default styles;
