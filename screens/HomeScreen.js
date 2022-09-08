import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput, ScrollView, FlatList, Dimensions, TouchableHighlight } from 'react-native'
import React from 'react';
import { auth } from '../firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../consts/colors';
import categories from '../consts/categories';
import foods from '../consts/foods';
const {width} = Dimensions.get("screen");
const cardWidth = width/2 - 20;

const HomeScreen = () => {
  
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }


    const [selectedCategoryIndex,  setSelectedCategoryIndex] = React.useState(0);
    const ListCategories = () => {
        return ( 
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesListContainer}>
                {categories.map((category, index) => (
                    <TouchableOpacity key={index} activeOpacity={0.8} onPress={()=>setSelectedCategoryIndex(index)}>
                        <View style={{
                            backgroundColor:selectedCategoryIndex == index
                            ? COLORS.primary
                            : COLORS.secondary,
                            ...styles.categoryBtn}}>
                                <View style={styles.categoryBtnImgCon}>
                                    <Image 
                                      source={category.image}
                                      style={{height: 35, width: 35, resizeMode: 'cover'}} 
                                    />
                                </View>
                                <Text style={{
                                    fontSize: 15, 
                                    fontWeight: 'bold', 
                                    marginLeft: 10,
                                    color: selectedCategoryIndex == index ? COLORS.white : COLORS.primary}}>
                                        {category.name}
                                </Text>
                            </View>
                    </TouchableOpacity>

                ))}
            </ScrollView>
        );
    };

    const Card = ({food}) => {
        return (
            <TouchableHighlight 
            underlayColor={COLORS.white} 
            activeOpacity={0.9} 
            onPress={()=>navigation.navigate('DetailsScreen', food)}>
                <View style={styles.Card}>
                    <View style={{alignItems: 'center',  top: -40}}>
                        <Image source={food.image} style={{height: 120, width: 120}}/>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{food.name}</Text>
                        <Text style={{fontSize: 14, color: COLORS.grey, marginTop: 2}}>{food.ingredients}</Text>
                    </View>
                    <View 
                    style={{marginTop: 5, marginHorizontal: 20, 
                    flexDirection:'row', justifyContent: "space-between"}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>€ {food.price}</Text>
                        <View style={styles.addToCardBtn}>
                            <Icon name="add" size={20} color={COLORS.white} />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
   
  
  
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <View style={styles.header}>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 28}}>Hello,</Text>
                        <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>Stephane</Text>
                    </View>
                    <Text style={{marginTop: 10, fontSize: 22, color: COLORS.grey}}>
                        What do you want today
                    </Text>
                </View>
                <Image source={require('../assets/person.png')} style={{height: 50, width: 50, borderRadius: 25}} />
            </View>
            <View
                style={{
                    marginTop: 40,
                    flexDirection: 'row',
                    paddingHorizontal: 20
                }}>
                    <View style={styles.inputcontainer}>
                        <Icon name="search" size={28} />
                        <TextInput 
                          style={{flex: 1, fontSize: 18}}
                          placeholder= "Search for food"
                        />
                    </View>
                    <View style={styles.sortBtn}>
                        <Icon name="tune" size={28} color={COLORS.white} />
                    </View>
            </View>
            <View>
                <ListCategories />
            </View>
            <FlatList 
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={foods}
              renderItem={({item}) => <Card food={item} />}
            />
        </SafeAreaView>





    )




    {/* <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email} </Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View> */}
  
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    inputcontainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row'
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Card: {
        height: 220,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: COLORS.secondary
    },
    addToCardBtn: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent:'center',
        alignItems: 'center',
    },

    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        
    },
})