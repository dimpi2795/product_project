

import Address from "../models/Address.js";

export const saveAddress = async (req, res) => {
    try {
        const address = await Address.create(req.body);

        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({
            userId: req.params.userId
        });

        res.json(addresses);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};