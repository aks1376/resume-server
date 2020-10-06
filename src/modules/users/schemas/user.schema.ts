import { Document } from "mongoose";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";

@Schema()
export class User extends Document {

  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop()
  avatar: string;

  @Prop()
  website: string;
}

export const UserSchema = SchemaFactory.createForClass(User);