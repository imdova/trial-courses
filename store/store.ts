import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/store/slices/cartSlice";
import { locationReducer } from "./slices/locationSlice";
import { brandingReducer } from "./slices/brandingSlice";
import { notificationsReducer } from "./slices/notificationsSlice";
import { profileReducer } from "./slices/profileSlice";
import { quizReducer } from "./slices/quizSlice";
import { assignmentsReducer } from "./slices/assignmentsSlice";
import { studentsReducer } from "./slices/studentsSlice";
import { adminsReducer } from "./slices/admins.slice";
import { permissionsReducer } from "./slices/permissions";
import { rolesReducer } from "./slices/roles.slice";
import { departmentsReducer } from "./slices/departments.slice";
import { companyReducer } from "./slices/companySlice";
import { sectorReducer } from "./slices/sectorsSlice";
import { categoryReducer } from "./slices/categorySlice";
import { coursesCategoriesReducer } from "./slices/courses-categories.slice";
import { instructorCoursesReducer } from "./slices/courses.slice";
import { geoLocationReducer } from "./slices/geo.slice";
import singleCourseReducer from "./slices/singleCourse";
import enrolledCoursesReducer from "./slices/enrolledCoursesSlice";
import communityReducer from "./slices/communitySlice";
import notesReducer from "./slices/notesSlice";
import { instructorBundlesReducer } from "./slices/instructor-bundles.slice";
import { instructorCouponsReducer } from "./slices/instructor-coupons.slice";
import { academyReducer } from "./slices/academy.slice";
import { academyKeywordsReducer } from "./slices/academyKeywords.slice";
import { academyInstructorsReducer } from "./slices/academyInstructors.slice";
import { instructorsReducer } from "./slices/instructors.slice";
import { adminDashboardReducer } from "./slices/admin-dashboard.slice";
import { adminQuizzesReducer } from "./slices/admin-quizzes.slice";
import { adminStudentsReducer } from "./slices/admin-students.slice";
import { adminStudentsListReducer } from "./slices/admin-students-list.slice";
import { adminCoursesOverviewReducer } from "./slices/admin-courses-overview.slice";
import { adminEnrollmentsOverviewReducer } from "./slices/admin-enrollments-overview.slice";
import { adminEnrollmentsListReducer } from "./slices/admin-enrollments-list.slice";
import { courseTransactionsReducer } from "./slices/courseTransactions.slice";
import { instructorWithdrawalsReducer } from "./slices/instructorWithdrawals.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      company: companyReducer,
      cart: cartSlice,
      location: locationReducer,
      geoLocation: geoLocationReducer,
      branding: brandingReducer,
      notifications: notificationsReducer,

      // courses
      academy: academyReducer,
      academyInstructors: academyInstructorsReducer,
      academyKeywords: academyKeywordsReducer,
      instructorCourses: instructorCoursesReducer,
      instructorBundles: instructorBundlesReducer,
      instructorCoupons: instructorCouponsReducer,
      instructors: instructorsReducer,
      coursesCategories: coursesCategoriesReducer,
      singleCourse: singleCourseReducer,
      enrolledCourses: enrolledCoursesReducer,
      community: communityReducer,
      notes: notesReducer,

      profile: profileReducer,
      quiz: quizReducer,
      assignments: assignmentsReducer,
      students: studentsReducer,

      permissions: permissionsReducer,
      roles: rolesReducer,
      departments: departmentsReducer,
      sector: sectorReducer,
      category: categoryReducer,

      /// admin
      admins: adminsReducer,
      adminDashboard: adminDashboardReducer,
      adminQuizzes: adminQuizzesReducer,
      adminStudents: adminStudentsReducer,
      adminStudentsList: adminStudentsListReducer,
      adminCoursesOverview: adminCoursesOverviewReducer,
      adminEnrollmentsOverview: adminEnrollmentsOverviewReducer,
      adminEnrollmentsList: adminEnrollmentsListReducer,
      // finance
      courseTransactions: courseTransactionsReducer,
      instructorWithdrawals: instructorWithdrawalsReducer,

    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
