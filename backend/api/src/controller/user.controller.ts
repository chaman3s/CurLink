import { Request, Response } from "express";
import { chatProccess } from "../services/chat.services";

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { disease, query, location } = req.body;

    const result = chatProccess( req.body)

    return res.status(200).json({
      success: true,
      data: {
        disease,
        query,
        location,
        result
      }
    });

  } catch (error) {
    console.error("Chat Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};