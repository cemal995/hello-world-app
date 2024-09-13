pipeline {
    agent any

    environment {
        JIRA_ISSUE_KEY = 'NODE-1'
        JIRA_CREDENTIALS_ID = 'jira-api-token'  // Your Jenkins credentials ID for the Jira API token
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
                        jiraComment issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'Build started for the application.'
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
                        jiraComment issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'Deployment completed successfully.'
                    }
                }
            }
        }

        stage('Close Jira Issue') {
            steps {
                script {
                    // Transition the Jira issue to 'Done'
                    withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                        jiraTransitionIssue(issueKey: "${env.JIRA_ISSUE_KEY}", transition: 'Done')  // Use the correct transition name or ID
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
                    jiraComment issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'The build or deployment has failed.'
                }
            }
        }
    }
}
