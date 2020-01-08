import {Restriction, Tag} from '../shared/common.types';
import {StepDTO, StepForm} from './step';

export interface TourForm   {
  tourName: string;
  peopleNumber: number;
  tourTags: Array<Tag>;
  tourRestrictions: Array<Restriction>;
  steps: Array<StepForm>
}

export interface TourDTO   {
  id: number;
  tourName: string;
  peopleNumber: number;
  tourTags: Array<Tag>;
  tourRestrictions: Array<Restriction>;
  steps: Array<StepDTO>
}
