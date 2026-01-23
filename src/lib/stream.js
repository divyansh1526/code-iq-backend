import {StreamChat} from 'stream-chat';
import {ENV} from "./env.js"

const apikey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apikey || !apiSecret) {
    throw new Error("Stream API key and secret must be set in environment variables.");
}

export const chatClient = StreamChat.getInstance(apikey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try{
        await chatClient.upsertUser(userData);
    }
    catch(error){
        console.error("Error upserting Stream user:", error);
        throw error;
    }
}

export const deleteStreamUser = async (userId) => {
    try{
        await chatClient.deleteUser(userId, { mark_messages_deleted: true });
        return true;
    }
    catch(error){
        console.error("Error deleting Stream user:", error);
        throw error;
    }
}