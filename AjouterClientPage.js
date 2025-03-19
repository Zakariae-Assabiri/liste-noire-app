import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getDatabase, ref, set } from 'firebase/database';

export default function AjouterClientPage({ navigation }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [motif, setMotif] = useState('');

  // Fonction pour ajouter un client
  const ajouterClient = () => {
    const db = getDatabase();
    const clientRef = ref(db, 'noms/' + nom + prenom); // Référence à l'emplacement des données

    set(clientRef, {
      nom,
      prenom,
      motif,
    })
      .then(() => {
        alert('Client ajouté avec succès');
        setNom('');
        setPrenom('');
        setMotif('');
        navigation.goBack(); // Revenir à la page précédente après l'ajout
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du client : ', error);
        alert('Erreur lors de l\'ajout du client');
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Retour" onPress={() => navigation.goBack()} />
      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
        style={styles.input}
      />
      <TextInput
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        style={styles.input}
      />
      <TextInput
        placeholder="Motif"
        value={motif}
        onChangeText={setMotif}
        style={styles.input}
      />
      <Button title="Ajouter Client" onPress={ajouterClient} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    padding: 8,
  },
});
