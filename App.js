import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Nota } from "./src/componentes/Nota"
import { criaTabela } from "./src/services/Notas"



export default function App() {

  const [notas, setNotas] = useState([])


  async function mostraNotas(){
    const todasChaves = await AsyncStorage.getAllKeys()
    const todasNotas = await AsyncStorage.multiGet(todasChaves)
    setNotas(todasNotas)
    console.log(todasNotas);
  }

  async function removerNotas(){
    const todasChaves = await AsyncStorage.getAllKeys()
    await AsyncStorage.multiRemove(todasChaves)
  }

  useEffect(()=>{
    criaTabela()
    mostraNotas()
  },[])



  return (
    <SafeAreaView style={estilos.container}>
      <FlatList 
        data={notas}
        keyExtractor={nota => nota[0]}
        renderItem={(nota)=> <Nota {...nota}/>}
      />
      <NotaEditor mostraNotas={mostraNotas}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})
