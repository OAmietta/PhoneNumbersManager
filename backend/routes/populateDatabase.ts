import express from "express";
import csv from "csvtojson";
import { readFileSync } from "fs";
import { PhoneNumber } from "../models/availablePhoneNumbers";
import { User } from "../models/users";
import { IOrganisation, IUser } from "../interfaces";
import { Organisation } from "../models/organisations";
const router = express.Router();

const saveInitialUsers = async () => {
  const usersFinded = await User.find({});
  if (usersFinded.length > 0) {
    return;
  } else {
    const content = JSON.parse(readFileSync("./initial_users.json", "utf-8"));

    content?.forEach((userItem: IUser) => {
      const user = new User({
        idPassport: userItem.idPassport,
        name: userItem.name,
        surname: userItem.surname,
        phoneNumber: userItem.phoneNumber,
        phoneAllocated: userItem.phoneAllocated,
        organisationID: userItem.organisationID,
      });
      user.save();
    });
  }
};

const saveInitialOrganisations = async () => {
  const organisationsFinded = await Organisation.find({});
  if (organisationsFinded.length > 0) {
    return;
  } else {
    const content = JSON.parse(
      readFileSync("./initial_organisations.json", "utf-8")
    );

    content?.forEach((organisationItem: IOrganisation) => {
      const organisation = new Organisation({
        id: organisationItem.id,
        name: organisationItem.name,
      });
      organisation.save();
    });
  }
};

const saveInitialAvailablePhoneNumbers = async () => {
  const phoneNumbersFinded = await PhoneNumber.find({});
  if (phoneNumbersFinded.length > 0) {
    return;
  } else {
    //Get the phone numbers listed in the csv
    const fileContent = readFileSync("./available_numbers.csv", "utf-8");
    const phoneList = await csv({
      noheader: true,
      output: "csv",
    })
      .fromString(fileContent)
      .then((csvRow: Array<string>) => {
        return csvRow;
      });

    //Save the phone numbers in mongoDB
    phoneList?.forEach((itemNumber: string) => {
      const number = new PhoneNumber({
        phoneNumber: itemNumber[0],
      });
      number.save();
    });
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     PopulateDatabaseResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "DATABASE READY"
 */

/**
 * @swagger
 * /api/populateDatabase:
 *   post:
 *     summary: Populate the database with users, available phone numbers, and organizations if they don't exist
 *     tags: [InitialData]
 *     responses:
 *       200:
 *         description: Database has been populated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PopulateDatabaseResponse'
 */
router.post("/api/populateDatabase", async (req, res) => {
  try {
    saveInitialUsers();
    saveInitialOrganisations();
    saveInitialAvailablePhoneNumbers();
    return res.status(200).json({ message: "DATABASE READY" });
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default router;
