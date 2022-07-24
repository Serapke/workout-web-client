import React from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/navigation-bar";
import Modal from "./components/modal/modal";
import Frontdoor from "./pages/frontdoor";
import LoginPage from "./pages/authentication/login-page";
import { Box } from "@material-ui/core";
import { AuthProvider, RequireAuth } from "./hooks/useAuth";
import HistoryPage from "./pages/history";
import WorkoutResultPage from "./pages/workout/workout-result-page";
import FavoritesPage from "./pages/favorites/favorites-page";
import WorkoutPage from "./pages/workout/workout-page/workout-page";
import WorkoutEditPage from "./pages/workout/workout-edit-page/workout-edit-page";
import ExerciseSelectPage from "./pages/exercise/exercise-select-page/exercise-select-page";
import ExercisesPage from "./pages/exercise/exercises-page";
import ExercisePage from "./pages/exercise/exercise-page";
import ExerciseEditPage from "./pages/exercise/exercise-edit-page";
import ExerciseCreatePage from "./pages/exercise/exercise-create-page";
import WorkoutLivePage from "./pages/workout/workout-live-page";
import WorkoutCreatePage from "./pages/workout/workout-create-page/workout-create-page";

const App = () => {
  return (
    <Box>
      <AuthProvider>
        <NavigationBar/>
        <Box padding={2}>
          <Routes>
            <Route path="/" element={<Frontdoor/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route element={<RequireAuth/>}>
              <Route path="/favorites" element={<FavoritesPage/>}/>
              <Route path="/history" element={<HistoryPage/>}/>
              <Route path="/workout/create" element={<WorkoutCreatePage/>}/>
              <Route path="/workout/:id/result/:resultId" element={<WorkoutResultPage/>}/>
              <Route path="/workout/:id/live" element={<WorkoutLivePage/>}/>
              <Route path="/workout/:id/edit" element={<WorkoutEditPage/>}/>
              <Route path="/workout/:id" element={<WorkoutPage/>}/>
              <Route path="/exercises" element={<ExercisesPage/>}/>
              <Route path="/exercise/select" element={<ExerciseSelectPage/>}/>
              <Route path="/exercise/create" element={<ExerciseCreatePage/>}/>
              <Route path="/exercise/:id/edit" element={<ExerciseEditPage/>}/>
              <Route path="/exercise/:id" element={<ExercisePage/>}/>
            </Route>
          </Routes>
        </Box>
      </AuthProvider>
      <Modal/>
    </Box>
  );
}

export default App;
