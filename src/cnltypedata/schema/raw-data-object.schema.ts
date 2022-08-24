import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SyncStatusCode } from '../enum/sync-status-code.enum';
import { SyncStatus } from '../enum/sync-status.enum';
import { SyncType } from '../enum/sync-type.enum';
import { RecordObject, recordObjectSchema } from './record-object.schema';


export type RawDataObjectDocument = RawDataObject & mongoose.Document;

@Schema({ collection: 'PLM_raw_data' })
export class RawDataObject {
  @Prop({ type: String, enum: SyncType })
  syncType: SyncType;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  eventPayload: Record<string, unknown>;

  @Prop({ type: Date })
  eventDate: Date;

  @Prop({ type: String })
  id: string;

  @Prop({ type: String })
  cnl: string;

  @Prop({ type: String })
  user: string;

  @Prop({ type: String, enum: SyncStatus })
  status: SyncStatus;

  @Prop({ type: Number, enum: SyncStatusCode })
  statusCode?: SyncStatusCode;

  @Prop({ type: [recordObjectSchema] })
  record: RecordObject[];

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Number, default: 0 })
  retryCount: number;

  @Prop({ type: String })
  errorTableId: string;

  _id: string;
}

export const rawDataSchema = SchemaFactory.createForClass(RawDataObject);
