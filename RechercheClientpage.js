import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getDatabase, ref, get, child } from 'firebase/database';

export default function RechercheClientPage({ navigation }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [resultat, setResultat] = useState(null);
  const [couleur, setCouleur] = useState('');

  const chercherClient = async () => {
    const db = getDatabase();
    const clientRef = ref(db, 'noms'); // Référence générale à "noms"

    try {
      const snapshot = await get(clientRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Parcours des clients pour trouver une correspondance
        const clientTrouve = Object.values(data).find(
          (client) =>
            client.nom.toLowerCase() === nom.trim().toLowerCase() &&
            client.prenom.toLowerCase() === prenom.trim().toLowerCase()
        );

        if (clientTrouve) {
          setResultat(`Motif: ${clientTrouve.motif}`);
          setCouleur('red'); // Rectangle rouge si le client existe
        } else {
          setResultat('Client non existant');
          setCouleur('green'); // Rectangle vert si le client n'existe pas
        }
      } else {
        setResultat('Aucune donnée trouvée');
        setCouleur('green');
      }
    } catch (error) {
      console.error('Erreur lors de la recherche : ', error);
      setResultat('Erreur lors de la recherche');
      setCouleur('');
    }
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

      <Button title="Chercher Client" onPress={chercherClient} />

      {resultat !== null && (
        <View style={[styles.resultContainer, { backgroundColor: couleur }]}> 
          <Text style={styles.resultText}>{resultat}</Text>
        </View>
      )}
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
  resultContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
  },
  resultText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
