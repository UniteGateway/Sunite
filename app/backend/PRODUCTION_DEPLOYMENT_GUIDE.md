# SUNITE ENTERPRISE - PRODUCTION DEPLOYMENT GUIDE

## 1. Prerequisites
- Docker & Docker Compose
- Kubernetes Cluster (EKS / AKS / GKE)
- PostgreSQL 16 Managed Instance (AWS RDS / Azure Database)
- Redis 7 Managed Cache (AWS ElastiCache / Azure Cache for Redis)
- NGINX Ingress Controller & Cert-Manager (Let's Encrypt TLS)

## 2. Environment Configuration
Copy `.env.production.example` to `.env` and configure production database credentials, JWT secrets, and API keys.

## 3. Docker Container Build
```bash
# Build multi-stage production Docker image
docker build -t sunite/backend:v11.16.0 .

# Test locally using docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d
```

## 4. Kubernetes Deployment
```bash
# Apply ConfigMap, Secrets, Deployment, Service, HPA, and Ingress
kubectl apply -f k8s/deployment.yaml

# Verify deployment status
kubectl get pods -n sunite-prod
kubectl rollout status deployment/sunite-backend-deployment -n sunite-prod
```

## 5. Automated CI/CD Pipeline
GitHub Actions pipeline in `.github/workflows/ci-cd.yml` automates:
- Dependency installation and Prisma code generation
- Unit testing and build verification
- Docker container build and security scanning
- Automated zero-downtime rolling update deployment to Kubernetes
