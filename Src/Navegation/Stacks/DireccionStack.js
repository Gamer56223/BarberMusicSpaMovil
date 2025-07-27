import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarDireccion from "../../../Screen/Direcciones/ListarDireccion";
import AgregarDireccion from "../../../Screen/Direcciones/AgregarDireccion";

const Stack = createStackNavigator();

export default function DireccionesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarDirecciones"
                component={ListarDireccion}
                options={{ title: "Direccion" }}
            />
            <Stack.Screen
                name= "CrearDireccion"
                component={AgregarDireccion}
                options={{ title: "Nueva Direccion" }}
            />
        </Stack.Navigator>
    );
}