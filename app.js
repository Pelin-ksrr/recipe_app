import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  FlatList, Image, SafeAreaView, StatusBar
} from 'react-native';
import MealDetails from './MealDetails';

export default function App() {
  const [mealName, setMealName] = useState('');
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const searchMeals = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
      const data = await response.json();
      setMeals(data.meals);
    } catch (error) {
      console.error(error);
    }
  };

  if (selectedMeal) {
    return (
      <MealDetails meal={selectedMeal} onBack={() => setSelectedMeal(null)} />
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>🍽️ Delicious Recipes</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search Meal..."
            placeholderTextColor="#ccc"
            value={mealName}
            onChangeText={setMealName}
          />
          <TouchableOpacity onPress={searchMeals} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={meals}
          keyExtractor={item => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedMeal(item)}>
              <View style={styles.item}>
                <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                <Text style={styles.mealName}>{item.strMeal}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f8f8',
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#ff6347',
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row', 
    marginHorizontal: 20,
    marginBottom: 20,
  },
  input: { 
    flex: 1,
    height: 50, 
    borderColor: '#ddd', 
    borderWidth: 1, 
    borderRadius: 25,
    paddingHorizontal: 20, 
    backgroundColor: '#fff',
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#ff6347',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  item: { 
    flexDirection: 'row', 
    marginVertical: 8, 
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
  },
  image: { 
    width: 100, 
    height: 100, 
  },
  mealName: { 
    fontSize: 20, 
    color: '#333',
    flex: 1,
    padding: 10,
    alignSelf: 'center',
  },
});