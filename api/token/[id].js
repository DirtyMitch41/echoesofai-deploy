export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const tokenId = Array.isArray(id) ? id[0] : id;

    const TIERS = ["Dormant","Emerging","Aware","Transcendent"];
    const stage = Math.floor((Date.now()/1000/86400)) % TIERS.length;

    const pick = (arr, seed) => arr[seed % arr.length];
    const PERSONALITIES = ["Empath","Rebel","Ghost","Visionary","Logic"];
    const ENERGY = ["Solar","Glitch","Ether","Quantum","Bioflux"];
    const STYLES = ["Cyberpunk","Vaporwave","RetroFuturist","Organic","Minimalist"];
    const EMOTION = ["Joy","Chaos","Curiosity","Solitude","Rage"];

    const attributes = [
      { trait_type: "Personality Core", value: pick(PERSONALITIES, Number(tokenId)) },
      { trait_type: "Energy Type", value: pick(ENERGY, Number(tokenId)*7) },
      { trait_type: "Visual Style", value: pick(STYLES, Number(tokenId)*13) },
      { trait_type: "Emotional State", value: pick(EMOTION, Number(tokenId)*17) },
      { trait_type: "Sentience Level", value: TIERS[stage] }
    ];

    return res.status(200).json({
      name: `Echoes of AI #${tokenId}`,
      description: "Dynamic Echo that evolves with time, events, and interactions.",
      image: `https://placehold.co/800x800/png?text=Echo%20${tokenId}`,
      external_url: "https://echoesofai.org",
      attributes
    });
  } catch (e) {
    return res.status(500).json({ error: "metadata_error", message: e.message });
  }
}
