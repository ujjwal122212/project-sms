import { ViewLeaveBookComponent } from './teacher/leave/view-leave-book/view-leave-book.component';

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { PerformanceComponent } from './performance/performance.component';
import { CoursesComponent } from './courses/courses.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PerformanceComponent } from './performance/performance.component';
import { TimeTableComponent } from './time-table/time-table.component';
// import { Quiz1Component } from './student/fees/quiz/quiz1/quiz1.component';
import { StudentHelpComponent } from './help/student-help.component';
import { Quiz1Component } from './student/quiz/quiz1/quiz1.component';
import { ApplyLeaveComponent } from './teacher/leave/apply-leave/apply-leave.component';
import { CancelLeaveComponent } from './teacher/leave/cancel-leave/cancel-leave.component';
import { HolidayCalenderComponent } from './teacher/leave/holiday-calender/holiday-calender.component';
import { LeavePageComponent } from './teacher/leave/leave-page/leave-page.component';
import { ViewBalanceComponent } from './teacher/leave/view-balance/view-balance.component';
import { ViewStatusComponent } from './teacher/leave/view-status/view-status.component';
import { UpcomingComponent } from './teacher/quiz/upcoming/upcoming.component';
import { TQuizComponent } from './teacher/quiz/t-quiz/t-quiz.component';
import { OngoingComponent } from './teacher/quiz/ongoing/ongoing.component';
import { SecheduleComponent } from './teacher/quiz/sechedule/sechedule.component';
import { AssesmentComponent } from './teacher/quiz/assesment/assesment.component';
import { RecieptComponent } from './student/fees/reciept/reciept.component';
import { PaymentComponent } from './student/fees/payment/payment.component';
import { FeePageComponent } from './student/fees/fee-page/fee-page.component';
import { HomeWorkComponent } from './teacher/home-work/home-work.component';
import { AttendenceComponent } from './teacher/attendence/attendence.component';






export const routes: Routes = [

  // for teacher leave
  { 'path': 'leave', 'title': 'leave', component:LeavePageComponent},

  { 'path': 'leave',children:[
    {'path':'apply-leave','title':'apply-leave',component:ApplyLeaveComponent},
    {'path':'cancel-leave','title':'cancel-leave',component:CancelLeaveComponent},
    {'path':'holiday-calender','title':'holiday-calender',component:HolidayCalenderComponent},
    {'path':'view-balance','title':'view-balance',component:ViewBalanceComponent},
    {'path':'view-leave-book','title':'view-leave-book',component:ViewLeaveBookComponent},
    {'path':'view-status','title':'view-status',component:ViewStatusComponent},
  ]},

// for teacher quizess

{ 'path': 'quizzes', 'title': 'quizzes', component:TQuizComponent},

{ 'path': 'quizzes', children :[
  
  { 'path': 'upcoming', 'title': 'upcoming-quizzes', component:UpcomingComponent},
  { 'path': 'ongoing', 'title': 'ongoing-quizzes', component:OngoingComponent},
  { 'path': 'schedule', 'title': 'schedule-quizzes', component:SecheduleComponent},
  { 'path': 'Assesment', 'title': 'Assesment-quizzes', component:AssesmentComponent},
]},

//for tsudent page

{ 'path': 'quiz1', 'title': 'quiz', component:Quiz1Component},



{ 'path': 'help', 'title': 'help', component:StudentHelpComponent},
  { 'path': '', 'title': 'Home', component:HomeComponent},
  { 'path': 'performance', 'title': 'Performance', component:PerformanceComponent },
  { 'path': 'courses', 'title': 'Courses', component: CoursesComponent },
  {
    'path': 'courses', children: [
    ]
  },

  { 'path': 'time', 'title': 'time-table', component:TimeTableComponent},
  { 'path': '**', component: NotFoundComponent },
  {
    'path':'reciept',component:RecieptComponent
  },
  {'path':'pay',component:PaymentComponent},
  {'path':'fees',component:FeePageComponent},
  {
    'path':'homework',component:HomeWorkComponent
  },
  {
    'path':' attendence',component:AttendenceComponent
  }

];

