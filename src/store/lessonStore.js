import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const lessonStore = atom({
  key: "lessonStore",
  default: [],
});

export const currentLessonIdStore = atom({
  key: "currentLessonIdStore",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
