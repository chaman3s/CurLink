import { Request, Response } from "express";

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { disease, query, location } = req.body;

    // 🔥 later: call service here
    // const result = await chatService.process({ disease, query, location });

    return res.status(200).json({
      success: true,
      data: {
        disease,
        query,
        location
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