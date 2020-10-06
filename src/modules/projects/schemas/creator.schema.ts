import { Schema as mgSchema, Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Creator extends Document {

  @Prop()
  projectId: string;

  @Prop()
  userId: string;

  @Prop()
  position: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;
}

export const CreatorSchema = SchemaFactory.createForClass(Creator);