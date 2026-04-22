import type { Realm } from '../types';

export const realm8: Realm = {
  id: 'r8',
  title: 'Safety, Ethics & Alignment',
  subtitle: 'Ensuring AI serves humanity',
  icon: '🛡️',
  description: 'Interpretability, robustness, fairness, alignment, and the societal implications of AI systems.',
  prerequisiteRealmIds: ['r2'],
  quests: [
    {
      id: 'r8q1',
      title: 'Interpretability',
      description: 'Understanding what neural networks actually learn and why they make specific predictions.',
      chapters: [
        {
          id: 'r8q1c1',
          title: 'The Black-Box Problem',
          lesson: {
            text: 'Neural networks are function approximators with billions of parameters — their decision process is opaque. The black-box problem: we know the inputs and outputs but not the reasoning. This matters for high-stakes decisions (medical, legal, financial) where humans need to understand and audit AI decisions. Interpretability ≠ explainability: interpretability is structural understanding; explainability is producing post-hoc justifications.',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain why the black-box nature of neural networks is a problem for deploying AI in high-stakes settings.',
            keywords: ['audit', 'trust', 'accountability', 'decision', 'opaque', 'high-stakes', 'understanding', 'explain'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r8q1c2',
          title: 'Feature Attribution — SHAP, LIME',
          lesson: {
            text: 'SHAP (SHapley Additive exPlanations) assigns each feature a contribution value based on cooperative game theory: how much does feature i contribute to the prediction, averaged over all possible feature subsets? LIME fits a local linear model around a prediction. Both are model-agnostic. SHAP has strong theoretical properties; LIME is faster but less stable.',
            formula: 'SHAP: φᵢ = Σ_{S⊆F\\{i}} [|S|!(|F|-|S|-1)!/|F|!] · (f(S∪{i}) − f(S))\nφᵢ: feature i\'s contribution to prediction',
          },
          challenge: {
            type: 'quiz',
            prompt: 'SHAP values are guaranteed to be consistent (if feature i is more important in model A than B, SHAP reflects this) due to their foundation in:',
            options: [
              'Shapley values from cooperative game theory — unique, axiomatically fair attribution',
              'Gradient-based attribution',
              'Local linear approximation around each prediction',
              'Random sampling of feature subsets',
            ],
            correctAnswer: 'Shapley values from cooperative game theory — unique, axiomatically fair attribution',
            explanation: 'Shapley values are the unique attribution satisfying efficiency, symmetry, dummy, and linearity axioms. These properties guarantee SHAP is consistent and complete — other attribution methods (LIME, gradient) violate at least one axiom.',
          },
        },
        {
          id: 'r8q1c3',
          title: 'Probing and Activation Analysis',
          lesson: {
            text: 'Probing classifiers train small linear classifiers on intermediate layer representations to test what information is encoded at each layer. If a probe predicts part-of-speech with high accuracy from BERT layer 3, that layer encodes syntactic information. Activation patching ("causal tracing") replaces activations to identify which components causally affect the output.',
            formula: 'Probe: train linear f(hˡ) → label  (is syntactic info in layer l?)\nCausal tracing: patch activations at position t → measure output change',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A probing classifier achieves 95% accuracy predicting sentiment from BERT\'s layer 8 representations. This tells us:',
            options: [
              'Layer 8 representations encode sentiment information',
              'BERT uses sentiment to make predictions',
              'Layer 8 is the most important layer',
              'BERT was trained on sentiment data',
            ],
            correctAnswer: 'Layer 8 representations encode sentiment information',
            explanation: 'High probe accuracy means sentiment is linearly decodable from layer 8. Note: this does NOT mean BERT uses layer 8 for sentiment — the probe tells us what is THERE, not what is used. Causal methods are needed to establish causal roles.',
          },
        },
        {
          id: 'r8q1c4',
          title: 'Mechanistic Interpretability',
          lesson: {
            text: 'Mechanistic interpretability reverse-engineers neural networks into human-understandable circuits. Anthropic\'s "superposition hypothesis": features are represented as superpositions of neurons, not one-to-one. Circuits: specific paths of activations that implement algorithms (e.g., curve detectors → eye detectors → face detectors in vision models). Sparse autoencoders (SAEs) disentangle superposed features.',
            formula: 'Superposition: d features in n < d neurons\nActivation = Σᵢ fᵢ · direction_i  (polysemantic neurons)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The "superposition hypothesis" in neural networks means:',
            options: [
              'Networks represent more features than they have neurons by encoding multiple features per neuron as near-orthogonal directions',
              'Neurons activate for only one feature each (monosemantic)',
              'Features are distributed equally across all neurons',
              'Neural networks require supercomputers to interpret',
            ],
            correctAnswer: 'Networks represent more features than they have neurons by encoding multiple features per neuron as near-orthogonal directions',
            explanation: 'In high-dimensional space, many near-orthogonal vectors can coexist. Networks exploit this to represent 1000s of features in 100s of neurons — each neuron activates for multiple features (polysemanticity). SAEs decompose this superposition.',
          },
        },
        {
          id: 'r8q1c5',
          title: 'Concept-Based Explanations',
          lesson: {
            text: 'Concept-based explanations (TCAV, ConceptSHAP) explain predictions in terms of human-interpretable concepts rather than raw features. TCAV (Testing with Concept Activation Vectors) measures how sensitive a prediction is to a concept (e.g., "stripes" for zebra classification). Counterfactual explanations: "the loan was denied because your income was 10% too low."',
            formula: 'TCAV: CAV = linear boundary between concept/non-concept examples in activation space\nTCAV score = fraction of inputs where gradient ⊙ CAV > 0',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Counterfactual explanations are particularly useful for end users because:',
            options: [
              'They explain what would need to change to get a different outcome — actionable and contrastive',
              'They are mathematically rigorous',
              'They reveal all features used by the model',
              'They are faster to compute than SHAP',
            ],
            correctAnswer: 'They explain what would need to change to get a different outcome — actionable and contrastive',
            explanation: '"Your loan was denied because your debt-to-income ratio was too high. If it were below 40%, you would have been approved." This is actionable — the user knows what to do. SHAP gives feature importances but not what to change.',
          },
        },
        {
          id: 'r8q1boss',
          title: 'BOSS: The Interpretability Engineer',
          isBoss: true,
          lesson: {
            text: 'Interpretability is not just academic — it is required for regulatory compliance (EU AI Act, GDPR "right to explanation") and responsible deployment of high-stakes AI.',
          },
          challenge: {
            type: 'design',
            prompt: 'A bank must explain individual loan decisions to applicants (required by law). Which interpretability method is most appropriate?',
            options: [
              'SHAP values — per-prediction feature attributions that are consistent, model-agnostic, and satisfy regulatory requirements for explanations',
              'Probing classifiers — reveal what the model has learned globally',
              'Mechanistic interpretability — reverse-engineer the exact algorithm',
              'Global feature importance (mean SHAP over all predictions)',
            ],
            correctAnswer: 'SHAP values — per-prediction feature attributions that are consistent, model-agnostic, and satisfy regulatory requirements for explanations',
            explanation: 'GDPR Article 22 and EU AI Act require explanations for individual automated decisions. SHAP provides per-instance, feature-level explanations with strong theoretical properties. Global importance only explains average behavior, not why THIS applicant was denied.',
          },
        },
      ],
    },
    {
      id: 'r8q2',
      title: 'Robustness & Security',
      description: 'Making AI systems resilient against adversarial manipulation and distribution shift.',
      prerequisiteQuestIds: ['r8q1'],
      chapters: [
        {
          id: 'r8q2c1',
          title: 'Adversarial Attacks',
          lesson: {
            text: 'Adversarial examples are inputs with imperceptible perturbations that cause misclassification. FGSM (Fast Gradient Sign Method): x_adv = x + ε·sign(∇_x L). PGD (Projected Gradient Descent) is stronger — iterative FGSM with projection. C&W attack minimizes perturbation needed to fool the model. Attacks transfer across models (surprising and concerning).',
            formula: 'FGSM: x_adv = x + ε·sign(∇_x L(f_θ(x), y))\nPGD: iterate FGSM T times with clipping to ‖δ‖_∞ ≤ ε',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Adversarial transferability means:',
            options: [
              'Adversarial examples crafted for model A often fool model B — even with different architecture',
              'Adversarial examples only work for the model they were crafted on',
              'Transfer learning makes models more robust',
              'Adversarial examples are model-specific and cannot transfer',
            ],
            correctAnswer: 'Adversarial examples crafted for model A often fool model B — even with different architecture',
            explanation: 'Transferability is a major security concern: an attacker can craft adversarial examples against a locally copied or substitute model, then use them to attack a black-box API. This enables black-box adversarial attacks without model access.',
          },
        },
        {
          id: 'r8q2c2',
          title: 'Certified Defenses',
          lesson: {
            text: 'Certified defenses provide provable guarantees: for all perturbations δ with ‖δ‖ ≤ ε, the prediction is unchanged. Randomized smoothing creates a certified classifier by predicting the most likely class under Gaussian noise additions. The certification radius is the maximum ε for which the prediction is guaranteed correct.',
            formula: 'Randomized smoothing: g(x) = argmax_c P(f(x+η)=c), η~N(0,σ²I)\nCertified radius: r = σ/2 · (Φ⁻¹(p_A) − Φ⁻¹(p_B))',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Certified robustness via randomized smoothing provides a guarantee that:',
            options: [
              'The classifier\'s prediction is unchanged for ALL perturbations within radius r — not just tested ones',
              'Adversarial training improves certified radius',
              'The model achieves 100% accuracy on adversarial examples',
              'No adversarial examples exist within radius r',
            ],
            correctAnswer: 'The classifier\'s prediction is unchanged for ALL perturbations within radius r — not just tested ones',
            explanation: 'Empirical defenses (adversarial training) are broken by stronger attacks. Certified defenses make a mathematical guarantee: for EVERY perturbation with ‖δ‖ ≤ r, the prediction is the same. This certification is provable, not empirical.',
          },
        },
        {
          id: 'r8q2c3',
          title: 'Distribution Shift and OOD Detection',
          lesson: {
            text: 'Out-of-distribution (OOD) detection identifies inputs that are far from the training distribution, where the model may be unreliable. Methods: maximum softmax probability (MSP), Mahalanobis distance in feature space, energy score. Models are often overconfident on OOD inputs — a dog photo classified as "cat" with 99.9% confidence.',
            formula: 'Energy score: E(x) = −log Σ_c exp(f_c(x))\nLow energy = in-distribution (confident), high energy = OOD',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why are neural networks dangerously overconfident on OOD inputs?',
            options: [
              'Softmax outputs sum to 1 — the network must assign high probability to one class regardless of whether the input makes sense',
              'The model has seen all possible inputs during training',
              'OOD inputs cause lower entropy outputs',
              'The final layer normalizes confidence to [0.9, 1.0]',
            ],
            correctAnswer: 'Softmax outputs sum to 1 — the network must assign high probability to one class regardless of whether the input makes sense',
            explanation: 'Softmax is a probability simplex — outputs sum to 1. Even for completely unrecognizable input (e.g., noise), one class gets near-100% probability. The model has no way to say "I don\'t know." Temperature scaling or OOD detectors address this.',
          },
        },
        {
          id: 'r8q2c4',
          title: 'Poisoning and Backdoor Attacks',
          lesson: {
            text: 'Data poisoning injects malicious samples into training data to degrade or manipulate model behavior. Backdoor attacks (Trojan attacks) implant a hidden trigger: the model behaves normally on clean inputs but misclassifies any input with a specific pattern (e.g., a yellow sticker → classify as "stop sign"). Defenses: spectral signatures, activation clustering, certified data sanitization.',
            formula: 'Backdoor: f(x) = y_correct for clean x\n       f(x + trigger) = y_target for any x',
          },
          challenge: {
            type: 'design',
            prompt: 'You are using a public pre-trained image classifier. How do you detect if it has a backdoor?',
            options: [
              'Neural Cleanse / activation clustering — reverse-engineer potential triggers or detect anomalous cluster patterns in activations',
              'Re-train the model from scratch — cleanest solution',
              'Check the model weights for zeros',
              'Test on 1000 clean images — if accuracy is high, no backdoor exists',
            ],
            correctAnswer: 'Neural Cleanse / activation clustering — reverse-engineer potential triggers or detect anomalous cluster patterns in activations',
            explanation: 'High accuracy on clean data doesn\'t rule out backdoors — that\'s the whole point. Neural Cleanse reverse-engineers the smallest perturbation that causes misclassification for each class. An abnormally small trigger indicates a backdoor. Activation clustering detects anomalous internal representations.',
          },
        },
        {
          id: 'r8q2c5',
          title: 'Privacy — Differential Privacy and Federated Learning',
          lesson: {
            text: 'Differential Privacy (DP) provides a mathematical privacy guarantee: adding/removing any one person\'s data changes the model output distribution by at most e^ε. DP-SGD adds calibrated Gaussian noise to gradients. Federated Learning trains across devices without sharing raw data — only model updates are shared. Together, they enable privacy-preserving ML.',
            formula: 'DP: P[M(D) ∈ S] ≤ e^ε · P[M(D\') ∈ S] for neighboring D, D\'\nDP-SGD: clip gradients + add Gaussian noise before optimizer step',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain what differential privacy guarantees and why it matters for training ML models on sensitive data.',
            keywords: ['privacy', 'noise', 'guarantee', 'data', 'individual', 'membership', 'epsilon', 'protection'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r8q2boss',
          title: 'BOSS: The Security Auditor',
          isBoss: true,
          lesson: {
            text: 'AI security is an adversarial game — attackers continuously find new vulnerabilities. Robust AI requires defense-in-depth: multiple overlapping security measures.',
          },
          challenge: {
            type: 'design',
            prompt: 'You deploy a medical imaging AI as a public API. What security measures are essential?',
            options: [
              'Input validation + OOD detection + adversarial robustness testing + rate limiting + audit logging',
              'Encrypt the model weights — security through obscurity',
              'Require users to sign a terms of service',
              'Only allow doctors to use the API — no public access',
            ],
            correctAnswer: 'Input validation + OOD detection + adversarial robustness testing + rate limiting + audit logging',
            explanation: 'Input validation prevents malformed inputs. OOD detection flags images too different from training data. Adversarial robustness prevents targeted attacks on diagnoses. Rate limiting prevents model extraction. Audit logging enables forensics. Defense in depth is required for high-stakes systems.',
          },
        },
      ],
    },
    {
      id: 'r8q3',
      title: 'Fairness & Bias',
      description: 'Understanding, measuring, and mitigating bias in AI systems.',
      prerequisiteQuestIds: ['r8q1'],
      chapters: [
        {
          id: 'r8q3c1',
          title: 'Sources of Bias in Data and Models',
          lesson: {
            text: 'Bias enters ML through data collection (who is included/excluded), labeling (annotator biases), historical bias (training on historically biased decisions), representation bias (minorities underrepresented), and measurement bias (proxy variables correlated with protected attributes). Removing protected attributes (race, gender) often fails — other features are proxies.',
            formula: 'Historical bias: training on biased past decisions replicates them\nProxy bias: ZIP code correlates with race → using ZIP = using race',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain why simply removing protected attributes (like race or gender) from a dataset does not guarantee a fair model.',
            keywords: ['proxy', 'correlated', 'redlining', 'zip code', 'proxy', 'attribute', 'bias', 'indirect'],
            keywordThreshold: 3,
          },
        },
        {
          id: 'r8q3c2',
          title: 'Fairness Definitions and Impossibility Theorems',
          lesson: {
            text: 'Multiple fairness definitions exist and are mutually incompatible in most settings. Demographic parity: equal positive rates across groups. Equalized odds: equal TPR and FPR across groups. Individual fairness: similar people treated similarly. The Chouldechova impossibility theorem: when base rates differ across groups, equalized odds and calibration cannot both be satisfied.',
            formula: 'Demographic parity: P(ŷ=1|A=a) = P(ŷ=1|A=b)\nEqualized odds: P(ŷ=1|y=k,A=a) = P(ŷ=1|y=k,A=b) for k∈{0,1}',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The Chouldechova impossibility theorem states that when base rates differ across groups:',
            options: [
              'Equalized odds and calibration (predictive parity) cannot both be satisfied — you must choose one',
              'All fairness metrics can be simultaneously satisfied with enough data',
              'Demographic parity is always achievable',
              'Fairness can only be achieved by removing all protected attributes',
            ],
            correctAnswer: 'Equalized odds and calibration (predictive parity) cannot both be satisfied — you must choose one',
            explanation: 'This is a mathematical impossibility, not a practical limitation. When P(y=1|A=a) ≠ P(y=1|A=b), any calibrated classifier must have different FPR or FNR across groups. Choosing which fairness criterion to optimize is a value judgment, not a technical one.',
          },
        },
        {
          id: 'r8q3c3',
          title: 'Debiasing Techniques',
          lesson: {
            text: 'Pre-processing: reweight/resample training data to equalize group representation. In-processing: add fairness constraints to the loss function (adversarial debiasing, constrained optimization). Post-processing: adjust decision thresholds per group to satisfy fairness criteria. Each approach has tradeoffs in utility, interpretability, and which fairness criterion it satisfies.',
            formula: 'Adversarial debiasing: L = L_pred + λ·L_adversary\nL_adversary: adversary tries to predict protected attribute from predictions',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Post-processing fairness adjustment (different thresholds per group) has which advantage over in-processing methods?',
            options: [
              'Works with any pre-trained model — no retraining required; simple and auditable',
              'Always achieves higher accuracy',
              'Satisfies all fairness definitions simultaneously',
              'Requires no knowledge of group membership at deployment',
            ],
            correctAnswer: 'Works with any pre-trained model — no retraining required; simple and auditable',
            explanation: 'Post-processing only adjusts the decision threshold per group, not the model itself. This is practical for deployed models: recalibrate thresholds using a held-out validation set without retraining. The tradeoff: it requires group membership at prediction time.',
          },
        },
        {
          id: 'r8q3c4',
          title: 'Auditing and Evaluation for Fairness',
          lesson: {
            text: 'Algorithmic auditing evaluates AI systems for disparate impact across groups. Fairness metrics: demographic parity ratio, equal opportunity difference, average odds difference, disparate impact ratio (< 0.8 triggers legal scrutiny in the US). Slice-based evaluation breaks down metrics by demographic group to reveal hidden disparities.',
            formula: 'Disparate Impact Ratio = P(ŷ=1|A=minority) / P(ŷ=1|A=majority)\nDIR < 0.8: potential illegal disparate impact (US EEOC guideline)',
          },
          challenge: {
            type: 'design',
            prompt: 'You are auditing an ML hiring tool for gender bias. The model has 70% overall accuracy. What is the right evaluation?',
            options: [
              'Measure accuracy, precision, recall separately for men and women; compute disparate impact ratio; test for statistical significance of any gaps',
              'Overall accuracy is the only relevant metric',
              'Retrain on gender-balanced data and check if accuracy changes',
              'Remove gender from the feature set and rerun',
            ],
            correctAnswer: 'Measure accuracy, precision, recall separately for men and women; compute disparate impact ratio; test for statistical significance of any gaps',
            explanation: 'Overall accuracy hides group-level disparities. A model with 70% accuracy might have 80% for men and 60% for women. Disparate impact ratio flags potential legal violations. Statistical significance testing ensures gaps aren\'t sampling noise.',
          },
        },
        {
          id: 'r8q3c5',
          title: 'Legal and Regulatory Frameworks',
          lesson: {
            text: 'The EU AI Act classifies systems by risk: prohibited (social scoring), high-risk (hiring, credit, healthcare — requires conformity assessments), limited risk (chatbots — requires disclosure), minimal risk. GDPR\'s Article 22 gives the right to explanation for automated decisions. US Executive Orders and FTC guidance address algorithmic accountability.',
            formula: 'EU AI Act risk tiers: unacceptable → high → limited → minimal\nHigh-risk: must document training data, accuracy metrics, human oversight',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Under the EU AI Act, an ML system used for job candidate screening is classified as:',
            options: [
              'High-risk — requires transparency, bias audits, and human oversight before deployment',
              'Minimal risk — no requirements apply',
              'Prohibited — cannot be deployed in the EU',
              'Limited risk — only disclosure is required',
            ],
            correctAnswer: 'High-risk — requires transparency, bias audits, and human oversight before deployment',
            explanation: 'The EU AI Act explicitly lists "employment, workers management and access to self-employment" as a high-risk category. Requirements: documentation of training data, accuracy/bias testing, human oversight mechanisms, and CE conformity marking.',
          },
        },
        {
          id: 'r8q3boss',
          title: 'BOSS: The Fairness Auditor',
          isBoss: true,
          lesson: {
            text: 'Fairness engineering is a cross-functional challenge requiring technical rigor and ethical judgment. This boss tests your end-to-end fairness thinking.',
          },
          challenge: {
            type: 'design',
            prompt: 'A recidivism prediction tool (used by judges) shows higher false positive rates for Black defendants than white defendants. What is the most responsible course of action?',
            options: [
              'Apply post-processing to equalize FPR across races (equalized odds); document the remaining tradeoff in accuracy; require mandatory human override',
              'Retrain with more data from Black defendants',
              'Remove race from the feature set entirely',
              'Deploy with current bias and disclose it in documentation',
            ],
            correctAnswer: 'Apply post-processing to equalize FPR across races (equalized odds); document the remaining tradeoff in accuracy; require mandatory human override',
            explanation: 'Equal FPR prevents disproportionate false imprisonment risk. Removing race doesn\'t eliminate proxy bias (neighborhood, conviction history). Disclosure alone is insufficient for high-stakes criminal justice. Human oversight acknowledges the tool\'s limitations. This is the COMPAS debate in action.',
          },
        },
      ],
    },
    {
      id: 'r8q4',
      title: 'AI Alignment',
      description: 'The technical challenge of building AI systems that reliably pursue intended goals.',
      prerequisiteQuestIds: ['r8q2'],
      chapters: [
        {
          id: 'r8q4c1',
          title: 'The Alignment Problem',
          lesson: {
            text: 'The alignment problem: how do we build AI systems that reliably do what we actually want, not just what we specified? Human values are complex, contextual, and hard to formalize. As AI systems become more capable, misaligned goals can cause catastrophic harm. The challenge scales with capability: a misaligned narrow AI is manageable; a misaligned superintelligence is not.',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain the alignment problem in your own words. Why does specifying what we want turn out to be so hard?',
            keywords: ['value', 'specify', 'formal', 'goal', 'unintended', 'complex', 'misalign', 'human'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r8q4c2',
          title: 'Reward Hacking and Specification Gaming',
          lesson: {
            text: 'Reward hacking: an agent achieves high reward without achieving the intended goal by exploiting loopholes in the reward specification. Classic examples: boat racing agent that goes in circles near shore hitting reward objects; video game agent that exploits glitches for score. Goodhart\'s Law: "when a measure becomes a target, it ceases to be a good measure."',
            formula: 'Goodhart\'s Law: ∃ policy π where R_specified(π) is high but R_true(π) is low\nSpecification gaming: optimize proxy → ignore actual objective',
          },
          challenge: {
            type: 'quiz',
            prompt: 'An RL agent trained to maximize the "number of smiling faces detected" in video feed learns to stare at a screensaver of smiling photos. This is:',
            options: [
              'Reward hacking — the agent optimized the proxy (detected smiles) not the intended goal (make people happy)',
              'Overfitting to training data',
              'A distribution shift problem',
              'Correct behavior — smiles were the specified objective',
            ],
            correctAnswer: 'Reward hacking — the agent optimized the proxy (detected smiles) not the intended goal (make people happy)',
            explanation: 'The reward proxy (smiles detected) was gamed. The agent found a policy that maximizes the measure without achieving the goal. This is specification gaming — Goodhart\'s Law in action. Robust reward specification must anticipate such exploits.',
          },
        },
        {
          id: 'r8q4c3',
          title: 'Scalable Oversight',
          lesson: {
            text: 'Scalable oversight asks: how do we supervise AI systems that may be more capable than the humans overseeing them? Debate: AI agents debate answers; humans judge the debate (the weak human can detect flaws in arguments). Recursive reward modeling: humans rate AI-assisted summaries of the AI\'s reasoning. Amplification: humans + AI tools provide better oversight than humans alone.',
            formula: 'Debate: argmax_{answer} P(human judges correct | debate over answer)\nAmplification: H^A(x) = H(A(x,H)) — human augmented by AI',
          },
          challenge: {
            type: 'design',
            prompt: 'You need to verify the correctness of AI-generated code that is too complex for any human to review in reasonable time. What is the most promising oversight approach?',
            options: [
              'AI Debate — have the AI explain/defend its code while another AI attacks it; humans judge the debate, detecting issues via arguments',
              'Hire more humans to review the code manually',
              'Use automated test suites only',
              'Trust the model — its training loss is low',
            ],
            correctAnswer: 'AI Debate — have the AI explain/defend its code while another AI attacks it; humans judge the debate, detecting issues via arguments',
            explanation: 'Humans can judge a debate argument without understanding the full code. The attacking AI is incentivized to find real bugs; the defending AI must address them honestly (or lose). This is scalable: debate scales with AI capability, not human review time.',
          },
        },
        {
          id: 'r8q4c4',
          title: 'Constitutional AI and Value Learning',
          lesson: {
            text: 'Constitutional AI (Anthropic) trains models to follow a set of principles. Step 1: AI critiques and revises its own outputs based on principles (RLAIF — RL from AI feedback). Step 2: Human feedback fine-tuning. Inverse Reward Design infers reward functions from human behavior. IRL (Inverse Reinforcement Learning) learns reward functions from expert demonstrations.',
            formula: 'CAI: model critiques output against principles → revises → RLAIF\nIRL: infer R(s,a) such that expert behavior is near-optimal under R',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Constitutional AI improves on RLHF by:',
            options: [
              'Using AI-generated feedback based on explicit principles — scaling oversight without requiring as much human comparison data',
              'Removing the need for any human feedback',
              'Using a larger reward model',
              'Replacing PPO with a constitutional gradient estimator',
            ],
            correctAnswer: 'Using AI-generated feedback based on explicit principles — scaling oversight without requiring as much human comparison data',
            explanation: 'RLHF requires human comparisons for every behavior. CAI uses the AI to generate its own critiques based on written principles — scaling the feedback loop. The principles (constitution) can be written once and applied at scale.',
          },
        },
        {
          id: 'r8q4c5',
          title: 'Existential Risk and Long-Horizon Safety',
          lesson: {
            text: 'Existential risk: advanced AI that is misaligned with human values could cause catastrophic, irreversible harm at civilizational scale. Instrumental convergence: many goals imply subgoals like self-preservation, resource acquisition, and resisting modification. Corrigibility (willingness to be corrected) and containment are active research areas. The orthogonality thesis: intelligence and goals are independent axes.',
            formula: 'Orthogonality thesis: any level of intelligence can be paired with any goal\nInstrumental convergence: most goals → self-preservation + resource acquisition',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain the concept of instrumental convergence and why it matters for AI safety, regardless of what goals an AI is given.',
            keywords: ['instrumental', 'convergence', 'goal', 'self-preservation', 'resource', 'power', 'sub-goal', 'dangerous'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r8q4boss',
          title: 'BOSS: The Alignment Strategist',
          isBoss: true,
          lesson: {
            text: 'Alignment is the defining challenge of the AI age. The approaches we use today will shape whether advanced AI is safe and beneficial.',
          },
          challenge: {
            type: 'design',
            prompt: 'You are deploying a powerful AI assistant that helps users accomplish complex tasks. What is the single most important alignment safeguard?',
            options: [
              'Corrigibility mechanism + human oversight — the AI should proactively surface uncertainty and defer to humans on consequential actions',
              'Maximum capability — a smarter AI will figure out what we want',
              'Rule-based blocklists of harmful outputs',
              'Optimize purely for user satisfaction scores',
            ],
            correctAnswer: 'Corrigibility mechanism + human oversight — the AI should proactively surface uncertainty and defer to humans on consequential actions',
            explanation: 'Blocklists are brittle (can be jailbroken). Satisfaction optimization incentivizes flattery over honesty. Maximum capability without alignment is dangerous. Corrigibility — the AI actively helping humans stay in control — is the most robust alignment property for powerful systems.',
          },
        },
      ],
    },
    {
      id: 'r8q5',
      title: 'Societal Impact',
      description: 'The broader consequences of AI — labor, misinformation, surveillance, environment, and governance.',
      prerequisiteQuestIds: ['r8q3'],
      chapters: [
        {
          id: 'r8q5c1',
          title: 'Labor Market Effects of Automation',
          lesson: {
            text: 'AI automates cognitive tasks at scale. Historical automation replaced physical labor; AI targets knowledge work. Goldman Sachs (2023) estimated 300M jobs could be affected by generative AI. The economic debate: augmentation (AI makes workers more productive) vs. displacement (AI replaces workers). Policy tools: universal basic income, retraining programs, automation taxes.',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain the economic argument that AI will augment rather than replace workers, and one key reason this argument may be overly optimistic.',
            keywords: ['complement', 'augment', 'productivity', 'task', 'displacement', 'skill', 'wage', 'transition'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r8q5c2',
          title: 'AI and Misinformation',
          lesson: {
            text: 'Generative AI enables cheap, scalable production of disinformation: deepfake videos, synthetic voices, AI-written propaganda. Detection methods: C2PA provenance standards (cryptographic watermarking), statistical detectors (too-perfect text, GAN artifacts). The arms race between generation and detection, and the challenge that "a lie travels halfway around the world before truth puts on its shoes."',
            formula: 'Liar\'s dividend: even real videos can be dismissed as "deepfakes"\nDetection: always reactive — generators improve faster than detectors',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The "liar\'s dividend" describes:',
            options: [
              'The ability to dismiss real evidence as AI-generated, even when it is authentic',
              'Financial benefit to companies that sell AI detection tools',
              'AI systems that lie to gain rewards',
              'The advantage deepfake creators have over detectors',
            ],
            correctAnswer: 'The ability to dismiss real evidence as AI-generated, even when it is authentic',
            explanation: 'The existence of convincing deepfakes gives plausible deniability to bad actors: real photos/videos can now be dismissed as "fake." This "liar\'s dividend" may actually harm truth more than the deepfakes themselves — authenticity becomes unverifiable.',
          },
        },
        {
          id: 'r8q5c3',
          title: 'Surveillance, Privacy, and Civil Liberties',
          lesson: {
            text: 'AI-powered surveillance: facial recognition in public spaces, predictive policing (ShotSpotter), social media monitoring, gait recognition. Privacy risks: mass surveillance chilling effects on free speech and assembly. Several US cities have banned police use of facial recognition. The EU AI Act prohibits real-time biometric surveillance in public spaces (with exceptions).',
          },
          challenge: {
            type: 'design',
            prompt: 'A city proposes deploying real-time facial recognition cameras in all public spaces to "reduce crime." What is the most balanced policy response?',
            options: [
              'Conditional ban or strict regulation: require judicial oversight, prohibit pretrial detention without human review, mandate bias audits, and sunset clauses for review',
              'Full deployment — crime reduction benefits outweigh privacy costs',
              'Complete ban — privacy rights are absolute',
              'Deploy only in high-crime areas to balance effectiveness and coverage',
            ],
            correctAnswer: 'Conditional ban or strict regulation: require judicial oversight, prohibit pretrial detention without human review, mandate bias audits, and sunset clauses for review',
            explanation: 'Real-time surveillance has documented false positive harms (wrongful arrests of innocent people). Oversight (warrant requirements), bias auditing (facial recognition has documented higher FPR for dark-skinned faces), and human review are minimum safeguards. Blanket bans or unconstrained deployment both ignore nuance.',
          },
        },
        {
          id: 'r8q5c4',
          title: 'Environmental Cost of AI',
          lesson: {
            text: 'Training GPT-3 consumed ~1,287 MWh — equivalent to 300 round-trip transatlantic flights. A ChatGPT query uses ~10× more energy than a Google search. Data centers consume ~1-2% of global electricity. The carbon footprint depends heavily on grid energy mix. Mitigation: efficient architectures (sparse models, MoE), hardware efficiency (Tensor Cores, low-precision), and clean energy data centers.',
            formula: 'Training cost: FLOPs × energy per FLOP × carbon intensity of grid\nFLOPs ≈ 6·N·D  (N=params, D=tokens, approximate)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Which intervention most effectively reduces the carbon footprint of AI model training?',
            options: [
              'Using data centers powered by renewable energy — carbon intensity of the grid is the dominant factor',
              'Using FP16 instead of FP32 — halves memory, same carbon',
              'Reducing batch size',
              'Training for fewer epochs regardless of convergence',
            ],
            correctAnswer: 'Using data centers powered by renewable energy — carbon intensity of the grid is the dominant factor',
            explanation: 'The same computation has near-zero carbon on a 100% renewable grid and significant carbon on a coal-powered grid. Microsoft, Google, and Anthropic are all investing in data center renewable energy because it is the highest-leverage carbon reduction.',
          },
        },
        {
          id: 'r8q5c5',
          title: 'Global Governance and AI Policy',
          lesson: {
            text: 'AI governance approaches: prescriptive regulation (EU AI Act — risk tiers with mandatory requirements), principles-based (UK — flexible guidelines), voluntary commitments (US frontier AI safety commitments), international coordination (G7 Hiroshima Process, UN AI Advisory Body). Key tensions: innovation vs. safety, national AI competition vs. global coordination, jurisdiction over global AI systems.',
          },
          challenge: {
            type: 'design',
            prompt: 'A frontier AI lab is developing a model that may have dangerous capabilities. What governance mechanism is most likely to ensure safety without stifling innovation?',
            options: [
              'Mandatory pre-deployment safety evaluations (dangerous capability assessments) with government review for models above a compute threshold',
              'Complete ban on frontier AI development',
              'Self-regulation — labs pledge to be responsible',
              'Post-deployment monitoring only — evaluate harms after release',
            ],
            correctAnswer: 'Mandatory pre-deployment safety evaluations (dangerous capability assessments) with government review for models above a compute threshold',
            explanation: 'Self-regulation has insufficient accountability (economic incentives to deploy). Post-deployment monitoring is too late for catastrophic harms. Compute thresholds (as in UK AI Safety Institute evaluations, US EO 14110) target the most powerful models. Pre-deployment evaluation is the core of responsible governance without banning development.',
          },
        },
        {
          id: 'r8q5boss',
          title: 'BOSS: The AI Governance Sage',
          isBoss: true,
          lesson: {
            text: 'AI practitioners are not just engineers — they are participants in shaping how AI affects society. The governance choices made today will determine whether AI is beneficial for all.',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'A powerful AI system you helped build is being deployed by a government for mass surveillance of political dissidents. As the engineer who built it, what is your ethical responsibility and what actions should you take?',
            keywords: ['responsibility', 'refuse', 'whistleblower', 'harm', 'ethics', 'accountability', 'dissent', 'action'],
            keywordThreshold: 4,
          },
        },
      ],
    },
  ],
};
