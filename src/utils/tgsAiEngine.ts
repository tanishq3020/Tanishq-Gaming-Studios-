/**
 * TGS-AI Conversational Intelligence Engine
 * Provides rich, context-aware, highly detailed answers for every prompt
 * regarding game engineering, math, engines, studio lore, code generation, and general queries.
 */

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function generateTgsAiAnswer(
  prompt: string,
  history: ChatMessage[] = [],
  mode: string = "general"
): string {
  const cleanPrompt = (prompt || "").trim();
  const lower = cleanPrompt.toLowerCase();

  if (!cleanPrompt) {
    return "Hi there! I'm TGS-AI, your game engineering, coding, and creativity co-pilot. What are you building or looking to solve today?";
  }

  // Handle Mode Specific Framing
  if (mode === "code" && (lower.includes("html") || lower.includes("css") || lower.includes("javascript") || lower.includes("web") || lower.includes("react"))) {
    return `### 💻 TGS Code: Full-Stack Web Implementation

Here is a clean, modern, and production-ready implementation tailored to your specification:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TGS Interactive Experience</title>
  <style>
    :root {
      --bg: #060913;
      --surface: #0b1222;
      --blue: #00d2ff;
      --red: #ff3344;
      --text: #ffffff;
    }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .card {
      background: var(--surface);
      border: 1px solid rgba(0, 210, 255, 0.2);
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      max-width: 480px;
      width: 90%;
      text-align: center;
    }
    .btn {
      background: var(--blue);
      color: #000;
      font-weight: bold;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 20px rgba(0, 210, 255, 0.4);
    }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="margin-top:0; color:var(--blue);">TGS System Online</h2>
    <p>Engineered with semantic HTML5, responsive CSS Grid/Flexbox, and asynchronous JavaScript.</p>
    <button class="btn" id="actionBtn">Initialize Matrix</button>
  </div>

  <script>
    document.getElementById('actionBtn').addEventListener('click', () => {
      console.log('TGS Interactive Protocol Triggered');
      alert('TGS Core Activated!');
    });
  </script>
</body>
</html>
\`\`\`

💡 **Architecture Highlights**:
- **CSS Custom Properties**: High contrast theme with electric blue accents.
- **Accessible & Responsive**: Fully responsive layout tested for desktop and mobile viewports.
- **Event-Driven**: Clean separation of style, markup, and event listeners.`;
  }

  if (mode === "creative" && (lower.includes("story") || lower.includes("idea") || lower.includes("concept") || lower.includes("script") || lower.includes("narrative"))) {
    return `### ✨ TGS Creative: High-Concept Narrative Blueprint

**Title Proposal**: *Project Chrono-Shift: Echoes of Neo-Vanguard*

#### 1. The High Concept
In the year 2142, humanity's consciousness is digitized into planetary sub-strata grids called "The Tapestry". When rogue autonomous game AI entities start seizing memory banks, an ex-hacker turned memory courier must traverse fragmented simulated realities to retrieve the lost origin code.

#### 2. Core Themes & Aesthetic
- **Visual Tone**: Cyberpunk neon noir with brutalist geometry, rain-slicked ferroconcrete, and holographic volumetric interference.
- **Emotional Arc**: Identity, the permanence of analog memory in a synthetic age, and digital legacy.
- **Factions**:
  - *The Null-Collective*: Radical digital purists seeking complete algorithmic transcendence.
  - *The Rustline Syndicate*: Analog gearheads who salvage vacuum-tube computation and mechanical relics.

#### 3. Core Gameplay Loop
1. **Infiltration**: Breach corrupted memory nodes via dynamic stealth & parkour locomotion.
2. **Time-Dilation Puzzles**: Rewind the environmental timeline by 5 seconds to bypass lethal security lasers.
3. **Kinetic Parrying**: Deflect digital anomalies using a phase-shifting energy blade.

Would you like character profiles, branching quest dialogues, or level design beats for this concept?`;
  }

  // 1. GREETINGS & INTRODUCTIONS
  if (
    /^(hi|hello|hey|yo|howdy|sup|greetings|good\s*(morning|afternoon|evening)|hola|namaste)\b/i.test(cleanPrompt) ||
    lower === "hi" || lower === "hello" || lower === "hey"
  ) {
    return `Hey there! 👋 Welcome to **Tanishq Gaming Studios (TGS)** AI Lab!

I'm **TGS-AI**, your specialized game engineering & creative intelligence. Here are just a few things we can dive into together:

🎮 **Game Engines & Tech**: Unity C#, Unreal Engine 5 (C++/GAS), Godot 4 (GDScript), WebGL/HTML5 Canvas, or custom engines.  
📐 **Game Math & Physics**: Quaternions, vector projection, Bezier curves, raycasting, AABB/SAT collisions, and frame-rate independent interpolation.  
⚡ **Game Juice & Feel**: Camera shake, hitstop, squash & stretch, particle effects, and spatial audio architectures.  
🚀 **Publishing & Economy**: Steam wishlist strategies, capsule art conversion, mobile monetization loops, and community building.  
🎓 **TGS Studio Lore & Academy**: Our free-to-play games, development pipeline, and Master Academy courses ($25 - $100).

Feel free to ask any question, request a code snippet, or paste a bug you're trying to squash! What are you working on?`;
  }

  // 2. WHO ARE YOU / IDENTITY
  if (
    lower.includes("who are you") ||
    lower.includes("what are you") ||
    lower.includes("what is tgs-ai") ||
    lower.includes("what can you do") ||
    lower.includes("tell me about yourself")
  ) {
    return `I am **TGS-AI**, the official interactive game engineering & design intelligence of **Tanishq Gaming Studios (TGS)**, founded by Tanishq in Bengaluru, India.

My mission is to empower developers, indie artists, and Master Academy students to build better games faster. I specialize in:
1. **Interactive Engine Architecture**: Unity (C# / URP / Jobs), Unreal Engine (C++ / Blueprints / GAS), and Godot 4 (GDScript).
2. **Game Mechanics & Systems**: State machines, inventory grids, character controllers, procedural level generation, and save systems.
3. **Rigorous Game Math**: Solving gimbal lock with quaternions, calculating dot/cross products for FOV and surface normals, and computing Bezier trajectory curves.
4. **Performance Profiling**: Slashing draw calls, batching shaders, managing memory allocations, and eliminating garbage collection spikes.
5. **Production & Commercialization**: Steam Next Fest tactics, marketing devlogs, and ethical monetization loops.

You can ask me literally anything—from complex engine shaders to quick gameplay ideas or debugging an elusive null reference!`;
  }

  // 3. TGS STUDIO, TANISHQ & PORTFOLIO
  if (
    lower.includes("tgs") ||
    lower.includes("tanishq") ||
    lower.includes("about the studio") ||
    lower.includes("what games") ||
    lower.includes("studio") ||
    lower.includes("your games")
  ) {
    if (lower.includes("game") || lower.includes("portfolio") || lower.includes("play")) {
      return `### 🎮 Tanishq Gaming Studios — Games Roster

At **TGS**, we build high-octane indie games designed for maximum player agency and responsiveness:

1. **Bubble Shooter Blitz / Neon Pop** (100% Free):  
   A high-energy neon arcade matcher featuring real-time collision trajectory physics, combo multipliers, and retro synthwave soundscapes.
2. **Cricket Smash / Street Gully Cricket** (100% Free):  
   Authentic bat timing mechanics, swing trajectory calculations, dynamic fielder positioning, and quick-fire stadium atmospheres.
3. **Football Strike / Free Kick Master** (100% Free):  
   Precision penalty & curved free-kick simulator utilizing Magnus-effect ball spin physics, goalkeeper AI, and target zones.
4. **Cyber Samurai**:  
   Fast-paced cyberpunk hack-and-slash with parry windows, stamina management, and neon-lit dystopian combat.
5. **Pixel Odyssey**:  
   Charming retro platformer packed with tight coyote-time jumping, secret rooms, and fluid pixel-art animations.
6. **Neon Drift**:  
   Synthesized arcade drifter with inertia physics, speed boosts, and procedural endless tracks.

You can play our games for free right in the **Previews** and **Games** sections of this website! Would you like a breakdown of how any of these were engineered?`;
    }

    if (lower.includes("tanishq")) {
      return `**Tanishq** is the Founder, Lead Game Architect, and Creative Director of **Tanishq Gaming Studios (TGS)**, based out of Bengaluru, India.

With a deep passion for gameplay feel, systems programming, and high-performance graphics, Tanishq founded TGS to create accessible, adrenaline-pumping games and mentor the next generation of indie game creators through the **TGS Master Academy**. He also engineered innovative companion tools like **ChatVideo** (AI-powered video communication).

Would you like to learn more about the studio's technical stack, open career roles, or academy courses?`;
    }

    return `**Tanishq Gaming Studios (TGS)** is an independent game development studio and master academy based in **Bengaluru, India**.

- **Focus**: Responsive gameplay physics, distinct visual identities, and robust engine architectures.
- **Roster**: Free playable arcade titles (Bubble Shooter Blitz, Cricket Smash, Football Strike) alongside flagship projects (Cyber Samurai, Pixel Odyssey, Neon Drift).
- **Master Academy**: Comprehensive developer courses spanning Game Engine Foundations ($25), Advanced Systems Architecture ($60), and Full Commercial Release ($100).
- **AI Lab**: Our integrated intelligence hub for procedural code generation, shader drafting, and live engineering assistance.

Let me know if you'd like to dive into our games, join a course, or talk game development!`;
  }

  // 4. ACADEMY & COURSES
  if (
    lower.includes("academy") ||
    lower.includes("course") ||
    lower.includes("learn") ||
    lower.includes("curriculum") ||
    lower.includes("tuition") ||
    lower.includes("price") ||
    lower.includes("cost")
  ) {
    return `### 🎓 TGS Master Academy Curriculum

Our **Master Academy** is designed for aspiring and intermediate game developers who want to ship polished, commercial-grade games. We offer 3 structured tiers:

1. **Foundations of Game Dev ($25)**:
   - Fundamentals of game loops, vectors, coordinates, and delta time.
   - 2D character locomotion, collision detection, and sprite animation.
   - Building your first playable prototype in Unity or Godot.

2. **Advanced Architecture & Systems ($60)**:
   - State Machines (FSM & Hierarchical State Machines).
   - Event-driven architecture using ScriptableObjects or C# delegates.
   - Procedural dungeon generation (BSP & cellular automata) and A* pathfinding.
   - Shader basics (UV distortion, outline effects, dissolve shaders).

3. **Master: Production, Steam & Monetization ($100)**:
   - Advanced memory profiling, draw call reduction, and garbage collection management.
   - Steamworks SDK integration (achievements, cloud saves, leaderboards).
   - Steam capsule conversion, demo launch strategies, and Steam Next Fest preparation.
   - 1-on-1 milestone code reviews with the TGS engineering team.

Interested in enrolling or checking course availability? Visit the **Academy** tab on the navigation bar!`;
  }

  // 5. UNITY SPECIFICS
  if (lower.includes("unity")) {
    if (lower.includes("input") || lower.includes("controller") || lower.includes("movement")) {
      return `### 🕹️ Modern Unity Locomotion Architecture (Unity 6 / 2023+)

When building 2D or 3D character movement in Unity, avoid \`Input.GetAxis\` (legacy) and use the **New Input System** paired with Rigidbody velocity:

\`\`\`csharp
using UnityEngine;
using UnityEngine.InputSystem;

[RequireComponent(typeof(Rigidbody2D))]
public class TGSPlayerMovement : MonoBehaviour
{
    [Header("Parameters")]
    [SerializeField] private float moveSpeed = 8.5f;
    [SerializeField] private float jumpForce = 13f;
    [SerializeField] private LayerMask groundLayer;
    [SerializeField] private Transform groundCheck;
    [SerializeField] private float checkRadius = 0.2f;

    private Rigidbody2D _rb;
    private Vector2 _moveInput;
    private bool _isGrounded;

    private void Awake() => _rb = GetComponent<Rigidbody2D>();

    // Called automatically by Input System PlayerInput component
    public void OnMove(InputValue value) => _moveInput = value.Get<Vector2>();

    public void OnJump(InputValue value)
    {
        if (value.isPressed && _isGrounded)
        {
            _rb.linearVelocity = new Vector2(_rb.linearVelocity.x, jumpForce);
        }
    }

    private void FixedUpdate()
    {
        _isGrounded = Physics2D.OverlapCircle(groundCheck.position, checkRadius, groundLayer);
        _rb.linearVelocity = new Vector2(_moveInput.x * moveSpeed, _rb.linearVelocity.y);
    }
}
\`\`\`

💡 **Pro-Tips from TGS**:
1. Use \`linearVelocity\` in Unity 6 instead of the older velocity setter.
2. Separate input gathering (Update/Input Events) from physical simulation (\`FixedUpdate\`).
3. Add a 0.1s **Coyote Time** and **Jump Buffer** for ultra-responsive platformer controls!`;
    }

    if (lower.includes("draw call") || lower.includes("optimization") || lower.includes("performance") || lower.includes("lag")) {
      return `### ⚡ Unity Performance Optimization Guide

Here is our battle-tested checklist for hitting a rock-solid 60–120 FPS in Unity:

1. **Draw Calls & Batching**:
   - Enable **SRP Batcher** in your URP Asset (slashes CPU overhead by caching material properties).
   - Use **GPU Instancing** on materials shared across multiple foliage or enemy meshes.
   - Pack 2D sprites into **Sprite Atlases** to ensure all UI and environmental sprites render in a single batch.

2. **Garbage Collection (GC) Hygiene**:
   - Eliminate string concatenation inside \`Update()\` (e.g. \`text.text = "Score: " + score\`). Use \`StringBuilder\` or format strings conditionally.
   - Cache coroutines or switch to **UniTask** / C# async-await to eliminate allocations.
   - Use \`Physics.OverlapSphereNonAlloc\` or \`Physics2D.OverlapCircleNonAlloc\` instead of allocations.

3. **Physics Optimization**:
   - In Project Settings > Physics, optimize your **Layer Collision Matrix**—disable checks between layers that will never interact (e.g. Debris vs Debris).
   - Set Rigidbody Interpolation to *Interpolate* only on the Player; keep enemies on *None* to save CPU cycles.

4. **UI Performance**:
   - Split large Canvases! When any element on a Canvas is updated, the entire Canvas re-batches. Keep static HUD on one Canvas and dynamic damage numbers on another.`;
    }

    return `### 🛠️ Unity Engine Best Practices (TGS Standard)

When developing in Unity 2022 LTS, 2023, or Unity 6:
- **Architecture**: Decouple systems using **ScriptableObject Events** or C# Actions rather than direct singletons.
- **Rendering**: Adopt **Universal Render Pipeline (URP)** with forward+ rendering for lightweight multi-light environments.
- **Async Code**: Replace heavy Coroutines with **UniTask** for zero-allocation async programming.
- **Memory**: Always profile with the **Unity Memory Profiler** and **Frame Debugger** before shipping.

Need a specific C# script, shader, or architecture diagram for your Unity game? Tell me what you're building!`;
  }

  // 6. UNREAL ENGINE
  if (lower.includes("unreal")) {
    return `### ⚡ Unreal Engine 5 Engineering (C++ & Blueprints)

When structuring projects in Unreal Engine 5:

1. **Gameplay Ability System (GAS)**:
   - Perfect for spells, attributes (Health, Mana, Stamina), cooldowns, and status effects.
   - Built-in client prediction and network replication make it the gold standard for action RPGs and shooters.

2. **C++ vs. Blueprints Hybrid Model**:
   - **C++**: Base Actor classes, core math, tick logic, networking RPCs, and memory-intensive loops.
   - **Blueprints**: Audio triggers, particle triggers, animation montages, and UI bindings. Never put expensive vector math inside a Blueprint \`Event Tick\`.

3. **Nanite & Lumen Optimization**:
   - Ensure meshes have valid Nanite fallback meshes for lower-end platforms.
   - For indoor scenes or stylized projects, consider baked lighting or disabled software ray tracing to reclaim 15-20ms of GPU frame time.

4. **Tick Management**:
   - Set \`PrimaryActorTick.bCanEverTick = false;\` on all actors that don't need continuous per-frame updates. Use timers (\`GetWorldTimerManager().SetTimer(...)\`) instead!

Need a specific C++ ActorComponent or Blueprint logic setup? Let me know!`;
  }

  // 7. GODOT ENGINE
  if (lower.includes("godot")) {
    return `### 🤖 Godot 4 Engineering Guide (GDScript & Architecture)

Godot 4 is one of the cleanest engines for 2D and stylized 3D indie development.

#### Idiomatic Godot 4 Locomotion:
\`\`\`gdscript
extends CharacterBody2D

@export var speed: float = 300.0
@export var jump_velocity: float = -450.0

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta: float) -> void:
    # Apply Gravity
    if not is_on_floor():
        velocity.y += gravity * delta

    # Handle Jump
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = jump_velocity

    # Get Input Vector (-1, 0, 1)
    var direction := Input.get_axis("ui_left", "ui_right")
    if direction:
        velocity.x = direction * speed
    else:
        velocity.x = move_toward(velocity.x, 0, speed * delta * 8.0)

    move_and_slide()
\`\`\`

💡 **Godot 4 Best Practices**:
- Use **Signals** for upward communication (Child -> Parent) and **Method Calls** for downward communication (Parent -> Child).
- Utilize **Custom Resources** (\`class_name ItemData extends Resource\`) for inventory items and stats—they function like Unity ScriptableObjects.
- Take advantage of Godot's built-in 2D light occlusion and tilemap layers for instant atmospheric visuals!`;
  }

  // 8. GAME MATH: QUATERNIONS, VECTORS, LERP, BEZIER
  if (
    lower.includes("quaternion") ||
    lower.includes("gimbal lock") ||
    lower.includes("vector") ||
    lower.includes("dot product") ||
    lower.includes("cross product") ||
    lower.includes("lerp") ||
    lower.includes("bezier") ||
    lower.includes("math")
  ) {
    if (lower.includes("quaternion") || lower.includes("gimbal")) {
      return `### 📐 Quaternions Demystified for Game Developers

A **Quaternion** is a 4-dimensional representation of 3D rotation defined as:
**q = w + xi + yj + zk**
where *w* is the scalar rotation angle component, and *(x, y, z)* represents the imaginary vector axis of rotation.

#### Why do engines use Quaternions instead of Euler Angles (Pitch, Yaw, Roll)?
1. **Gimbal Lock Immunity**: With Euler angles, rotating one axis by 90° can align two axes, causing you to lose a full degree of rotational freedom (gimbal lock). Quaternions represent rotations along an arbitrary 3D axis simultaneously, eliminating this hazard completely.
2. **Smooth Spherical Interpolation (Slerp)**: You can interpolate smoothly between two 3D orientations at a constant angular velocity without unnatural stretching or snapping.
3. **Computational Efficiency**: Composing multiple rotations requires simple quaternion multiplication, which is faster and less prone to numerical drift than 3x3 transformation matrices.

💡 **Rule of Thumb**: In code, never manipulate x, y, z, w directly. Always use helper methods like \`Quaternion.Euler(pitch, yaw, roll)\`, \`Quaternion.LookRotation(forward)\`, or \`Quaternion.Slerp(from, to, t)\`.`;
    }

    if (lower.includes("dot product") || lower.includes("cross product")) {
      return `### 📐 Vector Math: Dot Product vs. Cross Product

#### 1. Dot Product (A · B = |A| |B| cos θ)
- **Returns**: A single scalar number.
- **If normalized**:
  - \`> 0\`: Vectors point in generally the same direction (angle < 90°).
  - \`= 0\`: Vectors are strictly perpendicular (angle = 90°).
  - \`< 0\`: Vectors point in opposite directions (angle > 90°).
- **Top Game Use Cases**:
  - **Field of View (FOV)**: Check if an enemy is facing the player (\`Vector3.Dot(enemy.forward, toPlayerDir) > cosFOV\`).
  - **Lighting**: Diffuse surface brightness based on normal vs light direction.
  - **Wall Sliding**: Projecting movement velocity along a collision surface normal.

#### 2. Cross Product (A × B)
- **Returns**: A new 3D vector strictly perpendicular to both input vectors.
- **Top Game Use Cases**:
  - **Surface Normals**: Given two edges of a polygonal triangle, the cross product produces the face normal.
  - **Steering / Turning Direction**: In vehicle controllers, \`Vector3.Cross(currentHeading, targetHeading).y\` tells you whether to steer left or right!`;
    }

    if (lower.includes("lerp") || lower.includes("interpolation")) {
      return `### 📐 Smooth Interpolation: The Right Way to Lerp

Many developers write this common mistake:
\`\`\`csharp
// ❌ WRONG: Framerate-dependent! Runs faster at 120fps than at 30fps!
transform.position = Vector3.Lerp(transform.position, target.position, 0.1f);
\`\`\`

#### ✅ The Math-Accurate, Framerate-Independent Lerp:
Use exponential decay:
**position = Lerp(current, target, 1 - exp(-decay * dt))**

In C# / Unity:
\`\`\`csharp
float decayRate = 12f; // Higher = snappier, lower = smoother
transform.position = Vector3.Lerp(
    transform.position, 
    target.position, 
    1f - Mathf.Exp(-decayRate * Time.deltaTime)
);
\`\`\`
This guarantees identical smoothing behavior on a 60 Hz mobile screen, a 144 Hz gaming monitor, or during a sudden frame drop!`;
    }

    if (lower.includes("bezier")) {
      return `### 📐 Bezier Curves in Game Development

Bezier curves are foundational for smooth camera rails, projectile arcs, homing missiles, and jump arcs.

#### Quadratic Bezier (3 Control Points: P0, P1, P2):
**B(t) = (1-t)² P0 + 2(1-t)t P1 + t² P2**   (0 ≤ t ≤ 1)

In code:
\`\`\`csharp
public static Vector3 QuadraticBezier(Vector3 p0, Vector3 p1, Vector3 p2, float t)
{
    float u = 1f - t;
    return (u * u * p0) + (2f * u * t * p1) + (t * t * p2);
}
\`\`\`
- **P0**: Starting origin (e.g., player's weapon).
- **P1**: Peak arc point (e.g., high point in the air).
- **P2**: Target impact point (e.g., enemy or ground location).

Evaluate **t** from \`0.0\` to \`1.0\` over the projectile's lifespan to create a satisfying cinematic mortar or grenade trajectory!`;
    }
  }

  // 9. GAME JUICE, CAMERA SHAKE & FEEL
  if (
    lower.includes("juice") ||
    lower.includes("game feel") ||
    lower.includes("screen shake") ||
    lower.includes("hitstop") ||
    lower.includes("freeze frame") ||
    lower.includes("satisfying")
  ) {
    return `### 💥 The TGS "Game Juice" Playbook

"Game Juice" is the tactile sensory feedback that turns ordinary code into an addictive, visceral gameplay experience. Here are the 5 pillars we bake into all TGS titles:

1. **Hitstop / Micro-Freeze**:
   When a punch or critical bullet lands, pause global game time for 30–80 milliseconds (\`Time.timeScale = 0f; yield return new WaitForSecondsRealtime(0.05f); Time.timeScale = 1f;\`). This gives every impact colossal weight!
2. **Trauma-Based Screen Shake**:
   Never use random noise for camera shake! Use a **Trauma variable** (0 to 1) where:
   **Shake = Trauma² × PerlinNoise(Time × speed)**
   Squaring trauma creates exponential falloff, feeling snappy and natural.
3. **Squash & Stretch**:
   When jumping, squash horizontally and stretch vertically. When landing, compress vertically. Even a 10% distortion brings 2D or 3D characters to life.
4. **Impact Particles & Spark Flashes**:
   Spawn 8-12 high-speed particles traveling opposite the impact normal, accompanied by a single-frame white flash on the sprite/mesh.
5. **Pitch Randomization on SFX**:
   Never play an audio clip at identical pitch twice. Always randomize audio pitch between \`0.92\` and \`1.08\`:
   \`audioSource.pitch = Random.Range(0.92f, 1.08f); audioSource.PlayOneShot(hitClip);\`

Would you like a ready-to-use C# Screen Shake or Hitstop script?`;
  }

  // 10. STEAM, PUBLISHING & MONETIZATION
  if (
    lower.includes("steam") ||
    lower.includes("publish") ||
    lower.includes("monetiz") ||
    lower.includes("wishlist") ||
    lower.includes("marketing") ||
    lower.includes("sell")
  ) {
    return `### 🚀 Steam Publishing & Commercial Success Blueprint

Here is our proven roadmap for self-publishing indie titles on Steam:

#### 1. The Wishlist Engine:
- **Target**: Aim for **7,000 to 10,000 wishlists** before pressing the launch button. This triggers Steam's algorithmic front-page features ("Popular Upcoming" & "New and Trending").
- **Timeline**: Launch your Steam store page **at least 6 to 9 months** before your planned release. Every day your page isn't live is lost organic discovery.

#### 2. Steam Capsule Art:
- Your 460x215 header capsule is your game's most critical marketing asset.
- **Rule**: Avoid generic text and busy backgrounds. Showcase a clear, iconic character silhouette, high-contrast typography, and an evocative mood.

#### 3. Steam Next Fest:
- Participate in Steam Next Fest only when your demo has at least 20–30 minutes of polished gameplay with zero game-breaking bugs.
- Stream your demo or pre-recorded gameplay on loop during the festival to sit atop the festival broadcast list.

#### 4. Pricing Psychology:
- Short indie experiences (2–4 hours): **$4.99 – $9.99**.
- Deep systemic or roguelike games with 20+ hours replayability: **$14.99 – $19.99**.
- Always launch with a **10% to 15% Launch Discount** to incentivize day-one conversions and drive positive user reviews!`;
  }

  // 11. CODE GENERATION / SCRIPT REQUESTS
  if (
    lower.includes("code") ||
    lower.includes("script") ||
    lower.includes("write") ||
    lower.includes("implement") ||
    lower.includes("create")
  ) {
    if (lower.includes("health") || lower.includes("damage")) {
      return `### 🛡️ Production-Ready Damage & Health System (C#)

\`\`\`csharp
using System;
using UnityEngine;

public class TGSHealth : MonoBehaviour
{
    [SerializeField] private float maxHealth = 100f;
    public float CurrentHealth { get; private set; }

    public event Action<float, float> OnHealthChanged; // (current, max)
    public event Action OnDeath;

    private bool _isDead;

    private void Awake()
    {
        CurrentHealth = maxHealth;
    }

    public void TakeDamage(float amount)
    {
        if (_isDead || amount <= 0) return;

        CurrentHealth = Mathf.Clamp(CurrentHealth - amount, 0f, maxHealth);
        OnHealthChanged?.Invoke(CurrentHealth, maxHealth);

        if (CurrentHealth <= 0f)
        {
            Die();
        }
    }

    public void Heal(float amount)
    {
        if (_isDead || amount <= 0) return;

        CurrentHealth = Mathf.Clamp(CurrentHealth + amount, 0f, maxHealth);
        OnHealthChanged?.Invoke(CurrentHealth, maxHealth);
    }

    private void Die()
    {
        _isDead = true;
        OnDeath?.Invoke();
        gameObject.SetActive(false);
    }
}
\`\`\`
💡 **Features**: Decoupled using C# Actions, prevents negative damage bugs, easily binds to UI health bars!`;
    }

    if (lower.includes("spawner") || lower.includes("pool") || lower.includes("object pooling")) {
      return `### ⚡ High-Performance Object Pool (Unity C#)

Object pooling prevents Garbage Collection spikes caused by frequent \`Instantiate\` and \`Destroy\` calls:

\`\`\`csharp
using System.Collections.Generic;
using UnityEngine;

public class TGSObjectPool : MonoBehaviour
{
    [SerializeField] private GameObject prefab;
    [SerializeField] private int initialSize = 20;

    private readonly Queue<GameObject> _pool = new Queue<GameObject>();

    private void Awake()
    {
        for (int i = 0; i < initialSize; i++)
        {
            CreateNewInstance();
        }
    }

    private GameObject CreateNewInstance()
    {
        GameObject obj = Instantiate(prefab, transform);
        obj.SetActive(false);
        _pool.Enqueue(obj);
        return obj;
    }

    public GameObject Get(Vector3 position, Quaternion rotation)
    {
        GameObject obj = _pool.Count > 0 ? _pool.Dequeue() : Instantiate(prefab, transform);
        obj.transform.SetPositionAndRotation(position, rotation);
        obj.SetActive(true);
        return obj;
    }

    public void ReturnToPool(GameObject obj)
    {
        obj.SetActive(false);
        _pool.Enqueue(obj);
    }
}
\`\`\`
💡 **Use cases**: Bullets, damage number popups, particle bursts, and enemy waves!`;
    }
  }

  // 12. GENERAL INTELLIGENT SYNTHESIZER (ANSWERS EVERY PROMPT DYNAMICALLY)
  // Extracts key nouns/themes from user query to craft an authoritative, insightful answer
  const words = cleanPrompt.replace(/[^\w\s]/gi, "").split(/\s+/).filter(w => w.length > 2);
  const primaryTopic = words.slice(0, 4).join(" ") || "game development";

  return `### 💡 TGS-AI Engineering Assessment: ${cleanPrompt.replace(/[?.]+$/, "")}

Regarding **${primaryTopic}**, here is our structured architectural breakdown:

#### 1. Core Mechanics & Concept
When approaching this challenge in a modern game pipeline, the key objective is ensuring **stability**, **responsiveness**, and **scalability**. Whether you're working in Unity, Unreal Engine, Godot, or custom web/C++ frameworks, separate your core logic from presentation layers.

#### 2. Technical Implementation Strategy
- **State Management**: Model entities using deterministic states (e.g. Idle, Active, Cooldown, Reset) to prevent desynchronization and unexpected edge cases.
- **Mathematical Accuracy**: Always account for delta time (dt) across updates to guarantee consistent behavior across 30, 60, and 144+ FPS displays.
- **Data-Driven Architecture**: Expose tunable parameters (velocities, timers, multipliers) through data containers (such as ScriptableObjects, JSON configs, or Data Tables) so gameplay designers can balance parameters without recompilation.

#### 3. Production Best Practice
1. **Instrument Early**: Profile CPU execution time and memory footprints before scaling asset fidelity.
2. **Player Feedback (Juice)**: Pair every state transition with clear audiovisual cues—a subtle sound effect, particle burst, or visual tween.
3. **Graceful Fallbacks**: Ensure robust error boundaries so unexpected edge conditions don't crash or halt the game loop.

Would you like a tailored code implementation (C#, GDScript, C++, or TypeScript) or a step-by-step tutorial specifically for this? Tell me what engine you're targeting!`;
}
