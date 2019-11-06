import {Message} from './message'

export interface Dog {
    id: string;
    name: string;
    lostDate: string;
    lostHour: string;
    lostArea: string;
    creationDate: string;
    additionalData?: string; 
    userId?: string;
    messages?: Message[]
  }
  