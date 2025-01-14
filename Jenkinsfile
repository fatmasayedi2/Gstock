pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'backend-app'
        DOCKER_IMAGE_FRONTEND = 'gstock-frontend'
        DOCKER_REGISTRY = 'fatma467' // Votre Docker Hub username
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials' // L'ID des credentials Jenkins
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/fatmasayedi2/Gstock.git'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "$DOCKER_CREDENTIALS_ID", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_REGISTRY/$DOCKER_IMAGE_BACKEND:latest ./Backend'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_REGISTRY/$DOCKER_IMAGE_FRONTEND:latest ./Frontend'
                }
            }
        }

        stage('Scan Backend Image with Trivy') {
            steps {
                script {
                    sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL $DOCKER_REGISTRY/$DOCKER_IMAGE_BACKEND:latest || true'
                }
            }
        }

        stage('Scan Frontend Image with Trivy') {
            steps {
                script {
                    sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL $DOCKER_REGISTRY/$DOCKER_IMAGE_FRONTEND:latest || true'
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                script {
                    sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE_BACKEND:latest'
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE_FRONTEND:latest'
                }
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
    }
}
