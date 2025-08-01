import { create } from 'zustand';

const useFormStore = create((set) => ({
  responseData: null,
  setResponseData: (data) => set({ responseData: data }),
}));

export default useFormStore;