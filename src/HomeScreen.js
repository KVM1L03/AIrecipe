import { View, Text, SafeAreaView, Image, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'
import FeaturedRow from './FeaturedRow'


const DATA = [
  {
    id: 1,
    title: 'Vegetarian',
    image:'https://www.eatright.org/-/media/eatrightimages/food/nutrition/vegetarianandspecialdiets/vegetarianism-basic-facts-878734076.jpg'
  },
  {
    id: 2,
    title: 'Keto',
    image:'https://hips.hearstapps.com/hmg-prod/images/keto-diet-foods-1607725237.jpg?crop=1.00xw:0.751xh;0,0.163xh&resize=1200:*'
  },
  {
    id: 3,
    title: 'Vegan',
    image:'https://images-prod.healthline.com/hlcmsresource/images/AN_images/vegetarian-diet-plan-1296x728-feature.jpg'
  },
  {
    id: 4,
    title: 'Low Carb',
    image:'https://www.healthshots.com/wp-content/uploads/2020/08/low-carb-diet-1.jpg'
  },
  {
    id: 5,
    title: 'Pescatarian',
    image:'http://cdn.shopify.com/s/files/1/0250/0362/2496/articles/1160.png?v=1644902945'
  },
];


const HomeScreen = ({item}) => {
    const navigation=useNavigation()

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown:false
      })
    }, [])
  
    return (
    <SafeAreaView className='flex-1 space-y-3 bg-[#F5F5F7]'>
      
      <View className="bg-[#F5F5F7] flex-row pt-3 items-center pl-2 p-3">
        <Image source={{uri:'https://picsum.photos/200/300'}}
        className="w-7 h-7 rounded-full p-5"/>
        <View className="flex-1 mx-4">
          <Text className='text-xs font-roboto'>Hello !</Text>
          <Text className='font-bold text-xl font-roboto'>Username
          
          </Text>
        </View>
        
        <Icon name='user' size={30} color="#13bf00"/>
        
      </View>
      <ScrollView>
      <View className='pt-2 flex-row items-center space-x-2 pb-2 mx-4'>
        <View className='pl-2 flex-row space-x-1 flex-1 items-center bg-gray-200 rounded-2xl'>
          <Icon name='search1' color='gray' size={20}/>
          <TextInput className='rounded-xl'
          placeholder='Find your recipe !'
          keyboardType='default'/>
        </View>
        <TouchableOpacity>
        <Icon name='search1' color="#13bf00" size={24}/></TouchableOpacity>
      </View>
      <View>
        <FlatList
        data={DATA}
        renderItem={({item})=>(
        <TouchableOpacity className='relative mt-3 px-0.5 mr-2 items-center'>
          <Image className="h-20 w-20 rounded" source={{uri:item.image}}/>
          <Text className='absolute bottom-1 font-semibold text-gray-100 drop-shadow-xl shadow-black'>
            {item.title}
          </Text>
        </TouchableOpacity>)}
        keyExtractor={item=>item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        />
      </View>
      <FeaturedRow title="Featured"
      description='Most popular recipes'/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen