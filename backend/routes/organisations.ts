import express from "express";
import { IOrganisation } from "../interfaces";
import { Organisation } from "../models/organisations";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Organisation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 123
 *         name:
 *           type: string
 *           example: "ORG 1"
 *     OrganisationsResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Organisation'
 *         message:
 *           type: string
 *           example: "SUCCESS"
 */

/**
 * @swagger
 * /api/getOrganisations:
 *   get:
 *     summary: Retrieve a list of organisations
 *     tags: [Organisations]
 *     responses:
 *       200:
 *         description: A list of organisations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrganisationsResponse'
 */
router.get("/api/getOrganisations", async (req, res) => {
  try {
    const organisationsFinded = await Organisation.find({});
    const organisationsArr: Array<IOrganisation> = [];
    if (organisationsFinded.length > 0) {
      organisationsFinded.forEach((item) => {
        organisationsArr.push({
          id: item.id,
          name: item.name,
        });
      });
    }
    return res.status(200).json({ data: organisationsArr, message: "SUCCESS" });
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
