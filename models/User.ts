import mongoose, { Schema, Document, ObjectId, models } from 'mongoose'

// Define the interfece representing the structure of a user
export interface IUser {
  _id: ObjectId
  name: string
  email: string
  password: string
  createdAt: string | Date
  updatedAt: string | Date
}

// Define the interface extending Document 
export interface IUserSchema extends Document {
  _id: ObjectId
  name: string
  email: string
  password: string
  createdAt: string | Date
  updatedAt: string | Date
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      tolowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      tolowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  },
  {
    timestamps: true, // Enable automatic timestamp generation (createdAt, updatedAt)
    versionKey: false // Disable the "__v" version key added by Mongoose by default
  }
)

// Export the user model using the Mongoose instance
// If a model named "User" already exists, use that, otherwise, create a new one using the schema defined above
export const UserModel = models?.User || mongoose.model('User', userSchema)