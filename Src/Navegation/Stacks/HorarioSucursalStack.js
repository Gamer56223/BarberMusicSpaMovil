import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarHorarioSucursal from "../../../Screen/HorarioSucursales/ListarHorarioSucursal";
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
                name= "CrearHorarioSucursal"
                component={AgregarHorarioSucursal}
                options={{ title: "Nuevo Horario Sucursal" }}
            />
        </Stack.Navigator>
    );
}