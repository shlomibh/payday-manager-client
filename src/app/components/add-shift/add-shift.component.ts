import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Shift } from 'src/app/models/shift.model';
import { ShiftService } from 'src/app/services/shift.service';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css']
})
export class AddShiftComponent implements OnInit {

  @Output() addClickedEE = new EventEmitter();
  shiftForm: FormGroup;

  checked: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private shiftService: ShiftService

  ) {
    this.shiftForm = fb.group({
      date: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      absent: ['']
    });
  }

  ngOnInit() {
  }

  get dateControl(): AbstractControl {
    return this.shiftForm.get('date');
  }

  get startControl(): AbstractControl {
    return this.shiftForm.get('start');
  }

  get endControl(): AbstractControl {
    return this.shiftForm.get('end');
  }


  get absentControl(): AbstractControl {
    return this.shiftForm.get('absent');
  }

  markedChecked(){
    this.checked = !this.checked 
  }

  createShift(): Shift | boolean {
    const date = this.dateControl.value;
    const userID = this.authService.getCurrentUser().id;
    if(date === '' || date === null) return false;
    if (this.checked) { //The employee was absent
      const reason = this.absentControl.value;
      if(reason === '' || reason === null) return false;
      const shift: Shift = {
        date: date.toLocaleDateString(),
        employeeId: userID,
        absent: reason
      };
      return shift;
    }
    else {
      const start = this.startControl.value;
      const end = this.endControl.value;
      if (start !== '' && end !== '') {
        const shift: Shift = {
          date: date.toLocaleDateString(),
          employeeId: userID,
          start: start,
          end: end
        };
        return shift;
      }
      else{
        return false;
      }
    }

  }

  onSubmit() {
    const shift = this.createShift();
    console.log(shift);
    if(shift){
      this.shiftService.post(shift as Shift).subscribe(
        shift => {
          this.shiftForm.reset();
          this.addClickedEE.emit(true);
        }
      );
    }
    else if(!shift){
      console.log('form invalid');  //need to set pop-up error
    }

  }
}
