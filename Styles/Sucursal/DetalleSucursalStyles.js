import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA', // Color de fondo consistente
    },
    scrollContent: { // Renombrado de scrollViewContent a scrollContent para consistencia
        flexGrow: 1,
        paddingHorizontal: 15, // Padding horizontal consistente
        paddingTop: 20,
        paddingBottom: 30, // Espacio al final del scroll
    },
    container: { // Este estilo se usa para el estado de carga y error, se mantiene
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 26, // Ligeramente más pequeño para consistencia con títulos de pantalla
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2C3E50', // Color de texto consistente
        marginBottom: 20,
    },
    detailCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12, // Bordes redondeados consistentes
        padding: 20, // Padding interno
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4, // Sombra más pronunciada consistente
        },
        shadowOpacity: 0.2, // Opacidad de sombra consistente
        shadowRadius: 6, // Radio de sombra consistente
        elevation: 8, // Elevación para Android consistente
    },
    sucursalName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 15,
        textAlign: 'center', // Centrar el nombre de la sucursal
    },
    sucursalImage: {
        width: '100%',
        height: 220, // Altura un poco mayor para la imagen
        borderRadius: 10,
        marginVertical: 15,
        alignSelf: 'center',
        backgroundColor: '#E0E0E0', // Fondo para imágenes que cargan
    },
    noImageText: {
        fontSize: 15,
        color: '#7F8C8D',
        textAlign: 'center',
        marginVertical: 15,
        fontStyle: 'italic',
    },
    detailSection: { // Agrupador para los detalles
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 10,
    },
    detailText: {
        fontSize: 15, // Tamaño de fuente para los detalles
        color: '#5C6F7F',
        marginBottom: 8, // Espacio entre cada línea de detalle
        lineHeight: 22, // Altura de línea para mejor lectura
    },
    detailLabel: {
        fontWeight: 'bold', // Etiqueta en negrita
        color: '#34495E', // Color para las etiquetas
    },
    linkText: {
        color: '#007BFF', // Color para enlaces (azul)
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
        color: '#E74C3C', // Color de error
    },
    // Los estilos backButton y buttonText se eliminan ya que el botón "Volver al Listado" se quita del componente
});

export default styles;
