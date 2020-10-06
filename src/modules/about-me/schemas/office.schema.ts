import { Document } from "mongoose";
import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";

@Schema()
export class Office extends Document {
  
  @Prop()
  name: string;
  
  @Prop()
  website: string;

  @Prop()
  icon: string;
  
  @Prop()
  startDate: string;
  
  @Prop()
  endDate: string;
  
  @Prop()
  position: string;
}

export const OfficeSchema = SchemaFactory.createForClass(Office);