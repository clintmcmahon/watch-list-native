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
    console.log('Fetching dummy data');
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
        const myItems = await AsyncStorage.getItem('@watch-list-items')
        
        if(!myItems)
        {
            return null;
        }        
        return JSON.parse(myItems);

    } catch (e) {
        console.log(e)
    }
}

export const addMyItem = async (item) => {
    try {
        let myItems = await getMyItems();
        if(myItems === null || !Array.isArray(myItems) )
        {
            myItems = [];
        }
        myItems.push(item);
        let myItemsJSON = JSON.stringify(myItems);
        await AsyncStorage.setItem('@watch-list-items', myItemsJSON)
        return myItems;
    } catch (e) {
        console.log(e)
    }
}

export const removeMyItem = async (itemId) => {
    try {
        let myItems = await getMyItems();
        myItems = myItems.filter(function(item) {
            return item.id != itemId;
          });

        let myItemsJSON = JSON.stringify(myItems);
        await AsyncStorage.setItem('@watch-list-items', myItemsJSON);
        return myItems;
    } catch (e) {
        console.log(e)
    }

   
      
}
export const deleteAll = async () =>{
    try {
        await AsyncStorage.removeItem('@watch-list-items')
      } catch(e) {
        console.log(e);
      }
}

const dummyTitles = [
    {id: 1, title: "Shawshank Redemption", service: "Netflix"},
    {id: 2, title: "Tommy Boy", service: "Netflix"},
    {id: 3, title: "Pen 15", service: "Hulu"},
    {id: 4, title: "Paw Patrol", service: "Amazon"},
    {id: 5, title: "Modern Love", service: "Netflix"},
    {id: 6, title: "The Office", service: "Netflix"},
    {id: 7, title: "Seinfeld", service: "Hulu"},
    {id: 8, title: "Schitt's Creek", service: "Netflix"}
]