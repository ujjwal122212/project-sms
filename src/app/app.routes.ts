import { Routes } from '@angular/router';
import { ADashboardComponent } from './components/Admin/a-dashboard/a-dashboard.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CoursesComponent } from './components/student/courses/courses.component';
import { FeePageComponent } from './components/student/fees/fee-page/fee-page.component';
import { StudentHelpComponent } from './components/student/help/student-help.component';
import { HomeComponent } from './components/student/home/home.component';
import { PerformanceComponent } from './components/student/performance/performance.component';
import { Quiz1Component } from './components/student/quiz/quiz1/quiz1.component';
import { Quiz2Component } from './components/student/quiz/quiz2/quiz2.component';
import { TimeTableComponent } from './components/student/time-table/time-table.component';
import { CheckHomeworkComponent } from './components/teacher/homework/check-homework/check-homework.component';
import { GiveHomeworkComponent } from './components/teacher/homework/give-homework/give-homework.component';
import { THomeworkPageComponent } from './components/teacher/homework/t-homework-page/t-homework-page.component';
import { ApplyLeaveComponent } from './components/teacher/leave/apply-leave/apply-leave.component';
import { CancelLeaveComponent } from './components/teacher/leave/cancel-leave/cancel-leave.component';
import { HolidayCalenderComponent } from './components/teacher/leave/holiday-calender/holiday-calender.component';
import { LeavePageComponent } from './components/teacher/leave/leave-page/leave-page.component';
import { ViewBalanceComponent } from './components/teacher/leave/view-balance/view-balance.component';
import { ViewLeaveBookComponent } from './components/teacher/leave/view-leave-book/view-leave-book.component';
import { ViewStatusComponent } from './components/teacher/leave/view-status/view-status.component';
import { AssesmentComponent } from './components/teacher/quiz/assesment/assesment.component';
import { OngoingComponent } from './components/teacher/quiz/ongoing/ongoing.component';
import { SecheduleComponent } from './components/teacher/quiz/sechedule/sechedule.component';
import { TQuizComponent } from './components/teacher/quiz/t-quiz/t-quiz.component';
import { UpcomingComponent } from './components/teacher/quiz/upcoming/upcoming.component';
import { TDashboardComponent } from './components/teacher/t-dashboard/t-dashboard.component';
import { THelpComponent } from './components/teacher/t-help/t-help.component';

import { ViewStudentComponent } from './components/Admin/addStudent/view-student/view-student.component';

import { PaymentComponent } from './components/student/fees/payment/payment.component';
import { RecieptComponent } from './components/student/fees/reciept/reciept.component';
import { AssignmentPageComponent } from './components/student/homework/assignment-page/assignment-page.component';
import { HomeworkPageComponent } from './components/student/homework/homework-page/homework-page.component';
import { AttendenceComponent } from './components/teacher/attendence/attendence.component';
import { ClassPageComponent } from './components/teacher/student-management/class-page/class-page.component';
import { ManagementPageComponent } from './components/teacher/student-management/management-page/management-page.component';
import { StudentpageComponent } from './components/teacher/student-management/studentpage/studentpage.component';
import { TTimeTableComponent } from './components/teacher/t-time-table/t-time-table.component';

import { AddStudentComponent } from './components/Admin/addStudent/add-student/add-student.component';
import { AddNewTeacherComponent } from './components/Admin/addTeacher/add-new-teacher/add-new-teacher.component';
import { ViewTeacherComponent } from './components/Admin/addTeacher/view-teacher/view-teacher.component';
import { AdminHomeComponent } from './components/Admin/admin-home/admin-home.component';
import { AddContactsComponent } from './components/Admin/ImportantContacts/add-contacts/add-contacts.component';
import { ViewContactsComponent } from './components/Admin/ImportantContacts/view-contacts/view-contacts.component';
import { AttandanceComponent } from './components/student/attandance/attandance.component';
import { SDashboardComponent } from './components/student/s-dashboard/s-dashboard.component';
import { ChangeCurrentPickPlaceComponent } from './components/student/Student-service/change-current-pick-place/change-current-pick-place.component';
import { DownloadFreeComponent } from './components/student/Student-service/download-free/download-free.component';
import { EditIdCardComponent } from './components/student/Student-service/edit-id-card/edit-id-card.component';
import { FreeStructComponent } from './components/student/Student-service/free-struct/free-struct.component';
import { IdCardComponent } from './components/student/Student-service/id-card/id-card.component';
import { MedicalServicesComponent } from './components/student/Student-service/medical-services/medical-services.component';
import { OpenSerComponent } from './components/student/Student-service/open-ser/open-ser.component';
import { TransportServiceComponent } from './components/student/Student-service/transport-service/transport-service.component';
import { THomeComponent } from './components/teacher/t-home/t-home.component';
import { StudentAdmissionComponent } from './components/Admin/student-admission/student-admission.component';
import { AddStudentCourseComponent } from './components/Admin/add-student-course/add-student-course.component';
import { AddStudentTimeTableComponent } from './components/Admin/add-student-time-table/add-student-time-table.component';
// import { ResetPasswordComponent } from './main-profile/reset-password/reset-password.component';



export const routes: Routes = [


  //Login page
  { 'path': 'Login-page', 'title': 'leave', component: LoginPageComponent },

  // Main-Profile
  // {'path':'reset-Password','title':'reset-Password',component:ResetPasswordComponent},

  //for student pages

  //student dashboard
  { 'path': 'S-home', 'title': 'Home', component: HomeComponent },
  { 'path': 'S-dashboard', 'title': 'Home', component: SDashboardComponent },

  {
    'path': 'S-home', children: [
      { 'path': 'quiz1', 'title': 'Quizzes', component: Quiz1Component },

      //quiz
      {
        'path': 'quiz1', children: [
          { 'path': 'quiz2', 'title': 'Quizzes|take-quiz', component: Quiz2Component },

        ]
      },

      { 'path': 'courses', 'title': 'Courses', component: CoursesComponent },
      { 'path': 'performance', 'title': 'Performance', component: PerformanceComponent },
      { 'path': 'timetable', 'title': 'Time-Table', component: TimeTableComponent },
      { 'path': 'StudentAttendence', 'title': 'Attendence', component: AttandanceComponent },

      { 'path': 'fee', 'title': 'Fees', component: FeePageComponent },
      {
        'path': 'fee', children: [
          { 'path': 'payment', 'title': 'payment', component: PaymentComponent },
          { 'path': 'receipt', 'title': 'receipt', component: RecieptComponent }
        ]
      },
      {'path':'assignment-page','title':'assignment-page',component:AssignmentPageComponent},
      {'path':'assignment-page',children:[
        {'path':'homework-page','title':'homework-page',component:HomeworkPageComponent}
      ]},

      { 'path': 'help', 'title': 'Help', component: StudentHelpComponent },
    ]
  },


  //student Quizzes
  { 'path': 'quiz1', 'title': 'Quizzes', component: Quiz1Component },

  {
    'path': 'quiz1', children: [
      { 'path': 'quiz2', 'title': 'Quizzes|take-quiz', component: Quiz2Component },

    ]
  },


  //student courses
  { 'path': 'courses', 'title': 'Courses', component: CoursesComponent },


  //student performance
  { 'path': 'performance', 'title': 'Performance', component: PerformanceComponent },


  //student Time table
  { 'path': 'timetable', 'title': 'Time-Table', component: TimeTableComponent },

  //Student Attendence
  { 'path': 'StudentAttendence', 'title': 'Attendence', component: AttandanceComponent },

  //student fees
  { 'path': 'fee', 'title': 'Fees', component: FeePageComponent },
  {
    'path': 'fee', children: [
      { 'path': 'payment', 'title': 'payment', component: PaymentComponent },
      { 'path': 'receipt', 'title': 'receipt', component: RecieptComponent }
    ]
  },
  // student homework
  {'path':'assignment-page','title':'assignment-page',component:AssignmentPageComponent},
  {'path':'assignment-page',children:[
    {'path':'homework-page','title':'homework-page',component:HomeworkPageComponent}
  ]},
  //student help
  { 'path': 'help', 'title': 'Help', component: StudentHelpComponent },

// student service
{
  'path':'Open-SerComponent','title':'OpenSerComponent',component:OpenSerComponent
},
{
  'path':'Id-CardComponent','title':'Id-CardComponent',component:IdCardComponent
},
{
  'path':'Edit-IdCardComponent','title':'Edit-IdCardComponent',component:EditIdCardComponent
},
{
  'path':'Transport-ServiceComponent','title':'Transport-ServiceComponent',component:TransportServiceComponent
},
{'path':'Change-CurrentPickPlaceComponent','title':'ChangeCurrentPickPlaceComponent',component:ChangeCurrentPickPlaceComponent},
{
  'path':'Medical-ServicesComponent','title':'MedicalServicesComponent',component:MedicalServicesComponent
},
{'path':'Free-StructComponent','title':'Free-StructComponent',component:FreeStructComponent}
,{
  'path':'download-Free','title':'download-Free',component:DownloadFreeComponent
},
  // =============================================================================================


  // Teacher Routing

  { 'path': 'T-dashboard', 'title': 'Dashboard', component: THomeComponent },

  //for teacher dashboard
  { 'path': 'T-home', 'title': 'Dashboard', component: TDashboardComponent },

  {
    'path': 'T-home', children: [
      { 'path': 'Tquizzes', 'title': 'quizzes', component: TQuizComponent },
      {
        'path': 'Tquizzes', children: [

          { 'path': 'upcoming', 'title': 'upcoming-quizzes', component: UpcomingComponent },
          { 'path': 'ongoing', 'title': 'ongoing-quizzes', component: OngoingComponent },
          { 'path': 'schedule', 'title': 'schedule-quizzes', component: SecheduleComponent },
          { 'path': 'Assesment', 'title': 'Assesment-quizzes', component: AssesmentComponent },
        ]
      },
      { 'path': 'leave', 'title': 'leave', component: LeavePageComponent },
      {
        'path': 'leave', children: [
          { 'path': 'apply-leave', 'title': 'apply-leave', component: ApplyLeaveComponent },
          { 'path': 'cancel-leave', 'title': 'cancel-leave', component: CancelLeaveComponent },
          { 'path': 'holiday-calender', 'title': 'holiday-calender', component: HolidayCalenderComponent },
          { 'path': 'view-balance', 'title': 'view-balance', component: ViewBalanceComponent },
          { 'path': 'view-leave-book', 'title': 'view-leave-book', component: ViewLeaveBookComponent },
          { 'path': 'view-status', 'title': 'view-status', component: ViewStatusComponent },
        ]
      },

      { 'path': 'T-homework', 'title': 'homework', component: THomeworkPageComponent },

      {
        'path': 'T-homework', children: [
          { 'path': 'check-homework', 'title': 'homework', component: CheckHomeworkComponent },
          { 'path': 'give-homework', 'title': 'homework', component: GiveHomeworkComponent },
        ]
      },
      { 'path': 'T-attendence', 'title': 'Attendence', component: AttendenceComponent },
      { 'path': 'tHelp', 'title': 'Help', component: THelpComponent },
      { 'path': 'TTimeTableComponent', 'title': 'TTimeTableComponent', component: TTimeTableComponent },
      {
        'path': 'TTimeTableComponent', children: [{
          'path': 'T-attendence', component: AttendenceComponent
        }]
      },
      { 'path': 'student-management', 'title': 'student-management', component: ManagementPageComponent },
      {
        'path': 'student-management', children: [
          { 'path': 'class-page', 'title': 'class-page', component: ClassPageComponent },
          {
            'path': 'class-page', children: [
              { 'path': 'student-page', 'title': 'student-page', component: StudentpageComponent }
            ]
          }
        ]
      },
    ]
  },

  // management
  { 'path': 'student-management', 'title': 'student-management', component: ManagementPageComponent },
  {
    'path': 'student-management', children: [
      { 'path': 'class-page', 'title': 'class-page', component: ClassPageComponent },
      {
        'path': 'class-page', children: [
          { 'path': 'student-page', 'title': 'student-page', component: StudentpageComponent }
        ]
      }
    ]
  },

  // attendence
  { 'path': 'T-attendence', 'title': 'Attendence', component: AttendenceComponent },

  // time-table
  { 'path': 'TTimeTableComponent', 'title': 'TTimeTableComponent', component: TTimeTableComponent },

  {
    'path': 'TTimeTableComponent', children: [{
      'path': 'T-attendence', component: AttendenceComponent
    }]
  },

  // for teacher quizess

  { 'path': 'Tquizzes', 'title': 'quizzes', component: TQuizComponent },

  {
    'path': 'Tquizzes', children: [

      { 'path': 'upcoming', 'title': 'upcoming-quizzes', component: UpcomingComponent },
      { 'path': 'ongoing', 'title': 'ongoing-quizzes', component: OngoingComponent },
      { 'path': 'schedule', 'title': 'schedule-quizzes', component: SecheduleComponent },
      { 'path': 'Assesment', 'title': 'Assesment-quizzes', component: AssesmentComponent },
    ]
  },

  // for teacher leave
  { 'path': 'leave', 'title': 'leave', component: LeavePageComponent },

  {
    'path': 'leave', children: [
      { 'path': 'apply-leave', 'title': 'apply-leave', component: ApplyLeaveComponent },
      { 'path': 'cancel-leave', 'title': 'cancel-leave', component: CancelLeaveComponent },
      { 'path': 'holiday-calender', 'title': 'holiday-calender', component: HolidayCalenderComponent },
      { 'path': 'view-balance', 'title': 'view-balance', component: ViewBalanceComponent },
      { 'path': 'view-leave-book', 'title': 'view-leave-book', component: ViewLeaveBookComponent },
      { 'path': 'view-status', 'title': 'view-status', component: ViewStatusComponent },
    ]
  },

  // for teacher homework
  { 'path': 'T-homework', 'title': 'homework', component: THomeworkPageComponent },

  {
    'path': 'T-homework', children: [
      { 'path': 'check-homework', 'title': 'homework', component: CheckHomeworkComponent },
      { 'path': 'give-homework', 'title': 'homework', component: GiveHomeworkComponent },
    ]
  },

  //for teacher help
  { 'path': 'tHelp', 'title': 'Help', component: THelpComponent },



  //============================================================================================
  // Admin Routes

  //Admin dashboard
  { 'path': 'ahome', 'title': 'Dashboard', component: ADashboardComponent },
  { 'path': 'admin-home', 'title': 'Admin_Home', component: AdminHomeComponent },

  //add student
  { 'path': 'viewstudent', 'title': 'View-Student', component: ViewStudentComponent },

  {
    'path': 'viewstudent', children: [
      { 'path': 'addstudent', 'title': 'Add-Student', component: AddStudentComponent },

    ]
  },

  {
    path:'employee/:id',
    component:AddStudentComponent
  },

  // ADD Teachers
  { 'path': 'viewTeacher', 'title': 'View-Teacher', component: ViewTeacherComponent },

  { 'path': 'viewTeacher', children:[
    { 'path': 'addTeacher', 'title': 'Add-Teacher', component: AddNewTeacherComponent },
  ]},

  {
    path:'teacher/:id',
    component:AddNewTeacherComponent
  },

//Student Admission
{ 'path': 'StuAdmission', 'title': 'Admission', component: StudentAdmissionComponent },

  //Important Contacts
  { 'path': 'view', 'title': 'view-contact', component: ViewContactsComponent },
  { 'path': 'addContact', 'title': 'Add-contact', component: AddContactsComponent },
  {path:'addstudentCourse',title:'StudentCourse',component:AddStudentCourseComponent},
  {path:'studenttimetable',title:'StudentTimeTable',component:AddStudentTimeTableComponent}
];

