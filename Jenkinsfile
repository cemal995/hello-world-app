pipeline {
    agent any

    environment {
        JIRA_PROJECT_KEY = 'NODE'
        JIRA_ISSUE_KEY = 'NODE-1'
        JIRA_SITE = 'my-jira-site' // Name of the Jira site configured in Jenkins
        JIRA_CREDENTIALS_ID = 'jira-api-token' // ID of the credentials configured in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/cemal995/hello-world-app.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build the application using Docker Compose
                    sh 'docker compose up --build -d'
                    
                    // Add a comment to the Jira issue indicating build started
                    withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                        jiraComment site: "${env.JIRA_SITE}", issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'Build started for the application.'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy the application
                    sh 'docker compose up -d'
                    
                    // Add a comment to the Jira issue indicating successful deployment
                    withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                        jiraComment site: "${env.JIRA_SITE}", issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'Deployment completed successfully.'
                    }
                }
            }
        }

        stage('Close Jira Issue') {
            steps {
                script {
                    // Transition the Jira issue to 'Done'
                    withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                        jiraTransitionIssue site: "${env.JIRA_SITE}", issueKey: "${env.JIRA_ISSUE_KEY}", transition: 'Done'
                    }
                }
            }
        }
    }

    post {
        failure {
            script {
                // In case of failure, comment on the Jira issue
                withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                    jiraComment site: "${env.JIRA_SITE}", issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'The build or deployment has failed.'
                }
            }
        }
    }
}


