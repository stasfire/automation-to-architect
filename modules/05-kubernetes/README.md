# Module 05: Kubernetes and Container Orchestration

## Learning Objectives

- Understand Kubernetes architecture and core concepts
- Install and configure Kubernetes locally using Minikube
- Deploy and manage containerized applications in Kubernetes
- Create and manage Pods, Deployments, StatefulSets, and DaemonSets
- Expose applications using Services (ClusterIP, NodePort, LoadBalancer)
- Configure and manage application data with ConfigMaps and Secrets
- Implement ingress for HTTP(S) routing and load balancing
- Manage persistent storage with Persistent Volumes and Claims
- Use namespaces for multi-tenancy and resource isolation
- Prepare for Kubernetes certification (CKAD or CKA)

## Key Concepts

**Pods**
The smallest deployable unit in Kubernetes. A Pod wraps one or more containers (usually one) and provides shared networking and storage. Containers in a Pod communicate via localhost.

**Deployments**
High-level Kubernetes object that manages ReplicaSets and Pods. Deployments define desired state (replicas, image, resources) and handle rolling updates, rollbacks, and scaling.

**Services**
Abstract way to expose Pods on the network. Services enable stable IP addresses and DNS names for load-balanced access to a group of Pods. Types: ClusterIP (internal), NodePort (node-level), LoadBalancer (external), ExternalName.

**ConfigMaps and Secrets**
ConfigMaps store non-sensitive configuration data (environment variables, config files). Secrets store sensitive data (passwords, tokens, certificates). Both decouple configuration from application code.

**Namespaces**
Virtual clusters within a physical Kubernetes cluster. Namespaces provide logical isolation, resource quotas, and network policies for multi-tenancy and organizing resources.

**Persistent Volumes (PV) and Persistent Volume Claims (PVC)**
PVs are cluster-level storage resources. PVCs are requests for storage by Pods. This abstraction allows Pods to request storage without knowing infrastructure details.

**Ingress**
API object for managing external HTTP(S) access to services. Ingress provides URL-based routing, SSL/TLS termination, and virtual hosting.

**Labels and Selectors**
Labels are key-value pairs attached to Kubernetes objects. Selectors are queries to find objects by labels. Used extensively by Services, Deployments, and policies.

## Curated Resources

- [Linux Foundation Introduction to Kubernetes on edX](https://www.edx.org/learn/kubernetes/the-linux-foundation-introduction-to-kubernetes) - Free introductory course covering Kubernetes fundamentals
- [Kubernetes Official Documentation and Tutorials](https://kubernetes.io/docs/tutorials/) - Official Kubernetes learning resources and interactive tutorials
- [KodeKloud CKA Learning Path](https://kodekloud.com/learning-path/cka) - Comprehensive hands-on labs for Certified Kubernetes Administrator
- [CNCF CKAD Certification](https://www.cncf.io/training/certification/ckad/) - Certified Kubernetes Application Developer exam information and resources

## Exercises

1. **Install Minikube and Deploy Your First Pod**
   - Download and install Minikube for your OS
   - Start a local Kubernetes cluster with `minikube start`
   - Deploy a simple Pod using kubectl (e.g., nginx, alpine)
   - Verify Pod is running with `kubectl get pods`
   - Access the Pod using `kubectl port-forward`

2. **Create Deployments with Replicas**
   - Write a Deployment YAML manifest (nginx, httpd, or custom image)
   - Specify desired replicas (3-5 instances)
   - Apply the Deployment and verify replicas are running
   - Scale the Deployment up and down with `kubectl scale`
   - Update the image version and observe rolling update behavior
   - Rollback to a previous version with `kubectl rollout undo`

3. **Expose Services (ClusterIP, NodePort, LoadBalancer)**
   - Create a Deployment with at least 2 replicas
   - Expose it with a ClusterIP Service internally
   - Create a NodePort Service to access from outside the cluster
   - Document the difference in accessibility between service types
   - For bonus: simulate LoadBalancer type (limited in Minikube)

4. **Configure ConfigMaps and Secrets**
   - Create a ConfigMap with application configuration (database host, log level)
   - Create a Secret with sensitive data (password, API key)
   - Create a Deployment Pod that mounts ConfigMap as environment variables
   - Mount Secret as a file volume in a Pod
   - Verify Pod can access both ConfigMap and Secret values

5. **Set Up Ingress Controller**
   - Enable Minikube ingress addon
   - Create multiple Deployments (backend services)
   - Define an Ingress resource to route /api → api-service, /web → web-service
   - Configure virtual hosts (app1.local, app2.local if possible)
   - Verify routing works for different paths and hosts

6. **Deploy Multi-Tier Application with Persistent Volumes**
   - Create a Deployment for a database (MySQL, PostgreSQL)
   - Create a PersistentVolume and PersistentVolumeClaim
   - Mount PVC in database Pod to persist data
   - Create a backend Deployment that connects to the database
   - Create a frontend Deployment
   - Expose the entire stack via Service and verify end-to-end functionality

## Estimated Time Commitment

**3 weeks** (roughly 6-8 hours per week)
- Week 1: Installation, Pods, Deployments, basic Services (Exercises 1-2)
- Week 2: Advanced Services, ConfigMaps, Secrets (Exercises 3-4)
- Week 3: Ingress, persistent storage, multi-tier applications (Exercises 5-6)

## Hands-On Practice Tips

- Use `kubectl explain` to understand resource fields
- Practice writing YAML manifests by hand (not copying blindly)
- Use `kubectl apply -f` for declarative updates
- Explore `kubectl logs` and `kubectl describe` for troubleshooting
- Set up aliases: `alias k=kubectl` and `alias kgp='kubectl get pods'`

## How to Mark Complete

1. Complete all 6 exercises with working YAML manifests committed to your repository
2. All Deployments and Services run successfully in Minikube
3. Pass the practice quiz with 80%+ accuracy (see `tests/quiz.json`)
4. Optionally pursue CKAD or CKA certification
5. Document key learnings and architecture diagrams in a reflection

## Next Steps

After completing this module:
- Combine Kubernetes with Terraform (Module 04) for infrastructure-as-code provisioning
- Implement CI/CD pipelines (Module 06) to automate Kubernetes deployments
- Explore advanced Kubernetes concepts: operators, service mesh, GitOps
