import * as SQLite from 'expo-sqlite';


function abreConexao(){
    const database = SQLite.openDatabase("database.db")
    return database
}

export const db = abreConexao()
