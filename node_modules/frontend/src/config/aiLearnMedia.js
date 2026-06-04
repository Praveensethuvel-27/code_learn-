/** Module hero images (Unsplash) — matches backend aiLessonEnrichment */
export const MODULE_IMAGES = {
  intro_ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=500&fit=crop",
  understanding_models: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=500&fit=crop",
  machine_learning: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=500&fit=crop",
  math_ai: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=500&fit=crop",
  deep_learning: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=500&fit=crop",
  transformers: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=500&fit=crop",
  llm: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=1200&h=500&fit=crop",
};

export function getModuleImage(moduleId) {
  return MODULE_IMAGES[moduleId] || MODULE_IMAGES.intro_ai;
}
