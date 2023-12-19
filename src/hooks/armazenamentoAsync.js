import AsyncStorage from "@react-native-async-storage/async-storage";

// ===============================> Strings 

export async function salvaString(key, value){
    try {
        await AsyncStorage.setItem(key, value);
      } catch (e) {
        console.log(e);
      }
}

export async function consultaPorKey(key){
    try {
        const value = await AsyncStorage.getItem(String(key));
        if (value !== null) {
          return value
        }
      } catch (e) {
        console.log(e);
      }
}

export async function obterTodasKeys(){
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      return keys
    } catch(e) {
      console.log(e);
    }
}

export async function obterConjuntoDados(allKeys){
    let values
    try {
        values = await AsyncStorage.multiGet(allKeys)
        return values
    } catch(e) {
        console.log(e);
    }
  console.log(values)

}

export async function removerPorKey(key){
    try {
        await AsyncStorage.removeItem(key)
      } catch(e) {
        console.log(e);
      }
    console.log('Dado removido com sucesso')
}

export async function removerConjunto(allKeys){
    const keys = allKeys
    try {
      await AsyncStorage.multiRemove(keys)
    } catch(e) {
        console.log(e)
    }
    console.log('Dados removidos com sucesso')
}

// ===============================> Objetos 

export async function salvaObjeto(key, value){
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        console.log(e);
      }
}


export async function consultaObjetoPorKey(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };