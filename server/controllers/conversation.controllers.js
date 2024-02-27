import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res, next) => {
  try {
    const newConversation = await Conversation.create({members: [req.body.senderId, req.body.receiverId]});

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
