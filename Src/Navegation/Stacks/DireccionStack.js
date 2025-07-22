import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarDireccion from "../../../Screen/Direcciones/ListarDireccion";
import DetalleDireccion from "../../../Screen/Direcciones/DetalleDireccion";
import EditarDireccion from "../../../Screen/Direcciones/EditarDireccion";
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
                name= "EditarDireccion"
                component={EditarDireccion}
                options={{ title: "Editar Direccion" }}
            />
            <Stack.Screen
                name= "CrearDireccion"
                component={AgregarDireccion}
                options={{ title: "Nueva Direccion" }}
            />
            <Stack.Screen
                name= "DetalleDireccion"
                component={DetalleDireccion}
                options={{ title: "Nuevo Detalle Direccion" }}
            />
        </Stack.Navigator>
    );
}