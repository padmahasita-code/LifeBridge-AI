
# LifeBridge AI

> Care, shared. Life, planned together.

LifeBridge AI is a family care and action planner.
It brings family members and caregivers onto one shared plan with schedules,
daily check-ins, tasks, and CareCircle AI, an assistant that offers compassionate guidance.
## 
> LIVE DEMO 
#  https://lifebridge-ai.ai.studio/

## Features

- **Shared schedules:** Keep appointments, medications, and visits in one calendar that everyone can see.
- **Daily check-ins:** Share a short daily update so loved ones know how someone is doing.
- **Shared tasks:** Assign and track errands and care responsibilities.
- **CareCircle AI:** Get summaries, suggested next steps, and compassionate guidance for caregivers.

## How It Works
1. Create a care circle and invite family members or caregivers.
2. Add schedules and tasks.
3. Check in daily and stay informed.

## Tech Stack
- Google AI Studio (app prototype)
- [Frontend framework, e.g., React + TypeScript]
- [AI model used by CareCircle AI, e.g., Gemini]

## Getting Started

### Prerequisites

- [Node.js version, e.g., 18 or later]
- [API key or account needed, e.g., a Gemini API key]

### Installation
```bash
git clone https://github.com/<your-username>/lifebridge-ai.git
cd lifebridge-ai
npm install
```
### Environment Variables
Create a `.env.local` file in the project root:
```
GEMINI_API_KEY=your_api_key_here
```
Never commit this file or share your real API key in the repository.

### Run Locally
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) [confirm the port].

## Project Structure
```
lifebridge-ai/
├── src/          # Application source code
├── public/       # Static assets
├── README.md
└── LICENSE
```
## Roadmap
- [Planned feature, e.g., caregiver alerts for missed check-ins]
- [Planned feature, e.g., voice-based check-ins]

## Disclaimer
LifeBridge AI supports planning and coordination. It is not a substitute for medical or professional care.
## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
## Acknowledgments
Built with Google AI Studio and Claude
### Privacy note
This demo is for evaluation only. Please don't enter real personal, medical, or family information.
### Running the app yourself
If you want to run the code locally instead, follow the steps in [Getting Started](#getting-started).
