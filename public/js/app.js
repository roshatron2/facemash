var Profiles,
  leftProfile,
  rightProfile,
  randomIndex1,
  randomIndex2,
  randomNumber;

$(document).ready(() => {
  $.getJSON("/profiles")
    .then(pickTwo)
    .catch((err) => {
      console.log(err);
    });
});

var leftImage = $(".left-image");
var rightImage = $(".right-image");
var leftName = $("#left-name");
var rightName = $("#right-name");

function pickTwo(profiles) {
  Profiles = profiles;
  randomIndex1 = generateRandomNumber();
  randomIndex2 = generateRandomNumber();

  leftProfile = profiles[randomIndex1];
  rightProfile = profiles[randomIndex2];

  setProfile();
}

leftImage.on("click", pickedLeft);
rightImage.on("click", pickedRight);

function pickedLeft() {
  var expLeft =
    1 / (1 + Math.pow(10, (leftProfile.rating - rightProfile.rating) / 400));
  var expRight =
    1 / (1 + Math.pow(10, (leftProfile.rating - rightProfile.rating) / 400));

  leftProfile.rating += 30 * (1 - expLeft);
  rightProfile.rating += 30 * (0 - expRight);

  updateRating(leftProfile._id, leftProfile.rating);
  updateRating(rightProfile._id, rightProfile.rating);

  rightProfile = Profiles[generateRandomNumber()];

  if (leftProfile === rightProfile) {
    rightProfile = Profiles[generateRandomNumber()];
  }

  rightImage.attr("src", rightProfile.image);
  rightImage.data("id", rightProfile._id);
  rightName.html(rightProfile.name);
}

function pickedRight() {
  var expLeft =
    1 / (1 + Math.pow(10, (leftProfile.rating - rightProfile.rating) / 400));
  var expRight =
    1 / (1 + Math.pow(10, (rightProfile.rating - leftProfile.rating) / 400));

  leftProfile.rating += 30 * (0 - expLeft);
  rightProfile.rating += 30 * (1 - expRight);

  updateRating(leftProfile._id, leftProfile.rating);
  updateRating(rightProfile._id, rightProfile.rating);

  leftProfile = Profiles[generateRandomNumber()];

  if (leftProfile._id === rightProfile._id) {
    leftProfile = Profiles[generateRandomNumber()];
  }

  leftImage.attr("src", leftProfile.image);
  leftImage.data("id", leftProfile._id);
  leftName.html(leftProfile.name);
}

function updateRating(id, newRating) {
  var updateurl = "/profiles/" + id;
  $.ajax({
    method: "PUT",
    url: updateurl,
    data: { rating: newRating },
  });
}

function generateRandomNumber() {
  var number = Math.floor(Math.random() * Profiles.length);
  var used = false;
  console.log(number);
  return number;
}

function setProfile() {
  leftImage.attr("src", leftProfile.image);
  leftImage.data("id", leftProfile._id);
  leftName.html(leftProfile.name);
  rightImage.attr("src", rightProfile.image);
  rightImage.data("id", rightProfile._id);
  rightName.html(rightProfile.name);
}
