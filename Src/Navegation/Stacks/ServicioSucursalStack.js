import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarServicioSucursal from "../../../Screen/ServicioSucursales/ListarServicioSucursal";
import DetalleServicioSucursal from "../../../Screen/ServicioSucursales/DetalleServicioSucursal";
import EditarServicioSucursal from "../../../Screen/ServicioSucursales/EditarServicioSucursal";
import AgregarServicioSucursal from "../../../Screen/ServicioSucursales/AgregarServicioSucursal";

const Stack = createStackNavigator();

export default function ServicioSucursalesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarServicioSucusales"
                component={ListarServicioSucursal}
                options={{ title: "Servicio Sucursales" }}
            />
            <Stack.Screen
                name= "EditarServicioSucursal"
                component={EditarServicioSucursal}
                options={{ title: "Editar Servicio Sucursal" }}
            />
            <Stack.Screen
                name= "CrearServicioSucursal"
                component={AgregarServicioSucursal}
                options={{ title: "Nuevo Servicio Sucursal" }}
            />
            <Stack.Screen
                name= "DetalleServicioSucursal"
                component={DetalleServicioSucursal}
                options={{ title: "Nuevo Detalle Servicio Sucursal" }}
            />
        </Stack.Navigator>
    );
}