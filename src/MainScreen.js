import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { fetchAlbums, fetchImagesForAlbum } from "./api/ApiService";
import AlbumItem from "./components/AlbumItem";

const MainScreen = () => {
  const [allAlbums, setAllAlbums] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);

  const getAlbums = useCallback(async () => {
    await fetchAlbums()
      .then((fetchedAlbums) => {
        setAllAlbums((prevAlbums) => [...prevAlbums, ...fetchedAlbums]);
        getImages();
      })
      .catch((error) => {
        throw error
      });
  }, []);

  const getImages = useCallback(async () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      try {
        const batchSize = 10;
        const startIndex = currentIndex * batchSize - batchSize;
        const endIndex = currentIndex * batchSize;
        const imagesPromises = await Promise.all(
          allAlbums.slice(startIndex, endIndex).map(async (album) => {
            const images = await fetchImagesForAlbum(album.id);
            return { ...album, images };
          })
        );

        if (imagesPromises.length > 0) {
          setCurrentIndex((prev) => prev + 1);
          setAlbums((prevAlbums) => [...prevAlbums, ...imagesPromises]);
        } else {
          setIsListEnd(true);
        }
      } catch (error) {
        throw error
      } finally {
        setLoading(false);
        setIsListEnd(false);
      }
    }
  }, [loading, isListEnd, currentIndex, allAlbums]);

  const renderFooter = useCallback(() => {
    if (!loading) return null;

    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="small" color="#999999" />
      </View>
    );
  }, [loading]);

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  return (
    <SafeAreaView>
      <FlatList
        data={albums}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={AlbumItem}
        ListHeaderComponent={() => <Text style={styles.header}>Practical Task</Text>}
        style={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        onEndReached={getImages}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    marginVertical: 20,
  },
});

export default MainScreen;