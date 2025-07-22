import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarOrden from "../../../Screen/Ordenes/ListarOrden";
import DetalleOrden from "../../../Screen/Ordenes/DetalleOrden";
import EditarOrden from "../../../Screen/Ordenes/EditarOrden";
import AgregarOrden from "../../../Screen/Ordenes/AgregarOrden";

const Stack = createStackNavigator();

export default function OrdenesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarOrdenes"
                component={ListarOrden}
                options={{ title: "Orden" }}
            />
            <Stack.Screen
                name= "EditarOrden"
                component={EditarOrden}
                options={{ title: "Editar Orden" }}
            />
            <Stack.Screen
                name= "CrearOrden"
                component={AgregarOrden}
                options={{ title: "Nueva Orden" }}
            />
            <Stack.Screen
                name= "DetalleOrden"
                component={DetalleOrden}
                options={{ title: "Nuevo Detalle Orden" }}
            />
        </Stack.Navigator>
    );
}