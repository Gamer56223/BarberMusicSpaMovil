import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaLogin from '../../Screen/Auth/Login'; // Importa la pantalla de Login


// Crea una instancia de Stack Navigator
const Stack = createNativeStackNavigator();

export default function AuthNavegacion({ updateUserToken }) {
    return (
        <Stack.Navigator
            // Opciones de estilo globales para el encabezado de todas las pantallas en esta pila
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#007B8C', // Color de fondo del encabezado
                    shadowColor: '#000', // Color de la sombra para efecto de elevación
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5, // Elevación para Android
                },
                headerTintColor: '#FFFFFF', // Color del texto y los iconos en el encabezado
                headerTitleStyle: {
                    fontWeight: 'bold', // Estilo de la fuente del título
                    fontSize: 20, // Tamaño de la fuente del título
                },
                headerTitleAlign: 'center', // Alinea el título al centro
                contentStyle: {
                    backgroundColor: '#E0F2F7', // Color de fondo del contenido de la pantalla
                },
            }}
        >
            {/* Pantalla de Login */}
            <Stack.Screen
                name="Login" // Nombre de la ruta para esta pantalla
                // Utilizamos una función `children` para pasar props adicionales a `PantallaLogin`.
                // Esto es necesario porque `updateUserToken` es una prop personalizada y no es parte de las props estándar de navegación.
                children={({ navigation }) => (
                    <PantallaLogin
                        navigation={navigation} // Pasamos el objeto `navigation` estándar
                        updateUserToken={updateUserToken} // Pasamos nuestra prop personalizada
                    />
                )}
                options={{ title: 'Iniciar Sesión' }} // Título que se mostrará en el encabezado
            />

        </Stack.Navigator>
    );
}