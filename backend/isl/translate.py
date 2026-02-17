from googletrans import Translator

translator = Translator()

SUPPORTED_LANGUAGES = {
    "te": "Telugu",
    "ta": "Tamil"
}

def translate_to_english(text, src_lang):
    """
    Translates Telugu/Tamil text to English
    """

    if src_lang not in SUPPORTED_LANGUAGES:
        raise ValueError("Unsupported language")

    result = translator.translate(
        text,
        src=src_lang,
        dest="en"
    )

    return result.text
