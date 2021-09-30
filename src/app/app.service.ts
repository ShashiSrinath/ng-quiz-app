import { Injectable } from '@angular/core';
import {Question} from "./types";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  questions: Question[];


  constructor() { }
}
