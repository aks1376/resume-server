import { Document } from "mongoose";
import { SchemaFactory, Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class AboutMe extends Document {
  
  @Prop()
  description: string;
}

export const AboutMeSchema = SchemaFactory.createForClass(AboutMe);
