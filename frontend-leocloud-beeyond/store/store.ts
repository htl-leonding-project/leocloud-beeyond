import create from "zustand";
import { Template } from "../models/template";

const useStore = create((set) => ({
  selectedTemplate: null,
  setSelectedTemplate: (template: Template) =>
    set(() => ({ selectedTemplate: template })),

  selectedTemplates: [],
  addSelectedTemplate: (template: Template) =>
    set((state: any) => ({
      selectedTemplates: [...state.selectedTemplates, template],
    })),
  removeSelectedTemplate: (template: Template) =>
    set((state: any) => ({
      selectedTemplates: state.selectedTemplates.filter(
        (t: Template) => t.id !== template.id
      ),
    })),
}));
export default useStore;
