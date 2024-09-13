pipeline {
    agent any

    environment {
        JIRA_SITE = 'my-jira-site' // The name of your Jira site configuration in Jenkins
        JIRA_CREDENTIALS_ID = 'jira-api-token' // Your Jenkins credentials ID for Jira API token
        JIRA_ISSUE_KEY = '' // Will be set after issue creation
    }

    stages {
        stage('Create Jira Issue') {
            steps {
                script {
                    def issueData = [
                        fields: [
                            project: [
                                key: 'NODE' // Project key
                            ],
                            summary: 'New Issue Created by Jenkins Pipeline',
                            description: 'This issue was created automatically by a Jenkins pipeline.',
                            issuetype: [
                                name: 'Task' // Issue type
                            ]
                        ]
                    ]

                    def response = httpRequest(
                        url: 'https://cemalhan99.atlassian.net/rest/api/2/issue',
                        httpMode: 'POST',
                        contentType: 'APPLICATION_JSON',
                        authentication: "${env.JIRA_CREDENTIALS_ID}",
                        requestBody: groovy.json.JsonOutput.toJson(issueData)
                    )

                    def jsonResponse = readJSON text: response.content
                    env.JIRA_ISSUE_KEY = jsonResponse.key

                    echo "Jira issue created with key: ${env.JIRA_ISSUE_KEY}"
                }
            }
        }

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
                    jiraComment site: "${env.JIRA_SITE}", credentialsId: "${env.JIRA_CREDENTIALS_ID}", issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'Build started for the application.'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy application using Docker
                    sh 'docker compose up -d'
                    
                    // Add a comment to the Jira issue indicating deployment
                    jiraComment site: "${env.JIRA_SITE}", credentialsId: "${env.JIRA_CREDENTIALS_ID}", issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'Deployment completed successfully.'
                }
            }
        }

        stage('Close Jira Issue') {
            steps {
                script {
                    // Transition the Jira issue to "Done"
                    jiraTransitionIssue site: "${env.JIRA_SITE}", credentialsId: "${env.JIRA_CREDENTIALS_ID}", idOrKey: "${env.JIRA_ISSUE_KEY}", input: [transition: 31] // Use numeric ID for transition
                }
            }
        }
    }

    post {
        failure {
            script {
                // In case of a failure, comment on the Jira issue
                jiraComment site: "${env.JIRA_SITE}", credentialsId: "${env.JIRA_CREDENTIALS_ID}", issueKey: "${env.JIRA_ISSUE_KEY}", comment: 'The build or deployment has failed.'
            }
        }
    }
}
