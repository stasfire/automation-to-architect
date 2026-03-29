# Module 09: Interview Preparation, Resume Strategy, and Portfolio Building

Prepare to ace architecture interviews by building a compelling resume, crafting a strong portfolio, practicing behavioral questions, and executing system design interviews under pressure.

## Learning Objectives

- Rewrite your resume with architecture-focused language and impact
- Build a GitHub portfolio showcasing architecture decisions and diagrams
- Master the STAR method for behavioral questions
- Practice and internalize answers to common architectural interview questions
- Complete mock system design interviews and get real feedback
- Develop a personal narrative around your architecture journey (your "Traphandle story")
- Understand what interviewers are evaluating and how to demonstrate value
- Prepare for salary negotiation conversations

## Key Concepts

**STAR Method (Behavioral Questions)**
Situation: set the scene and context.
Task: what challenge or goal you faced.
Action: what you specifically did (not the team).
Result: quantifiable outcome or lesson learned.
Use for questions like "Tell me about a time you disagreed with your team" or "Describe a system failure you handled."

**What Interviewers Evaluate in System Design**
- Communication clarity: explain your thinking out loud
- Requirements clarification: ask good questions before designing
- Broad knowledge: understand multiple technologies and trade-offs
- Scaling mindset: think about millions of users, not thousands
- Architecture maturity: propose solutions, not just list tools
- Humility: say "I don't know" and pivot rather than bluff

**Handling "I Don't Know" Questions**
Instead of panicking:
1. Acknowledge: "I don't have deep experience with that, but..."
2. Apply existing knowledge: "I'd approach it like [similar problem]"
3. Ask for guidance: "Could you point me to resources on that?"
4. Move forward: "Let's assume X and continue designing"
Interviewers respect honesty and problem-solving more than fake expertise.

**Salary Negotiation Basics**
- Research market rate for your role and experience level (Levels.fyi, Blind)
- Delay salary discussion until they make an offer
- Negotiate salary, equity, title, and signing bonus as a package
- Practice anchoring high but reasonably (15-20% above target)
- Get all offers in writing; negotiation ends when both sides agree
- Consider total compensation (base + equity + benefits)

**Presenting a Portfolio Project**
For each project, prepare a 3-5 minute elevator pitch:
- Problem solved: "We needed to handle 10M requests/day on legacy infrastructure"
- Your role: "I led the architecture and migration strategy"
- Key decisions: "We chose Kafka for event streaming because [trade-offs]"
- Impact: "Reduced latency by 60% and enabled 3x traffic growth"
- What you learned: "This taught me about distributed consistency trade-offs"

## Your Traphandle Story

Traphandle (or your own project) becomes your personal narrative for interviews. Use it to answer:

**"Tell me about a project you're proud of."**
Frame it around architecture maturity:
- Initial state: monolithic, limited by deployment
- Challenge: needed to scale to 10M users
- Your contribution: designed microservices split, API gateway, independent deployments
- Result: enabled feature teams to move fast; system scaled 10x

**"How would you approach building something like Traphandle?"**
(Your own e-commerce platform or service)
- Discuss domain (users, products, orders, payments)
- Highlight how you'd architect differently the second time
- Mention specific technologies and why
- Show you've thought about operational concerns (monitoring, logging)

**"What's your biggest learning from that project?"**
Use to demonstrate architectural maturity:
- "I learned that premature optimization wastes time; measure first"
- "I realized eventual consistency is often good enough for [domain], saving complexity"
- "Operational excellence (monitoring, runbooks) matters as much as code"

**"Why are you interested in being an architect?"**
Show progression from IC engineer:
- "I enjoy solving hard scaling problems, not just coding features"
- "I want to mentor others; architecture decisions impact team velocity"
- "I'm passionate about technical strategy and long-term system health"

## Curated Resources

- [Pramp](https://www.pramp.com) - Free mock interviews with real engineers (system design focus)
- [Interview Kickstart SA Skills](https://interviewkickstart.com/skills/solutions-architect) - Structured SA learning
- [MentorCruise SA Questions](https://mentorcruise.com/questions/solutions-architect/) - Real interview Q&A

Additional resources:
- Blind and Levels.fyi: real compensation data by company and level
- "Cracking the Coding Interview" (also covers system design)
- LinkedIn: follow architects at target companies, learn their language
- YouTube: watch system design interviews (e.g., TechLead, Codeforces)

## Exercises

1. **Rewrite Your Resume with Architecture-Focused Language**
   - Audit your current resume: is it feature-focused or impact-focused?
   - Reframe projects around architecture decisions and business outcomes
   - Example: "Optimized database queries" → "Redesigned data model and indexing strategy, reducing P99 latency 60% and enabling 10M DAU"
   - Include 2-3 key technical skills (distributed systems, cloud platforms, databases)
   - Add metrics: scale you've handled, latency improvements, cost reductions
   - Time: 2-3 hours

2. **Create a GitHub Portfolio README with Architecture Diagrams**
   - Set up a public repo (e.g., "architecture-portfolio")
   - Write a README introducing yourself and your architecture philosophy
   - Include 3-5 past projects with:
     - Problem statement
     - Architecture diagram (ASCII, Lucidchart exported, or PNG)
     - Key design decisions (in ADR format)
     - Technologies used and why
   - Link to Pramp profile or live mock interviews
   - Keep it updated; add designs from module 08
   - Time: 3-4 hours

3. **Practice STAR Method Answers for 5 Behavioral Questions**
   - Pick 5 common questions: conflict, failure, leadership, learning, scale
   - For each, write a 2-3 minute STAR response (about 200 words)
   - Example questions:
     - "Tell me about a time you disagreed with your team's architecture"
     - "Describe a system outage you handled"
     - "How do you approach technical decision-making?"
     - "Give an example of learning from a past mistake"
     - "Tell me about a time you mentored someone"
   - Record yourself and listen back; refine for clarity
   - Time: 3-4 hours

4. **Complete 3 Mock System Design Interviews on Pramp**
   - Schedule 3 mock interviews (45 min each)
   - Use 3 different problems (URL shortener, chat, notification system, etc.)
   - For each, record feedback and areas to improve
   - Iterate: apply feedback to your next mock
   - Pay attention to communication, not just technical correctness
   - Time: 3-4 hours total (1-2 per week)

5. **Write a Traphandle-Style Architecture Case Study**
   - Pick a real project you've worked on (could be work, side project, or hypothetical)
   - Frame it as a case study: initial architecture, scaling challenges, redesign
   - Include:
     - Problem space (scale, latency, cost requirements)
     - Initial architecture and its limitations
     - Redesign decisions (with trade-offs)
     - Implementation journey and lessons learned
     - Metrics (latency, throughput, cost, time to market)
   - Target: 2,000-3,000 words, readable in 10 minutes
   - Publish on Medium, Dev.to, or GitHub
   - Time: 4-5 hours

## How to Mark Complete

1. **Resume**: Share updated resume (anonymized if needed) for review. Should show:
   - Architecture-focused language and metrics
   - 2-3 clear examples of scaling or design impact
   - Technical skills highlighted

2. **Portfolio**: GitHub repo with:
   - Compelling README introduction
   - 3-5 projects with diagrams and decision rationales
   - ADRs for key architectural choices
   - Links to Pramp or other mock interview profiles

3. **STAR Answers**: Document 5 behavioral questions with:
   - Written STAR response for each
   - Personal notes on key points and delivery

4. **Mock Interviews**: Complete 3 mock interviews on Pramp and summarize:
   - Problems presented and your approach
   - Feedback received (quantified by Pramp if available)
   - How you improved between interviews

5. **Case Study**: Publish or share Traphandle-style architecture case study demonstrating:
   - Clear problem framing
   - Architecture decisions with trade-off analysis
   - Measurable outcomes
   - Personal learning

6. **Reflection**: 1-page summary on:
   - Your architecture philosophy and what you value (scalability, simplicity, cost, etc.)
   - How you'd position yourself to an architecture-focused team
   - Top 3 strengths you bring to an architecture role

**Estimated Time: 2 weeks (ongoing)**
(This is a continuous module; revisit and refine as you interview and grow. Mock interviews should become a regular practice.)