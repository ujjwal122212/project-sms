
import { RouterModule, Routes } from '@angular/router';
import { PerformanceComponent } from './performance/performance.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { Course1Component } from './courses/course1/course1.component';
import { Fees1Component } from './student/fees/fees1/fees1.component';
import { StudentHelpComponent } from './student-help/student-help.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TimeTableComponent } from './time-table/time-table.component';

export const routes: Routes = [
  {'path':'','title':'Home',component:HomeComponent},
  {'path':'performance','title':'Performance',component:PerformanceComponent},
  {'path':'courses','title':'Courses',component:CoursesComponent},
  {'path':'courses',children:[
    {'path':'courses1','title':'Courses | course1',component:Course1Component},
  ]},
  {'path':'fee','title':'fees',component:Fees1Component},
  {'path':'help','title':'help',component:StudentHelpComponent},
  {'path':'time','title':'time-table',component:TimeTableComponent},
  {'path':'**',component:NotFoundComponent},


];

