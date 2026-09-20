import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { DEFAULT_GAMES, DEFAULT_JOBS, CODE_GEN_PRESETS } from './src/data/siteContent.ts';
import { generateTgsAiAnswer } from './src/utils/tgsAiEngine.ts';

function tgsApiPlugin(): Plugin {
  // In-memory persistent storage for conversations
  const conversations: Map<string, any> = new Map([
    [
      'conv_unity_01',
      {
        id: 'conv_unity_01',
        title: 'Unity Character Locomotion & Physics',
        mode: 'gamedev',
        model: 'gemini-3.8-flash',
        createdAt: Date.now() - 3600000 * 2,
        updatedAt: Date.now() - 3600000 * 2,
        pinned: true,
        messages: [
          {
            id: 'm_1',
            role: 'user',
            content: 'How do I implement responsive 2D platformer movement with coyote time in Unity?',
            timestamp: Date.now() - 3600000 * 2
          },
          {
            id: 'm_2',
            role: 'assistant',
            content: `### 🕹️ Modern Unity Locomotion with Coyote Time\n\nHere is a production-grade 2D movement controller utilizing Unity's Input System and coyote time buffering:\n\n\`\`\`csharp\nusing UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class TGSPlatformerController : MonoBehaviour\n{\n    [SerializeField] private float moveSpeed = 9f;\n    [SerializeField] private float jumpForce = 14f;\n    [SerializeField] private float coyoteDuration = 0.12f;\n    [SerializeField] private float jumpBufferDuration = 0.1f;\n    \n    private float _coyoteTimeCounter;\n    private float _jumpBufferCounter;\n    private Rigidbody2D _rb;\n    private bool _isGrounded;\n    \n    void Awake() => _rb = GetComponent<Rigidbody2D>();\n    \n    void Update()\n    {\n        if (_isGrounded) _coyoteTimeCounter = coyoteDuration;\n        else _coyoteTimeCounter -= Time.deltaTime;\n        \n        if (_jumpBufferCounter > 0f && _coyoteTimeCounter > 0f)\n        {\n            _rb.linearVelocity = new Vector2(_rb.linearVelocity.x, jumpForce);\n            _jumpBufferCounter = 0f;\n            _coyoteTimeCounter = 0f;\n        }\n    }\n}\n\`\`\`\n\n💡 **TGS Tip**: Coyote time gives players an extra 100-120ms to press jump after walking off a ledge, dramatically reducing perceived control latency!`,
            timestamp: Date.now() - 3600000 * 2 + 1500
          }
        ]
      }
    ],
    [
      'conv_shader_02',
      {
        id: 'conv_shader_02',
        title: 'Cyberpunk Neon Hologram Shader',
        mode: 'code',
        model: 'gemini-3.8-flash',
        createdAt: Date.now() - 3600000 * 24,
        updatedAt: Date.now() - 3600000 * 24,
        messages: [
          {
            id: 'm_3',
            role: 'user',
            content: 'Write an HLSL or GLSL scanline hologram shader effect for cyberpunk props.',
            timestamp: Date.now() - 3600000 * 24
          },
          {
            id: 'm_4',
            role: 'assistant',
            content: `### ⚡ Hologram Scanline Shader (URP HLSL)\n\nCombine Fresnel rim-lighting with periodic sinusoidal horizontal scanlines for that iconic futuristic projection look:\n\n\`\`\`hlsl\nhalf4 frag(Varyings input) : SV_Target\n{\n    float scanline = sin(input.positionWS.y * 80.0 + _Time.y * 12.0) * 0.5 + 0.5;\n    float fresnel = pow(1.0 - saturate(dot(input.normalWS, input.viewDirWS)), 3.0);\n    half3 glowColor = half3(0.0, 0.82, 1.0); // Electric Blue\n    half alpha = saturate((fresnel + scanline * 0.4) * 0.85);\n    return half4(glowColor * (fresnel + 0.5), alpha);\n}\n\`\`\``,
            timestamp: Date.now() - 3600000 * 24 + 2000
          }
        ]
      }
    ]
  ]);

  // Authenticated user session mock
  let currentUser = {
    id: 'usr_tanishq_01',
    name: 'Tanishq Walunj',
    email: 'walunjtanishq447@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Founder & Lead Game Architect',
    isGuest: false
  };

  return {
    name: 'tgs-api-mock-and-gemini',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api')) {
          return next();
        }

        const parseBody = (): Promise<any> => {
          return new Promise((resolve) => {
            let data = '';
            req.on('data', (chunk) => {
              data += chunk;
            });
            req.on('end', () => {
              try {
                resolve(data ? JSON.parse(data) : {});
              } catch {
                resolve({});
              }
            });
          });
        };

        const sendJson = (status: number, data: any) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        // Root API status
        if (url === '/api' || url === '/api/') {
          return sendJson(200, {
            name: 'TGS AI Chat API',
            status: 'operational',
            version: '2.5.0',
            brand: 'Tanishq Gaming Studios'
          });
        }

        // ================= AUTH ENDPOINTS =================
        if (url === '/api/auth/me') {
          return sendJson(200, currentUser);
        }

        if (url === '/api/auth/login' && req.method === 'POST') {
          const body = await parseBody();
          const email = body.email || 'walunjtanishq447@gmail.com';
          currentUser = {
            id: 'usr_' + Math.random().toString(36).substring(2, 9),
            name: body.name || email.split('@')[0] || 'TGS Developer',
            email,
            avatar: body.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            role: 'Pro Developer',
            isGuest: false
          };
          return sendJson(200, { success: true, user: currentUser });
        }

        if (url === '/api/auth/signup' && req.method === 'POST') {
          const body = await parseBody();
          currentUser = {
            id: 'usr_' + Math.random().toString(36).substring(2, 9),
            name: body.name || 'New Creator',
            email: body.email || 'user@tgs.studio',
            avatar: body.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            role: 'TGS Creator',
            isGuest: false
          };
          return sendJson(200, { success: true, user: currentUser });
        }

        if (url === '/api/auth/profile' && req.method === 'PUT') {
          const body = await parseBody();
          currentUser = { ...currentUser, ...body };
          return sendJson(200, { success: true, user: currentUser });
        }

        if (url === '/api/auth/logout' && req.method === 'POST') {
          currentUser = {
            id: 'usr_guest',
            name: 'Guest Player',
            email: 'guest@tgs.studio',
            avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
            role: 'Guest',
            isGuest: true
          };
          return sendJson(200, { success: true, user: currentUser });
        }

        if (url === '/api/auth/forgot-password' && req.method === 'POST') {
          const body = await parseBody();
          return sendJson(200, {
            success: true,
            message: `Password reset instructions sent to ${body.email || 'your email'}`
          });
        }

        // ================= CONVERSATIONS ENDPOINTS =================
        if (url === '/api/conversations' && req.method === 'GET') {
          const list = Array.from(conversations.values()).sort((a, b) => b.updatedAt - a.updatedAt);
          return sendJson(200, list);
        }

        if (url === '/api/conversations' && req.method === 'POST') {
          const body = await parseBody();
          const id = 'conv_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
          const newConv = {
            id,
            title: body.title || 'New Conversation',
            mode: body.mode || 'general',
            model: body.model || 'gemini-3.8-flash',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            pinned: false,
            messages: body.messages || []
          };
          conversations.set(id, newConv);
          return sendJson(201, newConv);
        }

        if (url === '/api/conversations' && req.method === 'DELETE') {
          conversations.clear();
          return sendJson(200, { success: true, message: 'All conversations cleared' });
        }

        const convMatch = url.match(/^\/api\/conversations\/([a-zA-Z0-9_-]+)/);
        if (convMatch) {
          const convId = convMatch[1];
          const conv = conversations.get(convId);

          // Sub-route: /api/conversations/:id/messages
          if (url.endsWith('/messages') && req.method === 'POST') {
            const body = await parseBody();
            if (!conv) {
              return sendJson(404, { error: 'Conversation not found' });
            }
            const msg = {
              id: 'm_' + Date.now() + Math.random().toString(36).substring(2, 5),
              role: body.role || 'user',
              content: body.content || '',
              timestamp: Date.now(),
              attachments: body.attachments || [],
              mode: body.mode || conv.mode,
              model: body.model || conv.model
            };
            conv.messages.push(msg);
            conv.updatedAt = Date.now();
            return sendJson(201, msg);
          }

          if (req.method === 'GET') {
            if (!conv) return sendJson(404, { error: 'Conversation not found' });
            return sendJson(200, conv);
          }

          if (req.method === 'PUT') {
            const body = await parseBody();
            if (!conv) return sendJson(404, { error: 'Conversation not found' });
            const updated = { ...conv, ...body, updatedAt: Date.now() };
            conversations.set(convId, updated);
            return sendJson(200, updated);
          }

          if (req.method === 'DELETE') {
            conversations.delete(convId);
            return sendJson(200, { success: true, id: convId });
          }
        }

        // Games endpoint
        if (url.startsWith('/api/games')) {
          return sendJson(200, DEFAULT_GAMES);
        }

        // Jobs endpoint
        if (url.startsWith('/api/jobs')) {
          return sendJson(200, DEFAULT_JOBS);
        }

        // Newsletter subscription
        if (url.startsWith('/api/subscribe') && req.method === 'POST') {
          const body = await parseBody();
          return sendJson(200, {
            success: true,
            id: 'sub_' + Math.random().toString(36).substring(2, 9),
            email: body.email || 'subscriber@tgs.studio',
            created_at: new Date().toISOString()
          });
        }

        // Contact message
        if (url.startsWith('/api/contact') && req.method === 'POST') {
          const body = await parseBody();
          return sendJson(200, {
            success: true,
            id: 'msg_' + Math.random().toString(36).substring(2, 9),
            ...body,
            created_at: new Date().toISOString()
          });
        }

        // AI Code Gen
        if (url.startsWith('/api/ai/code-gen') && req.method === 'POST') {
          const body = await parseBody();
          const { prompt, engine } = body;
          const apiKey = process.env.GEMINI_API_KEY;

          if (apiKey) {
            try {
              const ai = new GoogleGenAI({
                apiKey,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build'
                  }
                }
              });
              const systemPrompt = `You are TGS-AI, an expert game engine code architect for Tanishq Gaming Studios.
The user wants game code for engine: "${engine || 'unity'}".
Prompt: "${prompt}"
Respond ONLY with production-ready, clean, well-commented code snippet. No marketing preamble. Include brief setup instructions as comments.`;

              const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: systemPrompt
              });
              if (response.text) {
                return sendJson(200, { reply: response.text });
              }
            } catch (err: any) {
              console.error('Gemini code-gen error:', err?.message);
            }
          }

          // Smart fallback matching chosen engine and prompt
          let fallbackCode = '';
          const preset = CODE_GEN_PRESETS.find(p => p.engine === engine) || CODE_GEN_PRESETS[0];

          if (engine === 'unity') {
            fallbackCode = `// TGS-AI Studio Generated Unity C# Script
// Target: Unity 2023.2+ / Unity 6
using UnityEngine;

[RequireComponent(typeof(Rigidbody2D))]
public class TGSPlayerController : MonoBehaviour
{
    [Header("Locomotion")]
    [SerializeField] private float moveSpeed = 9.5f;
    [SerializeField] private float jumpForce = 14f;
    [SerializeField] private int maxJumps = 2;

    [Header("Ground Check")]
    [SerializeField] private Transform groundCheck;
    [SerializeField] private LayerMask groundLayer;
    [SerializeField] private float groundRadius = 0.22f;

    private Rigidbody2D _rb;
    private int _jumpsRemaining;
    private bool _isGrounded;
    private float _horizontalInput;

    private void Awake()
    {
        _rb = GetComponent<Rigidbody2D>();
    }

    private void Update()
    {
        _horizontalInput = Input.GetAxisRaw("Horizontal");
        _isGrounded = Physics2D.OverlapCircle(groundCheck.position, groundRadius, groundLayer);

        if (_isGrounded)
        {
            _jumpsRemaining = maxJumps;
        }

        if (Input.GetButtonDown("Jump") && _jumpsRemaining > 0)
        {
            _rb.linearVelocity = new Vector2(_rb.linearVelocity.x, jumpForce);
            _jumpsRemaining--;
        }
    }

    private void FixedUpdate()
    {
        _rb.linearVelocity = new Vector2(_horizontalInput * moveSpeed, _rb.linearVelocity.y);
    }
}`;
          } else if (engine === 'unreal') {
            fallbackCode = `// TGS-AI Studio Generated Unreal Engine C++ Component
// Target: Unreal Engine 5.4+ ActorComponent
#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "TGSHealthComponent.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnHealthChanged, float, NewHealth);
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnPlayerDied);

UCLASS(ClassGroup=(TGS), meta=(BlueprintSpawnableComponent))
class UTGSHealthComponent : public UActorComponent
{
    GENERATED_BODY()

public:
    UTGSHealthComponent()
    {
        PrimaryComponentTick.bCanEverTick = false;
        MaxHealth = 100.0f;
        CurrentHealth = MaxHealth;
    }

    UPROPERTY(BlueprintAssignable, Category = "TGS|Health")
    FOnHealthChanged OnHealthChanged;

    UPROPERTY(BlueprintAssignable, Category = "TGS|Health")
    FOnPlayerDied OnPlayerDied;

    UFUNCTION(BlueprintCallable, Category = "TGS|Health")
    void ApplyDamage(float DamageAmount)
    {
        if (CurrentHealth <= 0.0f) return;

        CurrentHealth = FMath::Clamp(CurrentHealth - DamageAmount, 0.0f, MaxHealth);
        OnHealthChanged.Broadcast(CurrentHealth);

        if (CurrentHealth <= 0.0f)
        {
            OnPlayerDied.Broadcast();
        }
    }

protected:
    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "TGS|Health")
    float MaxHealth;

    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "TGS|Health")
    float CurrentHealth;
};`;
          } else if (engine === 'godot') {
            fallbackCode = `# TGS-AI Studio Generated Godot 4 GDScript
# Target: Godot 4.2+ Inventory System
class_name TGSInventory extends Resource

signal inventory_updated(items: Array)

@export var max_slots: int = 24
var items: Array[Dictionary] = []

func add_item(item_id: String, quantity: int = 1, metadata: Dictionary = {}) -> bool:
    for item in items:
        if item["id"] == item_id and item.get("stackable", true):
            item["quantity"] += quantity
            inventory_updated.emit(items)
            return true

    if items.size() < max_slots:
        items.append({
            "id": item_id,
            "quantity": quantity,
            "meta": metadata
        })
        inventory_updated.emit(items)
        return true
    return false

func remove_item(slot_index: int, quantity: int = 1) -> bool:
    if slot_index >= 0 and slot_index < items.size():
        items[slot_index]["quantity"] -= quantity
        if items[slot_index]["quantity"] <= 0:
            items.remove_at(slot_index)
        inventory_updated.emit(items)
        return true
    return false`;
          } else {
            fallbackCode = `// TGS-AI Studio Generated HTML5 / Canvas Game Loop
// Space Shooter Prototype
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const player = { x: 400, y: 520, speed: 6, width: 32, height: 32 };
const bullets = [];
const enemies = [];
let score = 0;

function update() {
  // Update bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= 9;
    if (bullets[i].y < 0) bullets.splice(i, 1);
  }

  // Draw
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#39FF14';
  ctx.fillRect(player.x - 16, player.y - 16, player.width, player.height);

  ctx.fillStyle = '#E53935';
  bullets.forEach(b => ctx.fillRect(b.x - 2, b.y - 8, 4, 16));

  requestAnimationFrame(update);
}
requestAnimationFrame(update);`;
          }

          return sendJson(200, { reply: fallbackCode });
        }

        // AI Chat Streaming endpoint (SSE)
        if (url.startsWith('/api/ai/chat/stream') && req.method === 'POST') {
          const body = await parseBody();
          const { message, session_id, history, mode = 'general', attachments = [] } = body;
          const sessionId = session_id || 'tgs_' + Math.random().toString(36).substring(2, 9);
          
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
          });

          // Compose full prompt if attachments exist
          let promptWithAttachments = message || '';
          if (Array.isArray(attachments) && attachments.length > 0) {
            const attDetails = attachments
              .map((a: any) => `[Attachment: ${a.name} (${a.type || 'file'}) ${a.textContent ? '\nContent:\n' + a.textContent : ''}]`)
              .join('\n\n');
            promptWithAttachments += '\n\n' + attDetails;
          }

          const apiKey = process.env.GEMINI_API_KEY;
          let fullReply = '';

          if (apiKey) {
            try {
              const ai = new GoogleGenAI({
                apiKey,
                httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
              });

              let modeInstruction = '';
              if (mode === 'code') {
                modeInstruction = 'You are in TGS Code Mode. Focus heavily on clean, production-ready, performant code, syntax precision, and debugging.';
              } else if (mode === 'gamedev') {
                modeInstruction = 'You are in TGS Game Dev Mode. Specialize in Unity C#, Unreal Engine 5 C++/Blueprints/GAS, Godot 4 GDScript, game mechanics, physics, and shaders.';
              } else if (mode === 'creative') {
                modeInstruction = 'You are in TGS Creative Mode. Specialize in rich worldbuilding, narrative arcs, game design documents, NPC dialogue, and high-concept game ideas.';
              }

              const systemInstruction = `You are TGS-AI, the official interactive AI gaming, coding, and creative assistant of Tanishq Gaming Studios (Bengaluru, India).
${modeInstruction}
You provide helpful, comprehensive, authoritative, and engaging answers to EACH AND EVERY prompt the user asks.
Format answers clearly with markdown, bold highlights, bullet points, tables, and clean syntax-highlighted code blocks where helpful. Keep your tone enthusiastic, sharp, and encouraging.`;

              const contents: any[] = [];
              if (Array.isArray(history) && history.length > 0) {
                for (const h of history.slice(-8)) {
                  if (h && (h.role === 'user' || h.role === 'assistant')) {
                    contents.push({
                      role: h.role === 'assistant' ? 'model' : 'user',
                      parts: [{ text: String(h.content || '') }]
                    });
                  }
                }
              }
              contents.push({
                role: 'user',
                parts: [{ text: String(promptWithAttachments || '') }]
              });

              const responseStream = await ai.models.generateContentStream({
                model: 'gemini-3.8-flash',
                contents,
                config: { systemInstruction }
              });

              for await (const chunk of responseStream) {
                const chunkText = chunk.text || '';
                if (chunkText) {
                  fullReply += chunkText;
                  res.write(`data: ${JSON.stringify({ chunk: chunkText, done: false })}\n\n`);
                }
              }

              res.write(`data: ${JSON.stringify({ chunk: '', done: true, full: fullReply, session_id: sessionId })}\n\n`);
              return res.end();
            } catch (err: any) {
              console.error('Gemini stream error, falling back:', err?.message);
            }
          }

          // Fallback streamer using generateTgsAiAnswer
          const fallbackReply = generateTgsAiAnswer(promptWithAttachments, history || [], mode);
          const words = fallbackReply.split(' ');
          for (let i = 0; i < words.length; i += 3) {
            const chunk = words.slice(i, i + 3).join(' ') + (i + 3 < words.length ? ' ' : '');
            res.write(`data: ${JSON.stringify({ chunk, done: false })}\n\n`);
            // micro-delay for organic streaming feel
            await new Promise((r) => setTimeout(r, 20));
          }
          res.write(`data: ${JSON.stringify({ chunk: '', done: true, full: fallbackReply, session_id: sessionId })}\n\n`);
          return res.end();
        }

        // AI Chat (Standard JSON)
        if (url.startsWith('/api/ai/chat') && req.method === 'POST') {
          const body = await parseBody();
          const { message, session_id, history, mode = 'general', attachments = [] } = body;
          const sessionId = session_id || 'tgs_' + Math.random().toString(36).substring(2, 9);
          const apiKey = process.env.GEMINI_API_KEY;

          let promptWithAttachments = message || '';
          if (Array.isArray(attachments) && attachments.length > 0) {
            const attDetails = attachments
              .map((a: any) => `[Attachment: ${a.name} (${a.type || 'file'}) ${a.textContent ? '\nContent:\n' + a.textContent : ''}]`)
              .join('\n\n');
            promptWithAttachments += '\n\n' + attDetails;
          }

          if (apiKey) {
            try {
              const ai = new GoogleGenAI({
                apiKey,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build'
                  }
                }
              });

              let modeInstruction = '';
              if (mode === 'code') {
                modeInstruction = 'You are in TGS Code Mode. Specialize in programming, clean syntax, debugging, and architectures.';
              } else if (mode === 'gamedev') {
                modeInstruction = 'You are in TGS Game Dev Mode. Specialize in Unity C#, Unreal Engine 5, Godot 4 GDScript, math, and game feel.';
              } else if (mode === 'creative') {
                modeInstruction = 'You are in TGS Creative Mode. Specialize in worldbuilding, lore, game ideas, narrative design, and dialogue.';
              }

              const systemInstruction = `You are TGS-AI, the official interactive AI gaming, coding, and creative assistant of Tanishq Gaming Studios (Bengaluru, India).
${modeInstruction}
You provide helpful, comprehensive, authoritative, and engaging answers to EACH AND EVERY prompt the user asks.
Format answers clearly with markdown, bold highlights, bullet points, and clean syntax-highlighted code blocks where helpful. Keep your tone enthusiastic, sharp, and encouraging.`;

              // Build contents array supporting conversation history
              const contents: any[] = [];
              if (Array.isArray(history) && history.length > 0) {
                for (const h of history.slice(-8)) {
                  if (h && (h.role === 'user' || h.role === 'assistant')) {
                    contents.push({
                      role: h.role === 'assistant' ? 'model' : 'user',
                      parts: [{ text: String(h.content || '') }]
                    });
                  }
                }
              }
              contents.push({
                role: 'user',
                parts: [{ text: String(promptWithAttachments || '') }]
              });

              const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents,
                config: {
                  systemInstruction
                }
              });

              if (response.text) {
                return sendJson(200, { session_id: sessionId, reply: response.text });
              }
            } catch (err: any) {
              console.error('Gemini chat error:', err?.message);
            }
          }

          // Dynamic comprehensive fallback engine that answers each and every prompt
          const reply = generateTgsAiAnswer(promptWithAttachments, history || [], mode);
          return sendJson(200, { session_id: sessionId, reply });
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), tgsApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
