import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { useEffect, useState } from "react"
import { Nota } from "./src/componentes/Nota"
import { criaTabela } from "./src/services/Notas"



export default function App() {

  const [notas, setNotas] = useState([])


  async function mostraNotas(){
   
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
