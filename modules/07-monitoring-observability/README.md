# Module 07: Monitoring, Observability, and Alerting

Learn how to instrument systems for visibility, collect and visualize metrics, build dashboards, and create intelligent alerting strategies.

## Learning Objectives

- Understand the three pillars of observability: metrics, logs, and traces
- Set up and configure Prometheus for metrics collection and scraping
- Build effective dashboards and visualizations with Grafana
- Implement alerting rules and notifications for system health
- Monitor cloud services (AWS CloudWatch) and configure alarms
- Implement structured logging and log aggregation strategies
- Define and track SLIs, SLOs, and SLAs in your systems
- Create runbooks and incident response procedures

## Key Concepts

**Metrics vs Logs vs Traces**
Metrics are quantitative data (CPU usage, request latency). Logs are events with context. Traces show request flow across services. Together they provide complete observability.

**Prometheus Pull Model**
Unlike push-based systems, Prometheus scrapes metrics from endpoints on a schedule. This decouples monitoring from application code and allows Prometheus to control collection frequency.

**Grafana Dashboards**
Grafana is an open-source visualization platform that queries data sources (Prometheus, Elasticsearch, CloudWatch) and displays them as panels, graphs, and heatmaps. Dashboards are shareable and alertable.

**Alerting Best Practices**
Alert on outcomes (SLOs missed), not raw thresholds. Reduce noise with proper thresholds and alert grouping. Route alerts to on-call teams. Include runbooks in notifications.

**Structured Logging**
Use JSON or key-value logging formats. Include request IDs, user IDs, and service names. Aggregate logs with ELK Stack, Splunk, or cloud services for searchability and correlation.

**SLI/SLO/SLA**
SLI (Service Level Indicator): what you measure (e.g., request success rate).
SLO (Service Level Objective): target you commit to (e.g., 99.9% uptime).
SLA (Service Level Agreement): contract with consequences if SLO is missed.

## Curated Resources

- [Prometheus Official Docs](https://prometheus.io/docs/introduction/overview/) - Start with the Getting Started guide
- [Grafana Tutorials](https://grafana.com/tutorials/) - Video walkthroughs and hands-on labs
- [AWS CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/) - For cloud-native monitoring
- [Grafana Playground](https://play.grafana.org/) - Free sandbox to explore Grafana without setup

Additional reading:
- Google SRE Book chapter on Monitoring (free online)
- Datadog Observability 101 course (free certification)
- O'Reilly "Observability Engineering" (book)

## Exercises

1. **Set Up Prometheus to Monitor a Local App**
   - Create a simple Node.js or Python app that exposes a `/metrics` endpoint
   - Configure Prometheus to scrape this endpoint every 15 seconds
   - Query metrics in Prometheus UI (e.g., `rate(http_requests_total[5m])`)
   - Time: 3-4 hours

2. **Create Grafana Dashboards with Alerts**
   - Connect Grafana to your Prometheus instance
   - Build a dashboard with 5+ panels (CPU, memory, request rate, latency, error rate)
   - Set up at least 2 alert rules (e.g., high error rate, high latency)
   - Configure a notification channel (email, Slack, or webhook)
   - Time: 4-5 hours

3. **Configure AWS CloudWatch Alarms for EC2/Lambda**
   - Create an EC2 instance or Lambda function
   - Set up custom metrics or use default metrics (CPU, invocations, duration)
   - Define CloudWatch alarms for warning and critical thresholds
   - Create a CloudWatch dashboard
   - Test alarm notifications via SNS
   - Time: 3-4 hours

4. **Implement Structured Logging with Log Aggregation**
   - Modify your app to output JSON logs with request IDs and service name
   - Set up an ELK stack (Elasticsearch, Logstash, Kibana) OR use AWS CloudWatch Logs
   - Aggregate and search logs by request ID, error type, or service
   - Create a Kibana/CloudWatch dashboard for log analysis
   - Time: 4-5 hours

## How to Mark Complete

1. Screenshot or screen recording showing:
   - Prometheus scraping your metrics endpoint successfully
   - A Grafana dashboard with at least 3 custom panels
   - A CloudWatch alarm in ALARM state and notification received
   - A log aggregation query returning structured log entries

2. Write a 2-3 paragraph reflection on:
   - One key insight about monitoring in production
   - How you would apply observability to a system you've built
   - The difference you notice when metrics/logs are available vs. unavailable

3. Optional: Share a GitHub repo or gist with your Prometheus config, Grafana dashboard JSON export, and sample app code.

**Estimated Time: 2 weeks**
(Adjust based on your pace; can be extended for deeper exploration of log aggregation or Kubernetes monitoring.)