import { Injectable } from '@angular/core';
import { Question, Result } from './types';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  user?: string;

  constructor() {}
}
