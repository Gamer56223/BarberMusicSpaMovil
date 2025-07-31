import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    backgroundImageContainer: {
        // Este contenedor se posiciona detrás de todo
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    backgroundImage: {
        // Cada imagen ocupa la mitad de la pantalla
        flex: 1,
        width: '100%',
    },
    formContainer: {
        // Este es el contenedor del formulario que va por encima
        flex: 1,
        justifyContent: "center",
        padding: 30,
        // Fondo oscuro semitransparente para que el texto resalte
        backgroundColor: 'rgba(20, 20, 40, 0.7)',
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#FFFFFF", // Texto blanco
        marginBottom: 40,
        textAlign: "center",
        // Sombra para el texto
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // Fondo de input semitransparente
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 10,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)', // Borde claro
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 12,
        color: "#ccc",
    },
    input: {
        flex: 1,
        height: 55,
        fontSize: 16,
        color: "#FFFFFF", // Texto del input en blanco
    },
    passwordVisibilityToggle: {
        padding: 5,
    },
    // Nuevos estilos para el botón de "Ingresar"
    loginButton: {
        backgroundColor: '#FF0000', // Color rojo para el botón
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20, // Espacio superior para separar del último input
    },
    loginButtonText: {
        color: '#FFFFFF', // Texto blanco para el botón
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
