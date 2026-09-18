import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { DEFAULT_GAMES, DEFAULT_JOBS, CODE_GEN_PRESETS } from './src/data/siteContent.ts';
import { generateTgsAiAnswer } from './src/utils/tgsAiEngine.ts';

function tgsApiPlugin(): Plugin {
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
          return sendJson(200, { message: 'Tanishq Gaming Studios API', status: 'operational', version: '1.0.0' });
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

        // AI Chat
        if (url.startsWith('/api/ai/chat') && req.method === 'POST') {
          const body = await parseBody();
          const { message, session_id, history } = body;
          const sessionId = session_id || 'tgs_' + Math.random().toString(36).substring(2, 9);
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

              const systemInstruction = `You are TGS-AI, the official interactive game engineering, design, and creative intelligence of Tanishq Gaming Studios (Bengaluru, India).
You provide helpful, comprehensive, authoritative, and engaging answers to EACH AND EVERY prompt the user asks—whether about game engines (Unity C#, Unreal Engine 5 C++/Blueprints, Godot 4 GDScript, WebGL/HTML5), game math (quaternions, vector projection, Bezier curves, physics collisions), game mechanics, game design, story, art, code generation, studio projects (Bubble Shooter Blitz, Cricket Smash, Football Strike, Cyber Samurai, Pixel Odyssey, Neon Drift), Master Academy courses ($25 - $100), general questions, debugging, or casual conversation.
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
                parts: [{ text: String(message || '') }]
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
          const reply = generateTgsAiAnswer(message, history || []);
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
