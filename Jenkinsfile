pipeline {
    agent any

    environment {
        JIRA_PROJECT_KEY = 'NODE'
        JIRA_ISSUE_KEY = 'NODE-1'
        JIRA_CREDENTIALS_ID = 'jira-api-token'  // Update with your Jenkins credentials ID for Jira
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
                    
                    // Add a comment to the Jira issue indicating that the build started
                    withCredentials([usernamePassword(credentialsId: "${env.JIRA_CREDENTIALS_ID}", usernameVariable: 'JIRA_USER', passwordVariable: 'JIRA_TOKEN')]) {
                        jiraComment(
                            site: 'YourJiraSite', // Replace with your Jira site name configured in Jenkins
                            issueKey: "${env.JIRA_ISSUE_KEY}", 
                            body: 'Build started for the application.'
                        )
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
                    withCredentials([usernamePassword(credentialsId: "${env.JIRA_CREDENTIALS_ID}", usernameVariable: 'JIRA_USER', passwordVariable: 'JIRA_TOKEN')]) {
                        jiraComment(
                            site: 'YourJiraSite', 
                            issueKey: "${env.JIRA_ISSUE_KEY}", 
                            body: 'Deployment completed successfully.'
                        )
                    }
                }
            }
        }

        stage('Close Jira Issue') {
            steps {
                script {
                    // Transition the Jira issue to 'Done'
                    withCredentials([usernamePassword(credentialsId: "${env.JIRA_CREDENTIALS_ID}", usernameVariable: 'JIRA_USER', passwordVariable: 'JIRA_TOKEN')]) {
                        jiraIssueTransition(
                            site: 'YourJiraSite', 
                            issueKey: "${env.JIRA_ISSUE_KEY}", 
                            transition: 'Done'  // Replace with the actual transition ID or name for 'Done'
                        )
                    }
                }
            }
        }
    }

    post {
        failure {
            script {
                // In case of failure, comment on the Jira issue
                withCredentials([usernamePassword(credentialsId: "${env.JIRA_CREDENTIALS_ID}", usernameVariable: 'JIRA_USER', passwordVariable: 'JIRA_TOKEN')]) {
                    jiraComment(
                        site: 'YourJiraSite', 
                        issueKey: "${env.JIRA_ISSUE_KEY}", 
                        body: 'The build or deployment has failed.'
                    )
                }
            }
        }
    }
}
