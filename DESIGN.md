# Project Chimera — Design Document

## Overview

**Project Chimera** is an RPG-style learning game that gamifies the study of AI/ML concepts. The world is structured as a hierarchical map that guides learners from foundational mathematics all the way through cutting-edge alignment research. Progress feels like exploration and conquest, not curriculum completion.

---

## World Structure

The game is organized into three layers of depth:

| Layer | RPG Term | Description |
|---|---|---|
| 1 | **Realm** | A top-level domain of AI/ML knowledge (8 total) |
| 2 | **Quest** | A coherent topic cluster within a Realm (38 total) |
| 3 | **Chapter** | An atomic, discrete learning unit (~190 total) |

This 3-layer architecture was chosen deliberately. More than 3 levels risks making the map feel overwhelming and hard to navigate. Each Chapter is small enough to gamify into a concrete task — a quiz, coding challenge, flashcard set, concept battle, etc.

---

## Design Principles

### Prerequisite Graph (Not a Linear Path)
The Realms are not meant to be completed in strict sequence. They form a **directed acyclic graph (DAG)** of dependencies. For example:
- Realm III (Deep Learning) depends heavily on Realm I (Foundations)
- Realm V (Generative Models & LLMs) depends on Realm III
- Realm VIII (Safety, Ethics & Alignment) threads through all other Realms

The game map should reflect this — players unlock Quests and Realms by satisfying prerequisite Chapters, not just by finishing the previous Realm in order.

### Chapter Types
Not every Chapter should use the same learning mode. Variety is what makes it feel like an RPG rather than a course. Suggested Chapter types:
- **Derivation Puzzles** — work through a proof or mathematical result
- **Code Challenges** — implement a concept from scratch
- **Concept Battles** — explain a concept to an in-game "guild member" (Feynman technique)
- **Flashcard Duels** — rapid-fire terminology and definitions
- **Design Quests** — make architectural decisions for a given problem

### Boss Encounters
Each Quest (and optionally each Realm) culminates in a **Boss Encounter** — an integrative challenge requiring synthesis of everything covered in that cluster. Bosses are great for retention, dramatic pacing, and signaling real mastery.

---

## The World Map

---

### 🏛️ REALM I: Foundations
*The bedrock upon which all AI is built*

**Quest 1: The Language of Uncertainty**
- Ch 1: Sets, events, and probability spaces
- Ch 2: Conditional probability & Bayes' theorem
- Ch 3: Random variables and distributions
- Ch 4: Expectation, variance, and moments
- Ch 5: Joint, marginal, and conditional distributions
- Ch 6: The law of large numbers & central limit theorem

**Quest 2: The Calculus of Learning**
- Ch 1: Derivatives and the chain rule
- Ch 2: Partial derivatives and gradients
- Ch 3: The Jacobian and Hessian
- Ch 4: Optimization and critical points
- Ch 5: Constrained optimization & Lagrange multipliers

**Quest 3: The Geometry of Data**
- Ch 1: Vectors, norms, and inner products
- Ch 2: Matrices and linear transformations
- Ch 3: Eigenvalues, eigenvectors, and decomposition
- Ch 4: SVD and low-rank approximations
- Ch 5: Projections and orthogonality

**Quest 4: The Science of Inference**
- Ch 1: Estimators, bias, and variance
- Ch 2: Maximum likelihood estimation
- Ch 3: Hypothesis testing and p-values
- Ch 4: Confidence intervals and bootstrap
- Ch 5: Bayesian inference and priors

**Quest 5: The Art of Computation**
- Ch 1: Complexity — big-O and tractability
- Ch 2: Numerical precision and floating point
- Ch 3: Vectorization and hardware basics
- Ch 4: Information theory — entropy and KL divergence
- Ch 5: Graph theory fundamentals

---

### 🌲 REALM II: Classical Machine Learning
*The age of handcrafted intelligence*

**Quest 1: The Learning Framework**
- Ch 1: Supervised vs. unsupervised vs. self-supervised
- Ch 2: The bias-variance tradeoff
- Ch 3: Generalization, overfitting, and underfitting
- Ch 4: Cross-validation and model selection
- Ch 5: Evaluation metrics — classification and regression

**Quest 2: Linear Models**
- Ch 1: Linear regression and least squares
- Ch 2: Logistic regression and decision boundaries
- Ch 3: Regularization — Ridge, Lasso, Elastic Net
- Ch 4: Generalized linear models
- Ch 5: The perceptron

**Quest 3: Kernel Machines**
- Ch 1: The kernel trick
- Ch 2: Support vector machines (hard margin)
- Ch 3: Soft-margin SVMs and slack variables
- Ch 4: Kernel design — RBF, polynomial, string kernels
- Ch 5: Gaussian processes

**Quest 4: Probabilistic Models**
- Ch 1: Naive Bayes
- Ch 2: Hidden Markov models
- Ch 3: Expectation-maximization
- Ch 4: Mixture models and clustering
- Ch 5: Bayesian networks and graphical models

**Quest 5: Trees & Ensembles**
- Ch 1: Decision trees and splitting criteria
- Ch 2: Bagging and random forests
- Ch 3: Boosting — AdaBoost
- Ch 4: Gradient boosting — GBM, XGBoost, LightGBM
- Ch 5: Stacking and model ensembles

**Quest 6: Unsupervised Learning**
- Ch 1: K-means and variants
- Ch 2: Hierarchical clustering
- Ch 3: DBSCAN and density-based methods
- Ch 4: PCA and dimensionality reduction
- Ch 5: t-SNE and UMAP

---

### 🔥 REALM III: Deep Learning
*When machines learned to see in layers*

**Quest 1: The Neural Foundations**
- Ch 1: The artificial neuron
- Ch 2: Activation functions
- Ch 3: Forward pass and computational graphs
- Ch 4: Backpropagation
- Ch 5: Weight initialization strategies

**Quest 2: Training Dynamics**
- Ch 1: Gradient descent variants — SGD, momentum, Adam
- Ch 2: Learning rate schedules
- Ch 3: Batch normalization
- Ch 4: Dropout and regularization
- Ch 5: Loss landscapes and saddle points

**Quest 3: Convolutional Networks**
- Ch 1: The convolution operation
- Ch 2: Pooling and spatial hierarchies
- Ch 3: Classic architectures — AlexNet, VGG, ResNet
- Ch 4: Object detection — YOLO, R-CNN
- Ch 5: Semantic segmentation

**Quest 4: Sequential Models**
- Ch 1: Recurrent neural networks
- Ch 2: Vanishing gradients and LSTMs
- Ch 3: GRUs and sequence-to-sequence models
- Ch 4: Temporal convolutional networks
- Ch 5: CTC loss and speech applications

**Quest 5: The Transformer**
- Ch 1: Attention — queries, keys, and values
- Ch 2: Multi-head self-attention
- Ch 3: Positional encoding
- Ch 4: The encoder-decoder architecture
- Ch 5: Efficient attention variants — Flash, Linear, Sparse

**Quest 6: Geometric & Structured Data**
- Ch 1: Graph neural networks
- Ch 2: Message passing frameworks
- Ch 3: Point clouds and 3D learning
- Ch 4: Equivariant networks
- Ch 5: Neural fields and implicit representations

---

### 🎯 REALM IV: Reinforcement Learning
*Teaching machines to act in the world*

**Quest 1: The RL Framework**
- Ch 1: Agents, environments, and the Markov property
- Ch 2: Rewards, returns, and discounting
- Ch 3: Policies and value functions
- Ch 4: The Bellman equations
- Ch 5: Exploration vs. exploitation

**Quest 2: Tabular Methods**
- Ch 1: Dynamic programming
- Ch 2: Monte Carlo methods
- Ch 3: Temporal difference learning
- Ch 4: Q-learning and SARSA
- Ch 5: Multi-armed bandits

**Quest 3: Deep RL**
- Ch 1: Deep Q-networks (DQN)
- Ch 2: Policy gradient methods
- Ch 3: Actor-critic architectures
- Ch 4: Proximal policy optimization (PPO)
- Ch 5: Soft actor-critic (SAC)

**Quest 4: Advanced RL**
- Ch 1: Model-based RL
- Ch 2: Hierarchical RL
- Ch 3: Multi-agent RL
- Ch 4: Offline RL and imitation learning
- Ch 5: RL from human feedback (RLHF)

---

### ✨ REALM V: Generative Models & LLMs
*The age of synthesis*

**Quest 1: Generative Foundations**
- Ch 1: Generative vs. discriminative models
- Ch 2: Latent variable models
- Ch 3: Autoencoders
- Ch 4: Variational autoencoders (VAEs)
- Ch 5: Flow-based models

**Quest 2: Adversarial Generation**
- Ch 1: The GAN framework
- Ch 2: GAN training instability and mode collapse
- Ch 3: Progressive and conditional GANs
- Ch 4: StyleGAN and image synthesis
- Ch 5: Adversarial examples and robustness

**Quest 3: Diffusion Models**
- Ch 1: The forward diffusion process
- Ch 2: Denoising score matching
- Ch 3: DDPM and the reverse process
- Ch 4: Guidance — classifier and classifier-free
- Ch 5: Latent diffusion and Stable Diffusion

**Quest 4: Language Modeling**
- Ch 1: N-gram models and perplexity
- Ch 2: Word embeddings — Word2Vec, GloVe
- Ch 3: Contextual embeddings — ELMo, BERT
- Ch 4: Autoregressive language models — GPT
- Ch 5: Scaling laws and emergent behavior

**Quest 5: Large Language Models**
- Ch 1: Pretraining objectives and data curation
- Ch 2: Fine-tuning — full, instruction, and RLHF
- Ch 3: Parameter-efficient fine-tuning — LoRA, adapters
- Ch 4: Prompting — zero-shot, few-shot, chain-of-thought
- Ch 5: LLM evaluation and benchmarking

**Quest 6: Multimodal Models**
- Ch 1: Vision-language alignment — CLIP
- Ch 2: Image generation from text
- Ch 3: Audio and speech generation
- Ch 4: Video generation
- Ch 5: Unified multimodal architectures

---

### 🤖 REALM VI: Perception & Embodied AI
*When AI meets the physical world*

**Quest 1: Computer Vision Beyond Classification**
- Ch 1: Feature extraction and classical vision
- Ch 2: Optical flow and motion estimation
- Ch 3: Stereo vision and depth estimation
- Ch 4: 3D reconstruction and NeRF
- Ch 5: Vision transformers (ViT)

**Quest 2: Speech & Audio**
- Ch 1: Signal processing fundamentals
- Ch 2: Mel spectrograms and audio features
- Ch 3: Automatic speech recognition
- Ch 4: Text-to-speech synthesis
- Ch 5: Speaker diarization and audio separation

**Quest 3: Robotics & Control**
- Ch 1: Kinematics and dynamics
- Ch 2: Motion planning
- Ch 3: Simultaneous localization and mapping (SLAM)
- Ch 4: Learning from demonstration
- Ch 5: Sim-to-real transfer

**Quest 4: Autonomous Agents**
- Ch 1: Agent architectures and tool use
- Ch 2: Planning and reasoning loops
- Ch 3: Memory — short-term, long-term, episodic
- Ch 4: Multi-agent coordination
- Ch 5: World models

---

### ⚙️ REALM VII: AI Systems & MLOps
*The craft of putting AI into the world*

**Quest 1: Data Engineering**
- Ch 1: Data collection and sourcing
- Ch 2: Cleaning, labeling, and annotation
- Ch 3: Feature engineering
- Ch 4: Data versioning and lineage
- Ch 5: Handling imbalance, drift, and distribution shift

**Quest 2: Training Infrastructure**
- Ch 1: GPU/TPU architecture and memory
- Ch 2: Distributed training — data and model parallelism
- Ch 3: Mixed precision training
- Ch 4: Experiment tracking and reproducibility
- Ch 5: Large-scale training pipelines

**Quest 3: Model Optimization**
- Ch 1: Pruning
- Ch 2: Quantization
- Ch 3: Knowledge distillation
- Ch 4: Neural architecture search (NAS)
- Ch 5: Hardware-aware optimization

**Quest 4: Deployment & Serving**
- Ch 1: Inference engines — ONNX, TensorRT
- Ch 2: Latency, throughput, and batching
- Ch 3: Model serving architectures
- Ch 4: Edge deployment
- Ch 5: A/B testing and shadow deployment

**Quest 5: Monitoring & Maintenance**
- Ch 1: Data drift and concept drift detection
- Ch 2: Model performance monitoring
- Ch 3: Logging, alerting, and observability
- Ch 4: Retraining pipelines
- Ch 5: ML platform design

---

### 🛡️ REALM VIII: Safety, Ethics & Alignment
*Ensuring AI serves humanity*

**Quest 1: Interpretability**
- Ch 1: The black-box problem
- Ch 2: Feature attribution — SHAP, LIME
- Ch 3: Probing and activation analysis
- Ch 4: Mechanistic interpretability
- Ch 5: Concept-based explanations

**Quest 2: Robustness & Security**
- Ch 1: Adversarial attacks
- Ch 2: Certified defenses
- Ch 3: Distribution shift and out-of-distribution detection
- Ch 4: Poisoning and backdoor attacks
- Ch 5: Privacy — differential privacy and federated learning

**Quest 3: Fairness & Bias**
- Ch 1: Sources of bias in data and models
- Ch 2: Fairness definitions and impossibility theorems
- Ch 3: Debiasing techniques
- Ch 4: Auditing and evaluation for fairness
- Ch 5: Legal and regulatory frameworks

**Quest 4: AI Alignment**
- Ch 1: The alignment problem
- Ch 2: Reward hacking and specification gaming
- Ch 3: Scalable oversight
- Ch 4: Constitutional AI and value learning
- Ch 5: Existential risk and long-horizon safety

**Quest 5: Societal Impact**
- Ch 1: Labor market effects of automation
- Ch 2: AI and misinformation
- Ch 3: Surveillance, privacy, and civil liberties
- Ch 4: Environmental cost of AI
- Ch 5: Global governance and AI policy

---

## World Map Summary

| Realm | Quests | Chapters |
|---|---|---|
| I: Foundations | 5 | 26 |
| II: Classical ML | 6 | 30 |
| III: Deep Learning | 6 | 30 |
| IV: Reinforcement Learning | 4 | 20 |
| V: Generative Models & LLMs | 6 | 30 |
| VI: Perception & Embodied AI | 4 | 20 |
| VII: AI Systems & MLOps | 5 | 25 |
| VIII: Safety, Ethics & Alignment | 5 | 25 |
| **Total** | **41** | **206** |

---

## Open Questions for Development

- **Tech stack** — Frontend framework, database, auth provider TBD
- **Prerequisite graph** — Needs to be modeled explicitly in data (DAG structure); which Chapters are hard prerequisites vs. soft recommendations?
- **Chapter content format** — How is the actual learning content delivered? (External links, in-app content, AI-generated explanations, etc.)
- **Progression system** — XP, levels, skill trees, or something else?
- **Multiplayer / social features** — Guilds, leaderboards, co-op boss fights?
- **Assessment design** — How is Chapter completion verified? Auto-graded, peer-reviewed, or honor system?
