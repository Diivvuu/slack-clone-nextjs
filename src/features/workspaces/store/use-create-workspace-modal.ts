import { atom, useAtom } from "jotai";

const createWorkSpaceModalAtom = atom(false);

export const useCreateWorkSpaceModal = () => {
  return useAtom(createWorkSpaceModalAtom);
};
