import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { useEffect, useState } from "react"
import { Nota } from "./src/componentes/Nota"
import { buscaNotas, buscaNotasPorCategoria, criaTabela } from "./src/services/Notas"
import { Picker } from "@react-native-picker/picker"



export default function App() {

  const [notas, setNotas] = useState([])  
  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [categoria, setCategoria] = useState("Todas")

  async function mostraNotas(){
   const todasNotas = await buscaNotas()
   setNotas(todasNotas)
  }

  async function filtrarLista(categoria){
    setCategoria(categoria)
    if (categoria == "Todas") mostraNotas()
    else setNotas(await buscaNotasPorCategoria(categoria))
  }

  useEffect(()=>{
    criaTabela()
    mostraNotas()
  },[])



  return (
    <SafeAreaView style={estilos.container}>
      <Picker 
                  selectedValue={categoria}
                  onValueChange={(categoria) => { filtrarLista(categoria)}}
                  on
                  style={estilos.picker}
                >
                  <Picker.Item label="Todas" value="Todas"/>
                  <Picker.Item label="Pessoal" value="Pessoal"/>
                  <Picker.Item label="Trabalho" value="Trabalho"/>
                  <Picker.Item label="Outros" value="Outros"/>
                </Picker>
      <FlatList 
        data={notas}
        keyExtractor={nota => nota.id}
        renderItem={(nota)=> <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>}
      />
      <NotaEditor 
        mostraNotas={mostraNotas} 
        notaSelecionada={notaSelecionada}
        setNotaSelecionada={setNotaSelecionada}
      />
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
  picker: {
    marginVertical: 8
  }
})
