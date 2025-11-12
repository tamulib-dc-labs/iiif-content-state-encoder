# IIIF Content State Encoder

A simple web application to encode IIIF Canvas and Manifest URLs into base64url-encoded 
[IIIF Content State](https://iiif.io/api/content-state/1.0/) strings. 

This makes it easy to share deep links to specific canvases or regions of canvases in IIIF viewers that support Content State.

## Usage

### Basic Canvas Encoding

1. Enter your **Canvas URL** (the specific page/canvas you want to link to)
2. Enter your **Manifest URL** (the IIIF manifest containing the canvas)
3. Optionally include an `x,y,w,h` to target part of the Canvas (this will be appended to the canvas url)
3. Click **Encode**
4. Copy the encoded string or click a viewer button to open it directly

**Example 1:**
- Canvas: `https://api.library.tamu.edu/iiif-service/fedora/canvas/3b/6f/c3/25/3b6fc325-f6ca-41d8-b91e-8c5db3be8c13/graydiary-saf_objects/2/pages/page_63`
- Manifest: `https://tamulib-dc-labs.github.io/custom-iiif-manifests/manifests/gray-diary/gray-v3.json`
- Result: Base64 encoded url pointing at a specific Canvas in a Manifest
- [Example 1 in Theseus](https://theseusviewer.org/?iiif-content=JTdCJTIyaWQlMjIlM0ElMjJodHRwcyUzQSUyRiUyRmFwaS5saWJyYXJ5LnRhbXUuZWR1JTJGaWlpZi1zZXJ2aWNlJTJGZmVkb3JhJTJGY2FudmFzJTJGM2IlMkY2ZiUyRmMzJTJGMjUlMkYzYjZmYzMyNS1mNmNhLTQxZDgtYjkxZS04YzVkYjNiZThjMTMlMkZncmF5ZGlhcnktc2FmX29iamVjdHMlMkYyJTJGcGFnZXMlMkZwYWdlXzYzJTIyJTJDJTIydHlwZSUyMiUzQSUyMkNhbnZhcyUyMiUyQyUyMnBhcnRPZiUyMiUzQSU1QiU3QiUyMmlkJTIyJTNBJTIyaHR0cHMlM0ElMkYlMkZ0YW11bGliLWRjLWxhYnMuZ2l0aHViLmlvJTJGY3VzdG9tLWlpaWYtbWFuaWZlc3RzJTJGbWFuaWZlc3RzJTJGZ3JheS1kaWFyeSUyRmdyYXktdjMuanNvbiUyMiUyQyUyMnR5cGUlMjIlM0ElMjJNYW5pZmVzdCUyMiU3RCU1RCU3RA)

**Example 2:**
- Canvas: `https://api.library.tamu.edu/iiif-service/fedora/canvas/3b/6f/c3/25/3b6fc325-f6ca-41d8-b91e-8c5db3be8c13/graydiary-saf_objects/2/pages/page_63`
- Manifest: `https://tamulib-dc-labs.github.io/custom-iiif-manifests/manifests/gray-diary/gray-v3.json`
- Target: `xywh=311,389,1773,339`
- Result: Base64 encoded url targeting part of the Canvas
- [Example 2 in Theseus](https://theseusviewer.org/?iiif-content=JTdCJTIyJTQwY29udGV4dCUyMiUzQSUyMmh0dHAlM0ElMkYlMkZpaWlmLmlvJTJGYXBpJTJGcHJlc2VudGF0aW9uJTJGMyUyRmNvbnRleHQuanNvbiUyMiUyQyUyMmlkJTIyJTNBJTIyaHR0cHMlM0ElMkYlMkZleGFtcGxlLm9yZyUyRmltcG9ydCUyRjElMjIlMkMlMjJ0eXBlJTIyJTNBJTIyQW5ub3RhdGlvbiUyMiUyQyUyMm1vdGl2YXRpb24lMjIlM0ElNUIlMjJjb250ZW50U3RhdGUlMjIlNUQlMkMlMjJ0YXJnZXQlMjIlM0ElN0IlMjJpZCUyMiUzQSUyMmh0dHBzJTNBJTJGJTJGYXBpLmxpYnJhcnkudGFtdS5lZHUlMkZpaWlmLXNlcnZpY2UlMkZmZWRvcmElMkZjYW52YXMlMkYzYiUyRjZmJTJGYzMlMkYyNSUyRjNiNmZjMzI1LWY2Y2EtNDFkOC1iOTFlLThjNWRiM2JlOGMxMyUyRmdyYXlkaWFyeS1zYWZfb2JqZWN0cyUyRjIlMkZwYWdlcyUyRnBhZ2VfNjMlMjN4eXdoJTNEMzExJTJDMzg5JTJDMTc3MyUyQzMzOSUyMiUyQyUyMnR5cGUlMjIlM0ElMjJDYW52YXMlMjIlMkMlMjJwYXJ0T2YlMjIlM0ElNUIlN0IlMjJpZCUyMiUzQSUyMmh0dHBzJTNBJTJGJTJGdGFtdWxpYi1kYy1sYWJzLmdpdGh1Yi5pbyUyRmN1c3RvbS1paWlmLW1hbmlmZXN0cyUyRm1hbmlmZXN0cyUyRmdyYXktZGlhcnklMkZncmF5LXYzLmpzb24lMjIlMkMlMjJ0eXBlJTIyJTNBJTIyTWFuaWZlc3QlMjIlN0QlNUQlN0QlN0Q)

## Development

### Prerequisites

- Node.js 20+ and npm

## IIIF Resources

- [IIIF Content State API Specification](https://iiif.io/api/content-state/1.0/)
- [Theseus Viewer](https://theseusviewer.org/)
- [Clover IIIF Viewer](https://samvera-labs.github.io/clover-iiif/)
