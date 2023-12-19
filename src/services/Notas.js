import { db } from './SQLite'

export function criaTabela(nomeTabela){
    db.transaction((transaction)=>{
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "notas " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);")
    })
}