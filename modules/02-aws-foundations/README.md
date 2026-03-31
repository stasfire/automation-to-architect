# Module 2: AWS Cloud Fundamentals and Core Services

Master the essential AWS services and cloud computing concepts to build scalable, reliable applications on AWS.

## Learning Objectives

- Understand cloud computing models and AWS's shared responsibility model
- Create and secure an AWS account with billing controls
- Launch and configure EC2 instances for compute workloads
- Store and serve content using S3 and understand storage classes
- Implement identity and access management with IAM
- Understand binary, decimal, and hexadecimal number systems
- Calculate subnets using CIDR notation and subnet masks
- Design and deploy network infrastructure with VPC
- Monitor costs and optimize resource usage

## Key Concepts

### Part 1: Infrastructure Fundamentals

Before learning cloud services, you need to understand what's actually running underneath. Every AWS service maps to a physical concept.

---

**Server Fundamentals**

A server is just a computer that serves requests. What makes it a "server" is its role, not special hardware.

Key components:
- **CPU (Central Processing Unit)** — the brain. Measured in cores and clock speed (GHz). More cores = more tasks in parallel. A 4-core 3.0 GHz CPU can handle 4 threads simultaneously.
- **RAM (Random Access Memory)** — fast, temporary working memory. Data disappears when power is lost. Measured in GB. More RAM = more applications and data held in memory at once. Example: a database server needs lots of RAM to cache queries.
- **Disk/Storage** — persistent data that survives reboots. Two main types:
  - **HDD (Hard Disk Drive)** — spinning magnetic platters. Cheap, high capacity, slower. Good for backups and archives.
  - **SSD (Solid State Drive)** — flash memory, no moving parts. Faster, more expensive. Good for databases and OS drives.
- **NIC (Network Interface Card)** — connects the server to the network. Measured in Gbps (gigabits per second).

**How this maps to AWS:**
- CPU + RAM = EC2 instance types (t3.micro = 2 vCPU, 1 GB RAM; m5.xlarge = 4 vCPU, 16 GB RAM)
- Disk = EBS volumes (gp3 = SSD, st1 = HDD)
- Physical server = EC2 bare metal instances

**Virtualization**
One physical server can run multiple virtual machines (VMs) using a **hypervisor** (software that divides hardware resources). This is the foundation of cloud computing — AWS runs millions of physical servers, each hosting many VMs (EC2 instances). You get an isolated slice of a physical machine.

```
Physical Server (96 cores, 384 GB RAM, 10 TB SSD)
├── VM 1: t3.micro  (2 vCPU, 1 GB RAM)
├── VM 2: t3.small  (2 vCPU, 2 GB RAM)
├── VM 3: m5.large  (2 vCPU, 8 GB RAM)
└── ... many more VMs sharing the same hardware
```

---

**Storage Fundamentals**

Three types of storage — each solves a different problem:

| Type | What It Is | Analogy | AWS Service |
|------|-----------|---------|-------------|
| **Block Storage** | Raw disk split into fixed-size blocks. OS formats it with a filesystem. Fastest. Attached to one server. | A hard drive in your computer | EBS (Elastic Block Store) |
| **File Storage** | Shared filesystem accessible by multiple servers over a network. Uses protocols like NFS or SMB. | A shared network drive at the office | EFS (Elastic File System) |
| **Object Storage** | Flat structure — files stored as objects with metadata and a unique key. No folders (just key prefixes). Accessed via HTTP API. Scales infinitely. | Google Drive / Dropbox | S3 (Simple Storage Service) |

**Key storage metrics:**
- **IOPS (Input/Output Operations Per Second)** — how many read/write operations per second. Critical for databases. SSD = high IOPS, HDD = low IOPS.
- **Throughput** — how much data transferred per second (MB/s). Critical for streaming/large files.
- **Latency** — time to complete a single operation. Block storage: <1ms. Object storage: 50-100ms.
- **Durability** — probability data won't be lost. S3 = 99.999999999% (eleven 9s) — you'd lose 1 object out of 10 billion in 10,000 years.

**RAID (Redundant Array of Independent Disks):**
Combines multiple disks for performance or redundancy.
- **RAID 0** — striping. Data split across disks. 2x speed, 0 redundancy. If one disk dies, all data is lost.
- **RAID 1** — mirroring. Same data on 2 disks. Normal speed, full redundancy.
- **RAID 5** — striping with parity. Data + error recovery spread across 3+ disks. Good balance.
- **RAID 10** — RAID 1 + RAID 0. Mirrored stripes. Best performance + redundancy. Most expensive.

---

**Networking Fundamentals**

**The OSI Model (7 layers)** — how data travels from your app to another computer:

| Layer | Name | What It Does | Example |
|-------|------|-------------|---------|
| 7 | Application | User-facing protocols | HTTP, HTTPS, DNS, SSH, FTP |
| 6 | Presentation | Encryption, compression | TLS/SSL, JPEG, JSON |
| 5 | Session | Manages connections | Authentication sessions |
| 4 | Transport | Reliable delivery, ports | TCP (reliable), UDP (fast) |
| 3 | Network | Routing between networks | IP addresses, routers |
| 2 | Data Link | Communication within a network | MAC addresses, switches |
| 1 | Physical | Actual cables and signals | Ethernet cables, Wi-Fi radio |

For day-to-day cloud work, you mostly care about layers 3, 4, and 7.

**IP Addresses**
Every device on a network has an IP address. Two versions:
- **IPv4**: `192.168.1.50` — four octets, each 0-255. Total: ~4.3 billion addresses (running out).
- **IPv6**: `2001:0db8:85a3::8a2e:0370:7334` — 128-bit. Virtually unlimited addresses.

**Private vs Public IPs:**
- **Private** (not routable on the internet): `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` — used inside networks
- **Public** — routable on the internet, assigned by your ISP or cloud provider
- **NAT (Network Address Translation)** — translates private IPs to a public IP so devices on a private network can reach the internet. Your home router does this. AWS NAT Gateways do this for private subnets.

**TCP vs UDP:**
- **TCP (Transmission Control Protocol)** — reliable, ordered delivery. Connection-based (3-way handshake: SYN → SYN-ACK → ACK). Used for: HTTP, SSH, databases, email. Slower but guaranteed delivery.
- **UDP (User Datagram Protocol)** — fast, no connection, no guarantee. "Fire and forget." Used for: video streaming, DNS lookups, gaming. Faster but packets can be lost.

**Common Ports:**

| Port | Protocol | What It's For |
|------|----------|--------------|
| 22 | SSH | Remote terminal access (Linux) |
| 80 | HTTP | Web traffic (unencrypted) |
| 443 | HTTPS | Web traffic (encrypted with TLS) |
| 3389 | RDP | Remote Desktop (Windows) |
| 3306 | MySQL | MySQL database |
| 5432 | PostgreSQL | PostgreSQL database |
| 6379 | Redis | Redis cache/store |
| 27017 | MongoDB | MongoDB database |

**DNS (Domain Name System):**
Translates human-readable names to IP addresses. `google.com` → `142.250.80.46`.

How a DNS lookup works:
1. You type `example.com` in your browser
2. Your computer asks the **recursive resolver** (usually your ISP or 8.8.8.8)
3. Resolver asks the **root nameserver** → "Who handles `.com`?"
4. Resolver asks the **TLD nameserver** → "Who handles `example.com`?"
5. Resolver asks the **authoritative nameserver** → "What's the IP for `example.com`?"
6. Answer is cached and returned to your browser

**Common DNS record types:**
- **A** — maps domain to IPv4 address (`example.com → 93.184.216.34`)
- **AAAA** — maps domain to IPv6 address
- **CNAME** — alias pointing to another domain (`www.example.com → example.com`)
- **MX** — mail server for the domain
- **NS** — nameservers authoritative for the domain
- **TXT** — text records (used for email verification, SSL certificates)

AWS Route 53 is Amazon's DNS service. You'll use it to point domains to load balancers, S3 websites, and CloudFront distributions.

**Firewalls and Security Groups:**
A firewall controls what traffic is allowed in and out.
- **Inbound rules** — what can come IN to your server (e.g., allow port 443 from anywhere)
- **Outbound rules** — what can go OUT from your server (e.g., allow all outbound)
- **Stateful** (AWS Security Groups) — if inbound traffic is allowed, the response is automatically allowed
- **Stateless** (AWS NACLs) — inbound and outbound rules evaluated separately

**Load Balancers:**
Distribute incoming traffic across multiple servers for scalability and reliability.
- **Round-robin** — each server gets the next request in turn
- **Least connections** — send to the server with fewest active connections
- **Health checks** — load balancer pings servers; unhealthy servers stop receiving traffic
- AWS has ALB (Application Load Balancer, layer 7/HTTP) and NLB (Network Load Balancer, layer 4/TCP)

---

### Part 2: AWS Core Services

**Shared Responsibility Model**: AWS manages infrastructure security (hardware, data center), while customers manage application security (OS patches, firewall rules, authentication). Understanding this is critical for designing secure systems.

**EC2 (Elastic Compute Cloud)**: Virtual machines in the cloud. Instance types are optimized for different workloads (general-purpose, compute-optimized, memory-optimized). You control OS, applications, and networking.

**S3 (Simple Storage Service)**: Object storage service for files, backups, and static content. Offers multiple storage classes (Standard, Infrequent Access, Glacier) for different cost/access patterns.

**IAM (Identity and Access Management)**: Manages users, groups, roles, and permissions. Follows least-privilege principle: grant minimum permissions needed for users to perform their job.

**Binary and Number Systems (Networking Primer)**
Every IP address and subnet mask is a 32-bit binary number. Understanding binary is essential for subnetting.

- **Base 10 (decimal)**: What we use daily. Digits 0-9. Example: `192` = 1×100 + 9×10 + 2×1
- **Base 2 (binary)**: What computers use. Digits 0-1. Example: `192` = `11000000` (128+64)
- **Base 16 (hexadecimal)**: Shorthand for binary. Digits 0-9, A-F. Example: `192` = `C0`

Quick binary conversion for common networking values:
```
128 = 10000000    192 = 11000000    224 = 11100000
240 = 11110000    248 = 11111000    252 = 11111100
254 = 11111110    255 = 11111111    0   = 00000000
```

**Subnet Masks and CIDR Notation**
A subnet mask determines which part of an IP address is the network and which part is the host.

- `255.255.255.0` = `/24` = 24 bits for network, 8 bits for hosts = **254 usable hosts**
- `255.255.0.0` = `/16` = 16 bits for network, 16 bits for hosts = **65,534 usable hosts**
- `255.255.255.128` = `/25` = 25 bits for network, 7 bits for hosts = **126 usable hosts**

Formula: Usable hosts = 2^(32 - CIDR) - 2 (subtract network and broadcast addresses)

Example: `10.0.1.0/24` means:
- Network: `10.0.1.0`
- First host: `10.0.1.1`
- Last host: `10.0.1.254`
- Broadcast: `10.0.1.255`
- Subnet mask: `255.255.255.0`

**VPC (Virtual Private Cloud)**: Isolated network environment in AWS. Contains public subnets (internet-accessible) and private subnets (internal only). You define the VPC's IP range using CIDR notation (e.g., `10.0.0.0/16`) and carve it into subnets. Essential for application security and architecture.

**Billing and Cost Management**: AWS provides Free Tier (12 months free on many services), billing alerts, and cost analysis tools. Proper monitoring prevents unexpected charges.

## Curated Resources

- **AWS Cloud Practitioner Essentials on Skill Builder**: https://aws.amazon.com/training/learn-about/architect/
  Official AWS training covering core services, cloud concepts, and certification preparation. Free and self-paced.

- **AWS Free Tier**: https://aws.amazon.com/free/
  Learn which services are free for 12 months, which have always-free tiers, and which offer free trials. Essential for hands-on practice without costs.

- **AWS Management Console**: https://aws.amazon.com/console/
  The web interface for accessing all AWS services. Explore the console while following tutorials.

- **AWS Documentation**: https://docs.aws.amazon.com/
  Comprehensive reference for every AWS service with API documentation and best practices.

## Exercises

1. **Create AWS Free Tier Account** - Sign up for an AWS account, enable MFA, set up billing alerts for $1+, and explore the Free Tier eligibility.

2. **Launch EC2 Instance** - Create a t2.micro instance, configure security groups to allow SSH/HTTP traffic, connect via SSH, and verify connectivity.

3. **Create S3 Bucket and Static Website** - Create an S3 bucket, enable static website hosting, upload HTML/CSS files, and access the website via the public endpoint.

4. **Set Up IAM Users, Roles, and Policies** - Create an IAM user for application access (not root), attach a policy granting S3 and EC2 read permissions, generate access keys, and test the restricted access.

5. **Design VPC with Public and Private Subnets** - Create a VPC with CIDR block 10.0.0.0/16, create public subnet (10.0.1.0/24) and private subnet (10.0.2.0/24), attach Internet Gateway for public access, and configure route tables.

## How to Mark Complete

1. Complete all 5 exercises and document each with screenshots showing successful results.
2. Answer the quiz questions in `tests/quiz.json` and achieve at least 80% (4/5 correct).
3. Create a summary document explaining the shared responsibility model and how it applies to your completed exercises.
4. Verify your AWS account is set up securely (MFA enabled, billing alerts configured, root account not used for daily work).
5. Update a progress file indicating completion date.

**Estimated Time**: 2 weeks of study and hands-on practice
