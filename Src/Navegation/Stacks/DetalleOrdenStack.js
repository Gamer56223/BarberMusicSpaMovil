import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarDetalleOrden from "../../../Screen/DetalleOrdenes/ListarDetalleOrden";
import DetalleDetalleOrden from "../../../Screen/DetalleOrdenes/DetalleDetalleOrden";
import EditarDetalleOrden from "../../../Screen/DetalleOrdenes/EditarDetalleOrden";
import AgregarDetalleOrden from "../../../Screen/DetalleOrdenes/AgregarDetalleOrden";

const Stack = createStackNavigator();

export default function DetalleOrdenesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarDetalleOrdenes"
                component={ListarDetalleOrden}
                options={{ title: "Detalle Orden" }}
            />
            <Stack.Screen
                name= "EditarDetalleOrden"
                component={EditarDetalleOrden}
                options={{ title: "Editar Detalle Orden" }}
            />
            <Stack.Screen
                name= "CrearDetalleOrden"
                component={AgregarDetalleOrden}
                options={{ title: "Nuevo Detalle Orden" }}
            />
            <Stack.Screen
                name= "DetalleDetalleOrden"
                component={DetalleDetalleOrden}
                options={{ title: "Nuevo Detalle Detalle Orden" }}
            />
        </Stack.Navigator>
    );
}