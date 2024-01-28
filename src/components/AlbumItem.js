import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Divider from "./Divider";
import Carousel from "react-native-reanimated-carousel";

const COUNT = 3;
const PAGE_WIDTH = Dimensions.get('screen').width;

export default function AlbumItem({ item }) {
    const baseOptions = {
        vertical: false,
        autoPlay: false,
        width: PAGE_WIDTH / COUNT,
        height: 70,
        marginBottom: 20,
        style: {
            width: PAGE_WIDTH,
        },
    }
    return (
        <View>
            <Text style={styles.albumTitle}>{item.title}</Text>
            <Carousel
                {...baseOptions}
                loop
                data={item.images}
                renderItem={({ item: image }) => (
                    <Image source={{ uri: image.url }} style={styles.image} />
                )}
            />
            <Divider />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 110,
        height: 70,
        marginRight: 10
    },
    albumTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: 'black'
    }
})