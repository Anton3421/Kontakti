import { useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';


export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        sort: Contacts.SortTypes.LastName
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Get Contacts" onPress={getContacts} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});