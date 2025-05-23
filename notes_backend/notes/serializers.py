from rest_framework import serializers
from .models import Note

# Serializer untuk defining bagaimana model converted to json dan sebaliknya
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_date', 'last_updated']

