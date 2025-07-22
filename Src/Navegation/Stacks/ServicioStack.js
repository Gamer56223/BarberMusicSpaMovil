import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarServicio from "../../../Screen/Servicios/ListarServicio";
import DetalleServicio from "../../../Screen/Servicios/DetalleServicio";
import EditarServicio from "../../../Screen/Servicios/EditarServicio";
import AgregarServicio from "../../../Screen/Servicios/AgregarServicio";

const Stack = createStackNavigator();

export default function ServiciosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarServicios"
                component={ListarServicio}
                options={{ title: "Servicio" }}
            />
            <Stack.Screen
                name= "EditarServicio"
                component={EditarServicio}
                options={{ title: "Editar Servicio" }}
            />
            <Stack.Screen
                name= "CrearServicio"
                component={AgregarServicio}
                options={{ title: "Nuevo Servicio" }}
            />
            <Stack.Screen
                name= "DetalleServicio"
                component={DetalleServicio}
                options={{ title: "Nuevo Detalle Servicio" }}
            />
        </Stack.Navigator>
    );
}