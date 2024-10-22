import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudenttimetableService } from '../../../Services/studenttimetable.service';

@Component({
  selector: 'app-add-student-time-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-student-time-table.component.html',
  styleUrl: './add-student-time-table.component.css'
})
export class AddStudentTimeTableComponent implements OnInit {
  timetableservice = inject(StudenttimetableService)
  timetableForm: FormGroup = new FormGroup({});
  dayArray: string[] = ['S.NO', 'TimeSlot', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Action'];
  timeSlotArray: string[] = ['7:00-8:00', '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '1:00-2:00', '2:00-3:00'];
  constructor(private fb: FormBuilder) { }
  Sections: any[] = [];
  Classes: any[] = [];
  timeTable: any[] = [];
  setformstate() {
    this.timetableForm = this.fb.group({
      timetbaleId: [0],
      classId: [''],
      sectionId: [''],
      timeSlot: ['', Validators.required],
      sunday: ['Leave', Validators.required],
      monday: ['', Validators.required],
      tuesday: ['', Validators.required],
      wednesday: ['', Validators.required],
      thursday: ['', Validators.required],
      friday: ['', Validators.required],
      saturday: ['', Validators.required]
    })
  }

  openform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  CloseModel() {
    this.setformstate();
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }
  loadClasses() {
    this.timetableservice.getClasses().subscribe((response: any) => {
      // console.log(response);
      this.Classes = response;
      console.log(this.Classes);
    })
  }
  selectedClass: number = 0;
  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    this.selectedSectionId = 0;
    this.timeTable = [];
    this.isSubjectDataEmpty = false;
    this.isCourseFound = false;
    this.loadSectionsByClassId(this.selectedClass);
  }
  loadSectionsByClassId(classId: number): void {
    this.timetableservice.getSectionByClassId(classId).subscribe((response: any) => {
      this.Sections = response;
      console.log(response);
    })
  }
  selectedSectionId: number = 0;
  onSectionChange(event: any) {
    this.selectedSectionId = event.target.value;
  }
  loadTimeTableBySectionId(sectionId: number) {
    this.timetableservice.getTimeTableBySectionId(sectionId).subscribe((result: any) => {
      this.timeTable = result;
      console.log(this.timeTable);
      if (this.timeTable.length === 0) {
        this.isSubjectDataEmpty = true;
      }
    })
  }
  isCourseFound: boolean = false;
  isSubjectDataEmpty: boolean = false;
  showTimeTable() {
    this.isCourseFound = true;
    this.isSubjectDataEmpty = false;
    if (this.selectedSectionId) {
      this.loadTimeTableBySectionId(this.selectedSectionId);
    } else {
      alert("Please select a Class and a section");
    }
  }
  insertTimetable() {
    if (this.timetableForm.invalid) {
      alert("Please Fill all the valid details");
      return;
    }
    const formvalue = this.timetableForm.value;
    this.timetableservice.addTimeTable(formvalue).subscribe((data: any) => {
      alert("TimeTable Added Suuccessfully");
      // this.loadTimeTableBySectionId(1);
      this.timetableForm.reset();
      this.CloseModel();
    })
  }
  updateTimeTable(id: number) {
    this.openform();
    this.timetableservice.getTimeTableById(id).subscribe((res: any) => {
      console.log(res);
      this.timetableForm.patchValue({
        timetbaleId: res.timetbaleId,
        timeSlot: res.timeSlot,
        sunday: res.sunday,
        monday: res.monday,
        tuesday: res.tuesday,
        wednesday: res.wednesday,
        thursday: res.thursday,
        friday: res.friday,
        saturday: res.saturday
      })
    })
  }

  update() {
    if (this.timetableForm.invalid) {
      alert("Please fill valid details");
      return;
    }
    else if (this.timetableForm.valid) {
      const formvalue = this.timetableForm.value;
      this.timetableservice.updateTimetable(formvalue).subscribe(
        response => {
          alert('Timetable updated successfully!');
          // this.loadTimeTableBySectionId(1);
          this.timetableForm.reset();
          this.CloseModel();
        },
        error => {
          alert('Error updating timetable');
        }
      );
    }
  }




  onSubmit() {
    if (this.timetableForm.value.timetbaleId == 0) {
      this.insertTimetable();
    }
    else if(this.timetableForm.value.timetbaleId>0){
      // this.update1();
      this.update();
    }
  }
  deleteTimeTable(id: number) {
    const isConfirm = confirm("Are you sure to want to delete the time table  ?");
    if (isConfirm) {
      this.timetableservice.deleteTimeTable(id).subscribe((res: any) => {
        alert("TimeTable Deleted Successfully");
        // this.loadTimeTableBySectionId(1);
        this.selectedClass=0;
        this.selectedSectionId=0
        this.Sections=[];
        this.timeTable=[];
      })
    }
  }
  ngOnInit(): void {
    this.setformstate();
    this.loadClasses();
    // this.loadTimeTableBySectionId(1);
  }

}
