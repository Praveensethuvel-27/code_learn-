/**
 * Learning visuals: mind maps & workflows (not decorative photos).
 * Keys: "moduleId:lessonInModule"
 */

const LESSON_DIAGRAMS = {
  "intro_ai:1": {
    type: "mindmap",
    title: "What is AI?",
    center: "Artificial Intelligence",
    branches: ["Learn from data", "Rules vs ML", "Search & assistants", "Vision & language"],
  },
  "intro_ai:2": {
    type: "flow",
    title: "Traditional vs ML",
    steps: ["Write rules manually", "OR feed examples", "Model learns pattern", "Predict on new data"],
  },
  "intro_ai:3": {
    type: "mindmap",
    title: "Types of AI",
    center: "AI systems today",
    branches: ["Narrow AI (products)", "Agents + tools", "AGI (research)", "Your path: narrow + code"],
  },
  "understanding_models:1": {
    type: "flow",
    title: "Model lifecycle",
    steps: ["Input data", "Training adjusts weights", "Saved model", "Inference on new input"],
  },
  "understanding_models:2": {
    type: "flow",
    title: "Data splits",
    steps: ["Train set → learn", "Validation → tune", "Test → final score only", "Never leak test into train"],
  },
  "understanding_models:3": {
    type: "mindmap",
    title: "Features & labels",
    center: "Supervised example",
    branches: ["Features = inputs", "Label = target", "Bad features limit model", "Clean labels matter"],
  },
  "machine_learning:1": {
    type: "mindmap",
    title: "Supervised learning",
    center: "Labeled data",
    branches: ["Classification (category)", "Regression (number)", "Loss + optimize", "Start simple baseline"],
  },
  "machine_learning:2": {
    type: "flow",
    title: "Unsupervised flow",
    steps: ["Unlabeled data", "Find clusters / structure", "Explore segments", "Optional → later supervised"],
  },
  "machine_learning:3": {
    type: "flow",
    title: "Fix overfitting",
    steps: ["Train acc high, test low?", "More data / simpler model", "Regularization", "Early stopping"],
  },
  "math_ai:1": {
    type: "mindmap",
    title: "Linear algebra in AI",
    center: "Vectors & matrices",
    branches: ["Vector = one sample", "Matrix = batch", "Layers = matrix ops", "Dot product = similarity"],
  },
  "math_ai:2": {
    type: "flow",
    title: "Gradient descent",
    steps: ["Compute loss", "Find gradient (slope)", "Step opposite direction", "Repeat until low loss"],
  },
  "math_ai:3": {
    type: "mindmap",
    title: "Probability",
    center: "Model output",
    branches: ["Softmax → probabilities", "Cross-entropy loss", "Threshold for decision", "Calibration matters"],
  },
  "deep_learning:1": {
    type: "flow",
    title: "Neural network",
    steps: ["Input layer", "Hidden layers + ReLU", "Output layer", "Deep = many layers"],
  },
  "deep_learning:2": {
    type: "flow",
    title: "CNN pipeline",
    steps: ["Image in", "Conv filters (edges)", "Deeper layers (parts)", "Classify object"],
  },
  "deep_learning:3": {
    type: "flow",
    title: "Sequence models",
    steps: ["Token / step 1", "Hidden state carries forward", "Next step uses memory", "Transformers often replace RNN"],
  },
  "transformers:1": {
    type: "mindmap",
    title: "Attention",
    center: "Self-attention",
    branches: ["Query, Key, Value", "Each token looks around", "Long-range links", "Core of Transformers"],
  },
  "transformers:2": {
    type: "flow",
    title: "Encoder vs decoder",
    steps: ["Encoder → understand text", "Decoder → generate text", "Pick by task", "BERT vs GPT style"],
  },
  "transformers:3": {
    type: "mindmap",
    title: "Position in text",
    center: "Word order",
    branches: ["Attention alone unordered", "Positional encoding", "RoPE in modern LLMs", "Context length limit"],
  },
  "llm:1": {
    type: "flow",
    title: "How LLMs work",
    steps: ["Huge text pretrain", "Predict next token", "Prompt in", "Completion out (check facts!)"],
  },
  "llm:2": {
    type: "flow",
    title: "Prompt + context",
    steps: ["System role", "User prompt", "Context window", "RAG adds documents"],
  },
  "llm:3": {
    type: "flow",
    title: "Alignment pipeline",
    steps: ["Pretrain", "Instruction fine-tune", "RLHF / preferences", "Guardrails in product"],
  },
  "ai_ethics:1": {
    type: "mindmap",
    title: "Bias in AI",
    center: "Fairness",
    branches: ["Skewed training data", "Unequal errors across groups", "Audit & test slices", "Document limitations"],
  },
  "ai_ethics:2": {
    type: "flow",
    title: "Privacy workflow",
    steps: ["Collect minimal data", "Anonymize / consent", "Secure storage", "Delete when done"],
  },
  "ai_ethics:3": {
    type: "mindmap",
    title: "Responsible use",
    center: "Deploy safely",
    branches: ["Transparency", "Human oversight", "No harmful outputs", "Education: tutor not cheat"],
  },
  "ai_apps:1": {
    type: "flow",
    title: "AI app architecture",
    steps: ["User interface", "Your backend API", "Model API (Groq etc.)", "Response to user"],
  },
  "ai_apps:2": {
    type: "flow",
    title: "RAG workflow",
    steps: ["User question", "Search your documents", "Add chunks to prompt", "LLM answers with context"],
  },
  "ai_apps:3": {
    type: "mindmap",
    title: "Ship checklist",
    center: "Production app",
    branches: ["API keys secret", "Rate limits", "Error handling", "Logs & cost monitor"],
  },
  "ai_career:1": {
    type: "mindmap",
    title: "AI career paths",
    center: "Roles",
    branches: ["ML engineer", "Data scientist", "MLOps", "Research / PhD track"],
  },
  "ai_career:2": {
    type: "flow",
    title: "Portfolio project",
    steps: ["Pick problem", "Dataset + baseline", "Improve model", "Write README + demo"],
  },
  "ai_career:3": {
    type: "flow",
    title: "Interview prep",
    steps: ["Coding practice (CodeLearn)", "ML concepts", "One project story", "Explain tradeoffs clearly"],
  },
};

const MODULE_DEFAULT_DIAGRAM = {
  intro_ai: { type: "flow", title: "AI basics", steps: ["Data", "Train", "Model", "Use"] },
  understanding_models: { type: "flow", title: "Model", steps: ["Features", "Train", "Evaluate", "Deploy"] },
  machine_learning: { type: "mindmap", title: "ML", center: "Machine Learning", branches: ["Supervised", "Unsupervised", "Evaluate", "Improve"] },
  math_ai: { type: "mindmap", title: "Math", center: "Math for AI", branches: ["Vectors", "Gradients", "Probability"] },
  deep_learning: { type: "flow", title: "Deep learning", steps: ["Layers", "Train GPU", "Vision/NLP", "Deploy"] },
  transformers: { type: "mindmap", title: "Transformer", center: "Transformer", branches: ["Attention", "Encoder", "Decoder"] },
  llm: { type: "flow", title: "LLM", steps: ["Prompt", "Context", "Generate", "Verify"] },
  ai_ethics: { type: "mindmap", title: "Ethics", center: "Responsible AI", branches: ["Bias", "Privacy", "Safety", "Policy"] },
  ai_apps: { type: "flow", title: "Build app", steps: ["UI", "API", "Model", "Ship"] },
  ai_career: { type: "mindmap", title: "Career", center: "Your growth", branches: ["Skills", "Projects", "Network", "Interviews"] },
};

function getLessonDiagram(moduleId, lessonInModule) {
  const key = `${moduleId}:${lessonInModule}`;
  return LESSON_DIAGRAMS[key] || MODULE_DEFAULT_DIAGRAM[moduleId] || {
    type: "mindmap",
    title: "Lesson map",
    center: "Key idea",
    branches: ["Learn", "Practice", "Apply"],
  };
}

module.exports = { LESSON_DIAGRAMS, getLessonDiagram };
