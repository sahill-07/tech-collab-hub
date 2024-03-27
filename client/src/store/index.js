import { configureStore } from "@reduxjs/toolkit";
import BookSearchSlice from "./BookSearchSlice";
import AddBookSlice from "./AddBookSlice";
import AddProjectSlice from "./AddProjectSlice";
import UserSlice from "./UserSlice";
import RecommendedUserSlice from './RecommendedUserSlice';
import ProjectSlice from "./ProjectSlice";
import BasicUtilsSlice from "./BasicUtilsSlice";
export const store = configureStore({
    reducer: {
        BookSearchSlice,
        AddBookSlice,
        AddProjectSlice,
        UserSlice,
        RecommendedUserSlice,
        ProjectSlice,
        BasicUtilsSlice
    },
  });
  