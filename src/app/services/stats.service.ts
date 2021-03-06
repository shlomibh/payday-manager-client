import { Injectable } from '@angular/core';
import { Shift } from '../models/shift.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IDate } from '../models/date.model';
//     הקשורות לסטטיסטיקה http קומפננטה הקשורה לבקשות 
@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(
    private http: HttpClient
    ) { }
//סטטיסטיקה לפי תאריך שנבחר
    getStatsPerMonth(identifyAPI: String, date: IDate): Observable < Shift[] > {
      console.log(`statistics/${identifyAPI}/m=${date.month}/y=${date.year}`);
      return this.http.get(`/api/statistics/${identifyAPI}/m=${date.month}/y=${date.year}`)
        .pipe(map((data: Shift[]) => {
          return data;
        }));
    }
// המרצים שדיווחו בזמן או לא דיווחו בזמן-נמצא בדף של הסטטיסטיקה
    getLectorsStats() {
      return this.http.get('/api/statistics/lectors-stats');
    }
}
