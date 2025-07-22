import { Entypo, AntDesign, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InicioStack from "./Stacks/InicioStack";
import PerfilStack from "./Stacks/PerfilStack";
import ConfiguracionStack from "./Stacks/ConfiguracionStack";


const Tab = createBottomTabNavigator();
export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#1976D2', // Color para el icono activo
                tabBarInactiveTintColor: '#757575', // Color para el icono inactivo
                tabBarStyle: { backgroundColor: '#fff', }, // Estilo del fondo de la barra de pestañas
            }}>
            <Tab.Screen name="Inicio" component={InicioStack} options={{
                headerShown: false, // <-- AÑADE ESTA LÍNEA AQUÍ
                tabBarIcon: ({ color, size }) => (<AntDesign name="home" size={24} color="black" />)
            }} />
            <Tab.Screen name="Perfil" component={PerfilStack} options={{
                headerShown: false, // Puedes añadirlo aquí también si lo necesitas
                tabBarIcon: ({ color, size }) => (<Entypo name="user" size={24} color="black" />)
            }} />
            <Tab.Screen name="Configuracion" component={ConfiguracionStack} options={{
                headerShown: false, // Y aquí para una apariencia consistente
                tabBarIcon: ({ color, size }) => (<Feather name="settings" size={24} color="black" />)
            }} />
        </Tab.Navigator>
    );
}