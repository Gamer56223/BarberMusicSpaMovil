import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarPersonal from "../../../Screen/Personales/ListarPersonal";
import AgregarPersonal from "../../../Screen/Personales/AgregarPersonal";

const Stack = createStackNavigator();

export default function PersonalesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarPersonales"
                component={ListarPersonal}
                options={{ title: "Personal" }}
            />
            <Stack.Screen
                name= "CrearPersonal"
                component={AgregarPersonal}
                options={{ title: "Nuevo Personal" }}
            />
        </Stack.Navigator>
    );
}