import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function Square({ title, onPress, iconName, IconComponent, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <View style={styles.content}>
                <IconComponent name={iconName} size={36} color="#34495e" />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 150,
        backgroundColor: "#ffffff",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 8,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        marginTop: 8,
        color: "#34495e",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        // --- EFECTO DE SOMBRA AÑADIDO ---
        textShadowColor: 'rgba(0, 0, 0, 0.15)', // Sombra sutil para texto más pequeño
        textShadowOffset: { width: 0, height: 1 },   // Desplazamiento mínimo
        textShadowRadius: 2,                     // Difuminado ligero
    },
});