import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarExcepcionHorario from "../../../Screen/ExcepcionHorarioSucursales/ListarExcepcionHorarioSucursal"
import DetalleExcepcionHorario from "../../../Screen/ExcepcionHorarioSucursales/DetalleExcepcionHorarioSucursal";
import EditarExcepcionHorario from "../../../Screen/ExcepcionHorarioSucursales/EditarExcepcionHorarioSucursal"
import AgregarExcepcionHorario from "../../../Screen/ExcepcionHorarioSucursales/AgregarExcepcionHorarioSucursal"

const Stack = createStackNavigator();

export default function ExcepcionHorariosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarExcepcionHorarios"
                component={ListarExcepcionHorario}
                options={{ title: "Excepcion Horario" }}
            />
            <Stack.Screen
                name= "EditarExcepcionHorario"
                component={EditarExcepcionHorario}
                options={{ title: "Editar Excepcion Horario" }}
            />
            <Stack.Screen
                name= "CrearExcepcionHorario"
                component={AgregarExcepcionHorario}
                options={{ title: "Nueva Excepcion Horario" }}
            />
            <Stack.Screen
                name= "DetalleExcepcionHorario"
                component={DetalleExcepcionHorario}
                options={{ title: "Nuevo Detalle Excepcion Horario" }}
            />
        </Stack.Navigator>
    );
}