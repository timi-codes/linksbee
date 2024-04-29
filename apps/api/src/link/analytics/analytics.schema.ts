import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Analytics {
  @Prop()
  bee_id: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  country: {
    code: string;
    name: string;
  };

  @Prop()
  browser: string;

  @Prop()
  os: string;

  @Prop()
  referer: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
