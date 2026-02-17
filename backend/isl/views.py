import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .nlp import english_to_isl_tokens

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_PATH = os.path.join(BASE_DIR, 'static', 'isl_videos')

@csrf_exempt
def english_to_isl_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body.decode("utf-8"))
    sentence = data.get("text", "")

    if not sentence:
        return JsonResponse({"error": "Empty input"}, status=400)

    tokens = english_to_isl_tokens(sentence, DATASET_PATH)

    return JsonResponse({
        "input": sentence,
        "isl_sequence": tokens
    })
from .translate import translate_to_english
from .nlp import english_to_isl_tokens

@csrf_exempt
def multilingual_to_isl_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body.decode("utf-8"))

    text = data.get("text", "")
    lang = data.get("lang", "")

    if not text or not lang:
        return JsonResponse({"error": "Text and language required"}, status=400)

    try:
        english_text = translate_to_english(text, lang)
    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)

    tokens = english_to_isl_tokens(english_text, DATASET_PATH)

    return JsonResponse({
        "input_language": lang,
        "original_text": text,
        "english_translation": english_text,
        "isl_sequence": tokens
    })
