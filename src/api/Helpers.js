import AsyncStorage from '@react-native-community/async-storage';

//const HOST = process.env.REACT_APP_API_HOST;
const HOST = "https://localhost:5001";

export const getAvailableTitles = async () =>{
    try {
        const availableTitles = await AsyncStorage.getItem('@watch-list-all-titles')
        return availableTitles != null ? JSON.parse(availableTitles) : null;
    } catch (e) {
        console.log(e)
    }
}
export const featchAndSaveAllTitlesDummy = async () => {
    let titles = dummyTitles;
    const jsonTitles = JSON.stringify(titles);
    await AsyncStorage.setItem('@watch-list-all-titles', jsonTitles)
}

export const fetchAndSaveAllTitles = async () => {
    try {
        let response = await fetch(
            `${HOST}/titles`,
        );
        let titlesResponse = await response.json();
        let titles = titlesResponse.map(obj => {
            return obj.title;
        });
        const jsonTitles = JSON.stringify(titles);
        
        await AsyncStorage.setItem('@watch-list-all-titles', jsonTitles)
    } catch (error) {
        console.error(error);
    }
}

export const getMyItems = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@watch-list-items')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}

export const addMyItem = async (item) => {
    try {
        const jsonValue = JSON.stringify(item)
        await AsyncStorage.setItem('@watch-list-items', jsonValue)
    } catch (e) {
        console.log(e)
        // saving error
    }
}

const dummyTitles = [
    {title: "Shawshank Redemption", service: "Netflix"},
    {title: "Tommy Boy", service: "Netflix"},
    {title: "Pen 15", service: "Hulu"},
    {title: "Paw Patrol", service: "Amazon"},
    {title: "Modern Love", service: "Netflix"},
    {title: "The Office", service: "Netflix"},
    {title: "Seinfeld", service: "Hulu"},
    {title: "Schitt's Creek", service: "Netflix"}
]