# Documentation Détaillée : Projet DevOps

## **1. Introduction**
Ce projet DevOps vise à déployer une application web à l'aide de conteneurs Docker, orchestrée via Kubernetes, et surveillée grâce à Prometheus et Grafana. Le déploiement est automatisé avec Jenkins et géré via ArgoCD pour le GitOps.

**Technologies principales :**
- Docker
- Kubernetes
- Jenkins
- Grafana
- ArgoCD
- Helm



## **3. Conteneurisation de l’application**

### ** Création des Dockerfiles**
Créer des fichiers `Dockerfile` pour le backend et le frontend.


```bash
# Backend
# Construire l'image Docker pour le backend
docker build -t backend-app .

# Lancer le conteneur Docker du backend
docker run -d -p 3002:3002 backend-app


# Frontend
# Construire l'image Docker pour le frontend
docker build -t gstock-frontend .

# Lancer le conteneur Docker du frontend
docker run -d -p 3001:80 gstock-frontend

```

## **4 Déploiement avec Kubernetes**


### **4.1. Appliquer les fichiers de déploiement Kubernetes**

```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

```

### **4.2. Exposer les services Kubernetes**

```bash
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-service.yaml

```

## **5. Intégration CI/CD avec Jenkins**

### **5.1. Configuration de Jenkins**
- Installer Jenkins.
- Installer les plugins Docker et Kubernetes.
- Ajouter les identifiants Docker Hub dans Jenkins.

### **5.2. Création du Jenkinsfile**
Créer un fichier `Jenkinsfile` pour automatiser la construction et le déploiement.


## **6. Déploiement avec Kubernetes**

minikube start
minikube status
kubectl get nodes


helm install frontend-app ./frontend-chart
helm install backend-app ./backend-chart

kubectl get all



## **7. Déployer Prometheus sur Kubernetes**



helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/prometheus

kubectl get pods
kubectl get svc



## **8. Déployer Grafana sur Kubernetes**

helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install grafana grafana/grafana

kubectl get pods
kubectl get svc

minikube service grafana


kubectl get secret grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo

kubectl get svc -n monitoring


## **9. Monitoring et Observabilité avec Prometheus et Grafana**






## **10. Conclusion**
Ce projet intègre l'ensemble des pratiques modernes de DevOps, notamment la conteneurisation, l'orchestration, le monitoring, et le GitOps. La documentation et les automatisations mises en place permettent une gestion simple et évolutive de l'application.

# GestionStock
