import { CreateLinkInput } from './create-link.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLinkInput extends PartialType(CreateLinkInput) {
  id: number;
}
