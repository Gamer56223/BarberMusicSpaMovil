import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "../../../Screen/Inicio/Inicio";
import AgendamientosStack from "./AgendamientoStack";
import CategoriasStack from "./CategoriaStack";
import DetalleOrdenesStack from "./DetalleOrdenStack";
import DireccionesStack from "./DireccionStack";
import EspecialidadesStack from "./EspecialidadStack";
import ExcepcionHorariosStack from "./ExcepcionHorarioStack";
import HorarioSucursalesStack from "./HorarioSucursalStack";
import MusicaPreferencialesStack from "./MusicaPreferencialStack";
import OrdenesStack from "./OrdenStack";
import PersonalesStack from "./PersonalStack";
import ProductosStack from "./ProductoStack";
import PromocionesStack from "./PromocionStack";
import RecordatoriosStack from "./RecordatorioStack";
import ServiciosStack from "./ServicioStack";
import ServicioSucursalesStack from "./ServicioSucursalStack";
import SucursalesStack from "./SucursalStack";
import TransaccionPagosStack from "./TransaccionPagoStack";
import UsuariosStack from "./UsuarioStack";
import ReseñaStack from "./ReseñaStack";

const Stack = createStackNavigator();

export default function InicioStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InicioPantalla"
                component={Inicio}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AgendamientosFlow"
                component={AgendamientosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CategoriasFlow"
                component={CategoriasStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DetalleOrdenesFlow"
                component={DetalleOrdenesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DireccionesFlow"
                component={DireccionesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EspecialidadesFlow"
                component={EspecialidadesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ExcepcionHorariosFlow"
                component={ExcepcionHorariosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HorarioSucursalesFlow"
                component={HorarioSucursalesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MusicaPreferencialesFlow"
                component={MusicaPreferencialesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OrdenesFlow"
                component={OrdenesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PersonalesFlow"
                component={PersonalesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProductosFlow"
                component={ProductosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PromocionesFlow"
                component={PromocionesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RecordatoriosFlow"
                component={RecordatoriosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ServiciosFlow"
                component={ServiciosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ServicioSucursalesFlow"
                component={ServicioSucursalesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SucursalesFlow"
                component={SucursalesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TransaccionPagosFlow"
                component={TransaccionPagosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UsuariosFlow"
                component={UsuariosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ReseñasFlow"
                component={ReseñaStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}