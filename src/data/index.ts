import type { Item, Week } from '../types';
import { week1 } from './week1';
import { week2 } from './week2';
import { week3 } from './week3';
import { week4 } from './week4';

export const weeks: Week[] = [week1, week2, week3, week4];

export const weekItems = (week: Week): Item[] => week.lessons.flatMap((l) => l.items);

export const allItems: Item[] = weeks.flatMap(weekItems);
