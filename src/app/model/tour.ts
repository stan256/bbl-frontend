import {Restriction, Tag} from '../shared/common.types';
import {StepDTO, StepForm} from './step';

export interface TourForm   {
  peopleNumber: number;
  tourTags: Array<Tag>;
  tourRestrictions: Array<Restriction>;
  steps: Array<StepForm>
}

export interface TourDTO   {
  id: number;
  peopleNumber: number;
  tourTags: Array<Tag>;
  tourRestrictions: Array<Restriction>;
  steps: Array<StepDTO>
}
