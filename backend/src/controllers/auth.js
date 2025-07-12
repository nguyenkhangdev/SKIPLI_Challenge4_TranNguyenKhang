import { db } from "../services/firebaseAdmin.js";
import { Timestamp } from "firebase-admin/firestore";
import { random4DigitNumber } from "../utils/common.js";
import { errorHandler, responseHandler } from "../middlewares/resHandler.js";
import { generateToken } from "../utils/token.js";

// (POST) CreateNewAccessCode
// Parameters: phoneNumber
// Return: a random 6-digit access code
// Other requirement: save this access code to the phoneNumber in the database
export const CreateNewAccessCode = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return next(errorHandler(400, "Missing phoneNumber."));
    }

    //In this case, I add sign up before sign in to use sign in function. in real, no do that.
    await db.collection("managers").doc(phoneNumber).set(
      {
        phoneNumber,
        name: "SKIPLI Manager",
      },
      { merge: true } //use merge: true to update or add fields  without overwriting
    );

    //save this access code
    const accessCode = random4DigitNumber();
    const createdAt = Timestamp.now();
    const expiresAt = Timestamp.fromMillis(
      createdAt.toMillis() + 3 * 60 * 1000
    );
    await db.collection("accessCodes").doc(phoneNumber).set(
      {
        phoneNumber,
        accessCode,
        createdAt,
        expiresAt,
      },
      { merge: true }
    );

    //send SMS OTP

    //I think, in real, don't send accessCode in response
    return responseHandler(res, 200, "accessCode has been created.", {
      accessCode,
    });
  } catch (error) {
    next(error);
  }
};

// (POST) ValidateAccessCode
// Parameters: accessCode, phoneNumber
// Return: { success: true }
// Other requirement: set the access code to empty string once validation is complete
export const ValidateAccessCode = async (req, res, next) => {
  try {
    const { phoneNumber, accessCode } = req.body;

    if (!phoneNumber || !accessCode) {
      return next(errorHandler(400, "Missing phoneNumber or accessCode"));
    }

    const accessCodeValidate = await db
      .collection("accessCodes")
      .doc(phoneNumber)
      .get();

    if (!accessCodeValidate.exists) {
      return next(errorHandler(404, "Access code not found."));
    }

    const accessCodeValidateData = accessCodeValidate.data();
    if (
      accessCodeValidateData.accessCode.toString() !== accessCode.toString()
    ) {
      return responseHandler(res, 401, "Invalid access code.");
    }

    const now = new Date();
    if (accessCodeValidateData.expiresAt.toDate() < now) {
      return responseHandler(res, 401, "Access code expired.");
    }

    //delete accessCode after validated true
    await db.collection("accessCodes").doc(phoneNumber).delete();

    //create cookie
    const token = generateToken({ phoneNumber, role: "manager" });

    return responseHandler(res, 200, "Validated access code.", null, token);
  } catch (error) {
    next(error);
  }
};
