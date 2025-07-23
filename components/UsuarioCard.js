// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/UsuarioCardStyles';

// function UsuarioCard({ usuario, nombreMusica, nombreSucursal, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{eps.Nombre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Email:</Text> {usuario.Email}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Verificar Email:</Text> {usuario.Email_Verified_At}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Password:</Text> {usuario.Password}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Imagen Path:</Text> {usuario.ImagenPath}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Telefono:</Text> {usuario.Telefono}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Rol:</Text> {usuario.Rol}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {usuario.Activo}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Recordar Token:</Text> {usuario.RememberToken}</Text>

//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Musica:</Text> {nombreMusica}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Sucursal:</Text> {nombreSucursal}</Text>

//             </View>
//             <View style={styles.actions}>
//                 <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
//                     <Ionicons name="create-outline" size={26} color="#1976D2" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
//                     <Ionicons name="trash-outline" size={26} color="#D32F2F" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={onDetail} style={styles.iconBtn}>
//                     <Ionicons name="bulb-outline" size={26} color="silver" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

// export default React.memo(UsuarioCard);