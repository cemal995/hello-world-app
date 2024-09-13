pipeline {
    agent any

    environment {
        JIRA_PROJECT_KEY = 'NODE'
        JIRA_ISSUE_KEY = 'NODE-1'
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
                    // Build your application, e.g., using Docker Compose
                    sh 'docker compose up --build -d'
                    
                    // Add a comment to the Jira issue indicating build started
                    jiraIssueComment issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'Build started for the application.'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy application, for example using Docker
                    sh 'docker compose up -d'
                    
                    // Add a comment to the Jira issue indicating deployment
                    jiraIssueComment issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'Deployment completed successfully.'
                }
            }
        }

        stage('Close Jira Issue') {
            steps {
                script {
                    // Transition the Jira issue to "Done" (or any status)
                    jiraIssueUpdate issueKey: "${env.JIRA_ISSUE_KEY}", transition: 'Done'
                }
            }
        }
    }

    post {
        failure {
            script {
                // In case of a failure, comment on the Jira issue
                jiraIssueComment issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'The build or deployment has failed.'
            }
        }
    }
}





