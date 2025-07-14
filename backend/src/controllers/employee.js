import { errorHandler, responseHandler } from "../middlewares/resHandler.js";
import { db } from "../services/firebaseAdmin.js";

// (POST) CreateEmployee
// Parameters: name, email, department
// Return: { success: true, employeeId: "generated_id" }
// Other requirement: Creates a new employee record with the given details and returns a success message along with the generated employeeId.
export const CreateEmployee = async (req, res, next) => {
  try {
    const { name, email, department, manager } = req.body;

    if (!manager) {
      return next(errorHandler(400, "You are not a Manager."));
    }

    if (!name || !email || !department) {
      return next(errorHandler(400, "Missing some fields."));
    }

    //checck employee exits
    const employeeValidate = await db.collection("employees").doc(email).get();
    if (employeeValidate.exists) {
      return next(errorHandler(404, "This Employee email has been created."));
    }

    //start transaction
    //save employee
    await db.collection("employees").doc(email).set(
      {
        email,
        name,
        department,
        role: "employee",
        manager,
      },
      { merge: true }
    );
    const createdEmployee = await db.collection("employees").doc(email).get();
    const employeeRes = createdEmployee.data();

    //create chat room
    await db.collection("chatrooms").doc(email).set(
      {
        manager,
        email,
        //messages
      },
      { merge: true }
    );
    //end transaction

    return responseHandler(res, 200, "Employee has been created.", {
      employeeId: employeeRes.email,
    });
  } catch (error) {
    next(error);
  }
};

// (POST) GetEmployee
// Parameters: employeeId
// Return: Employee object
// Other requirement: Retrieves employee details based on the provided employeeId.
export const GetEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return next(errorHandler(400, "Missing employeeId."));
    }

    const employeeGet = await db.collection("employees").doc(employeeId).get();
    if (!employeeGet.exists) {
      return next(errorHandler(404, "Employee not found."));
    }
    const employeeGetData = await employeeGet.data();

    return responseHandler(
      res,
      200,
      "Get employee successful",
      employeeGetData
    );
  } catch (error) {
    next(error);
  }
};

// (POST) DeleteEmployee
// Parameters: employeeId
// Return: { success: true }
// Other requirement: Deletes the employee record associated with the given employeeId and returns a success message upon completion.
export const DeleteEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;

    if (!employeeId) {
      return next(errorHandler(400, "Missing employeeId."));
    }

    const employeeGet = await db.collection("employees").doc(employeeId).get();
    if (!employeeGet.exists) {
      return next(errorHandler(404, "Employee not found."));
    }
    await db.collection("employees").doc(employeeId).delete();

    return responseHandler(res, 200, "Delete employee successful", null);
  } catch (error) {
    next(error);
  }
};

// (POST) GetEmployees
// Parameters:
// Return: Employee object array
// Other requirement: Retrieves employees details based on the provided employeeId.
export const GetEmployees = async (req, res, next) => {
  try {
    const employeesGet = await db.collection("employees").get();
    let resData;
    if (employeesGet.empty) {
      resData = [];
    } else {
      resData = employeesGet.docs.map((e) => e.data());
    }

    return responseHandler(res, 200, "Get employees successful", resData);
  } catch (error) {
    next(error);
  }
};
