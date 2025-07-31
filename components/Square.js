import { TouchableOpacity, Text, StyleSheet, View, ImageBackground } from "react-native";

// Añadimos 'variant' a las props para controlar el tamaño
export default function Square({ title, onPress, iconName, IconComponent, style, backgroundImage, variant = 'default' }) {
    // Selecciona los estilos de tamaño basados en la variante
    const sizeStyles = variant === 'small' ? styles.smallButton : styles.defaultButton;

    return (
        <TouchableOpacity style={[styles.button, sizeStyles, style]} onPress={onPress}>
            {/* Usamos ImageBackground si se proporciona una backgroundImage */}
            {backgroundImage ? (
                <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
                    <View style={styles.content}>
                        {/* No renderizamos el icono si hay imagen de fondo */}
                        <Text style={styles.text}>{title}</Text>
                    </View>
                </ImageBackground>
            ) : (
                // Si no hay backgroundImage, renderizamos el icono como antes
                <View style={styles.content}>
                    {IconComponent && iconName && <IconComponent name={iconName} size={36} color="#34495e" />}
                    <Text style={styles.text}>{title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        margin: 5, // Margen para separar los elementos
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 8,
        overflow: 'hidden', // Importante para que la imagen de fondo respete el borderRadius
    },
    // Estilos para el tamaño por defecto (usado en Inicio.js)
    defaultButton: {
        width: 220, // Ancho actual de los cuadrados grandes
        height: 170,
    },
    // Estilos para el tamaño pequeño (usado en PantallaGestion.js)
    smallButton: {
        width: 170, // Increased width slightly to fit "Agendamientos"
        height: 150, // Altura ajustada para el tamaño pequeño
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        // Fondo semitransparente para el texto sobre la imagen
        backgroundColor: 'rgba(0,0,0,0.4)', // Fondo oscuro semitransparente
        borderRadius: 10, // Bordes redondeados para el fondo del texto
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    text: {
        marginTop: 8, // Ajustado para el nuevo layout con imagen de fondo
        color: "#FFFFFF", // Texto blanco para que resalte sobre la imagen
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        // --- EFECTO DE SOMBRA AÑADIDO ---
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombra más pronunciada para texto sobre imagen
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        borderRadius: 16, // Asegura que la imagen de fondo también tenga bordes redondeados
    }
});
