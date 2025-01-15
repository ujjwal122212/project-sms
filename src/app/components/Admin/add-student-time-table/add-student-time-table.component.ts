import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudenttimetableService } from '../../../Services/studenttimetable.service';
import { HttpClient } from '@angular/common/http';
import { error } from 'node:console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student-time-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-student-time-table.component.html',
  styleUrl: './add-student-time-table.component.css',
})
export class AddStudentTimeTableComponent implements OnInit {
  toastr = inject(ToastrService);
  timetableservice = inject(StudenttimetableService);
  timetableForm: FormGroup = new FormGroup({});
  isEdit: boolean = false;
  isDetailEdit: boolean = false;
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
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  Sections: any[] = [];
  Classes: any[] = [];
  timeTable: any[] = [];
  Classes1: any[] = [];
  setformstate() {
    this.timetableForm = this.fb.group({
      timetbaleId: [0],
      classId: [''],
      sectionId: [''],
      timeTableEntries: this.fb.array([]),
      timeSlot: [''],
      sunday: ['Leave'],
      monday: [''],
      tuesday: [''],
      wednesday: [''],
      thursday: [''],
      friday: [''],
      saturday: [''],
    });
    this.addTimeTableEntries();
  }
  get timeTableEntries(): FormArray {
    return this.timetableForm.get('timeTableEntries') as FormArray;
  }
  addTimeTableEntries() {
    const entries = this.fb.group({
      timeSlot: ['', Validators.required],
      sunday: ['Leave', Validators.required],
      monday: ['', Validators.required],
      tuesday: ['', Validators.required],
      wednesday: ['', Validators.required],
      thursday: ['', Validators.required],
      friday: ['', Validators.required],
      saturday: ['', Validators.required],
    });
    this.timeTableEntries.push(entries);
  }

  removeTimeTableEntries(index: number) {
    if (this.timeTableEntries.length > 1) {
      this.timeTableEntries.removeAt(index);
    } else {
      this.toastr.warning('At least one Time Table is required.');
    }
  }

  openform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  CloseModel() {
    this.selectedClass = 0;
    this.isEdit=false;
    this.Classes=[]
    this.Sections=[]
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
      this.toastr.warning('Please select a Class and a section');
    }
  }
  insertTimetable() {
    if (this.timetableForm.invalid) {
      this.toastr.warning('Please fill in all the valid details');
      return;
    }
    const formValue = this.timetableForm.value;
    this.timetableservice.addTimeTable(formValue).subscribe({
      next: (data: any) => {
        this.toastr.success('TimeTable added successfully');
        this.timetableForm.reset();
        this.setformstate();
        this.CloseModel();
        this.selectedClass = 0;
        this.selectedSectionId = 0;
        this.Sections = [];
        this.timeTable = [];
      },
      error: (err) => {
        console.error('Error adding timetable:', err);
        this.toastr.warning('Failed to add TimeTable. Please try again.');
      },
    });
  }

  updateTimeTable(id: number) {
    this.isEdit = true;
    this.timetableservice.getTimeTableById(id).subscribe((res: any) => {
      console.log(res);
      this.timetableForm.patchValue({
        timetbaleId: res.timetbaleId,
        timeSlot: res.timeSlot,
        sunday: 'Leave',
        monday: res.monday,
        tuesday: res.tuesday,
        wednesday: res.wednesday,
        thursday: res.thursday,
        friday: res.friday,
        saturday: res.saturday,
        sectionId: res.sectionId
      });
    });
    this.openform();
  }

  update() {
    const formValue = this.timetableForm.value;
    const updateRequirement = {
      timetbaleId: formValue.timetbaleId,
      timeSlot: formValue.timeSlot,
      sunday: formValue.sunday,
      monday: formValue.monday,
      tuesday: formValue.tuesday,
      wednesday: formValue.wednesday,
      thursday: formValue.thursday,
      friday: formValue.friday,
      saturday: formValue.saturday,
      sectionId: formValue.sectionId,
    }
    this.timetableservice.updateTimetable(updateRequirement, updateRequirement.timetbaleId).subscribe({
      next: (data: any) => {
        this.toastr.success('TimeTable updated successfully');
        this.timetableForm.reset();
        this.setformstate();
        this.CloseModel();
        this.selectedClass = 0;
        this.selectedSectionId = 0;
        this.Sections = [];
        this.timeTable = [];
      },
      error: (err) => {
        console.error('Error updating timetable:', err);
        this.toastr.warning('Failed to update TimeTable. Please try again.');
      },
    });
  }

  onSubmit() {
    if (this.isEdit == false) {
      console.log(this.timetableForm.value);
      this.insertTimetable();
    }
    else if (this.isEdit == true) {
      this.update();
    }


  }
  deleteTimeTable(id: number) {
    const isConfirm = confirm(
      'Are you sure to want to delete the time table  ?'
    );
    if (isConfirm) {
      this.timetableservice.deleteTimeTable(id).subscribe((res: any) => {
        this.toastr.error('TimeTable Deleted Successfully');
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
      timeTableDetailsList: this.fb.array([]),
      classId: ['', Validators.required],
      sectionId: ['', Validators.required],
      day: [''],
      time: [''],
      teacherId: [''],
      subject: ['']
    });
    this.addTimeTableDetailsList();
  }
  get timeTableDetailsList(): FormArray {
    return this.timetableDetailForm.get('timeTableDetailsList') as FormArray;
  }
  dayList: String[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  addTimeTableDetailsList() {
    const entries = this.fb.group({
      timetableDetailsId: [0],
      day: ['', Validators.required],
      time: ['', Validators.required],
      teacherId: ['', Validators.required],
      subject: ['', Validators.required]
    });
    this.timeTableDetailsList.push(entries);
  }
  removeTimeTableDetailList(index: number) {
    if (this.timeTableDetailsList.length > 1) {
      this.timeTableDetailsList.removeAt(index);
    } else {
      this.toastr.warning('At least one time table detail is required.');
    }
  }

  allTeacherrs: any[] = []
  loadAllTeachers() {
    this.http.get(`https://localhost:7262/api/Teacher/GetTeachers`).subscribe((res: any) => {
      this.allTeacherrs = res;
    })
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
      this.toastr.warning('Please select a Class and a section');
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
          this.toastr.error('Timetable details Deleted Successfully');
          this.selectedClassDetail = 0;
          this.selectedSectionIdDetail = 0;
          this.Sections1 = [];
          this.timeTableDetail = [];
        });
    }
    console.log(id);
  }

  updateTimeTableDetail(id: number) {
    this.loadAllTeachers();
    this.isDetailEdit = true
    console.log(id);
    this.http
      .get(`https://localhost:7262/RowTimeTablesDetails/${id}`)
      .subscribe((res: any) => {
        console.log(res)
        this.timetableDetailForm.patchValue(
          {
            timetableDetailsId: res.timetableDetailsId,
            time: res.time,
            teacherId: res.teacherId,
            day: res.day,
            subject: res.subject,
            sectionId: res.sectionId
          }
        );
        this.openform1();
      });
  }

  updateDetail() {
    const formValue = {
      timetableDetailsId: this.timetableDetailForm.value.timetableDetailsId,
      time: this.timetableDetailForm.value.time,
      teacherId: this.timetableDetailForm.value.teacherId,
      day: this.timetableDetailForm.value.day,
      subject: this.timetableDetailForm.value.subject,
      sectionId: this.timetableDetailForm.value.sectionId
    }
    const timetableDetailsId = this.timetableDetailForm.value.timetableDetailsId;
    this.http
      .put(
        `https://localhost:7262/UpdateTimeTableDetails${formValue.timetableDetailsId}`,
        formValue
      )
      .subscribe(
        (response) => {
          this.toastr.success('Timetable detail updated successfully!');
          this.timetableDetailForm.reset({
            timetableDetailsId: 0,
          });
          this.selectedClassDetail = 0;
          this.selectedSectionIdDetail = 0;
          this.Sections1 = [];
          this.timeTableDetail = [];
          this.allTeacherrs = []
          this.CloseModel1();
        },
        (error) => {
          console.error(error);
          this.toastr.warning(
            'An error occurred while updating the timetable detail. Please try again.'
          );
        }
      );
  }

  insertTimetableDetail() {
    
    if (this.timetableDetailForm.invalid) {
      this.toastr.warning('Please fill all the valid details');
      return;
    }
    const formValue = this.timetableDetailForm.value;
    this.http
      .post('https://localhost:7262/AddTimeTableDetails', formValue)
      .subscribe(
        (data: any) => {
          this.toastr.success('Timetable Added Successfully');
          this.timetableDetailForm.reset({
            timetableDetailsId: 0,
          });
          this.selectedClassDetail = 0;
          this.selectedSectionIdDetail = 0;
          this.Sections1 = [];
          this.timeTableDetail = [];
          this.allTeacherrs = []
          this.CloseModel1();
          
        },
        (error) => {
          console.error(error);
          this.toastr.warning(
            'An error occurred while adding the timetable detail. Please try again.'
          );
        }
      );
  }

  onSubmitDetail() {
    const timetableDetailsId = this.timetableDetailForm.value.timetableDetailsId;
    if (this.isDetailEdit == false) {
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
    this.loadAllTeachers();
    this.selectedClassDetail = 0;
    this.isDetailEdit=false;
    this.Sections1 = [];
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
    this.loadAllTeachers();
  }
}
