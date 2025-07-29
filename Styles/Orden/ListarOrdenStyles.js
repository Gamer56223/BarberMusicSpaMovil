import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // --- Estilos para el estado de Carga ---
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F8FA',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#555',
        fontWeight: '500',
    },

    // --- Layout Principal y Encabezado ---
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerIcon: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A2533',
    },

    // --- Estilos de la Lista y Estado Vacío ---
    flatListContent: {
        paddingVertical: 8,
        paddingBottom: 100, // Espacio para el botón flotante
    },
    flatListEmpty: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: -50, // Ajuste para centrar mejor
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 16,
        fontWeight: '500',
    },

    // --- Botón Flotante para Crear ---
    botonCrear: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#007BFF',
        borderRadius: 30,
        height: 60,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
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