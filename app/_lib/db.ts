import mongoose from 'mongoose';
import config from 'config';
import Todo from '../_models/Todo';

declare global {
    var mongoose: any;
}

const connectionString = config.get<string>('mongoDB.connectionString');
if (!connectionString) {
    console.error(
        'MongoDB connection string was not set! Exiting the process...'
    );
    process.exit(1);
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(connectionString, {
                dbName: 'todo',
            })
            .then((mongoose) => {
                console.log('MongoDB connection established successfully!');
                return mongoose;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error('MongoDB connection failed!', error);
		process.exit(1);
    }

    return cached.conn;
}

export async function dbSeed() {
    await dbConnect();
    await Todo.deleteMany();

    await Todo.create([
        {
            title: 'Todo 1.1',
            description: 'Todo desc 1.1',
        },
        {
            title: 'Todo 2.2',
            description: 'Todo desc 2.2',
        },
        {
            title: 'Todo 3.3',
            description: 'Todo desc 3.3',
        },
    ]);
}
