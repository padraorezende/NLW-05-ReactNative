import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native'
import colors from "../styles/colors";
import { Header } from "../components/Header";
import waterDrop from "../assets/waterdrop.png"
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";
import { PlantProps } from "../libs/storage";

export function MyPlants() {
    const [] = useState<PlantProps[]>([]);
    const [loadig, setLoading] = useState();
    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image source={waterDrop} style={styles.spotlightImage}/>

                <Text style={styles.spotlightText}>

                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>

                </Text>

                <FlatList/>
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

    },
    spotlightImage:{

    },
    spotlightText:{

    },
    plants:{

    },
    plantsTitle:{

    }
})