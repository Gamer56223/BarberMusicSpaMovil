import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarCategoria from "../../../Screen/Categorias/ListarCategoria";
import DetalleCategoria from "../../../Screen/Categorias/DetalleCategoria";
import EditarCategoria from "../../../Screen/Categorias/EditarCategoria";
import AgregarCategoria from "../../../Screen/Categorias/AgregarCategoria";

const Stack = createStackNavigator();

export default function CategoriasStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarCategorias"
                component={ListarCategoria}
                options={{ title: "Categoria" }}
            />
            <Stack.Screen
                name= "AgregarCategoria"
                component={AgregarCategoria}
                options={{ title: "Nueva Categoria" }}
            />
            <Stack.Screen
                name= "EditarCategoria"
                component={EditarCategoria}
                options={{ title: "Editar Categoria" }}
            />
            <Stack.Screen
                name= "DetalleCategoria"
                component={DetalleCategoria}
                options={{ title: "Nuevo Detalle Categoria" }}
            />
        </Stack.Navigator>
    );
}
