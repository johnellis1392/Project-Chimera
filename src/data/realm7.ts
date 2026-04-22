import type { Realm } from '../types';

export const realm7: Realm = {
  id: 'r7',
  title: 'AI Systems & MLOps',
  subtitle: 'The craft of putting AI into the world',
  icon: '⚙️',
  description: 'Data pipelines, training infrastructure, model optimization, deployment, and monitoring — the engineering behind production ML.',
  prerequisiteRealmIds: ['r2'],
  quests: [
    {
      id: 'r7q1',
      title: 'Data Engineering',
      description: 'The data pipelines and quality practices that determine model performance.',
      chapters: [
        {
          id: 'r7q1c1',
          title: 'Data Collection and Sourcing',
          lesson: {
            text: 'ML models are only as good as their data. Collection strategies: web scraping, crowdsourcing (MTurk), partnerships, synthetic data generation, and active learning. Data cards document provenance, collection methodology, and intended use. Biased collection directly creates biased models — sampling strategy must match deployment distribution.',
            formula: 'Key questions: who collected it? for what purpose? what\'s missing?\nData sheet: motivation, composition, collection, preprocessing',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A medical AI trained only on data from urban US hospitals is deployed in rural hospitals. What primary risk does this pose?',
            options: [
              'Distribution shift — rural patient demographics and equipment differ, leading to degraded performance',
              'The model will refuse to make predictions on rural data',
              'Rural hospitals lack GPU infrastructure',
              'HIPAA compliance is different in rural areas',
            ],
            correctAnswer: 'Distribution shift — rural patient demographics and equipment differ, leading to degraded performance',
            explanation: 'The training distribution (urban US) differs from deployment (rural). Skin tone distribution, comorbidity patterns, imaging equipment quality all differ. The model may be confidently wrong on this out-of-distribution data.',
          },
        },
        {
          id: 'r7q1c2',
          title: 'Cleaning, Labeling, and Annotation',
          lesson: {
            text: 'Labeling is the bottleneck of supervised learning. Inter-annotator agreement (Cohen\'s κ) measures label consistency. Active learning selects the most informative unlabeled examples for annotation. Semi-supervised learning uses a small labeled set + large unlabeled set. Data cleaning removes duplicates, fixes errors, and handles outliers.',
            formula: 'Cohen\'s κ = (P_obs − P_exp) / (1 − P_exp)\nκ > 0.8 = strong agreement, < 0.6 = weak',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Cohen\'s κ = 0 means:',
            options: [
              'Agreement is no better than chance — annotators are essentially random',
              'Perfect disagreement',
              'Perfect agreement',
              'One annotator labeled everything the same',
            ],
            correctAnswer: 'Agreement is no better than chance — annotators are essentially random',
            explanation: 'κ = 0 means observed agreement equals expected agreement by chance. A dataset with κ ≈ 0 has unreliable labels — the task may be ambiguous or annotators need better guidelines.',
          },
        },
        {
          id: 'r7q1c3',
          title: 'Feature Engineering',
          lesson: {
            text: 'Feature engineering transforms raw data into informative model inputs. For tabular data: standardization, one-hot encoding, target encoding, binning. For time series: lag features, rolling statistics, Fourier features. Feature stores (Feast, Tecton) serve consistent features in training and inference, preventing training-serving skew.',
            formula: 'Standardization: x\' = (x − μ) / σ\nTarget encoding: replace category c with E[y | category=c]',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Target encoding of categorical features must be done carefully to avoid:',
            options: [
              'Target leakage — computing E[y|category] on the training set leaks target info into features',
              'Feature scaling mismatch',
              'High cardinality — too many unique values',
              'Increased training time',
            ],
            correctAnswer: 'Target leakage — computing E[y|category] on the training set leaks target info into features',
            explanation: 'If you compute E[y|cat] on the full training set, then train a model using those encodings, you\'ve leaked y into x — the model sees its own labels as features. Fix: use cross-fold target encoding or smooth with global mean.',
          },
        },
        {
          id: 'r7q1c4',
          title: 'Data Versioning and Lineage',
          lesson: {
            text: 'DVC (Data Version Control) tracks datasets with git-like versioning. Data lineage records the full transformation chain from raw data to model input. Reproducibility requires pinning dataset versions, preprocessing code, and random seeds. Feature stores maintain consistent feature definitions across training and inference.',
            formula: 'Reproducibility: code + data version + config + random seed → deterministic output\nLineage: raw data → cleaned → features → model inputs → predictions',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why is data versioning critical for ML debugging?',
            options: [
              'Without versioning, you cannot reproduce past model behavior or diagnose what changed when metrics regress',
              'Data versioning speeds up model training',
              'It is required by GDPR compliance',
              'It prevents annotators from making mistakes',
            ],
            correctAnswer: 'Without versioning, you cannot reproduce past model behavior or diagnose what changed when metrics regress',
            explanation: 'When a model performance drops, the cause could be code, data, or config. If data is unversioned, you can\'t roll back to the exact dataset that produced a good model or check if a data issue caused the regression.',
          },
        },
        {
          id: 'r7q1c5',
          title: 'Handling Imbalance, Drift, and Distribution Shift',
          lesson: {
            text: 'Class imbalance: oversample minority (SMOTE), undersample majority, or adjust class weights. Distribution shift: training distribution ≠ deployment distribution. Covariate shift: P(x) changes but P(y|x) stays the same. Concept drift: P(y|x) changes over time. Solutions: importance weighting, continuous monitoring, and retraining.',
            formula: 'SMOTE: synthesize minority samples between existing ones\nImportance weighting: w(x) = P_target(x)/P_train(x)',
          },
          challenge: {
            type: 'design',
            prompt: 'Your fraud detection model (1:1000 fraud:legit ratio) achieves 99.9% accuracy but almost never catches fraud. What is the core issue and fix?',
            options: [
              'Class imbalance — the model learns to always predict "not fraud"; fix: use class weights or SMOTE + evaluate with recall/F1',
              'The model is too small — increase its capacity',
              'Accuracy is the wrong metric — but the model is working correctly',
              'The training data has too many fraudulent examples',
            ],
            correctAnswer: 'Class imbalance — the model learns to always predict "not fraud"; fix: use class weights or SMOTE + evaluate with recall/F1',
            explanation: '99.9% accuracy is achieved by always predicting "not fraud" (baseline of 99.9% negatives). Class imbalance means the loss is dominated by the majority class. Use class_weight="balanced", SMOTE, or Focal Loss + evaluate recall/precision.',
          },
        },
        {
          id: 'r7q1boss',
          title: 'BOSS: The Data Architect',
          isBoss: true,
          lesson: {
            text: 'Data quality is the primary determinant of model quality. "Garbage in, garbage out" is more true in ML than anywhere else. This boss tests your full data pipeline thinking.',
          },
          challenge: {
            type: 'design',
            prompt: 'You are building a recommendation system. Your training data is historical user-item interactions from 2020-2023. Deployment is 2024. What data problems must you address?',
            options: [
              'Temporal distribution shift (new items/users), feedback loop bias (popular items shown more = more data), and missing not-at-random (users only rate items they liked)',
              'Class imbalance — too many positive interactions',
              'Feature normalization — user IDs need standardization',
              'The dataset is too large — subsample for efficiency',
            ],
            correctAnswer: 'Temporal distribution shift (new items/users), feedback loop bias (popular items shown more = more data), and missing not-at-random (users only rate items they liked)',
            explanation: 'These three are the canonical data pathologies of recommendation systems: temporal shift invalidates old interaction patterns; popularity bias skews toward already-popular items; selection bias means we never observe "liked but never shown" interactions.',
          },
        },
      ],
    },
    {
      id: 'r7q2',
      title: 'Training Infrastructure',
      description: 'GPU architecture, distributed training, and large-scale training pipelines.',
      prerequisiteQuestIds: ['r7q1'],
      chapters: [
        {
          id: 'r7q2c1',
          title: 'GPU/TPU Architecture and Memory',
          lesson: {
            text: 'A GPU has thousands of CUDA cores organized into Streaming Multiprocessors (SMs). Key bottleneck: HBM bandwidth (e.g., 3.35 TB/s on H100). Training needs: 16 bytes/parameter for Adam (fp16 param + fp32 grad + fp32 momentum + fp32 variance). A 7B model needs ~112GB for training vs ~14GB for inference.',
            formula: 'Training memory ≈ 16 × params (bytes) — Adam optimizer\nInference memory ≈ 2 × params (fp16)\nA100 80GB: 2TB/s bandwidth, 312 TFLOPS fp16',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why are matrix multiplications on GPUs much faster than on CPUs?',
            options: [
              'GPUs have thousands of cores that execute multiply-add operations in parallel (SIMT architecture)',
              'GPUs have faster memory than CPUs',
              'CPUs must serialize matrix operations',
              'GPUs use a different mathematical algorithm for matrix multiplication',
            ],
            correctAnswer: 'GPUs have thousands of cores that execute multiply-add operations in parallel (SIMT architecture)',
            explanation: 'A100 has 6912 CUDA cores + 432 Tensor Cores. Each Tensor Core performs a 4×4 matrix multiply per clock. SIMT (Single Instruction, Multiple Threads) executes the same operation on thousands of elements simultaneously.',
          },
        },
        {
          id: 'r7q2c2',
          title: 'Distributed Training — Data and Model Parallelism',
          lesson: {
            text: 'Data parallelism (DDP): each device holds a full model copy and processes a different data shard; gradients are averaged across devices. Model parallelism (tensor/pipeline): the model is split across devices — needed when a single model doesn\'t fit in one GPU. ZeRO (DeepSpeed) shards optimizer states, gradients, and parameters across devices.',
            formula: 'DDP: gradient = (1/N) Σᵢ ∇_θ Lᵢ  (AllReduce)\nZeRO-3: each device holds 1/N of all params, grads, optimizer states',
          },
          challenge: {
            type: 'quiz',
            prompt: 'ZeRO-3 sharding reduces memory usage per GPU by:',
            options: [
              'Distributing all parameters, gradients, and optimizer states across N GPUs — each holds 1/N',
              'Using fp8 precision for everything',
              'Removing the optimizer and using SGD only',
              'Skipping gradient computation on some layers',
            ],
            correctAnswer: 'Distributing all parameters, gradients, and optimizer states across N GPUs — each holds 1/N',
            explanation: 'ZeRO (Zero Redundancy Optimizer) eliminates the redundancy in DDP where every GPU holds a full copy. ZeRO-3 shards everything: 8× A100s each hold 1/8 of parameters, gradients, and optimizer states — 8× memory reduction.',
          },
        },
        {
          id: 'r7q2c3',
          title: 'Mixed Precision Training',
          lesson: {
            text: 'Mixed precision uses fp16/bf16 for forward pass and gradients (2× faster, 2× memory savings) but maintains a fp32 master copy of weights for the optimizer update (fp16 has insufficient range for gradients). Loss scaling prevents fp16 gradients from underflowing to zero.',
            formula: 'fp16: 5-bit exponent, ±65504 max, 1e-4 resolution\nbf16: 8-bit exponent (same as fp32), better numerical range\nLoss scaling: L\' = s·L, grad\' = grad/s after backward',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why is bf16 generally preferred over fp16 for LLM training?',
            options: [
              'bf16 has the same exponent range as fp32 — no gradient overflow/underflow; fp16 needs manual loss scaling',
              'bf16 uses less memory than fp16',
              'fp16 is not supported on modern GPUs',
              'bf16 is more accurate for small values',
            ],
            correctAnswer: 'bf16 has the same exponent range as fp32 — no gradient overflow/underflow; fp16 needs manual loss scaling',
            explanation: 'fp16 can represent at most 65504. Large loss scales or gradients overflow to inf/NaN. bf16 shares the 8-bit exponent range of fp32 (max ~3.4e38) — no overflow for typical training dynamics. The tradeoff: bf16 has less mantissa precision (7 bits vs fp16\'s 10).',
          },
        },
        {
          id: 'r7q2c4',
          title: 'Experiment Tracking and Reproducibility',
          lesson: {
            text: 'MLflow, Weights & Biases (W&B), and Neptune track hyperparameters, metrics, artifacts, and code versions. Reproducibility requires: pinning library versions (pip freeze), seeding RNGs, and logging all hyperparameters. W&B sweeps automate hyperparameter search. Model registries store versioned, approved model artifacts.',
            formula: 'Reproducibility checklist: seed + deps + data version + config → same result\nTracking: run_id + metrics_history + artifacts + config → auditable',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why is tracking the random seed critical for ML experiment reproducibility?',
            options: [
              'Model initialization, data shuffling, and dropout are all random — different seeds give different results',
              'The seed determines which GPU is used',
              'Seeds encrypt the model weights',
              'Without a seed, the model always gives the same output',
            ],
            correctAnswer: 'Model initialization, data shuffling, and dropout are all random — different seeds give different results',
            explanation: 'Weight initialization (Xavier/He), mini-batch order, dropout masks, and data augmentation all use RNG. Changing the seed changes all of these simultaneously — even identical code and data can give different final models.',
          },
        },
        {
          id: 'r7q2c5',
          title: 'Large-Scale Training Pipelines',
          lesson: {
            text: 'Training GPT-3 required 3640 petaflop-days. Large-scale pipelines need fault tolerance (checkpointing every N steps), data streaming (datasets too large for RAM), and monitoring (loss curves, gradient norms, throughput). Megatron-LM and DeepSpeed provide production-grade distributed training implementations.',
            formula: 'Checkpointing frequency: balance checkpoint cost vs. lost computation on failure\nThroughput: tokens/second = batch_size × seq_len / step_time',
          },
          challenge: {
            type: 'design',
            prompt: 'You are training a 70B model on 4096 A100s for 30 days. A hardware failure on day 20 resets the run. How do you prevent this disaster?',
            options: [
              'Checkpoint every N steps to durable storage — on failure, resume from the latest checkpoint',
              'Train on a single machine — distributed training is too fragile',
              'Use smaller batch sizes to reduce GPU load',
              'Train multiple identical runs and pick the best',
            ],
            correctAnswer: 'Checkpoint every N steps to durable storage — on failure, resume from the latest checkpoint',
            explanation: 'Large-scale training will encounter hardware failures. Checkpoint every 100-1000 steps to cloud storage (GCS/S3). On failure, reload the latest checkpoint and resume. Without checkpointing, a failure on day 20 wastes 20 days of compute.',
          },
        },
        {
          id: 'r7q2boss',
          title: 'BOSS: The Distributed Architect',
          isBoss: true,
          lesson: {
            text: 'Distributed training configuration is a critical engineering decision. Wrong choices lead to OOM errors, slow throughput, or unstable training.',
          },
          challenge: {
            type: 'design',
            prompt: 'You want to fine-tune a 70B parameter model on 8× A100 80GB GPUs. Full Adam training needs ~1.12TB. What strategy fits in 640GB?',
            options: [
              'ZeRO-3 + gradient checkpointing + bf16 — distributes everything across 8 GPUs, saves activation memory',
              'Data parallelism only — each GPU holds a full model copy',
              'Train with SGD instead of Adam — 4× memory savings',
              'Reduce the model to 7B — 10× fewer parameters',
            ],
            correctAnswer: 'ZeRO-3 + gradient checkpointing + bf16 — distributes everything across 8 GPUs, saves activation memory',
            explanation: 'ZeRO-3 reduces ~1.12TB to ~140GB (8× reduction, each GPU holds 1/8). Gradient checkpointing trades compute for activation memory. bf16 halves parameter memory vs fp32. Combined: fits in 8× 80GB = 640GB.',
          },
        },
      ],
    },
    {
      id: 'r7q3',
      title: 'Model Optimization',
      description: 'Making models smaller and faster without sacrificing quality.',
      prerequisiteQuestIds: ['r7q2'],
      chapters: [
        {
          id: 'r7q3c1',
          title: 'Pruning',
          lesson: {
            text: 'Pruning removes weights below a threshold, creating sparse models. Unstructured pruning zeroes individual weights — high compression but requires sparse matrix libraries for speedup. Structured pruning removes entire neurons, attention heads, or layers — directly reduces computation on standard hardware. Lottery Ticket Hypothesis: sparse subnetworks trained from initialization match dense model performance.',
            formula: 'Magnitude pruning: set w = 0 if |w| < threshold\nSparsity: fraction of zero weights',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why does unstructured pruning often fail to speed up inference on standard hardware?',
            options: [
              'Hardware processes dense matrices efficiently — sparse operations with irregular patterns have overhead that offsets theoretical savings',
              'Unstructured pruning always reduces accuracy too much',
              'Sparse matrices require more memory than dense ones',
              'Standard hardware cannot represent zero values',
            ],
            correctAnswer: 'Hardware processes dense matrices efficiently — sparse operations with irregular patterns have overhead that offsets theoretical savings',
            explanation: 'GPUs are designed for dense matrix multiplication (GEMM). A weight matrix with 50% zeros has the same memory footprint and compute as dense unless you use specialized sparse kernels. Structured pruning (remove whole heads/neurons) reduces matrix sizes directly.',
          },
        },
        {
          id: 'r7q3c2',
          title: 'Quantization',
          lesson: {
            text: 'Quantization reduces numerical precision — fp32 (4 bytes) → int8 (1 byte) → int4 (0.5 bytes). Post-training quantization (PTQ) is applied after training with a small calibration set. Quantization-aware training (QAT) simulates quantization during training for better accuracy. GPTQ and AWQ enable 4-bit LLM quantization with minimal quality loss.',
            formula: 'INT8 quantization: w_q = round(w / scale) + zero_point\nDequantize: w ≈ (w_q − zero_point) × scale',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A 7B model in fp16 takes ~14GB. After INT4 quantization it takes approximately:',
            options: ['~3.5GB', '~7GB', '~1GB', '~14GB'],
            correctAnswer: '~3.5GB',
            explanation: 'fp16 = 2 bytes/param. INT4 = 0.5 bytes/param. 7B × 0.5 = 3.5GB. 4× compression. Combined with INT4\'s KV cache compression, LLMs like LLaMA-7B can run on consumer hardware (8GB VRAM).',
          },
        },
        {
          id: 'r7q3c3',
          title: 'Knowledge Distillation',
          lesson: {
            text: 'Knowledge distillation trains a small student model to mimic a large teacher model. The student is trained on soft probabilities (logits) from the teacher — these contain richer information than hard labels (e.g., "this is 70% cat, 25% dog" tells you more than "cat"). Temperature T > 1 softens the teacher\'s distribution.',
            formula: 'Distillation loss = α·CE(y, σ(zₛ/T)) + (1−α)·KL(σ(zₜ/T)‖σ(zₛ/T))\nT > 1: softer distribution, more information',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain why training a student on soft labels from a teacher is more informative than training on hard labels.',
            keywords: ['soft', 'label', 'probability', 'temperature', 'information', 'similarity', 'dark knowledge', 'teacher'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r7q3c4',
          title: 'Neural Architecture Search (NAS)',
          lesson: {
            text: 'NAS automates architecture design by searching over a space of possible architectures. Approaches: (1) Reinforcement learning (NASNet) — controller RNN proposes architectures, RL trains on validation accuracy reward; (2) Differentiable NAS (DARTS) — continuous relaxation of architecture choices, optimized by gradient descent; (3) Evolutionary search.',
            formula: 'DARTS: architecture param α selects operations via softmax mixture\no^{mixed} = Σ_o exp(α_o)/Σ_{o\'} exp(α_{o\'}) · o(x)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'DARTS (Differentiable Architecture Search) makes NAS tractable by:',
            options: [
              'Relaxing discrete architecture choices to continuous weights — enables gradient-based optimization',
              'Reducing the search space to 10 candidate architectures',
              'Using reinforcement learning to explore faster',
              'Training only on a small proxy dataset',
            ],
            correctAnswer: 'Relaxing discrete architecture choices to continuous weights — enables gradient-based optimization',
            explanation: 'Discrete search (which operation to use?) requires combinatorial optimization. DARTS creates a super-network where all operations run in parallel, weighted by softmax(α). α is optimized by gradient descent — 1000× faster than RL-based NAS.',
          },
        },
        {
          id: 'r7q3c5',
          title: 'Hardware-Aware Optimization',
          lesson: {
            text: 'Not all operations are equal on hardware. Depthwise separable convolutions are cheaper but may not map well to GPU tensor cores. Flash Attention reorders operations to fit in SRAM. TensorRT fuses operations and uses INT8 for inference. The Roofline model helps identify whether a workload is compute-bound or memory-bandwidth-bound.',
            formula: 'Arithmetic intensity = FLOPs / bytes transferred\nIf intensity < ridge point: bandwidth-limited\nIf intensity > ridge point: compute-limited',
          },
          challenge: {
            type: 'design',
            prompt: 'A transformer model has slow inference due to attention layers processing long sequences. What hardware-aware optimization should you apply?',
            options: [
              'FlashAttention — reorders attention computation to use GPU SRAM tiles, avoiding slow HBM reads for the NxN attention matrix',
              'Increase batch size — better GPU utilization',
              'Use FP32 instead of BF16 — more accurate attention',
              'Reduce the number of attention heads',
            ],
            correctAnswer: 'FlashAttention — reorders attention computation to use GPU SRAM tiles, avoiding slow HBM reads for the NxN attention matrix',
            explanation: 'Standard attention materializes the N×N attention matrix in HBM (slow memory). For N=8K, this is 8K×8K×2bytes = 128MB per layer per forward pass. FlashAttention tiles this computation in SRAM (fast, 20MB) — 2-4× faster with same output.',
          },
        },
        {
          id: 'r7q3boss',
          title: 'BOSS: The Model Compressor',
          isBoss: true,
          lesson: {
            text: 'Model compression is often the difference between a research prototype and a shipped product. This boss tests your ability to choose the right compression technique.',
          },
          challenge: {
            type: 'design',
            prompt: 'You need to deploy a 7B LLM on a smartphone (8GB RAM, no GPU). The original model is 14GB in fp16. What compression approach gets you there?',
            options: [
              'GPTQ 4-bit quantization → ~3.5GB + llama.cpp for CPU inference',
              'Prune 50% of weights — reduces to 7GB fp16',
              'Distill to a 1B model — train from scratch',
              'Knowledge distillation to fp8 — 7GB',
            ],
            correctAnswer: 'GPTQ 4-bit quantization → ~3.5GB + llama.cpp for CPU inference',
            explanation: 'GPTQ quantizes weights to 4-bit with minimal quality loss: 14GB → 3.5GB. llama.cpp optimizes INT4 inference for CPU/Apple Silicon. Pruning 50% to 7GB still doesn\'t fit and requires sparse kernels. Distillation takes weeks of training.',
          },
        },
      ],
    },
    {
      id: 'r7q4',
      title: 'Deployment & Serving',
      description: 'Getting models to users reliably, efficiently, and at scale.',
      prerequisiteQuestIds: ['r7q3'],
      chapters: [
        {
          id: 'r7q4c1',
          title: 'Inference Engines — ONNX, TensorRT',
          lesson: {
            text: 'Inference engines optimize models for deployment. ONNX (Open Neural Network Exchange) provides a hardware-agnostic format — convert from PyTorch/TF, deploy anywhere. TensorRT (NVIDIA) compiles ONNX models with layer fusion, kernel auto-tuning, and INT8 calibration for maximum GPU throughput. vLLM uses PagedAttention for efficient LLM serving.',
            formula: 'TensorRT pipeline: ONNX model → graph optimization → kernel selection → engine file\nTypical speedup: 2-5× vs. vanilla PyTorch',
          },
          challenge: {
            type: 'quiz',
            prompt: 'TensorRT achieves speedup over vanilla PyTorch primarily through:',
            options: [
              'Layer fusion (combining ops like conv+BN+ReLU into one kernel), kernel auto-tuning, and quantization',
              'Running on more GPU cores',
              'Using a different numerical algorithm',
              'Caching all inference results',
            ],
            correctAnswer: 'Layer fusion (combining ops like conv+BN+ReLU into one kernel), kernel auto-tuning, and quantization',
            explanation: 'PyTorch launches each operation separately (kernel launch overhead). TensorRT fuses them: Conv+BN+ReLU → one fused kernel, reducing memory round-trips. It also benchmarks multiple kernel implementations per hardware and picks the fastest.',
          },
        },
        {
          id: 'r7q4c2',
          title: 'Latency, Throughput, and Batching',
          lesson: {
            text: 'Latency = time per request (ms). Throughput = requests per second. They often trade off: batching increases GPU utilization and throughput but increases latency for individual requests. Dynamic batching groups incoming requests within a time window. LLM serving adds KV cache management — vLLM\'s PagedAttention eliminates KV cache fragmentation.',
            formula: 'Throughput = batch_size / latency_batch\nLatency_batch ≈ batch_size × latency_single (GPU memory-bound)\nContinuous batching: serve different requests at different positions',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Continuous batching for LLMs differs from static batching because:',
            options: [
              'New requests join the batch mid-generation — no waiting for all requests to finish before starting new ones',
              'It always uses batch size 1',
              'It processes the entire sequence before returning any tokens',
              'It requires knowing all requests in advance',
            ],
            correctAnswer: 'New requests join the batch mid-generation — no waiting for all requests to finish before starting new ones',
            explanation: 'Static batching: wait until a full batch, run together, return all. Long sequences block short ones. Continuous batching (used in vLLM): as soon as a slot frees (sequence finishes), insert a new request. GPU stays busy, tail latency improves.',
          },
        },
        {
          id: 'r7q4c3',
          title: 'Model Serving Architectures',
          lesson: {
            text: 'Model serving systems include: (1) Online serving — low latency, synchronous, single request. (2) Batch scoring — async, high throughput, scheduled jobs. (3) Streaming — real-time token generation (SSE/WebSocket for LLMs). A/B serving routes a fraction of traffic to a new model. Feature stores decouple feature computation from model serving.',
            formula: 'SLO: P99 latency < 200ms, throughput > 100 RPS\nInfrastructure: model server + load balancer + feature store + monitoring',
          },
          challenge: {
            type: 'design',
            prompt: 'You have a recommendation model that must score 10M users every night. What serving strategy is best?',
            options: [
              'Batch scoring — run the model offline overnight on all users, store results for real-time lookup',
              'Online serving — score each user on every page load',
              'Streaming inference — push recommendations as users browse',
              'Cache all possible user states in RAM',
            ],
            correctAnswer: 'Batch scoring — run the model offline overnight on all users, store results for real-time lookup',
            explanation: 'Scoring 10M users online per page load is expensive and latency-risky. Offline batch scoring: run once nightly, store top-K recommendations per user in a low-latency store (Redis). Page load = KV lookup (sub-ms), not model inference.',
          },
        },
        {
          id: 'r7q4c4',
          title: 'Edge Deployment',
          lesson: {
            text: 'Edge deployment runs models on device — smartphones, embedded systems, IoT — without network round-trips. Key constraints: limited RAM, battery, and compute. Tools: TensorFlow Lite, CoreML (Apple), ONNX Runtime Mobile. INT4/INT8 quantization and MobileNet-style architectures are designed for edge. On-device inference protects user data privacy.',
            formula: 'Edge constraints: RAM < 4GB, compute < 10 TOPS, battery < 5W\nMobileNet: depthwise separable conv → 8-9× fewer FLOPs vs. standard conv',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The primary advantage of on-device (edge) AI inference over cloud inference is:',
            options: [
              'Privacy (data stays on device) and offline capability (works without internet)',
              'Higher accuracy due to specialized hardware',
              'Lower development cost',
              'Easier model updates',
            ],
            correctAnswer: 'Privacy (data stays on device) and offline capability (works without internet)',
            explanation: 'On-device: sensitive data (face, voice, health) never leaves the device. Works offline. Low latency (no network RTT). Tradeoff: smaller models required due to compute/memory constraints. Cloud inference: larger models, requires connectivity, privacy risk.',
          },
        },
        {
          id: 'r7q4c5',
          title: 'A/B Testing and Shadow Deployment',
          lesson: {
            text: 'A/B testing routes X% of traffic to a new model and measures outcomes. Statistical significance testing (t-test, Mann-Whitney) determines if the difference is real. Shadow deployment sends production traffic to a new model without serving its outputs — validates performance without user impact. Canary release gradually rolls out to increasing traffic fractions.',
            formula: 'A/B: split traffic → measure metric → t-test for significance\nShadow: production traffic → new model (logged, not served)',
          },
          challenge: {
            type: 'design',
            prompt: 'You want to test a new recommendation model that might increase revenue but could also crash. What deployment strategy minimizes risk?',
            options: [
              'Shadow deployment first (no user impact) → canary 1% → 5% → 100% if metrics are good',
              'Immediately roll out to 100% — more data = faster learning',
              'A/B test at 50/50 split from day one',
              'Deploy to internal users only, no external testing',
            ],
            correctAnswer: 'Shadow deployment first (no user impact) → canary 1% → 100% if metrics are good',
            explanation: 'Shadow deployment validates the model catches no crashes or unexpected behavior before any user sees it. Canary (1%) limits blast radius of any issues. Gradual rollout allows metric monitoring before full exposure. This is the industry-standard safe rollout.',
          },
        },
        {
          id: 'r7q4boss',
          title: 'BOSS: The Serving Architect',
          isBoss: true,
          lesson: {
            text: 'Production ML serving requires balancing latency, cost, and reliability. This boss tests end-to-end serving design.',
          },
          challenge: {
            type: 'design',
            prompt: 'Design a serving system for an LLM API with 10,000 RPS at P99 < 2s. The model is 70B parameters.',
            options: [
              'vLLM with continuous batching + INT8 quantization + horizontal scaling (multiple GPU nodes) + load balancer',
              'Single A100 with vanilla PyTorch serving',
              'Distill to 7B, serve on CPU',
              'Pre-compute all possible responses and cache them',
            ],
            correctAnswer: 'vLLM with continuous batching + INT8 quantization + horizontal scaling (multiple GPU nodes) + load balancer',
            explanation: 'A 70B model generates ~1000 tokens/second per H100. At 10K RPS × 500 avg output tokens = 5M tokens/second needed → ~5000 H100 GPUs. vLLM maximizes GPU utilization. INT8 doubles throughput. Horizontal scaling with load balancing is the only path to 10K RPS.',
          },
        },
      ],
    },
    {
      id: 'r7q5',
      title: 'Monitoring & Maintenance',
      description: 'Keeping ML systems healthy in production — detecting drift, degradation, and failures.',
      prerequisiteQuestIds: ['r7q4'],
      chapters: [
        {
          id: 'r7q5c1',
          title: 'Data Drift and Concept Drift Detection',
          lesson: {
            text: 'Data drift: P(x) changes — feature distributions shift. Concept drift: P(y|x) changes — the relationship between features and labels changes. Detection methods: Kolmogorov-Smirnov test, Population Stability Index (PSI), MMD (Maximum Mean Discrepancy). Concept drift is more dangerous: the model silently makes wrong predictions.',
            formula: 'PSI = Σ (P_new − P_ref) · ln(P_new/P_ref)\nPSI < 0.1: stable; 0.1-0.25: moderate drift; > 0.25: significant drift',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Concept drift is more dangerous than covariate drift because:',
            options: [
              'The model\'s predictions become wrong even for inputs it "understands" — silently degrading without feature distribution changes',
              'Concept drift is harder to detect with standard monitoring',
              'Covariate drift never affects model accuracy',
              'Concept drift changes the model\'s architecture',
            ],
            correctAnswer: 'The model\'s predictions become wrong even for inputs it "understands" — silently degrading without feature distribution changes',
            explanation: 'Covariate drift means the model sees unusual inputs — you can detect this by monitoring feature distributions. Concept drift means P(y|x) changes (e.g., spam patterns evolve) — the model is confidently wrong on inputs that look normal.',
          },
        },
        {
          id: 'r7q5c2',
          title: 'Model Performance Monitoring',
          lesson: {
            text: 'Performance monitoring tracks prediction quality over time. If ground truth is delayed (e.g., loan default known 1 year later), proxy metrics are used: prediction distribution, confidence scores, business KPIs. Slice monitoring tracks performance across data subgroups — models may degrade for specific demographics before aggregate metrics move.',
            formula: 'Slice monitoring: track metrics per subgroup\nProxy metrics: output distribution, confidence calibration\nAlert: threshold on rolling metric window',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why is slice-level monitoring important even when aggregate model metrics look healthy?',
            options: [
              'A model can perform well on average but severely degrade for a specific subgroup — slice monitoring detects this',
              'Aggregate metrics are inaccurate for large datasets',
              'Slice monitoring is faster to compute',
              'It is required by privacy regulations',
            ],
            correctAnswer: 'A model can perform well on average but severely degrade for a specific subgroup — slice monitoring detects this',
            explanation: 'A credit model might degrade for a specific age group or geography while overall accuracy stays stable. Without slice monitoring, this goes undetected — disproportionately harming affected groups.',
          },
        },
        {
          id: 'r7q5c3',
          title: 'Logging, Alerting, and Observability',
          lesson: {
            text: 'ML observability = metrics + logs + traces for the full inference pipeline. Log: inputs, predictions, latencies, feature values, model version. Alert on: P99 latency spikes, null prediction rates, drift metrics exceeding thresholds. Distributed tracing follows a request from API gateway through feature retrieval to model inference.',
            formula: 'Three pillars: metrics (what) + logs (when/what) + traces (how/where)\nAlert conditions: drift PSI > 0.25, latency P99 > 500ms, error rate > 0.1%',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why should ML systems log the model\'s input features in addition to predictions?',
            options: [
              'To enable post-hoc drift analysis — compare logged feature distributions to training distribution',
              'Feature logging is required by all ML platforms',
              'Inputs are needed to compute throughput metrics',
              'Feature logs allow the model to improve automatically',
            ],
            correctAnswer: 'To enable post-hoc drift analysis — compare logged feature distributions to training distribution',
            explanation: 'Logged features enable: (1) drift detection by comparing to training stats; (2) debugging by reproducing predictions; (3) training new model versions using production data. Without feature logs, anomalous predictions are impossible to diagnose.',
          },
        },
        {
          id: 'r7q5c4',
          title: 'Retraining Pipelines',
          lesson: {
            text: 'Retraining keeps models current as data distribution evolves. Strategies: (1) Scheduled retraining (daily/weekly); (2) Triggered retraining (when drift metrics exceed threshold); (3) Online learning (continuous parameter updates from a stream). The retraining pipeline must include data validation, training, evaluation, and staged rollout before replacing production.',
            formula: 'Trigger: drift > threshold OR accuracy < SLO\nPipeline: data prep → train → eval → shadow test → canary → rollout',
          },
          challenge: {
            type: 'design',
            prompt: 'A fraud detection model is degrading due to new fraud patterns. What is the best retraining strategy?',
            options: [
              'Trigger-based retraining when concept drift is detected + human review of new fraud patterns to generate labeled data',
              'Retrain from scratch monthly on all historical data',
              'Never retrain — models should be robust to distribution shift',
              'Retrain daily regardless of drift metrics',
            ],
            correctAnswer: 'Trigger-based retraining when concept drift is detected + human review of new fraud patterns to generate labeled data',
            explanation: 'New fraud patterns = concept drift. Scheduled retraining may be too slow (patterns evolve weekly). Drift-triggered retraining is responsive. Human review of flagged transactions provides labeled data on new patterns that aren\'t in historical data.',
          },
        },
        {
          id: 'r7q5c5',
          title: 'ML Platform Design',
          lesson: {
            text: 'A mature ML platform provides: (1) Feature store (consistent features, no skew); (2) Experiment tracking; (3) Model registry (versioning, staging, production); (4) Serving infrastructure; (5) Monitoring. Examples: Uber\'s Michelangelo, Airbnb\'s Bighead. The platform reduces time-from-idea-to-production from months to days.',
            formula: 'MLOps maturity levels:\n0: manual, ad-hoc\n1: automated training pipeline\n2: CI/CD for ML, automated retraining',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain what a feature store is, the problem it solves, and why it is central to a mature ML platform.',
            keywords: ['training', 'serving', 'skew', 'consistency', 'reuse', 'feature', 'store', 'pipeline'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r7q5boss',
          title: 'BOSS: The MLOps Architect',
          isBoss: true,
          lesson: {
            text: 'A complete MLOps system is more than model training — it\'s the full pipeline that keeps ML systems reliable, reproducible, and continuously improving.',
          },
          challenge: {
            type: 'design',
            prompt: 'Design a production ML platform for a 50-person ML team shipping 20+ models to production. What are the three most critical components?',
            options: [
              'Feature store + model registry + automated monitoring/retraining pipeline — these address the top failure modes in production ML',
              'Jupyter notebooks + manual deployment + email alerts',
              'A single cloud ML platform (SageMaker) for everything',
              'Dedicated GPU cluster + manual experiment logs + weekly model audits',
            ],
            correctAnswer: 'Feature store + model registry + automated monitoring/retraining pipeline — these address the top failure modes in production ML',
            explanation: 'Feature store prevents training/serving skew (biggest silent failure). Model registry provides versioning + staged rollout. Automated monitoring + retraining handles drift. These three address the top three causes of production ML failures at scale.',
          },
        },
      ],
    },
  ],
};
