import { ViewLeaveBookComponent } from './teacher/leave/view-leave-book/view-leave-book.component';

import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { StudentHelpComponent } from './help/student-help.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PerformanceComponent } from './performance/performance.component';
import { StudentProfileComponent } from './student/Profile/student-profile/student-profile.component';
import { ProfileCardComponent } from './student/profile-card/profile-card.component';
import { Quiz1Component } from './student/quiz/quiz1/quiz1.component';
import { Quiz2Component } from './student/quiz/quiz2/quiz2.component';
import { ApplyLeaveComponent } from './teacher/leave/apply-leave/apply-leave.component';
import { CancelLeaveComponent } from './teacher/leave/cancel-leave/cancel-leave.component';
import { HolidayCalenderComponent } from './teacher/leave/holiday-calender/holiday-calender.component';
import { LeavePageComponent } from './teacher/leave/leave-page/leave-page.component';
import { ViewBalanceComponent } from './teacher/leave/view-balance/view-balance.component';
import { ViewStatusComponent } from './teacher/leave/view-status/view-status.component';
import { UpcomingComponent } from './teacher/quiz/upcoming/upcoming.component';
import { TimeTableComponent } from './time-table/time-table.component';



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

{ 'path': 'quizzes', 'title': 'quizzes', component:UpcomingComponent},

//for student page
//student quizzes

{ 'path': 'quiz1', 'title': 'quiz', component:Quiz1Component},

{ 'path': 'quiz1',children:[
  { 'path': 'quiz2', 'title': 'quiz', component:Quiz2Component},
]},

// profile_page

{ 'path': 'profile', 'title': 'profile', component:StudentProfileComponent},

// profile_card

{ 'path': 'pw', 'title': 'pw', component:ProfileCardComponent},



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






];

