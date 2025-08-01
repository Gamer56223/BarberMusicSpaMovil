import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA', // Color de fondo claro para toda la pantalla
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F8FA',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF', // Fondo blanco para la cabecera
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    headerIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    flatListContent: {
        paddingBottom: 80, // Espacio para el botón flotante
    },
    flatListEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%', // Centra el contenido si la lista está vacía
    },
    emptyListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#7F8C8D',
        textAlign: 'center',
        marginTop: 10,
    },
    botonCrear: {
        // Posición flotante y centrada en la parte inferior
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        // Estilos para el botón rojo y bonito
        backgroundColor: '#D32F2F', // Un color rojo llamativo para "Nueva Promoción"
        borderRadius: 30, // Esquinas más redondeadas para un look tipo píldora
        paddingVertical: 12, // Tamaño compacto
        paddingHorizontal: 20,
        shadowColor: '#D32F2F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 8,
    },
    botonCrearContent: {
        flexDirection: 'row', // Para alinear el ícono y el texto
        alignItems: 'center',
    },
    botonCrearIcon: {
        marginRight: 8,
    },
    textoBotonCrear: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase', // Texto en mayúsculas
    },
});

export default styles;
