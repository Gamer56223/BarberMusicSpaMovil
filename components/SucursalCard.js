// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/SucursalCardStyles';

// function SucursalCard({ sucursal, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{sucursal.Nombre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Dirección:</Text> {sucursal.ImagenPath}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {sucursal.TelefonoContacto}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {sucursal.EmailContacto}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {sucursal.LinkMaps}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {sucursal.Latitud}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {sucursal.Longitud}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {sucursal.Activo}</Text>

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

// export default React.memo(SucursalCard);