Setup Guide
Step-by-step checklist to go from fresh clone to live deployment.

1. Database Migration
Open Supabase SQL Editor (Dashboard → SQL Editor → New Query), paste the contents of src/db/migration-v2.sql, and click Run.
This creates the users, news_pool, and daily_briefing tables.
2. Environment Variables
Copy the example file and fill in your values:
bashcp .env.example .env
Then add the same variables to your Railway service under Settings → Variables.
See .env.example for the full list of required variables.
3. Deploy
bashgit push origin main
railway up --detach
4. Verify Landing Page
Visit your deployment URL:
https://<your-railway-url>/
Fill out the waitlist form. Confirm the submission appears in the Supabase users table with status = 'pending'.
5. Verify Admin Panel
Visit:
https://<your-railway-url>/admin
Log in with your ADMIN_PASSWORD and verify you can:

See the waitlist
Approve a user (this generates profile_json via LLM)
Click "Call now" on an active user to trigger a test call

6. Set Up Cron
Railway doesn't support cron for hitting your own running service endpoint. Use an external scheduler like cron-job.org (free tier works):
SettingValueURLhttps://<your-railway-url>/api/cron/trigger-callsMethodGETHeaderAuthorization: Bearer <your-CRON_SECRET>Schedule*/15 * * * * (every 15 minutes)
This checks which active users are due for their daily briefing call and triggers it.
Alternatively, create a separate Railway Cron Service that calls the same URL with the same auth header.
7. Daily Operations

News ingestion — Run npm run ingest once daily (or set up a second cron job for it)
User approvals — Approve new waitlist signups via /admin
Call monitoring — Check call logs in the Vapi dashboard

Routes Reference
RoutePurpose/Landing page + waitlist signup/adminAdmin panel (password-protected)/healthHealth check endpoint/webhookVapi event webhook/api/cron/trigger-callsCron trigger for scheduled calls
