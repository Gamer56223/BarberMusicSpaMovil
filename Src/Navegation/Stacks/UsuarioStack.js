import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarUsuario from "../../../Screen/Usuarios/ListarUsuario";
import DetalleUsuario from "../../../Screen/Usuarios/DetalleUsuario";
import EditarUsuario from "../../../Screen/Usuarios/EditarUsuario";
import AgregarUsuario from "../../../Screen/Usuarios/AgregarUsuario";

const Stack = createStackNavigator();

export default function UsuariosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarUsuarios"
                component={ListarUsuario}
                options={{ title: "Usuarios" }}
            />
            <Stack.Screen
                name= "EditarUsuario"
                component={EditarUsuario}
                options={{ title: "Editar Usuario" }}
            />
            <Stack.Screen
                name= "CrearUsuario"
                component={AgregarUsuario}
                options={{ title: "Nuevo Usuario" }}
            />
            <Stack.Screen
                name= "DetalleUsuario"
                component={DetalleUsuario}
                options={{ title: "Nuevo Usuario" }}
            />
        </Stack.Navigator>
    );
}