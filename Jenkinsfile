pipeline {
    agent any

    environment {
        JIRA_SITE = 'my-jira-site' // The Jira site name configured in Jenkins
        JIRA_CREDENTIALS_ID = 'jira-api-token' // The credentials ID for Jira API token
        JIRA_ISSUE_KEY = 'NODE-1' // Your Jira issue key
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
                    sh 'docker compose up --build -d'
                    
                    withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                        jiraComment site: "${env.JIRA_SITE}", issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'Build started for the application.'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker compose up -d'
                    
                    withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                        jiraComment site: "${env.JIRA_SITE}", issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'Deployment completed successfully.'
                    }
                }
            }
        }

        stage('Close Jira Issue') {
            steps {
                script {
                    withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                        jiraTransitionIssue site: "${env.JIRA_SITE}", idOrKey: "${env.JIRA_ISSUE_KEY}", input: [transition: 'Done']
                    }
                }
            }
        }
    }

    post {
        failure {
            script {
                withCredentials([string(credentialsId: "${env.JIRA_CREDENTIALS_ID}", variable: 'JIRA_API_TOKEN')]) {
                    jiraComment site: "${env.JIRA_SITE}", issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'The build or deployment has failed.'
                }
            }
        }
    }
}



