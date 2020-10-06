import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Message extends Document {

  @Prop()
  name: string

  @Prop()
  email: string;

  @Prop()
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);