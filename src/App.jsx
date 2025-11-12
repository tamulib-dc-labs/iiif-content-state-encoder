import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

export default function ContentStateEncoder() {
  const [canvasUrl, setCanvasUrl] = useState('');
  const [manifestUrl, setManifestUrl] = useState('');
  const [annotation, setAnnotation] = useState('');
  const [encoded, setEncoded] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeContentState = (canvasUrl, manifestUrl, annotation) => {
    let contentState;

    if (annotation && annotation.trim()) {
      // If this is an annotation that targets a part of the Canvas, encode as such
      const targetId = annotation.startsWith('#')
        ? `${canvasUrl}${annotation}`
        : `${canvasUrl}#${annotation}`;

      contentState = {
        "@context": "http://iiif.io/api/presentation/3/context.json",
        "id": "https://example.org/import/1",
        "type": "Annotation",
        "motivation": ["contentState"],
        "target": {
          "id": targetId,
          "type": "Canvas",
          "partOf": [{
            "id": manifestUrl,
            "type": "Manifest"
          }]
        }
      };
    } else {
      // Original simple format
      contentState = {
        id: canvasUrl,
        type: "Canvas",
        partOf: [
          {
            id: manifestUrl,
            type: "Manifest"
          }
        ]
      };
    }

    const compactJson = JSON.stringify(contentState);
    const uriEncoded = encodeURIComponent(compactJson);

    const base64 = btoa(unescape(encodeURIComponent(uriEncoded)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    return base64;
  };

  const handleEncode = () => {
    if (canvasUrl && manifestUrl) {
      const result = encodeContentState(canvasUrl, manifestUrl, annotation);
      setEncoded(result);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(encoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            IIIF Content State Encoder
          </h1>
          <p className="text-gray-600 mb-6">
            Convert Canvas and Manifest URLs to base64 encoded <a href="https://iiif.io/api/content-state/1.0/" className="text-blue-600 hover:underline">IIIF Content State</a>.
          </p>
          <p className="text-gray-600 mb-6">
            <strong>Target</strong> is optional.  If included, the content state request will be an Annotation that targets part of the canvas.
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Canvas URL
              </label>
              <textarea
                value={canvasUrl}
                onChange={(e) => setCanvasUrl(e.target.value)}
                placeholder="https://api.library.tamu.edu/iiif-service/fedora/canvas/3b/6f/c3/25/3b6fc325-f6ca-41d8-b91e-8c5db3be8c13/graydiary-saf_objects/2/pages/page_4"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manifest URL
              </label>
              <input
                type="text"
                value={manifestUrl}
                onChange={(e) => setManifestUrl(e.target.value)}
                placeholder="https://tamulib-dc-labs.github.io/custom-iiif-manifests/manifests/gray-diary/gray-v3.json"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target <span className="text-gray-500 font-normal">(optional - e.g., xywh=100,200,100,200)</span>
              </label>
              <input
                type="text"
                value={annotation}
                onChange={(e) => setAnnotation(e.target.value)}
                placeholder="xywh=100,200,100,200"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleEncode}
            disabled={!canvasUrl || !manifestUrl}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-black disabled:cursor-not-allowed transition-colors"
          >
            Encode
          </button>

          {encoded && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Encoded Content State
                </label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-sm text-pink-300 hover:text-green-300"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="bg-black p-4 rounded-lg border border-gray-200 break-all font-mono text-sm">
                {encoded}
              </div>

              <div className="mt-4 flex gap-3">
                <a
                  href={`https://theseusviewer.org/?iiif-content=${encoded}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors hover:text-white"
                >
                  <ExternalLink size={18} />
                  Open in Theseus
                </a>
                <a
                  href={`https://samvera-labs.github.io/clover-iiif/?iiif-content=${encoded}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors hover:text-white"
                >
                  <ExternalLink size={18} />
                  Open in Clover
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}