import express from "express";
import { PhoneNumber } from "../models/availablePhoneNumbers";
import { User } from "../models/users";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AllocateNumberResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "SUCCESS"
 */

/**
 * @swagger
 * /api/allocateNumber/{idPassport}/{name}/{surname}/{phoneNumber}:
 *   post:
 *     summary: Allocate a phone number to a specific user and remove it from the available numbers list
 *     tags: [PhoneNumbers]
 *     parameters:
 *       - in: path
 *         name: idPassport
 *         schema:
 *           type: string
 *         required: true
 *         description: ID Passport of the user
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the user
 *       - in: path
 *         name: surname
 *         schema:
 *           type: string
 *         required: true
 *         description: Surname of the user
 *       - in: path
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Phone number to be allocated
 *     responses:
 *       200:
 *         description: Number allocated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AllocateNumberResponse'
 */
router.post(
  "/api/allocateNumber/:idPassport/:name/:surname/:phoneNumber",
  async (req, res) => {
    const { idPassport, name, surname, phoneNumber } = req.params;

    //Find the user, allocate the phone number and set phoneAllocated to true
    try {
      await User.findOneAndUpdate(
        {
          idPassport: idPassport,
          name: name,
          surname: surname,
          phoneAllocated: false,
        },
        { phoneNumber: phoneNumber, phoneAllocated: true }
      );

      //Delete the numbers from the available phone numbers list
      await PhoneNumber.findOneAndUpdate(
        {
          phoneNumber: phoneNumber,
        },
        { available: false }
      );
      return res.status(200).json({ message: "SUCCESS" });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

export default router;
