import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Project extends Document {

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  creators: string;

  @Prop()
  website: string;

  @Prop()
  technologies: string[];

}

export const ProjectSchema = SchemaFactory.createForClass(Project);