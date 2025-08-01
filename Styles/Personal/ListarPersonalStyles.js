import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA', // Un fondo claro y suave
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
        color: '#555',
        fontWeight: '500',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centra el contenido del encabezado
        padding: 20,
        backgroundColor: '#FFFFFF', // Fondo blanco para el encabezado
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0', // Línea sutil debajo del encabezado
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // Sombra para Android
        marginBottom: 10, // Espacio entre el encabezado y la lista
    },
    headerIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2C3E50', // Color de texto oscuro para el título
    },
    flatListContent: {
        paddingHorizontal: 15,
        paddingBottom: 100, // Espacio para que el botón flotante no tape el último ítem
        paddingTop: 10,
    },
    flatListEmpty: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        marginTop: 15,
        textAlign: 'center',
        lineHeight: 25,
    },
    botonCrear: {
        // Posición centrada en la parte inferior
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [{ translateX: -125 }], // Ajuste para centrar el botón de 250px de ancho
        // Estilos para el botón rojo y bonito
        backgroundColor: '#D32F2F', // Un color rojo llamativo para "Nuevo Personal"
        borderRadius: 15, // Esquinas más redondeadas
        paddingVertical: 18, // Aumenta el padding vertical para un botón más grande
        paddingHorizontal: 25,
        shadowColor: '#D32F2F',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
        width: 250, // Ancho fijo para centrarlo correctamente
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFCDD2',
    },
    botonCrearContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonIcon: {
        marginRight: 10,
    },
    textoBotonCrear: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase', // Texto en mayúsculas
    },
});

export default styles;
