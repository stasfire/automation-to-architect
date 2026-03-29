# Module 08: System Design for Architecture and Interview Preparation

Master large-scale system design through hands-on exercises and interview preparation. Learn to make architectural trade-offs, design for scale, and communicate your decisions clearly.

## Learning Objectives

- Understand fundamental distributed systems concepts (CAP theorem, consistency models)
- Design scalable systems for real-world scenarios (chat, e-commerce, payments)
- Make informed trade-offs between consistency, availability, and partition tolerance
- Choose appropriate databases, caching strategies, and messaging queues for use cases
- Design load balancing, rate limiting, and CDN strategies
- Write architecture decision records (ADRs) for design choices
- Practice system design interviews and communicate solutions under time pressure
- Receive feedback on your designs and iterate

## Key Concepts

**CAP Theorem**
In distributed systems, you can guarantee only two of: Consistency (all nodes see same data), Availability (system always responds), Partition tolerance (system survives network splits). Choose based on your use case.

**Database Sharding vs. Replication**
Sharding distributes data across multiple databases by key (horizontal partitioning). Replication copies data to multiple nodes for redundancy and read scaling. Use both: shard for write scaling, replicate shards for high availability.

**Caching Strategies**
- Write-through: write to cache and DB synchronously (slower, consistent)
- Write-back: write to cache, async to DB (faster, risks data loss)
- Write-around: bypass cache, write to DB (good when cache isn't needed for reads)

**Load Balancing Algorithms**
- Round-robin: simple, equal distribution
- Least connections: sends to server with fewest active connections
- IP hash: consistent routing by client IP (good for session affinity)
- Weighted: distribute based on server capacity

**Message Queues**
Decouple producers from consumers. Use for async tasks, event streaming, job scheduling. Choose Kafka for high-throughput streaming, RabbitMQ for job queues, SQS for AWS-native applications.

**Horizontal vs. Vertical Scaling**
Horizontal: add more servers (distributed, resilient but complex).
Vertical: add CPU/RAM to existing server (simpler, single point of failure).
Use horizontal scaling for resilience; vertical for simplicity up to limits.

**API Gateway Pattern**
Single entry point for all client requests. Handles routing, authentication, rate limiting, request/response transformation. Decouples clients from backend services.

**Eventual Consistency**
In distributed systems, replicas may temporarily diverge; they converge over time. Accept for high-availability use cases; avoid for transactional integrity (e.g., bank transfers).

## Curated Resources

- [System Design Primer (GitHub)](https://github.com/donnemartin/system-design-primer) - Comprehensive guide with scalability concepts
- [ByteByteGo System Design 101 (GitHub)](https://github.com/ByteByteGoHq/system-design-101) - Visual diagrams and real-world examples
- [Awesome System Design Resources (GitHub)](https://github.com/ashishps1/awesome-system-design-resources) - Curated links and papers
- [Grokking the System Design Interview](https://www.designgurus.io/course/grokking-the-system-design-interview) - Structured course with 20+ case studies
- [Pramp](https://www.pramp.com) - Free mock interviews with real engineers

Additional reading:
- Designing Data-Intensive Applications (book by Martin Kleppmann)
- Twitter's Snowflake architecture (UUID generation at scale)
- Netflix's microservices architecture blog posts
- Amazon's DynamoDB design paper

## Exercises

1. **Design a URL Shortener (bit.ly/tinyurl style)**
   - Support 100M unique shortened URLs
   - Design database schema (SQL or NoSQL choice and justification)
   - Handle collisions and uniqueness
   - Design the API endpoints
   - Estimate storage and QPS
   - Time: 3-4 hours

2. **Design a Chat/Messaging System (Slack/WhatsApp style)**
   - Support 1M concurrent users, millions of messages/day
   - Design for one-to-one and group chats
   - Choose data storage (SQL, NoSQL, hybrid)
   - Design real-time message delivery (WebSocket, polling, or gRPC)
   - Handle message persistence and search
   - Time: 5-6 hours

3. **Design an E-commerce Platform (inspired by Traphandle-style architecture)**
   - Support product catalog (millions of SKUs), user accounts, shopping cart
   - Design checkout and payment flow
   - Separate read-heavy (catalog) from write-heavy (orders) services
   - Design search (Elasticsearch or SQL LIKE alternatives)
   - Plan for Black Friday traffic spikes
   - Time: 5-6 hours

4. **Design a Notification System**
   - Support multiple channels: email, SMS, push notifications
   - Design for 100M+ notifications/day with low latency
   - Handle retries and failure modes
   - Use message queue (Kafka/RabbitMQ) for decoupling
   - Design batching and rate limiting per user
   - Time: 4-5 hours

5. **Design a CDN (Content Delivery Network)**
   - Understand edge servers, caching, and geographic distribution
   - Design for video streaming (YouTube/Netflix style)
   - Handle cache invalidation
   - Design health checks and failover
   - Choose between push (proactive) vs. pull (lazy) cache population
   - Time: 4-5 hours

6. **Design a Rate Limiter**
   - Implement at API gateway or service level
   - Choose algorithm: token bucket, sliding window, or leaky bucket
   - Design for distributed systems (Redis-backed counters)
   - Handle per-user, per-IP, and per-endpoint limits
   - Design graceful degradation when limit exceeded
   - Time: 3-4 hours

7. **Write Architecture Decision Records (ADRs) for 3 Design Choices**
   - Pick 3 decisions from your system designs above (e.g., "Why we chose PostgreSQL over DynamoDB")
   - Format: title, status, context, decision, consequences, alternatives considered
   - Make them clear enough for a peer to understand your reasoning
   - Use the ADR template from https://github.com/joelparkerhenderson/architecture_decision_record
   - Time: 2-3 hours

8. **Present a System Design to a Peer and Get Feedback**
   - Schedule a mock interview on Pramp (25-45 minutes)
   - Present one of your designs end-to-end
   - Answer clarifying questions and defend your choices
   - Collect feedback on communication, depth, and trade-offs
   - Iterate based on feedback
   - Time: 1-2 hours (plus iteration)

## How to Mark Complete

1. Complete at least **6 of 8 exercises**. At minimum, include:
   - URL shortener design (exercise 1)
   - Chat system design (exercise 2)
   - One cloud/infrastructure design (exercise 4 or 5)
   - ADRs for 3 design choices (exercise 7)

2. For each design, document:
   - Problem statement and requirements (functional and non-functional)
   - High-level architecture diagram (can be ASCII or drawn)
   - Key components and their responsibilities
   - Data flow and communication patterns
   - Trade-offs made and alternatives considered
   - Scaling strategy

3. Complete at least **1 mock interview on Pramp** (exercise 8) and summarize:
   - Which design you presented
   - Feedback received (strengths and areas to improve)
   - How you'd iterate on the design based on feedback

4. Submit all designs in a GitHub repo with a README linking to each design document.

**Estimated Time: 4 weeks (ongoing practice)**
(This is a continuous learning module; revisit designs periodically to deepen your understanding.)