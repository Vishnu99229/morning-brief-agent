 Morning Brief Agent

Your personal AI-powered morning news briefing — fetched, ranked, and read aloud to you every day.

Morning Brief Agent pulls news from multiple sources, scores each article against your personal interests using GPT-4o, and generates a voice-ready briefing script. Pair it with Vapi to get a phone call every morning with just the news that matters to you.

How It Works
┌─────────────────┐     ┌─────────────────┐
│  RSS Feeds (8)  │     │  NewsAPI (5)     │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     ▼
              Deduplicate &
             Scrape Full Text
                     │
                     ▼
           ┌─────────────────┐
           │   news_pool     │  ← Supabase
           └────────┬────────┘
                    │
                    ▼
         GPT-4o Relevance Scoring
        (each article vs. your profile)
                    │
                    ▼
              Top 10 Articles
                    │
                    ▼
         GPT-4o Script Generation
                    │
                    ▼
           ┌─────────────────┐
           │ daily_briefing  │  → Voice-ready script
           └─────────────────┘

Quick Start
Prerequisites

Node.js v18+
A Supabase project
API keys for OpenAI and NewsAPI

1. Clone & install
bashgit clone https://github.com/Vishnu99229/morning-brief-agent.git
cd morning-brief-agent
npm install
2. Set up environment variables
bashcp .env.example .env
Then fill in your .env:
VariableSourceSUPABASE_URLSupabase → Settings → API → Project URLSUPABASE_SERVICE_KEYSupabase → Settings → API → service_role keyOPENAI_API_KEYplatform.openai.com → API KeysNEWSAPI_KEYnewsapi.org → Register
3. Create the database tables
Open Supabase SQL Editor, paste the contents of src/db/schema.sql, and run it.
4. Seed a test user
bashnpm run seed
Save the printed UUID — you'll need it for the next step.
5. Run the full pipeline
bashnpm run daily -- <userId>
This runs ingest → rank → script end to end and saves the briefing to your database.

Commands
CommandDescriptionnpm run daily -- <userId>Full pipeline: ingest → rank → generate scriptnpm run ingestFetch articles from RSS + NewsAPI, dedupe, scrape, and storenpm run rank -- <userId>Score articles against user profile, print top 10npm run script -- <userId>Rank + generate voice-ready briefing scriptnpm run seedSeed (or re-seed) the test user profile

Tech Stack

Runtime — Node.js
Database — Supabase (PostgreSQL)
AI — OpenAI GPT-4o (ranking + script generation)
News Sources — RSS feeds (8 sources) + NewsAPI (5 query categories)
Voice Delivery — Vapi + Twilio (phone calls)
Text-to-Speech — ElevenLabs
Hosting — Railway


Web & Admin
The server also includes:
RoutePurpose/Landing page with waitlist signup/adminPassword-protected admin panel/api/cron/trigger-callsCron endpoint to trigger scheduled calls
Scheduling Calls
Set up a cron job (e.g. via cron-job.org or a Railway Cron Service) to hit:
POST https://<your-railway-url>/api/cron/trigger-calls
Authorization: Bearer <your-CRON_SECRET>
Run it every 15 minutes (or at your preferred interval).

Tuning the Ranking
If the briefing picks up irrelevant articles or misses important ones, you can tune the ranking:

Adjust the score threshold — In src/rank/rank.ts, change score >= 6 to a lower/higher value.
Edit the scoring rubric — Modify the system prompt in src/rank/prompt.ts to shift how categories are weighted.
Add few-shot examples — Show the model what a "good" vs "bad" score looks like for specific article types.
Tweak VIP entities — Make high-priority entity matches more explicit in the prompt.
Update filters — Edit explicit_filters in seed-user.ts and re-run npm run seed.

After ranking, the CLI prints the top 10 articles with scores and reasoning. Full debug output is saved to daily_briefing.ranking_debug_json.

Roadmap

 News ingestion pipeline (RSS + NewsAPI)
 GPT-4o relevance ranking against user profiles
 Voice-ready script generation
 Landing page + admin panel
 Vapi voice agent for phone delivery
 User preferences API
 Feedback loop (thumbs up/down on articles)
 Multi-user scheduling via cron


License
MIT
