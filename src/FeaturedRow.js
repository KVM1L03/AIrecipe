import { View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';


const DATA= [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    shortDescription:'The Mediterranean diet is inspired by the dietary habits of, well, the Mediterranean. It promotes fresh, non-processed foods, including vegetables, olive oil, fish, and chicken.',
    title: 'Mediterranean Diet',
    raiting: 4.5,
    image:'https://www.byrdie.com/thmb/mPIECdCurjo4UdxjXoXhnL_NoJI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Stocksy_mediterranean-diet_748046-575b2b345f9b58f22ef4b2e1.jpg'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    shortDescription:'The 5:2 diet is most popular in the United Kingdom, Australia, and Sweden and consists of two days following a restricted calorie fast and five days of normal eating',
    title: '5:2 Diet',
    raiting: 4.6,
    image:'https://www.byrdie.com/thmb/5Rc5PGA5R3D14tJ6tS2KmwWM214=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Berry-Breakfast-Pizza-57769b183df78cb62c50e459.jpg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    shortDescription:'The Paleo diet claims that modern foods have evolved much faster than our bodies, causing problems and illnesses',
    title: 'Paleo Diet',
    raiting: 4.8,
    image:'https://www.byrdie.com/thmb/stnhdpOK0UKttAs2Jy-KJqwuJME=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cdn.cliqueinc.com__cache__posts__267900__healthy-fats-for-keto-267900-1537218198786-main.700x0c-70fd8d6351584224b8871882afe9204f.jpg'
  },]

  const DATA2= [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      kcal:1020,
      title: 'Peruvian Steak',
      time: '30 min',
      image:'https://whatsfordinner.net/images/Meals/Peruvian-Steak-and-Pasta-Stir-Fry/LargeImage/Peruvian-Steak-and-Pasta-Stir-Fry.jpg'
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bn',
      kcal:911,
      title: 'Beefy Nachos',
      time: '20 min',
      image:'https://whatsfordinner.net/images/Meals/Beefy-Nachos/LargeImage/Beefy-Nachos.jpg'
    },]

const FeaturedRow = ({id,title,description}) => {
    
  return (
    <View>
      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{title}</Text>
        <Icon name='arrow-right' color="#13bf00" size={20}/>
      </View>
      <Text className='text-xs text-gray-400 px-4'>{description}</Text>
      <FlatList horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:10}}
      className='pt-3'
      renderItem={({item})=>{
        return (  
            <TouchableOpacity className='p-2.5 items-center bg-white mr-3 shadow-xl rounded-xl'>
              <Image source={{uri:item.image}} className='h-36 w-64 rounded'/>
            
              <View className=' px-3 pb-4'>
                <View className='flex-row items-center space-x-1'>
                  <Text className='pt-2 text-lg font-bold'>{item.title}  </Text>
                </View>
                <View className='flex-row items-center space-x-1 '>
                
                <Text className='pt-2 text-lg '><Icon name='clock' color={'gray'} size={20} /> {item.time} </Text>
                <View/>
                <View className='flex-row items-center space-x-1 '>
                <Text className='pt-2 text-lg text-center'> <Icon name='fire' color={'orange'} size={20}/> {item.kcal}  kcal </Text>
                </View>
              </View>
            </View>
            </TouchableOpacity>
            
          )
        
      }}
      data={DATA2}/>
      
      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>Explore new diets</Text>
        <Icon name='arrow-right' color="#13bf00" size={24}/>
      </View>
      <FlatList horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:10}}
      className='pt-3'
      renderItem={({item})=>{
        return (
            <TouchableOpacity className='p-2.5 items-center my-2 bg-white mr-3 shadow-lg rounded-xl'>
              <Image source={{uri:item.image}} className='h-36 w-64 rounded'/>
              <View className='flex-row items-center space-x-1 '>
                <Text className='pt-2 text-lg font-bold'>{item.title}  </Text>
                <Text className='pt-2 text-lg font-bold'> <Icon name='star' size={20} color='gold'/> {item.raiting} </Text>
                
              </View>
            </TouchableOpacity>
            
          )
        
      }}
      data={DATA}/>
      
      
    </View>
  )
}

export default FeaturedRow