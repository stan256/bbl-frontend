import {Restriction, Tag} from '../shared/common.types';
import {Step} from './Step';

export interface TourCreationDetails {
  peopleNumber: number;
  tourTags: Array<Tag>;
  tourRestrictions: Array<Restriction>;
  steps: Array<Step>
}
