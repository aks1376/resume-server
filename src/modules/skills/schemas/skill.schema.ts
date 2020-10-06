import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Skill extends Document {

  @Prop()
  name: string;

  @Prop()
  group: string;

  @Prop()
  icon: string;

  @Prop()
  rate: string;

  @Prop()
  descriptions: string[];
}

export const SkillSchema = SchemaFactory.createForClass(Skill);