import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarAgendamiento from "../../../Screen/Agendamientos/ListarAgendamiento";
import EditarAgendamiento from "../../../Screen/Agendamientos/EditarAgendamiento";
import DetalleAgendamiento from "../../../Screen/Agendamientos/DetalleAgendamiento";


const Stack = createStackNavigator();

export default function AgendamientosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarAgendamientos"
                component={ListarAgendamiento}
                options={{ title: "Agendamiento" }}
            />
            <Stack.Screen
                name= "EditarAgendamiento"
                component={EditarAgendamiento}
                options={{ title: "Editar Agendamiento" }}
            />
            <Stack.Screen
                name= "DetalleAgendamiento"
                component={DetalleAgendamiento}
                options={{ title: "Editar Agendamiento" }}
            />
        </Stack.Navigator>
    );
}