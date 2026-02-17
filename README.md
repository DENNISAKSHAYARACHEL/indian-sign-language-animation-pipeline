# Indian Sign Language Animation Pipeline

## Overview

This project presents a multilingual Indian language to Indian Sign Language (ISL) animation system.  
The system converts Telugu and Tamil text inputs into ISL animation sequences using a pivot-based translation architecture.

The goal of the project is to bridge the communication gap between spoken Indian languages and the Deaf community by generating structured ISL animations with captions.

---

## System Architecture

Indian Language Input (Telugu / Tamil)
        ↓
Google Translate API (Pivot to English)
        ↓
Rule-Based NLP Processing (Token Normalization & Mapping)
        ↓
ISL Token Sequence Generation
        ↓
ISL Animation Rendering (Video Dataset)
        ↓
Captioned Output

---

## Technologies Used

### Backend
- Django
- Python
- SQLite (development)
- Google Translate API
- Rule-based NLP pipeline

### Frontend
- React (Vite)
- Axios
- React Router

---

## Features

- Supports Telugu and Tamil text input
- Pivot-based translation via English
- Rule-based grammatical transformation
- ISL token generation
- Animated ISL output with captions
- Modular dataset-driven animation mapping

---

## Dataset

The ISL video dataset is not included in this repository.

Dataset Link:https://www.kaggle.com/datasets/dakshayarachel/isl-social-interaction-animation-dataset


After downloading, place the dataset inside:

backend/static/videos/




