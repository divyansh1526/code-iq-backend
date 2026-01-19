import {Inngest} from "inngest";
import { connectDB } from "./db";
import User from "../models/User.js";

export const inngest = new Inngest({id: "code-iq"});

const syncUser = inngest.createFunction(
  {id: "Sync-User"},
  {event: "clerk/user.created"},
  async ({event}) => {
    await connectDB();
    const {id, email_addresses, first_name, last_name, image_url} = event.data;
    const newuser = {
        clerkId: id,
        name: `${first_name || ""} ${last_name || ""}`,
        email: email_addresses[0].email_address,
        profileImage: image_url
    }

    await User.create(newuser);
  }
);

const deleteUser = inngest.createFunction(
  {id: "Delete-User"},
  {event: "clerk/user.deleted"},
  async ({event}) => {
    await connectDB();
    const {id} = event.data;
    await User.deleteOne({clerkId: id});
  }
);

export const functions = {syncUser, deleteUser};