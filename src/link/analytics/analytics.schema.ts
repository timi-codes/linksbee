import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

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
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);