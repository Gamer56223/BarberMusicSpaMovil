import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarMusicaPreferencial from "../../../Screen/MusicaPreferenciales/ListarMusicaPreferencial";
import DetalleMusicaPreferencial from "../../../Screen/MusicaPreferenciales/DetalleMusicaPreferencial";
import EditarMusicaPreferencial from "../../../Screen/MusicaPreferenciales/EditarMusicaPreferencial";
import AgregarMusicaPreferencial from "../../../Screen/MusicaPreferenciales/AgregarMusicaPreferencial";

const Stack = createStackNavigator();

export default function MusicaPreferencialesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarMusicaPreferenciales"
                component={ListarMusicaPreferencial}
                options={{ title: "Musica Preferencial" }}
            />
            <Stack.Screen
                name= "EditarMusicaPreferencial"
                component={EditarMusicaPreferencial}
                options={{ title: "Editar Musica Preferencial" }}
            />
            <Stack.Screen
                name= "CrearMusicaPreferencial"
                component={AgregarMusicaPreferencial}
                options={{ title: "Nueva Musica Preferencial" }}
            />
            <Stack.Screen
                name= "DetalleMusicaPreferencial"
                component={DetalleMusicaPreferencial}
                options={{ title: "Nuevo Detalle Musica Preferencial" }}
            />
        </Stack.Navigator>
    );
}