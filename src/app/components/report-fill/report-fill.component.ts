import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
import { Report } from 'src/app/models/report.model';

@Component({
  selector: "app-report-fill",
  templateUrl: "./report-fill.component.html",
  styleUrls: ["./report-fill.component.css"]
})
export class ReportFillComponent {
  hourReportForm: FormGroup;
  reports: FormArray;
    
  constructor(private fb: FormBuilder) {

    this.hourReportForm = fb.group({
      reports: this.fb.array([this.createReport()])
    });
  }

  addReport(): void {
    this.reports = this.hourReportForm.get('reports') as FormArray;
    this.reports.push(this.createReport());
    console.log(this.reports);
  }

  createReport(): FormGroup {
    return this.fb.group({
      date: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      comment: ['']
    });
  }

}