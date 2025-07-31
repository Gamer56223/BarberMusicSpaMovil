import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ListarProducto from "../../../Screen/Productos/ListarProducto";
import DetalleProducto from "../../../Screen/Productos/DetalleProducto";
import EditarProducto from "../../../Screen/Productos/EditarProducto";
import AgregarProducto from "../../../Screen/Productos/AgregarProducto";

const Stack = createStackNavigator();

export default function ProductosStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center', // Centra el título del encabezado
            }}
        >
            <Stack.Screen
                name="ListarProductos"
                component={ListarProducto}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: '#007BFF', // Fondo azul para el encabezado
                    },
                    headerTintColor: '#fff', // Color blanco para el texto y los iconos
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                    ),
                    headerTitle: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="cube-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Gestión de Productos</Text>
                        </View>
                    ),
                })}
            />
            <Stack.Screen
                name="EditarProducto"
                component={EditarProducto}
                options={{ title: "Editar Producto" }}
            />
            <Stack.Screen
                name="CrearProducto"
                component={AgregarProducto}
                options={{ title: "Nuevo Producto" }}
            />
            <Stack.Screen
                name="DetalleProducto"
                component={DetalleProducto}
                options={{ title: "Detalle Producto" }}
            />
        </Stack.Navigator>
    );
}