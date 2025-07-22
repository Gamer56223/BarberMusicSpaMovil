import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarRecordatorio from "../../../Screen/Recordatorios/ListarRecordatorio";
import DetalleRecordatorio from "../../../Screen/Recordatorios/DetalleRecordatorio";
import EditarRecordatorio from "../../../Screen/Recordatorios/EditarRecordatorio";
import AgregarRecordatorio from "../../../Screen/Recordatorios/AgregarRecordatorio";

const Stack = createStackNavigator();

export default function RecordatoriosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarRecordatorios"
                component={ListarRecordatorio}
                options={{ title: "Recordatorio" }}
            />
            <Stack.Screen
                name= "EditarRecordatorio"
                component={EditarRecordatorio}
                options={{ title: "Editar Recordatorio" }}
            />
            <Stack.Screen
                name= "CrearRecordatorio"
                component={AgregarRecordatorio}
                options={{ title: "Nuevo Recordatorio" }}
            />
            <Stack.Screen
                name= "DetalleRecordatorio"
                component={DetalleRecordatorio}
                options={{ title: "Nuevo Detalle Recordatorio" }}
            />
        </Stack.Navigator>
    );
}