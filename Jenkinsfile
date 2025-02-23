pipeline {
    agent {
        docker {
            image 'cypress/included:13.6.1'
            args '-u root:root'
        }
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'qa', 'stg'], description: 'Select environment to run tests')
        choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'edge'], description: 'Select browser for test execution')
        string(name: 'TEST_SUITE', defaultValue: 'all', description: 'Specify test suite to run (default: all)')
    }

    environment {
        CYPRESS_CACHE_FOLDER = '.cache/Cypress'
        NODE_OPTIONS = '--max-old-space-size=4096'
    }

    stages {
        
        stage('Setup') {
            steps {
                script {
                    sh 'docker --version'  // ✅ This will verify if Docker is available
                    sh 'docker pull node:18'
                    sh 'docker run --rm -v $(pwd):/app -w /app node:18 npm ci'
                    sh 'npm ci'
                }
            }
        }

        stage('Run Tests') {
            matrix {
                axes {
                    axis {
                        name 'ENVIRONMENT'
                        values 'dev', 'qa', 'stg'
                    }
                    axis {
                        name 'BROWSER'
                        values 'chrome', 'firefox', 'edge'
                    }
                }
                stages {
                    stage('Execute Tests') {
                        steps {
                            script {
                                try {
                                    sh "npx cypress run --browser ${BROWSER} --config-file cypress/config/${ENVIRONMENT}.config.ts --env CYPRESS_TEST_SUITE=${params.TEST_SUITE}"
                                } catch (Exception e) {
                                    currentBuild.result = 'FAILURE'
                                    error "Test execution failed in ${ENVIRONMENT} environment on ${BROWSER} browser"
                                }
                            }
                        }
                        post {
                            always {
                                archiveArtifacts artifacts: 'cypress/videos/**/*.*', allowEmptyArchive: true
                                archiveArtifacts artifacts: 'cypress/screenshots/**/*.*', allowEmptyArchive: true
                            }
                        }
                    }
                }
            }
        }
    }

    post {
       always {
        node('built-in') {  // Run on the built-in node
            sh 'rm -rf cypress/videos cypress/screenshots .cache/Cypress'
            cleanWs()
        }
    }
        success {
            echo 'All tests completed successfully!'
        }
        failure {
            echo 'Test execution failed!'
        }
    }
}
