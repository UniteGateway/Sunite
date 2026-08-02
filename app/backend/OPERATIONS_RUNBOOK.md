# SUNITE ENTERPRISE - OPERATIONS & INCIDENT RESPONSE RUNBOOK

## 1. System Health Monitoring
- Health Summary: `GET /api/v1/health`
- Readiness Probe: `GET /api/v1/readiness`
- Liveness Probe: `GET /api/v1/liveness`
- System & Kubernetes Metrics: `GET /api/v1/system/status`
- Version & Build Hash: `GET /api/v1/system/version`

## 2. Common Operational Tasks
### Scaling Pod Replicas
```bash
# Manual scaling if traffic spikes
kubectl scale deployment sunite-backend-deployment -n sunite-prod --replicas=5
```

### Checking Application Logs
```bash
# Tail logs from all production pods
kubectl logs -f -l app=sunite-backend -n sunite-prod --tail=100
```

### Database Backup & Point-in-Time Recovery
```bash
# Run manual backup
bash scripts/backup.sh
```

## 3. Incident Response Procedures
- **Database High Load / Slow Queries**: Check `GET /api/v1/health`. If database status is UNHEALTHY, verify RDS connection pool size in ConfigMap and scale read replicas.
- **WebSocket Gateway Offline**: Check Redis connection status. Restart `sunite-backend-deployment` rollout if connection resets occur.
- **502 Bad Gateway from NGINX**: Verify backend pods readiness probes (`GET /api/v1/readiness`). Check NGINX upstream status in `/etc/nginx/nginx.conf`.
