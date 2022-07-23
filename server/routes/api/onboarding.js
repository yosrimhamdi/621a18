const router = require("express").Router();
const {
  fieldsMatch,
  hasOnlyNameAndValue,
  hasCorrectDataType,
} = require("../../validators");

const STEPS = [
  [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
    },
    {
      name: "bio",
      label: "Bio",
      type: "multiline-text",
    },
  ],
  [
    {
      name: "country",
      label: "Country",
      type: "text",
      required: true,
    },
    {
      name: "receiveNotifications",
      label:
        "I would like to receive email notiications for new messages when I'm logged out",
      type: "yes-no",
      required: true,
    },
    {
      name: "receiveUpdates",
      label: "I would like to receive updates about the product via email",
      type: "yes-no",
      required: true,
    },
  ],
];

const methodNotAllowed = (req, res, next) => {
  return res.header("Allow", "GET").sendStatus(405);
};

const getOnboarding = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    return res.status(200).json({ steps: STEPS });
  } catch (error) {
    next(error);
  }
};

const postOnboarding = async (req, res, next) => {
  const { user, body } = req;

  if (!user) {
    return res.sendStatus(401);
  }

  if (user.completedOnboarding) {
    return res.status(403).json({
      error: "You have already set your onboarding information.",
    });
  }

  const allowedFields = [...STEPS[0], ...STEPS[1]];
  const postedFields = [...body.steps[0], ...body.steps[1]];

  if (!fieldsMatch(allowedFields, postedFields)) {
    return res.status(400).json({
      error: "We don't expect this type of fields.",
    });
  }

  if (!hasOnlyNameAndValue(postedFields)) {
    return res.status(400).json({
      error: "Wrong request body format.",
    });
  }

  if (!hasCorrectDataType(allowedFields, postedFields)) {
    return res.status(400).json({
      error: "Wrong field(s) data type.",
    });
  }

  postedFields.forEach(({ name, value }) => {
    user[name] = value;
  });

  user.completedOnboarding = true;
  user.updatedAt = new Date();

  try {
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

router.route("/").get(getOnboarding).post(postOnboarding).all(methodNotAllowed);

module.exports = router;
