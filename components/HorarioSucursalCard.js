// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/HorarioSucursalCardStyles';

// function HorarioSucursalCard({ horariosucursal, nombreSucursal, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{eps.Nombre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Dia Semana:</Text> {eps.DiaSemana}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Hora Apertura:</Text> {eps.HoraApertura}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Hora Cierre:</Text> {eps.HoraCierre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Esta Cerrado Regularmente:</Text> {eps.EstaCerrado}</Text>

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

// export default React.memo(HorarioSucursalCard);