import RootPage from "./pages/root";
import Frontdoor from "./pages/frontdoor";
import FavoritesPage from "./pages/favorites";
import WorkoutCreatePage from "./pages/workout/workout-create-page";
import WorkoutEditPage from "./pages/workout/workout-edit-page";
import WorkoutPage from "./pages/workout/workout-page";
import ExerciseSelectPage from "./pages/exercise/exercise-select-page";
import ExerciseCreatePage from "./pages/exercise/exercise-create-page";
import WorkoutLivePage from "./pages/workout/workout-live-page";
import WorkoutResultPage from "./pages/workout/workout-result-page";
import HistoryPage from 'pages/history';
import ExercisesPage from 'pages/exercise/exercises-page';
import ExercisePage from 'pages/exercise/exercise-page';
import ExerciseEditPage from 'pages/exercise/exercise-edit-page';

export default [
  {
    component: RootPage,
    routes: [
      {
        path: "/",
        exact: true,
        component: Frontdoor,
      },
      {
        path: "/favorites",
        component: FavoritesPage,
      },
      {
        path: "/history",
        component: HistoryPage,
      },
      {
        path: "/workout/create",
        component: WorkoutCreatePage,
      },
      {
        path: "/workout/:id/edit",
        component: WorkoutEditPage,
      },
      {
        path: "/workout/:id/live",
        component: WorkoutLivePage,
      },
      {
        path: "/workout/:id/result/:result_id",
        component: WorkoutResultPage,
      },
      {
        path: "/workout/:id",
        component: WorkoutPage,
      },
      {
        path: "/exercises",
        component: ExercisesPage,
      },
      {
        path: "/exercise/select",
        component: ExerciseSelectPage,
      },
      {
        path: "/exercise/create",
        component: ExerciseCreatePage,
      },
      {
        path: "/exercise/:id/edit",
        component: ExerciseEditPage,
      },
      {
        path: "/exercise/:id",
        component: ExercisePage,
      },
    ],
  },
];
