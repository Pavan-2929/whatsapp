import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body.members; // Destructure members object
    const newConversation = await Conversation.create({
      members: [senderId, receiverId],
    });

    res.status(200).json(newConversation)
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (req, res, next) => {
    try {
        const conversations = await Conversation.find({
            members: { $in : [req.params.id]},
        })

        res.status(200).json(conversations)
    } catch (error) {
        next(error)
    }
}
