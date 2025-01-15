import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-subject-topic',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-subject-topic.component.html',
  styleUrl: './add-subject-topic.component.css'
})
export class AddSubjectTopicComponent implements OnInit {
   toastr = inject(ToastrService);
  Classes: any[] = [];
  Sections: any[] = [];
  Subjects: any[] = [];
  subjectTopicForm: FormGroup = new FormGroup({});

  http = inject(HttpClient);

  constructor(private fb: FormBuilder) {}
  setSubjectTopicFormState() {
    this.subjectTopicForm = this.fb.group({
      topicsID: [0],
      classId: [''],
      sectionId: [''],
      subjectId: [''],
      topicName: ['', Validators.required],
    });
  }

  loadClass() {
    this.http.get('https://localhost:7262/Classes').subscribe((res: any) => {
      this.Classes = res;
      console.log(this.Classes);
    });
  }
  selectedClass: number = 0;
  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    this.loadSectionByClassId(this.selectedClass);
  }

  loadSectionByClassId(classId: number) {
    this.http.get(`https://localhost:7262/${classId}`).subscribe((res: any) => {
      this.Sections = res;
      console.log(this.Sections);
    });
  }

  selectedSection: number = 0;
  onSectionChange(event: any) {
    this.selectedSection = event.target.value;
    this.loadSubjectBySectionId(this.selectedSection);
  }

  loadSubjectBySectionId(sectionId: number) {
    this.http
      .get(`https://localhost:7262/api/Subject/${sectionId}`)
      .subscribe((res: any) => {
        this.Subjects = res;
        console.log(this.Subjects);
      });
  }

  selectedSubject: number = 0;
  onTopicChange(event: any) {
    this.selectedSubject = event.target.value;
  }

  showTopic() {
    if (this.selectedSubject) {
      this.loadTopic(this.selectedSubject);
    } else {
      this.toastr.warning('Please select a valid Class and Section.');
    }
  }

  onSubmit() {
    if (this.subjectTopicForm.value.topicsID == 0) {
      this.insertTopic();
    } else if (this.subjectTopicForm.value.topicsID > 0) {
      this.EditTopic();
    }
  }

  Data: any[] = [];
  loadTopic(id: any) {
    this.http
      .get(`https://localhost:7262/api/CourseTopics/${id}`)
      .subscribe((res: any) => {
        this.Data = res;
      });
  }

  insertTopic() {
    if (this.subjectTopicForm.invalid) {
      this.toastr.warning('Please fill valid detail');
      return;
    } else {
      const formValue = this.subjectTopicForm.value;
      this.http
        .post(
          `https://localhost:7262/api/CourseTopics/Add CourseTopics`,
          formValue
        )
        .subscribe((res: any) => {
          this.toastr.success('Subject topic added successfully');
          this.subjectTopicForm.reset();
          this.CloseModel();
        });
    }
  }
  updateTopic(id: number) {
    this.openform();
    this.http
      .get(`https://localhost:7262/api/CourseTopics/row/${id}`)
      .subscribe((res: any) => {
        console.log(res);
        this.subjectTopicForm.patchValue({
          topicsID: res.topicsID,
          classId: res.classId,
          sectionId: res.sectionId,
          subjectId: res.subjectId,
          topicName: res.topicName,
        });
      });
  }

  EditTopic() {
    if (this.subjectTopicForm.invalid) {
      this.toastr.warning('Please fill all the valid details');
      return;
    }
    const formData = {
      topicsID: this.subjectTopicForm.value.topicsID,
      subjectId: this.subjectTopicForm.value.subjectId,
      topicName: this.subjectTopicForm.value.topicName,
    };
    this.http.put(`https://localhost:7262/api/CourseTopics/${formData.topicsID}`,formData).subscribe((res:any)=>{
      this.toastr.success("Course Topics updated successfully");
      this.subjectTopicForm.reset();
      this.CloseModel();
      this.selectedClass=0;
      this.selectedSection=0;
      this.selectedSubject=0;
    })
  }

  deleteTopic(id: number) {
    const isConfirm = confirm('Are you sure to want to delete the topic  ?');
    if (isConfirm) {
      this.http
        .delete(
          `https://localhost:7262/api/CourseTopics/DeleteCourseTopicByID${id}`
        )
        .subscribe((res: any) => {
          this.toastr.error('Topic deleted successfully');
          this.selectedClass = 0;
          this.selectedSection = 0;
          this.selectedSubject = 0;
        });
    }
  }

  openform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  CloseModel() {
    this.setSubjectTopicFormState();
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }
  ngOnInit(): void {
    this.setSubjectTopicFormState();
    this.loadClass();
  }
}
