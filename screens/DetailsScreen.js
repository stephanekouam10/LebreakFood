import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from "react-native";
import COLORS from "../consts/colors";
import { SecondaryButton } from "../components/Button";

const DetailsScreen = ({navigation, route}) => {
    const item = route.params;
    console.log(item)
    return (
        <SafeAreaView style={{backgroundColor: COLORS.white}}>
            <View style={styles.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 280,
                  }}>
                    <Image source={item.image} style={{height: 220, width: 220}} />
                </View>
                <View style={styles.details}>
                    <View 
                      style={{
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center'}}>
                            <Text 
                                style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>
                                {item.name}
                            </Text>
                            <View style={styles.iconContainer}>
                                <Icon name='favorite-border' color={COLORS.primary} size={25} />
                            </View>
                           
                    </View>
                    <Text style={styles.detailsText}>
                        Sit magna cillum veniam tempor labore sit enim amet velit Lorem. 
                        Dolor ad reprehenderit commodo esse ipsum irure voluptate cupidatat 
                        eiusmod aliquip Lorem pariatur amet. Velit et ea anim sint consequat ipsum. 
                        Voluptate duis sunt nisi eu excepteur et nostrud ut dolor culpa et. Occaecat 
                    </Text>
                    <View style={{marginTop: 40, marginBottom: 40}}>
                        <SecondaryButton title={"Add to cart"}/>
                    </View>

                   
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    details: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    iconContainer: {
        backgroundColor: COLORS.white,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 16,
        color: COLORS.white,
    }
});

export default DetailsScreen;