// Ville et pays approximatifs du visiteur, d'après l'adresse de connexion (en-têtes fournis par Vercel).
// Aucune donnée n'est enregistrée ici.
module.exports = (req, res) => {
  const h = (k) => { try { return decodeURIComponent(req.headers[k] || ""); } catch (e) { return req.headers[k] || ""; } };
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ city: h("x-vercel-ip-city"), country: h("x-vercel-ip-country") }));
};
