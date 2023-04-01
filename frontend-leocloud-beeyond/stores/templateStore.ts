import { Template } from "@models/template";
import create from "zustand";

interface TemplateStore {
  activeTemplate: Template | null;
  selectedTemplates: Template[];
  setActiveTemplate: (template: Template | null) => void;
  addSelectedTemplate: (template: Template) => void;
  removeSelectedTemplate: (template: Template) => void;
}

const useTemplateStore = create<TemplateStore>((set) => ({
  activeTemplate: null,
  selectedTemplates: [],
  setActiveTemplate: (template: Template | null) =>
    set(() => ({ activeTemplate: template })),
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

export default useTemplateStore;
