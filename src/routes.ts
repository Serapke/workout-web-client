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
        path: "/exercise/select",
        component: ExerciseSelectPage,
      },
      {
        path: "/exercise/create",
        component: ExerciseCreatePage,
      },
    ],
  },
];
