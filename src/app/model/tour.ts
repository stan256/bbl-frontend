import {Restriction, Tag} from '../shared/common.types';
import {StepForm} from './step';

export interface TourForm   {
  tourName: string;
  peopleNumber: number;
  tourTags: Array<Tag>;
  tourRestrictions: Array<Restriction>;
  steps: Array<StepForm>
}
