import type { Realm } from '../types';

export const realm4: Realm = {
  id: 'r4',
  title: 'Reinforcement Learning',
  subtitle: 'Teaching machines to act in the world',
  icon: '🎯',
  description: 'Agents, environments, rewards, and the algorithms that learn optimal behavior through interaction.',
  prerequisiteRealmIds: ['r1', 'r2'],
  quests: [
    {
      id: 'r4q1',
      title: 'The RL Framework',
      description: 'Formalizing sequential decision making: agents, environments, policies, and value functions.',
      chapters: [
        {
          id: 'r4q1c1',
          title: 'Agents, Environments, and the Markov Property',
          lesson: {
            text: 'An RL agent observes a state sₜ, takes action aₜ, receives reward rₜ, and transitions to state sₜ₊₁. The Markov property means the future depends only on the current state: P(sₜ₊₁|s₁,...,sₜ,a₁,...,aₜ) = P(sₜ₊₁|sₜ,aₜ). This makes the problem tractable. A Markov Decision Process (MDP) is the formal framework.',
            formula: 'MDP: (S, A, P, R, γ)\nP(s\'|s,a) = transition dynamics\nR(s,a,s\') = reward function',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The Markov property requires that the optimal action depends on:',
            options: [
              'Only the current state — the full history is encoded in sₜ',
              'The complete history of states and actions',
              'The last 5 states',
              'The reward signal only',
            ],
            correctAnswer: 'Only the current state — the full history is encoded in sₜ',
            explanation: 'The Markov property says: given sₜ, the past is irrelevant. The state must be defined to capture all relevant information — if it does, optimal decisions need only sₜ.',
          },
        },
        {
          id: 'r4q1c2',
          title: 'Rewards, Returns, and Discounting',
          lesson: {
            text: 'The return Gₜ is the total accumulated reward from timestep t. Discounting with factor γ ∈ [0,1) down-weights future rewards: Gₜ = Σₖ γᵏ rₜ₊ₖ. γ near 1 = far-sighted agent; γ near 0 = myopic agent. Discounting also ensures finite returns for infinite-horizon problems.',
            formula: 'Gₜ = rₜ + γrₜ₊₁ + γ²rₜ₊₂ + ... = Σₖ₌₀^∞ γᵏ rₜ₊ₖ',
          },
          challenge: {
            type: 'derivation',
            prompt: 'Compute the discounted return for rewards [1, 1, 1] with γ=0.9.',
            steps: [
              {
                prompt: 'Step 1 — G₀ = r₀ + γr₁ + γ²r₂. With r₀=r₁=r₂=1 and γ=0.9, what is γ²?',
                options: ['0.81', '0.9', '0.729', '1.8'],
                correctAnswer: '0.81',
              },
              {
                prompt: 'Step 2 — G₀ = 1 + 0.9×1 + 0.81×1 = ?',
                options: ['2.71', '3.0', '2.5', '2.0'],
                correctAnswer: '2.71',
              },
            ],
          },
        },
        {
          id: 'r4q1c3',
          title: 'Policies and Value Functions',
          lesson: {
            text: 'A policy π(a|s) is a mapping from states to action probabilities. The state-value function Vπ(s) is the expected return starting from s under policy π. The action-value function Qπ(s,a) is the expected return from taking action a in state s, then following π. The optimal policy maximizes Q*(s,a) at each state.',
            formula: 'Vπ(s) = E_π[Gₜ | sₜ=s]\nQπ(s,a) = E_π[Gₜ | sₜ=s, aₜ=a]\nπ*(s) = argmax_a Q*(s,a)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The relationship between V and Q is:',
            options: [
              'Vπ(s) = Σ_a π(a|s) · Qπ(s,a)',
              'Qπ(s,a) = Vπ(s) for all a',
              'Vπ(s) = max_a Qπ(s,a) always',
              'There is no mathematical relationship between V and Q',
            ],
            correctAnswer: 'Vπ(s) = Σ_a π(a|s) · Qπ(s,a)',
            explanation: 'V is the expected Q over all actions the policy takes. V marginalizes Q over the policy distribution: V(s) = E_π[Q(s,a)] = Σ_a π(a|s)Q(s,a).',
          },
        },
        {
          id: 'r4q1c4',
          title: 'The Bellman Equations',
          lesson: {
            text: 'The Bellman equation expresses a value function recursively: Vπ(s) = Σ_a π(a|s) Σ_{s\'} P(s\'|s,a)[R(s,a,s\') + γVπ(s\')]. The optimal Bellman equation (Bellman optimality equation) uses max instead of expectation over actions. These equations are the foundation of dynamic programming methods.',
            formula: 'V*(s) = max_a Σ_{s\'} P(s\'|s,a)[R(s,a,s\') + γV*(s\')]\nQ*(s,a) = Σ_{s\'} P(s\'|s,a)[R(s,a,s\') + γ max_{a\'} Q*(s\',a\')]',
          },
          challenge: {
            type: 'derivation',
            prompt: 'Derive the Bellman equation for Vπ from the definition of return.',
            steps: [
              {
                prompt: 'Step 1 — Vπ(s) = E_π[Gₜ|sₜ=s] = E_π[rₜ + γGₜ₊₁|sₜ=s]. The first term E[rₜ] = ?',
                options: ['Σ_a π(a|s) Σ_{s\'} P(s\'|s,a)R(s,a,s\')', 'R(s)', 'max_a R(s,a)', 'γ·Vπ(s)'],
                correctAnswer: 'Σ_a π(a|s) Σ_{s\'} P(s\'|s,a)R(s,a,s\')',
              },
              {
                prompt: 'Step 2 — By the Markov property, E[γGₜ₊₁|sₜ=s] = γ Σ_a π(a|s) Σ_{s\'} P(s\'|s,a) · ?',
                options: ['Vπ(s\')', 'Vπ(s)', 'Gₜ₊₁', 'R(s\',a\')'],
                correctAnswer: 'Vπ(s\')',
              },
              {
                prompt: 'Step 3 — Combining both terms, the Bellman equation for Vπ(s) is:',
                options: [
                  'Σ_a π(a|s) Σ_{s\'} P(s\'|s,a)[R(s,a,s\') + γVπ(s\')]',
                  'max_a Σ_{s\'} P(s\'|s,a)[R + γV(s\')]',
                  'R(s) + γVπ(s)',
                  'Σ_{s\'} P(s\'|s)Vπ(s\')',
                ],
                correctAnswer: 'Σ_a π(a|s) Σ_{s\'} P(s\'|s,a)[R(s,a,s\') + γVπ(s\')]',
              },
            ],
          },
        },
        {
          id: 'r4q1c5',
          title: 'Exploration vs. Exploitation',
          lesson: {
            text: 'The exploration-exploitation dilemma: an agent must exploit known good actions to get reward, but must explore to discover better actions. ε-greedy selects a random action with probability ε, otherwise the best known action. UCB (Upper Confidence Bound) selects the action with the highest upper confidence — optimistic in the face of uncertainty.',
            formula: 'ε-greedy: π(a|s) = ε/|A| + (1−ε)·1[a=argmax Q(s,a)]\nUCB: a = argmax_a [Q(s,a) + c√(ln t / Nₐ)]',
          },
          challenge: {
            type: 'design',
            prompt: 'An RL agent is learning to play chess. Which exploration strategy makes most sense?',
            options: [
              'Entropy-based exploration — encourage diverse move distributions early in training',
              'ε-greedy with ε=0.5 for the entire training',
              'Always greedy — trust the current policy',
              'Random actions for the first 1000 steps, then greedy',
            ],
            correctAnswer: 'Entropy-based exploration — encourage diverse move distributions early in training',
            explanation: 'Chess has a huge state space. Entropy regularization (as in SAC/PPO) encourages the policy to spread probability over many actions early on, enabling broad exploration before exploiting learned strategy.',
          },
        },
        {
          id: 'r4q1boss',
          title: 'BOSS: The MDP Solver',
          isBoss: true,
          lesson: {
            text: 'Discounted returns are the currency of RL. Every value-based algorithm computes or estimates them. This boss tests your mastery of return computation and the Bellman backup.',
            formula: 'TD target: y = r + γ·max_{a\'} Q(s\',a\')',
          },
          challenge: {
            type: 'code',
            prompt: 'Compute the discounted return for a sequence of rewards. Given rewards array and discount factor gamma, return G₀ = r₀ + γr₁ + γ²r₂ + ...',
            template: 'function discountedReturn(rewards, gamma) {\n  let G = 0;\n  for (let i = rewards.length - 1; i >= 0; i--) {\n    G = rewards[i] + gamma * G;\n  }\n  return G;\n}',
            validationRegex: 'G\\s*=\\s*rewards\\[i\\]\\s*\\+\\s*gamma\\s*\\*\\s*G',
          },
        },
      ],
    },
    {
      id: 'r4q2',
      title: 'Tabular Methods',
      description: 'Dynamic programming and temporal difference learning for small, known environments.',
      prerequisiteQuestIds: ['r4q1'],
      chapters: [
        {
          id: 'r4q2c1',
          title: 'Dynamic Programming',
          lesson: {
            text: 'Dynamic programming (DP) solves MDPs exactly when the transition model P(s\'|s,a) is known. Policy evaluation iterates the Bellman equation to compute Vπ. Policy improvement makes the policy greedy w.r.t. the current V. Policy iteration alternates both until convergence. Value iteration combines them in one sweep.',
            formula: 'Value iteration: V(s) ← max_a Σ_{s\'} P(s\'|s,a)[R + γV(s\')]\nConverges to V* (contracting operator)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Dynamic programming for RL requires knowledge of:',
            options: [
              'The full transition model P(s\'|s,a) and reward function R',
              'Only the reward function',
              'Only sample trajectories from the environment',
              'The optimal policy',
            ],
            correctAnswer: 'The full transition model P(s\'|s,a) and reward function R',
            explanation: 'DP is model-based: it needs the full MDP dynamics to perform Bellman backups analytically. Without the model, we need model-free methods (MC, TD).',
          },
        },
        {
          id: 'r4q2c2',
          title: 'Monte Carlo Methods',
          lesson: {
            text: 'Monte Carlo (MC) methods estimate value functions by averaging returns from complete episodes. No model is needed — just sample trajectories. First-visit MC averages the return after the first visit to state s per episode. MC has high variance (full episode returns) but zero bias. Suitable for episodic tasks.',
            formula: 'V(s) ← V(s) + α[Gₜ − V(s)]  (incremental update)\nMC target: Gₜ (actual return from t to T)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Monte Carlo methods can only be used for:',
            options: [
              'Episodic tasks — they require complete episodes to compute returns',
              'Any MDP, including continuous tasks',
              'Tasks with deterministic transitions only',
              'Single-step decision problems',
            ],
            correctAnswer: 'Episodic tasks — they require complete episodes to compute returns',
            explanation: 'MC uses the actual return Gₜ from timestep t to the terminal state. This requires the episode to end. For infinite-horizon continuous tasks, we need TD methods instead.',
          },
        },
        {
          id: 'r4q2c3',
          title: 'Temporal Difference Learning',
          lesson: {
            text: 'TD learning bootstraps: it updates value estimates using other value estimates rather than waiting for full returns. TD(0): V(sₜ) ← V(sₜ) + α[rₜ + γV(sₜ₊₁) − V(sₜ)]. The TD error δₜ = rₜ + γV(sₜ₊₁) − V(sₜ) is a 1-step prediction error. TD is lower variance than MC but biased.',
            formula: 'TD target: rₜ + γV(sₜ₊₁)\nTD error: δₜ = rₜ + γV(sₜ₊₁) − V(sₜ)\nUpdate: V(sₜ) ← V(sₜ) + α·δₜ',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement one TD(0) update. Given current V(s), reward r, next state value V_next, discount gamma, and learning rate alpha, return the updated V(s).',
            template: 'function tdUpdate(Vs, r, Vnext, gamma, alpha) {\n  const tdError = // r + gamma*Vnext - Vs\n  return Vs + alpha * tdError;\n}',
            validationRegex: 'r\\s*\\+\\s*gamma\\s*\\*\\s*Vnext\\s*-\\s*Vs',
          },
        },
        {
          id: 'r4q2c4',
          title: 'Q-Learning and SARSA',
          lesson: {
            text: 'Q-learning is off-policy TD: it updates Q(s,a) using the max over next actions regardless of what the agent actually does — targeting the optimal policy. SARSA is on-policy: it uses the action the policy actually takes. Q-learning learns Q* directly; SARSA learns Q for the current (exploratory) policy.',
            formula: 'Q-learning: Q(s,a) ← Q(s,a) + α[r + γ max_{a\'} Q(s\',a\') − Q(s,a)]\nSARSA: Q(s,a) ← Q(s,a) + α[r + γ Q(s\',a\') − Q(s,a)]',
          },
          challenge: {
            type: 'quiz',
            prompt: 'An agent uses ε-greedy behavior and Q-learning updates. The Q-values converge to:',
            options: [
              'Q* — the optimal action-values, regardless of ε',
              'Q for the ε-greedy policy',
              'The average Q across all policies',
              'Q values with high variance due to exploration',
            ],
            correctAnswer: 'Q* — the optimal action-values, regardless of ε',
            explanation: 'Q-learning is off-policy — it updates toward max Q(s\',a\') which represents the greedy policy, not the ε-greedy behavior policy. Given sufficient exploration, it converges to Q*.',
          },
        },
        {
          id: 'r4q2c5',
          title: 'Multi-Armed Bandits',
          lesson: {
            text: 'The k-armed bandit is the simplest RL problem: k actions, no state transitions, maximize cumulative reward. Regret measures the difference between the optimal arm and what was chosen. UCB1 achieves O(√(k·T·log T)) regret — near-optimal. Thompson Sampling maintains a Beta distribution over each arm\'s success probability.',
            formula: 'UCB1: a = argmax_a [Q̂(a) + √(2 ln t / Nₐ)]\nRegret: R(T) = T·μ* − Σₜ μ_{aₜ}',
          },
          challenge: {
            type: 'design',
            prompt: 'You are A/B testing 5 new website layouts. You want to minimize user dissatisfaction during the test. Which strategy is best?',
            options: [
              'Thompson Sampling — adapts quickly to the best layout, minimizing regret',
              'Equal split (20% each) for the full test duration',
              'Test each layout for 1 day, then pick the best',
              'Pure exploitation from day 1 — use the layout with most historical data',
            ],
            correctAnswer: 'Thompson Sampling — adapts quickly to the best layout, minimizing regret',
            explanation: 'Thompson Sampling balances exploration (learning which layout is best) with exploitation (showing better layouts more). This minimizes cumulative regret — fewer users exposed to poor layouts.',
          },
        },
        {
          id: 'r4q2boss',
          title: 'BOSS: The TD Champion',
          isBoss: true,
          lesson: {
            text: 'TD learning is the foundation of deep RL. The DQN algorithm extends Q-learning with neural networks. This boss tests the full Q-learning update loop.',
            formula: 'Q(s,a) ← Q(s,a) + α[r + γ max_{a\'} Q(s\',a\') − Q(s,a)]',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement a Q-learning update. Given Q table (object), state s, action a, reward r, next state sPrime, gamma, alpha, and max Q at sPrime (maxQNext), return updated Q[s][a].',
            template: 'function qUpdate(Qsa, r, maxQNext, gamma, alpha) {\n  // Q(s,a) += alpha * [r + gamma*maxQ(s\') - Q(s,a)]\n  return Qsa + alpha * (r + gamma * maxQNext - Qsa);\n}',
            validationRegex: 'Qsa\\s*\\+\\s*alpha\\s*\\*\\s*\\(\\s*r\\s*\\+\\s*gamma\\s*\\*\\s*maxQNext\\s*-\\s*Qsa\\s*\\)',
          },
        },
      ],
    },
    {
      id: 'r4q3',
      title: 'Deep RL',
      description: 'Combining deep learning with RL to tackle complex, high-dimensional environments.',
      prerequisiteQuestIds: ['r4q2'],
      chapters: [
        {
          id: 'r4q3c1',
          title: 'Deep Q-Networks (DQN)',
          lesson: {
            text: 'DQN approximates Q*(s,a) with a neural network Qθ(s,a). Two key stabilizing tricks: experience replay (sample random batches from a replay buffer, breaking temporal correlations) and a target network (a lagged copy of Q used for TD targets, preventing chasing a moving target).',
            formula: 'Loss: L = E[(r + γ max_{a\'} Q_{θ⁻}(s\',a\') − Qθ(s,a))²]\nθ⁻ = target network (updated every N steps)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why does DQN use a separate target network (with frozen weights) for computing TD targets?',
            options: [
              'Prevents the target from changing every step — stabilizes training by decoupling prediction from target',
              'The target network is more accurate than the online network',
              'It speeds up computation by 2×',
              'It prevents overfitting to the replay buffer',
            ],
            correctAnswer: 'Prevents the target from changing every step — stabilizes training by decoupling prediction from target',
            explanation: 'Without a target network, both sides of the TD error use the same network. Each parameter update changes the target, causing instability (chasing a moving target). Fixing θ⁻ for N steps gives a stable learning signal.',
          },
        },
        {
          id: 'r4q3c2',
          title: 'Policy Gradient Methods',
          lesson: {
            text: 'Policy gradient methods directly optimize the policy π_θ(a|s) by gradient ascent on expected return J(θ). The REINFORCE algorithm: ∇J(θ) = E[∇log π_θ(aₜ|sₜ) · Gₜ]. This is high variance but unbiased. A baseline b(s) reduces variance without introducing bias: ∇J(θ) = E[∇log π_θ · (Gₜ − b(sₜ))].',
            formula: 'REINFORCE: θ ← θ + α·∇log π_θ(aₜ|sₜ)·Gₜ\nWith baseline: Gₜ − V(sₜ)  (advantage)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The REINFORCE policy gradient estimate is unbiased but high variance. What reduces variance without introducing bias?',
            options: [
              'Subtracting a state-dependent baseline b(sₜ) — the baseline cancels in expectation',
              'Using fewer samples',
              'Adding L2 regularization to the policy',
              'Truncating the return after 10 steps',
            ],
            correctAnswer: 'Subtracting a state-dependent baseline b(sₜ) — the baseline cancels in expectation',
            explanation: 'E[∇log π · b(s)] = 0 for any baseline that depends only on s (not a). So subtracting b(s) doesn\'t change the expected gradient but reduces its variance by centering the return signal.',
          },
        },
        {
          id: 'r4q3c3',
          title: 'Actor-Critic Architectures',
          lesson: {
            text: 'Actor-critic combines policy gradients (actor) with value function estimation (critic). The critic estimates V(s) and provides a low-variance baseline: advantage A(s,a) = Q(s,a) − V(s). The actor updates toward high-advantage actions. A2C/A3C are synchronous/asynchronous variants using multiple parallel workers.',
            formula: 'Actor loss: −log π_θ(a|s)·Aₜ\nCritic loss: (Vφ(s) − Gₜ)²\nAdvantage: Aₜ = rₜ + γV(sₜ₊₁) − V(sₜ)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'In actor-critic, the "advantage" A(s,a) = Q(s,a) - V(s) measures:',
            options: [
              'How much better action a is compared to the average action from state s',
              'The total expected return from state s',
              'The difference in rewards between two consecutive steps',
              'The critic\'s estimation error',
            ],
            correctAnswer: 'How much better action a is compared to the average action from state s',
            explanation: 'V(s) is the baseline (average performance from s). A(s,a) > 0 means action a is better than average; A(s,a) < 0 means worse. The actor increases probability of positive-advantage actions.',
          },
        },
        {
          id: 'r4q3c4',
          title: 'Proximal Policy Optimization (PPO)',
          lesson: {
            text: 'PPO prevents destructively large policy updates by clipping the probability ratio. The clipped objective: L_CLIP = E[min(rₜ(θ)·Aₜ, clip(rₜ(θ), 1−ε, 1+ε)·Aₜ)] where rₜ(θ) = π_θ(a|s)/π_θ_old(a|s). This keeps the new policy close to the old one without computing a KL penalty explicitly.',
            formula: 'rₜ(θ) = π_θ(aₜ|sₜ) / π_{θ_old}(aₜ|sₜ)\nL_CLIP = min(rₜ·Aₜ, clip(rₜ, 1−ε, 1+ε)·Aₜ)',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain to a colleague why PPO clips the policy ratio and what problem this solves.',
            keywords: ['ratio', 'clip', 'large', 'update', 'instability', 'trust region', 'old policy', 'diverge'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r4q3c5',
          title: 'Soft Actor-Critic (SAC)',
          lesson: {
            text: 'SAC maximizes both expected reward and policy entropy — encouraging exploration while learning. The maximum entropy objective: J(π) = Σₜ E[r(sₜ,aₜ) + α·H(π(·|sₜ))]. The temperature α trades off reward vs. entropy. SAC is off-policy (uses a replay buffer) and sample-efficient, especially for continuous action spaces.',
            formula: 'J(π) = E[Σₜ r(sₜ,aₜ) + α·H(π(·|sₜ))]\nH(π) = −E_{a~π}[log π(a|s)]  (entropy)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'In SAC, the entropy regularization coefficient α controls:',
            options: [
              'The tradeoff between reward maximization and exploration breadth',
              'The learning rate of the actor',
              'The size of the replay buffer',
              'The discount factor for future rewards',
            ],
            correctAnswer: 'The tradeoff between reward maximization and exploration breadth',
            explanation: 'Large α weights entropy heavily → broad, exploratory policy. Small α → focus on reward. SAC can learn α automatically by targeting a desired entropy level.',
          },
        },
        {
          id: 'r4q3boss',
          title: 'BOSS: The RL Algorithm Selector',
          isBoss: true,
          lesson: {
            text: 'Deep RL has many algorithms — each suited to different settings. DQN for discrete actions, SAC/PPO for continuous control, PPO for on-policy stability. This boss tests your ability to match algorithm to problem.',
          },
          challenge: {
            type: 'design',
            prompt: 'You are training a robot arm to grasp objects (continuous actions, dense reward, need sample efficiency). Which algorithm is best?',
            options: [
              'SAC — off-policy, sample-efficient, maximum entropy exploration for continuous control',
              'DQN — proven, works on Atari',
              'REINFORCE — simple policy gradient, no value function needed',
              'PPO — on-policy, stable, widely used',
            ],
            correctAnswer: 'SAC — off-policy, sample-efficient, maximum entropy exploration for continuous control',
            explanation: 'Robot learning is sample-expensive (real-world data or slow simulation). SAC\'s off-policy replay buffer reuses data efficiently. Its continuous action support and entropy exploration are ideal for manipulation.',
          },
        },
      ],
    },
    {
      id: 'r4q4',
      title: 'Advanced RL',
      description: 'Model-based RL, hierarchical agents, multi-agent systems, and learning from human feedback.',
      prerequisiteQuestIds: ['r4q3'],
      chapters: [
        {
          id: 'r4q4c1',
          title: 'Model-Based RL',
          lesson: {
            text: 'Model-based RL learns a world model P̂(s\'|s,a) and uses it for planning (e.g., Dyna: plan in imagination to generate synthetic experience). This is far more sample-efficient than model-free methods. Dreamer learns a latent world model from pixels and plans in the latent space. The main risk: model errors compound during long rollouts.',
            formula: 'Dyna: real step → update Q + N imagined steps from model → update Q\nSample efficiency: 10-100× better than model-free',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The main risk of long-horizon planning in model-based RL is:',
            options: [
              'Model errors compound — small inaccuracies lead to unrealistic imagined states',
              'Planning is computationally intractable',
              'The model overfits to the replay buffer',
              'Model-based RL cannot handle continuous state spaces',
            ],
            correctAnswer: 'Model errors compound — small inaccuracies lead to unrealistic imagined states',
            explanation: 'Each imagined step uses the model\'s prediction as the next input. Errors accumulate geometrically — a 1% error per step becomes 63% error over 100 steps. Short rollouts or ensembles mitigate this.',
          },
        },
        {
          id: 'r4q4c2',
          title: 'Hierarchical RL',
          lesson: {
            text: 'Hierarchical RL decomposes long-horizon tasks into a hierarchy: a high-level manager selects goals or sub-tasks; a low-level controller achieves them. The manager operates at a slower timescale. HIRO and Options framework formalize this. Hierarchies dramatically extend planning horizon and improve sample efficiency.',
            formula: 'Manager: produces goal g every k steps\nWorker: maximizes intrinsic reward for reaching g\nTotal: sparse external reward + dense intrinsic reward',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Hierarchical RL is especially useful for:',
            options: [
              'Long-horizon tasks with sparse rewards where flat RL fails',
              'Simple discrete action spaces',
              'Tasks where the reward is dense and frequent',
              'Replacing neural networks with symbolic planners',
            ],
            correctAnswer: 'Long-horizon tasks with sparse rewards where flat RL fails',
            explanation: 'Sparse rewards make credit assignment over thousands of steps impossible for flat RL. Hierarchy decomposes: the high level handles long-term strategy; the low level gets dense intrinsic rewards for completing sub-goals.',
          },
        },
        {
          id: 'r4q4c3',
          title: 'Multi-Agent RL',
          lesson: {
            text: 'Multi-agent RL (MARL) involves multiple agents learning simultaneously. Cooperative settings maximize joint reward (CTDE: centralized training, decentralized execution). Competitive settings have opposing objectives (zero-sum games). Emergent complexity arises from agent interactions — simple individual rules can create sophisticated collective behavior.',
            formula: 'Nash equilibrium: no agent can improve by unilaterally deviating\nCTDE: train with full state info, execute with local observations',
          },
          challenge: {
            type: 'design',
            prompt: 'You are building a team of 5 autonomous drones to collaborate on package delivery. What training paradigm is most practical?',
            options: [
              'CTDE — centralized training with full joint state, but drones execute independently at deployment',
              'Fully decentralized — each drone trains on its own without seeing others',
              'Fully centralized — one policy controls all 5 drones at deployment',
              'Competitive MARL — drones compete for packages',
            ],
            correctAnswer: 'CTDE — centralized training with full joint state, but drones execute independently at deployment',
            explanation: 'During training, a central critic can observe all drones\' states — making learning stable. At deployment, each drone acts on local sensors only. This is practical and avoids the non-stationarity of fully decentralized training.',
          },
        },
        {
          id: 'r4q4c4',
          title: 'Offline RL and Imitation Learning',
          lesson: {
            text: 'Offline RL (batch RL) trains purely from a fixed dataset without environment interaction — critical for safety-critical domains. Conservative Q-Learning (CQL) penalizes overestimation of out-of-distribution actions. Imitation learning (behavioral cloning) trains a policy to mimic expert demonstrations by supervised learning on (state, action) pairs.',
            formula: 'Behavioral Cloning: min_θ E[(s,a)~D] [-log π_θ(a|s)]\nCQL: Q(s,a) ← Q(s,a) − α·Q(s, OOD actions)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Offline RL is preferred over online RL when:',
            options: [
              'Interacting with the real environment is expensive or dangerous (medical, autonomous driving)',
              'You have no data and must explore from scratch',
              'The reward function is easy to specify',
              'You need maximum sample efficiency',
            ],
            correctAnswer: 'Interacting with the real environment is expensive or dangerous (medical, autonomous driving)',
            explanation: 'In medical treatment or autonomous driving, deploying an untrained RL agent to explore could cause harm. Offline RL learns from historical data (expert doctors\' decisions, human driving logs) without unsafe exploration.',
          },
        },
        {
          id: 'r4q4c5',
          title: 'RL from Human Feedback (RLHF)',
          lesson: {
            text: 'RLHF fine-tunes language models to align with human preferences. Step 1: supervised fine-tuning on demonstrations. Step 2: train a reward model on human comparisons (which completion is better?). Step 3: optimize the LLM against the reward model using PPO, with a KL penalty to prevent deviating from the SFT model.',
            formula: 'Reward: R(x,y) = R_θ(x,y) − β·KL(π_RL ‖ π_SFT)\nPPO maximizes E[R(x,y)]',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain the three stages of RLHF and why each is necessary for aligning a language model.',
            keywords: ['supervised', 'reward model', 'human', 'preference', 'PPO', 'KL', 'alignment', 'comparison'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r4q4boss',
          title: 'BOSS: The Alignment Engineer',
          isBoss: true,
          lesson: {
            text: 'RLHF has become the standard technique for aligning LLMs. Understanding its components — reward modeling, PPO training, and KL regularization — is essential for modern AI practitioners.',
          },
          challenge: {
            type: 'design',
            prompt: 'During RLHF training, the policy starts generating extreme outputs that score highly on the reward model but are nonsensical. What is happening and what is the fix?',
            options: [
              'Reward hacking — add a KL penalty between the RL policy and the SFT model to prevent over-optimization',
              'The reward model is too accurate — reduce its size',
              'Increase the PPO learning rate to converge faster',
              'Remove the SFT warm-start and train from scratch',
            ],
            correctAnswer: 'Reward hacking — add a KL penalty between the RL policy and the SFT model to prevent over-optimization',
            explanation: 'The reward model is an imperfect proxy for human preferences. Without constraints, PPO exploits its weaknesses (Goodhart\'s Law). The KL term β·KL(π_RL ‖ π_SFT) keeps the policy anchored to sensible language.',
          },
        },
      ],
    },
  ],
};
