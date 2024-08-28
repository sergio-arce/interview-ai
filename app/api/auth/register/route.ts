
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import { connectMongoDB } from '@/lib'
import { IUserSchema, UserModel } from '@/models/User'
import { isValidEmail } from '@/utils/isValidEmail'

// create user
export const POST = async (req: NextRequest) => {

  try {
    const { name, lastname, email, password, confirmPassword } = await req.json()
    // validate fields
    if (!name || !lastname || !email || !password || !confirmPassword) {
      return NextResponse.json({ message: 'The field is required' }, { status: 400 })
    }
    // validate email
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: 'Please enter a valid email address' }, { status: 400 })
    }
    // match passwords
    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 })
    }
    // connect with mongo DB
    await connectMongoDB()
    // verified user
    const userFind = await UserModel.findOne({ email })
    if (userFind) {
      return NextResponse.json({ error: 'A user with this email is already registered.' }, { status: 400 })
    }
    //
    const hashedPassword = await bcrypt.hash(password, 10)
    // create a new user
    const newUser: IUserSchema = new UserModel({
      name: `${name} ${lastname}`,
      email,
      password: hashedPassword
    })
    // save user
    await newUser.save()

    return NextResponse.json(
      {
        user: {
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
        },
        message: "Success usuario creado"
      },
      {
        status: 201
      })

  } catch (error) {
    return NextResponse.json({ message: 'ERROR' }, { status: 500 })
  }
}






