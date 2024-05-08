import mongoose from 'mongoose';

export interface ITodo {
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const todoSchema = new mongoose.Schema<ITodo>(
    {
        title: {
            type: String,
            minlength: 3,
            maxlength: 50,
        },
        description: {
            type: String,
            min: 3,
            max: 250,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Todo as mongoose.Model<ITodo> || mongoose.model<ITodo>('Todo', todoSchema);
