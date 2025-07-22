import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarTransaccionPago from "../../../Screen/TransaccionPagos/ListarTransaccionPago";
import DetalleTransaccionPago from "../../../Screen/TransaccionPagos/DetalleTransaccionPago";
import EditarTransaccionPago from "../../../Screen/TransaccionPagos/EditarTransaccionPago";
import AgregarTransaccionPago from "../../../Screen/TransaccionPagos/AgregarTransaccionPago";

const Stack = createStackNavigator();

export default function TransaccionPagosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarTransaccionPagos"
                component={ListarTransaccionPago}
                options={{ title: "Transaccion Pagos" }}
            />
            <Stack.Screen
                name= "EditarTransaccionPago"
                component={EditarTransaccionPago}
                options={{ title: "Editar Transaccion Pago" }}
            />
            <Stack.Screen
                name= "CrearTransaccionPago"
                component={AgregarTransaccionPago}
                options={{ title: "Nueva Transaccion Pago" }}
            />
            <Stack.Screen
                name= "DetalleTransaccionPago"
                component={DetalleTransaccionPago}
                options={{ title: "Nueva Transaccion Pago" }}
            />
        </Stack.Navigator>
    );
}