import {Restriction, Tag} from '../shared/common.types';
import {StepForm} from './step';

export interface TourForm {
  tourName: string;
  peopleNumber: Array<number>;
  tourTags: Array<Tag>;
  tourRestrictions: Array<Restriction>;
  steps: Array<StepForm>;
  creatorId: number;
}
