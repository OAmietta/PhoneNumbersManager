import express from "express";

import organisationsRouter from "./organisations";
import availableNumbersRouter from "./availableNumbers";
import usersRouter from "./users";
import populateDatabaseRouter from "./populateDatabase";
import allocateNumberRouter from "./allocateNumber";

const router = express.Router();

router.get("/api/getOrganisations", organisationsRouter);
router.get("/api/getAvailablePhoneNumbers", availableNumbersRouter);
router.get("/api/getUsers/:orgID", usersRouter);
router.post("/api/populateDatabase", populateDatabaseRouter);
router.post(
  "/api/allocateNumber/:idPassport/:name/:surname/:phoneNumber",
  allocateNumberRouter
);

export { router as apiRouter };
