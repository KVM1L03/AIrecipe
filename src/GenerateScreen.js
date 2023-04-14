import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView,TouchableOpacity } from 'react-native';
import { Configuration, OpenAIApi } from "openai";
import {OPENAI_API_KEY} from '@env'
import { FAB } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { subtractCalories } from '../calorieSlice';
import { useDispatch } from 'react-redux';





const GenerateScreen = () => {
  const [productsText, setProductsText] = useState('');
  const [recipeText, setRecipeText] = useState('');
  const [caloriesText, setCaloriesText] = useState('');
  const [headingText,setHeadingText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false);
  const [addCalories, setAddCalories] = useState(null);

  
  const dispatch = useDispatch();

  const handleAdd = (result) => {
    setAddCalories(result);
    dispatch(subtractCalories(result));
  };

  
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateRecipe = async () => {
    setIsGenerating(true);
    try {
      
      
      const completion = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:[{role: "user", content:`Generate a recipe using the following products: ${productsText}. Make sure to include detailed instructions and a list of ingredients. Under last line give number of calories in a form: 'Calories per serving: ammount of calories.`}],       
        temperature: 0.7,
        max_tokens: 1000

      })

      const recipe = completion.data.choices[0].message.content.trim();
      const caloriesIndex = recipe.lastIndexOf('Calories per serving:');
      const recipeText = recipe.slice(0, caloriesIndex).trim();
      const recipeWithoutHeading = recipeText.split('\n').slice(1).join('\n').trim();

      const heading = recipeText.split('\n\n')[0];
      const caloriesRegex = /:\s*(\d+)\s*calorie/;
      const caloriesMatch = recipe.match(caloriesRegex);
      const calories = parseInt(caloriesMatch[1]);

      

        
       
      setCaloriesText(calories);
      setRecipeText(recipeWithoutHeading);
      setHeadingText(heading);
      console.log(recipe);
    } catch (error) {
      console.error(error);
      
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <View className='bg-[#F5F5F7]'>
    <View className='my-5 bg-[#F5F5F7]'>
    <Text style={{fontFamily: 'Roboto_400Regular'}} className='text-xl font-bold text-[#1D1D1F] self-center'>Let AI generate a perfect recipe for you !</Text>
    </View>
    <ScrollView contentContainerStyle={{  alignItems: 'center', justifyContent: 'center', backgroundColor:'#F5F5F7'}}>
      <TextInput
        value={productsText}
        onChangeText={setProductsText}
        placeholder="Enter product names separated by commas"
        style={{borderColor:'#13bf00',borderWidth:1, padding:20, borderRadius:20, marginTop:20}}
      />
     <FAB style={{marginTop:20, padding:2}}  title="GENERATE RECIPE" color="#13bf00" onPress={generateRecipe} tintColor='white'
      loading={isGenerating} disabled={isGenerating} animated 
      animationDuration={200} animationConfig={{ useNativeDriver: true }} />
      {recipeText ? (
      <View className="p-4 my-5 bg-[#f4f4f7]rounded-xl shadow-gray-600 shadow-xl">
        <View className="bg-[#212121] px-4 py-5 flex justify-between items-center" 
        style={{borderTopEndRadius:20, borderTopStartRadius:20}}>
          <Text className='text-gray-300 font-bold text-lg self-center'>{headingText}</Text>
        </View>
        <View className="bg-[#ededef] px-4 py-3 flex justify-between items-center">
        <Text className="text-[#212121] font-bold text-lg">{recipeText}</Text>
        </View>
        <View style={{borderBottomEndRadius:20, borderBottomStartRadius:20}} className="bg-[#212121] px-4 py-4 flex-row justify-between items-center mb-20">
         
        <Text className="text-gray-300 font-bold text-lg self-center"><Icon name='fire' color='red' size={24}/>   {caloriesText} calories per serving</Text>
        <TouchableOpacity onPress={() => handleAdd(caloriesText)}>
        <Icon name='plus-circle' color='red' size={24}/>
        </TouchableOpacity>
      </View>
    </View>):(<View></View>)}
    </ScrollView>
    </View>
  );
}


export default GenerateScreen;
