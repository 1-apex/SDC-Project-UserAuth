const z  = require("zod");
// import {z} from "zod";

// creating an object schema
const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is required." })
        .min(3, { message: "Name must be atleast 3 characters." })
        .max(255, { message: "Name cannot be more than 255 characters." }),

    email: z
        .string({ required_error: "Email is required." })
        .email({ message: "Invalid email address." })
        .min(3, { message: "Name must be atleast 3 characters." })
        .max(255, { message: "Name cannot be more than 255 characters." }),

    prn: z
        .string({ required_error: "PRN is required." }),

    password: z
        .string({ required_error: "Password is required." })
        .min(8, { message: "Password must be atleast 8 characters." })
        .max(1024, { message: "Password cannot be more than 1024 characters." }),
});

module.exports = signupSchema;