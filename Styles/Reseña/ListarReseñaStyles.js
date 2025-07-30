import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // --- Contenedores Principales ---
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F8FA',
    },
    
    // --- Cabecera ---
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A2533',
    },

    // --- FlatList y Contenido ---
    flatListContent: {
        paddingBottom: 100, // Espacio para que el último item no quede detrás del botón
    },
    flatListEmpty: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // --- Estado de Carga y Lista Vacía ---
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        marginTop: 16,
        textAlign: 'center',
    },

    // --- Botón Flotante de Crear ---
    botonCrear: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#007BFF',
        borderRadius: 30,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    // Nota: El botón de "Nueva Reseña" fue simplificado a solo un ícono
    // para seguir el estándar de Botón de Acción Flotante (FAB).
    // Si prefieres el texto, puedes usar el estilo de otros listados.

});

export default styles;