// This file extends NextAuth type definitions to include additional properties in the session
// Import necessary interfaces from NextAuth
import { DefaultSession } from "next-auth";
import { SessionStatus } from "next-auth/react";

// Declare the "next-auth" module to extend its type definitions
declare module "next-auth" {
  interface User {
    email: string;
    userId: string;
    image: string
    name: string
  }

  // Define the Session interface to include additional properties specific to our application
  interface Session extends DefaultSession {
    user?: User;
    expires: string;
    status: SessionStatus;
    update: () => void;
  }
}