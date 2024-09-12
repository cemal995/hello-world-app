pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/cemal995/hello-world-app.git'
            }
        }

        stage('Build and Deploy with Docker Compose') {
            steps {
                sh '''
                docker compose -f docker-compose.yml up --build -d
                '''
            }
        }
    }
}




