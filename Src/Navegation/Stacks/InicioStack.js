import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "../../../Screen/Inicio/Inicio";

const Stack = createStackNavigator();

export default function InicioStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InicioPantalla"
                component={Inicio}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}