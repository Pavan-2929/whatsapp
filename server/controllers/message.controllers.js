import Message from "../models/message.model.js";

export const createMessage = async (req, res, next) => {
  try {
    const newMessage = await Message.create(req.body);

    res.status(200).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId});

    res.status(200).json(messages)
  } catch (error) {
    next(error)
  }
};
