pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'gstock-backend'
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_HUB_CREDENTIALS = 'dockerhub-credentials'
        K8S_NAMESPACE = 'default'
    }

    stages {
        stage('Checkout') {
            steps {
                // Cloner le code depuis GitHub
                git 'https://github.com/fatmasayedi2/Gstock'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }

        stage('Scan Docker Image') {
            steps {
                script {
                    // Scanner l'image Docker pour des vulnérabilités avec Trivy
                    sh 'trivy image ${DOCKER_IMAGE}'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Pousser l'image vers Docker Hub
                    docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                        docker.image("${DOCKER_IMAGE}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Déployer l'application sur Kubernetes (avec kubectl)
                    sh 'kubectl apply -f k8s/'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline exécuté avec succès'
        }

        failure {
            echo 'Une erreur est survenue pendant l\'exécution du pipeline'
        }
    }
}
