import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Shift } from 'src/app/models/shift.model';
import { ActivatedRoute } from '@angular/router';
// schdule-page    קומפננטה של הצגת משמרת בדף דיווח השעות תוך שימוש המנותבת לדף ה    
@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {

  @Input() shift: Shift;
  @Output() deleteEE = new EventEmitter();
  canDelete = true;

  constructor(private route: ActivatedRoute) { }
//הפעלת הקומפננטה
  ngOnInit() {
    const date = this.shift.date.split('/');
    this.shift.date = `${date[1]}/${date[0]}/${date[2]}`;
    this.canDelete = this.route.snapshot.url[0].path === 'schedule';
  }
//מחיקת דיווח
  delete() {
    this.deleteEE.emit(this.shift._id);
  }

}
