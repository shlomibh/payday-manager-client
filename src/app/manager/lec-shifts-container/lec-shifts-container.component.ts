import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shift } from 'src/app/models/shift.model';
import { IDate } from 'src/app/models/date.model';
import { ShiftService } from 'src/app/services/shift.service';
import { AuthenticationService } from 'src/app/services';
// קומפננטה העוטפת את כל המשמרות של המרצה


@Component({
  selector: 'app-lec-shifts-container',
  templateUrl: './lec-shifts-container.component.html',
  styleUrls: ['./lec-shifts-container.component.css']
})
export class LecShiftsContainerComponent implements OnInit {
  subscriptions: Subscription[] = [];
  shifts: Shift[]; 
  allSubmitted: boolean = true;
  currentUserRole: string;

  @Input() currentUserId: string;
  @Input() date: IDate;
// בדיקת אימות
  constructor(
    private shiftService: ShiftService,
    private authService: AuthenticationService
    ) { }
//מחזיר את כל המשמרות שבחר הראש מחלקה של אותו מרצה שבחר לפי התאריך שניבחר
// תוך כדי מיון לפי תאריך
  ngOnInit() {
    this.currentUserRole = this.authService.getCurrentUser().role;
    this.subscriptions.push(this.shiftService.getPerMonth(this.currentUserId, this.date)
      .subscribe(data => {
        this.shifts = data;
        this.shifts.forEach( shift => {
          if(shift.submitted === false) this.allSubmitted = false;
        });
      

        this.shifts.sort((a: Shift, b: Shift) => new Date(a.date).getTime() - new Date(b.date).getTime());
      }));
  }
// החזרת התאריך שניבחר באופן תקין 
  changeStringDate(date: string) {
    const splittedDate = date.split('/');
    return `${splittedDate[1]}/${splittedDate[0]}/${splittedDate[2]}`;
  }
// רענון הדף
  refresh() {
    this.ngOnDestroy();
    this.shifts = undefined;
    this.ngOnInit();
  }
// רענון שקורה אחרי שנבחר תאריך כדי לבחור תאריך אחר
  updateDate(dateFromSelector: IDate) {
    this.date = dateFromSelector;
    this.refresh();
  }
// פונקציה שבה הראש מחלקה מאשר את המשמרות של אותו מרצה 
  submitAll() {
    this.subscriptions.push(this.shiftService.submitShifts(this.currentUserId, this.date).subscribe(
      (data: boolean) => this.allSubmitted = data
    ));
  }
//כשהקומפננטה לא מתרחשת
  ngOnDestroy() {
    this.subscriptions.forEach(elem => elem.unsubscribe());
    this.subscriptions = [];
  }

}
