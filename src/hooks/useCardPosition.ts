import { create } from "zustand";

type CardPosition = {
  data?: {
    x?: string | number;
    y?: string | number;
    w?: string | number;
    h?: string | number;
  };
  setPosition: (data: {
    x?: string | number;
    y?: string | number;
    w?: string | number;
    h?: string | number;
  }) => void;
  backwardId?: string;
  setBackwardId: (id: string) => void;
};

const useCardPosition = create<CardPosition>((set) => ({
  data: undefined,
  setPosition: (data) => set({ data }),
  setBackwardId: (id) => set({ backwardId: id }),
}));

export default useCardPosition;
