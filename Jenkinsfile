pipeline {
    agent any

    environment {
        JIRA_SITE = 'my-jira-site' 
        JIRA_CREDENTIALS_ID = 'jira-api-token' 
        JIRA_ISSUE_KEY = 'NODE-7'
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
                    // Build your application using Docker Compose
                    sh 'docker compose up --build -d'
                    
                    // Add a comment to the Jira issue indicating build started
                    jiraAddComment site: "${env.JIRA_SITE}", idOrKey: "${env.JIRA_ISSUE_KEY}", comment: 'Build started for the application.'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy application using Docker
                    sh 'docker compose up -d'
                    
                    // Add a comment to the Jira issue indicating deployment
                    jiraAddComment site: "${env.JIRA_SITE}", idOrKey: "${env.JIRA_ISSUE_KEY}", comment: 'Deployment completed successfully.'
                }
            }
        }

        stage('Close Jira Issue') {
            steps {
                script {
                    // Transition the Jira issue to "Done"
                    jiraTransitionIssue site: "${env.JIRA_SITE}", credentialsId: "${env.JIRA_CREDENTIALS_ID}", idOrKey: "${env.JIRA_ISSUE_KEY}", input: [transition: '31']
                }
            }
        }
    }

    post {
        failure {
            script {
                // In case of a failure, comment on the Jira issue
                jiraAddComment site: "${env.JIRA_SITE}", idOrKey: "${env.JIRA_ISSUE_KEY}", comment: 'The build or deployment has failed.'
            }
        }
    }
}

