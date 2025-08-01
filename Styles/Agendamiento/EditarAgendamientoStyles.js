import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F8FA',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 6,
        marginVertical: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#34495E',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#5C6D7E',
        alignSelf: 'flex-start',
        marginTop: 15,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#34495E',
        borderColor: '#E1E8ED',
        borderWidth: 1,
        justifyContent: 'center',
    },
    multilineInput: {
        height: 120,
        paddingTop: 15,
        textAlignVertical: 'top', // Para que el texto empiece en la parte superior en Android
    },
    pickerText: {
        fontSize: 16,
        color: '#34495E',
    },
    pickerPlaceholder: {
        fontSize: 16,
        color: '#BCC2C7',
    },
    boton: {
        width: '100%',
        height: 55,
        backgroundColor: '#007BFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    backButton: {
        marginTop: 20,
        marginBottom: 10,
        padding: 10,
    },
    backButtonText: {
        color: '#888',
        fontSize: 16,
        fontWeight: '500',
    },
    loadingText: {
        marginTop: 10,
        color: '#5C6D7E',
        fontSize: 16,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F8FA',
    },
    detailCard: {
        width: '100%',
        backgroundColor: '#EAEFF2',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        borderColor: '#BDC3C7',
        borderWidth: 1,
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#34495E',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 16,
        color: '#5C6D7E',
        marginBottom: 4,
    },
    // Estilos para el Modal
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        width: '100%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#34495E',
        marginBottom: 15,
    },
    modalOption: {
        width: '90%',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E1E8ED',
        alignItems: 'center',
    },
    modalOptionText: {
        fontSize: 18,
        color: '#34495E',
    },
    modalCloseButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#F0F2F5',
        width: '90%',
        alignItems: 'center',
    },
    modalCloseText: {
        fontSize: 16,
        color: '#7F8C8D',
        fontWeight: 'bold',
    },
});

export default styles;
