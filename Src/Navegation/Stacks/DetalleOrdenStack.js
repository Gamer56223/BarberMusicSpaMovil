import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarDetalleOrden from "../../../Screen/DetalleOrdenes/ListarDetalleOrden";

const Stack = createStackNavigator();

export default function DetalleOrdenesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarDetalleOrdenes"
                component={ListarDetalleOrden}
                options={{ title: "Detalle Orden" }}
            />
        </Stack.Navigator>
    );
}