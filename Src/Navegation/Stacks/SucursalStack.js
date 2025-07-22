import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarSucursal from "../../../Screen/Sucursales/ListarSucursal";
import DetalleSucursal from "../../../Screen/Sucursales/DetalleSucursal";
import EditarSucursal from "../../../Screen/Sucursales/EditarSucursal";
import AgregarSucursal from "../../../Screen/Sucursales/AgregarSucursal";

const Stack = createStackNavigator();

export default function SucursalesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarSucusales"
                component={ListarSucursal}
                options={{ title: "Sucursales" }}
            />
            <Stack.Screen
                name= "EditarSucursal"
                component={EditarSucursal}
                options={{ title: "Editar Sucursal" }}
            />
            <Stack.Screen
                name= "CrearSucursal"
                component={AgregarSucursal}
                options={{ title: "Nueva Sucursal" }}
            />
            <Stack.Screen
                name= "DetalleSucursal"
                component={DetalleSucursal}
                options={{ title: "Nuevo Detalle Sucursal" }}
            />
        </Stack.Navigator>
    );
}