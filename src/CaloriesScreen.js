import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts'
import { useSelector, useDispatch } from 'react-redux';
import { setCalorieGoal, subtractCalories, resetCalories } from '../calorieSlice';
import { FAB } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign'



const CaloriesScreen = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  const dispatch = useDispatch();
  const calorieGoal = useSelector((state) => state.calorie.goal);
  const remainingCalories = useSelector((state) => state.calorie.remaining);
  

  console.log('calorieGoal:', calorieGoal);
  console.log('remainingCalories:', remainingCalories);

  const handleSearch = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/noizwaves/nutrition/master/data/food.json');
      const data = await response.json();
      
      const searchTerm = searchQuery.trim().toLowerCase();
      const results = data.filter(food => {
        return food.name.toLowerCase().includes(searchTerm) || food.id.toLowerCase().includes(searchTerm);
      }).map(food => {
        let energy;
        if (food["nutrition-per-100g"]) {
          energy = food["nutrition-per-100g"]["energy"];
        } else {
          energy = food["nutrition-per-100ml"]["energy"];
        }
        return {
          name: food.name,
          energy: energy
        }
      }).slice(0, 2);
      
      setSearchResults(results);
      console.log(selectedResult)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);
  

  const handleSelectResult = (result) => {
    setSelectedResult(result);
    dispatch(subtractCalories(result));
  };

  const progressPercentage = Math.round(((calorieGoal - remainingCalories) / calorieGoal) * 100);
  
  const handleReset = () => {
    dispatch(resetCalories());
  }
  
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity className='bg-[#f4f4f7]' onPress={() => handleSelectResult(item.energy)}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          <Text>Calories: {item.energy} kcal</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View contentContainerStyle={{ flexGrow: 1, backGroundColor:'#F5F5F7' }}>
      <View style={{ padding: 16 }}>
      <TextInput
        style={{ fontSize: 24, fontWeight: 'bold' }}
        placeholder="Enter calorie goal"
        keyboardType="numeric"
        value={calorieGoal ? calorieGoal.toString() : ''}
        onChangeText={(text) => {
          const value = parseInt(text);
          if (!isNaN(value)) {
            dispatch(setCalorieGoal(value));
          } else {
            dispatch(setCalorieGoal(0));
          }
        }}/>
        <View className='pl-2 flex-row space-x-1 items-center bg-gray-200 rounded-2xl'>
        <Icon name='search1' color='gray' size={20}/>
        <TextInput

          placeholder="Search for a food"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          
        />
        </View>
        </View>
      <FlatList 
        
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View className='my-2'>
      <ProgressCircle   style={{ height: 200 }} progress={progressPercentage / 100} progressColor={'rgb(19, 191, 0)'} />
      </View>
      
        <Text className ='my-2 font-bold text-xl self-center'>{remainingCalories} kcal</Text>
        <FAB
        onPress={handleReset}
        title="RESET"
        icon={{ name: 'delete', color: 'white' }}
        color="red"
        
        />  
    
      
    </View>
  );
};

export default CaloriesScreen;
