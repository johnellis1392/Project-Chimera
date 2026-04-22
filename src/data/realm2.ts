import type { Realm } from '../types';

export const realm2: Realm = {
  id: 'r2',
  title: 'Classical Machine Learning',
  subtitle: 'The age of handcrafted intelligence',
  icon: '🌲',
  description: 'Master the algorithms that defined ML before deep learning — linear models, kernels, trees, and probabilistic models.',
  prerequisiteRealmIds: ['r1'],
  quests: [
    {
      id: 'r2q1',
      title: 'The Learning Framework',
      description: 'The taxonomy of learning problems and how we measure success.',
      chapters: [
        {
          id: 'r2q1c1',
          title: 'Supervised, Unsupervised & Self-Supervised',
          lesson: {
            text: 'Supervised learning maps inputs to labeled outputs. Unsupervised learning finds structure in unlabeled data (clustering, compression). Self-supervised learning generates labels from the data itself — e.g., predicting masked tokens or next words. Most modern LLM pretraining is self-supervised.',
            formula: 'Supervised: learn f: X → Y from {(xᵢ, yᵢ)}\nUnsupervised: find structure in {xᵢ}\nSelf-supervised: create labels from data itself',
          },
          challenge: {
            type: 'quiz',
            prompt: 'BERT is pretrained by predicting masked words. What learning paradigm is this?',
            options: ['Self-supervised', 'Supervised', 'Unsupervised', 'Reinforcement learning'],
            correctAnswer: 'Self-supervised',
            explanation: 'BERT masks 15% of tokens and predicts them. The labels come from the data itself — no human annotation needed. This is self-supervised learning.',
          },
        },
        {
          id: 'r2q1c2',
          title: 'The Bias-Variance Tradeoff',
          lesson: {
            text: 'A model\'s generalization error decomposes into: Bias² (error from wrong assumptions), Variance (error from sensitivity to training data), and irreducible noise. Simple models have high bias, low variance (underfitting). Complex models have low bias, high variance (overfitting). The goal is the sweet spot.',
            formula: 'E[(ŷ − y)²] = Bias(ŷ)² + Var(ŷ) + σ²_noise',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain the bias-variance tradeoff to a new guild member. Use a concrete example.',
            keywords: ['bias', 'variance', 'overfit', 'underfit', 'complex', 'simple', 'training', 'generalization'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r2q1c3',
          title: 'Generalization, Overfitting, Underfitting',
          lesson: {
            text: 'Overfitting occurs when a model learns the training data\'s noise rather than the underlying signal, performing poorly on new data. Underfitting occurs when the model is too simple to capture the true pattern. Regularization, more data, and architectural constraints reduce overfitting.',
            formula: 'Overfit: train loss ↓↓, test loss ↑ (high gap)\nUnderfit: train loss ↑, test loss ↑ (both high)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A degree-20 polynomial fits 10 training points perfectly but has high test error. This is:',
            options: ['Overfitting', 'Underfitting', 'Good generalization', 'High bias'],
            correctAnswer: 'Overfitting',
            explanation: 'The model has memorized the training points (zero train error) but fails to generalize. 20 degrees for 10 points is massively over-parameterized.',
          },
        },
        {
          id: 'r2q1c4',
          title: 'Cross-Validation and Model Selection',
          lesson: {
            text: 'k-fold cross-validation splits data into k parts; each fold is used as validation once while the rest train. This gives a less noisy estimate of generalization than a single train/val split. Hyperparameters should be tuned on validation, then the model finally evaluated on a held-out test set.',
            formula: 'CV error = (1/k) Σᵢ L(model trained on all except fold i, evaluated on fold i)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why is it wrong to choose hyperparameters based on the test set performance?',
            options: [
              'You leak test information into model selection, giving an optimistic error estimate',
              'Test sets are too small for reliable evaluation',
              'Hyperparameters cannot change test set performance',
              'It makes training slower',
            ],
            correctAnswer: 'You leak test information into model selection, giving an optimistic error estimate',
            explanation: 'If you peek at the test set to choose hyperparameters, the test set is no longer a fair proxy for unseen data — you\'ve effectively trained on it implicitly.',
          },
        },
        {
          id: 'r2q1c5',
          title: 'Evaluation Metrics',
          lesson: {
            text: 'Accuracy is misleading for imbalanced classes (99% "not-fraud" is trivial). Precision = TP/(TP+FP) measures how trustworthy positive predictions are. Recall = TP/(TP+FN) measures how many true positives were found. F1 = 2·P·R/(P+R) balances them. AUC-ROC evaluates ranking quality across thresholds.',
            formula: 'Precision = TP/(TP+FP)\nRecall = TP/(TP+FN)\nF1 = 2PR/(P+R)',
          },
          challenge: {
            type: 'design',
            prompt: 'You build a cancer screening model. Which metric should you prioritize?',
            options: [
              'Recall — missing a cancer (false negative) is far worse than a false alarm',
              'Precision — false alarms waste doctor time',
              'Accuracy — overall correctness matters most',
              'F1 — always balance precision and recall equally',
            ],
            correctAnswer: 'Recall — missing a cancer (false negative) is far worse than a false alarm',
            explanation: 'In high-stakes medical screening, false negatives (missed cancers) are catastrophic. High recall ensures we catch most true cases, accepting some false alarms that can be ruled out later.',
          },
        },
        {
          id: 'r2q1boss',
          title: 'BOSS: The Metric Arbiter',
          isBoss: true,
          lesson: {
            text: 'Choosing the right metric IS model selection. An ML system that optimizes the wrong metric can harm users even if it "performs well." This boss tests your ability to match evaluation criteria to real-world goals.',
          },
          challenge: {
            type: 'design',
            prompt: 'A recommendation system serves 1M users. 99.9% of content is irrelevant to any given user. Which metric best evaluates quality?',
            options: [
              'Precision@K — of the top-K shown items, how many are relevant',
              'Accuracy — overall correct predictions',
              'Recall — fraction of all relevant items surfaced',
              'MSE — mean squared error of predicted ratings',
            ],
            correctAnswer: 'Precision@K — of the top-K shown items, how many are relevant',
            explanation: 'Users see only the top K items. Accuracy is useless with 99.9% negatives. Recall is impractical (there are millions of relevant items). Precision@K directly measures whether the shown items are useful.',
          },
        },
      ],
    },
    {
      id: 'r2q2',
      title: 'Linear Models',
      description: 'The simplest and most interpretable ML models — still powerful in practice.',
      prerequisiteQuestIds: ['r2q1'],
      chapters: [
        {
          id: 'r2q2c1',
          title: 'Linear Regression and Least Squares',
          lesson: {
            text: 'Linear regression models y = wᵀx + b. Ordinary Least Squares (OLS) minimizes the sum of squared residuals. The closed-form solution is ŵ = (XᵀX)⁻¹Xᵀy. Geometrically, this is the projection of y onto the column space of X.',
            formula: 'ŵ = (XᵀX)⁻¹Xᵀy  (Normal Equations)',
          },
          challenge: {
            type: 'derivation',
            prompt: 'Derive the OLS solution by setting the gradient of the MSE loss to zero.',
            steps: [
              {
                prompt: 'Step 1 — MSE loss: L(w) = ‖Xw − y‖². What is ∇_w L?',
                options: ['2Xᵀ(Xw − y)', '2X(Xw − y)', 'Xᵀy', '2(Xw − y)'],
                correctAnswer: '2Xᵀ(Xw − y)',
              },
              {
                prompt: 'Step 2 — Setting ∇_w L = 0: 2Xᵀ(Xw − y) = 0 ⟹ XᵀXw = ?',
                options: ['Xᵀy', 'Xy', 'XᵀX', '2y'],
                correctAnswer: 'Xᵀy',
              },
              {
                prompt: 'Step 3 — Assuming XᵀX is invertible, the solution is w = ?',
                options: ['(XᵀX)⁻¹Xᵀy', 'X⁻¹y', 'XᵀXy', '(Xᵀy)⁻¹'],
                correctAnswer: '(XᵀX)⁻¹Xᵀy',
              },
            ],
          },
        },
        {
          id: 'r2q2c2',
          title: 'Logistic Regression and Decision Boundaries',
          lesson: {
            text: 'Logistic regression applies the sigmoid function σ(z) = 1/(1+e^{−z}) to wᵀx + b to produce a probability P(y=1|x). The decision boundary is the hyperplane wᵀx + b = 0. Training maximizes log-likelihood (equivalently minimizes binary cross-entropy).',
            formula: 'P(y=1|x) = σ(wᵀx + b) = 1/(1 + e^{−(wᵀx+b)})',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement the sigmoid function: σ(z) = 1 / (1 + exp(−z)).',
            template: 'function sigmoid(z) {\n  return // your code here\n}',
            validationRegex: '1\\s*/\\s*\\(\\s*1\\s*\\+\\s*Math\\.exp\\s*\\(\\s*-\\s*z\\s*\\)\\s*\\)',
          },
        },
        {
          id: 'r2q2c3',
          title: 'Regularization — Ridge, Lasso, Elastic Net',
          lesson: {
            text: 'L2 (Ridge) regularization adds λ‖w‖² to the loss, shrinking all weights toward zero but rarely to exactly zero. L1 (Lasso) adds λ‖w‖₁, producing sparse solutions (many exact zeros) — useful for feature selection. Elastic Net combines both. The hyperparameter λ controls regularization strength.',
            formula: 'Ridge: L(w) + λ‖w‖²\nLasso: L(w) + λ‖w‖₁\nElastic Net: L(w) + λ₁‖w‖₁ + λ₂‖w‖²',
          },
          challenge: {
            type: 'quiz',
            prompt: 'You have 1000 features but suspect only 10 are truly relevant. Which regularizer is most appropriate?',
            options: ['L1 (Lasso) — drives irrelevant weights to exactly zero', 'L2 (Ridge) — shrinks all weights equally', 'No regularization — trust the data', 'Elastic Net — always the safest choice'],
            correctAnswer: 'L1 (Lasso) — drives irrelevant weights to exactly zero',
            explanation: 'Lasso\'s L1 penalty creates a sparse solution — the 990 irrelevant features get exactly zero weight, performing automatic feature selection.',
          },
        },
        {
          id: 'r2q2c4',
          title: 'Generalized Linear Models',
          lesson: {
            text: 'Generalized Linear Models (GLMs) extend linear regression to non-Gaussian outputs via a link function. Linear regression uses identity link; logistic regression uses logit link; Poisson regression uses log link for count data. All belong to the exponential family and share a common MLE framework.',
            formula: 'GLM: g(E[Y|x]) = wᵀx\ng is the link function (identity, logit, log, ...)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'You want to model the number of customer support tickets per day (integer counts, non-negative). Which GLM is most appropriate?',
            options: ['Poisson regression', 'Linear regression', 'Logistic regression', 'Ordinal regression'],
            correctAnswer: 'Poisson regression',
            explanation: 'Count data is naturally modeled with a Poisson distribution. Poisson regression uses a log link to ensure non-negative predictions.',
          },
        },
        {
          id: 'r2q2c5',
          title: 'The Perceptron',
          lesson: {
            text: 'The perceptron is the simplest neural classifier: output = sign(wᵀx + b). The perceptron learning rule updates weights only on misclassified points: w ← w + y·x. The perceptron convergence theorem guarantees convergence for linearly separable data. It fails on XOR — motivating multi-layer networks.',
            formula: 'Update: if yᵢ(wᵀxᵢ) ≤ 0: w ← w + yᵢxᵢ',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement one perceptron update step. Given weight vector w (array), input x (array), true label y (+1 or -1): if misclassified, update and return new w; otherwise return w unchanged.',
            template: 'function perceptronUpdate(w, x, y) {\n  const score = w.reduce((s, wi, i) => s + wi * x[i], 0);\n  if (y * score <= 0) {\n    return w.map((wi, i) => // update rule\n    );\n  }\n  return w;\n}',
            validationRegex: 'wi\\s*\\+\\s*y\\s*\\*\\s*x\\[i\\]|wi\\s*\\+\\s*x\\[i\\]\\s*\\*\\s*y',
          },
        },
        {
          id: 'r2q2boss',
          title: 'BOSS: The Decision Boundary',
          isBoss: true,
          lesson: {
            text: 'Linear classifiers are everywhere in ML pipelines — from logistic regression heads on neural networks to final-layer classifiers. This boss integrates sigmoid, prediction, and decision threshold.',
            formula: 'ŷ = 1 if σ(wᵀx) ≥ 0.5, else 0',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement a full logistic regression prediction: given weight vector w and input x (arrays), compute σ(w·x) and return 1 if ≥ 0.5, else 0.',
            template: 'function logisticPredict(w, x) {\n  const z = w.reduce((s, wi, i) => s + wi * x[i], 0);\n  const prob = // sigmoid of z\n  return // threshold at 0.5\n}',
            validationRegex: '1\\s*/\\s*\\(\\s*1\\s*\\+\\s*Math\\.exp\\s*\\(\\s*-\\s*z\\s*\\)\\s*\\)',
          },
        },
      ],
    },
    {
      id: 'r2q3',
      title: 'Kernel Machines',
      description: 'Support vector machines and the kernel trick — learning in infinite-dimensional spaces.',
      prerequisiteQuestIds: ['r2q2'],
      chapters: [
        {
          id: 'r2q3c1',
          title: 'The Kernel Trick',
          lesson: {
            text: 'The kernel trick allows us to implicitly compute inner products in a high-dimensional feature space φ(x) without ever computing φ(x) explicitly. If an algorithm uses only inner products, we replace ⟨φ(x), φ(z)⟩ with a kernel K(x, z). This gives infinite-dimensional feature maps with O(n²) cost.',
            formula: 'K(x, z) = ⟨φ(x), φ(z)⟩\nRBF kernel: K(x,z) = exp(−‖x−z‖²/(2σ²))',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain to a guild member: what problem does the kernel trick solve, and how does it work?',
            keywords: ['feature', 'space', 'inner product', 'implicit', 'high-dimensional', 'kernel', 'compute', 'transform'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r2q3c2',
          title: 'Support Vector Machines (Hard Margin)',
          lesson: {
            text: 'The hard-margin SVM finds the maximum-margin hyperplane that separates two classes. Support vectors are the training points closest to the boundary — the margin equals 2/‖w‖. Maximizing the margin (1/2‖w‖²) is the primal; the dual reveals the kernel trick connection.',
            formula: 'Primal: min (1/2)‖w‖² s.t. yᵢ(wᵀxᵢ+b) ≥ 1\nMargin = 2/‖w‖',
          },
          challenge: {
            type: 'quiz',
            prompt: 'In a hard-margin SVM, what happens if the data is not linearly separable?',
            options: [
              'The optimization is infeasible — no solution exists',
              'SVM automatically increases the margin',
              'SVM ignores outliers',
              'SVM finds the best linear approximation',
            ],
            correctAnswer: 'The optimization is infeasible — no solution exists',
            explanation: 'Hard-margin SVM requires all points to be correctly classified with margin ≥ 1. If classes overlap, no such hyperplane exists. This motivates the soft-margin variant.',
          },
        },
        {
          id: 'r2q3c3',
          title: 'Soft-Margin SVMs and Slack Variables',
          lesson: {
            text: 'Soft-margin SVMs introduce slack variables ξᵢ ≥ 0 that allow misclassifications at a cost C·Σξᵢ. The hyperparameter C trades off margin width vs. classification error. Large C = small margin, few errors (overfit); small C = wide margin, more errors (underfit).',
            formula: 'min (1/2)‖w‖² + C Σᵢ ξᵢ\ns.t. yᵢ(wᵀxᵢ+b) ≥ 1 − ξᵢ, ξᵢ ≥ 0',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Increasing the C parameter in a soft-margin SVM tends to:',
            options: [
              'Reduce the margin and decrease training error (risk of overfitting)',
              'Increase the margin and increase training error',
              'Have no effect on the decision boundary',
              'Remove all support vectors',
            ],
            correctAnswer: 'Reduce the margin and decrease training error (risk of overfitting)',
            explanation: 'Higher C penalizes misclassifications more heavily, forcing tighter margins. The model becomes more willing to use a narrow margin to correctly classify training points.',
          },
        },
        {
          id: 'r2q3c4',
          title: 'Kernel Design — RBF, Polynomial, String Kernels',
          lesson: {
            text: 'A valid kernel K must correspond to an inner product in some feature space — equivalently, its Gram matrix must be positive semi-definite. Common kernels: polynomial K(x,z)=(xᵀz+c)^d captures interactions; RBF (Gaussian) K(x,z)=exp(−γ‖x−z‖²) gives infinite-dimensional features; string kernels work on sequences.',
            formula: 'Polynomial: K(x,z) = (xᵀz + c)^d\nRBF: K(x,z) = exp(−γ‖x−z‖²)\nMercer\'s theorem: K valid ↔ Gram matrix PSD',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The RBF kernel with a very small bandwidth γ (nearly flat kernel) produces a decision boundary that is:',
            options: [
              'Very wiggly — fits individual points, high variance',
              'Very smooth — nearly linear',
              'Identical to linear SVM',
              'Undefined',
            ],
            correctAnswer: 'Very wiggly — fits individual points, high variance',
            explanation: 'Large γ means the kernel falls off quickly with distance, so each support vector influences only a tiny region. This overfits. Small γ gives smooth, wide influence zones.',
          },
        },
        {
          id: 'r2q3c5',
          title: 'Gaussian Processes',
          lesson: {
            text: 'A Gaussian Process (GP) is a distribution over functions. Any finite collection of function values is jointly Gaussian, defined by a mean function m(x) and covariance (kernel) function K(x, x\'). GPs provide principled uncertainty estimates — useful in Bayesian optimization and small-data settings.',
            formula: 'f(x) ~ GP(m(x), K(x,x\'))\nPosterior: f|X,y ~ GP(μ*, K*)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'GPs are particularly well-suited for which scenario?',
            options: [
              'Small data with the need for uncertainty estimates',
              'Large datasets with millions of samples',
              'Image classification tasks',
              'Real-time inference at low latency',
            ],
            correctAnswer: 'Small data with the need for uncertainty estimates',
            explanation: 'GP inference scales as O(n³) — expensive for large n. But on small datasets, the full Bayesian posterior gives reliable uncertainty, valuable in scientific experiments and Bayesian optimization.',
          },
        },
        {
          id: 'r2q3boss',
          title: 'BOSS: The Kernel Architect',
          isBoss: true,
          lesson: {
            text: 'Kernel selection is a design decision that encodes prior knowledge about the data. This boss tests whether you can reason about which kernel fits which structure.',
          },
          challenge: {
            type: 'design',
            prompt: 'You are building an SVM to classify protein sequences (variable-length strings of amino acids). Which kernel is most natural?',
            options: [
              'String kernel — counts shared subsequences, captures sequence similarity',
              'RBF kernel — works on raw amino acid vectors',
              'Linear kernel — fastest option',
              'Polynomial kernel — captures feature interactions',
            ],
            correctAnswer: 'String kernel — counts shared subsequences, captures sequence similarity',
            explanation: 'Proteins are sequences. A string kernel directly measures biological similarity via shared substrings — no fixed-length vectorization needed. RBF and polynomial require vectors.',
          },
        },
      ],
    },
    {
      id: 'r2q4',
      title: 'Probabilistic Models',
      description: 'Bayesian classifiers, hidden structures, and the EM algorithm.',
      prerequisiteQuestIds: ['r2q1'],
      chapters: [
        {
          id: 'r2q4c1',
          title: 'Naive Bayes',
          lesson: {
            text: 'Naive Bayes classifies by computing P(y|x) ∝ P(y) Π P(xᵢ|y), assuming features are conditionally independent given the class. Despite the "naive" assumption being almost always wrong, it works surprisingly well for text classification. Training is fast: just compute class priors and feature likelihoods from counts.',
            formula: 'P(y|x₁,...,xₙ) ∝ P(y) · Π P(xᵢ|y)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Naive Bayes assumes features are conditionally independent given the class label. In practice for text classification, this assumption is:',
            options: [
              'Almost certainly violated, but the model still works well empirically',
              'Exactly correct for bag-of-words representations',
              'Required for the model to be valid',
              'Irrelevant to the final predictions',
            ],
            correctAnswer: 'Almost certainly violated, but the model still works well empirically',
            explanation: 'Words in text are highly correlated ("machine" and "learning" co-occur). Yet Naive Bayes gives competitive results because the decision boundary is often good even when probabilities are miscalibrated.',
          },
        },
        {
          id: 'r2q4c2',
          title: 'Hidden Markov Models',
          lesson: {
            text: 'A Hidden Markov Model (HMM) has hidden states that evolve via Markov transitions and emit observable outputs. Three key algorithms: Forward-Backward computes state posteriors; Viterbi finds the most likely hidden state sequence; Baum-Welch (EM) learns parameters. HMMs power speech recognition and genomics.',
            formula: 'P(x₁,...,xₙ) = Σ_{z₁,...,zₙ} P(z₁) Π P(zₜ|zₜ₋₁)·P(xₜ|zₜ)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The Viterbi algorithm finds the:',
            options: [
              'Most probable sequence of hidden states given observations',
              'Marginal probability of each hidden state',
              'Parameters that maximize data likelihood',
              'Number of hidden states needed',
            ],
            correctAnswer: 'Most probable sequence of hidden states given observations',
            explanation: 'Viterbi uses dynamic programming to find argmax_z P(z|x) — the single most likely path through the hidden states. Forward-Backward instead computes per-timestep marginals.',
          },
        },
        {
          id: 'r2q4c3',
          title: 'Expectation-Maximization',
          lesson: {
            text: 'EM is a two-step iterative algorithm for MLE with latent variables. E-step: compute expected values of latent variables given current parameters. M-step: maximize expected log-likelihood to update parameters. EM is guaranteed to increase the likelihood at each iteration and converges to a local maximum.',
            formula: 'E-step: Q(θ|θ_old) = E_{z|x,θ_old}[log P(x,z|θ)]\nM-step: θ_new = argmax_θ Q(θ|θ_old)',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain the intuition behind the EM algorithm using a real-world analogy.',
            keywords: ['latent', 'hidden', 'expectation', 'maximize', 'iterate', 'converge', 'parameters', 'likelihood'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r2q4c4',
          title: 'Mixture Models and Clustering',
          lesson: {
            text: 'A Gaussian Mixture Model (GMM) assumes data comes from K Gaussian distributions. Each point has a latent cluster assignment z. EM alternates between soft-assigning points to clusters (E-step) and updating cluster means/covariances (M-step). GMMs generalize k-means (which uses hard assignments).',
            formula: 'P(x) = Σₖ πₖ · N(x; μₖ, Σₖ)\nπₖ = mixing weights, Σₖ πₖ = 1',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Compared to k-means, GMMs offer which additional capability?',
            options: [
              'Soft cluster assignments — each point has a probability of belonging to each cluster',
              'Faster convergence',
              'Always finding the global optimum',
              'Working with categorical data',
            ],
            correctAnswer: 'Soft cluster assignments — each point has a probability of belonging to each cluster',
            explanation: 'K-means gives each point a hard cluster label. GMMs output P(cluster k | point x) — a full probability distribution. This captures uncertainty and models overlapping clusters.',
          },
        },
        {
          id: 'r2q4c5',
          title: 'Bayesian Networks and Graphical Models',
          lesson: {
            text: 'A Bayesian Network encodes conditional independence relationships as a DAG: P(x₁,...,xₙ) = Π P(xᵢ | parents(xᵢ)). This factorization makes inference tractable for sparse graphs. Belief propagation passes messages along edges to compute marginals efficiently.',
            formula: 'Joint: P(X₁,...,Xₙ) = Πᵢ P(Xᵢ | Pa(Xᵢ))',
          },
          challenge: {
            type: 'quiz',
            prompt: 'In a Bayesian network, if A → B → C (chain), and B is observed, what is the relationship between A and C?',
            options: [
              'A and C become conditionally independent given B',
              'A and C become more correlated',
              'A causes C directly',
              'C causes A through B',
            ],
            correctAnswer: 'A and C become conditionally independent given B',
            explanation: 'Observing B "blocks" the path between A and C in a chain. Knowing B makes A irrelevant for predicting C — this is d-separation.',
          },
        },
        {
          id: 'r2q4boss',
          title: 'BOSS: The Probability Architect',
          isBoss: true,
          lesson: {
            text: 'Probabilistic models give not just predictions but uncertainty. This boss tests your ability to select and reason about the right model for a structured problem.',
          },
          challenge: {
            type: 'design',
            prompt: 'You want to label part-of-speech tags for words in a sentence. The correct label of each word depends on its neighbors. Which model is most appropriate?',
            options: [
              'Hidden Markov Model — models sequential dependencies between states',
              'Naive Bayes — independent feature assumption matches words',
              'Gaussian Mixture Model — clusters words into types',
              'Bayesian linear regression — predicts continuous labels',
            ],
            correctAnswer: 'Hidden Markov Model — models sequential dependencies between states',
            explanation: 'POS tagging is a sequential labeling problem. HMMs model the Markov dependency between adjacent labels and the emission probability P(word | tag) — a natural fit.',
          },
        },
      ],
    },
    {
      id: 'r2q5',
      title: 'Trees & Ensembles',
      description: 'Decision trees, random forests, and gradient boosting — the kings of tabular ML.',
      prerequisiteQuestIds: ['r2q1'],
      chapters: [
        {
          id: 'r2q5c1',
          title: 'Decision Trees and Splitting Criteria',
          lesson: {
            text: 'A decision tree recursively partitions the feature space using axis-aligned splits. At each node we choose the split that maximizes information gain (reduces impurity most). Gini impurity: G = 1 − Σ pₖ². Entropy: H = −Σ pₖ log pₖ. Deeper trees fit training data better but overfit more.',
            formula: 'Information Gain = H(parent) − Σ (|child|/|parent|)·H(child)\nGini = 1 − Σₖ p²ₖ',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A node with all samples belonging to the same class has Gini impurity of:',
            options: ['0', '0.5', '1', '0.25'],
            correctAnswer: '0',
            explanation: 'If all samples belong to class k, pₖ = 1 and all other pⱼ = 0. Gini = 1 − 1² = 0. Perfect purity means zero impurity.',
          },
        },
        {
          id: 'r2q5c2',
          title: 'Bagging and Random Forests',
          lesson: {
            text: 'Bagging (Bootstrap Aggregating) trains many models on bootstrap samples of the data and averages their predictions. Random forests add feature randomization: each split considers only √p of p features. This decorrelates the trees, reducing variance dramatically. Out-of-bag samples estimate generalization without a separate validation set.',
            formula: 'Bagging: ŷ = (1/B) Σ fᵦ(x)\nRandom Forest: each split uses random subset of features',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Random forests add feature randomization to bagging. What is the primary benefit?',
            options: [
              'Decorrelates trees so averaging reduces variance more',
              'Makes each individual tree more accurate',
              'Reduces training time',
              'Eliminates the need for hyperparameter tuning',
            ],
            correctAnswer: 'Decorrelates trees so averaging reduces variance more',
            explanation: 'Without feature randomization, all trees make similar splits on strong features — they\'re correlated. Averaging correlated predictors gives little variance reduction. Feature randomization breaks this correlation.',
          },
        },
        {
          id: 'r2q5c3',
          title: 'Boosting — AdaBoost',
          lesson: {
            text: 'Boosting trains weak learners sequentially, with each iteration focusing on the errors of the previous. AdaBoost up-weights misclassified samples at each round. The final model is a weighted vote of weak classifiers. The ensemble error decreases exponentially with the number of rounds.',
            formula: 'F(x) = sign(Σₜ αₜ hₜ(x))\nαₜ = (1/2) log((1−εₜ)/εₜ)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'In AdaBoost, a weak learner with error εₜ > 0.5 would receive:',
            options: [
              'Negative weight αₜ — its predictions should be flipped',
              'Zero weight — it is ignored',
              'A large positive weight — high error means high diversity',
              'Equal weight to all other learners',
            ],
            correctAnswer: 'Negative weight αₜ — its predictions should be flipped',
            explanation: 'αₜ = 0.5 · log((1−εₜ)/εₜ). If εₜ > 0.5, log term is negative. A classifier worse than random (ε > 0.5) is more useful if its predictions are inverted.',
          },
        },
        {
          id: 'r2q5c4',
          title: 'Gradient Boosting — GBM, XGBoost, LightGBM',
          lesson: {
            text: 'Gradient boosting views boosting as gradient descent in function space. Each new tree fits the negative gradient of the loss (pseudo-residuals). XGBoost adds second-order Taylor expansion for faster convergence and regularization. LightGBM uses histogram-based splits and leaf-wise growth for speed on large data.',
            formula: 'Fₘ(x) = Fₘ₋₁(x) + η · hₘ(x)\nhₘ fits negative gradient: −∂L/∂Fₘ₋₁(xᵢ)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'In gradient boosting for regression with MSE loss, the pseudo-residuals (negative gradient) are:',
            options: [
              'yᵢ − Fₘ₋₁(xᵢ) — the actual residuals',
              '|yᵢ − Fₘ₋₁(xᵢ)|',
              '(yᵢ − Fₘ₋₁(xᵢ))²',
              'log(yᵢ) − Fₘ₋₁(xᵢ)',
            ],
            correctAnswer: 'yᵢ − Fₘ₋₁(xᵢ) — the actual residuals',
            explanation: 'The gradient of MSE = (y−F)² is −2(y−F). Dividing by the constant 2, the pseudo-residuals equal the ordinary residuals yᵢ − Fₘ₋₁(xᵢ).',
          },
        },
        {
          id: 'r2q5c5',
          title: 'Stacking and Model Ensembles',
          lesson: {
            text: 'Stacking (stacked generalization) trains a meta-learner on the out-of-fold predictions of base models. Unlike bagging (same model, different data) and boosting (sequential), stacking combines diverse model types. A simple average of diverse models often outperforms any individual model.',
            formula: 'Level-0: train {fᵢ(x)} base learners\nLevel-1: train g(f₁(x),...,fₖ(x)) → y',
          },
          challenge: {
            type: 'design',
            prompt: 'You want to build the best possible Kaggle submission for a tabular dataset. Which ensemble strategy should you use?',
            options: [
              'Stack diverse models (XGBoost, random forest, neural net) with a simple meta-learner',
              'Use 100 identical XGBoost models with different random seeds',
              'Train a single deep neural network — ensembles are unnecessary',
              'Bagging of identical logistic regressions',
            ],
            correctAnswer: 'Stack diverse models (XGBoost, random forest, neural net) with a simple meta-learner',
            explanation: 'Stacking diverse models captures different aspects of the data. Each model makes different errors; combining them reduces variance further than homogeneous ensembles.',
          },
        },
        {
          id: 'r2q5boss',
          title: 'BOSS: The Ensemble Architect',
          isBoss: true,
          lesson: {
            text: 'Tree-based ensembles dominate structured tabular data in industry. This boss tests deep understanding of when and why ensembles work.',
          },
          challenge: {
            type: 'design',
            prompt: 'Your dataset has 100K rows, 200 features, many of which are correlated. Inference must be under 10ms. Which model is best?',
            options: [
              'LightGBM — fast training, fast inference, handles correlated features via tree splitting',
              'Random Forest with 1000 trees — high accuracy but slow inference',
              'Stacked ensemble of 5 models — highest accuracy but too slow',
              'Logistic regression — fastest inference',
            ],
            correctAnswer: 'LightGBM — fast training, fast inference, handles correlated features via tree splitting',
            explanation: 'LightGBM is specifically designed for large tabular datasets with correlated features. Histogram-based training is fast, and inference is a tree traversal — typically sub-millisecond per sample.',
          },
        },
      ],
    },
    {
      id: 'r2q6',
      title: 'Unsupervised Learning',
      description: 'Finding structure, patterns, and representations in unlabeled data.',
      prerequisiteQuestIds: ['r2q1'],
      chapters: [
        {
          id: 'r2q6c1',
          title: 'K-Means and Variants',
          lesson: {
            text: 'K-means alternates between assigning each point to its nearest centroid and recomputing centroids as cluster means. It minimizes within-cluster sum of squared distances. K-means++ initializes centroids far apart, reducing sensitivity to initialization. The number K must be chosen via the elbow method or silhouette score.',
            formula: 'Objective: min Σₖ Σ_{x∈Cₖ} ‖x − μₖ‖²',
          },
          challenge: {
            type: 'code',
            prompt: 'Given a list of 1D points and a list of centroids, return the index of the nearest centroid for each point.',
            template: 'function assignClusters(points, centroids) {\n  return points.map(p => {\n    let minDist = Infinity, bestK = 0;\n    centroids.forEach((c, k) => {\n      const dist = // squared distance between p and c\n      if (dist < minDist) { minDist = dist; bestK = k; }\n    });\n    return bestK;\n  });\n}',
            validationRegex: '\\(p\\s*-\\s*c\\)\\s*\\*\\s*\\(p\\s*-\\s*c\\)|Math\\.pow\\s*\\(\\s*p\\s*-\\s*c',
          },
        },
        {
          id: 'r2q6c2',
          title: 'Hierarchical Clustering',
          lesson: {
            text: 'Hierarchical clustering builds a tree (dendrogram) of clusters without specifying K in advance. Agglomerative (bottom-up) starts with each point as its own cluster and merges the closest pair. The choice of linkage (single, complete, average, Ward) determines "closeness" between clusters.',
            formula: 'Single linkage: d(A,B) = min_{a∈A,b∈B} d(a,b)\nComplete linkage: d(A,B) = max_{a∈A,b∈B} d(a,b)\nWard: minimize within-cluster variance increase',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Ward linkage tends to produce clusters that are:',
            options: [
              'Compact and roughly equal in size',
              'Long chains (elongated shapes)',
              'Only two very large clusters',
              'The same as k-means clusters',
            ],
            correctAnswer: 'Compact and roughly equal in size',
            explanation: 'Ward minimizes the total within-cluster variance increase when merging. This naturally favors small, compact clusters of similar size — unlike single linkage which chains points.',
          },
        },
        {
          id: 'r2q6c3',
          title: 'DBSCAN and Density-Based Methods',
          lesson: {
            text: 'DBSCAN (Density-Based Spatial Clustering) finds clusters as dense regions separated by sparse regions. A core point has ≥ minPts neighbors within distance ε. It can find arbitrary-shaped clusters and naturally labels noise points (no cluster). Unlike k-means, K is not specified.',
            formula: 'Core point: |N(p, ε)| ≥ minPts\nCluster: maximal set of density-connected core points',
          },
          challenge: {
            type: 'quiz',
            prompt: 'DBSCAN has a clear advantage over k-means when the data contains:',
            options: [
              'Clusters of irregular shapes and noise/outliers',
              'Exactly K spherical clusters of equal size',
              'Very high-dimensional data (d > 100)',
              'Only continuous numeric features',
            ],
            correctAnswer: 'Clusters of irregular shapes and noise/outliers',
            explanation: 'K-means assumes spherical clusters. DBSCAN finds arbitrarily shaped dense regions and marks isolated points as noise — k-means assigns every point to a cluster.',
          },
        },
        {
          id: 'r2q6c4',
          title: 'PCA and Dimensionality Reduction',
          lesson: {
            text: 'PCA finds the directions (principal components) of maximum variance in the data. The first principal component is the direction that captures the most variance; subsequent PCs are orthogonal and capture the next most. PCA is the truncated SVD of the mean-centered data matrix.',
            formula: 'PCA via SVD: X = UΣVᵀ\nPrincipal components: columns of V\nProjection: Z = XV_k (keep top-k)',
          },
          challenge: {
            type: 'derivation',
            prompt: 'Show that PCA maximizes variance.',
            steps: [
              {
                prompt: 'Step 1 — We project x onto unit vector w: z = wᵀx. The variance of z across n points is Var(z) = wᵀ(?) w, where (?) is the:',
                options: ['Sample covariance matrix C = (1/n)XᵀX', 'Identity matrix', 'Mean of X', 'Diagonal of X'],
                correctAnswer: 'Sample covariance matrix C = (1/n)XᵀX',
              },
              {
                prompt: 'Step 2 — We want to maximize wᵀCw subject to ‖w‖ = 1. Using Lagrange multipliers, the solution satisfies:',
                options: ['Cw = λw (w is an eigenvector of C)', 'Cw = 0', 'w = Cy', 'w = C⁻¹y'],
                correctAnswer: 'Cw = λw (w is an eigenvector of C)',
              },
              {
                prompt: 'Step 3 — Substituting Cw = λw, we get Var(z) = wᵀCw = wᵀ(λw) = λ‖w‖² = λ. So to maximize variance, pick w as:',
                options: ['The eigenvector of C with the largest eigenvalue', 'Any eigenvector', 'The eigenvector with smallest eigenvalue', 'A random unit vector'],
                correctAnswer: 'The eigenvector of C with the largest eigenvalue',
              },
            ],
          },
        },
        {
          id: 'r2q6c5',
          title: 't-SNE and UMAP',
          lesson: {
            text: 't-SNE converts high-dimensional pairwise distances to probabilities and minimizes the KL divergence between these probabilities and a t-distribution in 2D. It excels at revealing cluster structure visually but is non-parametric (can\'t embed new points) and slow. UMAP is faster, preserves global structure better, and supports out-of-sample projection.',
            formula: 't-SNE: minimize KL(P ‖ Q) where Q uses t-distribution\nUMAP: topological approach, faster and more globally faithful',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain to a colleague why they should NOT use t-SNE embeddings to make quantitative claims about cluster distances.',
            keywords: ['distort', 'global', 'non-linear', 'perplexity', 'distances', 'misleading', 'visualization', 'topology'],
            keywordThreshold: 3,
          },
        },
        {
          id: 'r2q6boss',
          title: 'BOSS: The Structure Seeker',
          isBoss: true,
          lesson: {
            text: 'Unsupervised learning is the art of finding signal without labels. The boss tests your ability to choose the right algorithm for real data characteristics.',
          },
          challenge: {
            type: 'design',
            prompt: 'You have customer purchase data with outlier transactions (fraud) mixed in. You need to detect anomalies and find natural customer segments. Which approach?',
            options: [
              'DBSCAN — finds dense customer segments and marks outliers as noise',
              'K-means with K=2 (normal vs. fraud)',
              'PCA for dimensionality reduction, then k-means',
              'Hierarchical clustering with complete linkage',
            ],
            correctAnswer: 'DBSCAN — finds dense customer segments and marks outliers as noise',
            explanation: 'DBSCAN naturally handles both goals: dense regions become customer segments, and isolated fraud transactions are labeled as noise points. K=2 assumes equal-sized clusters which won\'t match fraud (rare).',
          },
        },
      ],
    },
  ],
};
