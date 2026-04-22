import type { Realm } from '../types';

export const realm6: Realm = {
  id: 'r6',
  title: 'Perception & Embodied AI',
  subtitle: 'When AI meets the physical world',
  icon: '🤖',
  description: 'Computer vision, speech, robotics, and autonomous agents that sense, act, and navigate the real world.',
  prerequisiteRealmIds: ['r3'],
  quests: [
    {
      id: 'r6q1',
      title: 'Computer Vision Beyond Classification',
      description: 'Dense prediction, 3D understanding, and vision transformers.',
      chapters: [
        {
          id: 'r6q1c1',
          title: 'Feature Extraction and Classical Vision',
          lesson: {
            text: 'Before deep learning, computer vision used handcrafted features. SIFT (Scale-Invariant Feature Transform) detects keypoints stable under scale and rotation changes. HOG (Histogram of Oriented Gradients) captures edge structure. These features feed into SVMs or nearest-neighbor classifiers. Deep features have replaced them but the intuitions remain relevant.',
            formula: 'SIFT: Gaussian DoG pyramid → keypoint localization → orientation histogram\nHOG: local gradient orientation histograms → SVM classifier',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why did SIFT become a dominant pre-deep-learning feature?',
            options: [
              'Invariance to scale, rotation, and illumination changes — the same keypoint matches across transformations',
              'It was the fastest feature extractor available',
              'It required no parameter tuning',
              'It was designed specifically for face detection',
            ],
            correctAnswer: 'Invariance to scale, rotation, and illumination changes — the same keypoint matches across transformations',
            explanation: 'SIFT detects keypoints at multiple scales and computes orientation-normalized descriptors. The same corner of a building appears as the same SIFT descriptor whether the photo is taken close or far, rotated, or in different lighting.',
          },
        },
        {
          id: 'r6q1c2',
          title: 'Optical Flow and Motion Estimation',
          lesson: {
            text: 'Optical flow estimates the apparent motion of pixels between consecutive frames. Lucas-Kanade assumes the flow is constant in a local neighborhood and solves a least-squares system. FlowNet and RAFT use deep learning to directly regress flow fields. Applications: video stabilization, action recognition, autonomous driving.',
            formula: 'Optical flow constraint: Iₓu + Iᵧv + Iₜ = 0\n(I = image intensity, u,v = pixel velocities)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'The optical flow constraint Iₓu + Iᵧv + Iₜ = 0 assumes:',
            options: [
              'Brightness constancy — a pixel\'s intensity does not change as it moves',
              'Objects move in straight lines',
              'All pixels have the same velocity',
              'The camera is stationary',
            ],
            correctAnswer: 'Brightness constancy — a pixel\'s intensity does not change as it moves',
            explanation: 'The constraint derives from dI/dt = 0: the total derivative of intensity is zero as we follow the motion. This means I(x+uΔt, y+vΔt, t+Δt) ≈ I(x,y,t) — the pixel appearance is preserved.',
          },
        },
        {
          id: 'r6q1c3',
          title: 'Stereo Vision and Depth Estimation',
          lesson: {
            text: 'Stereo cameras estimate depth using disparity — the horizontal shift of a point between left and right images. Depth = f·B/d (focal length × baseline / disparity). Monocular depth estimation uses a single image and a learned prior about scene geometry. Depth completion combines sparse LiDAR with camera images.',
            formula: 'Depth z = f · B / d\nf = focal length, B = baseline, d = disparity in pixels',
          },
          challenge: {
            type: 'quiz',
            prompt: 'If a point has a large disparity (large pixel shift between left and right camera), it is:',
            options: ['Close to the camera (small depth)', 'Far from the camera (large depth)', 'At the same depth as all points', 'Outside the field of view'],
            correctAnswer: 'Close to the camera (small depth)',
            explanation: 'z = f·B/d: large disparity d → small z. Nearby objects shift a lot between left and right images; distant objects shift very little (near-zero disparity → far depth).',
          },
        },
        {
          id: 'r6q1c4',
          title: '3D Reconstruction and NeRF',
          lesson: {
            text: 'Structure from Motion (SfM) reconstructs 3D point clouds from multiple images by matching keypoints and solving for camera poses and 3D points jointly. Neural Radiance Fields (NeRF) learn a continuous volumetric scene representation from posed 2D images, enabling photorealistic novel view synthesis from any viewpoint.',
            formula: 'NeRF: (x,y,z,θ,φ) → (RGB, σ)\nRender pixel: C = ∫ T(t)σ(r(t))c(r(t),d)dt',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain what NeRF is and how it enables novel view synthesis from just a set of photographs.',
            keywords: ['radiance field', 'neural', 'volume', 'render', 'density', 'color', 'ray', '3D'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r6q1c5',
          title: 'Vision Transformers (ViT)',
          lesson: {
            text: 'Vision Transformer (ViT) splits an image into fixed-size patches (e.g., 16×16), linearly embeds each patch, and processes the sequence with a standard transformer encoder. A class token aggregates global information. ViT outperforms CNNs at scale but needs more data or stronger augmentations than CNNs at small scale.',
            formula: 'Image: H×W×C → N patches of size P×P\nN = (H/P)·(W/P), each patch → d-dim embedding\n[CLS, patch₁, ..., patchₙ] → transformer',
          },
          challenge: {
            type: 'quiz',
            prompt: 'ViT with patch size P=16 on a 224×224 image produces how many patch tokens?',
            options: ['196 patches (14×14)', '576 patches (24×24)', '49 patches (7×7)', '784 patches (28×28)'],
            correctAnswer: '196 patches (14×14)',
            explanation: '224/16 = 14 patches per dimension. 14×14 = 196 patches total. Plus 1 CLS token = 197 sequence elements fed to the transformer.',
          },
        },
        {
          id: 'r6q1boss',
          title: 'BOSS: The Vision System Designer',
          isBoss: true,
          lesson: {
            text: 'Modern vision systems combine architectural choices, pretraining strategies, and task-specific heads. This boss tests system-level design for real vision applications.',
          },
          challenge: {
            type: 'design',
            prompt: 'You need to build a system to detect pedestrians in real-time from a car camera (640×480, 30fps, embedded GPU). What architecture?',
            options: [
              'YOLOv8-nano — single-shot detector optimized for real-time embedded inference',
              'ViT-L/16 + Faster R-CNN — highest accuracy, slow inference',
              'SIFT features + SVM — no GPU needed',
              'Stable Diffusion — generates what pedestrians look like',
            ],
            correctAnswer: 'YOLOv8-nano — single-shot detector optimized for real-time embedded inference',
            explanation: 'Real-time (30fps) on embedded hardware requires a fast single-stage detector. YOLOv8-nano processes 640px images in ~1ms on modern edge hardware. ViT-based two-stage detectors have >100ms latency — too slow.',
          },
        },
      ],
    },
    {
      id: 'r6q2',
      title: 'Speech & Audio',
      description: 'Processing and generating sound — from spectrograms to end-to-end speech models.',
      prerequisiteQuestIds: ['r6q1'],
      chapters: [
        {
          id: 'r6q2c1',
          title: 'Signal Processing Fundamentals',
          lesson: {
            text: 'Audio is a time-series of pressure values (waveform). The Fourier transform decomposes it into frequency components. The Short-Time Fourier Transform (STFT) applies FFT over sliding windows to produce a spectrogram — time on x-axis, frequency on y-axis, amplitude as color. Phase information in the spectrogram is often discarded.',
            formula: 'STFT: X(τ,ω) = Σ_t x(t)·w(t−τ)·e^{−iωt}\nSpectrogram: |X(τ,ω)|²',
          },
          challenge: {
            type: 'quiz',
            prompt: 'A spectrogram shows high amplitude at 440 Hz throughout a 2-second window. This most likely represents:',
            options: ['A sustained note at A4 (440 Hz)', 'Silence', 'Broadband noise', 'A spoken vowel'],
            correctAnswer: 'A sustained note at A4 (440 Hz)',
            explanation: '440 Hz sustained = musical note A4 (middle A). Sustained tone = single bright horizontal line in spectrogram. Speech vowels have multiple harmonic bands (F0, F1, F2, ...); broadband noise has energy across all frequencies.',
          },
        },
        {
          id: 'r6q2c2',
          title: 'Mel Spectrograms and Audio Features',
          lesson: {
            text: 'The Mel scale maps frequencies to perceptual pitch: humans hear logarithmically. Mel filterbanks apply overlapping triangular filters spaced on the Mel scale to compress spectrograms. MFCCs (Mel-Frequency Cepstral Coefficients) further compress via DCT — 13 coefficients represent a frame. Deep models now use Mel spectrograms directly as input.',
            formula: 'Mel(f) = 2595 · log₁₀(1 + f/700)\nMFCC: DCT(log(mel_filterbank_output))',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why are Mel spectrograms preferred over linear spectrograms for speech/music ML models?',
            options: [
              'They match human auditory perception — frequency resolution aligned with what humans actually distinguish',
              'They are faster to compute',
              'Linear spectrograms lose phase information that Mel preserves',
              'Mel spectrograms are smaller files',
            ],
            correctAnswer: 'They match human auditory perception — frequency resolution aligned with what humans actually distinguish',
            explanation: 'Humans hear pitch logarithmically — we can distinguish 100 Hz vs. 200 Hz much more than 10,000 Hz vs. 10,100 Hz. Mel scale matches this: more resolution at low frequencies, less at high. Models aligned to human perception work better on speech.',
          },
        },
        {
          id: 'r6q2c3',
          title: 'Automatic Speech Recognition',
          lesson: {
            text: 'Modern ASR uses end-to-end models. Whisper (OpenAI) encodes audio as Mel spectrograms → transformer encoder, then autoregressively decodes text with a decoder. It is trained on 680K hours of web audio with weak supervision. CTC-based models (wav2vec 2.0) are faster for streaming. RNN-T handles streaming with a transducer.',
            formula: 'Whisper: Mel → Encoder → Decoder (autoregressive text)\nCER/WER: standard evaluation metrics',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Whisper achieves low word error rate on many languages without language-specific training. Why?',
            options: [
              'Massive multilingual training data (680K hours) + weak supervision from web audio with transcripts',
              'It uses a language-specific vocabulary for each language',
              'It relies on Google Translate as a post-processing step',
              'It was fine-tuned on each language separately',
            ],
            correctAnswer: 'Massive multilingual training data (680K hours) + weak supervision from web audio with transcripts',
            explanation: 'Whisper trains on audio-transcript pairs scraped from the web across 99 languages. The scale and diversity give cross-lingual generalization. The weak supervision (auto-transcripts) allows scale without manual annotation.',
          },
        },
        {
          id: 'r6q2c4',
          title: 'Text-to-Speech Synthesis',
          lesson: {
            text: 'Neural TTS converts text to natural-sounding speech. Tacotron 2: text → mel spectrogram (attention-based seq2seq), then mel → waveform (WaveNet vocoder). FastSpeech 2 removes the autoregressive bottleneck using a duration predictor for parallel inference. VALL-E treats TTS as audio codec language modeling.',
            formula: 'Pipeline: text → phonemes → Mel spectrogram → waveform\nVocoder: Mel → 24kHz audio (WaveNet, HiFi-GAN)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'FastSpeech achieves faster TTS inference than Tacotron by:',
            options: [
              'Non-autoregressive generation — all Mel frames predicted in parallel using a duration predictor',
              'Smaller model size',
              'Skipping the vocoder step',
              'Using CTC instead of attention',
            ],
            correctAnswer: 'Non-autoregressive generation — all Mel frames predicted in parallel using a duration predictor',
            explanation: 'Tacotron\'s attention-based decoding is sequential — each frame depends on the previous. FastSpeech predicts all frame positions from phoneme durations, then generates all frames in parallel — 50-100× faster at inference.',
          },
        },
        {
          id: 'r6q2c5',
          title: 'Speaker Diarization and Audio Separation',
          lesson: {
            text: 'Speaker diarization answers "who spoke when" by segmenting audio and clustering speaker embeddings (d-vectors, x-vectors). Source separation (cocktail party problem) separates multiple simultaneous speakers. Conv-TasNet operates directly on waveforms; Sepformer uses transformers. Applications: meeting transcription, podcast indexing.',
            formula: 'Diarization: segment → embed → cluster (HDBSCAN)\nSeparation: mixed waveform → [speaker 1, speaker 2, ...]',
          },
          challenge: {
            type: 'design',
            prompt: 'You need to transcribe a 2-hour board meeting with 8 speakers and attribute each utterance to the correct person. What pipeline is correct?',
            options: [
              'Diarization (who spoke when) + ASR (speech-to-text) → merge speaker labels with transcript',
              'Single Whisper transcription — it handles speaker attribution automatically',
              'Run 8 separate ASR models, one per speaker',
              'Use audio source separation to isolate each speaker then transcribe separately',
            ],
            correctAnswer: 'Diarization (who spoke when) + ASR (speech-to-text) → merge speaker labels with transcript',
            explanation: 'Diarization identifies speaker segments (e.g., "Speaker A: 0:00-0:45, Speaker B: 0:45-1:30"). ASR transcribes each segment. Merging gives speaker-attributed text. Separation requires knowing speakers in advance; Whisper lacks speaker ID.',
          },
        },
        {
          id: 'r6q2boss',
          title: 'BOSS: The Audio Intelligence',
          isBoss: true,
          lesson: {
            text: 'End-to-end audio systems combine signal processing, deep learning, and language models. This boss tests your ability to architect a complete speech pipeline.',
          },
          challenge: {
            type: 'design',
            prompt: 'Build a real-time voice assistant that must transcribe speech, detect intent, and respond — all under 500ms. What pipeline maximizes quality within the latency budget?',
            options: [
              'Streaming ASR (RNN-T) → LLM intent classification → TTS → ~400ms total',
              'Whisper large → GPT-4 → VALL-E → will exceed 500ms significantly',
              'Keyword spotting only — no transcription',
              'Record the full utterance, batch-transcribe, then respond',
            ],
            correctAnswer: 'Streaming ASR (RNN-T) → LLM intent classification → TTS → ~400ms total',
            explanation: 'Streaming ASR (RNN-T/CTC) begins transcribing before the user finishes speaking. A small LLM (~7B) can classify intent in ~50ms. A fast TTS (FastSpeech2) synthesizes in ~100ms. Total ≈ 350-450ms. Whisper large batches the whole clip — incompatible with <500ms.',
          },
        },
      ],
    },
    {
      id: 'r6q3',
      title: 'Robotics & Control',
      description: 'Making physical agents move, plan, and learn in the real world.',
      prerequisiteQuestIds: ['r6q1'],
      chapters: [
        {
          id: 'r6q3c1',
          title: 'Kinematics and Dynamics',
          lesson: {
            text: 'Forward kinematics computes end-effector position from joint angles. Inverse kinematics solves for joint angles that achieve a target position. Dynamics models include mass, inertia, and forces — needed for torque-controlled robots. The Jacobian J relates joint velocities to end-effector velocities: ẋ = J(θ)·θ̇.',
            formula: 'FK: x = FK(θ)  (joint angles → cartesian)\nIK: θ = IK(x)  (cartesian → joint angles)\nẋ = J(θ) θ̇',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Inverse kinematics is generally harder than forward kinematics because:',
            options: [
              'IK is often non-unique (many joint configurations reach same position) and may have no closed-form solution',
              'IK requires more computation than FK',
              'FK is only solvable numerically',
              'IK requires sensor feedback while FK does not',
            ],
            correctAnswer: 'IK is often non-unique (many joint configurations reach same position) and may have no closed-form solution',
            explanation: 'A robotic arm has redundant degrees of freedom — infinitely many joint configurations can place the end-effector at the same point. FK is a direct polynomial function; IK inverts it, requiring iterative methods (Jacobian pseudoinverse, DLS) or ML.',
          },
        },
        {
          id: 'r6q3c2',
          title: 'Motion Planning',
          lesson: {
            text: 'Motion planning finds a collision-free path from start to goal configuration. A* searches a discretized configuration space. RRT (Rapidly-exploring Random Trees) grows a tree of random samples — good for high-dimensional spaces. RRT* is asymptotically optimal. MPC (Model Predictive Control) plans short horizons in real time, handling constraints.',
            formula: 'A*: f(n) = g(n) + h(n)  (cost + heuristic)\nRRT: random sample → nearest node → extend → check collision',
          },
          challenge: {
            type: 'design',
            prompt: 'A robot arm with 7 degrees of freedom must avoid dynamic obstacles in real time. Which planner is most suitable?',
            options: [
              'RRT with real-time replanning — handles high-dimensional C-space and dynamic environments',
              'A* on a grid — exhaustive but accurate',
              'Dijkstra\'s algorithm — finds optimal path always',
              'Pre-computed path library — fast lookup',
            ],
            correctAnswer: 'RRT with real-time replanning — handles high-dimensional C-space and dynamic environments',
            explanation: 'A 7-DOF arm has a 7D configuration space — grid search is intractable. RRT randomly samples this space efficiently. Dynamic obstacles require replanning: RRT can reuse the existing tree and extend as needed (RRT-Connect, informed RRT).',
          },
        },
        {
          id: 'r6q3c3',
          title: 'Simultaneous Localization and Mapping (SLAM)',
          lesson: {
            text: 'SLAM solves the chicken-and-egg problem: a robot must know its location to build a map, but needs a map to locate itself. EKF-SLAM uses an Extended Kalman Filter to jointly estimate robot pose and landmark positions. ORB-SLAM3 uses feature matching across frames. Neural SLAM (iMAP, NICE-SLAM) builds implicit neural maps.',
            formula: 'State: [robot pose, landmark 1, ..., landmark N]\nEKF update: P ← (I−KH)P, K = PH^T(HPH^T+R)^{-1}',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain the SLAM problem and why it is difficult. What makes it a "chicken and egg" problem?',
            keywords: ['localization', 'map', 'pose', 'uncertainty', 'simultaneous', 'sensor', 'estimate', 'drift'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r6q3c4',
          title: 'Learning from Demonstration',
          lesson: {
            text: 'Learning from Demonstration (LfD) / Imitation Learning trains robot policies from expert demonstrations. Behavioral Cloning (BC): supervised learning on (state, action) pairs. DAgger (Dataset Aggregation) iteratively queries the expert on states visited by the learned policy — reducing distribution shift. Diffusion Policy uses diffusion models to learn multi-modal action distributions.',
            formula: 'BC: min_π E[(s,a)~D] ‖π(s) − a‖²\nDAgger: D ← D ∪ {(sᵢ, π*(sᵢ))} for sᵢ visited by π',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Behavioral Cloning suffers from "distribution shift" at test time. This means:',
            options: [
              'The robot visits states not in the training data, and makes errors that compound (no expert correction)',
              'The demonstrations are biased toward the expert\'s preference',
              'BC cannot handle continuous action spaces',
              'The robot learns the wrong reward function',
            ],
            correctAnswer: 'The robot visits states not in the training data, and makes errors that compound (no expert correction)',
            explanation: 'BC trains on expert states, but the learned policy makes small errors → visits new states. With no expert guidance from these new states, errors compound. DAgger fixes this by querying the expert on states the learner actually visits.',
          },
        },
        {
          id: 'r6q3c5',
          title: 'Sim-to-Real Transfer',
          lesson: {
            text: 'Training RL agents in simulation is cheap but the sim-to-real gap causes policies to fail in the real world. Domain randomization: randomize simulation parameters (friction, mass, texture) during training so the policy works across a distribution. Domain adaptation: align sim and real feature spaces. Real2Sim2Real: reconstruct real scenes in simulation.',
            formula: 'Domain randomization: train on p(x; φ) for φ ~ P(φ)\nGoal: policy robust across φ transfers to real φ_real',
          },
          challenge: {
            type: 'design',
            prompt: 'You trained a grasping policy in simulation with perfect physics. It fails on a real robot. What is the most likely cause and fix?',
            options: [
              'Sim-to-real gap in contact physics/friction — apply domain randomization on friction, mass, and sensor noise during training',
              'The simulation used too many training steps',
              'The neural network is too large for the real hardware',
              'Real-world cameras have higher resolution than simulation',
            ],
            correctAnswer: 'Sim-to-real gap in contact physics/friction — apply domain randomization on friction, mass, and sensor noise during training',
            explanation: 'Contact-rich tasks (grasping) are extremely sensitive to friction coefficients and object mass — impossible to perfectly replicate in sim. Domain randomization trains the policy to be robust across a range, spanning the real-world parameters.',
          },
        },
        {
          id: 'r6q3boss',
          title: 'BOSS: The Robotics Integrator',
          isBoss: true,
          lesson: {
            text: 'Real robotic systems combine perception, planning, control, and learning. This boss tests your ability to design an end-to-end system.',
          },
          challenge: {
            type: 'design',
            prompt: 'Design a complete pick-and-place robot that must: identify objects, plan a collision-free grasp, execute it, and adapt to new objects without retraining.',
            options: [
              'ViT detector → grasp pose estimation → RRT planner → Diffusion Policy for execution → CLIP zero-shot for new objects',
              'Hardcoded rules for each object type',
              'RL from scratch in simulation for each new object',
              'Human teleoperation with no autonomy',
            ],
            correctAnswer: 'ViT detector → grasp pose estimation → RRT planner → Diffusion Policy for execution → CLIP zero-shot for new objects',
            explanation: 'Modern robotic systems stack: ViT/DINO for detection, analytical or learned grasp estimation, RRT/MPC for motion, Diffusion Policy for dexterous execution. CLIP embeddings generalize to novel objects without retraining the full pipeline.',
          },
        },
      ],
    },
    {
      id: 'r6q4',
      title: 'Autonomous Agents',
      description: 'AI agents that plan, use tools, and operate in dynamic environments.',
      prerequisiteQuestIds: ['r6q1'],
      chapters: [
        {
          id: 'r6q4c1',
          title: 'Agent Architectures and Tool Use',
          lesson: {
            text: 'Autonomous agents combine a reasoning engine (LLM) with tools (search, code execution, APIs). ReAct (Reason+Act) alternates between reasoning steps (thoughts) and action steps (tool calls). Tool use allows agents to access real-time information, run calculations, and interact with systems beyond the model\'s static knowledge.',
            formula: 'ReAct loop: Thought → Action → Observation → Thought → ...\nTools: search(query), run_code(code), API_call(endpoint)',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Why do LLM-based agents benefit from tool use (e.g., web search, code execution)?',
            options: [
              'Tools provide real-time information, precise calculation, and actions beyond the model\'s static knowledge',
              'Tools reduce model hallucination by checking grammar',
              'Tool calls speed up LLM inference',
              'Tools allow the model to update its weights in real time',
            ],
            correctAnswer: 'Tools provide real-time information, precise calculation, and actions beyond the model\'s static knowledge',
            explanation: 'LLMs have frozen knowledge cutoffs and imprecise arithmetic. Tools extend them: search retrieves current facts; code execution gives exact computation; APIs take real-world actions. This is why ChatGPT plugins and Claude tools dramatically extend capability.',
          },
        },
        {
          id: 'r6q4c2',
          title: 'Planning and Reasoning Loops',
          lesson: {
            text: 'Agents decompose complex goals into sub-tasks. Tree of Thought explores multiple reasoning paths and backtracks. MCTS (Monte Carlo Tree Search) guides exploration by estimating future value. LLM-based planners generate plans in natural language that are then executed by specialized modules.',
            formula: 'Tree of Thought: BFS/DFS over reasoning steps with LLM evaluation\nMCTS: UCB1 to balance exploration/exploitation in thought tree',
          },
          challenge: {
            type: 'quiz',
            prompt: 'Tree of Thought outperforms Chain of Thought on complex reasoning because:',
            options: [
              'It explores multiple solution paths and backtracks from dead ends — better search over the reasoning space',
              'It uses more tokens per response',
              'It avoids hallucination by grounding in tools',
              'It decomposes problems using a fixed template',
            ],
            correctAnswer: 'It explores multiple solution paths and backtracks from dead ends — better search over the reasoning space',
            explanation: 'CoT commits to one reasoning path. ToT branches: generates multiple continuations at each step, evaluates them (often via the LLM itself), and uses BFS/DFS to navigate the best path. This is especially useful for problems where the first approach is often wrong.',
          },
        },
        {
          id: 'r6q4c3',
          title: 'Memory — Short-Term, Long-Term, Episodic',
          lesson: {
            text: 'Agents need different memory types. Short-term (context window): recent conversation + retrieved context. Long-term (vector DB): embeddings of past interactions retrieved by similarity. Episodic: structured records of past task attempts. External memory (RAG) retrieves relevant chunks from a large corpus, extending effective context beyond the context window.',
            formula: 'RAG: retrieve top-k chunks by similarity to query\nfinal_context = [retrieved_chunks, query]\nLLM generates response grounded in retrieved facts',
          },
          challenge: {
            type: 'flashcard',
            prompt: 'Master the different memory mechanisms available to LLM-based agents.',
            cards: [
              { term: 'Context window (in-context memory)', definition: 'The text that fits in a single LLM call — typically 8K-128K tokens. Includes the current conversation, retrieved documents, and tool outputs.' },
              { term: 'External vector memory (RAG)', definition: 'Large knowledge base stored as embeddings in a vector DB. Retrieved by semantic similarity at query time. Extends effective knowledge far beyond context window.' },
              { term: 'Episodic memory', definition: 'Structured records of past agent episodes: goals, actions taken, outcomes. Retrieved and used to avoid repeating mistakes or leverage past solutions.' },
              { term: 'Parametric memory', definition: 'Knowledge encoded in model weights during pretraining. Static — cannot be updated without retraining. Fast to access (no retrieval needed) but may be stale or incorrect.' },
              { term: 'Working memory', definition: 'The active state maintained during a multi-step task: current plan, partial results, tool outputs. Managed in the context window; too long = must summarize or truncate.' },
            ],
          },
        },
        {
          id: 'r6q4c4',
          title: 'Multi-Agent Coordination',
          lesson: {
            text: 'Multi-agent systems divide complex tasks across specialized agents. AutoGen, CrewAI, and similar frameworks provide orchestration. A manager agent decomposes tasks and routes to sub-agents. Sub-agents can check each other\'s work, debate solutions, or specialize in domains. Key challenge: communication overhead and conflicting actions.',
            formula: 'Orchestrator: decompose task → assign to agents → aggregate\nAgent graph: nodes=agents, edges=message passing',
          },
          challenge: {
            type: 'design',
            prompt: 'You want an agent system to write, review, and deploy code automatically. How should it be organized?',
            options: [
              'Coder agent → Reviewer agent → Deployment agent, with Orchestrator managing handoffs and error recovery',
              'Single agent does everything in one prompt',
              'Three identical agents vote on each action',
              'One agent writes code, human reviews, agent deploys',
            ],
            correctAnswer: 'Coder agent → Reviewer agent → Deployment agent, with Orchestrator managing handoffs and error recovery',
            explanation: 'Specialized agents with clear interfaces improve quality: the reviewer independently catches bugs the coder introduced. The orchestrator handles failures (e.g., reviewer rejects code → back to coder). Clear separation of concerns mirrors software engineering best practices.',
          },
        },
        {
          id: 'r6q4c5',
          title: 'World Models',
          lesson: {
            text: 'A world model predicts future states given current state and action: ŝₜ₊₁ = f(sₜ, aₜ). Dreamer learns a compact latent world model from pixels and plans entirely within it. LLMs can function as world models for textual environments. Accurate world models enable efficient planning without physical trial-and-error.',
            formula: 'World model: P(sₜ₊₁|sₜ,aₜ)\nPlanning in imagination: rollout model for H steps, optimize action sequence',
          },
          challenge: {
            type: 'concept_battle',
            prompt: 'Explain what a world model is and why it matters for intelligent agents that need to plan ahead.',
            keywords: ['predict', 'future', 'state', 'action', 'planning', 'imagination', 'efficient', 'model'],
            keywordThreshold: 4,
          },
        },
        {
          id: 'r6q4boss',
          title: 'BOSS: The Agent Architect',
          isBoss: true,
          lesson: {
            text: 'Agentic AI systems are moving from research to production. This boss tests your ability to design a robust, useful autonomous agent.',
          },
          challenge: {
            type: 'design',
            prompt: 'Build an autonomous research agent that must: answer questions requiring real-time data, remember past sessions, and produce accurate, cited summaries. What architecture?',
            options: [
              'ReAct agent with web search tool + RAG for session memory + citation extraction + fact-checking sub-agent',
              'Single LLM call with a very long prompt',
              'Fine-tuned model on research papers — no tools needed',
              'Human-in-the-loop with LLM as autocomplete only',
            ],
            correctAnswer: 'ReAct agent with web search tool + RAG for session memory + citation extraction + fact-checking sub-agent',
            explanation: 'Real-time data needs search (parametric knowledge is stale). Session continuity needs RAG over past conversations. Citations need structured extraction. Accuracy needs verification. No single LLM call covers all this — a multi-tool ReAct architecture is required.',
          },
        },
      ],
    },
  ],
};
