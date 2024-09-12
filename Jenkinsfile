pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/cemal995/hello-world-app.git'
            }
        }

        stage('Build and Run with Docker Compose') {
            steps {
                script {
                    // Define the Docker Compose file path
                    def composeFile = 'docker-compose.yml'

                    // Run Docker Compose to build and start the containers
                    sh "docker-compose -f ${composeFile} up --build -d"
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Here you can add steps to run your tests if needed
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Optionally, you can add cleanup steps to stop and remove containers
                    sh "docker-compose -f docker-compose.yml down"
                }
            }
        }
    }
}
