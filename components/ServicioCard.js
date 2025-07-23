// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/ServicioCardStyles';

// function ServicioCard({ servicio, nombreCategoria, nombreEspecialidad, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{servicio.Nombre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Dirección:</Text> {servicio.Descripcion}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {servicio.ImagenPath}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {servicio.PrecioBase}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {servicio.DuracionMinutos}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {servicio.Activo}</Text>

//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Categoria:</Text> {nombreCategoria}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Especialidad:</Text> {nombreEspecialidad}</Text>

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

// export default React.memo(ServicioCard);