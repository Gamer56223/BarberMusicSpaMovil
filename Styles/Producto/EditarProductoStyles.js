import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: '#F5F8FA',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
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
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    pickerLoading: {
        marginVertical: 20,
    },
    pickerLabelActual: {
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
    },
    picker: {
        height: Platform.OS === 'ios' ? 120 : 50,
        width: '100%',
    },
    pickerItem: {
        height: 120,
    },
    boton: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonIcon: {
        marginRight: 10,
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