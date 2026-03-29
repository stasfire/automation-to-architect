# Module 1: Docker Fundamentals for Beginners

Learn containerization concepts and Docker basics to package applications consistently across environments.

## Learning Objectives

- Understand the difference between containers and virtual machines
- Install Docker and verify your setup
- Run and manage Docker containers from public images
- Build custom Docker images using Dockerfiles
- Orchestrate multi-container applications with Docker Compose
- Containerize a simple application for deployment

## Key Concepts

**Containers**: Lightweight, isolated environments that bundle applications with their dependencies. Containers share the host OS kernel, making them faster and more efficient than virtual machines.

**Images**: Read-only templates that define everything needed to run a container—application code, runtime, system tools, and libraries. Images are built from Dockerfiles.

**Dockerfile**: A text file with instructions to build a Docker image. Common commands include `FROM` (base image), `RUN` (execute commands), `COPY` (add files), `EXPOSE` (declare ports), and `CMD` (default command).

**Docker Compose**: A tool for defining and running multi-container applications using a YAML configuration file. Simplifies networking and volume management between services.

**Volumes**: Persistent storage mechanisms that allow containers to access files on the host or share data between containers.

**Networking**: Docker provides bridge networks for container communication, port mapping for external access, and service discovery within networks.

## Curated Resources

- **KodeKloud Free Docker Course**: https://kodekloud.com/courses/docker-for-the-absolute-beginner/
  Comprehensive beginner-friendly course with hands-on labs covering installation, basic commands, images, and containers.

- **Docker Official Documentation - Get Started**: https://docs.docker.com/get-started/
  Official Docker tutorial with interactive examples and best practices from the maintainers.

- **Docker Hub**: https://hub.docker.com/
  Public registry for finding and sharing Docker images. Explore popular images and understand image tagging.

## Exercises

1. **Install Docker** - Install Docker Desktop or Docker Engine on your system. Verify installation by running `docker --version` and `docker run hello-world`.

2. **Run Your First Container** - Pull and run the `nginx` image, map port 8080 to container port 80, and access it in your browser.

3. **Build a Custom Image** - Create a Dockerfile for a simple "Hello World" web server, build it with `docker build`, and run the resulting image.

4. **Multi-Container Application with Docker Compose** - Create a docker-compose.yml with two services (e.g., a web app and database), define volumes and environment variables, and run the stack with `docker-compose up`.

5. **Containerize a Node.js Application** - Take a simple Node.js app, write a Dockerfile with appropriate base image and dependencies, build the image, and run it. Verify the app works inside the container.

## How to Mark Complete

1. Run all 5 exercises and document your process with screenshots or notes.
2. Answer the quiz questions in `tests/quiz.json` and achieve at least 80% (4/5 correct).
3. Write a short reflection (2-3 paragraphs) on what you learned about containerization and how Docker helps with application deployment.
4. Update a progress file or checklist in your repo indicating completion date.

**Estimated Time**: 1 week of study and hands-on practice
