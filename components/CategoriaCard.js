// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/CategoriaCardStyles';

// function CategoriaCard({ categoria, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{categoria.Nombre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Descripcióm:</Text> {categoria.Descripcion}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Tipo Categoria:</Text> {categoria.TipoCategoria}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Icono Clave:</Text> {categoria.IconoClave}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {categoria.Activo}</Text>

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

// export default React.memo(CategoriaCard);