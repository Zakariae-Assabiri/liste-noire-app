import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Importation des pages supplémentaires
import AjouterClientPage from './AjouterClientPage';
import RechercheClientPage from './RechercheClientpage';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBmMi3UVqmqXg-xUQF4Gaq1SsBBzHzjDak",
  authDomain: "black-liste-c5643.firebaseapp.com",
  databaseURL: "https://black-liste-c5643-default-rtdb.firebaseio.com",
  projectId: "black-liste-c5643",
  storageBucket: "black-liste-c5643.appspot.com",
  messagingSenderId: "755525338251",
  appId: "1:755525338251:ios:6c5e62b61c28e9fb6dc08e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Stack = createStackNavigator();

const AccueilPage = ({ navigation }) => (
  <View style={styles.centeredContainer}>
    <Text style={styles.title}>Bienvenue à la Page d'Accueil</Text>

    <View style={styles.buttonContainer}>
      <Button 
        title="Ajouter un Client" 
        onPress={() => navigation.navigate('AjouterClientPage')} 
      />
    </View>

    <View style={styles.buttonContainer}>
      <Button 
        title="Chercher un Client" 
        onPress={() => navigation.navigate('RechercheClientPage')} 
      />
    </View>
  </View>
);

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('AccueilPage');
    } catch (error) {
      setError(error.message);
      Alert.alert('Erreur de connexion', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Se connecter" onPress={handleLogin} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    marginBottom: 20, // Ajoute un espacement entre les boutons
    width: '80%', // Facultatif : permet une largeur uniforme des boutons
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="AccueilPage" component={AccueilPage} />
        <Stack.Screen name="AjouterClientPage" component={AjouterClientPage} />
        <Stack.Screen name="RechercheClientPage" component={RechercheClientPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
