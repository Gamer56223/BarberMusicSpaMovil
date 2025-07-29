import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarProducto from "../../../Screen/Productos/ListarProducto";
import DetalleProducto from "../../../Screen/Productos/DetalleProducto";
import EditarProducto from "../../../Screen/Productos/EditarProducto";
import AgregarProducto from "../../../Screen/Productos/AgregarProducto";


const Stack = createStackNavigator();

export default function ProductosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarProductos"
                component={ListarProducto}
                options={{ title: "Producto" }}
            />
            <Stack.Screen
                name= "EditarProducto"
                component={EditarProducto}
                options={{ title: "Editar Producto" }}
            />
            <Stack.Screen
                name= "CrearProducto"
                component={AgregarProducto}
                options={{ title: "Nuevo Producto" }}
            />
            <Stack.Screen
                name= "DetalleProducto"
                component={DetalleProducto}
                options={{ title: "Nuevo Detalle Producto" }}
            />
        </Stack.Navigator>
    );
}