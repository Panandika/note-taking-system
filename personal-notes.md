notes_backend\notes
-> responsible for everything related to managing notes

Info each notes would store:
1. Title
2. Content of the notes
3. Timestamps when it created
4. Timestamps last updated
5. Link to the note

To summarize, your immediate next steps within the notes app are:
Define the Note model in notes/models.py.
Make migrations (python manage.py makemigrations notes).
Migrate (python manage.py migrate).

-----INITIAL PLAN-------
Set Up Django Backend & Supabase Database
Why Start Here: Your React frontend depends on a working API, and Django needs database connectivity first.

Step-by-Step:
Create Django Project & App

bash
pip install django djangorestframework psycopg2-binary
django-admin startproject notes_backend
cd notes_backend
python manage.py startapp notes
Connect Django to Supabase PostgreSQL
In settings.py:

python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.contrib.postgresql',
        'NAME': os.getenv('SUPABASE_DB_NAME'),
        'USER': os.getenv('SUPABASE_DB_USER'),
        'PASSWORD': os.getenv('SUPABASE_DB_PASSWORD'),
        'HOST': os.getenv('SUPABASE_DB_HOST'),
        'PORT': '5432',
    }
}
Store credentials in .env (add to .gitignore).

Define the Note Model
In notes/models.py:

python
from django.contrib.auth.models import User

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.JSONField()  # For Quill.js Delta format
    created_at = models.DateTimeField(auto_now_add=True)
Run migrations: python manage.py migrate

2. Implement Authentication (Start Simple)
Why: Authentication is required for note ownership. Begin with Django REST Simple JWT for faster iteration (you can switch to Supabase Auth later).

Steps:
Install packages:

bash
pip install djangorestframework-simplejwt
In settings.py:

python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}
Create user registration/login endpoints or use a package like django-rest-auth.

3. Build CRUD API with DRF
Why: Frontend needs endpoints to interact with notes.

Steps:
Create notes/serializers.py:

python
from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at']
Create notes/views.py:

python
from rest_framework import viewsets
from .models import Note
from .serializers import NoteSerializer

class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
Register routes in urls.py.

4. Configure CORS
Why: Frontend (localhost:3000) can’t talk to backend (localhost:8000) without CORS.

Install django-cors-headers:

bash
pip install django-cors-headers
In settings.py:

python
INSTALLED_APPS = [ ... 'corsheaders' ]
MIDDLEWARE = [ 'corsheaders.middleware.CorsMiddleware', ... ]
CORS_ALLOWED_ORIGINS = ['http://localhost:3000']  # Add your frontend URL
5. Test the API
Use Postman or curl to:

Register a user.

Obtain a JWT token via /api/token/.

Create/fetch notes with the Authorization: Bearer <token> header.

6. Frontend Setup (React + Quill.js)
Once the API works, scaffold the React app:

bash
npx create-react-app notes-frontend
cd notes-frontend
npm install react-quill dompurify @supabase/supabase-js
Key frontend steps (to tackle after backend):

Configure API client to point to REACT_APP_API_URL.

Implement authentication flows (token handling).

Integrate Quill.js with DOMPurify sanitization.

