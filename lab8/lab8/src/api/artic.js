const API_BASE = "https://api.artic.edu/api/v1";

export const DEPARTMENTS = [
  { label: "All departments", value: "" },
  { label: "Painting and Sculpture of Europe", value: "Painting and Sculpture of Europe" },
  { label: "Modern and Contemporary Art", value: "Modern and Contemporary Art" },
  { label: "Arts of Asia", value: "Arts of Asia" },
  { label: "Arts of the Americas", value: "Arts of the Americas" },
  { label: "Photography and Media", value: "Photography and Media" },
  { label: "Prints and Drawings", value: "Prints and Drawings" },
  { label: "Textiles", value: "Textiles" },
  { label: "Architecture and Design", value: "Architecture and Design" },
];

export function buildSearchUrl({ query = "", department = "", page = 1, limit = 12 }) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    fields: [
      "id",
      "title",
      "artist_title",
      "image_id",
      "date_display",
      "thumbnail",
      "department_title",
      "short_description",
    ].join(","),
  });

  if (query.trim()) {
    params.set("q", query.trim());
  }

  if (department) {
    params.set("query[term][department_title]", department);
  }

  return `${API_BASE}/artworks/search?${params.toString()}`;
}

export function buildDetailsUrl(id) {
  const params = new URLSearchParams({
    fields: [
      "id",
      "title",
      "artist_title",
      "image_id",
      "date_display",
      "place_of_origin",
      "medium_display",
      "dimensions",
      "department_title",
      "artwork_type_title",
      "short_description",
      "thumbnail",
      "is_public_domain",
      "credit_line",
      "main_reference_number",
      "style_title",
      "classification_title",
      "publication_history",
      "exhibition_history",
      "provenance_text",
      "artist_display",
      "inscriptions",
    ].join(","),
  });

  return `${API_BASE}/artworks/${id}?${params.toString()}`;
}