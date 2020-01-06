import {Restriction, Tag} from '../shared/common.types';
import {StepDTO} from './Step';

export interface TourDTO   {
  id: number;
  peopleNumber: number;
  tourTags: Array<Tag>;
  tourRestrictions: Array<Restriction>;
  steps: Array<StepDTO>
}
