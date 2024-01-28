import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest } from './RequestHelpers';

const fetchAlbums = async () => {
    try {
        const cachedAlbums = await AsyncStorage.getItem('albums');
        if (cachedAlbums) {
            return JSON.parse(cachedAlbums);
        } else {
            const albums = await getRequest('/albums')
            await AsyncStorage.setItem('albums', JSON.stringify(albums));
            return albums;
        }
    } catch (error) {
        throw error;
    }
};

const fetchImagesForAlbum = async (albumId) => {
    try {
        const cachedImages = await AsyncStorage.getItem(`images_${albumId}`);
        if (cachedImages) {
            return JSON.parse(cachedImages);
        } else {
            const images = await getRequest('/photos', { albumId })
            await AsyncStorage.setItem(`images_${albumId}`, JSON.stringify(images));
            return images;
        }
    } catch (error) {
        throw error;
    }
};

export { fetchAlbums, fetchImagesForAlbum };

