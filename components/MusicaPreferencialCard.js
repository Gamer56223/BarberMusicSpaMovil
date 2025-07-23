// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/MusicaPreferencialCardStyles';

// function MusicaPreferencialCard({ musicapreferencial, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{eps.NombreOpcion}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Descripción:</Text> {eps.Descripcion}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Stream Url:</Text> {eps.StreamUrlEjemplo}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {eps.Activo}</Text>
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

// export default React.memo(MusicaPreferencialCard);