import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA', // Un color de fondo suave
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
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF', // Fondo blanco para el encabezado
        borderBottomWidth: 1,
        borderBottomColor: '#E0E7FF', // Borde inferior suave
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        paddingTop: 40, // Espacio superior para SafeAreaView
    },
    headerIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C3E50', // Color de texto oscuro
    },
    flatListContent: {
        paddingHorizontal: 15,
        paddingBottom: 80, // Espacio para el botón flotante
    },
    flatListEmpty: {
        flexGrow: 1, // Para que el contenedor vacío ocupe todo el espacio disponible
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50, // Un poco de padding vertical
    },
    emptyListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 50, // Un poco de espacio desde la parte superior
    },
    emptyText: {
        fontSize: 18,
        color: '#7F8C8D', // Gris para el texto vacío
        textAlign: 'center',
        marginTop: 10,
    },
    botonCrear: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#28A745', // Color verde para el botón de crear
        borderRadius: 30, // Botón redondo
        paddingVertical: 12,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
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