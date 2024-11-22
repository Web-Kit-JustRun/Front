import { atom } from "recoil";

export const lessonStore = atom({
  key: "lessonStore",
  default: [],
});

export const currentLessonIdStore = atom({
  key: "currentLessonIdStore",
  default: "",
});
