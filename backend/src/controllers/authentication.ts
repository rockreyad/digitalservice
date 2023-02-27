import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function getErrorStatus(error: any) {
    return error.status || 500;
}

const RegisterAnUserWithEmailAndPassword = async (req: Request, res: Response) => {
    const { firstName, lastName, phone, email, password } = req.body;

    if (!firstName || !lastName || !phone || !email || !password) {
        res.json({ message: "Please submit all the filed" })
    }
    let userData = {
        firstName,
        lastName,
        email,
        password,
        phone
    }

    try {
        const responseData = await prisma.user.create({
            data: userData,
        });

        return res.json(responseData);
    } catch (error: unknown) {
        let status: number = getErrorStatus(error);

        let responseData = {
            status: "FAILED",
            message: error,
        };

        res.status(status || 500).json(responseData);
    }
}


const signInWithEmailAndPassword = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.json({ message: "Please submit all the filed" })
    }
    let userData = {
        email,
        password,
    }

    try {
        const responseData = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!responseData) {
            res.json({ message: "User not found!" })

        }
        if (responseData?.password !== userData.password) {
            return res.json({ message: "Password Error!" })
        }
        return res.json(responseData);
    } catch (error: unknown) {
        let status: number = getErrorStatus(error);

        let responseData = {
            status: "FAILED",
            message: error,
        };

        res.status(status || 500).json(responseData);
    }
}

export { RegisterAnUserWithEmailAndPassword, signInWithEmailAndPassword };