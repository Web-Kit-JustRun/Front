import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userStore = atom({
  key: "userStore",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
