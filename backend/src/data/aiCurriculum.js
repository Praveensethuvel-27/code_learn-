/**
 * AI Learn path — modules with ~3 bite-sized lessons each.
 * Daily lesson = one entry in FLAT_LESSONS (cycles by day through all modules).
 */
const { enrichLesson, getModuleMedia } = require("./aiLessonEnrichment");
const { getLessonDiagram } = require("./aiLessonDiagrams");

const AI_MODULES = [
  {
    id: "intro_ai",
    title: "Introduction to Artificial Intelligence",
    order: 1,
    lessons: [
      {
        title: "What is AI?",
        summary: "AI is software that learns patterns from data instead of only following fixed rules.",
        concept:
          "Artificial Intelligence means computers performing tasks that usually need human judgment — recognizing images, understanding language, or recommending videos. Rule-based programs say \"if X then Y\"; AI systems improve from examples. Modern AI is mostly Machine Learning: the machine finds rules from data.\n\nYou already use AI daily: search ranking, face unlock, spam filters, and chat assistants.",
        miniChallenge: "List 3 apps you use daily that might use AI and guess what data they learn from.",
        codeTip: "Key idea: data → model → prediction. No magic — statistics + compute.",
      },
      {
        title: "AI vs traditional programming",
        summary: "Traditional code is explicit logic; AI learns behavior from examples.",
        concept:
          "In traditional programming you write every rule: if temperature > 38, fever = true. In ML you show thousands of (temperature, label) pairs and the model learns the boundary. AI shines when rules are too complex to write by hand — vision, speech, language.\n\nLimitations matter: AI needs data, can be wrong, and must be tested like any software.",
        miniChallenge: "Pick one task (spam detection). Write one manual rule, then one sentence on why learning from emails might work better.",
        codeTip: "AI is not always the answer — simple rules are cheaper and clearer when they suffice.",
      },
      {
        title: "Types of AI systems",
        summary: "Narrow AI solves one task; research also explores broader reasoning and agents.",
        concept:
          "Today’s products are narrow AI: chess engines, translators, code assistants — each strong in one domain. AGI (human-level general intelligence) is research, not something you ship in a college lab yet. Agents combine models with tools (search, code run, APIs) to complete multi-step goals.\n\nFor your career, focus on narrow AI + solid programming fundamentals.",
        miniChallenge: "Define narrow AI in your own words in two lines.",
        codeTip: "Roadmap ahead: models → ML → math → deep learning → transformers → LLMs.",
      },
    ],
  },
  {
    id: "understanding_models",
    title: "Understanding Models",
    order: 2,
    lessons: [
      {
        title: "What is a model?",
        summary: "A model is a learned function that maps inputs to outputs.",
        concept:
          "A model is saved math: f(input) → output. Training adjusts internal numbers (parameters) so f fits examples. Inference means using the trained f on new data. Same idea for predicting house prices or next words in a sentence.\n\nParameters are learned; architecture is designed by humans (layers, connections).",
        miniChallenge: "If input is email text and output is spam/not spam, what are examples and labels?",
        codeTip: "Training = learn parameters. Inference = use parameters on new data.",
      },
      {
        title: "Training, validation, test",
        summary: "Split data so you measure real generalization, not memorization.",
        concept:
          "Train set teaches the model. Validation set tunes choices (learning rate, architecture). Test set is touched once at the end for honest accuracy. If you test on training data, scores look great but production fails — overfitting.\n\nLeakage happens when test information sneaks into training (e.g. future data in time series).",
        miniChallenge: "Why is random shuffling before split NOT enough for stock price prediction?",
        codeTip: "Golden rule: test set is sacred until final evaluation.",
      },
      {
        title: "Features and labels",
        summary: "Features are inputs; labels are what you want to predict.",
        concept:
          "Tabular example: features = age, income, browsing time; label = bought product yes/no. Bad features limit even the best algorithm. Feature engineering (scaling, encoding categories) is still important alongside deep learning.\n\nLabels must be consistent and correctly annotated — garbage labels → garbage model.",
        miniChallenge: "For student drop-out prediction, name 4 features and the label.",
        codeTip: "Start simple (logistic regression) before jumping to huge neural nets.",
      },
    ],
  },
  {
    id: "machine_learning",
    title: "Machine Learning",
    order: 3,
    lessons: [
      {
        title: "Supervised learning",
        summary: "Learn from input–output pairs: classification and regression.",
        concept:
          "Classification predicts categories (cat/dog, spam/ham). Regression predicts numbers (price, temperature). Loss functions measure error; optimization reduces loss by updating weights. Common models: linear/logistic regression, decision trees, random forests.\n\nAlways baseline with a simple model before complex ones.",
        miniChallenge: "Is predicting exam score from study hours classification or regression?",
        codeTip: "Libraries: scikit-learn for classical ML in Python.",
      },
      {
        title: "Unsupervised learning",
        summary: "Find structure in data without labels — clusters and patterns.",
        concept:
          "Clustering groups similar points (customer segments). Dimensionality reduction (PCA) compresses features for visualization. Unsupervised pre-training can help later supervised tasks.\n\nNo labels means evaluation is harder — use domain sense and stability checks.",
        miniChallenge: "Give one business use case for clustering.",
        codeTip: "K-means is simple; always scale numeric features first.",
      },
      {
        title: "Overfitting and regularization",
        summary: "Too flexible models memorize noise; regularization encourages simplicity.",
        concept:
          "Overfitting: great on train, poor on test. Fixes: more data, simpler model, dropout (neural nets), L2 weight penalty, early stopping when validation loss rises. Bias–variance tradeoff: underfit = too simple, overfit = too complex.\n\nCross-validation gives stabler estimates on small datasets.",
        miniChallenge: "Your train accuracy is 99% and test is 60%. Name two actions to try.",
        codeTip: "Watch train vs validation curves — they tell the story.",
      },
    ],
  },
  {
    id: "math_ai",
    title: "Mathematics for AI",
    order: 4,
    lessons: [
      {
        title: "Linear algebra intuition",
        summary: "Vectors and matrices represent data and transformations.",
        concept:
          "A row of numbers is a vector (one sample). Stacking rows gives a matrix (dataset). Neural layers are matrix multiplies plus nonlinearity. Dot products measure similarity — core to attention later.\n\nYou don’t need proofs first; build intuition with small numeric examples.",
        miniChallenge: "If a vector is [2,0] and another is [0,2], are they similar? Why?",
        codeTip: "NumPy: np.dot(a, b) for dot product practice.",
      },
      {
        title: "Calculus and gradients",
        summary: "Gradients tell optimizers which direction to adjust weights.",
        concept:
          "Loss depends on weights. Partial derivatives form the gradient — vector pointing uphill. Gradient descent steps opposite to gradient to reduce loss. Learning rate controls step size; too large diverges, too small is slow.\n\nBackpropagation efficiently computes gradients in deep networks.",
        miniChallenge: "Loss goes up after an update. Should learning rate increase or decrease?",
        codeTip: "Think of gradient as \"which way is uphill on the loss hill\".",
      },
      {
        title: "Probability basics",
        summary: "AI outputs are often probabilities, not certainties.",
        concept:
          "Softmax turns scores into class probabilities summing to 1. Cross-entropy loss punishes confident wrong answers. Bayes’ view: prior + evidence → posterior. Uncertainty matters in medicine, finance, safety.\n\nCalibration: predicted 80% should be right ~80% of the time.",
        miniChallenge: "Model says 90% spam but email is ham. Is the model necessarily bad?",
        codeTip: "Argmax picks class; threshold trades precision vs recall.",
      },
    ],
  },
  {
    id: "deep_learning",
    title: "Deep Learning",
    order: 5,
    lessons: [
      {
        title: "Neural networks",
        summary: "Stacks of layers learn hierarchical features automatically.",
        concept:
          "Neurons apply weighted sum + activation (ReLU, etc.). Deep = many layers: edges → shapes → objects in vision. Nonlinearity is essential — without it, depth collapses to one linear map.\n\nGPU acceleration made large-scale deep learning practical.",
        miniChallenge: "Why do we need a nonlinear activation between linear layers?",
        codeTip: "Frameworks: PyTorch or TensorFlow — start with a tiny 2-layer net.",
      },
      {
        title: "CNNs for vision",
        summary: "Convolutional networks exploit local patterns in images.",
        concept:
          "Conv filters slide across the image detecting edges, textures, parts. Pooling reduces spatial size. CNNs power face detection, medical imaging, autonomous driving perception.\n\nData augmentation (flip, crop) improves robustness.",
        miniChallenge: "Name two real products using computer vision.",
        codeTip: "Input shape: batch × channels × height × width (PyTorch NCHW).",
      },
      {
        title: "RNNs and sequences",
        summary: "Recurrent networks process sequences one step at a time.",
        concept:
          "RNNs keep hidden state across time steps — early approach for language and time series. Vanishing gradients made long contexts hard. LSTM/GRU gates helped; transformers later dominated language.\n\nStill useful to understand sequencing before LLMs.",
        miniChallenge: "Give two examples of sequence data besides text.",
        codeTip: "Transformers replaced most RNN NLP pipelines after 2017–2020.",
      },
    ],
  },
  {
    id: "transformers",
    title: "Transformers",
    order: 6,
    lessons: [
      {
        title: "Attention mechanism",
        summary: "Attention lets each token focus on relevant other tokens.",
        concept:
          "Instead of one fixed hidden state, queries, keys, and values compute weighted mixes of positions. \"Attention is all you need\" (2017) introduced the Transformer architecture using self-attention without recurrence.\n\nLong-range dependencies become easier than vanilla RNNs.",
        miniChallenge: "In the sentence \"The cat sat on the mat because it was tired\", what might \"it\" attend to?",
        codeTip: "Scaled dot-product attention: softmax(QKᵀ/√d)V.",
      },
      {
        title: "Encoder–decoder structure",
        summary: "Encoders build representations; decoders generate outputs.",
        concept:
          "Encoder-only models (BERT) excel at understanding — classification, embeddings. Decoder-only (GPT) excel at generation. Seq2seq translation used both: encoder reads source, decoder writes target.\n\nYour use case picks the architecture.",
        miniChallenge: "For sentiment analysis only, encoder-only or decoder-only — why?",
        codeTip: "Masking during training prevents peeking at future tokens (decoder).",
      },
      {
        title: "Positional encoding",
        summary: "Transformers need position info since they are not inherently sequential.",
        concept:
          "Self-attention is permutation-sensitive without position signals. Sinusoidal or learned positional embeddings inject order. Modern models also use rotary (RoPE) and other schemes for long context.\n\nContext length limits are an active engineering constraint.",
        miniChallenge: "Why shuffling word order destroys meaning but attention alone doesn't know order?",
        codeTip: "Longer context = more memory (quadratic attention in vanilla form).",
      },
    ],
  },
  {
    id: "llm",
    title: "Large Language Models",
    order: 7,
    lessons: [
      {
        title: "What are LLMs?",
        summary: "LLMs predict the next token from huge text pretraining.",
        concept:
          "Models like GPT family learn statistical language patterns at scale — grammar, facts, coding idioms. They are generative: prompt in, continuation out. Size (parameters), data, and compute drive capability jumps.\n\nThey can hallucinate — fluent but false — so verify critical facts.",
        miniChallenge: "Write a prompt and note one way the answer could be wrong.",
        codeTip: "CodeLearn AI tools use similar APIs (Groq) behind the scenes.",
      },
      {
        title: "Prompting and context",
        summary: "Prompt design steers behavior; context window is working memory.",
        concept:
          "System prompts set role and rules. Few-shot examples teach format. Chain-of-thought asks for step-by-step reasoning. Context window holds prompt + history; beyond limit, old text is dropped or summarized.\n\nRAG (retrieval) feeds external documents into context for accuracy.",
        miniChallenge: "Improve this prompt: \"fix my code\" → add language, error, and goal.",
        codeTip: "Be specific: input format, constraints, desired output shape.",
      },
      {
        title: "Fine-tuning and safety",
        summary: "Alignment and fine-tuning shape models for helpful, safer use.",
        concept:
          "Pretrain on broad text → fine-tune on instructions (SFT) → RLHF or preference optimization for helpfulness and safety. Guardrails filter harmful requests. For products: rate limits, logging, privacy, and human review on edge cases.\n\nStudents should use AI as tutor, not answer key — learn the reasoning.",
        miniChallenge: "Name one ethical risk of deploying chatbots in education.",
        codeTip: "Next step: build small apps with APIs + your coding problem platform.",
      },
    ],
  },
  {
    id: "ai_ethics",
    title: "AI Ethics & Responsible AI",
    order: 8,
    lessons: [
      {
        title: "Bias and fairness",
        summary: "Models can amplify unfair patterns present in training data.",
        concept:
          "If historical hiring data favored one group, a model may learn that bias. Fairness work includes diverse data, testing error rates per group, and transparency about limits.\n\nFair AI is not only a technical problem — it needs domain experts and clear policies.",
        miniChallenge: "Name one feature that could encode bias in a loan approval model.",
        codeTip: "Measure performance slices, not only overall accuracy.",
      },
      {
        title: "Privacy and consent",
        summary: "User data for AI must be collected and stored responsibly.",
        concept:
          "Minimize data collection, get consent, anonymize where possible, and secure databases. Student chat logs in ed-tech need retention limits and opt-out.\n\nGDPR-style ideas: purpose limitation, right to deletion, and audit trails.",
        miniChallenge: "List two data types an AI tutor app should NOT store forever.",
        codeTip: "Hash or redact PII before sending text to third-party APIs.",
      },
      {
        title: "Safe deployment",
        summary: "Products need guardrails, monitoring, and human oversight.",
        concept:
          "Filter harmful prompts, log anomalies, and escalate edge cases to humans. In education: position AI as a tutor that guides thinking, not a substitute for learning.\n\nDocument known failure modes so users know when not to trust outputs.",
        miniChallenge: "Write one line for a student-facing AI usage policy.",
        codeTip: "Responsible AI = technical controls + clear user norms.",
      },
    ],
  },
  {
    id: "ai_apps",
    title: "Building AI Applications",
    order: 9,
    lessons: [
      {
        title: "App architecture",
        summary: "Typical stack: frontend → your API → model provider.",
        concept:
          "Never expose API keys in the browser. Your Node/Python backend calls Groq, OpenAI, or local models and returns sanitized JSON to React.\n\nAdd timeouts, retries, and friendly error messages when the model is down.",
        miniChallenge: "Draw three boxes: UI, backend, model API. What travels between each?",
        codeTip: "Same pattern CodeLearn uses for AI hints behind auth.",
      },
      {
        title: "RAG — retrieval augmented generation",
        summary: "Ground answers in your own documents, not only model memory.",
        concept:
          "Embed documents into vectors, search similar chunks for a user question, inject chunks into the prompt, then generate. Reduces hallucination on company FAQs, course notes, or docs.\n\nQuality depends on chunk size, embedding model, and search recall.",
        miniChallenge: "Why would a college chatbot use RAG instead of raw GPT only?",
        codeTip: "RAG flow: question → retrieve → prompt+context → answer.",
      },
      {
        title: "Ship to production",
        summary: "Rate limits, cost caps, logging, and monitoring before launch.",
        concept:
          "Track tokens per user, set daily quotas, and alert on error spikes. Version your prompts in git. Staging environment tests real API calls with fake users.\n\nStart small: one feature, one model, measure usage, then scale.",
        miniChallenge: "Name two metrics you would dashboard for an AI feature.",
        codeTip: "Ship checklist: secrets, limits, logs, fallback message.",
      },
    ],
  },
  {
    id: "ai_career",
    title: "AI Career & Portfolio",
    order: 10,
    lessons: [
      {
        title: "Career paths in AI",
        summary: "ML engineer, data scientist, MLOps, research — different skill mixes.",
        concept:
          "ML engineers build training pipelines and deploy models. Data scientists explore data and communicate insights. MLOps focuses on reliability and scale. Research needs strong math and papers.\n\nMost industry roles still require solid programming — your CodeLearn practice matters.",
        miniChallenge: "Which path sounds closest to you? Write one skill to build this month.",
        codeTip: "T-shaped skills: deep in one area, broad in coding + ML basics.",
      },
      {
        title: "Portfolio projects",
        summary: "One end-to-end project beats ten half-finished notebooks.",
        concept:
          "Pick a problem with public data, show EDA, baseline model, improvement, and a short demo (Streamlit or React). README explains data, metrics, and limitations.\n\nRecruiters read READMEs and watch 2-minute demos more than huge repos.",
        miniChallenge: "Draft a one-sentence project idea you could finish in 2 weeks.",
        codeTip: "Portfolio = problem + data + model + demo + README.",
      },
      {
        title: "Interviews and next steps",
        summary: "Combine coding practice, ML concepts, and clear communication.",
        concept:
          "Expect coding (arrays, SQL), ML basics (bias-variance, metrics), and system design for ML (data pipeline, serving). Tell a story: problem, approach, result, what you would improve.\n\nKeep learning: follow one course, build one project, contribute slowly to open source.",
        miniChallenge: "Practice explaining gradient descent in 30 seconds without jargon.",
        codeTip: "Use CodeLearn daily + one AI module lesson = steady growth.",
      },
    ],
  },
];

function flattenLessons() {
  const flat = [];
  for (const mod of AI_MODULES) {
    mod.lessons.forEach((lesson, i) => {
      const lessonInModule = i + 1;
      flat.push(
        enrichLesson(
          {
            ...lesson,
            topic: mod.id,
            moduleId: mod.id,
            moduleTitle: mod.title,
            moduleOrder: mod.order,
            lessonInModule,
            lessonsInModule: mod.lessons.length,
          },
          mod.id,
          lessonInModule,
        ),
      );
    });
  }
  return flat;
}

const FLAT_LESSONS = flattenLessons();

function getLessonForDay(date = new Date()) {
  const key = date.toISOString().slice(0, 10);
  const dayNum = Math.floor(new Date(key).getTime() / 86400000);
  const idx = dayNum % FLAT_LESSONS.length;
  return getLessonByFlatIndex(idx, key);
}

/** Pick lesson by position in full path (0-based). Used for daily rotation. */
function getLessonByFlatIndex(idx, date = null) {
  const total = FLAT_LESSONS.length;
  if (!total) return null;
  const safeIdx = ((idx % total) + total) % total;
  const lesson = FLAT_LESSONS[safeIdx];
  const key = date || new Date().toISOString().slice(0, 10);
  return {
    ...lesson,
    date: key,
    lessonIndex: safeIdx + 1,
    totalLessons: total,
    source: "curated",
  };
}

function getCurriculum() {
  return {
    modules: AI_MODULES.map((m) => {
      const media = getModuleMedia(m.id);
      return {
        id: m.id,
        title: m.title,
        order: m.order,
        lessonCount: m.lessons.length,
        tagline: media.tagline,
        lessons: m.lessons.map((l, i) => ({ order: i + 1, title: l.title, summary: l.summary })),
      };
    }),
    totalLessons: FLAT_LESSONS.length,
  };
}

/** Full content for browse-any-lesson UI */
function getFullCurriculum() {
  const media = getModuleMedia;
  return {
    modules: AI_MODULES.map((m) => {
      const modMedia = media(m.id);
      return {
        id: m.id,
        title: m.title,
        order: m.order,
        lessonCount: m.lessons.length,
        tagline: modMedia.tagline,
        lessons: m.lessons.map((l, i) => {
          const lessonInModule = i + 1;
          const enriched = enrichLesson(
            {
              title: l.title,
              summary: l.summary,
              concept: l.concept,
              miniChallenge: l.miniChallenge,
              codeTip: l.codeTip,
            },
            m.id,
            lessonInModule,
          );
          return {
            lessonInModule,
            title: enriched.title,
            summary: enriched.summary,
            concept: enriched.concept,
            miniChallenge: enriched.miniChallenge,
            codeTip: enriched.codeTip,
            highlights: enriched.highlights,
            diagram: enriched.diagram,
            imageCaption: enriched.imageCaption,
            readTimeMin: enriched.readTimeMin,
            diagram: enriched.diagram,
            topic: m.id,
            moduleId: m.id,
            moduleTitle: m.title,
            moduleOrder: m.order,
            lessonsInModule: m.lessons.length,
          };
        }),
      };
    }),
    totalLessons: FLAT_LESSONS.length,
    moduleCount: AI_MODULES.length,
  };
}

function getLessonByModule(moduleId, lessonInModule = 1) {
  const mod = AI_MODULES.find((m) => m.id === moduleId);
  if (!mod) return null;
  const idx = Math.max(1, Math.min(mod.lessons.length, Number(lessonInModule) || 1)) - 1;
  const l = mod.lessons[idx];
  const resolvedLesson = idx + 1;
  const flatIdx = FLAT_LESSONS.findIndex(
    (x) => x.moduleId === moduleId && x.lessonInModule === resolvedLesson,
  );
  return enrichLesson(
    {
      ...l,
      topic: mod.id,
      moduleId: mod.id,
      moduleTitle: mod.title,
      moduleOrder: mod.order,
      lessonInModule: resolvedLesson,
      lessonsInModule: mod.lessons.length,
      lessonIndex: flatIdx >= 0 ? flatIdx + 1 : resolvedLesson,
      totalLessons: FLAT_LESSONS.length,
      source: "curated",
    },
    moduleId,
    resolvedLesson,
  );
}

function getAdjacentLesson(moduleId, lessonInModule, direction) {
  const mod = AI_MODULES.find((m) => m.id === moduleId);
  if (!mod) return null;
  let mi = AI_MODULES.findIndex((m) => m.id === moduleId);
  let li = (Number(lessonInModule) || 1) - 1;
  if (direction === "next") {
    li += 1;
    if (li >= mod.lessons.length) {
      mi += 1;
      li = 0;
      if (mi >= AI_MODULES.length) return null;
      return getLessonByModule(AI_MODULES[mi].id, 1);
    }
    return getLessonByModule(mod.id, li + 1);
  }
  li -= 1;
  if (li < 0) {
    mi -= 1;
    if (mi < 0) return null;
    return getLessonByModule(AI_MODULES[mi].id, AI_MODULES[mi].lessons.length);
  }
  return getLessonByModule(mod.id, li + 1);
}

module.exports = {
  AI_MODULES,
  FLAT_LESSONS,
  getLessonForDay,
  getLessonByFlatIndex,
  getCurriculum,
  getFullCurriculum,
  getLessonByModule,
  getAdjacentLesson,
};
