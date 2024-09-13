pipeline {
    agent any

    environment {
        JIRA_SITE = 'my-jira-site' // The name of your Jira site configuration in Jenkins
        JIRA_CREDENTIALS_ID = 'jira-api-token' // Your Jenkins credentials ID for Jira API token
        JIRA_ISSUE_KEY = '' // To be set after issue creation
    }

    stages {
        stage('Create Jira Issue') {
            steps {
                script {
                    def issueData = [
                        fields: [
                            project: [key: 'NODE'], // Replace with your project key
                            summary: 'Automated issue creation from Jenkins',
                            description: 'This issue was created automatically by Jenkins.',
                            issuetype: [name: 'Task'] // Replace with your issue type
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
                    jiraTransitionIssue site: "${env.JIRA_SITE}", credentialsId: "${env.JIRA_CREDENTIALS_ID}", idOrKey: "${env.JIRA_ISSUE_KEY}", input: [transition: '31'] // Replace '31' with the actual ID for the "Done" transition
                }
            }
        }
    }

    post {
        failure {
            script {
                // In case of a failure, comment on the Jira issue
                jiraAddComment site: "${env.JIRA_SITE}", idOrKey: "${env.JIRA_ISSUE_KEY}", comment: 'The build or deployment has failed.'
                
                // Optionally, you can also close the issue in case of failure, if desired
                // jiraTransitionIssue site: "${env.JIRA_SITE}", credentialsId: "${env.JIRA_CREDENTIALS_ID}", idOrKey: "${env.JIRA_ISSUE_KEY}", input: [transition: '31'] // Replace '31' with the actual ID for the "Done" transition
            }
        }
    }
}

