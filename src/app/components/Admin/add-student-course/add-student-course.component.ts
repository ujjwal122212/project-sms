import { Component, inject, OnInit } from '@angular/core';
import { StudentCourseService } from '../../../Services/student-course.service';
import { response } from 'express';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { StudenttimetableService } from '../../../Services/studenttimetable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student-course',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-student-course.component.html',
  styleUrl: './add-student-course.component.css',
})
export class AddStudentCourseComponent implements OnInit {
  toastr = inject(ToastrService);
  courseForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  studentCourseService = inject(StudentCourseService);

  openform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  CloseModel() {
    this.setformstate();
    this.selectedClass = 0;
    this.selectedSectionId = 0;
    this.Sections = [];
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }
  Classes: any[] = [];
  Classes1: any[] = [];
  Sections: any[] = [];
  Subjects: any[] = [];
  subjectHeading: string[] = ['S.NO', 'SubjectName', 'SubjectCode', 'Action'];
  loadClasses() {
    this.studentCourseService.getClasses().subscribe((response: any) => {
      // console.log(response);
      this.Classes = response;
      // this.Classes1 = response;
      console.log(this.Classes);
    });
  }
  selectedClass: number = 0;
  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    this.courseForm.patchValue({
      sectionId: '',
    });
    this.selectedSectionId = 0;
    this.Sections = [];
    this.Subjects = [];
    this.isSubjectDataEmpty = false;
    this.isCourseFound = false;
    this.loadSectionsByClassId(this.selectedClass);
  }
  loadSectionsByClassId(classId: number): void {
    this.studentCourseService
      .getSectionByClassId(classId)
      .subscribe((response: any) => {
        this.Sections = response;
        console.log(response);
      });
  }

  loadSubjectBySectionId(sectionId: number) {
    this.studentCourseService
      .getSubjectBySectionId(sectionId)
      .subscribe((result: any) => {
        this.Subjects = result;
        if (this.Subjects.length === 0) {
          this.isSubjectDataEmpty = true;
        }
      });
  }
  selectedSectionId: number = 0;
  onSectionChange(event: any) {
    this.selectedSectionId = event.target.value;
  }
  isCourseFound: boolean = false;
  isSubjectDataEmpty = false;
  showCourse() {
    this.isCourseFound = true;
    this.isSubjectDataEmpty = false;
    if (this.selectedSectionId) {
      this.loadSubjectBySectionId(this.selectedSectionId);
    } else {
      this.toastr.warning('Please select a Class and a section');
    }
  }
  setformstate() {
    this.courseForm = this.fb.group({
      subjectId: [0],
      classId: ['', Validators.required],
      sectionId: ['', Validators.required],
      subjectName: ['', Validators.required],
      subjectCode: ['', Validators.required],
    });
  }
  insertSubjects() {
    if (this.courseForm.invalid) {
      this.toastr.warning('Please fill all the valid details');
      return;
    }
    const formValue = this.courseForm.value;
    this.studentCourseService
      .addSubjects(formValue)
      .subscribe((result: any) => {
        this.toastr.success('Course Added Successfully');
        
        // this.toastr.success('Student Added Succesfully');
        // this.loadSubjectBySectionId(formValue.sectionId);
        this.courseForm.reset();
        this.CloseModel();
      });
  }
  onSubmit() {
    console.log(this.courseForm.value);
    this.insertSubjects();
  }

  // Add subject
  subjectForm: FormGroup = new FormGroup({});
  subjectDetail: any[] = [];
  detailSubject: string[] = [
    'Sr no.',
    'Subject',
    'Subject Code',
    'Subject Types',
    'Action',
  ];

  setDetailFormState() {
    this.subjectForm = this.fb.group({
      subjectId: [0],
      subjectType: ['', Validators.required],
      subjectName: ['', Validators.required],
      subjectCode: ['', Validators.required],
      classId: [''],
    });
  }

  loadClasses1() {
    this.studentCourseService.getClasses().subscribe((response: any) => {
      this.Classes1 = response;
      console.log(this.Classes1);
    });
  }

  selectedClassSubject: number = 0;
  onClassChange1(event: any) {
    this.selectedClassSubject = event.target.value;
    this.subjectDetail = [];
    this.isSubjectDataEmptyDetail = false;
    this.isCourseFoundDetail = false;
  }

  loadSubjectDetail(sectionId: number) {
    this.http
      .get(`https://localhost:7262/api/Subject/${sectionId}`)
      .subscribe((result: any) => {
        this.subjectDetail = result;
        console.log(this.subjectDetail);
        if (this.subjectDetail.length === 0) {
          this.isSubjectDataEmptyDetail = true;
        }
      });
  }
  isCourseFoundDetail: boolean = false;
  isSubjectDataEmptyDetail: boolean = false;
  showSubject() {
    this.isCourseFoundDetail = true;
    this.isSubjectDataEmptyDetail = false;
    if (this.selectedClassSubject) {
      this.loadSubjectDetail(this.selectedClassSubject);
    } else {
      this.toastr.warning('Please select a Class and a section');
    }
  }

  deleteSubject(id: number) {
    const isConfirm = confirm('Are you sure you want to delete the subject?');
    if (isConfirm) {
      this.http
        .delete(`https://localhost:7262/api/Subject/${id}`)
        .subscribe(() => {
          this.toastr.error('Subject is Deleted Successfully');
          this.selectedClassSubject = 0;
          // this.Sections1 = [];
          this.subjectDetail = [];
        });
    }
    console.log(id);
  }

  updateSubject(id: number) {
    console.log(id);
    this.http
      .get(`https://localhost:7262/api/Subject/row/${id}`)
      .subscribe((res: any) => {
        console.log(res);
        this.subjectForm.patchValue({
          subjectId: res.subjectId,
          subjectType: res.subjectType,
          subjectName: res.subjectName,
          subjectCode: res.subjectCode,
        });
        this.openform1();
      });
  }

  updateDetailSubject() {
    if (this.subjectForm.invalid) {
      this.toastr.warning('Please fill valid details');
      return;
    }
    const formValue = {
      subjectId: this.subjectForm.value.subjectId,
      subjectType: this.subjectForm.value.subjectType,
      subjectName: this.subjectForm.value.subjectName,
      subjectCode: this.subjectForm.value.subjectCode,
    };
    const subjectId = this.subjectForm.value.subjectId;
    this.http
      .put(
        `https://localhost:7262/api/Subject/${subjectId}`,
        formValue
      )
      .subscribe(
        (response) => {
          this.toastr.success('Subject updated successfully!');
          this.subjectForm.reset({
            subjectId: 0,
          });
          this.selectedClassSubject = 0;
          this.CloseModel1();
        },
        (error) => {
          console.error(error);
          this.toastr.warning(
            'An error occurred while updating the subject. Please try again.'
          );
        }
      );
  }

  insertSubject() {
    if (this.subjectForm.invalid) {
      this.toastr.warning('Please fill all the valid details');
      return;
    }
    const formValue = this.subjectForm.value;
    this.http
      .post('https://localhost:7262/api/Subject/Add Subjects', formValue)
      .subscribe(
        (data: any) => {
          this.toastr.success('Subject Added Successfully');
          this.subjectForm.reset({
            subjectId: 0,
          });
          this.CloseModel1();
        },
        (error) => {
          console.error(error);
          this.toastr.warning(
            'An error occurred while adding the Subject. Please try again.'
          );
        }
      );
  }

  onSubmitSubject() {
    const subjectId = this.subjectForm.value.subjectId;
    if (subjectId === 0) {
      this.insertSubject();
    } else {
      this.updateDetailSubject();
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



  // Course Topic Code Start here

  route = inject(Router);
  topicsForm: FormGroup = new FormGroup({});

  openform2() {
    const formModel = document.getElementById('formModel2');
    if (formModel) {
      formModel.classList.add('openform1');
    }
  }

  CloseModel2() {
    this.topicForm();
    const formModel = document.getElementById('formModel2');
    if (formModel) {
      formModel.classList.remove('openform1');
    }
  }

  topicForm() {
    this.topicsForm = this.fb.group({
      topicsID: [0],
      classId: [0],
      subjectId: [0, Validators.required],
      topics: this.fb.array([]),
      topicName: ['']
    });
    this.addTopic();
  }

  get topics(): FormArray {
    return this.topicsForm.get('topics') as FormArray;
  }

  addTopic() {
    const topicGroup = this.fb.group({
      topicNames: ['', Validators.required]
    });
    this.topics.push(topicGroup);
  }

  removeTopic(index: number): void {
    if (this.topics.length > 1) {
      this.topics.removeAt(index);
    } else {
      this.toastr.warning('At least one topic is required.');
    }
  }


  // post code mappping starts here

  insertSubjectTopics() {
    if (this.topicsForm.invalid) {
      this.toastr.warning('Please fill in all required fields.');
      return;
    }
    const formData = this.topicsForm.value;
    const topicNames: string[] = [];
    formData.topics.forEach((topic: any) => {
      const trimmedNames = topic.topicNames.trim();
      if (trimmedNames !== '') {
        topicNames.push(trimmedNames);
      }
    });
    if (topicNames.length === 0) {
      this.toastr.warning('Please add at least one valid topic name.');
      return;
    }
    const requestBody = {
      subjectId: formData.subjectId,
      topicNames: topicNames
    };
    this.http.post(`https://localhost:7262/AddMultipleTopic`, requestBody).subscribe({
      next: (response) => {
        this.toastr.success('Subject Topics Added Successfully');
        this.resetForm();
        this.CloseModel2();
      },
      error: (error) => {
        this.toastr.error('Error adding topics: ' + error.message);
      }
    });
  }


  resetForm(): void {
    this.topics.clear();
    this.topicsForm.reset({ subjectId: '', classId: '' });
    this.addTopic();
  }


  // get subject topic code starts here 

  onClassChange2(event: any) {
    const classId = event.target.value;
    this.loadSubjectByClassId(classId);
  }
  Course: any[] = [];
  loadSubjectByClassId(ClassId: number) {
    this.http.get(`https://localhost:7262/api/Subject/${ClassId}`).subscribe((response: any) => {
      this.Course = response;
      console.log(this.Course);
    })
  }

  selectedClassId = 0;
  selectedSubjectId = 0;
  isSubjectFound: boolean = false;
  isSubjectDataFound = false;
  onClassChange3(event: any) {
    this.selectedClass = event.target.value;
    this.selectedSubjectId = 0;
    this.subject = [];
    this.courseTopic = [];
    this.isSubjectFound = false;
    this.isSubjectDataFound = false;
    this.loadSubjectByClassId2(this.selectedClass);
  }
  subject: any[] = [];
  loadSubjectByClassId2(ClassId: number) {
    this.http.get(`https://localhost:7262/api/Subject/${ClassId}`).subscribe((response: any) => {
      this.subject = response;
    })
  }
  onSubjectChange(event: any) {
    this.selectedSubjectId = event.target.value;
  }
  courseTopic: any[] = [];
  loadCourseTopicBySubjectId(subjectId: number) {
    this.http.get(`https://localhost:7262/GetTopicsBySubjectId/${subjectId}`).subscribe((response: any) => {
      this.isSubjectDataFound = true;
      this.courseTopic = response;
    })
  }

  showCourseTopic() {
    this.isSubjectFound = true;
    this.isSubjectDataFound = false;
    if (this.selectedClass === 0 || this.selectedSubjectId === 0) {
      this.toastr.warning("Please select a class and a Subject");
      return;
    }
    this.loadCourseTopicBySubjectId(this.selectedSubjectId);
  }


  // Delete Course Topic code Starts here 

  deleteCourseTopicById(id: number) {
    const isConfirm = confirm("Are you sure to want to delete this record ? ");
    if (isConfirm) {
      this.http.delete(`https://localhost:7262/DeleteTopic/${id}`).subscribe((response: any) => {
        this.toastr.error("Course Topic Deleted Successfully ");
        this.selectedClassId = 0;
        this.selectedSubjectId = 0;
        this.subject = [];
        this.courseTopic = [];
      })
    }

  }


  // Edit code starts here

  editCourseTopic(topicsID: number) {
    this.http.get(`https://localhost:7262/GetByCourseTopicsID/${topicsID}`).subscribe((res: any) => {
      console.log("API Response Array:", res);
      if (res.length > 0) {
        const data = res[0];
        this.topicsForm.patchValue({
          topicsID: data.topicsID,
          subjectId: +data.subjectId,
          topicName: data.topicName
        });
      } else {
      }
    });
    this.openform2();
  }
  updation() {
    const formData = {
      topicsID: this.topicsForm.value.topicsID,
      topicName: this.topicsForm.value.topicName,
      subjectId: this.topicsForm.value.subjectId
    }
    if (formData.topicName == "") {
      this.toastr.warning("Please fill a topic name");
      return;
    }
    this.http.put(`https://localhost:7262/UpdateByCourseTopicsId/${formData.topicsID}`, formData).subscribe((res: any) => {
      this.toastr.success("Subject Topic Updated Successfully");
      this.resetForm();
      this.CloseModel2();
      this.selectedClassId = 0;
      this.selectedSubjectId = 0;
      this.subject = [];
      this.courseTopic = [];
    })
  }

  submitTopics() {
    if (this.topicsForm.value.topicsID == 0) {
      this.insertSubjectTopics();
    }
    else {
      this.updation();
    }
  }

  ngOnInit(): void {
    this.setformstate();
    this.setDetailFormState();
    this.loadClasses();
    this.loadClasses1();
    this.topicForm();
  }
}
