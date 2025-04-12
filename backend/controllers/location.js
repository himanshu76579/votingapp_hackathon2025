// controllers/location.js
import Location from "../models/location.js";
import Party from "../models/party.js";

const registerTheLocation = async (req, res) => {
  try {
    console.log("came to set locaton");
    const { name, election } = req.body;

    if (!name || election === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find all parties with matching location
    const parties = await Party.find({ location: name });

    if (parties.length === 0) {
      console.log("No parties found for this location.");
    } else {
      console.log(`Found ${parties.length} parties.`);
    }

    // Extract just the ObjectIds
    const partyIds = parties.map(p => p._id);

    const location = new Location({
      name,
      election,
      parties: partyIds
    });

    await location.save();

    return res.status(201).json({
      message: "Location registered successfully.",
      location
    });

  } catch (error) {
    console.error("Error registering location:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

export default registerTheLocation;
