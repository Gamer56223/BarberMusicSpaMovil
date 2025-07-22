import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarHorarioSucursal from "../../../Screen/HorarioSucursales/ListarHorarioSucursal";
import DetalleHorarioSucursal from "../../../Screen/HorarioSucursales/DetalleHorarioSucursal";
import EditarHorarioSucursal from "../../../Screen/HorarioSucursales/EditarHorarioSucursal";
import AgregarHorarioSucursal from "../../../Screen/HorarioSucursales/AgregarHorarioSucursal";

const Stack = createStackNavigator();

export default function HorarioSucursalesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarHorarioSucursales"
                component={ListarHorarioSucursal}
                options={{ title: "Horario Sucursal" }}
            />
            <Stack.Screen
                name= "EditarHorarioSucursal"
                component={EditarHorarioSucursal}
                options={{ title: "Editar Horario Sucursal" }}
            />
            <Stack.Screen
                name= "CrearHorarioSucursal"
                component={AgregarHorarioSucursal}
                options={{ title: "Nuevo Horario Sucursal" }}
            />
            <Stack.Screen
                name= "DetalleHorarioSucursal"
                component={DetalleHorarioSucursal}
                options={{ title: "Nuevo HorarioSucursal" }}
            />
        </Stack.Navigator>
    );
}