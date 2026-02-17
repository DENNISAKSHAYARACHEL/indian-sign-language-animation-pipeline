import re
import os
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

# Ensure NLTK can find downloaded data
nltk.data.path.append(
    os.path.join(os.path.dirname(__file__), '..', 'nltk_data')
)

lemmatizer = WordNetLemmatizer()

STOP_WORDS = set([
    "is", "am", "are", "was", "were", "be", "been",
    "the", "a", "an", "and", "or", "of", "to", "for",
    "with", "on", "in", "at", "by", "from"
])


def english_to_isl_tokens(sentence, dataset_path):
    """
    Converts English sentence to ordered ISL tokens
    """

    # 1. Normalize input
    sentence = sentence.lower()
    # Remove punctuation & special characters
    sentence = re.sub(r"[^\w\s]", "", sentence)

    # 2. Tokenization (Rule-based Treebank)
    words = word_tokenize(sentence)

    # 3. POS tagging (Averaged Perceptron)
    tagged = nltk.pos_tag(words)

    # 4. Tense detection (Rule-based)
    tense = {
        "past": 0,
        "present": 0,
        "future": 0,
        "present_continuous": 0
    }

    for word, tag in tagged:
        if tag in ["VBD", "VBN"]:
            tense["past"] += 1
        elif tag in ["VBP", "VBZ"]:
            tense["present"] += 1
        elif tag == "VBG":
            tense["present_continuous"] += 1
        elif tag == "MD":
            tense["future"] += 1

    # 5. Stopword removal + Lemmatization
    processed_words = []
    for word, tag in tagged:
        if word in STOP_WORDS:
            continue

        if tag.startswith('V'):
            processed_words.append(lemmatizer.lemmatize(word, pos='v'))
        elif tag.startswith('J'):
            processed_words.append(lemmatizer.lemmatize(word, pos='a'))
        else:
            processed_words.append(lemmatizer.lemmatize(word))

    # 6. Decide tense marker ONLY if detected
    tense_marker = None
    max_count = max(tense.values())

    if max_count > 0:
        tense_marker = max(tense, key=tense.get)

    # Apply ISL tense markers
    if tense_marker == "past":
        processed_words.insert(0, "before")
    elif tense_marker == "future":
        processed_words.insert(0, "will")
    elif tense_marker == "present_continuous":
        processed_words.insert(0, "now")
    # NOTE: present tense → NO marker in ISL

    # 7. Phrase-priority dataset lookup
    output_tokens = []
    i = 0
    n = len(processed_words)

    while i < n:
        matched = False

        # Try 3-word phrase
        if i + 2 < n:
            phrase = "_".join(processed_words[i:i+3])
            if os.path.exists(os.path.join(dataset_path, f"{phrase}.mp4")):
                output_tokens.append(phrase)
                i += 3
                matched = True

        # Try 2-word phrase
        if not matched and i + 1 < n:
            phrase = "_".join(processed_words[i:i+2])
            if os.path.exists(os.path.join(dataset_path, f"{phrase}.mp4")):
                output_tokens.append(phrase)
                i += 2
                matched = True

        # Try single word
        if not matched:
            word = processed_words[i]
            if os.path.exists(os.path.join(dataset_path, f"{word}.mp4")):
                output_tokens.append(word)
            else:
                # Character-level fallback
                for char in word:
                    output_tokens.append(char)
            i += 1

    # 8. Return final ISL sequence
    return output_tokens
