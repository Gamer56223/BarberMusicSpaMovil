import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Contenedor principal para toda la pantalla
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA', // Un color de fondo suave y profesional
    },

    // Estilos para el estado de carga
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

    // Estilos del encabezado
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerIcon: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A2533', // Un color oscuro para el texto
    },

    // Estilos para la FlatList
    flatListContent: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 100, // Espacio para el botón de crear
    },
    flatListEmpty: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Estilos para cuando la lista está vacía
    emptyListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#7F8C8D', // Un color gris suave
        marginTop: 10,
        textAlign: 'center',
    },

    // Estilos para el botón flotante de Crear
    botonCrear: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#007BFF', // Color primario de la app
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 8, // Sombra para Android
        shadowColor: "#000", // Sombra para iOS
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
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