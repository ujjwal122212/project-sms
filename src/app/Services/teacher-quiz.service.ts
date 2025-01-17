import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherQuizService {

  constructor() { }
  http = inject(HttpClient);
  private apiurl = "https://localhost:7262"
  getClasses() {
    return this.http.get(`${this.apiurl}/Classes`);
  }
  getSectionByClassId(classId: number) {
    return this.http.get(`${this.apiurl}/${classId}`);
  }
  getQuizSubjectBySectionId(sectionId: number) {
    return this.http.get(`${this.apiurl}/api/QuizSubject/${sectionId}`);
  }
  AddQuizSubjects(data:any){
    return this.http.post(`${this.apiurl}/api/QuizSubject/Add Quiz`,data);
  }
  deleteQuizSubject(subjectId:number){
    return this.http.delete(`${this.apiurl}/api/QuizSubject/${subjectId}`);
  }
  AddQuizTitleAndDescription(data:any){
    return this.http.post(`${this.apiurl}/api/Quiz/Add Quiz`,data);
  }
  getquiztitlebysubjectid(subjectId:number){
    return this.http.get(`${this.apiurl}/api/Quiz/${subjectId}`);
  }
  getQuizTitleAndDescription(quizID:number){
    return this.http.get(`${this.apiurl}/api/Quiz/row/${quizID}`);
  }
  EditQuizTitleAndDescription(quizId:number,data:any){
    return this.http.put(`${this.apiurl}/api/Quiz/${quizId}`,data);
  }
  deleteQuizTitleAndDescription(quizId:number){
    return this.http.delete(`${this.apiurl}/api/Quiz/${quizId}`);
  }
  AddQuestions(data:any){
    return this.http.post(`${this.apiurl}/api/Question/Add Question`,data);
  }
  getquestionbyquizid(quizID:number){
    return this.http.get(`${this.apiurl}/api/Question/${quizID}`);
  }
  addquestionoption(data:any){
    return this.http.post(`${this.apiurl}/api/QuestionOption/Add QuestionOptions`,data);
  }
}
