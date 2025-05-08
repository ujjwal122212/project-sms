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
import { AddQuizSubjectComponent } from './components/Admin/add-quiz-subject/add-quiz-subject.component';
import { ViewStudentAdmissionComponent } from './components/Admin/view-student-admission/view-student-admission.component';
import { StudentNotificationComponent } from './components/Admin/student-notification/student-notification.component';
import { TeacherNotificationComponent } from './components/Admin/teacher-notification/teacher-notification.component';
import { ViewTeacherDetailsComponent } from './components/Admin/addTeacher/view-teacher-details/view-teacher-details.component';
import { StudentLayoutComponent } from './components/student-layout/student-layout.component';
import { TeacherLayoutComponent } from './components/teacher-layout/teacher-layout.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { Fee1Component } from './components/student/fee1/fee1.component';
import { Fee2Component } from './components/student/fee2/fee2.component';
import { Fee3Component } from './components/student/fee3/fee3.component';
import { AddClassComponent } from './components/Admin/add-class/add-class.component';
import { AddSectionComponent } from './components/Admin/add-section/add-section.component';
import { EditProfileComponent } from './components/student/edit-profile/edit-profile.component';
import { ProfileDetailsComponent } from './components/teacher/profile-details/profile-details.component';
import { EditDetailsComponent } from './components/teacher/edit-details/edit-details.component';
import { StudentFeesComponent } from './components/Admin/student-fees/student-fees.component';
import { AdminresgistrationComponent } from './components/Admin/adminresgistration/adminresgistration.component';
import { AddSubjectTopicComponent } from './components/Admin/add-subject-topic/add-subject-topic.component';
import { AdminDetailsComponent } from './components/Admin/admin-details/admin-details.component';
import { AddandupdateadminComponent } from './components/Admin/addandupdateadmin/addandupdateadmin.component';
import { AprofileComponent } from './components/Admin/aprofile/aprofile.component';
import { UpdateDetailsComponent } from './components/Admin/update-details/update-details.component';
import path from 'path';
import { CourseTopicsComponent } from './components/student/course-topics/course-topics.component';
import { ClassTeacherAssignmentComponent } from './components/Admin/class-teacher-assignment/class-teacher-assignment.component';
import { StudentAttendenceComponent } from './components/teacher/student-attendence/student-attendence.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './components/Authentication/auth.guard';
import { QuizQuestionsComponent } from './components/student/quiz-questions/quiz-questions.component';
import { ParentInfoComponent } from './components/Admin/parent-info/parent-info.component';
import { ViewAllStudentComponent } from './components/Admin/addStudent/view-all-student/view-all-student.component';
import { StudentAttendenceSummeryComponent } from './components/Admin/student-attendence-summery/student-attendence-summery.component';
import { CreateFeeStructureComponent } from './components/Admin/fee/create-fee-structure/create-fee-structure.component';
// import { RegisterTeacherComponent } from './components/Admin/register-teacher/register-teacher.component';
// import { ResetPasswordComponent } from './main-profile/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login-page',
    pathMatch: 'full',
  },

  //Login page
  { path: 'Login-page', title: 'Login', component: LoginPageComponent },
  { path: 'unauthorized', title: 'Unauthorized', component: NotFoundComponent },
  {
    path: 'studentlayout',
    component: StudentLayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['Student'] },
    children: [
      // Main-Profile
      // {'path':'reset-Password','title':'reset-Password',component:ResetPasswordComponent},

      //for student pages

      //student dashboard
      {
        path: 'S-home',
        title: 'Home',
        component: HomeComponent,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },
      {
        path: 'S-dashboard',
        title: 'Home',
        component: SDashboardComponent,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },

      {
        path: 'S-home',
        children: [
          {
            path: 'quiz1',
            title: 'Quizzes',
            component: Quiz1Component,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },

          //quiz
          {
            path: 'quiz1',
            children: [
              {
                path: 'quiz2',
                title: 'Quizzes|take-quiz',
                component: Quiz2Component,
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
            ],
          },

          {
            path: 'courses',
            title: 'Courses',
            component: CoursesComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'performance',
            title: 'Performance',
            component: PerformanceComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'timetable',
            title: 'Time-Table',
            component: TimeTableComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'StudentAttendence',
            title: 'Attendence',
            component: AttandanceComponent,
          },

          {
            path: 'fee',
            title: 'Fees',
            component: FeePageComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'fee',
            children: [
              {
                path: 'payment',
                title: 'payment',
                component: PaymentComponent,
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
              {
                path: 'receipt',
                title: 'receipt',
                component: RecieptComponent,
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
            ],
          },
          {
            path: 'assignment-page',
            title: 'assignment-page',
            component: AssignmentPageComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'assignment-page',
            children: [
              {
                path: 'homework-page',
                title: 'homework-page',
                component: HomeworkPageComponent,
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
            ],
          },
          {
            path: 'Open-SerComponent',
            title: 'OpenSerComponent',
            component: OpenSerComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'Open-SerComponent',
            children: [
              {
                path: 'Id-CardComponent',
                title: 'Id-CardComponent',
                component: IdCardComponent,
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
              {
                path: 'Edit-IdCardComponent',
                title: 'Edit-IdCardComponent',
                component: EditIdCardComponent,
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
              {
                path: 'Transport-ServiceComponent',
                title: 'Transport-ServiceComponent',
                component: TransportServiceComponent,
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
              {
                path: 'Change-CurrentPickPlaceComponent',
                title: 'ChangeCurrentPickPlaceComponent',
                component: ChangeCurrentPickPlaceComponent,
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
              {
                path: 'Medical-ServicesComponent',
                title: 'MedicalServicesComponent',
                component: MedicalServicesComponent,
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
              {
                path: 'Free-StructComponent',
                title: 'Free-StructComponent',
                component: FreeStructComponent,
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
              {
                path: 'download-Free',
                title: 'download-Free',
                component: DownloadFreeComponent,
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
            ],
          },
          {
            path: 'help',
            title: 'Help',
            component: StudentHelpComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'fee1',
            title: 'Fee1',
            component: Fee1Component,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'fee2',
            title: 'Fee2',
            component: Fee2Component,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'fee3',
            title: 'Fee3',
            component: Fee3Component,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
        ],
      },

      //student Quizzes
      {
        path: 'quiz1',
        title: 'Quizzes',
        component: Quiz1Component,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },

      {
        path: 'quiz1',
        children: [
          {
            path: 'quiz2',
            title: 'Quizzes|take-quiz',
            component: Quiz2Component,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'quiz2',
            children: [
              {
                path: 'questions',
                component: QuizQuestionsComponent,
                title: 'Quiz Question',
                canActivate: [authGuard],
                data: { roles: ['Student'] },
              },
            ],
          },
        ],
      },

      //student courses
      {
        path: 'courses',
        title: 'Courses',
        component: CoursesComponent,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },
      {
        path: 'courses',
        children: [
          {
            path: 'coursecontent',
            title: 'Course Content',
            component: CourseTopicsComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
        ],
      },

      //student performance
      {
        path: 'performance',
        title: 'Performance',
        component: PerformanceComponent,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },

      //student Time table
      {
        path: 'timetable',
        title: 'Time-Table',
        component: TimeTableComponent,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },

      //Student Attendence
      {
        path: 'StudentAttendence',
        title: 'Attendence',
        component: AttandanceComponent,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },

      //student fees
      {
        path: 'fee',
        title: 'Fees',
        component: FeePageComponent,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },
      {
        path: 'fee',
        children: [
          {
            path: 'payment',
            title: 'payment',
            component: PaymentComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'receipt',
            title: 'receipt',
            component: RecieptComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
        ],
      },
      // student homework
      {
        path: 'assignment-page',
        title: 'assignment-page',
        component: AssignmentPageComponent,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },
      {
        path: 'assignment-page',
        children: [
          {
            path: 'homework-page',
            title: 'homework-page',
            component: HomeworkPageComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
        ],
      },
      //student help
      {
        path: 'help',
        title: 'Help',
        component: StudentHelpComponent,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },

      // student service
      {
        path: 'Open-SerComponent',
        title: 'OpenSerComponent',
        component: OpenSerComponent,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },
      {
        path: 'Open-SerComponent',
        children: [
          {
            path: 'Id-CardComponent',
            title: 'Id-CardComponent',
            component: IdCardComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'Edit-IdCardComponent',
            title: 'Edit-IdCardComponent',
            component: EditIdCardComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'Transport-ServiceComponent',
            title: 'Transport-ServiceComponent',
            component: TransportServiceComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'Change-CurrentPickPlaceComponent',
            title: 'ChangeCurrentPickPlaceComponent',
            component: ChangeCurrentPickPlaceComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'Medical-ServicesComponent',
            title: 'MedicalServicesComponent',
            component: MedicalServicesComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'Free-StructComponent',
            title: 'Free-StructComponent',
            component: FreeStructComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
          {
            path: 'download-Free',
            title: 'download-Free',
            component: DownloadFreeComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
        ],
      },
      {
        path: 'studentprofile',
        title: 'Profile',
        component: StudentProfileComponent,
        canActivate: [authGuard],
        data: { roles: ['Student'] },
      },
      {
        path: 'studentprofile',
        children: [
          {
            path: 'editProfile/:enrollmentNumber',
            title: 'Edit Profile',
            component: EditProfileComponent,
            canActivate: [authGuard],
            data: { roles: ['Student'] },
          },
        ],
      },
      // { path: 'StuAdmission/:studentID',title:'Update Student', component: StudentAdmissionComponent },
    ],
  },
  {
    path: 'teacherlayout',
    component: TeacherLayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['Teacher'] },
    children: [
      // Teacher Routing

      {
        path: 'T-dashboard',
        title: 'Dashboard',
        component: THomeComponent,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
      },

      //for teacher dashboard
      {
        path: 'T-home',
        title: 'Dashboard',
        component: TDashboardComponent,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
      },

      {
        path: 'T-home',
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
        children: [
          {
            path: 'Tquizzes',
            title: 'quizzes',
            component: TQuizComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'Tquizzes',
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
            children: [
              {
                path: 'upcoming',
                title: 'upcoming-quizzes',
                component: UpcomingComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
              {
                path: 'ongoing',
                title: 'ongoing-quizzes',
                component: OngoingComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
              {
                path: 'schedule',
                title: 'schedule-quizzes',
                component: SecheduleComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
              {
                path: 'Assesment',
                title: 'Assesment-quizzes',
                component: AssesmentComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
            ],
          },
          {
            path: 'leave',
            title: 'leave',
            component: LeavePageComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'leave',
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
            children: [
              {
                path: 'apply-leave',
                title: 'apply-leave',
                component: ApplyLeaveComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
              {
                path: 'cancel-leave',
                title: 'cancel-leave',
                component: CancelLeaveComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
              {
                path: 'holiday-calender',
                title: 'holiday-calender',
                component: HolidayCalenderComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
              {
                path: 'view-balance',
                title: 'view-balance',
                component: ViewBalanceComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
              {
                path: 'view-leave-book',
                title: 'view-leave-book',
                component: ViewLeaveBookComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
              {
                path: 'view-status',
                title: 'view-status',
                component: ViewStatusComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
            ],
          },

          {
            path: 'T-homework',
            title: 'homework',
            component: THomeworkPageComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },

          {
            path: 'T-homework',
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
            children: [
              {
                path: 'check-homework',
                title: 'homework',
                component: CheckHomeworkComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
              {
                path: 'give-homework',
                title: 'homework',
                component: GiveHomeworkComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
            ],
          },
          {
            path: 'T-attendence',
            title: 'Attendence',
            component: AttendenceComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'tHelp',
            title: 'Help',
            component: THelpComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'TTimeTableComponent',
            title: 'TTimeTableComponent',
            component: TTimeTableComponent,
          },
          {
            path: 'TTimeTableComponent',
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
            children: [
              {
                path: 'T-attendence',
                component: AttendenceComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
            ],
          },
          {
            path: 'student-management',
            title: 'student-management',
            component: ManagementPageComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'student-management',
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
            children: [
              {
                path: 'class-page',
                title: 'class-page',
                component: ClassPageComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
              {
                path: 'class-page',
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
                children: [
                  {
                    path: 'student-page',
                    title: 'student-page',
                    component: StudentpageComponent,
                    canActivate: [authGuard],
                    data: { roles: ['Teacher'] },
                  },
                ],
              },
            ],
          },
        ],
      },

      // management
      {
        path: 'student-management',
        title: 'student-management',
        component: ManagementPageComponent,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
      },
      {
        path: 'student-management',
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
        children: [
          {
            path: 'class-page',
            title: 'class-page',
            component: ClassPageComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'class-page',
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
            children: [
              {
                path: 'student-page',
                title: 'student-page',
                component: StudentpageComponent,
                canActivate: [authGuard],
                data: { roles: ['Teacher'] },
              },
            ],
          },
        ],
      },

      // attendence
      {
        path: 'T-attendence',
        title: 'Attendence',
        component: AttendenceComponent,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
      },
      {
        path: 'T-attendence',
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
        children: [
          {
            path: 'studentattendence',
            title: 'Student Attendence',
            component: StudentAttendenceComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
        ],
      },

      // time-table
      {
        path: 'TTimeTableComponent',
        title: 'TTimeTableComponent',
        component: TTimeTableComponent,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
      },

      {
        path: 'TTimeTableComponent',
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
        children: [
          {
            path: 'T-attendence',
            component: AttendenceComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
        ],
      },

      // for teacher quizess

      {
        path: 'Tquizzes',
        title: 'quizzes',
        component: TQuizComponent,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
      },

      {
        path: 'Tquizzes',
        children: [
          {
            path: 'upcoming',
            title: 'upcoming-quizzes',
            component: UpcomingComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'ongoing',
            title: 'ongoing-quizzes',
            component: OngoingComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'schedule',
            title: 'schedule-quizzes',
            component: SecheduleComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'Assesment',
            title: 'Assesment-quizzes',
            component: AssesmentComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
        ],
      },

      // for teacher leave
      {
        path: 'leave',
        title: 'leave',
        component: LeavePageComponent,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
      },

      {
        path: 'leave',
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
        children: [
          {
            path: 'apply-leave',
            title: 'apply-leave',
            component: ApplyLeaveComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'cancel-leave',
            title: 'cancel-leave',
            component: CancelLeaveComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'holiday-calender',
            title: 'holiday-calender',
            component: HolidayCalenderComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'view-balance',
            title: 'view-balance',
            component: ViewBalanceComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'view-leave-book',
            title: 'view-leave-book',
            component: ViewLeaveBookComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'view-status',
            title: 'view-status',
            component: ViewStatusComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
        ],
      },

      // for teacher homework
      {
        path: 'T-homework',
        title: 'homework',
        component: THomeworkPageComponent,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
      },

      {
        path: 'T-homework',
        children: [
          {
            path: 'check-homework',
            title: 'homework',
            component: CheckHomeworkComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
          {
            path: 'give-homework',
            title: 'homework',
            component: GiveHomeworkComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
        ],
      },

      //for teacher help
      {
        path: 'tHelp',
        title: 'Help',
        component: THelpComponent,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
      },
      {
        path: 'profiledetails',
        title: 'ProfileDetails',
        component: ProfileDetailsComponent,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
      },
      {
        path: 'profiledetails',
        canActivate: [authGuard],
        data: { roles: ['Teacher'] },
        children: [
          {
            path: 'editdetails/:enrollmentNumber',
            title: 'EditDetils',
            component: EditDetailsComponent,
            canActivate: [authGuard],
            data: { roles: ['Teacher'] },
          },
        ],
      },
    ],
  },
  {
    path: 'adminlayout',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
    children: [
      // Admin Routes

      //Admin dashboard=======
      {
        path: 'ahome',
        title: 'Dashboard',
        component: ADashboardComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'ahome',
        children: [
          {
            path: 'viewAllStudent',
            title: 'View-All-Student',
            component: ViewAllStudentComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'viewstudentadmission',
            title: 'View-Student',
            component: ViewStudentAdmissionComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'viewTeacher',
            title: 'View-Teacher',
            component: ViewTeacherComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'addclass',
            title: 'Class',
            component: AddClassComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'addsection',
            title: 'Section',
            component: AddSectionComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'addstudent',
            title: 'Add-Student',
            component: AddStudentComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'StuAdmission',
            title: 'Admission',
            component: StudentAdmissionComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'quizsubject',
            title: 'StudentQuizSubject',
            component: AddQuizSubjectComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'studenttimetable',
            title: 'StudentTimeTable',
            component: AddStudentTimeTableComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'studentnotification',
            title: 'StudentNotification',
            component: StudentNotificationComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'teachernotification',
            title: 'TeacherNotification',
            component: TeacherNotificationComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'subjectTopic',
            title: 'Subject Topic',
            component: AddSubjectTopicComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'studentfee',
            title: 'Student Fee',
            component: StudentFeesComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'adminregistration',
            title: 'Admin Registration',
            component: AdminresgistrationComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },

          {
            path: 'classTeacherAssignment',
            component: ClassTeacherAssignmentComponent,
            title: 'Class Teacer Assignment',
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
        ],
      },
      {
        path: 'admin-home',
        title: 'Admin_Home',
        component: AdminHomeComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },

      //add student
      {
        path: 'viewstudent',
        title: 'View-Student',
        component: ViewStudentComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },

      {
        path: 'viewstudent',
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
        children: [
          {
            path: 'addstudent',
            title: 'Add-Student',
            component: AddStudentComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
        ],
      },

      {
        path: 'employee/:id',
        component: AddStudentComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },

      // ADD Teachers
      {
        path: 'viewTeacher',
        title: 'View-Teacher',
        component: ViewTeacherComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },

      {
        path: 'viewTeacher',
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
        children: [
          {
            path: 'addTeacher',
            title: 'Add-Teacher',
            component: AddNewTeacherComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'addTeacher/:enrollmentNumber',
            title: 'Update-Teacher',
            component: AddNewTeacherComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'viewteacherdetails/:enrollmentNumber',
            title: 'ViewTeacherDetails',
            component: ViewTeacherDetailsComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
        ],
      },

      {
        path: 'teacher/:id',
        component: AddNewTeacherComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },

      //Student Admission
      {
        path: 'StuAdmission',
        title: 'Admission',
        component: StudentAdmissionComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'StuAdmission/:studentID',
        component: StudentAdmissionComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      //Important Contacts

      {
        path: 'view',
        title: 'view-contact',
        component: ViewContactsComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'addContact',
        title: 'Add-contact',
        component: AddContactsComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },

      {
        path: 'addstudentCourse',
        title: 'StudentCourse',
        component: AddStudentCourseComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'studenttimetable',
        title: 'StudentTimeTable',
        component: AddStudentTimeTableComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'quizsubject',
        title: 'StudentQuizSubject',
        component: AddQuizSubjectComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'viewAllStudent',
        title: 'View-All-Student',
        component: ViewAllStudentComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },

      {
        path: 'viewstudentadmission',
        title: 'StudentAdmissionList',
        component: ViewStudentAdmissionComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },

      {
        path: 'studentnotification',
        title: 'StudentNotification',
        component: StudentNotificationComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'teachernotification',
        title: 'TeacherNotification',
        component: TeacherNotificationComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'addclass',
        title: 'Class',
        component: AddClassComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'addsection',
        title: 'Section',
        component: AddSectionComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'createstudentfee',
        title: 'Student Fee Structure',
        component: CreateFeeStructureComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'adminregistration',
        title: 'Admin Registration',
        component: AdminresgistrationComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'subjectTopic',
        title: 'Subject Topic',
        component: AddSubjectTopicComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },

      {
        path: 'adminregistration',
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
        children: [
          {
            path: 'admindetail/:enrollmentNumber',
            title: 'Admin Details',
            component: AdminDetailsComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'addadmin',
            title: 'Add Admin',
            component: AddandupdateadminComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
          {
            path: 'addadmin/:enrollmentNumber',
            title: 'Update Admin',
            component: AddandupdateadminComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
        ],
      },
      {
        path: 'aprofile',
        title: 'Admin Details',
        component: AprofileComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'aprofile',
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
        children: [
          {
            path: 'updateprofile/:enrollmentNumber',
            title: 'Update Details',
            component: UpdateDetailsComponent,
            canActivate: [authGuard],
            data: { roles: ['Admin'] },
          },
        ],
      },
      {
        path: 'classTeacherAssignment',
        component: ClassTeacherAssignmentComponent,
        title: 'Class Teacer Assignment',
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'parentInfo',
        title: 'Parent Info',
        component: ParentInfoComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      // {path:'viewteacher',title:'ViewTeacher',component:RegisterTeacherComponent}
      {
        path: 'attendenceSummery', title: 'Attendence Summery', component: StudentAttendenceSummeryComponent,
        canActivate: [authGuard], data: { roles: ['Admin'] }
      }
    ],
  },

  // =============================================================================================

  //============================================================================================
];
