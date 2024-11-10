import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudenttimetableService } from '../../../Services/studenttimetable.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-student-time-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-student-time-table.component.html',
  styleUrl: './add-student-time-table.component.css',
})
export class AddStudentTimeTableComponent implements OnInit {
  timetableservice = inject(StudenttimetableService);
  timetableForm: FormGroup = new FormGroup({});
  dayArray: string[] = [
    'S.NO',
    'TimeSlot',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Action',
  ];
  timeSlotArray: string[] = [
    '7:00-8:00',
    '8:00-9:00',
    '9:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '1:00-2:00',
    '2:00-3:00',
  ];
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  Sections: any[] = [];
  Classes: any[] = [];
  timeTable: any[] = [];
  Classes1: any[] = [];
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
      saturday: ['', Validators.required],
    });
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
      this.Classes1 = response;
      console.log(this.Classes);
      console.log(this.Classes1);
    });
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
    this.timetableservice
      .getSectionByClassId(classId)
      .subscribe((response: any) => {
        this.Sections = response;
        console.log(response);
      });
  }
  selectedSectionId: number = 0;

  onSectionChange(event: any) {
    this.selectedSectionId = event.target.value;
  }
  loadTimeTableBySectionId(sectionId: number) {
    this.timetableservice
      .getTimeTableBySectionId(sectionId)
      .subscribe((result: any) => {
        this.timeTable = result;
        console.log(this.timeTable);
        if (this.timeTable.length === 0) {
          this.isSubjectDataEmpty = true;
        }
      });
  }
  isCourseFound: boolean = false;
  isSubjectDataEmpty: boolean = false;
  showTimeTable() {
    this.isCourseFound = true;
    this.isSubjectDataEmpty = false;
    if (this.selectedSectionId) {
      this.loadTimeTableBySectionId(this.selectedSectionId);
    } else {
      alert('Please select a Class and a section');
    }
  }
  insertTimetable() {
    if (this.timetableForm.invalid) {
      alert('Please Fill all the valid details');
      return;
    }
    const formvalue = this.timetableForm.value;
    this.timetableservice.addTimeTable(formvalue).subscribe((data: any) => {
      alert('TimeTable Added Suuccessfully');

      this.timetableForm.reset();
      this.CloseModel();
    });
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
        saturday: res.saturday,
      });
    });
  }

  update() {
    if (this.timetableForm.invalid) {
      alert('Please fill valid details');
      return;
    } else if (this.timetableForm.valid) {
      const formvalue = this.timetableForm.value;
      this.timetableservice.updateTimetable(formvalue).subscribe(
        (response) => {
          alert('Timetable updated successfully!');
          // this.loadTimeTableBySectionId(1);
          this.timetableForm.reset();
          this.CloseModel();
        },
        (error) => {
          alert('Error updating timetable');
        }
      );
    }
  }

  onSubmit() {
    if (this.timetableForm.value.timetbaleId == 0) {
      this.insertTimetable();
    } else if (this.timetableForm.value.timetbaleId > 0) {
      // this.update1();
      this.update();
    }
  }
  deleteTimeTable(id: number) {
    const isConfirm = confirm(
      'Are you sure to want to delete the time table  ?'
    );
    if (isConfirm) {
      this.timetableservice.deleteTimeTable(id).subscribe((res: any) => {
        alert('TimeTable Deleted Successfully');
        // this.loadTimeTableBySectionId(1);
        this.selectedClass = 0;
        this.selectedSectionId = 0;
        this.Sections = [];
        this.timeTable = [];
      });
    }
  }

  // ====================detail=============================

  timetableDetailForm: FormGroup = new FormGroup({});
  timeTableDetail: any[] = [];
  detailTable: string[] = ['Day', 'Time', 'Teacher Name', 'Subject', 'Action'];
  Sections1: any[] = [];
  setDetailFormState() {
    this.timetableDetailForm = this.fb.group({
      timetableDetailsId: [0],
      day: ['', Validators.required],
      time: ['', Validators.required],
      sectionId: [''],
      teacherName: ['', Validators.required],
      subject: ['', Validators.required],
      classId: [''],
    });
  }

  loadClasses1() {
    this.timetableservice.getClasses().subscribe((response: any) => {
      this.Classes1 = response;
      console.log(this.Classes1);
    });
  }

  selectedClassDetail: number = 0;
  onClassChange1(event: any) {
    this.selectedClassDetail = event.target.value;
    this.selectedSectionIdDetail = 0;
    this.timeTableDetail = [];
    this.isSubjectDataEmptyDetail = false;
    this.isCourseFoundDetail = false;
    this.loadSectionsByClassIdDetail(this.selectedClassDetail);
  }
  loadSectionsByClassIdDetail(classId: number): void {
    this.timetableservice
      .getSectionByClassId(classId)
      .subscribe((response: any) => {
        this.Sections1 = response;
        console.log(response);
      });
  }
  selectedSectionIdDetail: number = 0;

  onSectionChange1(event: any) {
    this.selectedSectionIdDetail = event.target.value;
  }
  loadTimeTableBySectionIdDetail(sectionId: number) {
    this.http
      .get(`https://localhost:7262/TimeTablesDetails/${sectionId}`)
      .subscribe((result: any) => {
        this.timeTableDetail = result;
        console.log(this.timeTableDetail);
        if (this.timeTableDetail.length === 0) {
          this.isSubjectDataEmptyDetail = true;
        }
      });
  }
  isCourseFoundDetail: boolean = false;
  isSubjectDataEmptyDetail: boolean = false;
  showTimeTableDetail() {
    this.isCourseFoundDetail = true;
    this.isSubjectDataEmptyDetail = false;
    if (this.selectedSectionIdDetail) {
      this.loadTimeTableBySectionIdDetail(this.selectedSectionIdDetail);
    } else {
      alert('Please select a Class and a section');
    }
  }

  deleteTimeTableDetail(id: number) {
    const isConfirm = confirm(
      'Are you sure you want to delete the timetable detail?'
    );
    if (isConfirm) {
      this.http
        .delete(`https://localhost:7262/DeleteTimeTableDetails/${id}`)
        .subscribe(() => {
          alert('Timetable details Deleted Successfully');
          this.selectedClassDetail = 0;
          this.selectedSectionIdDetail = 0;
          this.Sections1 = [];
          this.timeTableDetail = [];
        });
    }
    console.log(id);
  }

  updateTimeTableDetail(id: number) {
    console.log(id);
    this.http
      .get(`https://localhost:7262/RowTimeTablesDetails/${id}`)
      .subscribe((res: any) => {
        console.log(res)
        this.timetableDetailForm.patchValue(
          {
          timetableDetailsId: res.timetableDetailsId,
          time: res.time,
          teacherName: res.teacherName,
          day: res.day,
          subject: res.subject,
        }
        // res
      );
        this.openform1();
      });
  }

  updateDetail() {
    if (this.timetableDetailForm.invalid) {
      alert('Please fill valid details');
      return;
    }
    const formValue = {
      timetableDetailsId: this.timetableDetailForm.value.timetableDetailsId,
      time:this.timetableDetailForm.value.time,
      teacherName:this.timetableDetailForm.value.teacherName,
      day:this.timetableDetailForm.value.day,
      subject:this.timetableDetailForm.value.subject
    }
    const timetableDetailsId=this.timetableDetailForm.value.timetableDetailsId;
    this.http
      .put(
        `https://localhost:7262/UpdateTimeTableDetails${formValue.timetableDetailsId}`,
        formValue
      )
      .subscribe(
        (response) => {
          alert('Timetable detail updated successfully!');
          this.timetableDetailForm.reset({
            timetableDetailsId: 0,
          });
          this.selectedClassDetail=0;
          this.CloseModel1();
        },
        (error) => {
          console.error(error);
          alert(
            'An error occurred while updating the timetable detail. Please try again.'
          );
        }
      );
  }

  insertTimetableDetail() {
    if (this.timetableDetailForm.invalid) {
      alert('Please fill all the valid details');
      return;
    }
    const formValue = this.timetableDetailForm.value;
    this.http
      .post('https://localhost:7262/Add TimeTable Details', formValue)
      .subscribe(
        (data: any) => {
          alert('Timetable Added Successfully');
          this.timetableDetailForm.reset({
            timetableDetailsId: 0,
          });
          this.CloseModel1();
        },
        (error) => {
          console.error(error);
          alert(
            'An error occurred while adding the timetable detail. Please try again.'
          );
        }
      );
  }

  onSubmitDetail() {
    const timetableDetailsId =this.timetableDetailForm.value.timetableDetailsId;
    if (timetableDetailsId === 0) {
    this.insertTimetableDetail();
    } else {
      this.updateDetail();
    }
  }

  openform1() {
    const formModel = document.getElementById('formModel1');
    if (formModel) {
      formModel.classList.add('openform1');
    }
  }

  CloseModel1() {
    this.setDetailFormState();
    const formModel = document.getElementById('formModel1');
    if (formModel) {
      formModel.classList.remove('openform1');
    }
  }
  ngOnInit(): void {
    this.setformstate();
    this.setDetailFormState();
    this.loadClasses();
    this.loadClasses1();
  }
}
