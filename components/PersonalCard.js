// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/PersonalCardStyles';

// function PersonalCard({ personal, nombreUsuario, nombreSucusal, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{eps.Nombre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Tipo Personal:</Text> {eps.TipoPersonal}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Número Empleado:</Text> {eps.NumeroEmpleado}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Contratación:</Text> {eps.FechaContratacion}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo Empresa:</Text> {eps.ActivoEnEmpresa}</Text>

//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Usuario:</Text> {nombreUsuario}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Sucursal:</Text> {nombreSucusal}</Text>

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

// export default React.memo(PersonalCard);