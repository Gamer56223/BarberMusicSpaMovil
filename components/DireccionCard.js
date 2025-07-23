// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/DireccionCardStyles';

// function DireccionCard({ direccion, nombreDireccionable, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{direccion.DireccionableType}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Dirección:</Text> {direccion.Direccion}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {direccion.Colonia}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {direccion.CodigoPostal}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {direccion.Ciudad}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {direccion.Estado}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {direccion.Referencias}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {direccion.EsPredeterminada}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Direccionable:</Text> {nombreDireccionable}</Text>
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

// export default React.memo(DireccionCard);