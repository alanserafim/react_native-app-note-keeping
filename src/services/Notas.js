import { db } from './SQLite'

export function criaTabela(nomeTabela){
    db.transaction((transaction)=>{
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "notas " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);")
    })
}

export async function adicionaNota(nota){
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("INSERT INTO notas (titulo, categoria, texto) values (?, ?, ?);", 
            [nota.titulo, nota.categoria, nota.texto], () => {
                resolve("Nota adicionada com sucesso")
            })
        })
    })
    
}

export async function atualizaNota(nota){
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("UPDATE notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;", 
            [nota.titulo, nota.categoria, nota.texto, nota.id], () => {
                resolve("Nota atualizada com sucesso")
            })
        })
    })  
}

export async function removeNota(nota){
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("DELETE FROM notas WHERE id = ?;", 
            [nota.id], () => {
                resolve("Nota removida com sucesso")
            })
        })
    })  
}

export async function buscaNotas(){
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("SELECT * FROM notas;", 
            [], (transaction, resultado) => {
                resolve(resultado.rows._array)
            })
        })
    })
    
}


export async function buscaNotasPorCategoria(categoria){
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("SELECT * FROM notas WHERE categoria = ?;", 
            [categoria], (transaction, resultado) => {
                resolve(resultado.rows._array)
            })
        })
    }) 
}


