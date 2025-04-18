Server Upload:

1. Start Docker
2. Create Docker Image: 'docker build -t exam-practice-server .'
3. Check Docker images: 'docker images'
4. Start Docker image: 'docker run -p 8080:8080 exam-practice-server'
5. Change image name: 'docker tag exam-practice-server europe-west4-docker.pkg.dev/kh-reuse/exam-practice-server-repo/exam-practice-server'
6. GCLOUD Login: 'gcloud auth login'
7. List available projects: 'gcloud projects list'
8. Set default project: 'gcloud config set project kh-reuse'
9. Check current project: 'gcloud config get-value project'
9. Authorize gcloud for docker: 'gcloud auth configure-docker europe-west4-docker.pkg.dev'
10. Push Docker contain to gcloud: docker push europe-west4-docker.pkg.dev/kh-reuse/exam-practice-server-repo/exam-practice-server
11. Deploy to cloud run: 'gcloud run deploy exam-practice-server --image europe-west4-docker.pkg.dev/kh-reuse/exam-practice-server-repo/exam-practice-server --min-instances 0 --max-instances 1 --region europe-west4 --platform=managed --allow-unauthenticated'
