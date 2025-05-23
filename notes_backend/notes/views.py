from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Note
from .serializers import NoteSerializer

#ViewSets = memberikan cara untuk define logic for handilng request in API endpoints

# Create your views here.
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated] # Require authentication

