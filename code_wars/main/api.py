from django.http import JsonResponse
from django.core import serializers
from .models import Questions

def get_questions(request):
    questions = Questions.objects.all()
    serialized_questions = serializers.serialize('json', questions)
    print(serialized_questions)
    return JsonResponse(serialized_questions, safe=False)
