pipeline {
    agent any

    environment {
        JIRA_PROJECT_KEY = 'NODE'
        JIRA_ISSUE_KEY = 'NODE-1'
        JIRA_CREDENTIALS_ID = 'jira-api-token'  // Update this with your Jenkins credentials ID for the Jira API token
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
                    withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                        jiraComment(
                            site: 'YourJiraSite', // Replace with your Jira site name configured in Jenkins
                            issueKey: "${env.JIRA_ISSUE_KEY}", 
                            body: 'Build started for the application.',
                            token: "${env.JIRA_API_TOKEN}"
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
                    withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                        jiraComment(
                            site: 'YourJiraSite', 
                            issueKey: "${env.JIRA_ISSUE_KEY}", 
                            body: 'Deployment completed successfully.',
                            token: "${env.JIRA_API_TOKEN}"
                        )
                    }
                }
            }
        }

        stage('Close Jira Issue') {
            steps {
                script {
                    // Transition the Jira issue to 'Done'
                    withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                        jiraIssueTransition(
                            site: 'YourJiraSite', 
                            issueKey: "${env.JIRA_ISSUE_KEY}", 
                            transition: 'Done',  // Replace with the actual transition ID or name for 'Done'
                            token: "${env.JIRA_API_TOKEN}"
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
                withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                    jiraComment(
                        site: 'YourJiraSite', 
                        issueKey: "${env.JIRA_ISSUE_KEY}", 
                        body: 'The build or deployment has failed.',
                        token: "${env.JIRA_API_TOKEN}"
                    )
                }
            }
        }
    }
}

