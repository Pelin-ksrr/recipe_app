import React from 'react';
import {
  StyleSheet, Text, Image, ScrollView, TouchableOpacity, View, SafeAreaView, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MealDetails({ meal, onBack }) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#ff6347" />
        </TouchableOpacity>
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{meal.strMeal}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.subtitle}>Category: {meal.strCategory}</Text>
          <Text style={styles.subtitle}>Origin: {meal.strArea}</Text>
        </View>
        <Text style={styles.sectionTitle}>Recipe</Text>
        <Text style={styles.text}>{meal.strInstructions}</Text>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {ingredients.map((item, index) => (
          <Text key={index} style={styles.text}>• {item}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    padding: 15,
  },
  image: { 
    width: '100%', 
    height: 250, 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  subtitle: { 
    fontSize: 18, 
    color: '#666',
  },
  sectionTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#ff6347',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  text: { 
    fontSize: 16, 
    color: '#333',
    marginVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'justify',
  },
});