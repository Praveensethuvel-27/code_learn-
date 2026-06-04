/**
 * Highlights, diagrams, and extra reading per lesson.
 * Visuals = mind maps / workflows (see aiLessonDiagrams.js), not stock photos.
 * Keys: "moduleId:lessonInModule" (1-based)
 */

const { getLessonDiagram } = require("./aiLessonDiagrams");

const MODULE_MEDIA = {
  intro_ai: { tagline: "Mind map: how AI fits in daily apps" },
  understanding_models: { tagline: "Workflow: train → evaluate → deploy" },
  machine_learning: { tagline: "Flow: supervised, unsupervised, fix overfitting" },
  math_ai: { tagline: "Map: vectors, gradients, probability" },
  deep_learning: { tagline: "Pipeline: layers, CNN, sequences" },
  transformers: { tagline: "Attention & encoder–decoder flows" },
  llm: { tagline: "LLM prompt → context → safe output" },
  ai_ethics: { tagline: "Responsible AI: bias, privacy, safety" },
  ai_apps: { tagline: "Build apps: API → RAG → production" },
  ai_career: { tagline: "Career map: skills, portfolio, interviews" },
};

const LESSON_ENRICH = {
  "intro_ai:1": {
    readTimeMin: 7,
    highlights: ["AI learns from data, not only fixed rules", "You already use AI in search and phones", "ML is the main approach in modern AI"],
    extraDetail:
      "Study tip: Keep a small notebook. Each day write one real app and what data it might learn from (photos, clicks, text). This builds intuition faster than memorizing definitions.",
  },
  "intro_ai:2": {
    readTimeMin: 7,
    highlights: ["Traditional code = explicit if/else rules", "ML learns boundaries from examples", "Pick AI when rules are too hard to write"],
    extraDetail:
      "Example: Spam filters started with keyword lists (rules). Modern filters learn from millions of labeled emails — they catch new spam styles rules miss.",
  },
  "intro_ai:3": {
    readTimeMin: 6,
    highlights: ["Today's products are narrow AI (one task)", "AGI is research, not a product you ship yet", "Agents = model + tools for multi-step goals"],
    extraDetail:
      "Career path: Master programming + one ML framework first. Then specialize (NLP, vision, or data). CodeLearn coding practice builds the programming base.",
  },
  "understanding_models:1": {
    readTimeMin: 8,
    highlights: ["Model = learned function f(input) → output", "Training updates parameters (weights)", "Inference = using the trained model on new data"],
    extraDetail:
      "Think of parameters like knobs on a radio. Training slowly turns the knobs until the output matches training examples. Inference is listening on the tuned station.",
  },
  "understanding_models:2": {
    readTimeMin: 8,
    highlights: ["Train / validation / test serve different jobs", "Never tune using the test set", "Overfitting = memorizing, not generalizing"],
    extraDetail:
      "Time-series rule: split by time (train on past, test on future). Shuffling random rows would leak future prices into training — a common student mistake.",
  },
  "understanding_models:3": {
    readTimeMin: 7,
    highlights: ["Features = inputs; labels = targets", "Bad features cap any algorithm", "Clean labels matter more than fancy models"],
    extraDetail:
      "Before deep learning: spend time understanding your data. Plot distributions, check missing values, and agree on label definitions with your team.",
  },
  "machine_learning:1": {
    readTimeMin: 8,
    highlights: ["Classification = categories; regression = numbers", "Loss measures error; training minimizes loss", "Start with simple baselines"],
    extraDetail:
      "Python path: `pip install scikit-learn`, load a CSV, train logistic regression in ~20 lines. Seeing a full pipeline once demystifies the jargon.",
  },
  "machine_learning:2": {
    readTimeMin: 7,
    highlights: ["Clustering finds groups without labels", "PCA helps visualize high-dimensional data", "Evaluation is harder without labels"],
    extraDetail:
      "Retail example: cluster customers by purchase history → marketing segments. No 'correct' cluster count — try 3–8 and interpret with business sense.",
  },
  "machine_learning:3": {
    readTimeMin: 8,
    highlights: ["Overfitting = high train, low test accuracy", "Regularization penalizes complexity", "Cross-validation stabilizes small-data estimates"],
    extraDetail:
      "When train 99% and test 60%: try more data, simpler model, or early stopping. Never add test data to training to 'fix' the score.",
  },
  "math_ai:1": {
    readTimeMin: 8,
    highlights: ["Vectors = one sample; matrices = batches", "Neural layers are matrix operations", "Dot product measures similarity"],
    extraDetail:
      "Mini exercise in NumPy: create vectors [1,2] and [2,1], compute dot product. Small numbers build confidence before textbook notation.",
  },
  "math_ai:2": {
    readTimeMin: 8,
    highlights: ["Gradient points uphill on the loss surface", "Gradient descent steps downhill", "Learning rate controls step size"],
    extraDetail:
      "Analogy: you're blindfolded on a hill (loss). Feel the slope (gradient), take a small step down. Too big a step → you fall off the path (divergence).",
  },
  "math_ai:3": {
    readTimeMin: 7,
    highlights: ["Models output probabilities, not always yes/no", "Cross-entropy punishes confident mistakes", "Calibration: 80% should be right ~80% of time"],
    extraDetail:
      "Medicine and finance care about calibrated risk. A model saying '90% disease' should be wrong only ~10% of the time on similar cases.",
  },
  "deep_learning:1": {
    readTimeMin: 9,
    highlights: ["Depth = stacked layers of neurons", "Nonlinearity is required for real power", "GPUs made large training practical"],
    extraDetail:
      "Hello-world: train a 2-layer net on XOR or MNIST digits. PyTorch tutorials '60-minute blitz' is a good weekend start after you know Python.",
  },
  "deep_learning:2": {
    readTimeMin: 8,
    highlights: ["Conv filters detect local patterns", "Pooling reduces spatial size", "Augmentation improves robustness"],
    extraDetail:
      "Vision pipeline: image → conv layers (edges/textures) → deeper layers (parts/objects) → classifier. Face unlock and medical scans use this idea.",
  },
  "deep_learning:3": {
    readTimeMin: 7,
    highlights: ["RNNs keep hidden state over time", "Long sequences were hard (vanishing gradients)", "Transformers replaced most NLP RNNs"],
    extraDetail:
      "Sequences include: weather over days, sensor readings, music notes, and words. Understanding RNNs helps you read transformer papers later.",
  },
  "transformers:1": {
    readTimeMin: 9,
    highlights: ["Attention weights which tokens matter", "Self-attention = each token looks at others", "Long-range links easier than vanilla RNN"],
    extraDetail:
      "Famous paper title: 'Attention Is All You Need' (2017). Modern ChatGPT-class models are mostly transformer stacks scaled up.",
  },
  "transformers:2": {
    readTimeMin: 8,
    highlights: ["Encoder-only (BERT) for understanding", "Decoder-only (GPT) for generation", "Pick architecture for your task"],
    extraDetail:
      "Sentiment on product reviews: encoder-only is enough. Story writing or code completion: decoder-only. Translation historically used both.",
  },
  "transformers:3": {
    readTimeMin: 7,
    highlights: ["Attention alone doesn't know word order", "Positional encoding injects position", "Context length is a memory limit"],
    extraDetail:
      "Long-context models (128k+ tokens) use engineering tricks: RoPE, sliding windows, and efficient attention approximations.",
  },
  "llm:1": {
    readTimeMin: 8,
    highlights: ["LLMs predict next token from huge text", "Scale (data + parameters) drives capability", "Hallucination = fluent but false"],
    extraDetail:
      "Always verify facts for exams and assignments. Use LLMs to explain steps and quiz you — not to skip learning. CodeLearn AI tools use similar APIs.",
  },
  "llm:2": {
    readTimeMin: 8,
    highlights: ["System prompt sets role and rules", "Few-shot examples teach format", "RAG adds external documents to context"],
    extraDetail:
      "Better prompt template: Role + Task + Input format + Constraints + Example output. 'Fix my code' → 'You are a Python tutor. Fix this function for O(n). Error: …'",
  },
  "llm:3": {
    readTimeMin: 8,
    highlights: ["Pretrain → fine-tune → alignment (RLHF)", "Guardrails reduce harmful outputs", "Use AI as tutor, not answer key"],
    extraDetail:
      "Ethics in education: discuss plagiarism, privacy of student prompts, and bias. Build small apps with rate limits and logging when you deploy.",
  },
  "ai_ethics:1": {
    readTimeMin: 7,
    highlights: ["Training data can encode historical bias", "Test error rates per group", "Document model limits publicly"],
    extraDetail: "Fairness checklist: Who is harmed if the model is wrong? Who was underrepresented in training data?",
  },
  "ai_ethics:2": {
    readTimeMin: 7,
    highlights: ["Collect minimum necessary data", "Consent and deletion rights", "Never log passwords or full PII in prompts"],
    extraDetail: "Workflow: ask → process → store (if needed) → delete on schedule. Map each step in your app diagram.",
  },
  "ai_ethics:3": {
    readTimeMin: 8,
    highlights: ["Guardrails + human review", "Clear student usage policy", "AI tutors guide, not replace thinking"],
    extraDetail: "Before launch: red-team prompts, list failure modes, add a report button for bad outputs.",
  },
  "ai_apps:1": {
    readTimeMin: 8,
    highlights: ["API keys only on server", "Frontend → your backend → model", "Timeouts and user-friendly errors"],
    extraDetail: "Follow the architecture flow diagram above when you add AI hints to your own project.",
  },
  "ai_apps:2": {
    readTimeMin: 9,
    highlights: ["Embed course notes as vectors", "Retrieve relevant chunks", "LLM answers with citations"],
    extraDetail: "RAG beats raw LLM when answers must come from your PDFs, syllabus, or internal docs.",
  },
  "ai_apps:3": {
    readTimeMin: 8,
    highlights: ["Rate limits per user", "Token/cost dashboard", "Version prompts in git"],
    extraDetail: "Production flow: deploy → monitor errors → adjust prompts → scale only when stable.",
  },
  "ai_career:1": {
    readTimeMin: 7,
    highlights: ["ML engineer vs data scientist vs MLOps", "Programming still core", "Pick one path to explore first"],
    extraDetail: "Use the career mind map to list 3 skills you already have and 3 to build this semester.",
  },
  "ai_career:2": {
    readTimeMin: 8,
    highlights: ["One finished project > many drafts", "README + metrics + demo", "State limitations honestly"],
    extraDetail: "Portfolio workflow: problem → data → baseline → improve → 2-min demo video.",
  },
  "ai_career:3": {
    readTimeMin: 7,
    highlights: ["Coding + ML concepts + communication", "Tell a STAR story for projects", "Daily practice compounds"],
    extraDetail: "Interview flow: clarify problem → approach → code/analysis → test → discuss tradeoffs.",
  },
};

function enrichLesson(lesson, moduleId, lessonInModule) {
  const key = `${moduleId}:${lessonInModule}`;
  const mod = MODULE_MEDIA[moduleId] || {};
  const extra = LESSON_ENRICH[key] || {};
  const extraDetail = extra.extraDetail || "";
  const concept = extraDetail ? `${lesson.concept}\n\n---\n\n${extraDetail}` : lesson.concept;

  return {
    ...lesson,
    concept,
    highlights: extra.highlights || [],
    diagram: getLessonDiagram(moduleId, lessonInModule),
    imageCaption: mod.tagline || "",
    readTimeMin: extra.readTimeMin || 6,
  };
}

function getModuleMedia(moduleId) {
  return MODULE_MEDIA[moduleId] || { tagline: "" };
}

module.exports = {
  MODULE_MEDIA,
  LESSON_ENRICH,
  enrichLesson,
  getModuleMedia,
};
