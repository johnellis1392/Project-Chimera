import type { Realm } from '../types';

export const realm3: Realm = {
  id: 'r3',
  title: 'Deep Learning',
  subtitle: 'When machines learned to see in layers',
  icon: '🔥',
  description: 'Neural networks, backpropagation, CNNs, RNNs, and the Transformer architecture that powers modern AI.',
  prerequisiteRealmIds: ['r1', 'r2'],
  quests: [
    {
      id: 'r3q1',
      title: 'The Neural Foundations',
      description: 'Neurons, activations, and the mechanics of forward and backward passes.',
      chapters: [
        {
          id: 'r3q1c1',
          title: 'The Artificial Neuron',
          lesson: {
            text: 'An artificial neuron computes a weighted sum of inputs plus a bias, then passes the result through a non-linear activation function: y = σ(wᵀx + b). Multiple neurons in parallel form a layer. The weights w and bias b are the learnable parameters.',
            formula: 'y = σ(wᵀx + b) = σ(Σᵢ wᵢxᵢ + b)',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement a single neuron forward pass with ReLU activation. Given weight vector w (array), input x (array), and bias b, return max(0, w·x + b).',
            template: 'function neuron(w, x, b) {\n  const z = w.reduce((s, wi, i) => s + wi * x[i], 0) + b;\n  return // ReLU activation\n}',
            validationRegex: 'Math\\.max\\s*\\(\\s*0\\s*,\\s*z\\s*\\)',
          },
        },
        {
          id: 'r3q1c2',
          title: 'Activation Functions',
          lesson: {
            text: 'Non-linear activation functions allow networks to learn complex functions. ReLU (most common) is fast and avoids vanishing gradients. Sigmoid squashes to (0,1) — used in output layers for binary classification. Tanh squashes to (−1,1). GELU and Swish are smoother alternatives used in transformers.',
            formula: 'ReLU(z) = max(0, z)\nSigmoid(z) = 1/(1+e^{-z})\nGELU(z) ≈ z·Φ(z)',
          },
          challenge: {
            type: 'flashcard',
            prompt: 'Study these activation functions and their key properties.',
            cards: [
              { term: 'ReLU', definition: 'max(0, z). Simple, fast, avoids vanishing gradient for z>0. Dead neurons problem: z<0 gives zero gradient permanently.' },
              { term: 'Sigmoid', definition: '1/(1+e^{-z}). Output in (0,1). Suffers vanishing gradients for large |z|. Used in binary classification outputs.' },
              { term: 'Tanh', definition: '(e^z - e^{-z})/(e^z + e^{-z}). Output in (-1,1). Zero-centered (better than sigmoid), but still vanishes for large |z|.' },
              { term: 'GELU', definition: 'z·Φ(z) where Φ is the Gaussian CDF. Smooth approximation used in BERT, GPT. Stochastic interpretation: gate z by Bernoulli(Φ(z)).' },
              { term: 'Leaky ReLU', definition: 'max(αz, z) where α is small (e.g., 0.01). Fixes dead neuron problem by allowing small negative gradients.' },
            ],
          },
        },
        {
          id: 'r3q1c3',
          title: 'Forward Pass and Computational Graphs',
          lesson: {
            text: 'The forward pass computes the network output by chaining layer operations: x → h₁ → h₂ → ... → ŷ. Each operation is a node in a computational graph that stores inputs for the backward pass. Frameworks like PyTorch build this graph dynamically (eager execution).',
            formula: 'Layer l: hˡ = σ(Wˡ hˡ⁻¹ + bˡ)\nOutput: ŷ = softmax(Wᴸ hᴸ⁻¹ + bᴸ)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why does the forward pass store intermediate activations?',
            options: [
              'They are needed to compute gradients during backpropagation',
              'They reduce memory usage',
              'They are the final output of the network',
              'They serve as regularization',
            ],
            correctAnswer: 'They are needed to compute gradients during backpropagation',
            explanation: 'The chain rule requires the input to each function to compute its gradient. Activations cached during the forward pass are used in the backward pass to compute ∂L/∂W.',
          },
        },
        {
          id: 'r3q1c4',
          title: 'Backpropagation',
          lesson: {
            text: 'Backpropagation efficiently computes gradients for all parameters by applying the chain rule backward through the computational graph. Starting from the loss, each node receives the upstream gradient δ and propagates δ_local × δ_upstream to its inputs. The key insight is that gradients can be shared across all training examples.',
            formula: '∂L/∂Wˡ = (∂L/∂hˡ) · (∂hˡ/∂Wˡ)\nδˡ = ((Wˡ⁺¹)ᵀ δˡ⁺¹) ⊙ σ\'(zˡ)',
          },
          challenge: {
            type: 'derivation',
            prompt: 'Derive the backprop gradient for a single linear layer y = Wx.',
            steps: [
              {
                prompt: 'Step 1 — Given upstream gradient ∂L/∂y (shape: m), we want ∂L/∂W. Using the chain rule: ∂L/∂W_{ij} = (∂L/∂yᵢ)·(∂yᵢ/∂W_{ij}). What is ∂yᵢ/∂W_{ij}?',
                options: ['xⱼ', 'yᵢ', 'W_{ij}', '1'],
                correctAnswer: 'xⱼ',
              },
              {
                prompt: 'Step 2 — So ∂L/∂W_{ij} = (∂L/∂yᵢ)·xⱼ. In matrix form, ∂L/∂W equals:',
                options: ['(∂L/∂y)·xᵀ  (outer product)', 'xᵀ·(∂L/∂y)', '(∂L/∂y)ᵀ·x', 'W⁻¹·(∂L/∂y)'],
                correctAnswer: '(∂L/∂y)·xᵀ  (outer product)',
              },
              {
                prompt: 'Step 3 — What is ∂L/∂x (to propagate further back)?',
                options: ['Wᵀ·(∂L/∂y)', 'W·(∂L/∂y)', '(∂L/∂y)/x', 'Wᵀ·x'],
                correctAnswer: 'Wᵀ·(∂L/∂y)',
              },
            ],
          },
        },
        {
          id: 'r3q1c5',
          title: 'Weight Initialization Strategies',
          lesson: {
            text: 'Initialization matters critically. All-zero weights make all neurons identical (symmetry problem). Random normal with small variance causes vanishing/exploding signals in deep networks. Xavier/Glorot initialization scales by 1/√nᵢₙ; He initialization scales by √(2/nᵢₙ) and is suited for ReLU layers.',
            formula: 'Xavier: W ~ Uniform[-√(6/(nᵢₙ+nₒᵤₜ)), +√(6/(nᵢₙ+nₒᵤₜ))]\nHe: W ~ N(0, 2/nᵢₙ)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why is initializing all weights to zero a problem?',
            options: [
              'All neurons compute identical gradients — the network cannot break symmetry',
              'Zero weights cause division by zero in the backward pass',
              'The loss starts at zero, so no learning occurs',
              'It violates the conditions of the universal approximation theorem',
            ],
            correctAnswer: 'All neurons compute identical gradients — the network cannot break symmetry',
            explanation: 'With all weights equal, every neuron in a layer produces the same output and receives the same gradient. They learn the same thing — effectively a 1-neuron layer regardless of width.',
          },
        },
        {
          id: 'r3q1boss',
          title: 'BOSS: The Backprop Engine',
          isBoss: true,
          lesson: {
            text: 'Backpropagation is the algorithm that makes deep learning tractable. This boss challenges you to implement it for the simplest possible case: a single-layer network.',
            formula: 'L = MSE(Wx, y)\n∂L/∂W = (2/n)(Wx−y)xᵀ',
          },
          challenge: {
            type: 'code',
            prompt: 'Implement the gradient of MSE loss w.r.t. W for a single layer y_pred = W*x (W is a scalar, x and y are scalars). Return dL/dW.',
            template: 'function gradW(W, x, y) {\n  const y_pred = W * x;\n  // MSE loss gradient: d/dW of (y_pred - y)^2\n  return // your code here\n}',
            validationRegex: '2\\s*\\*\\s*\\(.*W\\s*\\*\\s*x\\s*-\\s*y.*\\)\\s*\\*\\s*x|2\\s*\\*\\s*x\\s*\\*\\s*\\(.*W\\s*\\*\\s*x\\s*-\\s*y',
          },
        },
      ],
    },
    {
      id: 'r3q2',
      title: 'Training Dynamics',
      description: 'Optimizers, normalization, regularization — making deep networks actually converge.',
      prerequisiteQuestIds: ['r3q1'],
      chapters: [
        {
          id: 'r3q2c1',
          title: 'Gradient Descent Variants — SGD, Momentum, Adam',
          lesson: {
            text: 'Vanilla SGD updates weights using a noisy gradient from a mini-batch. Momentum accumulates a velocity vector to dampen oscillations and accelerate convergence. Adam combines momentum with adaptive per-parameter learning rates using estimates of first (mean) and second (variance) gradient moments.',
            formula: 'SGD: w ← w − η·∇L\nAdam: m̂ = m/(1−β₁ᵗ), v̂ = v/(1−β₂ᵗ), w ← w − η·m̂/√(v̂+ε)',
          },
          challenge: {
            type: 'flashcard',
            prompt: 'Learn the key gradient descent optimizers used in deep learning.',
            cards: [
              { term: 'SGD with Momentum', definition: 'Accumulates velocity v = βv − η∇L, then w += v. Dampens oscillations, accelerates along consistent gradient directions.' },
              { term: 'RMSprop', definition: 'Maintains a moving average of squared gradients to scale the learning rate: w -= η·∇L / √(E[∇²]+ε). Adapts per-parameter.' },
              { term: 'Adam', definition: 'First moment (momentum) m and second moment (RMS) v with bias correction. Combines benefits of momentum + RMSprop. Default for most deep learning.' },
              { term: 'AdamW', definition: 'Adam with weight decay decoupled from the gradient update. Fixes L2 regularization in Adam (standard Adam conflates weight decay with adaptive scaling).' },
              { term: 'Learning Rate Warmup', definition: 'Start with small LR and increase over N steps. Prevents early divergence with Adam. Common in transformer training.' },
            ],
          },
        },
        {
          id: 'r3q2c2',
          title: 'Learning Rate Schedules',
          lesson: {
            text: 'A fixed learning rate is suboptimal: too high early causes divergence, too low late causes slow convergence. Cosine annealing decays the LR along a cosine curve, often with warm restarts. Linear warmup followed by cosine decay is standard for transformers. Cyclical LRs explore the loss landscape more broadly.',
            formula: 'Cosine: η(t) = η_min + (η_max−η_min)/2 · (1 + cos(πt/T))',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why is learning rate warmup especially important when training with Adam?',
            options: [
              'Adam\'s second moment estimate is unreliable early — warmup prevents large noisy updates',
              'It speeds up convergence in the first epoch',
              'Adam diverges without warmup due to numerical instability',
              'Warmup is only needed for SGD, not Adam',
            ],
            correctAnswer: 'Adam\'s second moment estimate is unreliable early — warmup prevents large noisy updates',
            explanation: 'Adam\'s v estimate of E[∇²] starts near zero — making η/√v artificially large. Warmup keeps the effective learning rate small until v stabilizes after enough gradient steps.',
          },
        },
        {
          id: 'r3q2c3',
          title: 'Batch Normalization',
          lesson: {
            text: 'Batch Normalization (BatchNorm) normalizes each feature to zero mean and unit variance within a mini-batch, then applies learnable scale γ and shift β. It reduces internal covariate shift, allows higher learning rates, and acts as mild regularization. Layer Norm (used in transformers) normalizes across features instead of across the batch.',
            formula: 'x̂ᵢ = (xᵢ − μ_B) / √(σ²_B + ε)\ny = γ·x̂ + β',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain why Batch Normalization helps training and why it acts as a regularizer.',
            keywords: ['normalize', 'covariate', 'mean', 'variance', 'gradient', 'learning rate', 'noise', 'batch'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r3q2c4',
          title: 'Dropout and Regularization',
          lesson: {
            text: 'Dropout randomly zeroes each activation with probability p during training, forcing the network to learn redundant representations. At inference, all units are active and activations are scaled by (1−p). Dropout can be interpreted as training an ensemble of 2^N different subnetworks. L2 weight decay is another common regularizer.',
            formula: 'Training: hᵢ = hᵢ · Bernoulli(1−p) / (1−p)\nInference: hᵢ = hᵢ  (all units active)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why is dropout NOT applied during inference (testing)?',
            options: [
              'We use the full network at inference to get deterministic, accurate predictions',
              'Dropout would make the network faster at inference',
              'The training loss would be too high otherwise',
              'Dropout only works on convolutional layers',
            ],
            correctAnswer: 'We use the full network at inference to get deterministic, accurate predictions',
            explanation: 'Dropout stochastically disables neurons during training to prevent co-adaptation. At inference we want maximum accuracy — all neurons active, activations scaled to match expected training behavior.',
          },
        },
        {
          id: 'r3q2c5',
          title: 'Loss Landscapes and Saddle Points',
          lesson: {
            text: 'The loss landscape of a deep network is high-dimensional and non-convex. Modern networks have many local minima, but empirically most local minima have similar loss to the global minimum. Saddle points (where gradient is zero but not a minimum) are abundant in high dimensions — gradient noise from SGD helps escape them.',
            formula: 'Saddle point: ∇L = 0 but Hessian has both positive and negative eigenvalues\nSGD noise helps escape saddles; sharp minima generalize worse than flat ones',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Research suggests that flat minima generalize better than sharp minima. Why?',
            options: [
              'Flat minima are robust to small parameter perturbations — the loss stays low near the solution',
              'Flat minima have lower training loss',
              'Gradient descent always converges to flat minima',
              'Flat minima require fewer parameters',
            ],
            correctAnswer: 'Flat minima are robust to small parameter perturbations — the loss stays low near the solution',
            explanation: 'A flat minimum has low curvature — slightly perturbed parameters still give low loss. This correlates with robustness to distribution shift. Sharp minima are narrow wells that easily fall off with slight weight changes.',
          },
        },
        {
          id: 'r3q2boss',
          title: 'BOSS: The Optimizer Sage',
          isBoss: true,
          lesson: {
            text: 'Choosing the right optimizer and learning rate schedule can make the difference between a converging run and a failed one. This boss tests your ability to diagnose and prescribe.',
          },
          challenge: {
            type: 'design',
            prompt: 'You\'re training a large transformer. Training loss decreases but then suddenly spikes to NaN after 5000 steps. What is most likely the cause and fix?',
            options: [
              'Learning rate too high + no gradient clipping — add gradient clipping (max_norm=1.0) and/or reduce LR',
              'Not enough dropout — add dropout=0.5 throughout',
              'Batch size too large — reduce to batch size 1',
              'Adam beta values need tuning — switch to SGD',
            ],
            correctAnswer: 'Learning rate too high + no gradient clipping — add gradient clipping (max_norm=1.0) and/or reduce LR',
            explanation: 'NaN loss is a classic sign of gradient explosion. Gradient clipping caps the gradient norm before the update, preventing individual large gradients from dominating. Common fix for RNNs and transformers.',
          },
        },
      ],
    },
    {
      id: 'r3q3',
      title: 'Convolutional Networks',
      description: 'Translation-equivariant architectures for images and structured data.',
      prerequisiteQuestIds: ['r3q1'],
      chapters: [
        {
          id: 'r3q3c1',
          title: 'The Convolution Operation',
          lesson: {
            text: 'A convolution slides a small filter (kernel) across the input, computing a weighted sum at each position. This gives translation equivariance: a feature detected anywhere triggers the same filter. Convolutions are highly parameter-efficient: a 3×3 filter applied to a 256-channel feature map has only 3×3×256 parameters regardless of spatial size.',
            formula: '(f * g)[i] = Σⱼ f[j]·g[i−j]\nOutput size: (W−F+2P)/S + 1',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A convolutional layer has 64 filters of size 3×3 applied to an input with 32 channels. How many learnable parameters does it have (ignoring bias)?',
            options: ['3×3×32×64 = 18,432', '3×3×64 = 576', '32×64 = 2,048', '3×3×32 = 288'],
            correctAnswer: '3×3×32×64 = 18,432',
            explanation: 'Each filter is 3×3×32 (3×3 spatial, 32 input channels). With 64 filters: 9×32×64 = 18,432 parameters. This is channel-independent of spatial input size.',
          },
        },
        {
          id: 'r3q3c2',
          title: 'Pooling and Spatial Hierarchies',
          lesson: {
            text: 'Pooling reduces spatial dimensions and introduces translation invariance. Max pooling takes the maximum value in each window — preserves dominant features. Average pooling computes the mean. Strided convolutions are a learned alternative to pooling. Deep hierarchies: early layers detect edges, later layers detect parts, final layers detect objects.',
            formula: 'MaxPool: y[i,j] = max over k,l in window of x[i+k, j+l]\nReceptive field grows with depth',
          },
          challenge: {
            type: 'quiz',
            prompt: 'After applying a 2×2 max pool with stride 2 to a 32×32 feature map, the output is:',
            options: ['16×16', '30×30', '31×31', '8×8'],
            correctAnswer: '16×16',
            explanation: 'With stride 2 and window 2×2, each dimension is halved: (32−2)/2 + 1 = 16. The spatial resolution is halved, compressing the feature map.',
          },
        },
        {
          id: 'r3q3c3',
          title: 'Classic Architectures — AlexNet, VGG, ResNet',
          lesson: {
            text: 'AlexNet (2012) won ImageNet by stacking conv layers with ReLU and dropout. VGG showed depth matters — using only 3×3 convolutions. ResNet introduced skip connections (residual connections): x_{l+1} = x_l + F(x_l), solving the vanishing gradient problem and enabling 100+ layer networks.',
            formula: 'ResNet block: y = F(x, W) + x\nGradient flows directly: ∂L/∂x = ∂L/∂y · (1 + ∂F/∂x)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'ResNet\'s skip connections help training very deep networks by:',
            options: [
              'Providing a gradient highway — gradients flow directly to early layers without vanishing',
              'Reducing the number of parameters',
              'Replacing batch normalization',
              'Making the network translation invariant',
            ],
            correctAnswer: 'Providing a gradient highway — gradients flow directly to early layers without vanishing',
            explanation: 'The identity skip connection means ∂L/∂xˡ = ∂L/∂xᴸ · (1 + ...). The "1" term guarantees the gradient reaches early layers without being multiplied to zero through many layers.',
          },
        },
        {
          id: 'r3q3c4',
          title: 'Object Detection — YOLO, R-CNN',
          lesson: {
            text: 'Object detection localizes and classifies multiple objects simultaneously. R-CNN extracts region proposals then classifies each — accurate but slow. YOLO divides the image into a grid and predicts boxes + classes for each cell in a single forward pass — fast and real-time capable. Modern detectors balance speed and accuracy.',
            formula: 'Detection loss = classification + localization + objectness\nIoU = Area(A∩B) / Area(A∪B)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'IoU (Intersection over Union) of 1.0 means:',
            options: ['Perfect overlap — predicted box exactly matches ground truth', 'No overlap', 'Half overlap', 'IoU > 1 is impossible'],
            correctAnswer: 'Perfect overlap — predicted box exactly matches ground truth',
            explanation: 'IoU = |A∩B| / |A∪B|. When the boxes are identical, the intersection equals the union: IoU = 1.0. An IoU of 0 means no overlap at all.',
          },
        },
        {
          id: 'r3q3c5',
          title: 'Semantic Segmentation',
          lesson: {
            text: 'Semantic segmentation assigns a class label to every pixel. Encoder-decoder architectures (like U-Net) use a contracting path to capture context and an expanding path to restore spatial resolution. Skip connections between encoder and decoder preserve fine-grained detail. FCN (Fully Convolutional Network) replaced dense layers with 1×1 convolutions for pixel-wise prediction.',
            formula: 'U-Net: skip connections between encoder level l and decoder level L-l\nPixel loss: cross-entropy averaged over all pixels',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why do segmentation architectures like U-Net use skip connections between the encoder and decoder?',
            options: [
              'To restore fine spatial details lost during the encoder\'s downsampling',
              'To reduce the number of parameters',
              'To bypass the encoder entirely',
              'To match the receptive field to the input resolution',
            ],
            correctAnswer: 'To restore fine spatial details lost during the encoder\'s downsampling',
            explanation: 'The encoder compresses spatial info to capture semantic context. The skip connections bring back the fine-grained spatial features from the encoder, critical for pixel-accurate boundary prediction.',
          },
        },
        {
          id: 'r3q3boss',
          title: 'BOSS: The Convolution Calculator',
          isBoss: true,
          lesson: {
            text: 'Understanding convolution output sizes is essential for debugging CNN architectures. A single miscalculation causes shape mismatches that crash training.',
            formula: 'Output size: ⌊(W − F + 2P) / S⌋ + 1\nW=input, F=filter, P=padding, S=stride',
          },
          challenge: {
            type: 'design',
            prompt: 'Input: 224×224×3. Conv1: 7×7, stride=2, padding=3, 64 filters. MaxPool: 3×3, stride=2. What is the spatial size after MaxPool?',
            options: ['56×56', '112×112', '28×28', '14×14'],
            correctAnswer: '56×56',
            explanation: 'After Conv1: ⌊(224−7+6)/2⌋+1 = ⌊223/2⌋+1 = 112. After MaxPool: ⌊(112−3)/2⌋+1 = ⌊109/2⌋+1 = 55? No — PyTorch pads to get 56. This is the ResNet-50 stem: 224→112→56.',
          },
        },
      ],
    },
    {
      id: 'r3q4',
      title: 'Sequential Models',
      description: 'Recurrent networks and the challenge of long-range dependencies.',
      prerequisiteQuestIds: ['r3q1'],
      chapters: [
        {
          id: 'r3q4c1',
          title: 'Recurrent Neural Networks',
          lesson: {
            text: 'RNNs process sequences by maintaining a hidden state hₜ that summarizes history: hₜ = σ(Wₕhₜ₋₁ + Wₓxₜ + b). The same weights are used at every timestep (parameter sharing). Backpropagation through time (BPTT) unrolls the RNN and applies the chain rule — but gradients must propagate through many multiplications.',
            formula: 'hₜ = tanh(Wₕhₜ₋₁ + Wₓxₜ + b)\nyₜ = Wᵧhₜ',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why are RNNs difficult to train on very long sequences?',
            options: [
              'Gradients are multiplied through T timesteps — they vanish or explode',
              'RNNs cannot handle variable-length sequences',
              'The hidden state is too large for long sequences',
              'BPTT is computationally impossible for sequences longer than 100 steps',
            ],
            correctAnswer: 'Gradients are multiplied through T timesteps — they vanish or explode',
            explanation: 'Each BPTT step multiplies the gradient by Wₕ. If |λ| < 1 of Wₕ\'s eigenvalues, gradients vanish exponentially; if |λ| > 1, they explode. This is the fundamental long-range dependency problem.',
          },
        },
        {
          id: 'r3q4c2',
          title: 'Vanishing Gradients and LSTMs',
          lesson: {
            text: 'LSTMs (Long Short-Term Memory) solve vanishing gradients via a cell state cₜ with additive updates — gradients flow back unobstructed through the "constant error carousel." Three gates (forget, input, output) control information flow: the forget gate decides what to erase, the input gate decides what to write, the output gate decides what to expose.',
            formula: 'fₜ = σ(Wf[hₜ₋₁, xₜ] + bf)  (forget gate)\ncₜ = fₜ⊙cₜ₋₁ + iₜ⊙c̃ₜ  (cell state update)\nhₜ = oₜ⊙tanh(cₜ)  (output)',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain how the LSTM cell state solves the vanishing gradient problem that plagues vanilla RNNs.',
            keywords: ['cell state', 'forget gate', 'additive', 'gradient', 'vanish', 'long-range', 'constant', 'unobstructed'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r3q4c3',
          title: 'GRUs and Sequence-to-Sequence Models',
          lesson: {
            text: 'GRUs (Gated Recurrent Units) simplify LSTMs to two gates: reset and update. They achieve similar performance with fewer parameters. Seq2seq models use an encoder RNN to compress input to a context vector, then a decoder RNN generates the output sequence — the architecture behind early machine translation.',
            formula: 'GRU update: hₜ = (1−zₜ)⊙hₜ₋₁ + zₜ⊙h̃ₜ\nzₜ = σ(Wz[hₜ₋₁, xₜ])',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The main bottleneck of the vanilla seq2seq architecture (RNN encoder-decoder) is:',
            options: [
              'The entire input sequence must be compressed into a single fixed-size context vector',
              'RNNs cannot handle variable-length outputs',
              'The decoder cannot attend to input tokens',
              'Seq2seq models cannot be trained with gradient descent',
            ],
            correctAnswer: 'The entire input sequence must be compressed into a single fixed-size context vector',
            explanation: 'Long inputs overwhelm a fixed-size hidden state. This bottleneck motivated the attention mechanism — the decoder can look at all encoder states, not just the final one.',
          },
        },
        {
          id: 'r3q4c4',
          title: 'Temporal Convolutional Networks',
          lesson: {
            text: 'Temporal Convolutional Networks (TCNs) apply 1D dilated causal convolutions to sequences. Dilation exponentially expands the receptive field while keeping computational cost linear. TCNs process entire sequences in parallel (unlike RNNs), are easier to train, and match LSTM performance on many tasks.',
            formula: 'Dilated conv: (x *_d f)[t] = Σⱼ f[j]·x[t − d·j]\nDilation d doubles each layer: 1, 2, 4, 8, ...',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A TCN with 5 dilated conv layers (dilations 1,2,4,8,16) and filter size 3 has a receptive field of:',
            options: ['(3−1)·(1+2+4+8+16) + 1 = 63', '3×5 = 15', '2^5 = 32', '5×16 = 80'],
            correctAnswer: '(3−1)·(1+2+4+8+16) + 1 = 63',
            explanation: 'Receptive field = (filter_size − 1) × Σ dilations + 1 = 2×31+1 = 63. Doubling dilation per layer gives exponential receptive field growth with linear parameters.',
          },
        },
        {
          id: 'r3q4c5',
          title: 'CTC Loss and Speech Applications',
          lesson: {
            text: 'CTC (Connectionist Temporal Classification) allows RNNs to output sequences without alignment labels. It sums over all possible alignments between input frames and output tokens using dynamic programming. CTC introduces a blank token to handle repeated characters and gaps. Used in end-to-end speech recognition.',
            formula: 'P(y|x) = Σ_{all alignments π: B(π)=y} P(π|x)\nB(π) = collapse repeats + remove blanks',
          },
          challenge: {
            type: 'quiz',
            prompt: 'CTC loss is particularly useful when:',
            options: [
              'The alignment between input frames and output tokens is unknown/variable',
              'The output sequence is always the same length as the input',
              'You have frame-level annotation for every audio sample',
              'You need faster training than cross-entropy',
            ],
            correctAnswer: 'The alignment between input frames and output tokens is unknown/variable',
            explanation: 'In speech recognition, we know the words but not exactly which audio frames correspond to which phonemes. CTC marginalizes over all possible alignments automatically.',
          },
        },
        {
          id: 'r3q4boss',
          title: 'BOSS: The Sequential Strategist',
          isBoss: true,
          lesson: {
            text: 'RNNs, LSTMs, GRUs, and TCNs each have different strengths. The right choice depends on sequence length, parallelism needs, and whether long-range dependencies matter.',
          },
          challenge: {
            type: 'design',
            prompt: 'You need to model short stock price sequences (50 timesteps) with fast inference on CPU. Which architecture is best?',
            options: [
              'GRU — compact, fast, handles short sequences well, good CPU inference',
              'LSTM — more expressive, worth the extra cost for financial data',
              'TCN with large dilation — massive receptive field for 50 steps',
              'Transformer — best for any sequence task',
            ],
            correctAnswer: 'GRU — compact, fast, handles short sequences well, good CPU inference',
            explanation: 'For short sequences (50 steps), vanishing gradients aren\'t an issue — GRU is sufficient. GRU is faster than LSTM (fewer gates), and its sequential inference is fine for 50 steps on CPU.',
          },
        },
      ],
    },
    {
      id: 'r3q5',
      title: 'The Transformer',
      description: 'The attention-based architecture powering all modern foundation models.',
      prerequisiteQuestIds: ['r3q4'],
      chapters: [
        {
          id: 'r3q5c1',
          title: 'Attention — Queries, Keys, and Values',
          lesson: {
            text: 'Attention computes a weighted sum of values V, where the weights come from the compatibility between queries Q and keys K. Scaled dot-product attention: scores = QKᵀ/√dₖ; weights = softmax(scores); output = weights·V. The √dₖ scaling prevents softmax saturation in high dimensions.',
            formula: 'Attention(Q,K,V) = softmax(QKᵀ/√dₖ)·V',
          },
          challenge: {
            type: 'derivation',
            prompt: 'Trace through one attention computation for a sequence of 2 tokens.',
            steps: [
              {
                prompt: 'Step 1 — For query q₁ and key k₁ (both d=2 vectors), compute the raw score q₁·k₁ᵀ for q=[1,0], k₁=[1,0], k₂=[0,1].',
                options: ['score(q₁,k₁)=1, score(q₁,k₂)=0', 'score(q₁,k₁)=0, score(q₁,k₂)=1', 'Both scores = 1', 'Both scores = 0'],
                correctAnswer: 'score(q₁,k₁)=1, score(q₁,k₂)=0',
              },
              {
                prompt: 'Step 2 — After softmax([1,0]/√2) ≈ softmax([0.71, 0]), the attention weights α are approximately:',
                options: ['α ≈ [0.67, 0.33]', 'α = [1.0, 0.0]', 'α = [0.5, 0.5]', 'α ≈ [0.33, 0.67]'],
                correctAnswer: 'α ≈ [0.67, 0.33]',
              },
              {
                prompt: 'Step 3 — Given v₁=[1,0], v₂=[0,1], the output is 0.67·v₁ + 0.33·v₂ = ?',
                options: ['[0.67, 0.33]', '[1.0, 1.0]', '[0.5, 0.5]', '[0, 0]'],
                correctAnswer: '[0.67, 0.33]',
              },
            ],
          },
        },
        {
          id: 'r3q5c2',
          title: 'Multi-Head Self-Attention',
          lesson: {
            text: 'Multi-head attention runs h parallel attention "heads," each with its own Q, K, V projection matrices. The outputs are concatenated and projected. Each head can attend to different aspects (syntax vs. semantics, local vs. global). Self-attention means Q, K, V all come from the same sequence.',
            formula: 'MultiHead(X) = Concat(head₁,...,headₕ)·Wᴼ\nheadᵢ = Attention(XWᵢQ, XWᵢK, XWᵢV)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why use multiple attention heads instead of one wider attention layer?',
            options: [
              'Each head can specialize in different relationship types; joint information is combined at the end',
              'Multiple heads are faster to compute than one wide head',
              'It prevents gradient vanishing in deep transformers',
              'Each head attends to a different part of the vocabulary',
            ],
            correctAnswer: 'Each head can specialize in different relationship types; joint information is combined at the end',
            explanation: 'Empirically, heads specialize — some track syntactic dependencies, others coreference, others semantics. A single head must compromise; multiple heads can independently focus on different patterns.',
          },
        },
        {
          id: 'r3q5c3',
          title: 'Positional Encoding',
          lesson: {
            text: 'Self-attention is permutation-equivariant — it treats inputs as a set, not a sequence. Positional encodings inject position information by adding a position-dependent vector to each token embedding. The original transformer uses sinusoidal encodings; BERT uses learned absolute positions; RoPE (Rotary Position Embedding) encodes relative positions directly in Q/K.',
            formula: 'PE(pos, 2i) = sin(pos / 10000^{2i/dmodel})\nPE(pos, 2i+1) = cos(pos / 10000^{2i/dmodel})',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Without positional encodings, which property would a transformer have?',
            options: [
              'Permutation invariance — the same output for any permutation of tokens',
              'Permutation equivariance — tokens at different positions get different outputs',
              'No ability to process sequences',
              'Equivalent to a single linear layer',
            ],
            correctAnswer: 'Permutation invariance — the same output for any permutation of tokens',
            explanation: 'Pure self-attention is a set function: permuting inputs permutes outputs identically. Without positional info, "The cat sat" and "sat cat The" produce the same representations (just reordered).',
          },
        },
        {
          id: 'r3q5c4',
          title: 'The Encoder-Decoder Architecture',
          lesson: {
            text: 'The original transformer has an encoder (bidirectional, sees full input) and a decoder (autoregressive, generates output left-to-right). Decoder uses masked self-attention (prevents attending to future tokens) and cross-attention to the encoder. BERT uses encoder-only; GPT uses decoder-only; T5/BART use full encoder-decoder.',
            formula: 'Encoder: Self-Attention → FFN (×N layers)\nDecoder: Masked Self-Attention → Cross-Attention → FFN (×N layers)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'In the decoder\'s cross-attention, Q comes from the decoder and K, V come from the encoder. What does this allow?',
            options: [
              'The decoder to "look up" relevant encoder representations when generating each token',
              'The encoder to be skipped during decoding for speed',
              'Bidirectional attention in the decoder',
              'The decoder to process inputs in parallel',
            ],
            correctAnswer: 'The decoder to "look up" relevant encoder representations when generating each token',
            explanation: 'Cross-attention lets each decoder step query the full encoder output. When translating, the decoder attends to the relevant source words for each generated target word.',
          },
        },
        {
          id: 'r3q5c5',
          title: 'Efficient Attention Variants',
          lesson: {
            text: 'Standard attention is O(n²) in sequence length — prohibitive for long sequences. FlashAttention reorders the computation to use GPU SRAM tiling, avoiding slow HBM reads and achieving IO-optimal attention. Linear attention replaces softmax with kernel approximations for O(n) complexity. Sparse attention (Longformer, BigBird) attends to local + global tokens.',
            formula: 'Standard attention: O(n²d) time + O(n²) memory\nFlashAttention: O(n²d) time + O(n) memory',
          },
          challenge: {
            type: 'design',
            prompt: 'You need to process documents of 100K tokens. Which attention variant is best?',
            options: [
              'Sparse attention (Longformer-style) — local window + global tokens for efficient long-context processing',
              'Standard multi-head attention — most accurate',
              'Linear attention — zero approximation error',
              'Remove attention entirely and use RNNs',
            ],
            correctAnswer: 'Sparse attention (Longformer-style) — local window + global tokens for efficient long-context processing',
            explanation: 'At 100K tokens, O(n²) attention requires ~40GB just for attention weights. Sparse attention uses O(n·window) by attending locally and to special global tokens — tractable for long documents.',
          },
        },
        {
          id: 'r3q5boss',
          title: 'BOSS: The Attention Mechanic',
          isBoss: true,
          lesson: {
            text: 'The attention mechanism is the most important building block in modern AI. Implementing it from scratch cements your understanding of Q, K, V, and the scaled dot-product.',
            formula: 'Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V',
          },
          challenge: {
            type: 'code',
            prompt: 'For single-head attention with 1D vectors: given query q (number), keys array k, values array v, and dk (number), compute softmax(q*k/sqrt(dk)) dot v. Return the scalar output.',
            template: 'function attention(q, k, v, dk) {\n  const scores = k.map(ki => q * ki / Math.sqrt(dk));\n  const maxScore = Math.max(...scores);\n  const expScores = scores.map(s => Math.exp(s - maxScore));\n  const sumExp = expScores.reduce((a, b) => a + b, 0);\n  const weights = expScores.map(e => e / sumExp);\n  return // dot weights with v\n}',
            validationRegex: 'weights\\.reduce\\s*\\(.*a.*wi.*i.*a\\s*\\+\\s*wi\\s*\\*\\s*v\\[i\\]|weights\\.map.*wi.*i.*wi\\s*\\*\\s*v\\[i\\]',
          },
        },
      ],
    },
    {
      id: 'r3q6',
      title: 'Geometric & Structured Data',
      description: 'Learning on graphs, point clouds, and non-Euclidean data structures.',
      prerequisiteQuestIds: ['r3q1'],
      chapters: [
        {
          id: 'r3q6c1',
          title: 'Graph Neural Networks',
          lesson: {
            text: 'GNNs learn representations of nodes by aggregating information from their neighbors. A GNN layer: h_v^{(l+1)} = UPDATE(h_v^{(l)}, AGGREGATE({h_u^{(l)} : u ∈ N(v)})). After L layers, each node encodes its L-hop neighborhood. Graph-level predictions pool all node representations.',
            formula: 'h_v^{(l+1)} = σ(W · AGGREGATE({h_u^{(l)} : u ∈ N(v) ∪ {v}}))',
          },
          challenge: {
            type: 'quiz',
            prompt: 'After 3 GNN layers, each node\'s representation encodes information from its:',
            options: ['3-hop neighborhood', '1-hop neighborhood', 'Entire graph', 'Only itself'],
            correctAnswer: '3-hop neighborhood',
            explanation: 'Each GNN layer aggregates 1-hop neighbors. After L layers, the receptive field extends to L-hop neighbors. 3 layers → 3 hops.',
          },
        },
        {
          id: 'r3q6c2',
          title: 'Message Passing Frameworks',
          lesson: {
            text: 'The Message Passing Neural Network (MPNN) framework unifies many GNN variants. Each iteration: (1) compute messages m_uv = M(h_u, h_v, e_uv) for each edge; (2) aggregate messages at each node; (3) update node state h_v. Different choices of M, AGGREGATE, and UPDATE define GCN, GraphSAGE, GAT, etc.',
            formula: 'Message: m_e = M_θ(h_u, h_v, e_uv)\nAggregate: m_v = ⊕_{u ∈ N(v)} m_e\nUpdate: h_v^{new} = U_θ(h_v, m_v)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Graph Attention Networks (GATs) differ from standard GCN by:',
            options: [
              'Learning different weights for different neighbors via attention',
              'Using no learnable parameters',
              'Requiring edge features for all edges',
              'Processing each node independently',
            ],
            correctAnswer: 'Learning different weights for different neighbors via attention',
            explanation: 'GCN aggregates neighbors with equal or fixed degree-normalized weights. GAT uses learned attention scores α_uv = softmax(LeakyReLU(a·[Wh_u ‖ Wh_v])) to weight each neighbor.',
          },
        },
        {
          id: 'r3q6c3',
          title: 'Point Clouds and 3D Learning',
          lesson: {
            text: 'Point clouds are unordered sets of 3D coordinates (from LiDAR, depth cameras). PointNet uses shared MLPs per point then global max-pooling — permutation invariant and efficient. PointNet++ adds local neighborhoods. These architectures underpin autonomous driving perception.',
            formula: 'PointNet: f(x₁,...,xₙ) = g(MAX_{i=1..n}(h(xᵢ)))\nh=shared MLP, g=MLP, MAX=global max-pool',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why does PointNet use max-pooling across points rather than summing?',
            options: [
              'Max-pooling is permutation invariant and robust to varying point cloud density',
              'Summing would give larger values for denser regions',
              'Max-pooling is faster to compute',
              'It enables gradient flow to all points equally',
            ],
            correctAnswer: 'Max-pooling is permutation invariant and robust to varying point cloud density',
            explanation: 'Both max and sum are permutation invariant. But max-pooling selects the most informative feature regardless of how many points voted for it — robust to varying density unlike sum which favors denser regions.',
          },
        },
        {
          id: 'r3q6c4',
          title: 'Equivariant Networks',
          lesson: {
            text: 'An equivariant network satisfies f(T(x)) = T(f(x)) — transforming the input transforms the output predictably. CNNs are translation equivariant. E(3)-equivariant networks (e.g., SE(3)-Transformers, EGNN) are equivariant to 3D rotations and translations — critical for molecular property prediction where the result shouldn\'t change if you rotate the molecule.',
            formula: 'Equivariance: f(g·x) = g·f(x)\nInvariance: f(g·x) = f(x)',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain why equivariance matters for molecular property prediction. What would go wrong with a non-equivariant network?',
            keywords: ['rotation', 'equivariant', 'molecule', 'transform', 'invariant', 'same', 'physics', '3D'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r3q6c5',
          title: 'Neural Fields and Implicit Representations',
          lesson: {
            text: 'Neural fields (NeRF, occupancy networks) represent a 3D scene as a continuous function f_θ(x, y, z) → (density, color) parameterized by a neural network. Unlike explicit meshes or voxels, neural fields are continuous, compact, and differentiable. Rendering uses volume rendering — integrating along rays.',
            formula: 'NeRF: F_θ(x, d) → (c, σ)\nRender: C(r) = ∫ T(t)·σ(r(t))·c(r(t),d) dt',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Neural Radiance Fields (NeRF) represent a scene as a:',
            options: [
              'Continuous function mapping 3D location + viewing direction to color and density',
              'Discrete 3D voxel grid',
              'Set of explicit mesh triangles',
              'Point cloud with RGB attributes',
            ],
            correctAnswer: 'Continuous function mapping 3D location + viewing direction to color and density',
            explanation: 'NeRF uses an MLP to represent the radiance field continuously. Given (x,y,z,θ,φ), it outputs (R,G,B,σ). Volume rendering composites these values along camera rays to produce 2D images.',
          },
        },
        {
          id: 'r3q6boss',
          title: 'BOSS: The Graph Architect',
          isBoss: true,
          lesson: {
            text: 'GNNs have become essential in drug discovery, recommendation systems, and social network analysis. This boss tests your ability to pick the right architecture for a graph task.',
          },
          challenge: {
            type: 'design',
            prompt: 'You want to predict whether a molecule is toxic. The molecule is represented as a graph (atoms=nodes, bonds=edges). Which GNN architecture fits best?',
            options: [
              'MPNN with edge features — bonds have type (single/double/aromatic) which is chemically meaningful',
              'GCN without edge features — simpler is always better',
              'PointNet — molecules are 3D point clouds',
              'Standard MLP on the adjacency matrix — captures full structure',
            ],
            correctAnswer: 'MPNN with edge features — bonds have type (single/double/aromatic) which is chemically meaningful',
            explanation: 'Chemical bonds have types that carry critical information (single vs. aromatic vs. double). An MPNN that includes edge features in its message function directly encodes this chemistry.',
          },
        },
      ],
    },
  ],
};
