import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Gallery extends Document {

  @Prop()
  fileName: string;

  @Prop()
  projectId: string;

  @Prop()
  type: string;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);