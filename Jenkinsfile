pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/cemal995/hello-world-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('hello-world-app')
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    docker.image('hello-world-app').run('-p 3000:3000')
                }
            }
        }
    }
}
