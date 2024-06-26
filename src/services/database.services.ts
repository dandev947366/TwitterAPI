
import { MongoClient, Db, Collection } from 'mongodb';
import { config } from 'dotenv';
import User from '../models/schemas/User.schema'
config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.fntf2eu.mongodb.net/`


class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() { 
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
}
  async connect(){
  console.log('uri ', uri)
  console.log('DB_USERNAME ', process.env.DB_USERNAME)
  console.log('DB_PASSWORD ', process.env.DB_PASSWORD)
  
  try {
        await this.db.command({ ping: 1 })
        console.log('Pinged your deployment. You successfully connected to MongoDB!')
      } catch (error){
        console.log('error', error)
        console.log('Cannot connect to MongoDB')
       
      }
  
  }
  
  
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string);
  }
  

  
  }


const databaseService = new DatabaseService()
export default databaseService