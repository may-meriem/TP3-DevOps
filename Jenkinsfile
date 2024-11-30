pipeline {
    agent any
    tools {
        nodejs '10.19.0' // Ensure this matches the name you provided
    }
    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_IMAGE = 'mayma/nodejs-app'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/may-meriem/TP3-DevOps.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
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
        stage('Deploying Node.js container to Kubernetes') {
            steps {
                script {
                    LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCakNDQWU2Z0F3SUJBZ0lCQVRBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwdGFXNXAKYTNWaVpVTkJNQjRYRFRJME1URXdOREV4TURVMU1sb1hEVE0wTVRFd016RXhNRFUxTWxvd0ZURVRNQkVHQTFVRQpBeE1LYldsdWFXdDFZbVZEUVRDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBT3BzCjVrNXhTT3VhbGwwZmtuRmxNMnNBcmIvRkUrQVBVdHZGWHZ0ZnJZMEVQZnFaQVVOamVPb3Z6K3B5NWJ6REh3NDMKcCt5RUNxVVBMdy81YkRMaDZtckJUdk5QN0JsNHF4MGJBVGN3Uzd6YklsUEFGNnU1NitpL1FFaTM4bm9vaHg4ZwpNOXp6WHhwZk5UQlRaZ3pzTW5qajVldS90RDlzZWlMK0RMREtlNDc2MXJYN04rcDlKd2JSMnpKQ0YyZUNnWUVhCnBQZUhLdG81Q2lhMjkzdnY4V0MraVJjRE51d3FOUW1FZTkzSnpyWWY0ckVySkhGcVRiOElHdHdTa2sxa3dUNnYKekppRXlJMXcxSjlDYldJdlRFd1I1WU9kd2FnenZuSVZFM0RLWlBVc09RODQxZDA2L2NvdmhyM2lrb3l3aFlPdQpQU0RRSFNOdGpRamoydDd1ckJjQ0F3RUFBYU5oTUY4d0RnWURWUjBQQVFIL0JBUURBZ0trTUIwR0ExVWRKUVFXCk1CUUdDQ3NHQVFVRkJ3TUNCZ2dyQmdFRkJRY0RBVEFQQmdOVkhSTUJBZjhFQlRBREFRSC9NQjBHQTFVZERnUVcKQkJSNzc0RzBaM1ZpQWpLT3ZPR3ZFcGFWbEFldnV6QU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUEzY2w4MlJ6TQp1Nlp0SGJ4SGs2REk1c3VoYTFzK1BSNy82dnpHM2lDL2FORzdYVUc1WlBoWFptNVNFaGlNZzZWTWFScnBwZ3MxCkhab05GaFY3N1NMY3BTVDFjVHJXbWVXMUs5VUxESHFJcU5MMFFRcjRYTk9hM2UxVlRJKzFqZys4ZFhGWnZZZHoKZmFFRWpGQUcrbmJYemN0Skg1cmg1Rzc1QWZqNFZrL2VSeHNLUlFyVkE1OXZDZDFrZXFVMndxeWE5d3MvbmU0NQpmd1BPZFVPUW5wckZzaEtSL3RlZndFNGFKUmRYVDhKalJOVzZ4UWhXVGljK3lxNGpJVUwyY3IxbkFLbVNXTU9pClhnUFJoMm9saGRtdy9ucUtNcU1iQlJoWVo4d3QrWkNZK3AvM0xBbGEzUEpscXVZMjRHeGNLbUFwTVVGUjlUY1AKSFBoRzJqQVM2NmdzbGc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg== {
                    sh 'kubectl apply -f deployment.yaml'
                    sh 'kubectl apply -f service.yaml'
                }

                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'Pipeline executed successfully.'
        }
        failure {
            echo 'Pipeline execution failed.'
        }
    }
}

