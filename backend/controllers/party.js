import Party from "../models/party.js";
const registertheParty = async(req,res) => {
    const { name, symbol, location } = req.body;

    if (!name || !symbol || !location) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      // 🔍 Check if a party with the same name already exists
      const existingParty = await Party.findOne({ name });
      if (existingParty) {
        return res.status(409).json({ message: "Party already exists." });
      }

      const existingParty2 = await Party.findOne({ symbol });
      if (existingParty2) {
        return res.status(409).json({ message: "Symbol already exists." });
      }

    const newParty = new Party({
        name,
        symbol,
        location
    })

    newParty.save();

    return res.status(201).json({
        name : name,
        symbol : symbol,
        location : location
    })
}

export default registertheParty;