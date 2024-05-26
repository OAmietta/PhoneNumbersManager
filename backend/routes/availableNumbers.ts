import express from "express";
import { PhoneNumber } from "../models/availablePhoneNumbers";
import { IPhoneNumber } from "../interfaces";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PhoneNumber:
 *       type: object
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "691587202"
 *         available:
 *           type: boolean
 *           example: true
 *     PhoneNumbersResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PhoneNumber'
 *         message:
 *           type: string
 *           example: "SUCCESS"
 */

/**
 * @swagger
 * /api/getAvailablePhoneNumbers:
 *   get:
 *     summary: Retrieve a list of available phone numbers
 *     tags: [PhoneNumbers]
 *     responses:
 *       200:
 *         description: A list of available phone numbers
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneNumbersResponse'
 */
router.get("/api/getAvailablePhoneNumbers", async (req, res) => {
  try {
    const phoneNumbersFinded = await PhoneNumber.find({ available: true });
    const phoneNumbersArr: Array<IPhoneNumber> = [];
    if (phoneNumbersFinded.length > 0) {
      phoneNumbersFinded.forEach((item) => {
        phoneNumbersArr.push({
          phoneNumber: item.phoneNumber,
          available: item.available,
        });
      });
    }
    return res.status(200).json({ data: phoneNumbersArr, message: "SUCCESS" });
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
