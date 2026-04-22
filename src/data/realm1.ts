import type { Realm } from '../types';

export const realm1: Realm = {
  id: 'r1',
  title: 'Foundations',
  subtitle: 'The bedrock upon which all AI is built',
  icon: '🏛️',
  description: 'Master probability, calculus, linear algebra, and statistics — the mathematical core every ML practitioner must internalize.',
  prerequisiteRealmIds: [],
  quests: [
    {
      id: 'r1q1',
      title: 'The Language of Uncertainty',
      description: 'Probability theory: the formal framework for reasoning under uncertainty.',
      chapters: [
        {
          id: 'r1q1c1',
          title: 'Sets, Events, and Probability Spaces',
          lesson: {
            text: 'A probability space is a triple (Ω, F, P): the sample space Ω lists every possible outcome, the event space F is a collection of subsets of Ω we care about, and the probability measure P assigns a number in [0, 1] to each event. The axioms require P(Ω) = 1, P(∅) = 0, and additivity for disjoint events.',
            formula: 'P(A ∪ B) = P(A) + P(B)  when  A ∩ B = ∅',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A fair six-sided die is rolled. Which of the following correctly describes the sample space Ω?',
            options: ['{1, 2, 3, 4, 5, 6}', '{even, odd}', '{head, tail}', '{1, 3, 5}'],
            correctAnswer: '{1, 2, 3, 4, 5, 6}',
            explanation: 'The sample space contains ALL possible outcomes. For a fair die every face {1,2,3,4,5,6} is a distinct outcome.',
          },
        },
        {
          id: 'r1q1c2',
          title: 'Conditional Probability & Bayes\' Theorem',
          lesson: {
            text: 'Conditional probability P(A|B) is the probability of A given that B occurred. Bayes\' theorem inverts this: it lets us update our belief about a hypothesis A after observing evidence B, combining a prior P(A) with a likelihood P(B|A).',
            formula: 'P(A|B) = P(B|A) · P(A) / P(B)',
          },
          challenge: {
            type: 'derivation',
            prompt: 'Walk through the derivation of Bayes\' theorem from the definition of conditional probability.',
            steps: [
              {
                prompt: 'Step 1 — The definition of conditional probability gives us P(A|B) = ?',
                options: ['P(A ∩ B) / P(B)', 'P(A) · P(B)', 'P(B|A) / P(A)', 'P(A) + P(B)'],
                correctAnswer: 'P(A ∩ B) / P(B)',
              },
              {
                prompt: 'Step 2 — Symmetrically, P(B|A) = P(A ∩ B) / P(A). Rearranging gives P(A ∩ B) = ?',
                options: ['P(B|A) · P(A)', 'P(A|B) · P(B)', 'P(A) + P(B)', 'P(B) / P(A|B)'],
                correctAnswer: 'P(B|A) · P(A)',
              },
              {
                prompt: 'Step 3 — Substituting back into Step 1, P(A|B) = ?',
                options: ['P(B|A) · P(A) / P(B)', 'P(A) · P(B|A)', 'P(B) / P(A)', 'P(A|B) · P(B)'],
                correctAnswer: 'P(B|A) · P(A) / P(B)',
              },
            ],
          },
        },
        {
          id: 'r1q1c3',
          title: 'Random Variables and Distributions',
          lesson: {
            text: 'A random variable X is a function mapping outcomes to numbers. Discrete RVs take countable values and are described by a probability mass function (PMF); continuous RVs are described by a probability density function (PDF). A CDF F(x) = P(X ≤ x) unifies both.',
            formula: 'Discrete: P(X=x) = p(x),  Σ p(x) = 1\nContinuous: P(a ≤ X ≤ b) = ∫[a,b] f(x) dx',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A Bernoulli random variable X models a single coin flip. If P(X=1) = p, what is P(X=0)?',
            options: ['1 - p', 'p', '0.5', '1 / p'],
            correctAnswer: '1 - p',
            explanation: 'A Bernoulli variable takes only two values. Since probabilities sum to 1: P(X=0) = 1 - P(X=1) = 1 - p.',
          },
        },
        {
          id: 'r1q1c4',
          title: 'Expectation, Variance, and Moments',
          lesson: {
            text: 'The expectation E[X] is the probability-weighted average of X — its "center of mass." Variance Var(X) = E[(X − μ)²] measures spread around the mean. The standard deviation σ = √Var(X) is in the same units as X and is easier to interpret.',
            formula: 'E[X] = Σ x · P(X=x)\nVar(X) = E[X²] − (E[X])²',
          },
          challenge: {
            type: 'quiz',
            prompt: 'For a fair die X, what is E[X]?',
            options: ['3.5', '3.0', '4.0', '2.5'],
            correctAnswer: '3.5',
            explanation: 'E[X] = (1+2+3+4+5+6)/6 = 21/6 = 3.5. Each outcome has probability 1/6.',
          },
        },
        {
          id: 'r1q1c5',
          title: 'Joint, Marginal, and Conditional Distributions',
          lesson: {
            text: 'When two random variables X and Y interact, their joint distribution P(X=x, Y=y) captures all co-occurrence information. Marginalizing sums out one variable to recover a single-variable distribution. Conditional distributions slice the joint at a fixed value of one variable.',
            formula: 'Marginal: P(X=x) = Σ_y P(X=x, Y=y)\nConditional: P(X=x | Y=y) = P(X=x, Y=y) / P(Y=y)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'X and Y are independent. What is P(X=x, Y=y)?',
            options: ['P(X=x) · P(Y=y)', 'P(X=x) + P(Y=y)', 'P(X=x) / P(Y=y)', 'P(X=x | Y=y)'],
            correctAnswer: 'P(X=x) · P(Y=y)',
            explanation: 'Independence means knowing Y tells us nothing about X, so the joint factors into the product of marginals.',
          },
        },
        {
          id: 'r1q1c6',
          title: 'Law of Large Numbers & Central Limit Theorem',
          lesson: {
            text: 'The Law of Large Numbers states that as we draw more samples, the sample mean converges to the true mean E[X]. The Central Limit Theorem (CLT) goes further: regardless of the original distribution, the distribution of the sample mean approaches a Gaussian as sample size grows.',
            formula: 'CLT: (X̄_n − μ) / (σ / √n)  →  N(0, 1)  as n → ∞',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'A guild member asks: "Why does the Central Limit Theorem matter so much in machine learning?" Explain it clearly.',
            keywords: ['mean', 'gaussian', 'normal', 'sample', 'distribution', 'converges', 'approximation'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r1q1boss',
          title: 'BOSS: The Oracle of Chance',
          isBoss: true,
          lesson: {
            text: 'You have mastered the foundations of probability theory. The Oracle now tests whether you can apply Bayes\' theorem under realistic conditions — the kind of reasoning that powers spam filters, medical diagnostics, and Bayesian ML models.',
            formula: 'P(H|E) = P(E|H) · P(H) / P(E)',
          },
          challenge: {
            type: 'design',
            prompt: 'A disease affects 1% of the population. A test is 90% accurate for positive cases (sensitivity) and 95% accurate for negative cases (specificity). A patient tests positive. Which reasoning step best approximates P(disease | positive test)?',
            options: [
              'Apply Bayes: P(D|+) = P(+|D)·P(D) / P(+), giving ≈15%',
              'The test is 90% accurate, so P(D|+) ≈ 90%',
              'The base rate is 1% so P(D|+) ≈ 1%',
              'Average sensitivity and specificity: (90+95)/2 ≈ 92.5%',
            ],
            correctAnswer: 'Apply Bayes: P(D|+) = P(+|D)·P(D) / P(+), giving ≈15%',
            explanation: 'P(+) = 0.9×0.01 + 0.05×0.99 = 0.009 + 0.0495 = 0.0585. P(D|+) = 0.009/0.0585 ≈ 15%. The low base rate dominates — this is the base-rate fallacy in action.',
          },
        },
      ],
    },
    {
      id: 'r1q2',
      title: 'The Calculus of Learning',
      description: 'Derivatives, gradients, and optimization — the engine of every learning algorithm.',
      prerequisiteQuestIds: ['r1q1'],
      chapters: [
        {
          id: 'r1q2c1',
          title: 'Derivatives and the Chain Rule',
          lesson: {
            text: 'A derivative f\'(x) measures the instantaneous rate of change of f at x. The chain rule handles compositions: if h(x) = f(g(x)), then h\'(x) = f\'(g(x)) · g\'(x). This is the mathematical heart of backpropagation — gradients flow backward through composed functions.',
            formula: 'd/dx f(g(x)) = f\'(g(x)) · g\'(x)',
          },
          challenge: {
            type: 'derivation',
            prompt: 'Derive the gradient of the loss L = (g(x) - y)² where g(x) = wx.',
            steps: [
              {
                prompt: 'Step 1 — Let u = g(x) - y = wx - y. What is dL/du?',
                options: ['2u', 'u²', '1', '2(wx - y)'],
                correctAnswer: '2u',
              },
              {
                prompt: 'Step 2 — What is du/dw (derivative of u = wx - y with respect to w)?',
                options: ['x', 'w', '1', 'y'],
                correctAnswer: 'x',
              },
              {
                prompt: 'Step 3 — By chain rule, dL/dw = (dL/du)·(du/dw) = ?',
                options: ['2(wx - y)·x', '2wx', '2y·x', '(wx - y)²'],
                correctAnswer: '2(wx - y)·x',
              },
            ],
          },
        },
        {
          id: 'r1q2c2',
          title: 'Partial Derivatives and Gradients',
          lesson: {
            text: 'A partial derivative ∂f/∂xᵢ measures how f changes as we move along the xᵢ axis while all other variables are held fixed. The gradient ∇f collects all partial derivatives into a vector pointing in the direction of steepest ascent in the input space.',
            formula: '∇f(x) = [∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ]ᵀ',
          },
          challenge: {
            type: 'quiz',
            prompt: 'For f(x, y) = x² + 3xy, what is ∂f/∂y?',
            options: ['3x', '2x + 3y', '3y', '2xy'],
            correctAnswer: '3x',
            explanation: 'Treating x as a constant, d/dy(x² + 3xy) = 0 + 3x = 3x.',
          },
        },
        {
          id: 'r1q2c3',
          title: 'The Jacobian and Hessian',
          lesson: {
            text: 'The Jacobian J is a matrix of all first-order partial derivatives of a vector-valued function — it generalizes the gradient. The Hessian H is a matrix of second-order partial derivatives of a scalar function. The eigenvalues of the Hessian tell us whether a critical point is a local minimum, maximum, or saddle point.',
            formula: 'J_{ij} = ∂fᵢ/∂xⱼ\nH_{ij} = ∂²f/∂xᵢ∂xⱼ',
          },
          challenge: {
            type: 'quiz',
            prompt: 'If the Hessian at a critical point has all positive eigenvalues, the point is a:',
            options: ['Local minimum', 'Local maximum', 'Saddle point', 'Global minimum (guaranteed)'],
            correctAnswer: 'Local minimum',
            explanation: 'All positive eigenvalues means the Hessian is positive definite, so the function curves upward in every direction — a local minimum.',
          },
        },
        {
          id: 'r1q2c4',
          title: 'Optimization and Critical Points',
          lesson: {
            text: 'A critical point is where ∇f = 0. For unconstrained optimization we want to find the global minimum. Gradient descent iteratively moves against the gradient: x ← x − η∇f(x). The learning rate η controls step size — too large and it diverges, too small and it converges slowly.',
            formula: 'x_{t+1} = x_t − η · ∇f(x_t)',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement one step of gradient descent. Given current parameter w, gradient dw, and learning rate lr, return the updated weight.',
            template: 'function gradientStep(w, dw, lr) {\n  return // your code here\n}',
            validationRegex: 'return\\s*w\\s*-\\s*lr\\s*\\*\\s*dw',
          },
        },
        {
          id: 'r1q2c5',
          title: 'Constrained Optimization & Lagrange Multipliers',
          lesson: {
            text: 'When minimizing f(x) subject to a constraint g(x) = 0, we introduce a Lagrange multiplier λ and solve the unconstrained problem L(x, λ) = f(x) − λ·g(x). At the optimum, ∇f and ∇g must be parallel — the gradient of the objective is a scalar multiple of the gradient of the constraint.',
            formula: '∇f(x*) = λ · ∇g(x*)  and  g(x*) = 0',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why does the Lagrangian L(x, λ) = f(x) − λ·g(x) encode the constraint?',
            options: [
              'Setting ∂L/∂λ = 0 gives g(x) = 0, enforcing the constraint',
              'The λ term penalizes large values of f',
              'The Lagrangian is always smaller than f',
              'It introduces a second variable to cancel noise',
            ],
            correctAnswer: 'Setting ∂L/∂λ = 0 gives g(x) = 0, enforcing the constraint',
            explanation: '∂L/∂λ = −g(x) = 0 ⟹ g(x) = 0. The Lagrange multiplier λ acts as the "price" of violating the constraint.',
          },
        },
        {
          id: 'r1q2boss',
          title: 'BOSS: Gradient Descent from Scratch',
          isBoss: true,
          lesson: {
            text: 'The gradient descent algorithm is the universal optimizer of machine learning. Your challenge: implement it end-to-end for a simple quadratic loss, applying everything you\'ve learned about derivatives, the chain rule, and update rules.',
            formula: 'L(w) = (w·x − y)²\n∂L/∂w = 2(wx − y)·x',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement the MSE loss gradient for scalar w: given arrays xs and ys (training data), return the average gradient dL/dw.',
            template: 'function mseGradient(w, xs, ys) {\n  let grad = 0;\n  for (let i = 0; i < xs.length; i++) {\n    // compute gradient for sample i and accumulate\n  }\n  return grad / xs.length;\n}',
            validationRegex: 'grad\\s*\\+?=.*w\\s*\\*\\s*xs\\[i\\]\\s*-\\s*ys\\[i\\]|grad\\s*\\+?=.*xs\\[i\\]\\s*\\*.*w\\s*\\*\\s*xs\\[i\\]\\s*-\\s*ys\\[i\\]',
          },
        },
      ],
    },
    {
      id: 'r1q3',
      title: 'The Geometry of Data',
      description: 'Linear algebra: the language of transformations, decompositions, and high-dimensional space.',
      prerequisiteQuestIds: ['r1q2'],
      chapters: [
        {
          id: 'r1q3c1',
          title: 'Vectors, Norms, and Inner Products',
          lesson: {
            text: 'A vector is a point in n-dimensional space. The L2 norm ‖v‖₂ = √(Σvᵢ²) measures Euclidean length. The inner product (dot product) v·w = Σvᵢwᵢ measures "overlap" between vectors — it is zero when vectors are orthogonal. The cosine similarity v·w / (‖v‖‖w‖) normalizes for magnitude.',
            formula: '‖v‖₂ = √(v₁² + v₂² + ... + vₙ²)\ncos θ = v·w / (‖v‖ · ‖w‖)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Two unit vectors have a dot product of 0. This means they are:',
            options: ['Orthogonal', 'Parallel', 'Identical', 'Anti-parallel'],
            correctAnswer: 'Orthogonal',
            explanation: 'A dot product of 0 means cos θ = 0, so θ = 90° — the vectors are perpendicular (orthogonal).',
          },
        },
        {
          id: 'r1q3c2',
          title: 'Matrices and Linear Transformations',
          lesson: {
            text: 'A matrix A ∈ ℝ^{m×n} represents a linear transformation from ℝⁿ to ℝᵐ. Matrix multiplication Ax stretches, rotates, and projects the input vector x. The rank of A is the dimension of its column space — the subspace it can "reach."',
            formula: '(AB)x = A(Bx)  — composition of transformations\nrank(A) = dim(col(A))',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement matrix-vector multiplication for a 2×2 matrix A (as nested array) and vector x (array of length 2). Return the result vector.',
            template: 'function matvec(A, x) {\n  return [\n    // row 0 dot x\n    // row 1 dot x\n  ];\n}',
            validationRegex: 'A\\[0\\]\\[0\\]\\s*\\*\\s*x\\[0\\].*A\\[0\\]\\[1\\]\\s*\\*\\s*x\\[1\\]',
          },
        },
        {
          id: 'r1q3c3',
          title: 'Eigenvalues, Eigenvectors, and Decomposition',
          lesson: {
            text: 'An eigenvector v of matrix A is a direction unchanged by A — it only gets scaled: Av = λv. The scalar λ is the corresponding eigenvalue. Eigendecomposition A = QΛQᵀ (for symmetric A) factorizes A into its natural coordinate system, revealing the principal axes of the transformation.',
            formula: 'Av = λv\nA = QΛQᵀ  (Q orthogonal, Λ diagonal with eigenvalues)',
          },
          challenge: {
            type: 'derivation',
            prompt: 'Show that if v is an eigenvector of A with eigenvalue λ, then A²v = λ²v.',
            steps: [
              {
                prompt: 'Step 1 — By definition Av = λv. What is A(Av)?',
                options: ['A(λv)', 'λ(Av)', 'λ²v', 'A²v'],
                correctAnswer: 'A(λv)',
              },
              {
                prompt: 'Step 2 — A(λv) = λ(Av) by linearity. Substituting Av = λv gives?',
                options: ['λ(λv) = λ²v', 'λv', 'Av', 'λ + v'],
                correctAnswer: 'λ(λv) = λ²v',
              },
              {
                prompt: 'Step 3 — Therefore A²v equals?',
                options: ['λ²v', 'λv', '2λv', 'Av'],
                correctAnswer: 'λ²v',
              },
            ],
          },
        },
        {
          id: 'r1q3c4',
          title: 'SVD and Low-Rank Approximations',
          lesson: {
            text: 'Singular Value Decomposition (SVD) factorizes any matrix A = UΣVᵀ, where U and V have orthonormal columns and Σ is diagonal with non-negative singular values. Keeping only the top-k singular values gives the best rank-k approximation to A in terms of Frobenius norm — the foundation of PCA and compression.',
            formula: 'A ≈ A_k = U_k Σ_k V_kᵀ  (best rank-k approx)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'In SVD A = UΣVᵀ, the singular values in Σ are ordered from largest to smallest. What does a very small singular value indicate?',
            options: [
              'That direction contributes little to A — it can be dropped for compression',
              'That direction is the most important',
              'That U and V are not orthogonal',
              'That the matrix is invertible',
            ],
            correctAnswer: 'That direction contributes little to A — it can be dropped for compression',
            explanation: 'Small singular values mean low variance in that direction. Truncating them produces a low-rank approximation that retains most of the matrix\'s energy.',
          },
        },
        {
          id: 'r1q3c5',
          title: 'Projections and Orthogonality',
          lesson: {
            text: 'The projection of vector b onto a subspace spanned by A is the closest point in that subspace to b. For a column-space projection: p = A(AᵀA)⁻¹Aᵀb. Orthonormal bases make projections trivial: p = (bᵀq)q for each basis vector q. Gram-Schmidt converts any basis into an orthonormal one.',
            formula: 'P = A(AᵀA)⁻¹Aᵀ  (projection matrix)\np = Pb',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The error vector e = b − p (where p is the projection of b onto col(A)) must satisfy which condition?',
            options: ['e ⊥ col(A)', 'e is parallel to b', 'e = 0', 'e = Pb'],
            correctAnswer: 'e ⊥ col(A)',
            explanation: 'The projection minimizes ‖b − Ax‖. At the minimum, the residual e = b − Ax is orthogonal to the column space of A (the normal equations).',
          },
        },
        {
          id: 'r1q3boss',
          title: 'BOSS: The Dot-Product Duelist',
          isBoss: true,
          lesson: {
            text: 'Linear algebra underpins attention mechanisms, PCA, and distance metrics. Your boss challenge combines vector norms and inner products into a cosine similarity computation — the same operation used to compare word embeddings.',
            formula: 'cosine_sim(a, b) = (a · b) / (‖a‖ · ‖b‖)',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement cosine similarity between two vectors a and b (plain arrays of equal length).',
            template: 'function cosineSim(a, b) {\n  let dot = 0, normA = 0, normB = 0;\n  for (let i = 0; i < a.length; i++) {\n    // accumulate dot, normA, normB\n  }\n  return // dot / (sqrt(normA) * sqrt(normB))\n}',
            validationRegex: 'dot\\s*\\+?=.*a\\[i\\].*b\\[i\\]|dot\\s*\\+?=.*b\\[i\\].*a\\[i\\]',
          },
        },
      ],
    },
    {
      id: 'r1q4',
      title: 'The Science of Inference',
      description: 'Statistical inference: turning data into beliefs and decisions.',
      prerequisiteQuestIds: ['r1q1'],
      chapters: [
        {
          id: 'r1q4c1',
          title: 'Estimators, Bias, and Variance',
          lesson: {
            text: 'An estimator θ̂ uses data to guess an unknown parameter θ. Bias = E[θ̂] − θ measures systematic error; variance measures how much θ̂ fluctuates across datasets. A good estimator balances both. The MSE of an estimator = Bias² + Variance.',
            formula: 'MSE(θ̂) = Bias(θ̂)² + Var(θ̂)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A sample mean X̄ of an i.i.d. sample is an unbiased estimator of μ. As sample size n → ∞, what happens to Var(X̄)?',
            options: ['Approaches 0 (σ²/n → 0)', 'Stays constant', 'Approaches σ²', 'Increases'],
            correctAnswer: 'Approaches 0 (σ²/n → 0)',
            explanation: 'Var(X̄) = σ²/n, which goes to 0 as n → ∞. This is why more data makes our estimates more precise.',
          },
        },
        {
          id: 'r1q4c2',
          title: 'Maximum Likelihood Estimation',
          lesson: {
            text: 'Maximum Likelihood Estimation (MLE) finds the parameter θ that makes the observed data most probable. We maximize the likelihood L(θ) = P(data | θ), or equivalently the log-likelihood ℓ(θ) = log P(data | θ). MLE is consistent: it converges to the true parameter as data grows.',
            formula: 'θ̂_MLE = argmax_θ Σᵢ log p(xᵢ | θ)',
          },
          challenge: {
            type: 'derivation',
            prompt: 'Derive the MLE estimate for the mean μ of a Gaussian with known variance σ².',
            steps: [
              {
                prompt: 'Step 1 — The log-likelihood of n i.i.d. Gaussian observations is ℓ(μ) = Σᵢ [−(xᵢ−μ)²/(2σ²)] + const. What is ∂ℓ/∂μ?',
                options: ['Σᵢ (xᵢ − μ) / σ²', '−Σᵢ (xᵢ − μ)', 'Σᵢ xᵢ / σ²', '−n·μ/σ²'],
                correctAnswer: 'Σᵢ (xᵢ − μ) / σ²',
              },
              {
                prompt: 'Step 2 — Set ∂ℓ/∂μ = 0. This gives Σᵢ (xᵢ − μ) = 0. Solving for μ̂:',
                options: ['μ̂ = (1/n) Σᵢ xᵢ', 'μ̂ = Σᵢ xᵢ', 'μ̂ = median(xᵢ)', 'μ̂ = max(xᵢ)'],
                correctAnswer: 'μ̂ = (1/n) Σᵢ xᵢ',
              },
            ],
          },
        },
        {
          id: 'r1q4c3',
          title: 'Hypothesis Testing and p-values',
          lesson: {
            text: 'Hypothesis testing formalizes "is this result real or due to chance?" We state a null hypothesis H₀ (e.g., no effect) and compute a p-value: the probability of observing data at least this extreme if H₀ were true. A small p-value (< 0.05) gives evidence against H₀ — but does not prove the alternative.',
            formula: 'p-value = P(data as extreme or more | H₀ true)',
          },
          challenge: {
            type: 'design',
            prompt: 'You\'re evaluating a new ML model. Your experiment yields p = 0.03. How should you interpret this?',
            options: [
              'Evidence against the null (no improvement); the result is statistically significant at α=0.05',
              'The model is 97% accurate',
              'There is a 3% chance the model is bad',
              'The result is definitive proof of model improvement',
            ],
            correctAnswer: 'Evidence against the null (no improvement); the result is statistically significant at α=0.05',
            explanation: 'p = 0.03 means: if there were no improvement, we\'d see data this extreme only 3% of the time. This is evidence against H₀, not proof of the alternative. Statistical significance ≠ practical significance.',
          },
        },
        {
          id: 'r1q4c4',
          title: 'Confidence Intervals and Bootstrap',
          lesson: {
            text: 'A 95% confidence interval (CI) is a range constructed so that 95% of CIs built this way contain the true parameter. It is NOT "95% probability the parameter is in this interval." The bootstrap generates approximate CIs by resampling the data with replacement many times.',
            formula: 'CI: x̄ ± z_{α/2} · σ/√n  (for known σ)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'If you compute 100 different 95% CIs from 100 independent experiments, roughly how many will contain the true parameter?',
            options: ['95', '100', '50', '5'],
            correctAnswer: '95',
            explanation: 'The 95% refers to the long-run frequency: about 95 out of 100 such intervals will capture the true value.',
          },
        },
        {
          id: 'r1q4c5',
          title: 'Bayesian Inference and Priors',
          lesson: {
            text: 'Bayesian inference treats parameters as random variables with prior distributions. After observing data, we update the prior using Bayes\' theorem to get the posterior P(θ|data) ∝ P(data|θ)·P(θ). Unlike MLE, the posterior captures full uncertainty. A flat prior recovers MLE.',
            formula: 'P(θ|X) ∝ P(X|θ) · P(θ)\nposterior ∝ likelihood × prior',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain to a skeptical guild member: what is the key difference between frequentist and Bayesian statistics?',
            keywords: ['prior', 'posterior', 'belief', 'parameter', 'probability', 'data', 'uncertainty', 'update'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r1q4boss',
          title: 'BOSS: The Inference Engine',
          isBoss: true,
          lesson: {
            text: 'Statistical inference powers model evaluation, A/B tests, and hyperparameter selection. The boss challenge tests your ability to identify the right inferential tool for a real ML scenario.',
            formula: 'MLE: θ̂ = argmax P(data|θ)\nMAP: θ̂ = argmax P(data|θ)·P(θ)',
          },
          challenge: {
            type: 'design',
            prompt: 'You have 10 training examples and want to estimate a model parameter. Which approach is most robust given so little data?',
            options: [
              'Bayesian inference with a sensible prior — regularizes against overfitting small data',
              'MLE — maximizes data likelihood with no assumptions',
              'Bootstrap with 10,000 resamples',
              'Report p-values and reject the null',
            ],
            correctAnswer: 'Bayesian inference with a sensible prior — regularizes against overfitting small data',
            explanation: 'With small data, MLE overfits. A prior injects domain knowledge and acts as regularization. MAP estimation (the mode of the posterior) is equivalent to L2-regularized MLE.',
          },
        },
      ],
    },
    {
      id: 'r1q5',
      title: 'The Art of Computation',
      description: 'Complexity, numerical methods, and information theory — the craft of efficient computation.',
      prerequisiteQuestIds: ['r1q2'],
      chapters: [
        {
          id: 'r1q5c1',
          title: 'Complexity — Big-O and Tractability',
          lesson: {
            text: 'Big-O notation describes how runtime or memory scales with input size n. O(1) is constant, O(n) linear, O(n²) quadratic. NP-hard problems have no known polynomial-time algorithm. Most deep learning training is O(n·p·e) where n = samples, p = parameters, e = epochs.',
            formula: 'f(n) = O(g(n)) means f(n) ≤ c·g(n) for large n',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A naive matrix multiplication of two n×n matrices is O(?)',
            options: ['O(n³)', 'O(n²)', 'O(n log n)', 'O(2ⁿ)'],
            correctAnswer: 'O(n³)',
            explanation: 'Each of n² output elements requires n multiplications and additions — giving O(n³). Strassen\'s algorithm reduces this to O(n^2.807).',
          },
        },
        {
          id: 'r1q5c2',
          title: 'Numerical Precision and Floating Point',
          lesson: {
            text: 'Computers represent real numbers in floating point (IEEE 754). A 32-bit float has ~7 decimal digits of precision. Catastrophic cancellation occurs when subtracting two nearly equal numbers, losing significant digits. In ML, mixed-precision training uses float16 for speed and float32 for stability.',
            formula: 'Machine epsilon: ε ≈ 1.19×10⁻⁷ (float32)\nRelative error ≤ ε/2 per operation',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why should you compute log(1 + x) using the numerically stable `log1p(x)` rather than `log(1 + x)` for very small x?',
            options: [
              'Direct computation loses precision when 1+x ≈ 1 (catastrophic cancellation)',
              'log1p is always faster',
              'The formula log(1+x) is mathematically wrong for small x',
              'Float32 cannot represent numbers smaller than 1',
            ],
            correctAnswer: 'Direct computation loses precision when 1+x ≈ 1 (catastrophic cancellation)',
            explanation: 'For tiny x, 1+x rounds to 1 in float32, so log(1+x) ≈ log(1) = 0. The log1p function uses an algorithm that avoids this cancellation.',
          },
        },
        {
          id: 'r1q5c3',
          title: 'Vectorization and Hardware Basics',
          lesson: {
            text: 'GPUs have thousands of small parallel cores optimized for matrix operations. Vectorized code (using numpy/PyTorch tensor ops) maps directly to these cores, executing in parallel. Python loops are ~100× slower than equivalent vectorized operations. Memory bandwidth is often the bottleneck, not compute.',
            formula: 'Roofline model: perf ≤ min(peak_flops, bandwidth × arithmetic_intensity)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Which code computes a dot product faster in Python (assuming large arrays)?',
            options: [
              'np.dot(a, b)',
              'sum([a[i]*b[i] for i in range(len(a))])',
              'Both are equivalent in speed',
              'A Python loop, because it avoids memory overhead',
            ],
            correctAnswer: 'np.dot(a, b)',
            explanation: 'np.dot uses optimized BLAS routines running in compiled C/Fortran and leverages SIMD instructions. Python loops have per-element interpreter overhead.',
          },
        },
        {
          id: 'r1q5c4',
          title: 'Information Theory — Entropy and KL Divergence',
          lesson: {
            text: 'Shannon entropy H(P) = −Σ P(x) log P(x) measures the average uncertainty (bits) in a distribution. A uniform distribution has maximum entropy. KL divergence D_KL(P‖Q) measures how much information is lost when Q is used to approximate P. It is non-negative and zero only when P = Q.',
            formula: 'H(P) = −Σ P(x) log₂ P(x)\nD_KL(P‖Q) = Σ P(x) log(P(x)/Q(x))',
          },
          challenge: {
            type: 'derivation',
            prompt: 'Compute the entropy of a fair coin (p=0.5, 1-p=0.5).',
            steps: [
              {
                prompt: 'Step 1 — H = −Σ P(x) log₂ P(x). For a fair coin, what is P(heads) = P(tails)?',
                options: ['0.5', '1.0', '0.25', '0'],
                correctAnswer: '0.5',
              },
              {
                prompt: 'Step 2 — Each term P(x) log₂ P(x) = 0.5 × log₂(0.5). What is log₂(0.5)?',
                options: ['-1', '0.5', '1', '-0.5'],
                correctAnswer: '-1',
              },
              {
                prompt: 'Step 3 — H = −(0.5×(−1) + 0.5×(−1)) = ?',
                options: ['1 bit', '0 bits', '2 bits', '0.5 bits'],
                correctAnswer: '1 bit',
              },
            ],
          },
        },
        {
          id: 'r1q5c5',
          title: 'Graph Theory Fundamentals',
          lesson: {
            text: 'A graph G = (V, E) has vertices V and edges E. Directed graphs (digraphs) have ordered edges; undirected graphs do not. Graphs model relationships — knowledge graphs, molecule structures, social networks. Graph Neural Networks operate directly on this structure. A DAG (directed acyclic graph) models dependency and causality.',
            formula: 'Adjacency matrix A: A_{ij} = 1 if edge (i→j) exists\nDegree of node v: deg(v) = number of incident edges',
          },
          challenge: {
            type: 'quiz',
            prompt: 'In a DAG (Directed Acyclic Graph), which property is strictly forbidden?',
            options: ['Cycles', 'Multiple outgoing edges', 'Isolated nodes', 'Weighted edges'],
            correctAnswer: 'Cycles',
            explanation: 'A DAG is acyclic by definition — there is no path from any node back to itself. This property enables topological sorting and causal reasoning.',
          },
        },
        {
          id: 'r1q5boss',
          title: 'BOSS: The Entropy Oracle',
          isBoss: true,
          lesson: {
            text: 'Cross-entropy loss — used in every classification network — derives directly from information theory. H(P, Q) = −Σ P(x) log Q(x) measures the cost of encoding true distribution P using model Q.',
            formula: 'CrossEntropy(y, ŷ) = −Σ yᵢ log(ŷᵢ)',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement binary cross-entropy loss. Given true label y (0 or 1) and predicted probability yhat (between 0 and 1), return the loss. Assume no numerical edge cases.',
            template: 'function binaryCrossEntropy(y, yhat) {\n  return // your code here\n}',
            validationRegex: '-.*y.*Math\\.log.*yhat.*\\+.*1\\s*-\\s*y.*Math\\.log.*1\\s*-\\s*yhat|-.*\\(.*y.*Math\\.log.*yhat',
          },
        },
      ],
    },
  ],
};
