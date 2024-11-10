import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const uri = MONGODB_URI;

let client;

client = new MongoClient(uri);

export default client;
