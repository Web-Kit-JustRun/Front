import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const selectedMenuState = atom({
  key: "selectedMenuState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
