import express from "express";
import { IUser } from "../interfaces";
import { User } from "../models/users";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "66530ab77d0f87542d03a2da"
 *         idPassport:
 *           type: string
 *           example: "43113423"
 *         name:
 *           type: string
 *           example: "Alice"
 *         surname:
 *           type: string
 *           example: "Smith"
 *         phoneNumber:
 *           type: string
 *           example: "614536689"
 *         phoneAllocated:
 *           type: boolean
 *           example: true
 *         organisationID:
 *           type: integer
 *           example: 123
 *     UsersResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         message:
 *           type: string
 *           example: "SUCCESS"
 */

/**
 * @swagger
 * /api/getUsers/{orgID}:
 *   get:
 *     summary: Retrieve a list of users by organization ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: orgID
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the organization
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersResponse'
 */
router.get("/api/getUsers/:orgID", async (req, res) => {
  const { orgID } = req.params;
  //Show the users of a specific organization
  try {
    const usersFinded = await User.find({
      organisationID: orgID,
    });
    const usersFindedArr: Array<IUser> = [];
    if (usersFinded.length > 0) {
      usersFinded.forEach((item) => {
        usersFindedArr.push({
          id: item.id,
          idPassport: item.idPassport,
          name: item.name,
          surname: item.surname,
          phoneNumber: item.phoneNumber,
          phoneAllocated: item.phoneAllocated,
          organisationID: item.organisationID,
        });
      });
    }
    return res.status(200).json({ data: usersFindedArr, message: "SUCCESS" });
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
