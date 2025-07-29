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
        position: 'absolute',
        bottom: 30, // Separación de la parte inferior de la pantalla
        right: 25, // Separación del lado derecho
        backgroundColor: '#007BFF', // Un azul vibrante para el botón de acción
        borderRadius: 30, // Hace que el botón sea circular
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8, // Sombra más pronunciada para el botón flotante en Android
    },
    botonCrearContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonCrearIcon: {
        marginRight: 8,
    },
    textoBotonCrear: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;    