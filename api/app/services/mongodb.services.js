import { MongoClient } from "mongodb";
import { DB_URL, DB_NAME } from "../../config/db.config.js";

const dbService = () => {
    return new Promise( async (res, rej) => {
        try{
            let client = await MongoClient.connect(DB_URL);
            let db = client.db(DB_NAME);
            // console.log(`Connected to MongoDB at ${DB_URL} for database ${DB_NAME}`);
            res(db);
            
        }catch(error){
            rej(error);
        }
    })
}

export const insertData = (table, data) => {
    return new Promise((res, rej) => {
        dbService()
            .then((db) => {
                // console.log(db)
                db.collection(table)
                // console.log(data)
                .insertOne(data, (err, ack) => {
                    // console.log(err)
                        if(err){
                            rej(err)
                        }else{
                            res(data)
                        }
                    })
                })
            .catch((err) => {
                rej(err)
            })    
    })
    
}

export const fetchData = () => {}

export const updateData = () => {}

export const deleteData = () => {}

export default dbService;