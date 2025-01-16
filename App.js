import React,{useState, useEffect} from 'react';
import { ToastAndroid, View, Text, StatusBar, TextInput, FlatList, StyleSheet} from 'react-native';

let originalIdioms = [];

const App = () => {
  const [idioms, setIdioms] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=americanidioms&format=json&case=default")
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          if (originalIdioms.length === 0) {
            setIdioms(myJson);
            originalIdioms = myJson;
          }
        });
  }, []);

  const FilterIdiom = (text) => {
    if (text!= "") {
      let searchIdiom = originalIdioms.filter((item) =>
          item.Idiom.includes(text));
      if (searchIdiom.length > 0) {
        setIdioms(searchIdiom);
      }
      else {
        setIdioms([]);
        ToastAndroid.show("Idiom result not found!", ToastAndroid.SHORT);
      }
    }
    else {
      setIdioms(originalIdioms);
    }
  }

  const renderItem = ({item}) => {
    return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>Idiom: {item.Idiom}</Text>
      <Text style={styles.textStyles}>Meaning: {item.Notes}</Text>
    </View>
    );
  };

  return (
    <View style={{backgroundColor: 'red', flex: 1}}>
      <StatusBar/>
      <Text style={[styles.headerText]}>American Idioms</Text>
      <Text style={styles.textStyles}>Search:</Text>
      <TextInput
          style={styles.inputStyles}
          placeholder={"Seach an idiom"}
          onChangeText={(text) => {FilterIdiom(text)}}/>
      <FlatList data={idioms} renderItem={renderItem} />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    margin: 10,
    backgroundColor: 'yellow'
  },
  textStyles: {
    fontSize: 15,
    margin: 10
  },
  headerText: {
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'skyblue'
  },
  inputStyles: {
    margin: 10,
    borderWidth: 1,
    fontSize: 15
  }
});
