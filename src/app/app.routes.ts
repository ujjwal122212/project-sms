import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/student/home/home.component';
import { Quiz1Component } from './components/student/quiz/quiz1/quiz1.component';
import { Quiz2Component } from './components/student/quiz/quiz2/quiz2.component';
import { CoursesComponent } from './components/student/courses/courses.component';
import { PerformanceComponent } from './components/student/performance/performance.component';
import { TimeTableComponent } from './components/student/time-table/time-table.component';
import { StudentHelpComponent } from './components/student/help/student-help.component';
import { FeePageComponent } from './components/student/fees/fee-page/fee-page.component';
import { LeavePageComponent } from './components/teacher/leave/leave-page/leave-page.component';
import { ApplyLeaveComponent } from './components/teacher/leave/apply-leave/apply-leave.component';
import { CancelLeaveComponent } from './components/teacher/leave/cancel-leave/cancel-leave.component';
import { HolidayCalenderComponent } from './components/teacher/leave/holiday-calender/holiday-calender.component';
import { ViewBalanceComponent } from './components/teacher/leave/view-balance/view-balance.component';
import { ViewLeaveBookComponent } from './components/teacher/leave/view-leave-book/view-leave-book.component';
import { ViewStatusComponent } from './components/teacher/leave/view-status/view-status.component';
import { HomeWorkComponent } from './components/teacher/home-work/home-work.component';
import { CheckHomeworkComponent } from './components/teacher/homework/check-homework/check-homework.component';
import { GiveHomeworkComponent } from './components/teacher/homework/give-homework/give-homework.component';
import { TQuizComponent } from './components/teacher/quiz/t-quiz/t-quiz.component';
import { UpcomingComponent } from './components/teacher/quiz/upcoming/upcoming.component';
import { OngoingComponent } from './components/teacher/quiz/ongoing/ongoing.component';
import { SecheduleComponent } from './components/teacher/quiz/sechedule/sechedule.component';
import { AssesmentComponent } from './components/teacher/quiz/assesment/assesment.component';
import { TDashboardComponent } from './components/teacher/t-dashboard/t-dashboard.component';



export const routes: Routes = [


//Login page
{ 'path': 'Login-page', 'title': 'leave', component: LoginPageComponent},


//for student pages

//student dashboard
{ 'path': 'S-home', 'title': 'Home', component:HomeComponent},

{ 'path': 'S-home',children:[
  { 'path': 'quiz1', 'title': 'Quizzes', component:Quiz1Component},
  { 'path': 'courses', 'title': 'Courses', component:CoursesComponent},
  { 'path': 'performance', 'title': 'Performance', component:PerformanceComponent},
  { 'path': 'timetable', 'title': 'Time-Table',component:TimeTableComponent},
  { 'path': 'fee', 'title': 'Fees',component:FeePageComponent},
  { 'path': 'help', 'title': 'Help',component:StudentHelpComponent},
]},


//student Quizzes
{ 'path': 'quiz1', 'title': 'Quizzes', component:Quiz1Component},

{ 'path': 'quiz1',children:[
  { 'path': 'quiz2', 'title': 'Quizzes|take-quiz', component:Quiz2Component},

]},


//student courses
{ 'path': 'courses', 'title': 'Courses', component:CoursesComponent},


//student performance
{ 'path': 'performance', 'title': 'Performance', component:PerformanceComponent},


//student Time table
{ 'path': 'timetable', 'title': 'Time-Table',component:TimeTableComponent},

//student Time table
{ 'path': 'fee', 'title': 'Fees',component:FeePageComponent},

//student help
{ 'path': 'help', 'title': 'Help',component:StudentHelpComponent},


// =============================================================================================


// Teacher Routing

//for teacher dashboard
{ 'path': 'T-home', 'title': 'Dashboard', component:TDashboardComponent},

// for teacher quizess

{ 'path': 'Tquizzes', 'title': 'quizzes', component:TQuizComponent},

{ 'path': 'Tquizzes', children :[

  { 'path': 'upcoming', 'title': 'upcoming-quizzes', component:UpcomingComponent},
  { 'path': 'ongoing', 'title': 'ongoing-quizzes', component:OngoingComponent},
  { 'path': 'schedule', 'title': 'schedule-quizzes', component:SecheduleComponent},
  { 'path': 'Assesment', 'title': 'Assesment-quizzes', component:AssesmentComponent},
]},

// for teacher leave
  { 'path': 'leave', 'title': 'leave', component: LeavePageComponent },

  {
    'path': 'leave', children: [
      { 'path': 'apply-leave', 'title': 'apply-leave', component: ApplyLeaveComponent },
      { 'path': 'cancel-leave', 'title': 'cancel-leave', component: CancelLeaveComponent },
      { 'path': 'holiday-calender', 'title': 'holiday-calender', component: HolidayCalenderComponent},
      { 'path': 'view-balance', 'title': 'view-balance', component:ViewBalanceComponent },
      { 'path': 'view-leave-book', 'title': 'view-leave-book', component:ViewLeaveBookComponent},
      { 'path': 'view-status', 'title': 'view-status', component: ViewStatusComponent},
    ]
  },

// for teacher homework
{ 'path': 'T-homework', 'title': 'homework', component: HomeWorkComponent },

{
  'path': 'T-homework', children: [
    { 'path': 'check-homework', 'title': 'homework', component: CheckHomeworkComponent },
    { 'path': 'give-homework', 'title': 'homework', component: GiveHomeworkComponent },
  ]
},

  // Admin Routes

  //for add teacher
  // // { 'path': 'add-teacher', 'title': 'Add-teacher', component: AddTeacherComponent },
  // { 'path': 'add-teacher', 'title': 'Add-teacher', component: AddTeacherComponent },


  // //for add student
  // { 'path': 'add-student', 'title': 'Add-student', component: AddTeacherComponent },

//


//   //for tsudent page

//   { 'path': 'quiz1', 'title': 'quiz', component: Quiz1Component },



//   { 'path': 'help', 'title': 'help', component: StudentHelpComponent },
//   { 'path': '', 'title': 'Home', component: HomeComponent },
//   { 'path': 'performance', 'title': 'Performance', component: PerformanceComponent },
//   { 'path': 'courses', 'title': 'Courses', component: CoursesComponent },
//   {
//     'path': 'courses', children: [
//     ]
//   },


//   { 'path': 'time', 'title': 'time-table', component: TimeTableComponent },





//   { 'path': '**', component: NotFoundComponent },



//   { 'path': 'time', 'title': 'time-table', component:TimeTableComponent},

//   {
//     'path':'reciept',component:RecieptComponent
//   },
//   {'path':'pay',component:PaymentComponent},
//   {'path':'fees',component:FeePageComponent},
//   {
//     'path':'homework',component:HomeWorkComponent
//   },
//   {
//     'path':' attendence',component:AttendenceComponent
//   },

// // homework
// {'path':'mainhomework','title':'mainhomework',component:MainHomeworkComponent},
// {
//   'path':'givenwork','title':'givenwork',component:GivenworkComponent
// },


// // attendence
// {
//   'path':'attendence',component:AttendenceComponent
// },
// {'path':'t-time-table','title':'t-time-table',component:TTimeTableComponent},

// {'path':'t-time-table', children:[{
//   'path':'attendence2',component:AttendenceComponent

// }]},

];

