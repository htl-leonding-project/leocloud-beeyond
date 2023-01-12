import create from "zustand";
import { Template } from "@models/template";

interface StateStore {
  activeTemplate: Template | null;
  setActiveTemplate: (template: Template | null) => void;
  selectedTemplates: Template[];
  addSelectedTemplate: (template: Template) => void;
  removeSelectedTemplate: (template: Template) => void;
}

const useStateStore = create<StateStore>((set) => ({
  activeTemplate: null,
  setActiveTemplate: (template: Template | null) =>
    set(() => ({ activeTemplate: template })),
  selectedTemplates: [],
  addSelectedTemplate: (template: Template) =>
    set((state) => ({
      selectedTemplates: [...state.selectedTemplates, template],
    })),
  removeSelectedTemplate: (template: Template) =>
    set((state) => ({
      selectedTemplates: state.selectedTemplates.filter(
        (t: Template) => t.id !== template.id
      ),
    })),
}));

export default useStateStore;
