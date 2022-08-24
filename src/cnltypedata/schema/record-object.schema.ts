import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { QueryNames } from '../enum/query-names.enum';


export type RecordObjectDocument = RecordObject & mongoose.Document;
@Schema()
export class RecordObject {
  @Prop({ type: String })
  schema: string;

  @Prop({ type: String })
  tableName: string;

  @Prop({ type: String, enum: QueryNames })
  queryName: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  data: Record<string, unknown>;
}

export const recordObjectSchema = SchemaFactory.createForClass(RecordObject);