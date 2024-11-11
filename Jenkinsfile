pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        
        DOCKER_IMAGE = 'mayma/nodejs-app'
       
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/may-meriem/TP3-DevOps.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Docker Build and Push') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        def appImage = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                        appImage.push()
                        appImage.push('latest')
                    }
                }
            }
        }
        
        
   
}
