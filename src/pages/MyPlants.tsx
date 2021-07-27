import React from "react";
import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import colors from "../styles/colors";
import { Header } from "../components/Header";
import waterDrop from "../assets/waterdrop.png"
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";
import { loadPlant, PlantProps, StoragePlantProps } from "../libs/storage";
import { useEffect } from "react";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import fonts from "../styles/fonts";
import { PlantCardSecundary } from "../components/PlantCardSecundary";
import { Load } from "../components/Load";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nextWatered, setnextWatered] = useState<string>();

    function handleRemove(plant: PlantProps){
        Alert.alert('Remover', `Deseja remover a ${plant.name}`,[
            {
                text: "Nao", 
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: async () => {
                    try{
                        const data = await AsyncStorage.getItem('@plantmanager:plants');
                        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

                        delete plants[plant.id];

                        await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));

                    }catch(error){

                    }
                }
            }
        ])
    }

    useEffect(()=>{
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            )

            setnextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} a ${nextTime} horas`
            )

            setMyPlants(plantsStoraged);
            setIsLoading(false);
        }

        loadStorageData();
    },[])

    if (isLoading) return <Load/>
    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image source={waterDrop} style={styles.spotlightImage}/>

                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>

                </Text>

                <FlatList data={myPlants} keyExtractor={(item)=> String(item.id)} 
                renderItem={({item})=> (
                    <PlantCardSecundary data={item} handleRemove={()=> {handleRemove(item)}}/>
                )} 
                showsVerticalScrollIndicator={false} contentContainerStyle={{flex: 1}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingTop:50,
        backgroundColor: colors.background,
        
    },
    spotlight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage:{
        width: 60,
        height: 60
    },
    spotlightText:{
        flex: 1,
        color:colors.blue,
        paddingHorizontal:20,
    },
    plants:{
        flex: 1,
        width: "100%"
    },
    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})